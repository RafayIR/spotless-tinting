import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { collections, items } from '@wix/data';

/** Collection IDs are case-sensitive — this site's ID is lowercase. */
const DEFAULT_COLLECTION = 'enquiries';

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
    modules: { items, collections },
  });

  const { fields } = input;
  try {
    await wix.items.insert(collectionId, {
      title: `${input.subject} — ${fields.name}`,
      formType: input.formType,
      ...Object.fromEntries(COLUMN_FIELDS.map((key) => [key, fields[key] ?? ''])),
      message: fields.message || fields.notes || '',
      details: input.rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      status: 'New',
    });
  } catch (err) {
    // Wix doesn't show collection IDs prominently — list the real ones so the logs say what to set
    if (String(err).includes('WDE0025')) {
      const available = await wix.collections
        .listDataCollections()
        .then((res) =>
          (res.collections ?? []).map((c) => `${c._id} ("${c.displayName ?? ''}")`).join(', '),
        )
        .catch(() => 'could not list collections');
      throw new Error(
        `Wix collection "${collectionId}" not found. Set WIX_ENQUIRIES_COLLECTION to one of: ${available}`,
        { cause: err },
      );
    }
    throw err;
  }
}
