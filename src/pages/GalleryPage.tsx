import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  MapPin,
  Phone,
  Mail,
  Car,
  Home,
  Building2,
  Shield,
  Layers,
  Sparkles,
  Star,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { projects } from '@/data/projects';
import { reviews } from '@/data/reviews';
import { images } from '@/data/images';
import { business } from '@/data/business';

const filters = [
  'All',
  'Automotive Tint',
  'Residential',
  'Commercial',
  'PPF',
  'Vehicle Wraps',
] as const;

type Filter = (typeof filters)[number];

function matchesFilter(category: string, filter: Filter) {
  if (filter === 'All') return true;
  if (filter === 'Automotive Tint') return category === 'Window Tinting';
  if (filter === 'PPF') return category === 'PPF';
  if (filter === 'Vehicle Wraps') return category === 'Vehicle Wraps';
  if (filter === 'Residential') return category === 'Residential';
  if (filter === 'Commercial') return category === 'Commercial';
  return false;
}

function displayCategory(category: string) {
  if (category === 'Window Tinting') return 'Automotive Tint';
  return category;
}

const heroPanels = [
  { src: images.blackCar, alt: 'Automotive window tinting project' },
  { src: images.modernHome, alt: 'Residential window tinting project' },
  { src: images.officeGlass, alt: 'Commercial window tinting project' },
];

/**
 * First panel = whole parallelogram (both sides diagonal).
 * Middle = parallelogram. Last = diagonal left, straight right edge.
 */
const panelClipPaths = [
  'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
  'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
  'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
];

const featuredProjects = [
  {
    title: 'Full Ceramic Tint — Sports Coupe',
    desc: 'Maximum heat rejection with a refined dark finish for a premium sports vehicle.',
    image: images.sportsCar,
    icon: Car,
  },
  {
    title: 'Solar Control — Modern Residence',
    desc: 'Comfort, UV protection and privacy for a contemporary Hobart home.',
    image: images.modernHome,
    icon: Home,
  },
  {
    title: 'Commercial Glare Reduction',
    desc: 'Office film that improves workplace comfort and screen visibility.',
    image: images.officeGlass,
    icon: Building2,
  },
];

const serviceCategories: { label: string; path: string; icon: LucideIcon; image: string }[] = [
  { label: 'Automotive Tint', path: '/services/automotive-window-tinting', icon: Car, image: images.blackCar },
  { label: 'Residential', path: '/services/residential-window-tinting', icon: Home, image: images.modernHome },
  { label: 'Commercial', path: '/services/commercial-window-tinting', icon: Building2, image: images.officeGlass },
  { label: 'Paint Protection', path: '/services/paint-protection-film', icon: Shield, image: images.heroCar },
  { label: 'Vehicle Wraps', path: '/services/vehicle-wrapping', icon: Layers, image: images.matteWrap },
  { label: 'Ceramic Coating', path: '/services/ceramic-coating', icon: Sparkles, image: images.ceramicCoating },
];

