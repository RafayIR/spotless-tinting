import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Shield,
  Wrench,
  Award,
  Sparkles,
  Sun,
  Eye,
  Lock,
  Sofa,
  Car,
  Home,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import FAQAccordion from '@/components/FAQAccordion';
import Reveal from '@/components/Reveal';
import HomeHeroSlider from '@/components/HomeHeroSlider';
import WhyChooseFeatures from '@/components/WhyChooseFeatures';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProcessTimeline from '@/components/ProcessTimeline';
import GalleryGrid from '@/components/GalleryGrid';
import TestimonialCard from '@/components/TestimonialCard';
import {
  MoreThanDarkerGlassSection,
  WindowFilmTechnologySection,
} from '@/components/WindowFilmSections';
import { services } from '@/data/services';
import { reviews, overallRating, trustedBrands } from '@/data/reviews';
import { projects } from '@/data/projects';
import { business } from '@/data/business';
import { images } from '@/data/images';

const uspItems: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Shield,
    title: 'Premium Films',
    desc: 'Quality products selected for performance, comfort and protection.',
  },
  {
    icon: Wrench,
    title: 'Precision Installation',
    desc: 'Careful preparation and attention to detail from start to finish.',
  },
  {
    icon: MapPin,
    title: 'Local Hobart Service',
    desc: 'Based in Moonah and proudly servicing Hobart and surrounding areas.',
  },
  {
    icon: Award,
    title: 'Quality Finish',
    desc: 'Every installation is inspected before handover.',
  },
];

const tintFocus = [
  {
    icon: Car,
    title: 'Automotive',
    desc: 'Comfort, privacy and protection for cars, SUVs, utes and daily drivers.',
    path: '/services/automotive-window-tinting',
  },
  {
    icon: Home,
    title: 'Residential',
    desc: 'Window film solutions for bedrooms, living areas, glass doors and other residential spaces.',
    path: '/services/residential-window-tinting',
  },
  {
    icon: Building2,
    title: 'Commercial',
    desc: 'Professional film solutions for offices, meeting rooms, shopfronts and commercial glass.',
    path: '/services/commercial-window-tinting',
  },
];

const benefits: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Sun,
    title: 'Heat Reduction',
    desc: 'Helps reduce solar heat entering through glass for a more comfortable environment.',
  },
  {
    icon: Shield,
    title: 'UV Protection',
    desc: 'Selected window films can provide high levels of UV rejection, helping reduce exposure through glass.',
  },
  {
    icon: Eye,
    title: 'Glare Control',
    desc: 'Reduce harsh sunlight and improve visual comfort while driving, working or relaxing at home.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    desc: 'Choose from different film options depending on your privacy requirements.',
  },
  {
    icon: Sofa,
    title: 'Comfort',
    desc: 'Create a more comfortable vehicle, home or workplace throughout the day.',
  },
  {
    icon: Sparkles,
    title: 'Premium Appearance',
    desc: 'Enhance the look of your vehicle or property with a clean, professionally installed finish.',
  },
];

function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const homepageFaqs = [
  {
    question: 'What are the benefits of window tinting?',
    answer:
      'Window tinting can help reduce heat and glare, improve privacy, provide UV protection and enhance the overall appearance of a vehicle or property.',
  },
  {
    question: 'Does window tint help reduce heat?',
    answer:
      'Yes. Different window films are designed to reduce varying levels of solar heat. The right option depends on the glass, application and level of performance required.',
  },
  {
    question: 'Does window film provide UV protection?',
    answer:
      'Many quality window films are designed to reject a high percentage of UV radiation. Performance varies by product, so we can help you select an appropriate film.',
  },
  {
    question: 'What tint is legal in Tasmania?',
    answer:
      'Automotive window tint must comply with Tasmanian vehicle regulations. Our team can help you understand suitable options for your vehicle.',
  },
  {
    question: 'Do you provide residential and commercial window tinting?',
    answer:
      'Yes. Spotless Tinting provides window film solutions for vehicles, homes, offices, shopfronts and other commercial properties.',
  },
  {
    question: 'What other services do you offer?',
    answer:
      'In addition to window tinting, we offer paint protection film, vehicle wraps and Smart Tint solutions.',
  },
];

const workFilters = ['All', 'Window Tinting', 'PPF', 'Vehicle Wraps', 'Residential', 'Commercial'] as const;

