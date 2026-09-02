import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
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
    image: images.suvDark,
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
  iconSrc: string;
  title: string;
  desc: string;
}[] = [
  {
    iconSrc: images.windowTinting.moreThanDarkerGlass.heatReduction,
    title: 'Heat Reduction',
    desc: 'Helps reduce solar heat entering through the glass.',
  },
  {
    iconSrc: images.windowTinting.moreThanDarkerGlass.uvProtection,
    title: 'UV Protection',
    desc: 'Blocks up to 99% of harmful ultraviolet rays.',
  },
  {
    iconSrc: images.windowTinting.moreThanDarkerGlass.glareControl,
    title: 'Glare Control',
    desc: 'Reduces uncomfortable glare for a more comfortable space.',
  },
  {
    iconSrc: images.windowTinting.moreThanDarkerGlass.privacy,
    title: 'Privacy',
    desc: 'Enhances privacy for vehicles, homes and businesses.',
  },
  {
    iconSrc: images.windowTinting.moreThanDarkerGlass.appearance,
    title: 'Appearance',
    desc: 'Improves the look of your glass and property.',
  },
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

function BenefitColumn({
  item,
  showDivider,
}: {
  item: (typeof benefitColumns)[number];
  showDivider: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center px-4 text-center sm:px-6 ${
        showDivider ? 'lg:border-r lg:border-ink-200' : ''
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent-500">
        <img src={item.iconSrc} alt="" className="h-6 w-6" aria-hidden loading="lazy" />
      </div>
      <h3 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-950 sm:text-sm">
        {item.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-500 sm:text-sm">{item.desc}</p>
    </div>
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
                Different shades. Same premium quality.
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
              className={`rounded-md border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:px-5 sm:text-xs ${
                activeFilter === filter
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
    <section className="border-y border-ink-100 bg-white py-16 md:py-20">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-950 sm:text-base">
              More Than Just Darker Glass
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-accent-500" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {benefitColumns.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <BenefitColumn item={item} showDivider={i < benefitColumns.length - 1} />
            </Reveal>
          ))}
        </div>
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
                Advanced window films are engineered to deliver maximum performance, protection
                and comfort.
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
