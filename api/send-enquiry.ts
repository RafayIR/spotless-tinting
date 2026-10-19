import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isWixEnquiriesConfigured, saveEnquiryToWix } from './_lib/wixEnquiries.js';

type FormType = 'contact' | 'quote' | 'book' | 'careers';

const SUBJECTS: Record<FormType, string> = {
  contact: 'New contact enquiry',
  quote: 'New quote request',
  book: 'New booking request',
  careers: 'New job application',
};

/** Fields every form must send. */
const REQUIRED_FIELDS = ['name', 'phone', 'email', 'suburb'] as const;

/** Friendly labels for the email body; unknown keys fall back to the raw key. */
const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  suburb: 'Suburb',
  address: 'Address',
  service: 'Service',
  'service-req': 'Service required',
  vehicle: 'Vehicle',
  'vehicle-detail': 'Vehicle / property details',
  make: 'Vehicle make',
  model: 'Vehicle model',
  year: 'Vehicle year',
  'tint-pref': 'Tint preference',
  windows: 'Windows',
  'prop-type': 'Property type',
  'window-count': 'Window count / size',
  date: 'Preferred date',
  time: 'Preferred time',
  'contact-method': 'Preferred contact method',
  position: 'Position of interest',
  experience: 'Experience',
  availability: 'Availability',
  message: 'Message',
  notes: 'Notes',
};

const MAX_FIELDS = 40;
const MAX_FIELD_LENGTH = 4000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyRecaptcha(token: string, secret: string): Promise<boolean> {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  if (!res.ok) return false;
  const json = (await res.json()) as { success?: boolean };
  return Boolean(json.success);
}

/**
 * POST /api/send-enquiry
 * Verifies the Google reCAPTCHA token, then emails the submission to the owner via Resend and
 * saves it to the Wix CMS `Enquiries` collection. Succeeds if at least one of the two works.
 * Used by the Contact, Quote, Book and Careers forms.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if ((req.method || 'GET').toUpperCase() !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Spotless Tinting <onboarding@resend.dev>';

  const emailConfigured = Boolean(resendKey && toEmail);
  const wixConfigured = isWixEnquiriesConfigured();

  if (!recaptchaSecret || (!emailConfigured && !wixConfigured)) {
    console.error(
      '[api/send-enquiry] Missing RECAPTCHA_SECRET_KEY, or neither Resend (RESEND_API_KEY + CONTACT_TO_EMAIL) nor Wix (WIX_API_KEY + WIX_SITE_ID) is configured',
    );
    return res.status(500).json({ error: 'The form is not configured yet. Please call us instead.' });
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const { formType, captchaToken, ...rest } = body;

    if (typeof formType !== 'string' || !(formType in SUBJECTS)) {
      return res.status(400).json({ error: 'Unknown form type.' });
    }
    if (typeof captchaToken !== 'string' || !captchaToken) {
      return res.status(400).json({ error: 'Please complete the captcha.' });
    }

    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(rest).slice(0, MAX_FIELDS)) {
      if (typeof value !== 'string') continue;
      const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
      if (trimmed) fields[key] = trimmed;
    }

    for (const key of REQUIRED_FIELDS) {
      if (!fields[key]) {
        return res.status(400).json({ error: `${FIELD_LABELS[key]} is required.` });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const human = await verifyRecaptcha(captchaToken, recaptchaSecret);
    if (!human) {
      return res.status(400).json({ error: 'Captcha verification failed. Please try again.' });
    }

    const rows = Object.entries(fields).map(
      ([key, value]) => [FIELD_LABELS[key] || key, value] as const,
    );
    const html = `<h2>${escapeHtml(SUBJECTS[formType as FormType])}</h2><table cellpadding="6" style="border-collapse:collapse">${rows
      .map(
        ([label, value]) =>
          `<tr><td style="vertical-align:top;font-weight:bold">${escapeHtml(label)}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join('')}</table>`;
    const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

    const subject = SUBJECTS[formType as FormType];

    const sendEmail = async () => {
      const sendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: fields.email,
          subject: `${subject} — ${fields.name}`,
          html,
          text,
        }),
      });
      if (!sendRes.ok) {
        throw new Error(`Resend ${sendRes.status}: ${await sendRes.text()}`);
      }
    };

    // Email and Wix run side by side; the visitor only sees an error if both fail
    const tasks: Array<[string, Promise<void>]> = [];
    if (emailConfigured) tasks.push(['email', sendEmail()]);
    if (wixConfigured) tasks.push(['wix', saveEnquiryToWix({ formType, subject, fields, rows })]);

    const results = await Promise.allSettled(tasks.map(([, task]) => task));
    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.error(`[api/send-enquiry] ${tasks[i][0]} failed`, result.reason);
      }
    });

    if (!results.some((result) => result.status === 'fulfilled')) {
      return res.status(502).json({ error: 'Could not send your message. Please try again or call us.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[api/send-enquiry]', err);
    return res.status(500).json({ error: 'Unexpected server error. Please try again or call us.' });
  }
}
