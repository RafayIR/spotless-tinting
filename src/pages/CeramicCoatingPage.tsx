import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Plus } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { business } from '@/data/business';

const heroStrip: { iconSrc: string; title: string; desc: string }[] = [
  { iconSrc: images.ceramic.icons.hydrophobic, title: 'Hydrophobic', desc: 'Repels water' },
  { iconSrc: images.ceramic.icons.gloss, title: 'Deep Gloss', desc: 'Enhanced finish' },
  { iconSrc: images.ceramic.icons.uv, title: 'UV Protection', desc: 'Helps protect paint' },
  { iconSrc: images.ceramic.icons.easierCare, title: 'Easier Care', desc: 'Simpler maintenance' },
];

/**
 * The cross-section artwork already carries these labels, so they are repeated here as
 * real text for search engines and for small screens where the artwork gets tight.
 */
const coatingLayers = [
  'Water & Contaminants',
  'Ceramic Coating',
  'Clear Coat',
  'Paint',
  'Body Panel',
];

const benefits: { num: string; title: string; desc: string; image: string }[] = [
  {
    num: '01',
    title: 'Hydrophobic Protection',
    desc: 'Water beads and rolls away from the surface.',
    image: images.ceramic.benefits.hydrophobic,
  },
  {
    num: '02',
    title: 'Deep Gloss',
    desc: 'Enhances paint depth, clarity and shine.',
    image: images.ceramic.benefits.gloss,
  },
  {
    num: '03',
    title: 'UV Protection',
    desc: 'Helps reduce the effects of prolonged UV exposure.',
    image: images.ceramic.benefits.uv,
  },
  {
    num: '04',
    title: 'Contaminant Resistance',
    desc: 'Helps protect against dirt, grime and environmental contaminants.',
    image: images.ceramic.benefits.contaminants,
  },
  {
    num: '05',
    title: 'Easier Cleaning',
    desc: 'A slicker surface makes routine maintenance easier.',
    image: images.ceramic.benefits.cleaning,
  },
  {
    num: '06',
    title: 'Long-Lasting Protection',
    desc: 'A durable alternative to traditional waxes and sealants.',
    image: images.ceramic.benefits.lasting,
  },
];

const comparison: { feature: string; ceramic: string; wax: string }[] = [
  { feature: 'Durability', ceramic: 'Longer-lasting', wax: 'Shorter-term' },
  { feature: 'Water behaviour', ceramic: 'Strong hydrophobic effect', wax: 'Moderate' },
  { feature: 'Gloss', ceramic: 'Deep, enhanced finish', wax: 'Good shine' },
  { feature: 'Maintenance', ceramic: 'Easier routine cleaning', wax: 'Requires regular reapplication' },
  { feature: 'Protection', ceramic: 'Durable protective layer', wax: 'Temporary surface protection' },
];

