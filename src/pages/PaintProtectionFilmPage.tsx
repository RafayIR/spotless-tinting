import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Droplets,
  Eye,
  StretchHorizontal,
  Timer,
  Check,
  Minus,
  Phone,
  MapPin,
  Gem,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { business } from '@/data/business';

const heroBarItems: { iconSrc?: string; icon?: LucideIcon; label: string }[] = [
  { iconSrc: images.ppfBar.stoneChip, label: 'Stone Chip Protection' },
  { iconSrc: images.ppfBar.selfHealing, label: 'Self-Healing Technology*' },
  { iconSrc: images.ppfBar.stainResistance, label: 'Stain Resistance' },
  { icon: Sparkles, label: 'High-Gloss Finish' },
  { iconSrc: images.ppfBar.paintPreservation, label: 'Paint Preservation' },
];

const defenceFeatures: { iconSrc: string; title: string; desc: string }[] = [
  {
    iconSrc: images.ppfBenefits.stoneChips,
    title: 'Stone Chips',
    desc: 'Helps protect high-impact areas from stone chips and road debris.',
  },
  {
    iconSrc: images.ppfBenefits.minorScratches,
    title: 'Minor Scratches',
    desc: 'Selected self-healing films can recover from light surface marks with heat.',
  },
  {
    iconSrc: images.ppfBenefits.roadContaminants,
    title: 'Road Contaminants',
    desc: 'Creates a protective barrier over the paint against contaminants and chemicals.',
  },
  {
    iconSrc: images.ppfBenefits.everydayWear,
    title: 'Everyday Wear',
    desc: 'Helps preserve the original paint from daily wear and tear.',
  },
];

const packages = [
  {
    title: 'Essential / High-Impact',
    features: ['Front bumper', 'Headlights', 'Mirror caps'],
    cta: 'Get a Quote',
    image: images.ppfPackages.essential,
  },
  {
    title: 'Front-End Protection',
    features: ['Full bonnet', 'Front bumper', 'Front guards', 'Headlights', 'Mirrors'],
    cta: 'Get a Quote',
    image: images.ppfPackages.frontEnd,
    twoColumnFeatures: true,
  },
  {
    title: 'Track / Extended Protection',
    features: ['Front-end coverage', 'A-pillars', 'Side skirts', 'Rear impact areas'],
    cta: 'Get a Quote',
    image: images.ppfPackages.track,
    twoColumnFeatures: true,
  },
  {
    title: 'Full Vehicle PPF',
    desc: 'Maximum coverage for customers wanting comprehensive paint protection.',
    cta: 'Enquire About Full PPF',
    image: images.ppfPackages.fullVehicle,
  },
];

type CoverageCallout = {
  label: string;
  side: 'left' | 'right';
  labelTop: number;
  elbowX: number;
  anchorX: number;
  anchorY: number;
};

/** Coordinates in 0–100 space shared by labels + SVG overlay */
const coverageCallouts: CoverageCallout[] = [
  { label: 'Bonnet', side: 'left', labelTop: 15, elbowX: 30, anchorX: 47, anchorY: 24 },
  { label: 'Front Bumper', side: 'left', labelTop: 32, elbowX: 28, anchorX: 43, anchorY: 70 },
  { label: 'Headlights', side: 'left', labelTop: 49, elbowX: 26, anchorX: 35, anchorY: 49 },
  { label: 'Front Guards', side: 'left', labelTop: 66, elbowX: 28, anchorX: 45, anchorY: 38 },
  { label: 'Mirrors', side: 'right', labelTop: 15, elbowX: 70, anchorX: 56, anchorY: 35 },
  { label: 'Door Edges', side: 'right', labelTop: 32, elbowX: 72, anchorX: 62, anchorY: 47 },
  { label: 'Side Skirts', side: 'right', labelTop: 49, elbowX: 74, anchorX: 68, anchorY: 68 },
  { label: 'Rear Impact Areas', side: 'right', labelTop: 66, elbowX: 72, anchorX: 74, anchorY: 50 },
];

