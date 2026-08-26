import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Shield,
  Eye,
  Lock,
  Sofa,
  Thermometer,
  Image as ImageIcon,
  // Curtains,
  Palette,
  Home,
  Bath,
  DoorOpen,
  Sofa as LivingIcon,
  CloudSun,
  Laptop,
  MessageSquare,
  Search,
  Layers,
  SprayCan,
  Paintbrush,
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
  { icon: Sun, title: 'Heat Reduction', desc: 'Keep rooms cooler through summer.' },
  { icon: Shield, title: 'UV Protection', desc: 'Block up to 99% of harmful UV rays.' },
  { icon: Eye, title: 'Glare Control', desc: 'Reduce harsh glare on screens and surfaces.' },
  { icon: Lock, title: 'Privacy', desc: 'Daytime privacy without heavy curtains.' },
  { icon: Sofa, title: 'Interior Protection', desc: 'Help prevent fading of floors and furnishings.' },
];

const comfortChecks = [
  'Too much heat through your windows?',
  'Uncomfortable glare on TVs and screens?',
  'Want more privacy without closing curtains?',
  'Concerned about UV fading your interiors?',
  'Looking for a cleaner, more refined finish?',
];

const filmSolutions: {
  title: string;
  desc: string;
  image: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Solar Control Film',
    desc: 'Reduce heat and glare while keeping natural light in your living spaces.',
    image: images.modernHome,
    icon: Sun,
  },
  {
    title: 'Privacy Film',
    desc: 'Enhance daytime privacy for street-facing rooms and open glass areas.',
    image: images.residentialWindow,
    icon: Lock,
  },
  {
    title: 'Decorative & Frosted Film',
    desc: 'Soft privacy and style for bathrooms, entryways and glass partitions.',
    image: images.shopfront,
    icon: Layers,
  },
  {
    title: 'Safety & Security Film',
    desc: 'Help hold glass together under impact for added peace of mind at home.',
    image: images.installerWork,
    icon: Shield,
  },
];

const homeZones = [
  { label: 'Bedrooms', top: '28%', left: '22%' },
  { label: 'Bathrooms', top: '42%', left: '68%' },
  { label: 'Entryways', top: '72%', left: '30%' },
  { label: 'Living Areas', top: '55%', left: '48%' },
  { label: 'Skylights', top: '14%', left: '52%' },
  { label: 'Home Offices', top: '38%', left: '78%' },
];

const techCallouts = [
  { title: 'Solar Energy Rejected', desc: 'Helps reduce heat entering through glass.' },
  { title: 'UV Radiation Blocked', desc: 'Protects interiors from fading and UV exposure.' },
  { title: 'Glare Minimised', desc: 'Improves comfort without making rooms gloomy.' },
  { title: 'Visible Light Balanced', desc: 'Keeps natural light while controlling intensity.' },
];

const protectItems: { icon: LucideIcon; label: string }[] = [
  { icon: Home, label: 'Flooring' },
  { icon: Sofa, label: 'Furniture' },
  // { icon: Curtains, label: 'Curtains' },
  { icon: ImageIcon, label: 'Artwork' },
  { icon: Palette, label: 'Interiors' },
];

const privacyOptions = [
  { title: 'Clear Glass', image: images.residentialWindow },
  { title: 'Privacy Film', image: images.modernHome },
  { title: 'Frosted Film', image: images.shopfront },
];

const processSteps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  { num: '01', title: 'Consult', desc: 'Discuss your home, goals and comfort needs.', icon: MessageSquare },
  { num: '02', title: 'Assess', desc: 'We review glass, orientation and room usage.', icon: Search },
  { num: '03', title: 'Select', desc: 'Choose the ideal film for each window.', icon: Layers },
  { num: '04', title: 'Prepare', desc: 'Windows are cleaned and ready for install.', icon: SprayCan },
  { num: '05', title: 'Install', desc: 'Precision application with a clean finish.', icon: Paintbrush },
  { num: '06', title: 'Inspect', desc: 'Final check for a flawless residential result.', icon: CircleCheck },
];

