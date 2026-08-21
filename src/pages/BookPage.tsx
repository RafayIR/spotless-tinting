import { useState } from 'react';
import { Check, Calendar, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { services } from '@/data/services';

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  return (
    <>
      <SEO
        title="Book Now | Spotless Tinting — Hobart"
        description="Book your window tinting, PPF or vehicle wrapping appointment with Spotless Tinting in Moonah, Hobart. Select your service, date and time."
        path="/book"
      />

      <section className="bg-accent-50 py-16">
        <div className="container">
          <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'Book Now' }]} />
          <h1 className="mt-6 text-4xl font-bold text-ink-950 md:text-5xl">Book Now</h1>
          <p className="mt-4 max-w-2xl text-ink-600">
            Request a booking for your tinting, PPF or vehicle wrapping service. We'll confirm your appointment with you directly.
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
                <h2 className="mt-6 text-2xl font-bold text-ink-950">Booking Request Sent!</h2>
                <p className="mt-3 max-w-md text-ink-600">
                  Thanks for your booking request. This is not yet a confirmed appointment — we'll contact you shortly to confirm your date and time.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-8">Make Another Booking</button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="card-surface p-6 md:p-8">
                <div className="mb-6 rounded-xl bg-accent-50 p-4">
                  <p className="text-sm text-accent-800">
                    <strong>Please note:</strong> This is a booking request, not a confirmed appointment. We will contact you to confirm availability.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="service" className="label-field">Service *</label>
                    <select id="service" name="service" required className="input-field">
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="date" className="label-field">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <input id="date" name="date" type="date" required className="input-field pl-10" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="time" className="label-field">Preferred Time *</label>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                        <select id="time" name="time" required className="input-field pl-10">
                          <option value="">Select a time</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
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
                    <label htmlFor="vehicle-detail" className="label-field">Vehicle / Property Details</label>
                    <input id="vehicle-detail" name="vehicle-detail" className="input-field" placeholder="e.g. 2022 Toyota Hilux or residential home in Moonah" />
                  </div>
                  <div>
                    <label htmlFor="notes" className="label-field">Notes</label>
                    <textarea id="notes" name="notes" rows={3} className="input-field" placeholder="Any additional information or special requests" />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Request Booking
                  </button>
                </form>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