const filmLayers = [
  { name: 'Top Coat', desc: 'Resists staining and yellowing.', top: 6 },
  { name: 'Self-Healing Layer*', desc: 'Heat activates the self-healing properties.', top: 21 },
  { name: 'Urethane Film', desc: 'Absorbs impact from road debris.', top: 36 },
  { name: 'Adhesive Layer', desc: 'Secure bond to the paint surface.', top: 51 },
  { name: 'Clear Coat', desc: 'OEM clear coat.', top: 66 },
  { name: 'Original Paint', desc: "Your vehicle's paint.", top: 81 },
];

const filmProps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sparkles, title: 'Self-Healing*', desc: 'Light marks disappear with heat.' },
  { icon: Eye, title: 'Optical Clarity', desc: 'Virtually invisible protection.' },
  { icon: Droplets, title: 'Stain Resistance', desc: 'Repels contaminants and discoloration.' },
  { icon: StretchHorizontal, title: 'Flexibility', desc: 'Conforms to curves and complex shapes.' },
  { icon: Timer, title: 'Durability', desc: 'Built for long-term performance.' },
];

const newCarBenefits = [
  'Preserve original paint',
  'Reduce stone-chip damage',
  'Maintain appearance',
  'Protect high-impact areas',
];

type CompareCell = boolean | string;

const ppfVsCeramic: { feature: string; ppf: CompareCell; ceramic: CompareCell }[] = [
  { feature: 'Stone-chip protection', ppf: true, ceramic: false },
  { feature: 'Physical barrier', ppf: true, ceramic: false },
  { feature: 'Minor scratch resistance', ppf: true, ceramic: 'Limited' },
  { feature: 'Hydrophobic properties', ppf: 'Product dependent', ceramic: true },
  { feature: 'Easier cleaning', ppf: 'Product dependent', ceramic: true },
  { feature: 'Gloss enhancement', ppf: true, ceramic: true },
];

function CompareCellValue({ value }: { value: CompareCell }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-accent-500" strokeWidth={2.5} />;
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-ink-400" strokeWidth={2} />;
  return <span className="text-[10px] leading-tight text-ink-600">{value}</span>;
}

const installSteps = [
  {
    title: 'Precision Preparation',
    desc: 'Thorough cleaning and decontamination for optimal film adhesion.',
    image: images.ppfInstallation.step1,
  },
  {
    title: 'Precision Cutting',
    desc: 'Computer-cut patterns for a perfect fit.',
    image: images.ppfInstallation.step2,
  },
  {
    title: 'Expert Installation',
    desc: 'Skilled installers, with attention to every detail.',
    image: images.ppfInstallation.step4,
  },
  {
    title: 'Expert Installation',
    desc: 'Skilled installers, with attention to every detail.',
    image: images.ppfInstallation.step5,
  },
  {
    title: 'Edge Finishing',
    desc: 'Carefully finished edges for a seamless and durable result.',
    image: images.ppfInstallation.step6,
  },
  {
    title: 'Quality Inspection',
    desc: 'Every installation is inspected to ensure the highest standard.',
    image: images.ppfInstallation.step7,
  },
];

const galleryFilters = ['All', 'Full Front', 'Full Vehicle', 'High Impact', 'Matte PPF'];

const galleryItems = [
  {
    id: '1',
    vehicle: 'Porsche 911',
    service: 'Full Front PPF',
    filter: 'Full Front',
    image: images.ppfPackages.frontEnd,
  },
  {
    id: '2',
    vehicle: 'Audi RS6',
    service: 'Full Front PPF',
    filter: 'Full Front',
    image: images.ppfPackages.essential,
  },
  {
    id: '3',
    vehicle: 'Tesla Model 3',
    service: 'Full Vehicle PPF',
    filter: 'Full Vehicle',
    image: images.ppfPackages.fullVehicle,
  },
  {
    id: '4',
    vehicle: 'BMW M4',
    service: 'High Impact PPF',
    filter: 'High Impact',
    image: images.ppfPackages.track,
  },
];

