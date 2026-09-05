import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  Eye,
  Home,
  KeyRound,
  Lock,
  Plus,
  Shield,
  Sparkles,
  Store,
  Thermometer,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';

const choosingFactors: { title: string; desc: string }[] = [
  {
    title: 'Performance',
    desc: 'Heat & solar control requirements',
  },
  {
    title: 'Privacy',
    desc: 'The level of privacy you want to achieve',
  },
  {
    title: 'Appearance',
    desc: 'Shade, colour & finished look',
  },
  {
    title: 'Application',
    desc: 'Automotive, residential & commercial',
  },
];

const tintShades: {
  name: string;
  vlt: string;
  image: string;
}[] = [
    {
      name: 'Light',
      vlt: '35% VLT*',
      image: images.windowTinting.findYourLook.light,
    },
    {
      name: 'Medium',
      vlt: '20% VLT*',
      image: images.windowTinting.findYourLook.medium,
    },
    {
      name: 'Medium Dark',
      vlt: '15% VLT*',
      image: images.windowTinting.findYourLook.mediumDark,
    },
    {
      name: 'Dark',
      vlt: '5% VLT*',
      image: images.windowTinting.findYourLook.dark,
    },
    {
      name: 'Limo',
      vlt: '2% VLT*',
      image: images.windowTinting.findYourLook.limo,
    },
  ];

const automotiveTintShades: {
  name: string;
  vlt: string;
  desc: string;
  image: string;
}[] = [
  {
    name: 'Light',
    vlt: '35% VLT*',
    desc: 'Maximum visibility with subtle tint.',
    image: images.windowTinting.findYourLook.light,
  },
  {
    name: 'Medium',
    vlt: '20% VLT*',
    desc: 'Balanced privacy and visibility.',
    image: images.windowTinting.findYourLook.medium,
  },
  {
    name: 'Medium Dark',
    vlt: '15% VLT*',
    desc: 'Enhanced privacy and style.',
    image: images.windowTinting.findYourLook.mediumDark,
  },
  {
    name: 'Dark',
    vlt: '5% VLT*',
    desc: 'Maximum privacy with sleek look.',
    image: images.windowTinting.findYourLook.dark,
  },
  {
    name: 'Limo / Blackout',
    vlt: '2% VLT*',
    desc: 'Ultimate privacy and standout style.',
    image: images.windowTinting.findYourLook.limo,
  },
];

const windowTintingFaqs: { question: string; answer: string }[] = [
  {
    question: 'What are the benefits of window tinting?',
    answer:
      'Window tinting can help reduce heat and glare, improve privacy, provide UV protection and enhance the overall appearance of a vehicle or property.',
  },
  {
    question: 'Does window film provide UV protection?',
    answer:
      'Many quality window films are designed to reject a high percentage of UV radiation. Performance varies by product, so we can help you select an appropriate film.',
  },
  {
    question: 'Can window tint help reduce heat?',
    answer:
      'Yes. Different window films are designed to reduce varying levels of solar heat. The right option depends on the glass, application and level of performance required.',
  },
  {
    question: 'How long does window film last?',
    answer:
      'Premium window films, when professionally installed and properly cared for, can last many years. The exact lifespan depends on the film type, sun exposure and how well the tint is maintained.',
  },
  {
    question: 'Do you provide residential and commercial tinting?',
    answer:
      'Yes. Spotless Tinting provides window film solutions for vehicles, homes, offices, shopfronts and other commercial properties across Hobart and surrounding areas.',
  },
  {
    question: 'What window film is right for me?',
    answer:
      'The right film depends on your goals — heat reduction, privacy, glare control or appearance. Our team will assess your glass, application and preferences to recommend the best option.',
  },
];

