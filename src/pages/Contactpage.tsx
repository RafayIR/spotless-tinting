import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { business } from '@/data/business';
import { services } from '@/data/services';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    name: business.name,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Moonah',
      addressRegion: 'TAS',
      addressCountry: 'AU',
    },
    openingHours: 'Mo-Sa',
  };

  return (
    <>
      <SEO
        title="Contact Us | Spotless Tinting — Hobart"
        description="Contact Spotless Tinting in Moonah, Hobart. Call, email or send us a message for window tinting, PPF and vehicle wrapping enquiries."
        path="/contact"
        schema={localBusinessSchema}
      />

      <section className="bg-accent-50 py-16">
        <div className="container">
          <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />
          <h1 className="mt-6 text-4xl font-bold text-ink-950 md:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-ink-600">
            Get in touch with Spotless Tinting. We're here to help with all your tinting and vehicle protection enquiries.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            {/* Contact info */}
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">Phone</p>
                      <a href={business.phoneHref} className="text-sm text-ink-600 hover:text-accent-600">{business.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">Email</p>
                      <a href={business.emailHref} className="text-sm text-ink-600 hover:text-accent-600">{business.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">Address</p>
                      <p className="text-sm text-ink-600">{business.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink-900">Business Hours</p>
                      <ul className="mt-1 space-y-0.5 text-sm text-ink-600">
                        {business.hours.map((h) => (
                          <li key={h.day} className="flex justify-between gap-3">
                            <span>{h.day}</span>
                            <span>{h.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-ink-900">Service Areas</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {business.serviceAreas.map((a) => (
                      <span key={a} className="rounded-full bg-ink-50 px-3 py-1 text-xs text-ink-600">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={100}>
              <div className="card-surface p-6 md:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink-950">Message Sent!</h3>
                    <p className="mt-2 text-sm text-ink-600">Thanks for reaching out. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline mt-6">Send Another Message</button>
                  </div>
                ) : (
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
                    <div>
                      <label htmlFor="service" className="label-field">Service</label>
                      <select id="service" name="service" className="input-field">
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicle" className="label-field">Vehicle / Property Type</label>
                      <input id="vehicle" name="vehicle" className="input-field" placeholder="e.g. 2022 Toyota Hilux or residential home" />
                    </div>
                    <div>
                      <label htmlFor="message" className="label-field">Message *</label>
                      <textarea id="message" name="message" required rows={4} className="input-field" placeholder="How can we help?" />
                    </div>
                    <div>
                      <label htmlFor="contact-method" className="label-field">Preferred Contact Method</label>
                      <select id="contact-method" name="contact-method" className="input-field">
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="either">Either</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      <Send className="h-4 w-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ink-50 py-12">
        <div className="container">
          <div className="overflow-hidden rounded-2xl border border-ink-100">
            <iframe
              title="Spotless Tinting location — Moonah, Hobart"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5473.2!2d147.2667!3d42.8499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUwJzU5LjYiUyAxNDfCsDE1JzU2LjEiRQ!5e0!3m2!1sen!2sau!4v0000000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
