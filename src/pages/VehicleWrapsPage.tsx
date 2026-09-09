import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CarFront,
  Check,
  Gem,
  Layers,
  MapPin,
  Palette,
  Phone,
  Plus,
  Repeat,
  Ruler,
  ShieldCheck,
  Sparkles,
  Type,
  Truck,
  Users,
  Wand2,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { business } from '@/data/business';

const heroBarItems: { icon?: LucideIcon; iconSrc?: string; label: string }[] = [
  { icon: Palette, label: 'Colour Change' },
  { iconSrc: images.vehicleWraps.icons.customStyling, label: 'Custom Styling' },
  { iconSrc: images.vehicleWraps.icons.partialWraps, label: 'Partial Wraps' },
  { iconSrc: images.vehicleWraps.icons.commercialBranding, label: 'Commercial Branding' },
  { icon: Repeat, label: 'Removable Vinyl' },
  { icon: Gem, label: 'Premium Finishes' },
];

const wrapOptions: {
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: string;
  image: string;
}[] = [
  {
    icon: CarFront,
    title: 'Full Vehicle Wraps',
    desc: 'Transform the overall appearance of your vehicle with vinyl coverage across the main exterior painted panels. Choose from available colours and finishes for a complete new look.',
    cta: 'Explore Full Wraps',
    image: images.vehicleWraps.options.full,
  },
  {
    icon: Layers,
    title: 'Partial Vehicle Wraps',
    desc: 'Wrap selected areas such as the roof, bonnet, mirrors, stripes or accent panels to create contrast and personality without wrapping the entire vehicle.',
    cta: 'Explore Partial Wraps',
    image: images.vehicleWraps.options.partial,
  },
  {
    icon: Wand2,
    title: 'Custom & Styling Wraps',
    desc: 'Create a more individual look with custom layouts, accent pieces, two-tone styling, stripes and other design-led wrap applications.',
    cta: 'Explore Styling Options',
    image: images.vehicleWraps.options.custom,
  },
  {
    icon: Building2,
    title: 'Commercial Vehicle Wraps',
    desc: 'Turn cars, vans and other business vehicles into mobile branding with logos, contact details, graphics, lettering and full or partial commercial wraps.',
    cta: 'Commercial Wraps',
    image: images.vehicleWraps.options.commercial,
  },
];

/** Finish swatches are rendered with CSS so nothing implies a colour range we cannot source. */
const finishes: { name: string; desc: string; swatch: string }[] = [
  {
    name: 'Gloss',
    desc: 'A high-shine finish designed to create a polished, paint-like appearance.',
    swatch: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 42%, #fecaca 52%, #b91c1c 62%, #450a0a 100%)',
  },
  {
    name: 'Satin',
    desc: 'A smooth finish with less reflection than gloss and more sheen than matte.',
    swatch: 'linear-gradient(135deg, #4b5563 0%, #9ca3af 48%, #6b7280 60%, #374151 100%)',
  },
  {
    name: 'Matte',
    desc: 'A low-reflection finish for a bold, understated appearance.',
    swatch: 'linear-gradient(135deg, #3f3f46 0%, #52525b 55%, #27272a 100%)',
  },
  {
    name: 'Metallic',
    desc: 'Adds metallic character and visual depth to the selected colour.',
    swatch: 'linear-gradient(115deg, #111827 0%, #6b7280 30%, #e5e7eb 48%, #6b7280 66%, #111827 100%)',
  },
  {
    name: 'Colour Shift',
    desc: 'Special-effect films designed to change appearance as the viewing angle and light change.',
    swatch: 'linear-gradient(120deg, #1d4ed8 0%, #7c3aed 35%, #db2777 65%, #0891b2 100%)',
  },
  {
    name: 'Specialty Finishes',
    desc: 'Selected film ranges may include textured or distinctive finishes for more individual styling.',
    swatch:
      'repeating-linear-gradient(45deg, #18181b 0px, #18181b 6px, #3f3f46 6px, #3f3f46 12px)',
  },
];

/** Mirrors the labels drawn on the styling diagram artwork. */
const wrapApplications = [
  'Roof Wrap',
  'Bonnet Wrap',
  'Mirror Wraps',
  'Racing Stripes',
  'Accent Panels',
  'Full Body Wrap',
  'Chrome Delete',
];