function TintingFaqGrid({ items }: { items: { question: string; answer: string }[] }) {
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

type TintingProjectFilter = 'All' | 'Automotive' | 'Residential' | 'Commercial';

const tintingProjectFilters: TintingProjectFilter[] = [
  'All',
  'Automotive',
  'Residential',
  'Commercial',
];

const recentTintingProjects: {
  id: string;
  category: Exclude<TintingProjectFilter, 'All'>;
  image: string;
  alt: string;
}[] = [
    {
      id: 'auto-1',
      category: 'Automotive',
      image: images.blackCar,
      alt: 'Black sports car with ceramic window tint',
    },
    {
      id: 'res-1',
      category: 'Residential',
      image: images.modernHome,
      alt: 'Modern home with residential window tinting',
    },
    {
      id: 'com-1',
      category: 'Commercial',
      image: images.commercialBuilding,
      alt: 'Commercial building with solar control window film',
    },
    {
      id: 'auto-2',
      category: 'Automotive',
      image: images.sportsCar,
      alt: 'SUV with premium automotive window tint',
    },
    {
      id: 'res-2',
      category: 'Residential',
      image: images.residentialWindow,
      alt: 'Residential interior with tinted floor-to-ceiling windows',
    },
    {
      id: 'com-2',
      category: 'Commercial',
      image: images.officeGlass,
      alt: 'Commercial office with window tinting',
    },
  ];

type AutomotiveProjectFilter = 'All' | 'Sedans' | 'SUVs' | 'Utes' | 'Sports';

const automotiveProjectFilters: AutomotiveProjectFilter[] = [
  'All',
  'Sedans',
  'SUVs',
  'Utes',
  'Sports',
];

const recentAutomotiveProjects: {
  id: string;
  category: Exclude<AutomotiveProjectFilter, 'All'>;
  image: string;
  alt: string;
}[] = [
  {
    id: 'g1',
    category: 'Sedans',
    image: images.luxurySedan,
    alt: 'Sedan with professionally installed automotive window tint',
  },
  {
    id: 'g2',
    category: 'SUVs',
    image: images.suvDark,
    alt: 'SUV with dark automotive window film',
  },
  {
    id: 'g3',
    category: 'Utes',
    image: images.blackCar,
    alt: 'Ute with automotive window tinting',
  },
  {
    id: 'g4',
    category: 'Sports',
    image: images.sportsCar,
    alt: 'Sports coupe with premium window tint',
  },
  {
    id: 'g5',
    category: 'Sedans',
    image: images.coupeSide,
    alt: 'Coupe side profile showing window tint finish',
  },
  {
    id: 'g6',
    category: 'SUVs',
    image: images.heroCar,
    alt: 'Family SUV with automotive window film installed',
  },
];

const automotiveProcessSteps: {
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

const spotlessStandardSteps: {
  num: string;
  title: string;
  desc: string;
  iconSrc: string;
}[] = [
    {
      num: '01',
      title: 'Consult',
      desc: 'We discuss your needs and recommend the best solution.',
      iconSrc: images.windowTinting.spotlessStandard.consult,
    },
    {
      num: '02',
      title: 'Select',
      desc: 'Choose the right film for your application and preferences.',
      iconSrc: images.windowTinting.spotlessStandard.select,
    },
    {
      num: '03',
      title: 'Prepare',
      desc: 'Thorough cleaning of glass for a flawless installation.',
      iconSrc: images.windowTinting.spotlessStandard.prepare,
    },
    {
      num: '04',
      title: 'Install',
      desc: 'Precision installation by our experienced technicians.',
      iconSrc: images.windowTinting.spotlessStandard.install,
    },
    {
      num: '05',
      title: 'Inspect',
      desc: 'Final quality check ensures the highest possible finish.',
      iconSrc: images.windowTinting.spotlessStandard.inspect,
    },
  ];

const benefitColumns: {
  num: string;
  iconSrc: string;
  title: string;
  desc: string;
  image: string;
  overlayIcon: LucideIcon;
  overlayLabel: string;
}[] = [
  {
    num: '01',
    iconSrc: images.windowTinting.moreThanDarkerGlass.heatReduction,
    title: 'Heat Reduction',
    desc: 'Blocks solar heat, keeping your space cooler and more comfortable.',
    image: images.homeBenefitsOfTinting.heatReduction,
    overlayIcon: Thermometer,
    overlayLabel: 'Cooler Spaces',
  },
  {
    num: '02',
    iconSrc: images.windowTinting.moreThanDarkerGlass.uvProtection,
    title: 'UV Protection',
    desc: 'Helps block harmful UV rays and protects people, interiors and furnishings from premature fading.',
    image: images.homeBenefitsOfTinting.uvProtection,
    overlayIcon: Shield,
    overlayLabel: 'Longer Lasting Interiors',
  },
  {
    num: '03',
    iconSrc: images.windowTinting.moreThanDarkerGlass.glareControl,
    title: 'Glare Control',
    desc: 'Reduces harsh sunlight and glare for improved visibility and everyday comfort.',
    image: images.homeBenefitsOfTinting.glareControl,
    overlayIcon: Eye,
    overlayLabel: 'Clearer Views',
  },
  {
    num: '04',
    iconSrc: images.windowTinting.moreThanDarkerGlass.privacy,
    title: 'Enhanced Privacy',
    desc: 'Choose the level of privacy that suits your vehicle, home or commercial space.',
    image: images.homeBenefitsOfTinting.privacy,
    overlayIcon: Lock,
    overlayLabel: 'Privacy When You Need It',
  },
  {
    num: '05',
    iconSrc: images.windowTinting.moreThanDarkerGlass.appearance,
    title: 'Premium Appearance',
    desc: 'Gives glass a cleaner, more refined finish with professionally installed film.',
    image: images.homeBenefitsOfTinting.appearance,
    overlayIcon: Sparkles,
    overlayLabel: 'A Cleaner, More Modern Look',
  },
];

const builtForItems: { icon: LucideIcon; label: string }[] = [
  { icon: Car, label: 'Cars' },
  { icon: Home, label: 'Homes' },
  { icon: Building2, label: 'Offices' },
  { icon: Store, label: 'Shopfronts' },
];

/*
const techCallouts: {
  side: 'left' | 'right';
  iconSrc: string;
  title: string;
  desc: string;
}[] = [
  {
    side: 'left',
    iconSrc: images.windowTinting.filmTechnology.solarHeatReduced,
    title: 'Solar Heat Reduced',
    desc: 'Helps reduce solar heat and keep spaces cooler.',
  },
  {
    side: 'left',
    iconSrc: images.windowTinting.filmTechnology.visibleLightControlled,
    title: 'Visible Light Controlled',
    desc: 'Maintain natural light while improving comfort.',
  },
  {
    side: 'right',
    iconSrc: images.windowTinting.filmTechnology.uvRaysFiltered,
    title: 'UV Rays Filtered',
    desc: 'Blocks up to 99% of harmful UV rays.',
  },
  {
    side: 'right',
    iconSrc: images.windowTinting.filmTechnology.glareReduced,
    title: 'Glare Reduced',
    desc: 'Minimises harsh glare for better visibility.',
  },
  {
    side: 'right',
    iconSrc: images.windowTinting.filmTechnology.privacyEnhanced,
    title: 'Privacy Enhanced',
    desc: 'Choose the right film for your privacy needs.',
  },
];

function TechCallout({
  item,
  className,
}: {
  item: (typeof techCallouts)[number];
  className: string;
}) {
  const isLeft = item.side === 'left';

  return (
    <div className={`absolute flex items-center ${className}`}>
      ...
    </div>
  );
}
*/

function FilmTechnologyDiagram() {
  return (
    <div className="flex w-full items-center justify-center lg:justify-end">
      <img
        src={images.windowTinting.filmTechnology.diagram}
        alt="Window film technology layers diagram"
        loading="lazy"
        className="h-auto w-[90%] max-w-full object-contain object-center lg:max-h-[min(440px,55vh)] xl:max-h-[480px]"
      />
    </div>
  );
}

function BenefitColumn({ item }: { item: (typeof benefitColumns)[number] }) {
  const OverlayIcon = item.overlayIcon;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="relative flex flex-1 flex-col px-4 pb-3 pt-5 sm:px-5 sm:pt-6">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[2.5rem] font-bold leading-none text-accent-200 sm:text-5xl">
            {item.num}
          </span>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-accent-500 sm:h-10 sm:w-10">
            <img
              src={item.iconSrc}
              alt=""
              className="h-[18px] w-[18px] object-contain sm:h-5 sm:w-5"
              aria-hidden
              loading="lazy"
            />
          </div>
        </div>
        <h3 className="mt-4 text-[11px] font-bold uppercase tracking-wide text-ink-950 sm:mt-5 sm:text-xs">
          {item.title}
        </h3>
        <p className="mt-2 text-[11px] leading-relaxed text-ink-500 sm:text-xs">{item.desc}</p>
      </div>

      <div className="relative mt-auto aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-3.5 py-3 sm:gap-2.5 sm:px-4 sm:py-3.5">
          <OverlayIcon className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" strokeWidth={1.75} />
          <span className="text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[10px]">
            {item.overlayLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

function TintShadeCard({
  shade,
}: {
  shade: (typeof tintShades)[number];
}) {
  return (
    <div className="min-w-[4.75rem] flex-1 overflow-hidden rounded-sm border border-white/15 bg-[#101010] sm:min-w-0">
      <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
        <img
          src={shade.image}
          alt={`${shade.name} window tint — ${shade.vlt}`}
          loading="lazy"
          className="h-full w-full scale-[1.45] object-cover object-[58%_54%]"
        />
      </div>
      <div className="px-1 py-2 text-center">
        <p className="text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[10px]">
          {shade.name}
        </p>
        <p className="mt-0.5 text-[8px] text-ink-300 sm:text-[9px]">{shade.vlt}</p>
      </div>
    </div>
  );
}

export function FindYourLookSection({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-black py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="border-l-4 border-accent-500 pl-5 sm:pl-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Find Your Look
            </h2>
            <p className="mt-1.5 text-xs text-ink-300 sm:text-sm">
              Different shades. <span className="text-accent-500">Same</span> premium quality.
            </p>

            <div className="mt-5 flex gap-1.5 sm:mt-6 sm:gap-2">
              {tintShades.map((shade) => (
                <TintShadeCard key={shade.image} shade={shade} />
              ))}
            </div>

            <p className="mt-4 text-[9px] leading-relaxed text-ink-400 sm:text-[10px]">
              *VLT — Visible Light Transmission. Legal requirements vary by state and application.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PerfectShadeCard({
  shade,
}: {
  shade: (typeof automotiveTintShades)[number];
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#141414]">
      <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a] sm:aspect-[4/5]">
        <img
          src={shade.image}
          alt={`${shade.name} window tint — ${shade.vlt}`}
          loading="lazy"
          className="h-full w-full scale-[1.45] object-cover object-[58%_54%]"
        />
      </div>
      <div className="flex flex-1 flex-col p-2.5 text-left sm:p-3 min-h-[5.5rem] sm:min-h-[6rem]">
        <p className="text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[10px]">
          {shade.name}
        </p>
        <p className="mt-1 text-[9px] font-bold text-white sm:text-[10px]">{shade.vlt}</p>
        <p className="mt-2 text-[8px] leading-relaxed text-ink-300 sm:text-[9px]">{shade.desc}</p>
      </div>
    </div>
  );
}

export function FindYourPerfectShadeSection({
  id,
  lawsHref = '#tint-laws',
}: {
  id?: string;
  lawsHref?: string;
}) {
  return (
    <section id={id} className="bg-black py-16 md:py-20">
      <div className="container">
        <Reveal>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
            Find Your Perfect Shade
          </h2>
          <p className="mt-2 text-xs text-ink-300 sm:text-sm">
            Different shades.{' '}
            <span className="text-accent-500">Same premium quality.</span>
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:mt-8 lg:grid-cols-6 lg:gap-4">
            {automotiveTintShades.map((shade) => (
              <PerfectShadeCard key={shade.image} shade={shade} />
            ))}

            <aside className="relative col-span-2 flex min-h-[300px] flex-col overflow-hidden rounded-sm border border-white/10 bg-[#1a1a1a] p-5 sm:col-span-3 sm:min-h-[320px] sm:p-6 lg:col-span-1 lg:min-h-0">
              <img
                src={images.automotiveTinting.tasmaniaMap}
                alt=""
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[58%] w-[190%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-55"
                style={{ objectPosition: '72% 78%' }}
                loading="lazy"
              />
              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent-500">
                  Tasmanian Tint Laws
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-200 sm:text-sm">
                  We ensure all installations comply with Tasmania&apos;s window tint regulations.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-200 sm:text-sm">
                  Our team will guide you to the right shade for your needs.
                </p>
                <a
                  href={lawsHref}
                  className="mt-6 inline-flex w-fit items-center justify-center gap-2 border border-white/70 px-5 py-2.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white transition-colors hover:border-accent-500 hover:text-accent-500 sm:mt-auto sm:text-xs"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </aside>
          </div>

          <p className="mt-4 max-w-3xl text-[9px] leading-relaxed text-ink-400 sm:text-[10px]">
            *VLT = Visible Light Transmission. Legal requirements vary by state and application.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function ChoosingRightFilmSection() {
  return (
    <section className="bg-black py-16 md:py-20">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          <Reveal>
            <div className="lg:pr-10 xl:pr-14">
              <div className="h-0.5 w-10 bg-accent-500" />
              <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                Choosing the Right Film
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-300 sm:text-base">
                The right window film is engineered to your glass, application and performance needs.
                Our team will guide you through the options to find the perfect fit for your space.
              </p>
              <ul className="mt-8 space-y-4">
                {choosingFactors.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink-200">
                      <span className="font-bold text-white">{item.title}</span>
                      {' – '}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center gap-2 border border-accent-500 px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-accent-500 transition-colors hover:bg-accent-500 hover:text-white sm:text-sm"
              >
                Talk to Our Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-accent-500 pt-10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
              <h3 className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                Find Your Look
              </h3>
              <p className="mt-1.5 text-xs text-ink-300 sm:text-sm">
                Different shades. <span className="text-accent-500">Same</span> premium quality.
              </p>

              <div className="mt-5 flex gap-1.5 sm:mt-6 sm:gap-2">
                {tintShades.map((shade) => (
                  <TintShadeCard key={shade.image} shade={shade} />
                ))}
              </div>

              <p className="mt-4 text-[9px] leading-relaxed text-ink-400 sm:text-[10px]">
                *VLT — Visible Light Transmission. Legal requirements vary by state and application.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function RecentWindowTintingProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<TintingProjectFilter>('All');

  const filteredProjects = recentTintingProjects.filter(
    (project) => activeFilter === 'All' || project.category === activeFilter,
  );

  return (
    <section className="section border-t border-ink-100 bg-white">
      <div className="container">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
              Recent Window Tinting Projects
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tintingProjectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:px-5 sm:text-xs ${activeFilter === filter
                ? 'border-accent-500 bg-accent-500 text-white'
                : 'border-ink-300 bg-white text-ink-950 hover:border-accent-500 hover:text-accent-600'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {filteredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 40}>
              <div className="overflow-hidden rounded-xl bg-ink-100">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 border border-accent-500 px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-500 transition-colors hover:bg-accent-500 hover:text-white sm:text-sm"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WindowTintingFaqSection() {
  return (
    <section className="section border-t border-ink-100 bg-white">
      <div className="container">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
              Window Tinting FAQs
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-10 max-w-4xl">
            <TintingFaqGrid items={windowTintingFaqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AutomotiveTintingProcessSection() {
  return (
    <section className="section border-t border-ink-100 bg-white">
      <div className="container">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
              Our Tinting Process
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-accent-500" />
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {automotiveProcessSteps.map((step, i) => (
            <Fragment key={step.title}>
              {i > 0 && (
                <ArrowRight
                  className="mx-auto hidden h-4 w-4 shrink-0 self-center text-accent-500 lg:block"
                  strokeWidth={2}
                  aria-hidden
                />
              )}
              <Reveal delay={i * 50} className="flex-1">
                <div className="flex flex-col items-center px-2 text-center">
                  {step.iconSrc ? (
                    <img
                      src={step.iconSrc}
                      alt=""
                      className="h-11 w-11 sm:h-12 sm:w-12"
                      aria-hidden
                      loading="lazy"
                    />
                  ) : step.icon ? (
                    <step.icon className="h-11 w-11 text-accent-500 sm:h-12 sm:w-12" strokeWidth={1.5} />
                  ) : null}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-accent-500 text-[11px] font-bold text-accent-500">
                      {step.num}
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-ink-950 sm:text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[200px] text-[11px] leading-relaxed text-ink-600 sm:text-xs">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentAutomotiveProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<AutomotiveProjectFilter>('All');

  const filteredProjects = recentAutomotiveProjects.filter(
    (project) => activeFilter === 'All' || project.category === activeFilter,
  );

  return (
    <section className="section border-t border-ink-100 bg-white">
      <div className="container">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
              Recent Automotive Tinting Projects
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {automotiveProjectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:px-5 sm:text-xs ${activeFilter === filter
                ? 'border-accent-500 bg-accent-500 text-white'
                : 'border-ink-300 bg-white text-ink-950 hover:border-accent-500 hover:text-accent-600'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {filteredProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 40}>
              <div className="overflow-hidden rounded-xl bg-ink-100">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 border border-accent-500 px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-500 transition-colors hover:bg-accent-500 hover:text-white sm:text-sm"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SpotlessStandardSection() {
  return (
    <section className="section border-t border-ink-100 bg-white">
      <div className="container">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
              The Spotless Standard
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-accent-500" />
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {spotlessStandardSteps.map((step, i) => (
            <Fragment key={step.title}>
              {i > 0 && (
                <ArrowRight
                  className="mx-auto hidden h-4 w-4 shrink-0 self-center text-accent-500 lg:block"
                  strokeWidth={2}
                  aria-hidden
                />
              )}
              <Reveal delay={i * 50} className="flex-1">
                <div className="flex flex-col items-center px-2 text-center">
                  <img
                    src={step.iconSrc}
                    alt=""
                    className="h-11 w-11 sm:h-12 sm:w-12"
                    aria-hidden
                    loading="lazy"
                  />
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-accent-500 text-[11px] font-bold text-accent-500">
                      {step.num}
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-ink-950 sm:text-sm">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[200px] text-[11px] leading-relaxed text-ink-600 sm:text-xs">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MoreThanDarkerGlassSection() {
  return (
    <section className="border-y border-ink-100 bg-white py-14 md:py-16">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink-950 md:text-4xl lg:text-[2.75rem]">
              Five Benefits.{' '}
              <span className="text-accent-500">One Smarter Solution.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
              Professional window tinting does more than change the look of your glass. It creates a
              more comfortable, protected and enjoyable environment for your vehicle, home or
              workplace.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3 xl:gap-4">
          {benefitColumns.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <BenefitColumn item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="relative mt-12 pb-16 md:mt-6 md:pb-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-ink-200" aria-hidden />
              <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400 sm:text-xs">
                Built For
              </p>
              <div className="h-px flex-1 bg-ink-200" aria-hidden />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-y-4">
              {builtForItems.map((item, i) => (
                <div key={item.label} className="flex items-center">
                  {i > 0 && (
                    <div className="mx-4 hidden h-8 w-px bg-ink-200 sm:mx-6 sm:block md:mx-6" aria-hidden />
                  )}
                  <div className="flex items-center gap-2 px-3 sm:px-0">
                    <item.icon className="h-5 w-5 text-accent-500 sm:h-6 sm:w-6" strokeWidth={1.6} />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-ink-500 sm:text-xs">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* <p className="pointer-events-none mt-10 select-none text-center sm:mt-0 sm:absolute sm:bottom-2 sm:right-0 sm:text-left">
              <span className="inline-block origin-bottom-left -rotate-[14deg] font-script text-[2.35rem] leading-[1.05] tracking-wide text-accent-500 sm:text-[2.75rem] md:text-[3.15rem]">
                <span className="block">Same Light.</span>
                <span className="relative mt-1 inline-block pb-1.5">
                  A Brighter Tomorrow
                  <span
                    className="absolute bottom-0 left-[0.15em] right-[0.05em] h-[0.12em] rounded-full bg-accent-500"
                    aria-hidden
                  />
                </span>
              </span>
            </p> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WindowFilmTechnologySection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8 xl:gap-12">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                Window Film Technology
              </h2>
              <div className="mt-3 h-0.5 w-10 bg-accent-500" />
              <p className="mt-5 max-w-md leading-relaxed text-ink-600">
                Modern window film is engineered to manage the way solar energy and light interact with glass.
              </p>
              <p className="mt-5 max-w-md leading-relaxed text-ink-600">
                Different films provide different levels of solar heat control, UV rejection, visible light transmission, glare reduction and privacy, allowing us to recommend a solution based on what you actually want to achieve.
              </p>
              <Link to="/quote" className="btn-outline mt-8 uppercase tracking-wide">
                Learn More About Our Films
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <FilmTechnologyDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}