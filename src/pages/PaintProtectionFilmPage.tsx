import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Sparkles,
  Droplets,
  Gem,
  Paintbrush,
  CircleAlert,
  CircleDot,
  CloudRain,
  Activity,
  Eye,
  StretchHorizontal,
  Timer,
  Check,
  Minus,
  Phone,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import ParallaxHero from '@/components/ParallaxHero';
import FAQAccordion from '@/components/FAQAccordion';
import { images } from '@/data/images';
import { business } from '@/data/business';
import { faqs } from '@/data/faqs';

const heroBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Shield, label: 'Stone Chip Protection' },
  { icon: Sparkles, label: 'Self-Healing Technology' },
  { icon: Droplets, label: 'Stain Resistance' },
  { icon: Gem, label: 'High-Gloss Finish' },
  { icon: Paintbrush, label: 'Paint Preservation' },
];

const defenceFeatures: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: CircleAlert, title: 'Stone Chips', desc: 'Absorbs impact from road debris before it reaches paint.' },
  { icon: CircleDot, title: 'Minor Scratches', desc: 'Self-healing top coat reduces swirl marks and light scratches.' },
  { icon: CloudRain, title: 'Road Contaminants', desc: 'Resists stains from bugs, tar, bird droppings and pollution.' },
  { icon: Activity, title: 'Everyday Wear', desc: 'Shields high-contact areas from daily driving wear.' },
];

const packages = [
  {
    title: 'Essential / High-Impact',
    desc: 'Targeted protection for the areas that take the most abuse.',
    features: ['Front bumper', 'Headlights', 'Mirror caps', 'Ideal first step into PPF'],
    cta: 'Get a Quote',
    image: images.blackCar,
    highlight: 'Front impact zones',
  },
  {
    title: 'Front-End Protection',
    desc: 'Comprehensive coverage for the front of your vehicle.',
    features: ['Full bonnet', 'Front bumper', 'Headlights & mirrors', 'Front fenders'],
    cta: 'Get a Quote',
    image: images.luxurySedan,
    highlight: 'Full front-end',
  },
  {
    title: 'Track / Extended Protection',
    desc: 'Front-end coverage plus extra high-wear zones.',
    features: ['Front-end package', 'A-pillars', 'Side skirts', 'Rear impact areas'],
    cta: 'Get a Quote',
    image: images.sportsCar,
    highlight: 'Extended zones',
  },
  {
    title: 'Full Vehicle PPF',
    desc: 'Maximum coverage — virtually invisible protection everywhere.',
    features: ['Full body coverage', 'Maximum resale protection', 'Uniform finish', 'Ultimate peace of mind'],
    cta: 'Enquire About Full PPF',
    image: images.heroCar,
    highlight: 'Complete coverage',
  },
];

const impactZones = [
  { label: 'Bonnet', top: '28%', left: '42%' },
  { label: 'Headlights', top: '48%', left: '22%' },
  { label: 'Door Edges', top: '55%', left: '68%' },
  { label: 'Side Skirts', top: '72%', left: '55%' },
  { label: 'Mirror Caps', top: '40%', left: '58%' },
  { label: 'Front Bumper', top: '78%', left: '30%' },
];

const filmLayers = [
  'Top Coat',
  'Self-Healing Layer',
  'Urethane Film',
  'Adhesive Layer',
  'Clear Coat',
  'Original Paint',
];

const filmProps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sparkles, title: 'Self-Healing', desc: 'Heat activates recovery from light scratches.' },
  { icon: Eye, title: 'Optical Clarity', desc: 'Virtually invisible on your paintwork.' },
  { icon: Droplets, title: 'Stain Resistance', desc: 'Easier cleaning, fewer permanent marks.' },
  { icon: StretchHorizontal, title: 'Flexibility', desc: 'Conforms to complex curves and edges.' },
  { icon: Timer, title: 'Durability', desc: 'Long-lasting protection when professionally installed.' },
];

const ppfVsCeramic = [
  { feature: 'Stone chip protection', ppf: true, ceramic: false },
  { feature: 'Physical barrier', ppf: true, ceramic: false },
  { feature: 'Self-healing surface', ppf: true, ceramic: false },
  { feature: 'Gloss enhancement', ppf: true, ceramic: true },
  { feature: 'Hydrophobic finish', ppf: true, ceramic: true },
  { feature: 'Best for high-impact zones', ppf: true, ceramic: false },
];