const whyWrap: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Repeat,
    title: 'Removable',
    desc: 'Quality vehicle wrap film is designed to be removable when appropriate techniques are used. Paint condition and repaint history should be assessed before wrapping or removal.',
  },
  {
    icon: Palette,
    title: 'More Styling Options',
    desc: 'Choose from a broad range of available colours, finishes, effects and custom design possibilities.',
  },
  {
    icon: Layers,
    title: 'Flexible Coverage',
    desc: 'Wrap the whole vehicle or selected panels depending on the transformation you want and your budget.',
  },
  {
    icon: ShieldCheck,
    title: 'Helps Preserve Covered Paint',
    desc: 'The film creates a layer over covered paint and can help reduce direct exposure to everyday environmental wear. A colour-change vinyl wrap is not a substitute for Paint Protection Film.',
  },
  {
    icon: Sparkles,
    title: 'Change the Look Again',
    desc: 'Because vinyl is removable, suitable vehicles can be rewrapped later when you want a different colour, style or branding.',
  },
];

const commercialFeatures: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Palette,
    title: 'Logo & Business Graphics',
    desc: 'Apply your business logo and key brand elements to suitable vehicle surfaces.',
  },
  {
    icon: Type,
    title: 'Vehicle Lettering',
    desc: 'Add business names, services, phone numbers, website details or other essential information.',
  },
  {
    icon: Layers,
    title: 'Partial Commercial Wraps',
    desc: 'Use selected panels and graphics to create effective branding without wrapping the entire vehicle.',
  },
  {
    icon: Truck,
    title: 'Full Commercial Wraps',
    desc: 'Create a high-impact branded finish using broader vehicle coverage and coordinated graphics.',
  },
  {
    icon: Users,
    title: 'Fleet Branding',
    desc: 'Build a consistent visual identity across multiple business vehicles where required.',
  },
];

const qualityPillars: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Layers,
    title: 'Quality Wrap Films',
    desc: 'We use suitable vehicle wrap films selected for the intended application and finish.',
  },
  {
    icon: Wand2,
    title: 'Experienced Installation',
    desc: 'Careful application around panels, contours and suitable exterior details.',
  },
  {
    icon: Ruler,
    title: 'Precision Finish',
    desc: 'Attention to alignment, joins, edges and finishing for a clean overall result.',
  },
];

const processSteps: { num: string; title: string; desc: string }[] = [
  {
    num: '01',
    title: 'Consult',
    desc: 'We discuss your vehicle, the look you want, coverage requirements and intended use.',
  },
  {
    num: '02',
    title: 'Design & Select',
    desc: 'Choose the colour, finish or design direction and confirm the required wrap coverage.',
  },
  {
    num: '03',
    title: 'Inspect',
    desc: 'We inspect the vehicle and identify surface condition or areas that may affect installation.',
  },
  {
    num: '04',
    title: 'Preparation',
    desc: 'Suitable surfaces are thoroughly cleaned and prepared before vinyl application.',
  },
  {
    num: '05',
    title: 'Installation',
    desc: 'The wrap film is carefully installed across the selected panels with attention to alignment and fit.',
  },
  {
    num: '06',
    title: 'Inspection',
    desc: 'The completed wrap is checked for finish, consistency and detailing.',
  },
  {
    num: '07',
    title: 'Delivery',
    desc: 'We hand the vehicle back and provide relevant wrap care and maintenance guidance.',
  },
];

const galleryFilters = ['All', 'Full Wraps', 'Partial Wraps', 'Chrome Delete', 'Commercial'];

/**
 * TODO: replace with genuine Spotless Tinting project photography and real project details
 * (vehicle and location) before launch — the copy brief requires actual projects here.
 */
const galleryItems: { id: string; title: string; service: string; filter: string; image: string }[] = [
  {
    id: 'w1',
    title: 'Colour Change Wrap',
    service: 'Full Vehicle Wrap',
    filter: 'Full Wraps',
    image: images.vehicleWraps.options.full,
  },
  {
    id: 'w2',
    title: 'Roof & Mirror Wrap',
    service: 'Partial Wrap',
    filter: 'Partial Wraps',
    image: images.vehicleWraps.options.partial,
  },
  {
    id: 'w3',
    title: 'Trim Chrome Delete',
    service: 'Chrome Delete',
    filter: 'Chrome Delete',
    image: images.vehicleWraps.chromeDeleteAfter,
  },
  {
    id: 'w4',
    title: 'Branded Work Vehicle',
    service: 'Commercial Wrap',
    filter: 'Commercial',
    image: images.vehicleWraps.options.commercial,
  },
];

