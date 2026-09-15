import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

/**
 * Browser Supabase client (publishable / anon key only).
 * Use for public reads such as fetching portfolio_items.
 * Never use SUPABASE_SERVICE_ROLE_KEY in frontend code.
 */
export const supabase: SupabaseClient | null =
  url && publishableKey ? createClient(url, publishableKey) : null;

export type PortfolioCategory = 'tint' | 'ppf' | 'wrap';

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  before_image_url: string | null;
  after_image_url: string | null;
  description: string | null;
  created_at: string;
};

/** Public gallery fetch via RLS SELECT policy. */
export async function fetchPortfolioItems(category?: PortfolioCategory) {
  if (!supabase) {
    throw new Error('Supabase client is not configured (check VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY)');
  }

  let query = supabase
    .from('portfolio_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as PortfolioItem[];
}
