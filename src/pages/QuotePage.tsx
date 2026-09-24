import { useState } from 'react';
import { Check, Send, Car, Home, Building } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import GoogleRecaptcha from '@/components/forms/GoogleRecaptcha';
import { SafeInput, SafeTextarea } from '@/components/forms/SafeFields';
import { FORM_CHAR_HINT } from '@/lib/formValidation';
import { formDataToPayload, submitEnquiry } from '@/lib/submitEnquiry';
import { services } from '@/data/services';

type QuoteType = 'automotive' | 'residential' | 'commercial';

export default function QuotePage() {
  const [quoteType, setQuoteType] = useState<QuoteType>('automotive');
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!captchaToken) {
      setFormError('Please complete the captcha.');
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiry(
        formDataToPayload(e.currentTarget, {
          formType: 'quote',
          captchaToken,
        }),
      );
      setSubmitted(true);
      setCaptchaToken(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to send quote request.');
    } finally {
      setSubmitting(false);
    }
  };

  const quoteTypes = [
    { id: 'automotive' as const, label: 'Automotive', icon: Car },
    { id: 'residential' as const, label: 'Residential', icon: Home },
    { id: 'commercial' as const, label: 'Commercial', icon: Building },
  ];

  return (
    <>
      <SEO
        title="Get a Free Quote | Spotless Tinting — Hobart"
        description="Request a free quote for automotive, residential or commercial window tinting, PPF or vehicle wrapping in Hobart. Easy mobile-friendly form."
        path="/quote"
      />

      <section className="bg-accent-50 py-16">
        <div className="container">
          <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'Get a Free Quote' }]} />
          <h1 className="mt-6 text-4xl font-bold text-ink-950 md:text-5xl">Get a Free Quote</h1>
          <p className="mt-4 max-w-2xl text-ink-600">
            Tell us about your vehicle or property and we&apos;ll get back to you with a tailored quote. It only takes a minute.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-3xl">
          {submitted ? (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                  <Check className="h-10 w-10" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-ink-950">Quote Request Received!</h2>
                <p className="mt-3 max-w-md text-ink-600">
                  Thanks for your enquiry. We&apos;ll review your details and get back to you with a quote as soon as possible.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-8">Submit Another Request</button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="card-surface p-6 md:p-8">
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {quoteTypes.map((qt) => (
                    <button
                      key={qt.id}
                      type="button"
                      onClick={() => setQuoteType(qt.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors ${quoteType === qt.id
                          ? 'border-accent-500 bg-accent-50 text-accent-700'
                          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-400'
                        }`}
                    >
                      <qt.icon className="h-6 w-6" />
                      {qt.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
                  <p className="text-xs text-ink-500">{FORM_CHAR_HINT}</p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="name" className="label-field">Name *</label>
                      <SafeInput id="name" name="name" mode="text" required className="input-field" placeholder="Your name" />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="phone" className="label-field">Phone *</label>
                      <SafeInput id="phone" name="phone" mode="numbers" required className="input-field" placeholder="Your phone" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="email" className="label-field">Email *</label>
                    <SafeInput id="email" name="email" mode="email" type="email" required className="input-field" placeholder="your@email.com" />
                  </div>

                  {quoteType === 'automotive' ? (
                    <>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="min-w-0">
                          <label htmlFor="make" className="label-field">Vehicle Make *</label>
                          <SafeInput id="make" name="make" mode="text" required className="input-field" placeholder="Toyota" />
                        </div>
                        <div className="min-w-0">
                          <label htmlFor="model" className="label-field">Vehicle Model *</label>
                          <SafeInput id="model" name="model" mode="text" required className="input-field" placeholder="Hilux" />
                        </div>
                        <div className="min-w-0">
                          <label htmlFor="year" className="label-field">Vehicle Year</label>
                          <SafeInput id="year" name="year" mode="numbers" className="input-field" placeholder="2022" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="min-w-0">
                          <label htmlFor="service-req" className="label-field">Service Required *</label>
                          <select id="service-req" name="service-req" required className="input-field">
                            <option value="">Select a service</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="min-w-0">
                          <label htmlFor="tint-pref" className="label-field">Tint Preference</label>
                          <select id="tint-pref" name="tint-pref" className="input-field">
                            <option value="">No preference</option>
                            <option value="ceramic">Ceramic</option>
                            <option value="carbon">Carbon</option>
                            <option value="dyed">Dyed</option>
                            <option value="advice">Please advise</option>
                          </select>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="windows" className="label-field">Number / Type of Windows</label>
                        <SafeInput id="windows" name="windows" mode="text" className="input-field" placeholder="e.g. 4 doors rear window" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="min-w-0">
                          <label htmlFor="prop-type" className="label-field">Property Type *</label>
                          <SafeInput id="prop-type" name="prop-type" mode="text" required className="input-field" placeholder={quoteType === 'residential' ? 'e.g. House Unit' : 'e.g. Office Shopfront'} />
                        </div>
                        <div className="min-w-0">
                          <label htmlFor="service-req" className="label-field">Service Required *</label>
                          <select id="service-req" name="service-req" required className="input-field">
                            <option value="">Select a service</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="min-w-0">
                          <label htmlFor="window-count" className="label-field">Approx. Window Count / Size</label>
                          <SafeInput id="window-count" name="window-count" mode="text" className="input-field" placeholder="e.g. 8 windows various sizes" />
                        </div>
                        <div className="min-w-0">
                          <label htmlFor="suburb" className="label-field">Address / Suburb</label>
                          <SafeInput id="suburb" name="suburb" mode="text" className="input-field" placeholder="e.g. Moonah TAS" />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="min-w-0">
                    <label htmlFor="notes" className="label-field">Additional Notes</label>
                    <SafeTextarea id="notes" name="notes" mode="text" rows={3} className="input-field" placeholder="Anything else we should know" />
                  </div>
            

                  <GoogleRecaptcha onChange={setCaptchaToken} className="max-w-full overflow-x-auto" />
                  {formError && (
                    <p className="text-sm text-red-600" role="alert">
                      {formError}
                    </p>
                  )}

                  <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                    <Send className="h-4 w-4" /> {submitting ? 'Verifying…' : 'Submit Quote Request'}
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    We&apos;ll review your request and get back to you with a personalised quote. This is not an instant price.
                  </p>
                </form>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
