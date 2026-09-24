export type EnquiryPayload = {
  formType: 'contact' | 'quote' | 'book';
  captchaToken: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  notes?: string;
  [key: string]: string | undefined;
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const res = await fetch('/api/send-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) {
    throw new Error(json.error || 'Failed to send. Please try again or call us.');
  }
}

/** Collect form fields into a plain object (skips files). */
export function formDataToPayload(
  form: HTMLFormElement,
  extras: { formType: EnquiryPayload['formType']; captchaToken: string },
): EnquiryPayload {
  const data = new FormData(form);
  const payload: EnquiryPayload = {
    formType: extras.formType,
    captchaToken: extras.captchaToken,
    name: String(data.get('name') || ''),
    phone: String(data.get('phone') || ''),
    email: String(data.get('email') || ''),
  };

  for (const [key, value] of data.entries()) {
    if (value instanceof File) continue;
    if (key in payload && ['name', 'phone', 'email'].includes(key)) continue;
    payload[key] = String(value);
  }

  if (!payload.message && payload.notes) {
    payload.message = payload.notes;
  }

  return payload;
}
