import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminDb, requireAuth } from './_lib/auth';
import { createAnonClient } from './_lib/supabase';

const TABLE = 'portfolio_items';
const CATEGORIES = new Set(['tint', 'ppf', 'wrap']);

function method(req: VercelRequest): string {
  return (req.method || 'GET').toUpperCase();
}

function badRequest(res: VercelResponse, message: string) {
  return res.status(400).json({ error: message });
}

/**
 * GET  /api/portfolio — public list (RLS allows SELECT)
 * POST /api/portfolio — create (auth + service role)
 * PUT  /api/portfolio — update (auth + service role)
 * DELETE /api/portfolio — delete (auth + service role)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    switch (method(req)) {
      case 'GET':
        return await handleGet(req, res);
      case 'POST':
        return await handleWrite(req, res, 'create');
      case 'PUT':
      case 'PATCH':
        return await handleWrite(req, res, 'update');
      case 'DELETE':
        return await handleDelete(req, res);
      default:
        res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    console.error('[api/portfolio]', err);
    return res.status(500).json({ error: message });
  }
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const supabase = createAnonClient();
  const category =
    typeof req.query.category === 'string' ? req.query.category : undefined;

  let query = supabase.from(TABLE).select('*').order('created_at', { ascending: false });

  if (category) {
    if (!CATEGORIES.has(category)) {
      return badRequest(res, "category must be 'tint' | 'ppf' | 'wrap'");
    }
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ items: data ?? [] });
}

async function handleWrite(
  req: VercelRequest,
  res: VercelResponse,
  action: 'create' | 'update',
) {
  const auth = await requireAuth(req);
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.message });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const admin = getAdminDb();

  if (action === 'create') {
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const category = typeof body.category === 'string' ? body.category : '';

    if (!title) return badRequest(res, 'title is required');
    if (!CATEGORIES.has(category)) {
      return badRequest(res, "category must be 'tint' | 'ppf' | 'wrap'");
    }

    const row = {
      title,
      category,
      before_image_url:
        typeof body.before_image_url === 'string' ? body.before_image_url : null,
      after_image_url:
        typeof body.after_image_url === 'string' ? body.after_image_url : null,
      description: typeof body.description === 'string' ? body.description : null,
    };

    const { data, error } = await admin.from(TABLE).insert(row).select('*').single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ item: data });
  }

  const id = typeof body.id === 'string' ? body.id : null;
  if (!id) return badRequest(res, 'id is required for updates');

  const patch: Record<string, unknown> = {};
  for (const key of [
    'title',
    'category',
    'before_image_url',
    'after_image_url',
    'description',
  ] as const) {
    if (key in body) patch[key] = body[key];
  }

  if (typeof patch.category === 'string' && !CATEGORIES.has(patch.category)) {
    return badRequest(res, "category must be 'tint' | 'ppf' | 'wrap'");
  }

  if (Object.keys(patch).length === 0) {
    return badRequest(res, 'No fields to update');
  }

  const { data, error } = await admin.from(TABLE).update(patch).eq('id', id).select('*').single();
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ item: data });
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const auth = await requireAuth(req);
  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.message });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const id =
    (typeof req.query.id === 'string' && req.query.id) ||
    (typeof body.id === 'string' && body.id) ||
    null;

  if (!id) return badRequest(res, 'id is required');

  const admin = getAdminDb();
  const { error } = await admin.from(TABLE).delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, id });
}
