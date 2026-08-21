import { useState } from 'react';
import { Check, Send, Car, Home, Building } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { services } from '@/data/services';

type QuoteType = 'automotive' | 'residential' | 'commercial';

export default function QuotePage() {
  const [quoteType, setQuoteType] = useState<QuoteType>('automotive');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            Tell us about your vehicle or property and we'll get back to you with a tailored quote. It only takes a minute.
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
                  Thanks for your enquiry. We'll review your details and get back to you with a quote as soon as possible.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-8">Submit Another Request</button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="card-surface p-6 md:p-8">
                {/* Quote type selector */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  {quoteTypes.map((qt) => (
                    <button
                      key={qt.id}
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label-field">Name *</label>
                      <input id="name" name="name" required className="input-field" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="label-field">Phone *</label>
                      <input id="phone" name="phone" required className="input-field" placeholder="Your phone" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="label-field">Email *</label>
                    <input id="email" name="email" type="email" required className="input-field" placeholder="your@email.com" />
                  </div>

                  {quoteType === 'automotive' ? (
                    <>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label htmlFor="make" className="label-field">Vehicle Make *</label>
                          <input id="make" name="make" required className="input-field" placeholder="Toyota" />
                        </div>
                        <div>
                          <label htmlFor="model" className="label-field">Vehicle Model *</label>
                          <input id="model" name="model" required className="input-field" placeholder="Hilux" />
                        </div>
                        <div>
                          <label htmlFor="year" className="label-field">Vehicle Year</label>
                          <input id="year" name="year" className="input-field" placeholder="2022" />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="service-req" className="label-field">Service Required *</label>
                          <select id="service-req" name="service-req" required className="input-field">
                            <option value="">Select a service</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
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
                      <div>
                        <label htmlFor="windows" className="label-field">Number / Type of Windows</label>
                        <input id="windows" name="windows" className="input-field" placeholder="e.g. 4 doors + rear window" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="prop-type" className="label-field">Property Type *</label>
                          <input id="prop-type" name="prop-type" required className="input-field" placeholder={quoteType === 'residential' ? 'e.g. House, Unit' : 'e.g. Office, Shopfront'} />
                        </div>
                        <div>
                          <label htmlFor="service-req" className="label-field">Service Required *</label>
                          <select id="service-req" name="service-req" required className="input-field">
                            <option value="">Select a service</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="window-count" className="label-field">Approx. Window Count / Size</label>
                          <input id="window-count" name="window-count" className="input-field" placeholder="e.g. 8 windows, various sizes" />
                        </div>
                        <div>
                          <label htmlFor="suburb" className="label-field">Address / Suburb</label>
                          <input id="suburb" name="suburb" className="input-field" placeholder="e.g. Moonah, TAS" />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="notes" className="label-field">Additional Notes</label>
                    <textarea id="notes" name="notes" rows={3} className="input-field" placeholder="Anything else we should know?" />
                  </div>
                  <div>
                    <label htmlFor="image" className="label-field">Optional Image Upload</label>
                    <input id="image" name="image" type="file" accept="image/*" className="input-field file:mr-3 file:rounded-lg file:border-0 file:bg-ink-100 file:px-3 file:py-2 file:text-sm" />
                    <p className="mt-1 text-xs text-ink-400">Upload a photo of your vehicle or windows (optional).</p>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <Send className="h-4 w-4" /> Submit Quote Request
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    We'll review your request and get back to you with a personalised quote. This is not an instant price.
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