export default function HomePage() {
  const [workFilter, setWorkFilter] = useState<(typeof workFilters)[number]>('All');
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const t = window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(t);
    }
  }, [hash]);

  const filteredProjects = projects
    .filter((p) => (workFilter === 'All' ? true : p.category === workFilter))
    .slice(0, 6);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    image: images.heroCar,
    url: `https://${business.website}`,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Moonah',
      addressRegion: 'TAS',
      addressCountry: 'AU',
    },
    areaServed: business.serviceAreas,
    description:
      'Professional window tinting in Hobart for cars, homes and businesses, plus PPF, vehicle wraps and Smart Tint.',
  };

  return (
    <>
      <SEO
        title="Window Tinting Hobart | Spotless Tinting"
        description="Professional window tinting in Hobart for cars, homes and businesses. Explore automotive, residential and commercial tinting, PPF, vehicle wraps and Smart Tint."
        path="/"
        image={images.homeBanner.slide1}
        schema={localBusinessSchema}
      />

      {/* HERO */}
      <HomeHeroSlider />

      <div className="relative z-10">
        {/* USP STRIP */}
        <section className="border-b border-ink-100 bg-white py-10 md:py-8" aria-label="Why choose Spotless Tinting">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {uspItems.map((item, i) => (
                <Reveal key={item.title} delay={i * 40}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink-950">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <span className="eyebrow">What We Do</span>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
                  Window Tinting &amp; Vehicle Protection Services
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-ink-600">
                  Spotless Tinting offers professional film and protection solutions for vehicles, homes
                  and commercial properties throughout Hobart.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ServicesShowcase services={services} />
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section bg-ink-50">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={images.installerWork}
                    alt="Spotless Tinting technician preparing glass for professional window film installation in Hobart"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <h2 className="text-3xl font-bold text-ink-950 md:text-4xl">About Spotless Tinting</h2>
                  <p className="mt-3 text-xl font-semibold text-accent-600">More Than Just a Finish.</p>
                  <p className="mt-5 leading-relaxed text-ink-600">
                    Spotless Tinting is a Moonah-based tinting and vehicle protection business serving
                    customers across Hobart.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-600">
                    We believe the quality of the final result starts long before the film is installed.
                    That means careful preparation, quality products, precise workmanship and attention to
                    detail on every job.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-600">
                    Whether we are tinting a vehicle, improving the comfort of a home, working on
                    commercial glass or protecting vehicle paintwork, our goal is simple: deliver a
                    professional result customers can feel confident in.
                  </p>
                  <Link to="/about" className="btn-primary mt-8">
                    About Spotless Tinting
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE — car hotspot section (visual; copy is real HTML for SEO) */}
        <WhyChooseFeatures />

        {/* WINDOW FILM TECHNOLOGY */}
        <MoreThanDarkerGlassSection />
        <WindowFilmTechnologySection />


        {/* BENEFITS */}
        {/* <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold md:text-4xl">More Than Just Window Tint</h2>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((item, i) => (
                <Reveal key={item.title} delay={i * 40}>
                  <div className="rounded-2xl border border-ink-100 bg-ink-50 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500">
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-ink-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}

        {/* PROCESS */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow">The Spotless Process</span>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
                  Precision. <span className="text-accent-500">Protection.</span> Perfection.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ProcessTimeline />
            </Reveal>
          </div>
        </section>

        {/* OUR WORK */}
        <section className="section bg-ink-50">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold md:text-4xl">Recent Spotless Tinting Projects</h2>
                <p className="mt-4 text-ink-600">
                  See examples of recent automotive, residential and commercial tinting, paint
                  protection film and vehicle wrap projects completed by Spotless Tinting.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 mb-8 flex flex-wrap justify-center gap-2">
              {workFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setWorkFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${workFilter === filter
                    ? 'bg-accent-500 text-white'
                    : 'border border-ink-200 bg-white text-ink-600 hover:border-accent-400 hover:text-accent-600'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <Reveal delay={80}>
              <GalleryGrid projects={filteredProjects} showViewAll />
            </Reveal>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="bg-[#f4f4f5]">
          <div className="container py-14 md:py-16">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))_0.58fr] lg:items-stretch lg:gap-4 xl:gap-5">
              <Reveal className="h-full sm:col-span-2 lg:col-span-1">
                <div className="flex h-full flex-col justify-center lg:max-w-[17rem] xl:max-w-none">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
                    What Our Customers Say
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-950 md:text-4xl">
                    Trusted by Locals
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600 sm:text-base lg:text-sm xl:text-base">
                    We&apos;re proud to be the trusted choice for window tinting and vehicle
                    protection in Hobart.
                  </p>
                  <Link
                    to="/reviews"
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-ink-900 bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:border-accent-500 hover:text-accent-600"
                  >
                    View All Reviews
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              {reviews.slice(0, 3).map((r, i) => (
                <Reveal key={r.id} delay={i * 50} className="h-full min-w-0">
                  <TestimonialCard review={r} />
                </Reveal>
              ))}

              <Reveal delay={120} className="h-full sm:col-span-2 lg:col-span-1">
                <a
                  href={business.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto flex h-full w-full max-w-[11rem] flex-col items-center justify-center rounded-2xl border border-ink-100/80 bg-white px-3 py-7 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)] lg:max-w-none lg:px-3.5 xl:px-4"
                >
                  <GoogleMark className="h-9 w-9" />
                  <p className="mt-4 text-3xl font-bold tracking-tight text-ink-950 xl:text-4xl">
                    {overallRating.score.toFixed(1)}
                  </p>
                  <div
                    className="mt-2.5 flex items-center gap-0.5"
                    aria-label={`${overallRating.score} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <p className="mt-3 text-[10px] leading-snug text-ink-500 xl:text-[11px]">
                    Based on {overallRating.countLabel} Google reviews
                  </p>
                </a>
              </Reveal>
            </div>
          </div>

          <div className="border-t border-ink-100 bg-white">
            <div className="container flex flex-col gap-6 py-4 sm:flex-row sm:items-center sm:gap-8 md:py-5">
              <p className="shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500">
                Trusted Brands
              </p>
              <div className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-between md:gap-x-2">
                {trustedBrands.map((brand) => (
                  <div className='w-15 h-20' key={brand.name}>
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="hidden h-10 w-px shrink-0 bg-ink-200 lg:block" aria-hidden />
              <p className="shrink-0 text-center text-[10px] font-bold uppercase leading-snug tracking-[0.16em] text-ink-400 sm:text-left lg:max-w-[7.5rem]">
                Quality Products
                <br />
                Real Results
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faqs" className="section bg-ink-50">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold md:text-4xl">Window Tinting FAQs</h2>
                  <p className="mt-4 text-ink-600">
                    Common questions about window tinting, film performance and our Hobart services.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <FAQAccordion items={homepageFaqs} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* LOCAL */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold text-ink-950 md:text-4xl">
                    Window Tinting in Moonah, Hobart
                  </h2>
                  <p className="mt-5 leading-relaxed text-ink-600">
                    Spotless Tinting is based in Moonah, Tasmania, providing professional tinting and
                    vehicle protection services to customers throughout Hobart and surrounding areas.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-600">
                    Whether you need automotive tinting, residential or commercial window film, PPF,
                    wraps or Smart Tint, our team can help you find the right solution for your project.
                  </p>
                  <div className="mt-6 space-y-3 text-sm">
                    <a
                      href={business.phoneHref}
                      className="flex items-center gap-2.5 font-semibold text-ink-800 hover:text-accent-600"
                    >
                      <Phone className="h-4 w-4 text-accent-500" />
                      {business.phone}
                    </a>
                    <a
                      href={business.emailHref}
                      className="flex items-center gap-2.5 font-semibold text-ink-800 hover:text-accent-600"
                    >
                      <Mail className="h-4 w-4 text-accent-500" />
                      {business.email}
                    </a>
                    <p className="flex items-center gap-2.5 text-ink-700">
                      <MapPin className="h-4 w-4 text-accent-500" />
                      {business.location}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {business.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-4 py-2 text-sm text-ink-700"
                      >
                        <MapPin className="h-3.5 w-3.5 text-accent-500" />
                        {area}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      Get Directions
                    </a>
                    <Link to="/quote" className="btn-primary">
                      Get a Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={images.commercialBuilding}
                    alt="Window tinting services available across Moonah and Hobart, Tasmania"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section bg-accent-500">
          <div className="container text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Ready for the Spotless Difference?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base text-white/90 md:text-lg">
              Talk to our team about the right window film or protection solution for your vehicle,
              home or business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/quote" className="btn w-full bg-white text-accent-600 hover:bg-ink-50 sm:w-auto">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={business.phoneHref}
                className="btn w-full border border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                Call {business.phone}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
