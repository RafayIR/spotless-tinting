import type { Project } from '@/data/projects';

/** A Wix CMS project, shaped so it can be passed anywhere a static `Project` is accepted. */
export type WixProject = Project & {
  shortDescription: string;
  technologies: string[];
  projectUrl?: string;
  featured: boolean;
  displayOrder: number | null;
};

type ApiProject = {
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

type ApiResponse = { projects?: ApiProject[]; total?: number; error?: string };

export type WixProjectsPage = { projects: WixProject[]; total: number };

const KNOWN_CATEGORIES: Project['category'][] = [
  'Window Tinting',
  'PPF',
  'Vehicle Wraps',
  'Residential',
  'Commercial',
  'Smart Tint',
  'Other',
];

/** Default `service` label when the Wix item does not set one (matches the static data). */
const SERVICE_BY_CATEGORY: Record<Project['category'], string> = {
  'Window Tinting': 'Automotive Window Tinting',
  PPF: 'Paint Protection Film',
  'Vehicle Wraps': 'Vehicle Wrapping',
  Residential: 'Residential Window Tinting',
  Commercial: 'Commercial Window Tinting',
  'Smart Tint': 'Smart Tint',
  Other: 'Ceramic Coating',
};

/** Common alternative wording an editor might type in Wix (lower-case). */
const CATEGORY_ALIASES: Record<string, Project['category']> = {
  tinting: 'Window Tinting',
  'window tint': 'Window Tinting',
  'automotive tint': 'Window Tinting',
  'automotive tinting': 'Window Tinting',
  'car tint': 'Window Tinting',
  'paint protection film': 'PPF',
  wraps: 'Vehicle Wraps',
  'vehicle wrap': 'Vehicle Wraps',
  'vehicle wrapping': 'Vehicle Wraps',
  'ceramic coating': 'Other',
};

function toCategory(value: string): Project['category'] {
  const key = value.trim().toLowerCase();
  const match = KNOWN_CATEGORIES.find((c) => c.toLowerCase() === key);
  return match ?? CATEGORY_ALIASES[key] ?? 'Other';
}

/** Map an API item onto the site's existing `Project` shape. Exported for testing. */
export function mapWixProject(item: ApiProject): WixProject {
  const category = toCategory(item.category);
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    category,
    location: item.location,
    // Cards show a short blurb; the full text stays available on `description` consumers if needed
    description: item.shortDescription || item.description,
    image: item.image,
    gallery: item.gallery,
    service: item.service || SERVICE_BY_CATEGORY[category],
    shortDescription: item.shortDescription,
    technologies: item.technologies,
    projectUrl: item.projectUrl,
    featured: item.featured,
    displayOrder: item.displayOrder,
  };
}

/**
 * Combine Wix projects with the static list while the gallery is being migrated:
 * a Wix project with the same slug replaces its static twin in place, and Wix-only
 * projects come first. Static projects not yet in Wix are kept, so nothing disappears.
 */
export function mergeWithStatic(wix: WixProject[], fallback: Project[]): Project[] {
  const wixBySlug = new Map(wix.map((p) => [p.slug, p]));
  const staticSlugs = new Set(fallback.map((p) => p.slug));
  const wixOnly = wix.filter((p) => !staticSlugs.has(p.slug));
  const merged = fallback.map((p) => wixBySlug.get(p.slug) ?? p);
  return [...wixOnly, ...merged];
}

const API = '/api/wix-portfolio';

/** Fetch one page of published projects from Wix CMS (via the server proxy). */
export async function fetchWixProjects(
  options: { limit?: number; offset?: number; signal?: AbortSignal } = {},
): Promise<WixProjectsPage> {
  const params = new URLSearchParams();
  if (options.limit) params.set('limit', String(options.limit));
  if (options.offset) params.set('offset', String(options.offset));
  const query = params.toString();

  const res = await fetch(query ? `${API}?${query}` : API, { signal: options.signal });
  const text = await res.text();

  let json: ApiResponse;
  try {
    json = JSON.parse(text) as ApiResponse;
  } catch {
    throw new Error(
      'Portfolio API did not return JSON. Run with `vercel dev` (not `npm run dev`) so /api routes work.',
    );
  }
  if (!res.ok) throw new Error(json.error || 'Failed to load portfolio projects');

  const projects = (json.projects ?? []).map(mapWixProject);
  return { projects, total: json.total ?? projects.length };
}

let cached: Promise<WixProjectsPage> | null = null;

/**
 * Same as `fetchWixProjects()` for the full list, but shares one request between components
 * and remembers it for the session. A failed request is not cached, so a retry works.
 */
export function getWixProjects(): Promise<WixProjectsPage> {
  if (!cached) {
    cached = fetchWixProjects().catch((err) => {
      cached = null;
      throw err;
    });
  }
  return cached;
}
