import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const DEFAULT_COLLECTION = 'Enquiries';

/** Keys stored in their own CMS columns; everything else goes into `details`. */
const COLUMN_FIELDS = ['name', 'email', 'phone', 'suburb'] as const;

export function isWixEnquiriesConfigured(): boolean {
  return Boolean(process.env.WIX_API_KEY && process.env.WIX_SITE_ID);
}

/**
 * Saves a form submission as a new item in the Wix CMS `Enquiries` collection so the owner can
 * review and track leads in the Wix dashboard. Uses the same server-only API key as the portfolio.
 */
export async function saveEnquiryToWix(input: {
  formType: string;
  subject: string;
  fields: Record<string, string>;
  /** Ordered [label, value] rows, same as the email body. */
  rows: ReadonlyArray<readonly [string, string]>;
}): Promise<void> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) throw new Error('Missing WIX_API_KEY or WIX_SITE_ID');

  const collectionId = process.env.WIX_ENQUIRIES_COLLECTION || DEFAULT_COLLECTION;
  const wix = createClient({
    auth: ApiKeyStrategy({ apiKey, siteId }),
    modules: { items },
  });

  const { fields } = input;
  await wix.items.insert(collectionId, {
    title: `${input.subject} — ${fields.name}`,
    formType: input.formType,
    ...Object.fromEntries(COLUMN_FIELDS.map((key) => [key, fields[key] ?? ''])),
    message: fields.message || fields.notes || '',
    details: input.rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    status: 'New',
  });
}
