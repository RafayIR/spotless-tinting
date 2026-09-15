import { supabase, type PortfolioCategory, type PortfolioItem } from '@/lib/supabaseClient';

const BUCKET = 'portfolio-images';
const API = '/api/portfolio';

function authHeaders(accessToken: string): HeadersInit {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}

async function parseJsonResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      'API did not return JSON. Run the app with `vercel dev` (not `npm run dev`) so /api routes work, or test on a Vercel deployment.',
    );
  }
}

export async function listPortfolioItems(): Promise<PortfolioItem[]> {
  const res = await fetch(API);
  const json = await parseJsonResponse<{ items?: PortfolioItem[]; error?: string }>(res);
  if (!res.ok) throw new Error(json.error || 'Failed to load portfolio items');
  return json.items ?? [];
}

export async function createPortfolioItem(
  accessToken: string,
  payload: {
    title: string;
    category: PortfolioCategory;
    before_image_url: string | null;
    after_image_url: string | null;
    description: string | null;
  },
): Promise<PortfolioItem> {
  const res = await fetch(API, {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify(payload),
  });
  const json = await parseJsonResponse<{ item?: PortfolioItem; error?: string }>(res);
  if (!res.ok) throw new Error(json.error || 'Failed to create item');
  if (!json.item) throw new Error('No item returned');
  return json.item;
}

export async function updatePortfolioItem(
  accessToken: string,
  payload: {
    id: string;
    title?: string;
    category?: PortfolioCategory;
    before_image_url?: string | null;
    after_image_url?: string | null;
    description?: string | null;
  },
): Promise<PortfolioItem> {
  const res = await fetch(API, {
    method: 'PUT',
    headers: authHeaders(accessToken),
    body: JSON.stringify(payload),
  });
  const json = await parseJsonResponse<{ item?: PortfolioItem; error?: string }>(res);
  if (!res.ok) throw new Error(json.error || 'Failed to update item');
  if (!json.item) throw new Error('No item returned');
  return json.item;
}

export async function deletePortfolioItem(
  accessToken: string,
  id: string,
): Promise<void> {
  const res = await fetch(API, {
    method: 'DELETE',
    headers: authHeaders(accessToken),
    body: JSON.stringify({ id }),
  });
  const json = await parseJsonResponse<{ error?: string }>(res);
  if (!res.ok) throw new Error(json.error || 'Failed to delete item');
}

/** Extract storage object path from a public portfolio-images URL. */
export function storagePathFromPublicUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + marker.length).split('?')[0]);
}

export async function removePortfolioImages(urls: Array<string | null | undefined>) {
  if (!supabase) return;
  const paths = urls
    .map(storagePathFromPublicUrl)
    .filter((p): p is string => Boolean(p));
  if (paths.length === 0) return;
  const { error } = await supabase.storage.from(BUCKET).remove(paths);
  if (error) {
    console.warn('[portfolioAdmin] storage remove failed', error.message);
  }
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
}

/** Upload an image to the public portfolio-images bucket; returns public URL. */
export async function uploadPortfolioImage(file: File): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const path = `${Date.now()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'image/jpeg',
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