const residentialFaqs = [
  ...faqs.filter((f) => f.category === 'Residential Tinting'),
  {
    id: 'r4',
    category: 'Residential Tinting',
    question: 'Will residential tinting make my home darker?',
    answer:
      'Not necessarily. Many modern films reduce heat and glare while allowing plenty of natural light. We help you choose a level that balances comfort and brightness.',
  },
  {
    id: 'r5',
    category: 'Residential Tinting',
    question: 'Can film protect furniture and flooring from fading?',
    answer:
      'Yes. Quality window films block a high percentage of UV rays, which is a major cause of fading in floors, furniture, curtains and artwork.',
  },
  {
    id: 'r6',
    category: 'Residential Tinting',
    question: 'Do you offer frosted film for bathrooms?',
    answer:
      'Absolutely. Frosted and decorative films are popular for bathrooms, entryways and glass partitions where privacy matters without blocking light.',
  },
];

const galleryItems = [
  { id: '1', title: 'Modern Villa Solar Film', image: images.modernHome },
  { id: '2', title: 'Living Room Glare Control', image: images.residentialWindow },
  { id: '3', title: 'Bathroom Frosted Film', image: images.shopfront },
  { id: '4', title: 'Street-Facing Privacy', image: images.commercialBuilding },
  { id: '5', title: 'Skylight Heat Reduction', image: images.officeGlass },
  { id: '6', title: 'Home Office Comfort', image: images.installerWork },
];

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before Window Film',
  afterLabel = 'After Window Film',
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 select-none">
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover brightness-90 contrast-110"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 h-full w-full object-cover brightness-125"
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg">
          <span className="text-xs font-bold">⇄</span>
        </div>
      </div>

      <span className="absolute left-4 top-4 z-20 rounded bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 z-20 rounded bg-accent-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        {afterLabel}
      </span>

      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-30 cursor-ew-resize opacity-0"
        aria-label="Compare before and after"
      />
    </div>
  );
}

