import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Shield,
  Eye,
  Lock,
  Sparkles,
  Star,
  Wrench,
  MapPin,
  CircleCheck,
  KeyRound,
  Phone,
  Mail,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import ParallaxHero from '@/components/ParallaxHero';
import FAQAccordion from '@/components/FAQAccordion';
import { FindYourPerfectShadeSection } from '@/components/WindowFilmSections';
import { images } from '@/data/images';
import { business } from '@/data/business';

const heroBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Sun, label: 'Heat Reduction' },
  { icon: Shield, label: 'UV Protection' },
  { icon: Eye, label: 'Glare Reduction' },
  { icon: Lock, label: 'Privacy' },
  { icon: Sparkles, label: 'Premium Look' },
];

const trustItems: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Star,
    title: 'Premium Films',
    desc: 'Quality automotive window films selected for performance and durability.',
  },
  {
    icon: Wrench,
    title: 'Precision Installation',
    desc: 'Professional preparation and careful attention to detail.',
  },
  {
    icon: MapPin,
    title: 'Local Hobart Service',
    desc: 'Based in Moonah and servicing customers across Hobart.',
  },
  {
    icon: CircleCheck,
    title: 'Quality Checked',
    desc: 'Every installation is inspected before handover.',
  },
];

const whyTintBenefits = [
  'Reduces heat for a cooler interior',
  'Blocks up to 99% of UV rays',
  'Reduces glare for safer driving',
  'Increases privacy and security',
  'Protects your interior from fading',
  'Enhances the look and value of your car',
] as const;

const whyTintCallouts = [
  'Stay cooler in summer.',
  'Protect your skin.',
  'Protect your investment.',
] as const;

