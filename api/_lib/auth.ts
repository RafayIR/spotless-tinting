import type { VercelRequest } from '@vercel/node';
import { createAnonClient, createServiceClient } from './supabase';

export type AuthResult =
  | { ok: true; userId: string }
  | { ok: false; status: number; message: string };

/**
 * Verifies a Bearer JWT from the Authorization header via Supabase Auth.
 * Returns the authenticated user id on success.
 */
export async function requireAuth(req: VercelRequest): Promise<AuthResult> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return { ok: false, status: 401, message: 'Missing or invalid Authorization header' };
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    return { ok: false, status: 401, message: 'Empty bearer token' };
  }

  // Prefer anon client + getUser(jwt) so we validate the caller's session token
  const supabase = createAnonClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { ok: false, status: 401, message: error?.message || 'Invalid session' };
  }

  return { ok: true, userId: data.user.id };
}

/** Optional helper when an admin write needs the service role after auth. */
export function getAdminDb() {
  return createServiceClient();
}