const installSteps = [
  { title: 'Precision Preparation', desc: 'Paint is cleaned and decontaminated for perfect adhesion.', image: images.installerWork },
  { title: 'Precision Cutting', desc: 'Film is patterned to your vehicle’s exact panels.', image: images.tintRoll },
  { title: 'Expert Installation', desc: 'Applied panel by panel with professional technique.', image: images.squeegee },
  { title: 'Edge Finishing', desc: 'Edges are wrapped and finished for a seamless look.', image: images.garageWork },
  { title: 'Quality Inspection', desc: 'Every panel is checked under proper lighting.', image: images.sportsCar },
  { title: 'Handover', desc: 'Aftercare guidance so your PPF performs for years.', image: images.heroCar },
];

const galleryFilters = ['All', 'Full Front', 'Full Vehicle', 'Partial', 'Matte'];

const galleryItems = [
  { id: '1', title: 'Porsche — Full Front PPF', filter: 'Full Front', image: images.sportsCar },
  { id: '2', title: 'Audi — Front-End Protection', filter: 'Full Front', image: images.luxurySedan },
  { id: '3', title: 'Tesla — Full Vehicle PPF', filter: 'Full Vehicle', image: images.blackCar },
  { id: '4', title: 'BMW — Partial / High-Impact', filter: 'Partial', image: images.coupeSide },
];

const ppfFaqs = [
  ...faqs.filter((f) => f.category === 'PPF'),
  {
    id: 'ppf-extra-1',
    category: 'PPF',
    question: 'What is Paint Protection Film?',
    answer:
      'PPF is a transparent urethane film applied to your paint to protect against stone chips, scratches and contaminants — while remaining virtually invisible.',
  },
  {
    id: 'ppf-extra-2',
    category: 'PPF',
    question: 'How long does PPF last?',
    answer:
      'Quality PPF, professionally installed and properly maintained, can last many years. Lifespan depends on film brand, coverage, driving conditions and care.',
  },
  {
    id: 'ppf-extra-3',
    category: 'PPF',
    question: 'Is PPF better than ceramic coating?',
    answer:
      'They do different jobs. PPF provides a physical barrier against chips and scratches. Ceramic enhances gloss and hydrophobics but does not stop stone chips. Many customers combine both.',
  },
];

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 select-none">
      <img
        src={images.sportsCar}
        alt="With PPF"
        className="absolute inset-0 h-full w-full object-cover brightness-95"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={images.luxurySedan}
          alt="Without PPF"
          className="absolute inset-0 h-full w-full object-cover brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-amber-900/20" />
      </div>
      <div className="absolute inset-y-0 z-20 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg">
          <span className="text-[10px] font-bold">⇄</span>
        </div>
      </div>
      <span className="absolute left-3 top-3 z-20 rounded bg-ink-950/80 px-2 py-1 text-[10px] font-bold uppercase text-white">
        Without PPF
      </span>
      <span className="absolute right-3 top-3 z-20 rounded bg-accent-500/90 px-2 py-1 text-[10px] font-bold uppercase text-white">
        With PPF
      </span>
      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-30 cursor-ew-resize opacity-0"
        aria-label="Compare without and with PPF"
      />
    </div>
  );
}