const ppfFaqs = [
  {
    question: 'What is Paint Protection Film (PPF)?',
    answer:
      'PPF is a transparent urethane film applied to painted surfaces to protect against stone chips, scratches, road debris and everyday wear while remaining virtually invisible.',
  },
  {
    question: 'Does PPF protect against stone chips?',
    answer:
      'Yes. PPF provides a physical barrier that absorbs impacts from stone chips and road debris, helping protect vulnerable areas such as the bonnet, bumper and mirrors.',
  },
  {
    question: 'Can PPF prevent scratches?',
    answer:
      'PPF helps guard against light scratches and swirl marks. Many films include self-healing properties that can recover from minor surface marks with heat.',
  },
  {
    question: 'Can you see PPF once it\'s installed?',
    answer:
      'When professionally installed, quality PPF is designed to be virtually invisible and maintain the gloss and clarity of your original paintwork.',
  },
  {
    question: 'How long does PPF last?',
    answer:
      'Lifespan depends on film quality, coverage, driving conditions and maintenance. Professionally installed premium PPF can last many years with proper care.',
  },
  {
    question: 'Can PPF be removed?',
    answer:
      'Yes. PPF can be professionally removed without damaging the underlying paint when done correctly, making it a flexible protection option.',
  },
  {
    question: 'Will PPF damage my paint?',
    answer:
      'No. When installed and removed by trained professionals, PPF protects your paint rather than damaging it. Poor installation or removal can cause issues — that is why professional application matters.',
  },
  {
    question: 'Can PPF be installed on a brand-new car?',
    answer:
      'Yes. A new vehicle is an ideal candidate because protection can be applied before everyday driving begins to mark the paint.',
  },
  {
    question: 'What\'s the difference between PPF and ceramic coating?',
    answer:
      'PPF provides a physical barrier against stone chips and scratches. Ceramic coating adds hydrophobic properties and gloss but does not stop impacts. Many customers combine both for comprehensive protection.',
  },
  {
    question: 'How should I wash a vehicle with PPF?',
    answer:
      'Hand washing or touchless methods are preferred. Avoid harsh brushes, abrasive compounds on film edges, and follow any care instructions provided after installation.',
  },
];

