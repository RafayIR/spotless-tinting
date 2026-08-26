import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Shield,
  Eye,
  Lock,
  ShieldCheck,
  Thermometer,
  Monitor,
  Ban,
  Store,
  Briefcase,
  Hotel,
  HeartPulse,
  GraduationCap,
  Factory,
  ClipboardList,
  Search,
  Layers,
  FileText,
  Wrench,
  CircleCheck,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import ParallaxHero from '@/components/ParallaxHero';
import FAQAccordion from '@/components/FAQAccordion';
import { images } from '@/data/images';
import { faqs } from '@/data/faqs';

const benefitBar: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sun, title: 'Solar Control', desc: 'Reduce solar heat gain across glazed façades.' },
  { icon: Shield, title: 'UV Protection', desc: 'Block up to 99% of harmful UV rays.' },
  { icon: Eye, title: 'Glare Reduction', desc: 'Improve screen visibility and comfort.' },
  { icon: Lock, title: 'Privacy', desc: 'Control visibility for offices and meeting rooms.' },
  { icon: ShieldCheck, title: 'Safety & Security', desc: 'Hold glass together and deter vandalism.' },
];

const painPoints: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Thermometer, title: 'Excessive Heat', desc: 'Solar heat through glass makes offices uncomfortable and drives up cooling costs.' },
  { icon: Monitor, title: 'Screen Glare', desc: 'Harsh glare washes out screens and reduces productivity throughout the day.' },
  { icon: Ban, title: 'Lack of Privacy', desc: 'Street-facing and open-plan glass exposes confidential conversations and workspaces.' },
  { icon: Sun, title: 'UV Exposure', desc: 'UV fades furnishings and increases long-term exposure for staff and customers.' },
  { icon: ShieldCheck, title: 'Glass Safety', desc: 'Unprotected glass can shatter dangerously — film helps hold fragments in place.' },
];

const filmSolutions: {
  title: string;
  desc: string;
  features: string[];
  image: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Solar Control Film',
    desc: 'Reject heat and glare while keeping interiors bright and productive.',
    features: ['Heat reduction', 'Energy savings', 'Glare control', 'UV protection'],
    image: images.officeGlass,
    icon: Sun,
  },
  {
    title: 'Privacy Film',
    desc: 'Create private spaces without sacrificing natural light.',
    features: ['Daytime privacy', 'Meeting rooms', 'Street-facing glass', 'Discrete finishes'],
    image: images.commercialBuilding,
    icon: Lock,
  },
  {
    title: 'Decorative & Frosted Film',
    desc: 'Add style and soft privacy with frosted and patterned films.',
    features: ['Frosted finishes', 'Wayfinding bands', 'Modern aesthetics', 'Easy to refresh'],
    image: images.shopfront,
    icon: Layers,
  },
  {
    title: 'Safety & Security Film',
    desc: 'Strengthen glass against impact and improve retention if broken.',
    features: ['Glass retention', 'Impact resistance', 'Peace of mind', 'Clear options'],
    image: images.installerWork,
    icon: ShieldCheck,
  },
  {
    title: 'Anti-Graffiti Film',
    desc: 'Protect shopfronts and ground-level glass from vandalism.',
    features: ['Sacrificial layer', 'Cost-effective', 'Quick replacement', 'Clear protection'],
    image: images.shopfront,
    icon: Shield,
  },
];

const spaceCallouts = [
  { label: 'Offices', top: '22%', left: '28%' },
  { label: 'Meeting Rooms', top: '38%', left: '58%' },
  { label: 'Shopfronts', top: '68%', left: '18%' },
  { label: 'Reception Areas', top: '52%', left: '42%' },
  { label: 'Glass Partitions', top: '34%', left: '72%' },
  { label: 'Entry Doors', top: '78%', left: '55%' },
];