const processSteps: { num: string; title: string; desc: string; image: string }[] = [
  {
    num: '01',
    title: 'Vehicle Inspection',
    desc: 'Assess paint condition.',
    image: images.ceramic.process.inspection,
  },
  {
    num: '02',
    title: 'Deep Clean',
    desc: 'Thorough exterior preparation.',
    image: images.ceramic.process.deepClean,
  },
  {
    num: '03',
    title: 'Paint Preparation',
    desc: 'Prepare the surface for coating.',
    image: images.ceramic.process.preparation,
  },
  {
    num: '04',
    title: 'Coating Application',
    desc: 'Carefully apply the ceramic coating.',
    image: images.ceramic.process.application,
  },
  {
    num: '05',
    title: 'Curing',
    desc: 'Allow the coating to properly bond.',
    image: images.ceramic.process.curing,
  },
  {
    num: '06',
    title: 'Final Inspection',
    desc: 'Check the finish before handover.',
    image: images.ceramic.process.finalInspection,
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: 'How long does ceramic coating last?',
    answer:
      'Longevity depends on the product used, how the vehicle is stored and washed, and the conditions it is driven in. We will explain the expected performance and any manufacturer warranty for the specific coating selected.',
  },
  {
    question: 'Is ceramic coating worth it for a new car?',
    answer:
      'A new vehicle is a good candidate because the paint is in its best condition, so less correction work is needed before the coating is applied.',
  },
  {
    question: 'Does ceramic coating prevent scratches?',
    answer:
      'No. Ceramic coating is a chemical layer, not an impact barrier. It can help resist light marring and makes cleaning easier, but it does not stop stone chips or deeper scratches — Paint Protection Film is the option for physical protection.',
  },
  {
    question: 'Can ceramic coating be applied over PPF?',
    answer:
      'Yes, in most cases. A compatible coating can be applied over Paint Protection Film to add hydrophobic properties and gloss, and to make the film easier to clean.',
  },
  {
    question: 'How should I wash my car after ceramic coating?',
    answer:
      'Hand washing with a pH-neutral shampoo and the two-bucket method is preferred. Avoid harsh chemicals and abrasive brushes, and follow the aftercare guidance provided after installation.',
  },
  {
    question: 'How long does ceramic coating take to apply?',
    answer:
      'Timing depends on vehicle size, paint condition and how much preparation is required. We will confirm a timeframe after inspecting the vehicle.',
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] sm:text-[11px] ${
        light ? 'text-accent-400' : 'text-accent-500'
      }`}
    >
      <span className="h-px w-7 bg-current sm:w-9" aria-hidden />
      {children}
    </p>
  );
}

function CoatingLayerDiagram() {
  return (
    <div>
      <img
        src={images.ceramic.layerDiagram}
        alt="Cross-section of a coated panel: water and contaminants sit on the ceramic coating, above the clear coat, paint and body panel"
        className="aspect-[16/9] w-full rounded-lg object-cover object-right sm:aspect-[16/8]"
        loading="lazy"
      />
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {coatingLayers.map((layer) => (
          <li
            key={layer}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-700 dark:text-ink-300"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden />
            {layer}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqGrid({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-3">
          {column.map((item, i) => {
            const index = colIndex * midpoint + i;
            const isOpen = open === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-md border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-900"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[11px] font-semibold leading-snug text-ink-900 dark:text-white sm:text-xs">
                    {item.question}
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-accent-500 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    strokeWidth={2}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-[11px] leading-relaxed text-ink-600 dark:text-ink-300 sm:text-xs">
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

export default function CeramicCoatingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${business.website}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Ceramic Coating',
            item: `https://${business.website}/services/ceramic-coating`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
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
        title="Ceramic Coating Hobart | Spotless Tinting"
        description="Professional ceramic coating in Hobart. A durable, hydrophobic layer that repels water and dirt while adding deep gloss and making your car easier to clean."
        path="/services/ceramic-coating"
        image={images.ceramic.hero}
        schema={schema}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white dark:bg-ink-950">
        {/* The hero artwork carries its own "A Higher Standard of Protection" script line
            and leaves the left third clear for this copy. */}
        <img
          src={images.ceramic.hero}
          alt="Ceramic coating being buffed into the bonnet of a silver car"
          className="absolute inset-0 hidden h-full w-full object-cover object-right lg:block"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/85 to-transparent dark:from-ink-950 dark:via-ink-950/85 lg:block"
          aria-hidden
        />

        {/* Page-level container so the copy lines up with the header logo and nav */}
        <div className="container relative z-10">
          <div className="flex flex-col justify-center py-14 lg:min-h-[34rem] lg:max-w-[48%] lg:py-24 lg:pr-10">
            <Reveal>
              <div>
                <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'Ceramic Coating' }]} />
                <div className="mt-6">
                  <Eyebrow>Ceramic Coating Hobart</Eyebrow>
                </div>
                <h1 className="mt-4 text-4xl font-bold uppercase leading-[1.02] tracking-tight text-ink-950 dark:text-white sm:text-5xl xl:text-[3.5rem]">
                  Deep Gloss.
                  <br />
                  Lasting
                  <br />
                  <span className="text-accent-500">Protection.</span>
                </h1>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300 sm:text-base">
                  Enhance your vehicle&apos;s finish with professionally applied ceramic coating in
                  Hobart. Designed to create a durable, hydrophobic layer over your paintwork, ceramic
                  coating helps repel water, dirt and environmental contaminants while delivering a
                  deep, glossy finish.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/quote" className="btn-primary rounded-sm px-6 py-3 text-xs uppercase tracking-wide">
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#what-is-ceramic-coating"
                    className="btn rounded-sm border border-ink-900 bg-transparent px-6 py-3 text-xs uppercase tracking-wide text-ink-900 hover:bg-ink-900 hover:text-white dark:border-white/40 dark:text-white dark:hover:bg-white/10"
                  >
                    Explore Ceramic Coating
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Below lg the artwork sits under the copy, full-bleed */}
        <div className="relative min-h-[240px] sm:min-h-[320px] lg:hidden">
          <img
            src={images.ceramic.hero}
            alt="Ceramic coating being buffed into the bonnet of a silver car"
            className="absolute inset-0 h-full w-full object-cover object-right"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* BENEFIT STRIP */}
      <section className="border-y border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950">
        <div className="container">
          <ul className="grid grid-cols-2 divide-ink-100 dark:divide-ink-800 sm:grid-cols-4 sm:divide-x">
            {heroStrip.map((item) => (
              <li key={item.title} className="flex flex-col items-center px-3 py-6 text-center sm:py-8">
                <img src={item.iconSrc} alt="" className="h-8 w-8 object-contain" loading="lazy" />
                <h2 className="mt-3 text-[11px] font-bold uppercase tracking-wide text-ink-950 dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-ink-500 dark:text-ink-400">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT IS CERAMIC COATING */}
      <section
        id="what-is-ceramic-coating"
        className="scroll-mt-20 bg-ink-50 py-14 dark:bg-ink-900 md:py-16"
      >
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div>
                <Eyebrow>What Is Ceramic Coating?</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 dark:text-white sm:text-4xl">
                  More Than <span className="text-accent-500">Just a Shine.</span>
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  Ceramic coating is a liquid protective coating professionally applied to your
                  vehicle&apos;s exterior surfaces. Once cured, it forms a durable layer that bonds with
                  the paintwork, creating a smoother, highly hydrophobic surface.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  Unlike traditional waxes and sealants, ceramic coating is designed to provide
                  longer-lasting protection while enhancing gloss and making routine cleaning easier.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <CoatingLayerDiagram />
            </Reveal>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white py-14 dark:bg-ink-950 md:py-16">
        <div className="container">
          <Reveal>
            <Eyebrow>The Benefits</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 dark:text-white sm:text-4xl">
              Protection <span className="text-accent-500">You Can See.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {benefits.map((item, i) => (
              <Reveal key={item.num} delay={i * 40}>
                <article className="flex h-full flex-col overflow-hidden rounded-md border border-ink-100 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-3.5">
                    <span className="text-sm font-bold text-accent-500">{item.num}</span>
                    <h3 className="mt-1 text-[11px] font-bold leading-snug text-ink-950 dark:text-white sm:text-xs">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[10px] leading-relaxed text-ink-600 dark:text-ink-300 sm:text-[11px]">
                      {item.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERAMIC VS WAX */}
      <section className="bg-black py-14 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
            <Reveal>
              <div>
                <Eyebrow light>The Difference</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ceramic Coating or
                  <br />
                  <span className="text-accent-500">Traditional Wax?</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
                  Both wax and ceramic coating can enhance your vehicle&apos;s appearance, but ceramic
                  coating provides longer-lasting protection, greater durability and easier maintenance.
                </p>
                <Link
                  to="/contact"
                  className="btn mt-8 inline-flex rounded-sm border border-white/40 bg-transparent px-6 py-3 text-xs uppercase tracking-wide text-white hover:bg-white/10"
                >
                  Discuss the Right Option
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="overflow-hidden rounded-sm bg-white">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] text-[10px] font-bold uppercase tracking-wide sm:text-[11px]">
                  <span className="bg-ink-100 px-3 py-3 text-ink-700">Feature</span>
                  <span className="bg-accent-500 px-3 py-3 text-center text-white">Ceramic Coating</span>
                  <span className="bg-ink-100 px-3 py-3 text-center text-ink-700">Traditional Wax</span>
                </div>
                {comparison.map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] border-t border-ink-100 text-[10px] sm:text-[11px]"
                  >
                    <span className="px-3 py-3 font-semibold text-ink-900">{row.feature}</span>
                    <span className="border-x border-ink-100 px-3 py-3 text-center text-ink-700">
                      {row.ceramic}
                    </span>
                    <span className="px-3 py-3 text-center text-ink-700">{row.wax}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-ink-50 py-14 dark:bg-ink-900 md:py-16">
        <div className="container">
          <Reveal>
            <Eyebrow>Our Process</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 dark:text-white sm:text-4xl">
              Precision at <span className="text-accent-500">Every Stage.</span>
            </h2>
          </Reveal>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 40}>
                <li className="relative flex h-full flex-col overflow-hidden rounded-md border border-ink-100 bg-white shadow-sm dark:border-ink-800 dark:bg-ink-950">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-3.5">
                    <span className="text-sm font-bold text-accent-500">{step.num}</span>
                    <h3 className="mt-1 text-[11px] font-bold leading-snug text-ink-950 dark:text-white sm:text-xs">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-ink-600 dark:text-ink-300">
                      {step.desc}
                    </p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-accent-500 xl:block"
                      aria-hidden
                    />
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* PPF + CERAMIC */}
      <section className="grid bg-black lg:grid-cols-2 lg:items-stretch">
        <Reveal>
          <div className="flex h-full flex-col justify-center px-6 py-14 sm:px-10 lg:py-16 xl:px-16">
            <Eyebrow light>The Ultimate Protection</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              PPF + <span className="text-accent-500">Ceramic Coating</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75">
              For customers looking for a more complete vehicle protection package, ceramic coating can
              be combined with Paint Protection Film (PPF). PPF provides physical protection for
              vulnerable painted surfaces, while ceramic coating adds hydrophobic properties, gloss and
              easier maintenance.
            </p>
            <Link
              to="/services/paint-protection-film"
              className="btn-primary mt-8 inline-flex w-fit rounded-sm px-6 py-3 text-xs uppercase tracking-wide"
            >
              Explore Paint Protection Film
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80} className="h-full">
          {/* The split artwork already labels each half, so nothing is overlaid here. */}
          <div className="relative h-full min-h-[240px] sm:min-h-[300px]">
            <img
              src={images.ceramic.ppfCombo}
              alt="Bonnet split down the middle: paint protection film for physical protection on one side, ceramic coating for enhanced gloss on the other"
              className="absolute inset-0 h-full w-full object-cover object-right"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14 dark:bg-ink-950 md:py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
            <Reveal>
              <div>
                <Eyebrow>Frequently Asked Questions</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 dark:text-white sm:text-4xl">
                  Got Questions?
                  <br />
                  <span className="text-accent-500">We&apos;ve Got Answers.</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <FaqGrid items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-black">
        {/* Footer artwork carries the "Cleaner Cars. Brighter Journeys." script line. */}
        <img
          src={images.ceramic.finalCta}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right"
          aria-hidden
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80"
          aria-hidden
        />

        <div className="container relative z-10 py-14 md:py-16">
          <Reveal>
            <div className="max-w-xl">
              <Eyebrow>Ceramic Coating Hobart</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 dark:text-white sm:text-4xl">
                Protect the Finish.
                <br />
                <span className="text-accent-500">Enjoy the Drive.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                Talk to the Spotless Tinting team about professional ceramic coating for your vehicle.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/quote" className="btn-primary rounded-sm px-6 py-3 text-xs uppercase tracking-wide">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={business.phoneHref}
                  className="btn rounded-sm border border-ink-900 bg-transparent px-6 py-3 text-xs uppercase tracking-wide text-ink-900 hover:bg-ink-900 hover:text-white dark:border-white/40 dark:text-white dark:hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 text-accent-500" />
                  Call {business.phone}
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </>
  );
}
