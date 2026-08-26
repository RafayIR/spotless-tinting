import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import ParallaxHero from '@/components/ParallaxHero';
import { reviews, overallRating } from '@/data/reviews';
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

const serviceCards: {
  title: string;
  desc: string;
  benefits?: string;
  cta: string;
  path: string;
  image: string;
  featured?: boolean;
}[] = [
  {
    title: 'Automotive Window Tinting',
    desc: 'Improve comfort, privacy and protection with professionally installed automotive window film.',
    benefits: 'Heat reduction · UV protection · Glare control · Privacy · Premium appearance',
    cta: 'Explore Automotive Window Tinting',
    path: '/services/automotive-window-tinting',
    image: images.sportsCar,
    featured: true,
  },
  {
    title: 'Residential Window Tinting',
    desc: 'Create a more comfortable and private home with window film designed to help manage heat, glare and UV exposure.',
    benefits: 'Heat control · UV protection · Privacy · Glare reduction · Interior protection',
    cta: 'Explore Residential Window Tinting',
    path: '/services/residential-window-tinting',
    image: images.modernHome,
    featured: true,
  },
  {
    title: 'Commercial Window Tinting',
    desc: 'Professional window film solutions for offices, shopfronts and commercial spaces.',
    benefits: 'Solar control · Privacy · Glare reduction · Safety & security · Decorative film options',
    cta: 'Explore Commercial Window Tinting',
    path: '/services/commercial-window-tinting',
    image: images.officeGlass,
    featured: true,
  },
  {
    title: 'Paint Protection Film (PPF)',
    desc: "Help protect your vehicle's paintwork from stone chips, scratches and everyday road exposure with professionally installed clear protection film.",
    cta: 'Explore PPF',
    path: '/services/paint-protection-film',
    image: images.ppfHero,
  },
  {
    title: 'Vehicle Wraps',
    desc: 'Transform the appearance of your vehicle with full or partial wraps, colour changes and custom finishes.',
    cta: 'Explore Vehicle Wraps',
    path: '/services/vehicle-wrapping',
    image: images.matteWrap,
  },
  {
    title: 'Smart Tint',
    desc: 'Switch suitable glass from clear to frosted for privacy at the touch of a button with modern switchable smart film.',
    cta: 'Explore Smart Tint',
    path: '/services/residential-window-tinting#smart-tint',
    image: images.residentialWindow,
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

const processSteps = [
  {
    num: '01',
    title: 'Customer Arrival',
    desc: 'We take the time to understand your needs, preferences and the result you are looking for.',
  },
  {
    num: '02',
    title: 'Inspection',
    desc: 'Your vehicle, glass or project area is inspected before work begins.',
  },
  {
    num: '03',
    title: 'Film Selection',
    desc: 'We help you select the right film based on privacy, performance, appearance and application.',
  },
  {
    num: '04',
    title: 'Precision Installation',
    desc: 'Your chosen film is professionally installed with careful preparation and attention to detail.',
  },
  {
    num: '05',
    title: 'Quality Inspection',
    desc: 'We inspect the completed work to ensure a clean and professional finish.',
  },
  {
    num: '06',
    title: 'Delivery & Aftercare',
    desc: 'We explain the relevant aftercare before handing your vehicle or project back to you.',
  },
];

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
        image={images.heroCar}
        schema={localBusinessSchema}
      />

      {/* HERO */}
      <ParallaxHero
        imageSrc={images.heroCar}
        imageAlt="Professional window tinting and vehicle protection by Spotless Tinting in Hobart"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-400">
            360° Film &amp; Protection Solutions — Automotive · Residential · Commercial
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Car, Home &amp; Commercial Window Tinting in Moonah, Hobart
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Spotless Tinting provides professional window tinting, paint protection film, vehicle wraps
            and smart film solutions for customers across Hobart and surrounding areas.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-300">
            From daily drivers and family homes to offices and shopfronts, we focus on quality products,
            careful preparation and precision installation to deliver a clean, professional finish.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Explore Window Tinting
            </Link>
          </div>
        </div>
      </ParallaxHero>

      <div className="relative z-10">
        {/* USP STRIP */}
        <section className="border-b border-ink-100 bg-white py-10 md:py-12" aria-label="Why choose Spotless Tinting">
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
                <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                  Window Tinting &amp; Vehicle Protection Services
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-ink-600">
                  Spotless Tinting offers professional film and protection solutions for vehicles, homes
                  and commercial properties throughout Hobart.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 50}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 shadow-sm transition-shadow hover:shadow-lg">
                    <div className={`overflow-hidden ${card.featured ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}>
                      <img
                        src={card.image}
                        alt={`${card.title} in Hobart by Spotless Tinting`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-ink-950">{card.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{card.desc}</p>
                      {card.benefits && (
                        <p className="mt-3 text-xs font-medium leading-relaxed text-ink-500">
                          {card.benefits}
                        </p>
                      )}
                      <Link
                        to={card.path}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent-600"
                      >
                        {card.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WINDOW TINTING FOCUS */}
        <section className="section bg-ink-50">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Professional Window Tinting in Hobart
                </h2>
                <p className="mt-5 text-ink-600">
                  Window tinting is about more than appearance. The right film can improve comfort,
                  reduce glare, increase privacy and help protect interiors from UV exposure.
                </p>
                <p className="mt-4 text-ink-600">
                  At Spotless Tinting, we provide tailored window film solutions for vehicles, homes and
                  commercial properties, helping customers choose the right film for their application,
                  performance needs and preferred finish.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {tintFocus.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <Link
                    to={item.path}
                    className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink-950">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/services" className="btn-primary">
                Explore Window Tinting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="section bg-white">
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

        {/* PROCESS */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                  The Spotless Process — Precision.{' '}
                  <span className="text-accent-500">Protection.</span> Perfection.
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 50}>
                  <div className="h-full rounded-2xl border border-ink-100 bg-ink-50 p-6">
                    <span className="text-sm font-bold text-accent-500">{step.num}</span>
                    <h3 className="mt-2 text-lg font-bold text-ink-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {workFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setWorkFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                    workFilter === filter
                      ? 'bg-accent-500 text-white'
                      : 'border border-ink-200 bg-white text-ink-600 hover:border-accent-400 hover:text-accent-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, i) => (
                <Reveal key={project.id} delay={i * 40}>
                  <article className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} — ${project.service} in ${project.location}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent-500">
                        {project.category}
                      </span>
                      <h3 className="mt-1.5 text-base font-bold text-ink-950">
                        {project.title} — {project.location}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-600">{project.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/gallery" className="btn-primary">
                View Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
                <p className="mt-4 text-ink-600">
                  Professional workmanship matters, but so does the customer experience. Read feedback
                  from customers who have trusted Spotless Tinting with their vehicles and properties.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="flex" aria-label={`${overallRating.score} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-ink-700">
                    {overallRating.score.toFixed(1)} from {overallRating.count} reviews on{' '}
                    {overallRating.source}
                  </span>
                </div>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {reviews.slice(0, 3).map((r, i) => (
                <Reveal key={r.id} delay={i * 60}>
                  <blockquote className="flex h-full flex-col rounded-2xl border border-ink-100 bg-ink-50 p-6">
                    <div className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className="h-4 w-4 fill-accent-500 text-accent-500" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                      &ldquo;{r.review}&rdquo;
                    </p>
                    <footer className="mt-5">
                      <p className="text-sm font-bold text-ink-950">{r.customerName}</p>
                      <p className="text-xs text-ink-500">
                        {r.service || 'Spotless Tinting'} · {r.source}
                      </p>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href={business.social.google}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Read More Google Reviews
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-ink-50">
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