const comfortItems: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Thermometer, title: 'Reduce Heat', desc: 'Keep workspaces cooler and cut HVAC load with solar control films.' },
  { icon: Eye, title: 'Control Glare', desc: 'Improve screen clarity and visual comfort across open-plan offices.' },
  { icon: Sun, title: 'Manage UV', desc: 'Protect people and interiors from harmful ultraviolet exposure.' },
  { icon: Lock, title: 'Enhance Privacy', desc: 'Create confidential spaces for meetings, receptions and shopfronts.' },
];

const brandingFilms = [
  { title: 'Clear Glass', image: images.officeGlass },
  { title: 'Frosted Film', image: images.commercialBuilding },
  { title: 'Decorative Film', image: images.shopfront },
  { title: 'Branded Film', image: images.modernHome },
];

const techCallouts = [
  { title: 'Solar Energy Rejected', desc: 'Advanced films reduce heat entering through glass.' },
  { title: 'UV Rays Filtered', desc: 'Blocks up to 99% of harmful ultraviolet radiation.' },
  { title: 'Glare Minimised', desc: 'Improves comfort without darkening spaces excessively.' },
  { title: 'Visible Light Balanced', desc: 'Maintain daylight while controlling intensity.' },
];

const industries: { icon: LucideIcon; label: string }[] = [
  { icon: Briefcase, label: 'Offices' },
  { icon: Store, label: 'Retail & Shopfronts' },
  { icon: Hotel, label: 'Hospitality' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Factory, label: 'Industrial & Commercial' },
];

const processSteps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  { num: '01', title: 'Enquire', desc: 'Tell us about your building, challenges and goals.', icon: ClipboardList },
  { num: '02', title: 'Site Assessment', desc: 'We inspect glass, orientation and usage patterns.', icon: Search },
  { num: '03', title: 'Film Recommendation', desc: 'We specify the right film for each application.', icon: Layers },
  { num: '04', title: 'Quote', desc: 'Receive a clear, transparent commercial quote.', icon: FileText },
  { num: '05', title: 'Installation', desc: 'Professional install with minimal business disruption.', icon: Wrench },
  { num: '06', title: 'Final Inspection', desc: 'Quality check and handover on completion.', icon: CircleCheck },
];

const commercialFaqs = [
  ...faqs.filter((f) => f.category === 'Commercial Tinting'),
  {
    id: 'c3',
    category: 'Commercial Tinting',
    question: 'Can window film reduce heat in an office?',
    answer:
      'Yes. Solar control films reject a significant portion of solar heat, helping keep interiors cooler, reducing glare on screens and often lowering air-conditioning demand.',
  },
  {
    id: 'c4',
    category: 'Commercial Tinting',
    question: 'Will commercial tinting disrupt our business?',
    answer:
      'We schedule installations to minimise disruption — often outside peak hours. Most applications are clean, low-odour and completed in stages so operations can continue.',
  },
  {
    id: 'c5',
    category: 'Commercial Tinting',
    question: 'Can you apply frosted or branded film for privacy?',
    answer:
      'Absolutely. Frosted, decorative and branded films are ideal for meeting rooms, reception areas, partitions and shopfronts where privacy and branding matter.',
  },
];

const galleryFilters = ['All', 'Solar Control', 'Privacy', 'Frosted & Decorative', 'Safety', 'Smart Film'];

const galleryItems = [
  { id: '1', title: 'Office Solar Control', filter: 'Solar Control', image: images.officeGlass },
  { id: '2', title: 'Meeting Room Privacy', filter: 'Privacy', image: images.commercialBuilding },
  { id: '3', title: 'Shopfront Frosted Band', filter: 'Frosted & Decorative', image: images.shopfront },
  { id: '4', title: 'Safety Film Upgrade', filter: 'Safety', image: images.installerWork },
  { id: '5', title: 'Reception Glass', filter: 'Privacy', image: images.modernHome },
  { id: '6', title: 'Retail Anti-Glare', filter: 'Solar Control', image: images.commercialBuilding },
];

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 select-none">
      <img
        src={images.officeGlass}
        alt="After window film"
        className="absolute inset-0 h-full w-full object-cover brightness-90 contrast-110"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={images.commercialBuilding}
          alt="Before window film"
          className="absolute inset-0 h-full w-full object-cover brightness-125"
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div
        className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-lg"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg">
          <span className="text-xs font-bold">⇄</span>
        </div>
      </div>

      <span className="absolute left-4 top-4 z-20 rounded bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        Before Window Film
      </span>
      <span className="absolute right-4 top-4 z-20 rounded bg-accent-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        After Window Film
      </span>

      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-30 cursor-ew-resize opacity-0"
        aria-label="Compare before and after window film"
      />
    </div>
  );
}

