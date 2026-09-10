import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  Camera,
  MessageCircle,
  Car,
  Star,
  Shield,
  Wrench
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { business } from '@/data/business';
import { services } from '@/data/services';
import { images } from '@/data/images';

const quickCards = [
  {
    icon: Phone,
    title: 'Call Us',
    primary: business.phone,
    href: business.phoneHref,
    note: 'Speak directly with our team.',
  },
  {
    icon: Mail,
    title: 'Email Us',
    primary: business.email,
    href: business.emailHref,
    note: 'We reply as soon as possible.',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    primary: 'Moonah & Bellerive',
    href: undefined,
    note: 'Two Hobart locations · by appointment.',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    primary: 'Mon–Fri · Sat · Sun',
    href: undefined,
    note: business.hours.map((h) => `${h.day}: ${h.hours}`).slice(0, 3).join(' · '),
  },
];

const vehicleTips = [
  'Vehicle make, model and year',
  'Which windows you want tinted',
  'Preferred tint darkness / film type',
  'Any existing tint to remove',
  'Photos of the vehicle (optional)',
];

const propertyTips = [
  'Property type (home / office / shopfront)',
  'Approximate number of windows',
  'Goals: heat, glare, privacy or safety',
  'Suburb / location',
  'Photos of the glass areas (optional)',
];

const trustBadges = [
  { icon: Star, label: '5 Star Google Reviews' },
  { icon: Shield, label: 'Premium Films' },
  { icon: Wrench, label: 'Expert Installation' },
  { icon: MapPin, label: 'Local Hobart Business' },
];