const wrapFaqs: { question: string; answer: string }[] = [
  {
    question: 'How long does a vehicle wrap last?',
    answer:
      'Wrap lifespan varies with the film used, installation, vehicle storage, sun and weather exposure, washing methods and maintenance. We can explain the expected performance and manufacturer warranty, where applicable, for the specific film selected.',
  },
  {
    question: 'Will wrapping damage my original paint?',
    answer:
      'Quality wrap film installed and removed correctly is designed for suitable, sound painted surfaces. Repainted, repaired, peeling, oxidised or otherwise compromised paint can behave differently and should be assessed before wrapping.',
  },
  {
    question: 'Can a wrapped car be washed?',
    answer:
      'Yes, but the cleaning method matters. Follow the aftercare instructions provided for your wrap and avoid aggressive washing techniques or products that may damage film or lift edges.',
  },
  {
    question: 'Can you wrap a leased vehicle?',
    answer:
      "Potentially, but you should first check the lease conditions and obtain any required approval. The vehicle's paint condition should also be assessed before installation.",
  },
  {
    question: 'Can you wrap only part of my car?',
    answer:
      'Yes. Partial wraps can be used on selected panels such as the roof, bonnet, mirrors or accent areas, depending on the vehicle and desired design.',
  },
  {
    question: 'Can you wrap over scratches or damaged paint?',
    answer:
      'The underlying surface condition affects the finished result and film adhesion. Vinyl does not repair damaged paint, dents, rust or deep scratches. We recommend assessing and addressing unsuitable surfaces before wrapping.',
  },
  {
    question: 'How long does a full vehicle wrap take?',
    answer:
      'Timing depends on vehicle size, complexity, film, design, surface condition and the amount of coverage. We can provide a more accurate timeframe after assessing the vehicle and confirming the wrap specification.',
  },
  {
    question: 'Can the wrap be removed later?',
    answer:
      'Vehicle wrap film is designed to be removable using appropriate methods, but results depend on film age, paint condition, repaint history and other factors. Professional removal is recommended.',
  },
  {
    question: 'What is the difference between PPF and vinyl wrap?',
    answer:
      'Vinyl wrap is primarily used to change colour, finish, styling or branding. Paint Protection Film is specifically engineered as a thicker protective film for vulnerable painted surfaces. If impact protection is your main goal, ask us about PPF.',
  },
  {
    question: 'Do you offer commercial vehicle branding?',
    answer:
      'Yes. Commercial wraps can include logos, business details, lettering, branded graphics and partial or full vehicle coverage, depending on your design and vehicle.',
  },
];

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className = '',
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className={`relative select-none overflow-hidden bg-ink-900 ${className}`}>
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-y-0 z-20 w-px bg-white/90" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black shadow-lg">
          &lt;&gt;
        </div>
      </div>
      <span className="absolute left-3 top-3 z-20 rounded-sm bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-ink-950">
        Before
      </span>
      <span className="absolute right-3 top-3 z-20 rounded-sm bg-accent-500 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
        After
      </span>
      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-30 cursor-ew-resize opacity-0"
        aria-label="Compare the vehicle before and after wrapping"
      />
    </div>
  );
}