export default function CommercialTintingPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.filter === activeFilter);

  return (
    <>
      <SEO
        title="Commercial Window Tinting Hobart | Spotless Tinting"
        description="Professional commercial window tinting for offices, retail and shopfronts in Hobart. Solar control, privacy, frosted, safety and anti-graffiti films."
        path="/services/commercial-window-tinting"
        image={images.commercialBuilding}
      />

      {/* HERO — parallax fixed background */}
      <ParallaxHero
        imageSrc={images.commercialBuilding}
        imageAlt="Modern commercial building with window tinting"
        imageClassName="object-cover object-center"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Commercial Window{' '}
            <span className="text-accent-400">Tinting</span>
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400 sm:text-sm">
            Performance · Privacy · Protection
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Professional window film solutions for offices, shopfronts and commercial spaces —
            improving comfort, privacy, safety and energy efficiency across Hobart.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#solutions" className="btn border border-white/30 bg-transparent text-white hover:bg-white/10">
              Explore Commercial Solutions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </ParallaxHero>

      <div className="relative z-10">
        {/* BENEFITS BAR */}
        <section className="border-b border-ink-100 bg-ink-50 py-10 md:py-12">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {benefitBar.map((item, i) => (
                <Reveal key={item.title} delay={i * 40}>
                  <div className="text-center lg:text-left">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500 lg:mx-0">
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* BETTER GLASS */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Better Glass. Better Work Environment.
                </h2>
                <p className="mt-4 text-ink-600">
                  Commercial window film solves the everyday problems of heat, glare, privacy and safety —
                  without replacing your glass.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <ul className="space-y-5">
                  {painPoints.map((p) => (
                    <li key={p.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-ink-950">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <BeforeAfterSlider />
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {['Reduces Heat', 'Reduces Glare', 'Blocks UV Rays', 'Enhances Privacy'].map(
                      (label) => (
                        <span
                          key={label}
                          className="rounded-lg border border-ink-100 bg-ink-50 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-700"
                        >
                          {label}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FILM SOLUTIONS */}
        <section id="solutions" className="section bg-ink-50">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow">Solutions</span>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Window Film Solutions for Your Business
                </h2>
                <p className="mt-4 text-ink-600">
                  From solar control to security and branding — the right film for every commercial application.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {filmSolutions.map((sol, i) => (
                <Reveal key={sol.title} delay={i * 50}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                        <sol.icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-ink-950">
                        {sol.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{sol.desc}</p>
                      <ul className="mt-4 space-y-1.5">
                        {sol.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-ink-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/quote"
                        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold uppercase tracking-wide text-accent-600"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SPACES + COMFORT */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="eyebrow">Applications</span>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Solutions Across Every Space
                  </h2>
                  <p className="mt-3 text-sm text-ink-600">
                    We tailor film specifications to each zone of your building.
                  </p>
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-ink-100 bg-ink-50">
                    <img
                      src={images.commercialBuilding}
                      alt="Commercial building applications"
                      className="h-full w-full object-cover opacity-40"
                      loading="lazy"
                    />
                    {spaceCallouts.map((c) => (
                      <div
                        key={c.label}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ top: c.top, left: c.left }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent-500 ring-4 ring-accent-500/20" />
                          <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-900 shadow-sm">
                            {c.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <span className="eyebrow">Workplace Comfort</span>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Create a More Comfortable Workplace
                  </h2>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {comfortItems.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-ink-100 bg-ink-50 p-5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-ink-950">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PRIVACY + TECH */}
        <section className="section bg-ink-50">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="eyebrow">Privacy & Branding</span>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Privacy &amp; Branding Solutions
                  </h2>
                  <p className="mt-3 text-sm text-ink-600">
                    From clear solar films to frosted, decorative and branded options.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {brandingFilms.map((f) => (
                      <div key={f.title} className="overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={f.image}
                            alt={f.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-ink-800">
                          {f.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <span className="eyebrow">Technology</span>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Advanced Film Technology
                  </h2>
                  <p className="mt-3 text-sm text-ink-600">
                    Engineered multi-layer films that filter heat, UV and glare while balancing daylight.
                  </p>
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white p-4">
                    <img
                      src={images.filmTechnology}
                      alt="Window film technology layers"
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {techCallouts.map((t) => (
                      <div key={t.title} className="rounded-xl border border-ink-100 bg-white p-4">
                        <h4 className="text-xs font-bold uppercase tracking-wide text-accent-600">
                          {t.title}
                        </h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SAFETY + INDUSTRIES */}
        <section className="section bg-ink-950">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="eyebrow text-accent-400">Protection</span>
                  <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    Safety &amp; Security
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-300">
                    Safety and security films help hold glass together under impact, reducing injury risk
                    and deterring smash-and-grab incidents on shopfronts and ground-level façades.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      'Glass retention if panes break',
                      'Clear films that preserve views',
                      'Ideal for shopfronts and lobbies',
                      'Professional commercial installation',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-ink-200">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-accent-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/quote" className="btn-primary mt-8">
                    Learn More About Safety Film
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <span className="eyebrow text-accent-400">Who We Serve</span>
                  <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Industries</h2>
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {industries.map((ind) => (
                      <div
                        key={ind.label}
                        className="flex flex-col items-center rounded-2xl border border-ink-800 bg-ink-900 p-5 text-center"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                          <ind.icon className="h-5 w-5" />
                        </div>
                        <span className="mt-3 text-xs font-bold uppercase tracking-wide text-white">
                          {ind.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS + FAQ */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <Reveal>
                  <span className="eyebrow">How It Works</span>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    The Spotless Commercial Process
                  </h2>
                </Reveal>
                <div className="mt-8 space-y-0">
                  {processSteps.map((step, i) => {
                    const Icon = step.icon;
                    const isLast = i === processSteps.length - 1;
                    return (
                      <div key={step.num} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md">
                            <Icon className="h-5 w-5 text-ink-900" strokeWidth={1.6} />
                          </div>
                          {!isLast && <div className="my-1 w-px flex-1 bg-accent-300" />}
                        </div>
                        <div className={isLast ? 'pb-0' : 'pb-6'}>
                          <span className="text-xs font-bold text-accent-500">{step.num}</span>
                          <h3 className="mt-0.5 text-sm font-bold uppercase text-ink-950">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm text-ink-500">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Reveal>
                  <span className="eyebrow">Questions</span>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    Commercial Window Tinting FAQs
                  </h2>
                </Reveal>
                <div className="mt-8">
                  <FAQAccordion
                    items={commercialFaqs.map((f) => ({
                      question: f.question,
                      answer: f.answer,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section bg-ink-950">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow text-accent-400">Portfolio</span>
                <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                  Recent Commercial Projects
                </h2>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {galleryFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                    activeFilter === filter
                      ? 'bg-accent-500 text-white'
                      : 'border border-ink-700 text-ink-300 hover:border-accent-500 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={i * 40}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                        {item.filter}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/gallery"
                className="btn border border-ink-600 bg-transparent text-white hover:border-accent-500 hover:bg-accent-500/10"
              >
                View All Commercial Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