export default function PaintProtectionFilmPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.filter === activeFilter);

  return (
    <>
      <SEO
        title="Paint Protection Film Hobart | Spotless Tinting"
        description="PPF in Hobart. Self-healing paint protection film against stone chips and scratches. Front-end, extended and full-vehicle packages."
        path="/services/paint-protection-film"
        image={images.ppfHero}
      />

      {/* HERO */}
      <ParallaxHero
        imageSrc={images.ppfHero}
        imageAlt="Paint protection film being applied to a vehicle"
        imageClassName="object-cover object-center"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Paint Protection Film{' '}
            <span className="text-accent-400">(PPF)</span> in Hobart
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400 sm:text-sm">
            Protect · Preserve · Drive
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            Invisible, self-healing protection that shields your paint from stone chips, scratches
            and everyday road damage — professionally installed in Hobart.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#packages"
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Explore PPF Packages
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {heroBenefits.map((b) => (
              <li key={b.label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                  <b.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ParallaxHero>

      <div className="relative z-10 bg-ink-950">
        {/* INVISIBLE PROTECTION */}
        <section className="section border-t border-ink-800">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                    Invisible Protection.
                    <span className="mt-1 block text-accent-400">Real-World Defence.</span>
                  </h2>
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 p-6">
                    <img
                      src={images.filmTechnology}
                      alt="PPF layer diagram"
                      className="aspect-[16/10] w-full rounded-xl object-cover opacity-90"
                      loading="lazy"
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['Original Paint', 'PPF Layer', 'Road Debris Deflected'].map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-ink-700 bg-ink-950 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-300"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {defenceFeatures.map((f) => (
                    <div
                      key={f.title}
                      className="rounded-2xl border border-ink-800 bg-ink-900 p-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-white">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-400">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="packages" className="section border-t border-ink-800 bg-ink-900/50">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                  Choose Your Level of Protection
                </h2>
                <p className="mt-4 text-ink-400">
                  From high-impact zones to full-vehicle coverage — tailored PPF packages for every driver.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {packages.map((pkg, i) => (
                <Reveal key={pkg.title} delay={i * 50}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-950">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded bg-accent-500 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                        {pkg.highlight}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-white">{pkg.title}</h3>
                      <p className="mt-2 text-sm text-ink-400">{pkg.desc}</p>
                      <ul className="mt-4 space-y-2">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-ink-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/quote"
                        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold uppercase tracking-wide text-accent-400"
                      >
                        {pkg.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ZONES + LAYERS */}
        <section className="section border-t border-ink-800">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Coverage</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    Protect Where It Matters
                  </h2>
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-ink-800 bg-ink-900">
                    <img
                      src={images.luxurySedan}
                      alt="PPF impact zones on a vehicle"
                      className="h-full w-full object-cover opacity-50"
                      loading="lazy"
                    />
                    {impactZones.map((z) => (
                      <div
                        key={z.label}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ top: z.top, left: z.left }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent-500 ring-4 ring-accent-500/25" />
                          <span className="whitespace-nowrap rounded-full bg-ink-950/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                            {z.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">Technology</span>
                  <h2 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    Engineered to Take the Hit
                  </h2>
                  <div className="mt-8 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 p-5">
                    <img
                      src={images.filmTechnology}
                      alt="PPF multi-layer construction"
                      className="aspect-[16/9] w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {filmLayers.map((layer, i) => (
                        <span
                          key={layer}
                          className="rounded-full border border-ink-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-300"
                        >
                          {i + 1}. {layer}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {filmProps.map((p) => (
                      <div key={p.title} className="flex gap-3 rounded-xl border border-ink-800 bg-ink-900/80 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                          <p.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wide text-white">{p.title}</h4>
                          <p className="mt-0.5 text-xs text-ink-400">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* COMPARE + NEW CAR CTA */}
        <section className="section border-t border-ink-800 bg-ink-900/40">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-3">
              <Reveal>
                <div>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
                    See the Difference
                  </h3>
                  <BeforeAfterSlider />
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div className="flex h-full flex-col rounded-2xl border border-ink-700 bg-ink-950 p-6">
                  <h3 className="text-xl font-bold uppercase text-white">Just Bought a New Car?</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">
                    Protect factory paint from day one — before the first chip happens.
                  </p>
                  <ul className="mt-5 space-y-2">
                    {[
                      'Preserve resale value',
                      'Invisible protection',
                      'Ideal before first road trips',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-ink-300">
                        <Check className="h-4 w-4 text-accent-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-6 overflow-hidden rounded-xl">
                    <img src={images.blackCar} alt="New car PPF" className="aspect-[16/10] w-full object-cover" loading="lazy" />
                  </div>
                  <Link to="/quote" className="btn-primary mt-6 w-full">
                    Get New Car PPF Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-2xl border border-ink-700 bg-ink-950 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                    PPF or Ceramic?
                  </h3>
                  <div className="mt-5 overflow-hidden rounded-xl border border-ink-800">
                    <div className="grid grid-cols-3 bg-ink-900 text-[10px] font-bold uppercase tracking-wide text-ink-400">
                      <span className="p-3">Feature</span>
                      <span className="p-3 text-center text-accent-400">PPF</span>
                      <span className="p-3 text-center">Ceramic</span>
                    </div>
                    {ppfVsCeramic.map((row) => (
                      <div
                        key={row.feature}
                        className="grid grid-cols-3 border-t border-ink-800 text-xs text-ink-300"
                      >
                        <span className="p-3">{row.feature}</span>
                        <span className="flex items-center justify-center p-3">
                          {row.ppf ? (
                            <Check className="h-4 w-4 text-accent-400" />
                          ) : (
                            <Minus className="h-4 w-4 text-ink-600" />
                          )}
                        </span>
                        <span className="flex items-center justify-center p-3">
                          {row.ceramic ? (
                            <Check className="h-4 w-4 text-accent-400" />
                          ) : (
                            <Minus className="h-4 w-4 text-ink-600" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-ink-500">
                    Many customers pair PPF on high-impact areas with ceramic coating for gloss and ease of cleaning.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINISH OPTIONS */}
        <section className="section border-t border-ink-800">
          <div className="container">
            <Reveal>
              <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                Protection in Your Finish
              </h2>
            </Reveal>
            <div className="relative mt-12 grid gap-5 md:grid-cols-2">
              <Reveal>
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={images.blackCar}
                    alt="Gloss PPF"
                    className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold uppercase text-white">Gloss PPF</h3>
                    <p className="mt-1 text-sm text-ink-300">Crystal-clear protection that enhances factory shine.</p>
                  </div>
                </div>
              </Reveal>
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-500 bg-ink-950 text-xs font-bold uppercase text-accent-400 md:flex">
                Or
              </div>
              <Reveal delay={80}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src={images.matteWrap}
                    alt="Matte satin PPF"
                    className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold uppercase text-white">Matte / Satin PPF</h3>
                    <p className="mt-1 text-sm text-ink-300">A refined low-sheen look with the same physical protection.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* INSTALLATION PROCESS */}
        <section className="section border-t border-ink-800 bg-ink-900/40">
          <div className="container">
            <Reveal>
              <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                The Difference Is in the Installation
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {installSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 40}>
                  <div className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-950">
                    <div className="aspect-square overflow-hidden">
                      <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-accent-400">0{i + 1}</span>
                      <h3 className="mt-1 text-xs font-bold uppercase tracking-wide text-white">{step.title}</h3>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-ink-400">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS + FAQ */}
        <section className="section border-t border-ink-800">
          <div className="container">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <Reveal>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    Recent PPF Projects
                  </h2>
                </Reveal>
                <div className="mt-6 flex flex-wrap gap-2">
                  {galleryFilters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                        activeFilter === filter
                          ? 'bg-accent-500 text-white'
                          : 'border border-ink-700 text-ink-400 hover:border-accent-500 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {filtered.map((item, i) => (
                    <Reveal key={item.id} delay={i * 40}>
                      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                        <p className="absolute bottom-0 left-0 p-3 text-xs font-semibold text-white">
                          {item.title}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div>
                <Reveal>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    PPF FAQs
                  </h2>
                </Reveal>
                <div className="mt-8 [&_button]:text-white [&_div.divide-y]:border-ink-800 [&_div.overflow-hidden]:border-ink-800 [&_div.overflow-hidden]:bg-ink-900 [&_p]:text-ink-400 [&_span]:text-white">
                  <FAQAccordion
                    items={ppfFaqs.map((f) => ({
                      question: f.question,
                      answer: f.answer,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden border-t border-ink-800">
          <div className="absolute inset-0">
            <img src={images.ppfHero} alt="" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-ink-950/88" />
          </div>
          <div className="container relative z-10 py-20 text-center">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold uppercase leading-tight text-white md:text-4xl">
              Protect It Before the Road Does.
              <span className="mt-2 block text-accent-400">
                Preserve Your Paint. Protect Your Investment.
              </span>
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              <Link to="/quote" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-400"
              >
                <Phone className="h-4 w-4 text-accent-500" />
                {business.phone}
              </a>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-300">
                <MapPin className="h-4 w-4 text-accent-500" />
                Hobart, Tasmania
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