const locations = [
  {
    name: 'Moonah',
    address: '9/14A Main Road, Moonah TAS 7009',
    image: images.aboutLocations.moonah,
    mapsQuery: '9/14A Main Road, Moonah TAS 7009',
  },
  {
    name: 'Bellerive',
    address: '107A Cambridge Road, Bellerive TAS',
    image: images.aboutLocations.bellerive,
    mapsQuery: '107A Cambridge Road, Bellerive TAS',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    telephone: business.phone,
    email: business.email,
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '9/14A Main Road',
        addressLocality: 'Moonah',
        addressRegion: 'TAS',
        postalCode: '7009',
        addressCountry: 'AU',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '107A Cambridge Road',
        addressLocality: 'Bellerive',
        addressRegion: 'TAS',
        addressCountry: 'AU',
      },
    ],
  };

  return (
    <>
      <SEO
        title="Contact Us | Spotless Tinting — Hobart"
        description="Contact Spotless Tinting in Moonah and Bellerive, Hobart. Call, email or send an enquiry for window tinting, PPF and vehicle wrapping."
        path="/contact"
        schema={localBusinessSchema}
      />

      {/* HERO — diagonal split */}
      <section className="relative overflow-hidden bg-white dark:bg-ink-950">
        <div className="relative flex min-h-[560px] flex-col lg:min-h-[660px] lg:flex-row">
          {/* Text */}
          <div className="relative z-20 flex w-full flex-col justify-center px-6 py-14 sm:px-10 lg:w-[48%] lg:px-12 lg:py-20 xl:w-[42%] xl:px-16">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-500">
                  Contact Spotless Tinting —
                </span>
                <h1 className="mt-4 text-4xl font-bold uppercase leading-[1.08] text-ink-950 dark:text-white sm:text-5xl lg:text-[2.85rem]">
                  Get in Touch with
                  <span className="mt-1 block text-accent-500">
                    Spotless Tinting
                    <span className="mt-2 block h-1.5 w-28 bg-accent-500" aria-hidden />
                  </span>
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink-700 dark:text-ink-300">
                  Whether you&apos;re looking for automotive window tinting, residential or commercial
                  film, PPF, vehicle wraps or Smart Tint, our team is here to help.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/quote" className="btn-primary">
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="btn border border-ink-900 bg-transparent text-ink-950 hover:bg-ink-950 hover:text-white dark:border-white/50 dark:text-white dark:hover:bg-white dark:hover:text-ink-950"
                  >
                    <Phone className="h-4 w-4" />
                    Call {business.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Diagonal image — desktop */}
          <div className="relative hidden min-h-full flex-1 lg:block" aria-hidden>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <img
                src={images.banner03}
                alt=""
                className="h-full w-full object-cover object-center"
              />
              {/* Soft feather along the diagonal edge */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-white via-white/70 to-transparent dark:from-ink-950 dark:via-ink-950/70"
                style={{
                  clipPath: 'polygon(0 0, 70% 0, 0% 100%, 0 100%)',
                }}
              />
            </div>
          </div>

          {/* Image — mobile */}
          <div className="relative h-64 sm:h-80 lg:hidden">
            <img
              src={images.contactHero}
              alt="Spotless Tinting — premium automotive window tinting"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-ink-950" />
          </div>
        </div>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="border-b border-ink-100 bg-white py-12 md:py-14 dark:border-ink-800 dark:bg-ink-950">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 40}>
                <div className="text-center lg:text-left">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500 lg:mx-0">
                    <card.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-950 dark:text-white">
                    {card.title}
                  </h3>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="mt-1.5 block text-sm font-semibold text-ink-800 hover:text-accent-600 dark:text-ink-200 dark:hover:text-accent-400"
                    >
                      {card.primary}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-sm font-semibold text-ink-800 dark:text-ink-200">{card.primary}</p>
                  )}
                  <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">{card.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + FASTER QUOTE */}
      <section className="section bg-ink-50 dark:bg-ink-900">
        <div className="container">
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="eyebrow">Enquiry</span>
              <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-ink-950 dark:text-white md:text-4xl">
                Tell Us What You Need
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm dark:border-ink-800 dark:bg-ink-950 md:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-500/15">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink-950 dark:text-white">Enquiry Sent!</h3>
                    <p className="mt-2 max-w-sm text-sm text-ink-600 dark:text-ink-300">
                      Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <button type="button" onClick={() => setSubmitted(false)} className="btn-outline mt-6">
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="label-field">Full Name *</label>
                        <input id="name" name="name" required className="input-field" placeholder="Your full name" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="label-field">Phone Number *</label>
                        <input id="phone" name="phone" required className="input-field" placeholder="Your phone" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="label-field">Email *</label>
                        <input id="email" name="email" type="email" required className="input-field" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label htmlFor="suburb" className="label-field">Suburb / Location</label>
                        <input id="suburb" name="suburb" className="input-field" placeholder="e.g. Moonah" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="service" className="label-field">Service Required</label>
                      <select id="service" name="service" className="input-field">
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vehicle" className="label-field">Vehicle Make &amp; Model</label>
                      <input
                        id="vehicle"
                        name="vehicle"
                        className="input-field"
                        placeholder="e.g. 2022 Toyota Hilux — or leave blank for property jobs"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="label-field">Enquiry Details *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="input-field"
                        placeholder="Tell us about your project, goals and any preferences…"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-method" className="label-field">Preferred Contact Method</label>
                      <select id="contact-method" name="contact-method" className="input-field">
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="whatsapp">WhatsApp / SMS</option>
                        <option value="either">Either</option>
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Send Enquiry
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-2xl bg-ink-950 p-6 text-white md:p-8">
                <h3 className="text-lg font-bold uppercase tracking-wide">Want a Faster Quote?</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  Call or message us directly — photos of your vehicle or windows help us quote accurately.
                </p>
                <ul className="mt-8 space-y-5">
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-accent-400">Phone</p>
                      <a href={business.phoneHref} className="mt-0.5 text-sm font-semibold hover:text-accent-400">
                        {business.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-accent-400">WhatsApp / SMS</p>
                      <a href={business.phoneHref} className="mt-0.5 text-sm font-semibold hover:text-accent-400">
                        Message us on {business.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-accent-400">Send Photos</p>
                      <p className="mt-0.5 text-sm text-ink-300">
                        Vehicle or window photos speed up your quote.
                      </p>
                    </div>
                  </li>
                </ul>
                <a
                  href={business.phoneHref}
                  className="btn mt-auto border border-accent-500 bg-transparent text-accent-400 hover:bg-accent-500 hover:text-white"
                >
                  Call / Message Us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section bg-white dark:bg-ink-950">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
            <Reveal>
              <div>
                <span className="eyebrow">Locations</span>
                <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-ink-950 dark:text-white md:text-4xl">
                  Visit Spotless Tinting
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  Two Hobart workshops — Moonah and Bellerive. Visits are by appointment, so please call
                  ahead and we&apos;ll prepare for your arrival.
                </p>
                <ul className="mt-8 space-y-5">
                  <li className="flex gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <div>
                      <p className="text-sm font-bold text-ink-950 dark:text-white">Phone</p>
                      <a
                        href={business.phoneHref}
                        className="mt-0.5 text-sm text-ink-600 hover:text-accent-600 dark:text-ink-300 dark:hover:text-accent-400"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <div>
                      <p className="text-sm font-bold text-ink-950 dark:text-white">Email</p>
                      <a
                        href={business.emailHref}
                        className="mt-0.5 text-sm text-ink-600 hover:text-accent-600 dark:text-ink-300 dark:hover:text-accent-400"
                      >
                        {business.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <div>
                      <p className="text-sm font-bold text-ink-950 dark:text-white">Workshop Access</p>
                      <p className="mt-0.5 text-sm text-ink-600 dark:text-ink-300">
                        By appointment at both locations — call ahead so we can prepare for your visit.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8 rounded-2xl border border-ink-100 bg-ink-50 p-5 dark:border-ink-800 dark:bg-ink-900">
                  <div className="flex gap-3">
                    <Car className="h-6 w-6 shrink-0 text-accent-500" />
                    <div>
                      <p className="text-sm font-bold text-ink-950 dark:text-white">Tip for best results</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                        Bring a clean, dry vehicle (or clear access to windows for property jobs) so we can
                        inspect and install to the highest standard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid gap-4 sm:grid-cols-2">
                {locations.map((loc) => (
                  <article
                    key={loc.name}
                    className="overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] ring-1 ring-ink-100/80 dark:bg-ink-900 dark:ring-ink-800"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={loc.image}
                        alt={`Spotless Tinting ${loc.name} storefront`}
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                        <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950 dark:text-white">
                          {loc.name}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-snug text-ink-500 dark:text-ink-400">
                        {loc.address}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-accent-500 transition-colors hover:text-accent-600"
                      >
                        Get Directions
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUOTE ACCURATELY */}
      <section className="section bg-ink-50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <Reveal>
                <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  To Help Us Quote Accurately
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <Reveal delay={40}>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-accent-600">
                      For Vehicle Jobs
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {vehicleTips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.5} />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-accent-600">
                      For Home / Commercial Jobs
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {propertyTips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" strokeWidth={2.5} />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center rounded-2xl border border-ink-100 bg-white p-5 text-center shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                      <badge.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-ink-800">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 opacity-35">
          <img src={images.heroCar} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/70" />
        </div>
        <div className="container relative z-10 py-20 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-300">
            Request a free quote or call Spotless Tinting today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={business.phoneHref}
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