function PPFFaqGrid({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-2 sm:space-y-2.5">
          {column.map((item, i) => {
            const index = colIndex * midpoint + i;
            const isOpen = open === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-lg border border-ink-200 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left sm:px-4 sm:py-3.5"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[11px] font-semibold leading-snug text-ink-900 sm:text-xs">
                    {item.question}
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-ink-700 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-3.5 pb-3.5 text-[11px] leading-relaxed text-ink-600 sm:px-4 sm:text-xs">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-ink-100 select-none">
      <img
        src={images.ppfWithoutProtection.with}
        alt="Car hood with PPF protection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={images.ppfWithoutProtection.without}
          alt="Car hood without PPF showing stone chip damage"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-y-0 z-20 w-px bg-white/90" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white shadow-lg">
          &lt;&gt;
        </div>
      </div>
      <span className="absolute left-3 top-3 z-20 rounded-sm bg-red-600 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
        Without PPF
      </span>
      <span className="absolute right-3 top-3 z-20 rounded-sm bg-emerald-600 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
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
      <section className="relative overflow-hidden bg-black">
        <img
          src={images.ppfHeader}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
          fetchPriority="high"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/20 lg:via-black/75 lg:to-transparent"
          aria-hidden
        />

        <div className="container relative z-10">
          <div className="flex min-h-[min(78vh,760px)] flex-col justify-center py-16 sm:py-20 lg:min-h-[min(82vh,820px)] lg:max-w-[46%] lg:py-24">
            <h1 className="text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
              Paint Protection Film (PPF) in Hobart
            </h1>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-accent-400 sm:text-sm">
              Protect · Preserve · Drive
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg">
              Protect your vehicle&apos;s paint from stone chips, scratches, road debris and everyday
              wear with professionally installed Paint Protection Film.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary uppercase tracking-wide">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#packages"
                className="btn border border-white/40 bg-transparent uppercase tracking-wide text-white hover:bg-white/10"
              >
                Explore PPF Packages
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-ink-800/80 bg-black/95 backdrop-blur-sm">
          <div className="container py-5 md:py-6">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
              {heroBarItems.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
                    {item.iconSrc ? (
                      <img
                        src={item.iconSrc}
                        alt=""
                        className="h-full w-full object-contain"
                        loading="eager"
                      />
                    ) : item.icon ? (
                      <item.icon className="h-7 w-7 text-accent-500" strokeWidth={1.75} />
                    ) : null}
                  </div>
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[11px]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-white text-ink-950">
        {/* INVISIBLE PROTECTION */}
        <section className="section border-b border-ink-100">
          <div className="container">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
                    <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-accent-500">
                      Invisible Protection.
                    </span>
                    <span className="mt-2 block">Real-World Defence.</span>
                  </h2>
                  <img
                    src={images.ppfBenefits.layerDiagram}
                    alt="PPF layer deflecting road debris away from original paint"
                    className="mt-8 w-full max-w-md object-contain lg:max-w-none"
                    loading="lazy"
                  />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                  {defenceFeatures.map((f) => (
                    <div key={f.title} className="text-center xl:text-left">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center xl:mx-0">
                        <img src={f.iconSrc} alt="" className="h-14 w-14 object-contain" loading="lazy" />
                      </div>
                      <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <p className="mt-10 text-center text-xs text-ink-500">
              *Self-healing performance depends on film type and conditions.
            </p>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="packages" className="ppf-packages-section section bg-[#f7f7f8]">
          <div className="container">
            <Reveal>
              <h2 className="text-center text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Choose Your Level of Protection
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {packages.map((pkg, i) => (
                <Reveal key={pkg.title} delay={i * 50}>
                  <div className="ppf-package-card flex h-full flex-col overflow-hidden rounded-sm border border-ink-200 bg-white shadow-sm">
                    <div className="flex min-h-[3.25rem] items-end px-4 pb-3 pt-4">
                      <h3 className="font-sans text-[11px] font-bold uppercase leading-snug tracking-normal text-ink-950 sm:text-xs">
                        {pkg.title}
                      </h3>
                    </div>
                    <div className="relative bg-black">
                      <img
                        src={pkg.image}
                        alt={`${pkg.title} coverage illustration`}
                        className="aspect-[4/3] w-full object-contain object-center"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-5 py-5">
                      {'features' in pkg && pkg.features ? (
                        <ul
                          className={`space-y-2.5 ${pkg.twoColumnFeatures ? 'grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2' : ''}`}
                        >
                          {pkg.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-relaxed text-ink-600">{pkg.desc}</p>
                      )}
                      <Link
                        to="/quote"
                        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-bold uppercase tracking-wide text-accent-500 hover:text-accent-600"
                      >
                        {pkg.cta}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-ink-500">
              Coverage options can be tailored to your vehicle and requirements.
            </p>
          </div>
        </section>

        {/* COVERAGE + ENGINEERING */}
        <section className="grid lg:grid-cols-2">
          <Reveal>
            <div className="ppf-split-light flex flex-col px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
              <h2 className="text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl lg:text-[1.85rem]">
                Protect Where It Matters Most.
              </h2>

              <div className="relative mx-auto mt-10 w-full max-w-3xl lg:max-w-none">
                <div className="relative aspect-[16/10] w-full">
                  <img
                    src={images.ppfCoverage.silverCar}
                    alt="Silver sports car showing common PPF coverage zones"
                    className="absolute left-1/2 top-[5%] h-[86%] w-[58%] -translate-x-1/2 object-contain"
                    loading="lazy"
                  />

                  {coverageCallouts.map((c) => (
                    <span
                      key={c.label}
                      className={`absolute z-10 max-w-[18%] text-[9px] font-bold uppercase leading-tight tracking-wide sm:text-[10px] md:text-[11px] ${
                        c.side === 'left'
                          ? 'left-0 text-right'
                          : 'right-0 text-left'
                      }`}
                      style={{ top: `${c.labelTop}%`, transform: 'translateY(-50%)' }}
                    >
                      {c.label}
                    </span>
                  ))}

                  <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
                    aria-hidden
                  >
                    {coverageCallouts.map((c) => {
                      const startX = c.side === 'left' ? 17 : 83;
                      return (
                        <g key={c.label}>
                          <polyline
                            points={`${startX},${c.labelTop} ${c.elbowX},${c.labelTop} ${c.anchorX},${c.anchorY}`}
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="0.42"
                          />
                          <circle cx={c.anchorX} cy={c.anchorY} r="0.75" fill="#f97316" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              <p className="ppf-split-muted mx-auto mt-8 max-w-lg text-center text-xs leading-relaxed sm:text-sm">
                Choose targeted high-impact protection or comprehensive full-vehicle coverage.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="ppf-split-dark flex flex-col px-5 py-12 sm:px-8 lg:px-12 lg:py-16 xl:px-14">
              <h2 className="text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl lg:text-[1.75rem]">
                Engineered to Take the Hit.
              </h2>
              <div className="mt-8 grid lg:grid-cols-[minmax(0,1.55fr)_1px_minmax(0,0.95fr)] lg:items-stretch lg:gap-8">
                <div className="relative min-h-[300px] sm:min-h-[340px]">
                  <img
                    src={images.ppfCoverage.protectionFilm}
                    alt="PPF multi-layer construction diagram"
                    className="absolute left-0 top-1/2 h-[92%] w-[44%] -translate-y-1/2 object-contain object-left"
                    loading="lazy"
                  />
                  <div className="absolute inset-y-[4%] left-[40%] right-0">
                    {filmLayers.map((layer) => (
                      <div
                        key={layer.name}
                        className="absolute left-0 right-0 flex items-center"
                        style={{ top: `${layer.top}%`, transform: 'translateY(-50%)' }}
                      >
                        <span className="h-px w-4 shrink-0 bg-accent-500 sm:w-7" aria-hidden />
                        <div className="min-w-0 pl-2 sm:pl-3">
                          <p className="text-[9px] font-bold uppercase leading-tight tracking-wide sm:text-[10px]">
                            {layer.name}
                          </p>
                          <p className="ppf-split-muted mt-0.5 text-[9px] leading-snug sm:text-[10px]">
                            {layer.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden bg-ink-700/40 lg:block" aria-hidden />
                <ul className="mt-8 space-y-5 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:space-y-6 lg:border-l lg:border-ink-700/40 lg:pl-8">
                  {filmProps.map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white sm:h-10 sm:w-10">
                        <p.icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="ppf-feature-title text-[10px] font-bold uppercase tracking-wide sm:text-[11px]">
                          {p.title}
                        </h4>
                        <p className="ppf-split-muted mt-0.5 text-[10px] leading-relaxed sm:text-[11px]">
                          {p.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="ppf-split-muted mt-6 text-[10px] sm:mt-8">
                *Self-healing performance depends on film type and conditions.
              </p>
            </div>
          </Reveal>
        </section>
      </div>

      {/* WITHOUT PROTECTION · NEW CAR · PPF VS CERAMIC */}
      <section className="grid lg:grid-cols-3">
        <Reveal>
          <div className="ppf-split-light flex flex-col px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
            <h2 className="text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl lg:text-2xl">
              What Happens Without Protection?
            </h2>
            <div className="mt-6">
              <BeforeAfterSlider />
            </div>
            <p className="ppf-split-muted mx-auto mt-6 max-w-sm text-center text-xs leading-relaxed sm:text-sm">
              Your vehicle encounters road debris every time you drive.
              <br />
              PPF provides a sacrificial protective layer between those hazards and your original paint.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="relative flex min-h-full flex-col overflow-hidden bg-black px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
            <div className="relative z-10 flex flex-1 flex-col">
              <h2 className="text-lg font-bold uppercase leading-tight tracking-tight text-white sm:text-xl lg:text-2xl">
                Just Bought a New Car?
                <span className="mt-1 block">Protect It While the Paint Is Still New.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-300">
                A new vehicle is an ideal candidate for PPF because protection can be applied before
                everyday driving begins to leave its mark.
              </p>
              <div className="mt-6 grid flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.46fr)] lg:items-end lg:gap-x-3">
                <ul className="space-y-3">
                  {newCarBenefits.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <img
                  src={images.ppfWithoutProtection.newCarGift}
                  alt=""
                  className="pointer-events-none mx-auto mt-8 h-44 w-full max-w-[240px] object-contain object-bottom lg:mx-0 lg:mt-0 lg:h-auto lg:max-h-[min(52vh,300px)] lg:w-full lg:max-w-none lg:self-end"
                  aria-hidden
                  loading="lazy"
                />
              </div>
              <Link
                to="/quote"
                className="btn-primary mt-8 inline-flex w-full justify-center px-6 py-4 text-sm font-bold uppercase tracking-wide sm:mt-10 sm:py-4.5 sm:text-base"
              >
                Get New Car PPF Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="ppf-split-light flex flex-col px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
            <h2 className="text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl lg:text-2xl">
              PPF or Ceramic Coating?
            </h2>
            <div className="mt-6 overflow-hidden border border-ink-200">
              <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,1fr)] border-b border-ink-200 bg-ink-50 text-[9px] font-bold uppercase tracking-wide text-ink-700 sm:text-[10px]">
                <span className="px-3 py-2.5">Feature</span>
                <span className="flex items-center justify-center gap-1 border-l border-ink-200 px-2 py-2.5">
                  <Gem className="h-3 w-3 text-accent-500" strokeWidth={2} />
                  PPF
                </span>
                <span className="border-l border-ink-200 px-2 py-2.5 text-center">
                  Ceramic Coating
                </span>
              </div>
              {ppfVsCeramic.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_minmax(0,1fr)] border-b border-ink-200 last:border-b-0 text-[10px] sm:text-[11px]"
                >
                  <span className="flex items-center px-3 py-2.5 text-ink-700">{row.feature}</span>
                  <span className="flex items-center justify-center border-l border-ink-200 px-2 py-2.5 text-center">
                    <CompareCellValue value={row.ppf} />
                  </span>
                  <span className="flex items-center justify-center border-l border-ink-200 px-2 py-2.5 text-center">
                    <CompareCellValue value={row.ceramic} />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wide">Why Not Both?</h3>
              <p className="ppf-split-muted mt-2 text-xs leading-relaxed sm:text-sm">
                PPF provides physical protection to vulnerable painted surfaces, while a compatible
                ceramic coating can add hydrophobic properties and make maintenance easier.
              </p>
              <Link
                to="/quote"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-500 hover:text-accent-600"
              >
                Ask About PPF + Ceramic
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROTECTION IN YOUR FINISH */}
      <section className="ppf-split-dark section">
        <div className="container">
          <Reveal>
            <h2 className="text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl lg:text-3xl">
              <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:bg-accent-500">
                Protection in Your Finish.
              </span>
            </h2>
          </Reveal>
          <div className="relative mt-10 grid md:grid-cols-2 md:gap-0">
            <div
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/25 md:block"
              aria-hidden
            />
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[11px] font-bold uppercase text-black md:flex">
              Or
            </div>
            <Reveal>
              <div className="px-0 py-4 md:pr-12">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent-500 sm:text-base">
                  Gloss PPF
                </h3>
                <p className="mt-2 text-sm text-white/90">
                  Maintains the original gloss appearance and depth.
                </p>
                <img
                  src={images.ppfFinish.gloss}
                  alt="Black sports car with gloss PPF finish"
                  className="mt-6 w-full object-contain"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="px-0 py-4 md:pl-12">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent-500 sm:text-base">
                  Matte / Satin PPF
                </h3>
                <p className="mt-2 text-sm text-white/90">
                  Creates a satin-like finish while adding protection.
                </p>
                <img
                  src={images.ppfFinish.matte}
                  alt="Sports car with matte satin PPF finish"
                  className="mt-6 w-full object-contain"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INSTALLATION PROCESS */}
      <section className="ppf-split-light section">
        <div className="container">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl lg:text-3xl">
              <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:bg-accent-500">
                The Difference Is in the Installation.
              </span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5">
            {installSteps.map((step, i) => (
              <Reveal key={`${step.title}-${i}`} delay={i * 40}>
                <div className="text-center">
                  <div className="overflow-hidden rounded-lg bg-ink-100">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="aspect-[4/5] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-4 text-[11px] font-bold uppercase leading-tight tracking-wide sm:text-xs">
                    {step.title}
                  </h3>
                  <p className="ppf-split-muted mx-auto mt-2 max-w-[180px] text-[10px] leading-relaxed sm:text-[11px]">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS + FAQ */}
      <section className="ppf-split-light section border-t border-ink-200">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 xl:gap-14">
            <div>
              <Reveal>
                <h2 className="text-center text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-left lg:text-2xl">
                  Recent PPF Projects
                </h2>
              </Reveal>
              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {galleryFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors sm:text-[11px] ${
                      activeFilter === filter
                        ? 'border-accent-500 bg-accent-500 text-white'
                        : 'border-ink-900 bg-white text-ink-900 hover:border-accent-500 hover:text-accent-600'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                {filtered.map((item, i) => (
                  <Reveal key={item.id} delay={i * 40}>
                    <div className="overflow-hidden rounded-xl bg-black shadow-sm">
                      <div className="aspect-[3/4] overflow-hidden bg-ink-100">
                        <img
                          src={item.image}
                          alt={`${item.vehicle} — ${item.service}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-2.5 py-2.5 sm:px-3 sm:py-3">
                        <p className="text-[9px] font-bold uppercase leading-tight text-white sm:text-[10px]">
                          {item.vehicle}
                        </p>
                        <p className="mt-0.5 text-[8px] text-ink-400 sm:text-[9px]">{item.service}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <div className="mt-8 text-center lg:text-left">
                  <Link
                    to="/gallery"
                    className="btn-outline inline-flex px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-accent-600 sm:text-xs"
                  >
                    View All PPF Projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-2xl">
                  <span className="relative inline-block pb-1">
                    PPF
                    <span
                      className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-accent-500"
                      aria-hidden
                    />
                  </span>{' '}
                  FAQs
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-6">
                  <PPFFaqGrid items={ppfFaqs} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-ink-950">

        {/* FINAL CTA */}
        <section className="relative min-h-[min(52vh,520px)] overflow-hidden border-t border-ink-800">
          <div className="absolute inset-0">
            <img
              src={images.ppfHeader}
              alt=""
              className="h-full w-full object-cover object-[72%_center]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_72%_45%,rgba(249,115,22,0.14),transparent_65%)]"
              aria-hidden
            />
          </div>
          <div className="container relative z-10 flex min-h-[min(52vh,520px)] flex-col items-center justify-center py-20 text-center">
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