function TintHeatArrows({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 72C24 54 34 38 46 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M46 22L40 30M46 22L52 28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 76C50 58 60 42 72 26"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M72 26L66 34M72 26L78 32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 80C76 62 86 46 98 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M98 30L92 38M98 30L104 36"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const filmFactors: { title: string; desc: string }[] = [
  {
    title: 'Heat Performance',
    desc: 'Compare films based on the level of solar heat control you want for the cabin.',
  },
  {
    title: 'UV Protection',
    desc: 'Consider a film designed to reduce UV transmission through vehicle glass.',
  },
  {
    title: 'Tint Shade',
    desc: 'Choose an appropriate visible light transmission level for the window position and desired privacy.',
  },
  {
    title: 'Appearance',
    desc: 'Select a shade and finish that complements your vehicle without compromising the result you need.',
  },
  {
    title: 'Driving Visibility',
    desc: 'Balance privacy and style with comfortable visibility for everyday driving.',
  },
];

const processSteps: {
  num: string;
  title: string;
  desc: string;
  iconSrc?: string;
  icon?: LucideIcon;
}[] = [
  {
    num: '01',
    title: 'Consult',
    desc: 'We discuss your vehicle, preferences and what you want from your window tint, then recommend suitable film options.',
    iconSrc: images.automotiveTinting.process.consult,
  },
  {
    num: '02',
    title: 'Prepare',
    desc: 'The glass is thoroughly cleaned and prepared to create the best possible surface for installation.',
    iconSrc: images.automotiveTinting.process.prepare,
  },
  {
    num: '03',
    title: 'Cut',
    desc: 'The automotive window film is precisely prepared to fit the required glass.',
    iconSrc: images.automotiveTinting.process.select,
  },
  {
    num: '04',
    title: 'Install',
    desc: 'Your selected film is professionally installed with care, precision and attention to detail.',
    iconSrc: images.automotiveTinting.process.install,
  },
  {
    num: '05',
    title: 'Inspect',
    desc: 'The completed tint is checked for quality and consistency before handover.',
    iconSrc: images.automotiveTinting.process.inspect,
  },
  {
    num: '06',
    title: 'Deliver',
    desc: 'Your vehicle is returned with the relevant window tint aftercare guidance.',
    icon: KeyRound,
  },
];

const aftercareItems = [
  {
    title: 'Allow the Film to Cure',
    desc: 'Temporary haziness or small moisture pockets can be visible while freshly installed film settles. Follow the aftercare guidance provided for your installation.',
  },
  {
    title: 'Wait Before Operating Windows',
    desc: 'Avoid lowering freshly tinted windows until the recommended waiting period has passed.',
  },
  {
    title: 'Clean Carefully',
    desc: 'Use suitable cleaning products and soft materials when cleaning tinted glass. Avoid abrasive tools or harsh products that may damage the film.',
  },
];

const galleryFilters = ['All', 'Sedans', 'SUVs', 'Utes', 'Sports'] as const;

const galleryItems: { id: string; title: string; filter: (typeof galleryFilters)[number]; image: string; alt: string }[] = [
  {
    id: 'g1',
    title: 'Sedan Window Tinting — Hobart',
    filter: 'Sedans',
    image: images.luxurySedan,
    alt: 'Sedan with professionally installed automotive window tint',
  },
  {
    id: 'g2',
    title: 'SUV Window Tinting — Hobart',
    filter: 'SUVs',
    image: images.suvDark,
    alt: 'SUV with dark automotive window film',
  },
  {
    id: 'g3',
    title: 'Ute Window Tinting — Hobart',
    filter: 'Utes',
    image: images.blackCar,
    alt: 'Ute with automotive window tinting',
  },
  {
    id: 'g4',
    title: 'Sports Coupe Window Tinting — Hobart',
    filter: 'Sports',
    image: images.sportsCar,
    alt: 'Sports coupe with premium window tint',
  },
  {
    id: 'g5',
    title: 'Coupe Window Tinting — Hobart',
    filter: 'Sedans',
    image: images.coupeSide,
    alt: 'Coupe side profile showing window tint finish',
  },
  {
    id: 'g6',
    title: 'Family SUV Window Tinting — Hobart',
    filter: 'SUVs',
    image: images.heroCar,
    alt: 'Family SUV with automotive window film installed',
  },
];

const automotiveFaqs = [
  {
    question: 'Is car window tinting legal in Tasmania?',
    answer:
      'Yes, automotive window tinting is permitted, but the film and tint level must comply with applicable vehicle requirements. The permitted level can vary by window position and vehicle. We can help you choose an appropriate option for your vehicle.',
  },
  {
    question: 'What is the legal window tint in Tasmania?',
    answer:
      'Legal requirements can differ depending on which vehicle window is being tinted. Rather than choosing a shade based on appearance alone, speak with our team about the vehicle and windows you want tinted so we can guide you toward a suitable option.',
  },
  {
    question: 'How long does car window tinting take?',
    answer:
      'Installation time depends on the vehicle, the number and shape of the windows, the film selected and whether existing tint needs to be removed. When you request a quote or booking, we can give you a more accurate timeframe for your vehicle.',
  },
  {
    question: 'Can I roll down my windows after tinting?',
    answer:
      'Freshly installed window film needs time to settle. Avoid operating the windows until the recommended waiting period provided by your installer has passed.',
  },
  {
    question: 'Does car window tint block UV?',
    answer:
      'Many quality automotive window films are designed to provide high levels of UV rejection. The exact performance depends on the film selected, so product specifications should be used for any specific UV-rejection claim.',
  },
  {
    question: 'Can window tint help keep my car cooler?',
    answer:
      'Automotive window film can help reduce solar heat entering through vehicle glass. The amount of heat reduction depends on the film technology, glass and conditions.',
  },
  {
    question: 'How long does automotive window tint last?',
    answer:
      'Film life depends on product quality, installation, vehicle use, environmental exposure and care. We can explain the expected performance and warranty, where applicable, for the specific film selected.',
  },
  {
    question: 'Can you remove existing window tint?',
    answer:
      'If your vehicle already has window film, let us know when requesting your quote. Existing tint may need to be assessed and removed before new film can be installed, which can affect the scope and price of the job.',
  },
  {
    question: 'How should I clean tinted car windows?',
    answer:
      'Use a soft microfibre cloth and a cleaner suitable for tinted windows. Avoid abrasive materials and follow the aftercare advice provided for the film installed on your vehicle.',
  },
  {
    question: 'Which tint shade should I choose?',
    answer:
      'The right shade depends on the window position, your privacy and appearance preferences, driving visibility and applicable requirements. We can help you compare the available options for your vehicle.',
  },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automotive Window Tinting',
  provider: {
    '@type': 'LocalBusiness',
    name: business.name,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Moonah',
      addressRegion: 'TAS',
      addressCountry: 'AU',
    },
  },
  areaServed: {
    '@type': 'City',
    name: 'Hobart',
  },
  description:
    'Professional car window tinting in Hobart for heat reduction, UV protection, glare control, privacy and style.',
};

export default function AutomotiveTintingPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof galleryFilters)[number]>('All');
  const filtered =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.filter === activeFilter);

  return (
    <>
      <SEO
        title="Car Window Tinting Hobart | Spotless Tinting"
        description="Professional car window tinting in Hobart for heat reduction, UV protection, glare control, privacy and style. Explore tint options or get a quote from Spotless Tinting."
        path="/services/automotive-window-tinting"
        image={images.sportsCar}
        schema={pageSchema}
      />

      <ParallaxHero
        imageSrc={images.autoTintingBanner}
        imageAlt="Vehicle with professional automotive window tinting"
        imageClassName="object-cover object-center"
      >
        <div className="max-w-3xl">
          <Breadcrumbs
            light
            crumbs={[
              { label: 'Home', path: '/' },
              { label: 'Window Tinting', path: '/services' },
              { label: 'Automotive Window Tinting' },
            ]}
          />
          <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Automotive Window Tinting in Hobart
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400 sm:text-sm">
            Comfort. Protection. Style.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Premium automotive window film designed to reduce heat and glare, provide UV protection,
            enhance privacy and give your vehicle a clean, premium finish. From daily drivers and
            family SUVs to utes and performance vehicles, Spotless Tinting provides professional car
            window tinting from our Moonah workshop for customers across Hobart.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#tint-options"
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              View Tint Options
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {heroBenefits.map((b) => (
              <li key={b.label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                  <b.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ParallaxHero>

      <div className="relative z-10">
        {/* Trust strip */}
        <section className="border-b border-ink-100 bg-white py-10 md:py-12">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Tint Your Vehicle? */}
        <section className="overflow-hidden bg-white">
          <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.02fr)] lg:items-stretch">
            <Reveal>
              <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-12 lg:py-20 xl:px-16">
                <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-ink-950 md:text-3xl lg:text-[2rem]">
                  <span className="relative inline-block pb-2">
                    Why
                    <span className="absolute bottom-0 left-0 h-1 w-10 bg-accent-500" aria-hidden />
                  </span>{' '}
                  Tint Your Vehicle?
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600 sm:text-base">
                  Window tinting is more than just a great look. It&apos;s about protection, comfort
                  and safety for you and your vehicle.
                </p>
                <ul className="mt-8 space-y-3.5">
                  {whyTintBenefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-800 sm:text-base">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                        <CircleCheck className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
                <img
                  src={images.automotiveTinting.whyTintYourVehicle}
                  alt="Driver's view through tinted car windshield"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = images.carInterior;
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/85 via-[18%] to-transparent to-[42%]"
                  aria-hidden
                />
                <TintHeatArrows className="pointer-events-none absolute left-[14%] top-[24%] z-10 h-20 w-28 text-accent-500 sm:left-[18%] sm:top-[28%] sm:h-24 sm:w-32" />
                <div className="absolute bottom-8 left-6 z-10 max-w-[220px] border-l-4 border-accent-500 bg-ink-950/85 px-5 py-4 text-white backdrop-blur-sm sm:bottom-10 sm:left-10 sm:max-w-xs">
                  {whyTintCallouts.map((line) => (
                    <p key={line} className="text-sm leading-relaxed sm:text-base">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <FindYourPerfectShadeSection id="tint-options" lawsHref="#tint-laws" />

        {/* Legal */}
        <section id="tint-laws" className="section bg-white">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Car Window Tint Laws in Tasmania
                  </h2>
                  <p className="mt-5 leading-relaxed text-ink-600">
                    Automotive window tinting must comply with applicable Tasmanian vehicle
                    requirements, and permitted tint levels can vary depending on the position of the
                    window and the vehicle. Our team can help you choose a suitable tint option that
                    balances appearance, privacy and visibility while remaining appropriate for your
                    vehicle and application.
                  </p>
                  <a href="#faqs" className="btn-outline mt-8 inline-flex">
                    Learn About Tasmanian Tint Requirements
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                  <img
                    src={images.installerWork}
                    alt="Technician preparing vehicle glass for window tint installation"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={900}
                    height={675}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Film selection */}
        <section className="section bg-ink-950 text-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  Choosing the Right Automotive Window Film
                </h2>
                <p className="mt-4 leading-relaxed text-ink-300">
                  The darkest tint is not automatically the best tint. The right automotive window
                  film depends on how you use your vehicle, the performance you want and the finish
                  you prefer. We can help you compare suitable films so you can make an informed
                  choice.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filmFactors.map((f, i) => (
                <Reveal key={f.title} delay={i * 40}>
                  <div className="border border-white/10 bg-white/5 p-6">
                    <h3 className="text-lg font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/contact" className="btn-primary">
                Talk to Our Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                  The Spotless Standard
                </p>
                <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  Our Automotive Window Tinting Process
                </h2>
                <p className="mt-4 leading-relaxed text-ink-600">
                  A quality automotive tint starts with careful preparation. Our process is designed
                  to give your vehicle a clean, professional finish from the first consultation
                  through to final inspection.
                </p>
              </div>
            </Reveal>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 40}>
                  <li className="relative border border-ink-100 bg-ink-50 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent-500">{step.num}</span>
                      {step.iconSrc ? (
                        <img
                          src={step.iconSrc}
                          alt=""
                          className="h-8 w-8"
                          aria-hidden
                          loading="lazy"
                        />
                      ) : step.icon ? (
                        <step.icon className="h-5 w-5 text-ink-400" />
                      ) : null}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink-950">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Aftercare */}
        <section id="aftercare" className="section bg-ink-50">
          <div className="container">
            <div className="grid items-start gap-10 lg:grid-cols-2">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Automotive Window Tint Aftercare
                  </h2>
                  <p className="mt-5 leading-relaxed text-ink-600">
                    Newly installed window film needs time to settle. Before you leave, we&apos;ll
                    explain the appropriate aftercare for the film installed on your vehicle so you
                    know what to expect during the curing period.
                  </p>
                  <a href="#aftercare-tips" className="btn-outline mt-8 inline-flex">
                    View Window Tint Aftercare
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div id="aftercare-tips" className="space-y-4">
                  {aftercareItems.map((item) => (
                    <article key={item.title} className="border-l-2 border-accent-500 bg-white p-5">
                      <h3 className="font-bold text-ink-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  Recent Car Window Tinting Projects
                </h2>
                <p className="mt-4 leading-relaxed text-ink-600">
                  Explore recent automotive window tinting completed by Spotless Tinting for cars,
                  SUVs, utes and performance vehicles in Hobart and surrounding areas.
                </p>
              </div>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {galleryFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    activeFilter === filter
                      ? 'bg-accent-500 text-white'
                      : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={i * 40}>
                  <article className="group overflow-hidden bg-ink-50">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-ink-950 md:text-base">{item.title}</h3>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/gallery" className="btn-outline">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="section bg-ink-50">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Car Window Tinting FAQs
                  </h2>
                  <p className="mt-4 text-ink-600">
                    Answers about legality, installation time, aftercare, UV performance and choosing
                    the right shade for your vehicle.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm">
                    <Link
                      to="/services"
                      className="font-semibold text-accent-600 hover:text-accent-700"
                    >
                      Window Tinting
                    </Link>
                    <span className="text-ink-300">·</span>
                    <Link
                      to="/services/residential-window-tinting"
                      className="font-semibold text-accent-600 hover:text-accent-700"
                    >
                      Residential Window Tinting
                    </Link>
                    <span className="text-ink-300">·</span>
                    <Link
                      to="/services/commercial-window-tinting"
                      className="font-semibold text-accent-600 hover:text-accent-700"
                    >
                      Commercial Window Tinting
                    </Link>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <FAQAccordion items={automotiveFaqs} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Local SEO */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold text-ink-950 md:text-4xl">
                    Car Window Tinting in Moonah, Hobart
                  </h2>
                  <p className="mt-5 leading-relaxed text-ink-600">
                    Spotless Tinting provides professional automotive window tinting from our workshop
                    in Moonah, serving drivers across Hobart and surrounding areas. From everyday cars
                    and family SUVs to utes and performance vehicles, we focus on careful preparation,
                    precision installation and a clean, professional finish.
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
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      Get Directions
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <Link to="/quote" className="btn-primary">
                      Get a Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="aspect-[4/3] overflow-hidden bg-ink-100">
                  <img
                    src={images.garageWork}
                    alt="Spotless Tinting workshop area for automotive window tinting in Moonah"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width={900}
                    height={675}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section bg-accent-500 text-center">
          <div className="container">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Upgrade Your Ride?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">
              Talk to Spotless Tinting about professional car window tinting in Hobart. We&apos;ll
              help you compare suitable film options for comfort, privacy, protection and style.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/quote" className="btn bg-white text-accent-600 hover:bg-ink-50">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={business.phoneHref}
                className="btn border border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {business.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/80">{business.location}</p>
          </div>
        </section>
      </div>
    </>
  );
}
