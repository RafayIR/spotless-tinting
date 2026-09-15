import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let localEnvLoaded = false;

/**
 * `vercel dev` does not always inject `.env.local` into serverless `/api` handlers
 * (especially `VITE_*` keys). Fill any missing keys from local env files.
 * Skipped on Vercel cloud (preview/production) where the platform sets env.
 */
function loadLocalEnvFiles() {
  if (localEnvLoaded) return;
  localEnvLoaded = true;

  if (process.env.VERCEL && process.env.VERCEL_ENV !== 'development') return;

  for (const file of ['.env.local', '.env']) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;

    const text = readFileSync(path, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]?.trim()) {
        process.env[key] = value;
      }
    }
  }
}

function requireEnv(name: string): string {
  loadLocalEnvFiles();
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSupabaseUrl(): string {
  loadLocalEnvFiles();
  const value =
    process.env.SUPABASE_URL?.trim() || process.env.VITE_SUPABASE_URL?.trim();
  if (!value) {
    throw new Error(
      'Missing required environment variable: SUPABASE_URL or VITE_SUPABASE_URL',
    );
  }
  return value;
}

/** Publishable/anon key — used for public reads and JWT validation. */
function getPublishableKey(): string {
  loadLocalEnvFiles();
  const value =
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim();
  if (!value) {
    throw new Error(
      'Missing required environment variable: SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY',
    );
  }
  return value;
}

/** Public client — SELECT via RLS. Safe key only. */
export function createAnonClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getPublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Service-role admin client — server-only.
 * Bypasses RLS for POST/PUT/DELETE in /api routes.
 * Never import this module into Vite client code.
 */
export function createServiceClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), requireEnv('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
