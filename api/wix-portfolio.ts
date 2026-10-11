import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient, ApiKeyStrategy, media } from '@wix/sdk';
import { items } from '@wix/data';

/**
 * GET /api/wix-portfolio?limit=100&offset=0
 *
 * Reads portfolio projects from the Wix CMS collection with a server-only API key and
 * returns ONLY items where `published` is true. The key never reaches the browser, and the
 * collection itself can stay admin-only in Wix (no public read/write permissions needed).
 */

const DEFAULT_COLLECTION = 'PortfolioProjects';
const MAX_LIMIT = 100;

type WixImageValue = string | { src?: string; url?: string; slug?: string } | null | undefined;

type WixProjectRecord = {
  _id?: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  coverImage?: WixImageValue;
  galleryImages?: WixImageValue[] | null;
  category?: string;
  technologies?: string[] | string | null;
  projectUrl?: string;
  featured?: boolean;
  displayOrder?: number;
  published?: boolean;
  /** Optional extras the existing site cards use. */
  location?: string;
  service?: string;
};

export type WixProjectDto = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  category: string;
  technologies: string[];
  projectUrl?: string;
  featured: boolean;
  displayOrder: number | null;
  location?: string;
  service?: string;
};

/** Wix media fields come back as `wix:image://v1/<id>/<name>#...` — convert to a public https URL. */
function toImageUrl(value: WixImageValue): string | null {
  const raw = typeof value === 'string' ? value : value?.src || value?.url || '';
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  try {
    return media.getImageUrl(raw).url || null;
  } catch {
    return null;
  }
}

function toTechnologies(value: WixProjectRecord['technologies']): string[] {
  if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
  return [];
}

function toDto(record: WixProjectRecord): WixProjectDto | null {
  const title = record.title?.trim();
  const slug = record.slug?.trim();
  if (!title || !slug) return null;

  const gallery = (record.galleryImages ?? [])
    .map(toImageUrl)
    .filter((url): url is string => Boolean(url));
  const image = toImageUrl(record.coverImage) ?? gallery[0] ?? null;

  // Cards need a cover image — skip incomplete entries instead of rendering a broken card
  if (!image) {
    console.warn(`[api/wix-portfolio] "${title}" skipped: no cover or gallery image`);
    return null;
  }

  return {
    id: record._id || slug,
    title,
    slug,
    shortDescription: record.shortDescription?.trim() || '',
    description: record.description?.trim() || record.shortDescription?.trim() || '',
    image,
    gallery: gallery.length > 0 ? gallery : [image],
    category: record.category?.trim() || 'Other',
    technologies: toTechnologies(record.technologies),
    projectUrl: record.projectUrl?.trim() || undefined,
    featured: Boolean(record.featured),
    displayOrder: typeof record.displayOrder === 'number' ? record.displayOrder : null,
    location: record.location?.trim() || undefined,
    service: record.service?.trim() || undefined,
  };
}

function intParam(value: unknown, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(String(Array.isArray(value) ? value[0] : value ?? ''), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if ((req.method || 'GET').toUpperCase() !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  const collectionId = process.env.WIX_PORTFOLIO_COLLECTION || DEFAULT_COLLECTION;

  if (!apiKey || !siteId) {
    console.error('[api/wix-portfolio] Missing WIX_API_KEY or WIX_SITE_ID');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'Wix CMS is not configured' });
  }

  const limit = intParam(req.query.limit, MAX_LIMIT, 1, MAX_LIMIT);
  const offset = intParam(req.query.offset, 0, 0, 100_000);

  try {
    const wix = createClient({
      auth: ApiKeyStrategy({ apiKey, siteId }),
      modules: { items },
    });

    const result = await wix.items
      .query(collectionId)
      .eq('published', true)
      .ascending('displayOrder')
      .descending('_createdDate')
      .skip(offset)
      .limit(limit)
      .find();

    const projects = (result.items as WixProjectRecord[])
      .map(toDto)
      .filter((p): p is WixProjectDto => p !== null);

    // Short CDN cache: edits in Wix show up within ~a minute without hammering the Wix API
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({
      projects,
      total: result.totalCount ?? projects.length,
      limit,
      offset,
    });
  } catch (err) {
    console.error('[api/wix-portfolio]', err);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'Could not load portfolio from Wix' });
  }
}