function WrapFaqList({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-3 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-[11px] font-semibold leading-snug text-ink-900 sm:text-xs">
                {item.question}
              </span>
              <Plus
                className={`h-4 w-4 shrink-0 text-accent-500 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                strokeWidth={2}
              />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-3 pr-8 text-[11px] leading-relaxed text-ink-600 sm:text-xs">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WrapDiagram() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <img
        src={images.vehicleWraps.diagramCar}
        alt="Car marked up with the areas that can be wrapped: roof, mirrors, bonnet accent panels, racing stripes, full body and chrome delete"
        className="w-full object-contain"
        loading="lazy"
      />

      {/* The diagram labels are baked into the artwork, so they are repeated here as
          real text for search engines and small screens. */}
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
        {wrapApplications.map((label) => (
          <li
            key={label}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-ink-900"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VehicleWrapsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filteredGallery =
    activeFilter === 'All' ? galleryItems : galleryItems.filter((g) => g.filter === activeFilter);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `https://${business.website}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Vehicle Wraps',
            item: `https://${business.website}/services/vehicle-wrapping`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: wrapFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <SEO
        title="Vehicle Wraps Hobart | Car & Commercial Wraps | Spotless Tinting"
        description="Professional vehicle wraps in Hobart for colour changes, custom styling, partial wraps and commercial branding. Explore wrap options with Spotless Tinting."
        path="/services/vehicle-wrapping"
        image={images.vehicleWraps.hero}
        schema={schema}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        <img
          src={images.vehicleWraps.hero}
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
          <div className="flex min-h-[min(78vh,760px)] flex-col justify-center py-16 sm:py-20 lg:min-h-[min(82vh,820px)] lg:max-w-[48%] lg:py-24">
            <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'Vehicle Wraps' }]} light />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-accent-500 sm:text-sm">
              Professional
            </p>
            <h1 className="mt-3 text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
              Vehicle Wraps in Hobart
            </h1>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-accent-400 sm:text-sm">
              Transform · Protect · Stand Out
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg">
              Transform the look of your vehicle with professionally installed vinyl wraps from
              Spotless Tinting in Hobart. From complete colour changes and partial wraps to custom
              styling and commercial vehicle branding, we can help create a finish that suits your
              vehicle, business or personal style.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary uppercase tracking-wide">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#wrap-options"
                className="btn border border-white/40 bg-transparent uppercase tracking-wide text-white hover:bg-white/10"
              >
                Explore Wrap Options
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* HERO BENEFIT STRIP */}
        <div className="relative z-10 border-t border-ink-800/80 bg-black/95 backdrop-blur-sm">
          <div className="container py-5 md:py-6">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
              {heroBarItems.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-500/40 text-accent-500 sm:h-10 sm:w-10">
                    {item.iconSrc ? (
                      <img src={item.iconSrc} alt="" className="h-4 w-4 object-contain sm:h-5 sm:w-5" />
                    ) : item.icon ? (
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                    ) : null}
                  </span>
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[11px]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="panel-light section py-12 md:py-14">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Transformation
                </p>
                <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
                  <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-accent-500">
                    Same Vehicle.
                  </span>
                  <span className="mt-2 block">Completely Different Look.</span>
                </h2>
                <p className="panel-muted mt-6 max-w-md text-sm leading-relaxed sm:text-base">
                  A vehicle wrap can dramatically change the appearance of your car without permanently
                  changing its original paint colour. Whether you want a subtle finish, a bold colour
                  change or a completely customised look, vinyl wrapping gives you the flexibility to
                  transform selected panels or the entire vehicle.
                </p>
                <a
                  href="#colours-and-finishes"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-500 hover:text-accent-600"
                >
                  View Colours &amp; Finishes
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <BeforeAfterSlider
                beforeSrc={images.vehicleWraps.transformationBefore}
                afterSrc={images.vehicleWraps.transformationAfter}
                beforeAlt="Vehicle in its original factory paint finish"
                afterAlt="The same vehicle after a colour-change vinyl wrap"
                className="aspect-[16/9] w-full rounded-sm"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WRAP OPTIONS */}
      <section id="wrap-options" className="panel-light section scroll-mt-20 py-6">
        <div className="container">
          <Reveal>
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
              Wrap Options
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:bg-accent-500">
                Choose Your Vehicle Wrap
              </span>
            </h2>
            <p className="panel-muted mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed">
              Different vehicles and goals call for different levels of coverage. Choose a complete
              transformation, target selected panels, create a custom design or turn a business vehicle
              into mobile branding.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {wrapOptions.map((option, i) => (
              <Reveal key={option.title} delay={i * 50}>
                <div className="flex h-full flex-col overflow-hidden rounded-sm border border-ink-200 bg-white shadow-sm">
                  <div className="relative">
                    <img
                      src={option.image}
                      alt={`${option.title} example`}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent-500 bg-white text-accent-500">
                      <option.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-8">
                    <h3 className="text-[11px] font-bold uppercase leading-snug tracking-wide text-ink-950 sm:text-xs">
                      {option.title}
                    </h3>
                    <p className="mt-3 text-[11px] leading-relaxed text-ink-600 sm:text-xs">
                      {option.desc}
                    </p>
                    <Link
                      to="/quote"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[10px] font-bold uppercase tracking-wide text-accent-500 hover:text-accent-600 sm:text-[11px]"
                    >
                      {option.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COLOURS & FINISHES */}
      <section id="colours-and-finishes" className="panel-dark scroll-mt-20 py-12 md:py-14">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2.25fr)] lg:items-center lg:gap-10">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Colours &amp; Finishes
                </p>
                <h2 className="mt-3 text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl lg:text-[1.75rem]">
                  Vehicle Wrap Colours &amp; Finishes
                </h2>
                <p className="panel-muted mt-4 max-w-sm text-sm leading-relaxed">
                  Vehicle wrap films are available in a wide range of colours, textures and finishes.
                  Availability varies by film manufacturer and range, so our team can help you compare
                  current options for the look you want.
                </p>
                <Link
                  to="/quote"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-500 hover:text-accent-400"
                >
                  View Wrap Options
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {finishes.map((finish) => (
                  <li key={finish.name}>
                    <div
                      className="aspect-[4/3] w-full rounded-sm border border-white/10"
                      style={{ backgroundImage: finish.swatch }}
                      aria-hidden
                    />
                    <h3 className="mt-3 text-[11px] font-bold uppercase tracking-wide text-white">
                      {finish.name}
                    </h3>
                    <p className="panel-muted mt-1 text-[10px] leading-snug sm:text-[11px]">{finish.desc}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTIAL & STYLING + CHROME DELETE */}
      <section className="panel-light section py-12 md:py-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Partial &amp; Styling Applications
                </p>
                <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
                  <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-accent-500">
                    Customise Your Vehicle Your Way
                  </span>
                </h2>
                <p className="panel-muted mt-5 max-w-xl text-sm leading-relaxed">
                  Vehicle wrapping does not have to mean a full-body colour change. Selected panels and
                  details can be wrapped to create contrast, accents or a more personalised finish.
                </p>
                <div className="mt-6">
                  <WrapDiagram />
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex h-full flex-col">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Styling Option
                </p>
                <h2 className="mt-3 text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl">
                  Chrome Delete
                </h2>
                <p className="panel-muted mt-4 text-sm leading-relaxed">
                  Chrome delete uses vinyl wrap to cover selected exterior chrome or bright trim for a
                  cleaner, more cohesive appearance. It is commonly used around window surrounds, trim
                  pieces and other suitable exterior details.
                </p>
                <div className="mt-6 space-y-3">
                  <figure className="overflow-hidden rounded-sm">
                    <div className="relative">
                      <img
                        src={images.vehicleWraps.chromeDeleteBefore}
                        alt="Vehicle window surrounds with factory chrome trim"
                        className="aspect-[16/6] w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute left-2 top-2 rounded-sm bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink-950">
                        Before
                      </span>
                    </div>
                  </figure>
                  <figure className="overflow-hidden rounded-sm">
                    <div className="relative">
                      <img
                        src={images.vehicleWraps.chromeDeleteAfter}
                        alt="The same window surrounds after a chrome delete wrap"
                        className="aspect-[16/6] w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute left-2 top-2 rounded-sm bg-accent-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                        After
                      </span>
                    </div>
                  </figure>
                </div>
                <Link
                  to="/quote"
                  className="btn-primary mt-6 inline-flex w-fit rounded-sm px-5 py-2.5 text-[11px] uppercase tracking-wide"
                >
                  Find Out More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY WRAP INSTEAD OF REPAINT */}
      <section className="panel-light section border-t border-ink-200 py-12 md:py-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.5fr)] lg:gap-12">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Wrap Benefits
                </p>
                <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
                  <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-16 after:bg-accent-500">
                    Why Wrap Your Car Instead of Repainting?
                  </span>
                </h2>
                <p className="panel-muted mt-5 max-w-2xl text-sm leading-relaxed">
                  For customers primarily looking to change appearance, vinyl wrapping offers flexibility
                  that repainting may not. A professionally installed wrap can change the colour or style
                  of suitable exterior surfaces while leaving the underlying original finish in place.
                </p>
                <ul className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
                  {whyWrap.map((item) => (
                    <li key={item.title} className="text-center lg:text-left">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-accent-500/50 text-accent-500 lg:mx-0">
                        <item.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-3 text-[11px] font-bold uppercase leading-tight tracking-wide">
                        {item.title}
                      </h3>
                      <p className="panel-muted mt-2 text-[11px] leading-relaxed">{item.desc}</p>
                    </li>
                  ))}
                </ul>
                <p className="panel-muted mt-6 text-[10px]">
                  *Paint condition and repaint history should be assessed before wrapping or removal. A
                  colour-change vinyl wrap is not a substitute for Paint Protection Film.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex h-full flex-col justify-center rounded-sm bg-black px-6 py-8">
                <img
                  src={images.vehicleWraps.icons.shield}
                  alt=""
                  className="h-12 w-12 object-contain"
                  loading="lazy"
                />
                <h3 className="mt-4 text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  Looking for impact protection?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  Paint Protection Film is specifically engineered as a thicker protective film for
                  vulnerable painted surfaces. If impact protection is your main goal, ask us about PPF.
                </p>
                <Link
                  to="/services/paint-protection-film"
                  className="btn-primary mt-6 inline-flex w-fit rounded-sm px-5 py-2.5 text-[11px] uppercase tracking-wide"
                >
                  Explore PPF
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMMERCIAL WRAPS */}
      <section className="panel-dark py-12 md:py-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Business Branding
                </p>
                <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
                  Commercial Vehicle Wraps &amp; Branding
                </h2>
                <p className="panel-muted mt-4 max-w-md text-sm leading-relaxed">
                  Turn your vehicle into mobile advertising with professionally designed and installed
                  commercial wraps. From simple logos and contact details to partial graphics and full
                  branded vehicle wraps, Spotless Tinting can help businesses create a consistent,
                  professional presence on the road.
                </p>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {commercialFeatures.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span>
                        <span className="block text-[11px] font-bold uppercase tracking-wide text-white">
                          {item.title}
                        </span>
                        <span className="panel-muted mt-0.5 block text-[10px] leading-relaxed sm:text-[11px]">
                          {item.desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/quote"
                  className="btn-primary mt-8 inline-flex w-fit rounded-sm px-6 py-3 text-[11px] uppercase tracking-wide"
                >
                  Get a Commercial Wrap Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <BeforeAfterSlider
                beforeSrc={images.vehicleWraps.commercialBefore}
                afterSrc={images.vehicleWraps.commercialAfter}
                beforeAlt="Unbranded work vehicle before a commercial wrap"
                afterAlt="The same work vehicle after commercial wrap branding"
                className="aspect-[16/9] w-full rounded-sm"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* MATERIALS + PROCESS */}
      <section className="panel-light section py-12 md:py-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  Quality &amp; Installation
                </p>
                <h2 className="mt-3 text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl lg:text-2xl">
                  Premium Vehicle Wrap Materials &amp; Professional Installation
                </h2>
                <p className="panel-muted mt-4 text-sm leading-relaxed">
                  A quality vehicle wrap depends on more than the colour you choose. Film selection,
                  surface preparation, installation technique and finishing all influence the final
                  appearance and durability. We focus on careful preparation, accurate fitment and
                  detailed finishing throughout the installation.
                </p>
                <ul className="mt-8 grid gap-6 sm:grid-cols-3">
                  {qualityPillars.map((item) => (
                    <li key={item.title} className="text-center sm:text-left">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-accent-500/50 text-accent-500 sm:mx-0">
                        <item.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="mt-3 text-[11px] font-bold uppercase leading-tight tracking-wide">
                        {item.title}
                      </h3>
                      <p className="panel-muted mt-2 text-[11px] leading-relaxed">{item.desc}</p>
                    </li>
                  ))}
                </ul>
                <p className="panel-muted mt-6 text-[10px] leading-relaxed">
                  Any brand-specific durability, removability, conformability or warranty claim should
                  come directly from the manufacturer specification for the film actually installed.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500">
                  The Spotless Wrap Process
                </p>
                <h2 className="mt-3 text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl lg:text-2xl">
                  Our Vehicle Wrap Process
                </h2>
                <p className="panel-muted mt-4 text-sm leading-relaxed">
                  A professional wrap starts with the right design, film and preparation. Our process
                  takes the vehicle from initial consultation through installation and final inspection.
                </p>
                <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 xl:grid-cols-7 xl:gap-x-2">
                  {processSteps.map((step) => (
                    <li key={step.num} className="relative text-center">
                      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-accent-500 text-[11px] font-bold text-accent-500">
                        {step.num}
                      </span>
                      <h3 className="mt-3 text-[10px] font-bold uppercase leading-tight tracking-wide">
                        {step.title}
                      </h3>
                      <p className="panel-muted mx-auto mt-1.5 max-w-[130px] text-[10px] leading-relaxed">
                        {step.desc}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS + FAQ */}
      <section className="panel-light section border-t border-ink-200 py-12 md:py-14">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <div>
              <Reveal>
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-accent-500 lg:text-left">
                  Our Work
                </p>
                <h2 className="mt-3 text-center text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-left lg:text-2xl">
                  Recent Vehicle Wrap Projects
                </h2>
                <p className="panel-muted mt-4 text-center text-sm leading-relaxed lg:text-left">
                  Explore recent vehicle wrap transformations completed by Spotless Tinting for cars and
                  commercial vehicles in Hobart and surrounding areas.
                </p>
              </Reveal>
              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {galleryFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-md border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors sm:text-[11px] ${
                      activeFilter === filter
                        ? 'border-accent-500 bg-accent-500 text-white'
                        : 'border-ink-900 bg-white text-ink-900 hover:border-accent-500 hover:text-accent-600'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {filteredGallery.map((item, i) => (
                  <Reveal key={item.id} delay={i * 40}>
                    <article className="flex aspect-[2/3] flex-col overflow-hidden rounded-lg bg-black shadow-sm">
                      <div className="relative min-h-0 flex-[2] overflow-hidden bg-ink-100">
                        <img
                          src={item.image}
                          alt={`${item.title} — ${item.service}`}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center px-2 py-2 text-center sm:px-3 sm:py-3">
                        <p className="text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[10px]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[8px] leading-tight text-ink-300 sm:text-[9px]">
                          {item.service}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={80}>
                <div className="mt-8 text-center lg:text-left">
                  <Link
                    to="/gallery"
                    className="btn-outline inline-flex rounded-sm px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-accent-600 sm:text-xs"
                  >
                    View All Wrap Projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="text-lg font-bold uppercase tracking-tight sm:text-xl lg:text-2xl">
                  <span className="relative inline-block pb-1">
                    Vehicle Wrap
                    <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-accent-500" aria-hidden />
                  </span>{' '}
                  FAQs
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <div className="mt-6">
                  <WrapFaqList items={wrapFaqs} />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL SEO + FINAL CTA */}
      <section className="relative overflow-hidden bg-black">
        <img
          src={images.vehicleWraps.finalCta}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right opacity-70 lg:opacity-100"
          aria-hidden
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/40 lg:via-black/80 lg:to-transparent"
          aria-hidden
        />

        <div className="container relative z-10 grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:py-14">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-500 sm:text-sm">
                Ready for a New Look?
              </p>
              <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.15rem]">
                Transform Your Vehicle.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                From subtle styling changes to complete colour transformations and commercial branding,
                talk to Spotless Tinting about professional vehicle wraps in Hobart.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                <Link to="/quote" className="btn-primary inline-flex w-fit uppercase tracking-wide">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-500" />
                  {business.phone}
                </a>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
                  <MapPin className="h-4 w-4 shrink-0 text-accent-500" />
                  {business.location}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="max-w-md lg:ml-auto">
              <h3 className="text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                Vehicle Wraps in Moonah, Hobart
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Spotless Tinting provides professional vehicle wrapping from our Moonah workshop for
                customers across Hobart and surrounding areas. Whether you want a full colour change,
                partial wrap, chrome delete, custom styling or commercial vehicle branding, we can help
                you plan a wrap that suits your vehicle and the result you want.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