function BeforeAfterCard({
  beforeSrc,
  afterSrc,
  label,
}: {
  beforeSrc: string;
  afterSrc: string;
  label: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 select-none">
      <img src={afterSrc} alt={`${label} after`} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={beforeSrc} alt={`${label} before`} className="absolute inset-0 h-full w-full object-cover brightness-125" />
        <div className="absolute inset-0 bg-white/15" />
      </div>
      <div className="absolute inset-y-0 z-20 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg">
          <span className="text-[10px] font-bold">⇄</span>
        </div>
      </div>
      <span className="absolute left-3 top-3 z-20 rounded bg-ink-950/70 px-2 py-1 text-[10px] font-bold uppercase text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 z-20 rounded bg-accent-500/90 px-2 py-1 text-[10px] font-bold uppercase text-white">
        After
      </span>
      <span className="absolute bottom-3 left-3 z-20 text-xs font-semibold text-white drop-shadow">
        {label}
      </span>
      <input
        type="range"
        min={5}
        max={95}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-30 cursor-ew-resize opacity-0"
        aria-label={`${label} before and after comparison`}
      />
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = projects.filter((p) => matchesFilter(p.category, activeFilter));

  return (
    <>
      <SEO
        title="Our Work | Spotless Tinting — Hobart"
        description="Browse automotive, residential and commercial tinting, PPF and wrap projects from Spotless Tinting in Hobart."
        path="/gallery"
        image={images.heroCar}
      />

      {/* HERO — angled image panels */}
      <section className="relative min-h-[78vh] overflow-hidden bg-ink-950 lg:min-h-[92vh]">
        <div className="relative flex min-h-[78vh] flex-col lg:min-h-[92vh] lg:flex-row">
          {/* Text panel */}
          <div className="relative z-20 flex w-full flex-col justify-center px-6 py-16 sm:px-10 lg:w-[38%] lg:max-w-xl lg:px-12 lg:py-24 xl:px-16">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-500">
                  Our Work
                </span>
                <h1 className="mt-4 text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-[2.85rem] xl:text-[3.25rem]">
                  Quality You Can See.
                  <br />
                  Results That Last.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-300 sm:text-base">
                  Explore recent projects completed by Spotless Tinting in Hobart. From automotive
                  and residential tinting to PPF, vehicle wraps and Smart Tint, every detail matters.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#projects" className="btn-primary">
                    View Projects
                    <ArrowDown className="h-4 w-4" />
                  </a>
                  <Link
                    to="/quote"
                    className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
                  >
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image panels — first is a full diagonal parallelogram */}
          <div className="relative hidden min-h-[78vh] flex-1 overflow-hidden lg:flex lg:min-h-[85vh]">
            {heroPanels.map((panel, i) => (
              <div
                key={panel.alt}
                className="group relative h-full min-w-0 flex-1"
                style={{
                  clipPath: panelClipPaths[i],
                  marginLeft: i === 0 ? 0 : '-12%',
                  zIndex: i + 1,
                }}
              >
                <img
                  src={panel.src}
                  alt={panel.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-ink-950/10 transition-colors group-hover:bg-transparent" />
              </div>
            ))}
          </div>

          {/* Mobile / tablet */}
          <div className="relative flex h-72 overflow-hidden sm:h-96 lg:hidden">
            {heroPanels.map((panel, i) => (
              <div
                key={panel.alt}
                className="relative h-full min-w-0 flex-1"
                style={{
                  clipPath: panelClipPaths[i],
                  marginLeft: i === 0 ? 0 : '-10%',
                  zIndex: i + 1,
                }}
              >
                <img src={panel.src} alt={panel.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERABLE PROJECTS */}
      <section id="projects" className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Portfolio</span>
              <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Recent Projects
              </h2>
            </div>
          </Reveal>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                  activeFilter === filter
                    ? 'bg-accent-500 text-white'
                    : 'border border-ink-200 bg-white text-ink-600 hover:border-accent-400 hover:text-accent-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={i * 50}>
                <article className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-500">
                      {displayCategory(project.category)}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-ink-950">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{project.description}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
                      <MapPin className="h-3.5 w-3.5 text-accent-500" />
                      {project.location}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-ink-500">
              No projects in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* SEE THE DIFFERENCE */}
      <section className="section bg-ink-950">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                See the Difference
              </h2>
              <p className="mt-4 text-ink-300">
                Drag the slider to compare before and after results across vehicles, homes and workplaces.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal>
              <BeforeAfterCard
                beforeSrc={images.luxurySedan}
                afterSrc={images.blackCar}
                label="Automotive Tint"
              />
            </Reveal>
            <Reveal delay={60}>
              <BeforeAfterCard
                beforeSrc={images.residentialWindow}
                afterSrc={images.modernHome}
                label="Residential Film"
              />
            </Reveal>
            <Reveal delay={120}>
              <BeforeAfterCard
                beforeSrc={images.commercialBuilding}
                afterSrc={images.officeGlass}
                label="Commercial Film"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Featured</span>
              <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Featured Projects
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 space-y-5">
            {featuredProjects.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="grid overflow-hidden rounded-2xl border border-ink-100 bg-ink-50 md:grid-cols-[1.2fr_1fr]">
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px]">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent-600 shadow-md">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-ink-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    <a
                      href="#projects"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-600"
                    >
                      View Project
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY SERVICE */}
      <section className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Explore Our Work by Service
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 40}>
                <Link
                  to={cat.path}
                  className="group relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl text-center"
                >
                  <img
                    src={cat.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink-950/75 transition-colors group-hover:bg-ink-950/65" />
                  <div className="relative z-10 px-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent-500/40 bg-accent-500/15 text-accent-400">
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-white">
                      {cat.label}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-400">
                      View Projects
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Reviews</span>
              <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                What Customers Say
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 60}>
                <div className="h-full rounded-2xl border border-ink-100 bg-ink-50 p-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-700">&ldquo;{r.review}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white">
                      {r.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink-950">{r.customerName}</p>
                      <p className="text-xs text-ink-500">{r.service || 'Spotless Tinting'}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 opacity-30">
          <img src={images.heroCar} alt="" className="h-full w-full object-cover object-left" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/70" />
        </div>
        <div className="container relative z-10 grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 className="text-3xl font-bold uppercase leading-tight text-white md:text-4xl">
              Ready to Transform or Protect Your Vehicle?
              <span className="mt-2 block text-accent-400">Let&apos;s Create Something Extraordinary.</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 flex flex-col gap-3 text-sm text-ink-300 lg:items-end">
              <a href={business.phoneHref} className="inline-flex items-center gap-2 hover:text-accent-400">
                <Phone className="h-4 w-4 text-accent-500" />
                {business.phone}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-500" />
                {business.location}
              </span>
              <a href={business.emailHref} className="inline-flex items-center gap-2 hover:text-accent-400">
                <Mail className="h-4 w-4 text-accent-500" />
                {business.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