export default function ResidentialTintingPage() {
  return (
    <>
      <SEO
        title="Residential Window Tinting Hobart | Spotless Tinting"
        description="Home window tinting in Hobart. Reduce heat, glare and UV while improving privacy. Solar control, privacy, frosted and safety films."
        path="/services/residential-window-tinting"
        image={images.modernHome}
      />

      {/* HERO */}
      <ParallaxHero
        imageSrc={images.modernHome}
        imageAlt="Modern home with residential window tinting"
        imageClassName="object-cover object-center"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Residential Window{' '}
            <span className="text-accent-400">Tinting</span>
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400 sm:text-sm">
            Comfort · Privacy · Protection
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Professional window film solutions for homes across Hobart — reducing heat and glare,
            blocking UV and enhancing privacy without sacrificing natural light.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#solutions"
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Explore Film Options
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

        {/* COMFORT + BEFORE/AFTER */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Make Your Home More Comfortable
                  </h2>
                  <p className="mt-4 text-ink-600">
                    Window film is a simple upgrade that transforms how your home feels every day.
                  </p>
                  <ul className="mt-8 space-y-3">
                    {comfortChecks.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-ink-700 sm:text-base">
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
                <div>
                  <BeforeAfterSlider
                    beforeSrc={images.residentialWindow}
                    afterSrc={images.modernHome}
                  />
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { icon: Thermometer, label: 'Reduces Heat' },
                      { icon: Eye, label: 'Reduces Glare' },
                      { icon: Shield, label: 'Blocks UV Rays' },
                      { icon: Lock, label: 'Enhances Privacy' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center rounded-lg border border-ink-100 bg-ink-50 px-2 py-3 text-center"
                      >
                        <item.icon className="h-4 w-4 text-accent-500" />
                        <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-700">
                          {item.label}
                        </span>
                      </div>
                    ))}
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
                <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  Window Film Solutions for Every Home
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{sol.desc}</p>
                      <Link
                        to="/quote"
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-600"
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

        {/* DESIGNED AROUND HOME + TECH */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="eyebrow">Applications</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    Designed Around Your Home
                  </h2>
                  <p className="mt-3 text-sm text-ink-600">
                    We recommend the right film for every room and glass type.
                  </p>
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-ink-100 bg-ink-50">
                    <img
                      src={images.modernHome}
                      alt="Home window film applications"
                      className="h-full w-full object-cover opacity-40"
                      loading="lazy"
                    />
                    {homeZones.map((z) => (
                      <div
                        key={z.label}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ top: z.top, left: z.left }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent-500 ring-4 ring-accent-500/20" />
                          <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-900 shadow-sm">
                            {z.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { icon: Home, label: 'Bedrooms' },
                      { icon: Bath, label: 'Bathrooms' },
                      { icon: DoorOpen, label: 'Entryways' },
                      { icon: LivingIcon, label: 'Living Areas' },
                      { icon: CloudSun, label: 'Skylights' },
                      { icon: Laptop, label: 'Home Offices' },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-ink-50 px-3 py-1.5 text-[11px] font-semibold text-ink-700"
                      >
                        <item.icon className="h-3.5 w-3.5 text-accent-500" />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <span className="eyebrow">Technology</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    Advanced Film Technology
                  </h2>
                  <p className="mt-3 text-sm text-ink-600">
                    Multi-layer films engineered to manage heat, UV, glare and daylight.
                  </p>
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 p-4">
                    <img
                      src={images.filmTechnology}
                      alt="Window film technology layers"
                      loading="lazy"
                      className="aspect-[16/10] w-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {techCallouts.map((t) => (
                      <div key={t.title} className="rounded-xl border border-ink-100 bg-ink-50 p-4">
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

        {/* PROTECT + PRIVACY */}
        <section className="section bg-ink-50">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="eyebrow">Interior Care</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    Protect What&apos;s Inside.
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-600">
                    UV rays fade floors, furniture and fabrics over time. Residential window film
                    helps preserve the look and value of your interiors.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {protectItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center rounded-xl border border-ink-100 bg-white p-4 text-center"
                      >
                        <item.icon className="h-5 w-5 text-accent-500" />
                        <span className="mt-2 text-[10px] font-bold uppercase tracking-wide text-ink-800">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <span className="eyebrow">Privacy</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    Privacy Options to Suit Your Needs
                  </h2>
                  <p className="mt-4 text-sm text-ink-600">
                    Choose the look that fits each room — from clear solar films to soft frosted privacy.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {privacyOptions.map((opt) => (
                      <div key={opt.title} className="overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={opt.image}
                            alt={opt.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="px-2 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-ink-800">
                          {opt.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SMART TINT */}
        <section id="smart-tint" className="section bg-ink-950">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <div>
                  <span className="eyebrow text-accent-400">Upgrade</span>
                  <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                    Smart Tint
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-300">
                    Switch glass from clear to frosted at the touch of a button — ideal for bathrooms,
                    meeting corners at home, and spaces where privacy needs change throughout the day.
                  </p>
                  <Link to="/quote" className="btn-primary mt-8">
                    Discover Smart Tint
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <BeforeAfterSlider
                  beforeSrc={images.residentialWindow}
                  afterSrc={images.shopfront}
                  beforeLabel="Clear"
                  afterLabel="Frosted"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow">How It Works</span>
                <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                  The Spotless Residential Process
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 hidden lg:block">
              <div className="grid grid-cols-6 gap-2">
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === processSteps.length - 1;
                  return (
                    <div key={step.num} className="relative flex flex-col items-center text-center">
                      {!isLast && (
                        <ArrowRight
                          className="absolute -right-3 top-8 z-10 h-4 w-4 text-accent-400"
                          aria-hidden
                        />
                      )}
                      <span className="text-xs font-bold text-accent-500">{step.num}</span>
                      <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md">
                        <Icon className="h-5 w-5 text-ink-900" strokeWidth={1.6} />
                      </div>
                      <h3 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-950">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink-500">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 space-y-0 lg:hidden">
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
                      <h3 className="mt-0.5 text-sm font-bold uppercase text-ink-950">{step.title}</h3>
                      <p className="mt-1 text-sm text-ink-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GALLERY + FAQ */}
        <section className="section bg-ink-50">
          <div className="container">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <Reveal>
                  <span className="eyebrow">Portfolio</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    Recent Residential Tinting Projects
                  </h2>
                </Reveal>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {galleryItems.map((item, i) => (
                    <Reveal key={item.id} delay={i * 40}>
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                        <p className="absolute bottom-0 left-0 p-3 text-xs font-semibold text-white">
                          {item.title}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <Link to="/gallery" className="btn-outline mt-8">
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div>
                <Reveal>
                  <span className="eyebrow">Questions</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    Residential Window Tinting FAQs
                  </h2>
                </Reveal>
                <div className="mt-8">
                  <FAQAccordion
                    items={residentialFaqs.map((f) => ({
                      question: f.question,
                      answer: f.answer,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
