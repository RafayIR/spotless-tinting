import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Car,
  ChevronLeft,
  ChevronRight,
  Home,
  Layers,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  SquareStack,
  Star,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import GalleryLightbox from '@/components/GalleryLightbox';
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
  'Smart Tint',
  'Ceramic Coating',
] as const;

type Filter = (typeof filters)[number];

/** Gallery filter labels map onto the project categories used across the site. */
const filterCategory: Record<Exclude<Filter, 'All'>, string> = {
  'Automotive Tint': 'Window Tinting',
  Residential: 'Residential',
  Commercial: 'Commercial',
  PPF: 'PPF',
  'Vehicle Wraps': 'Vehicle Wraps',
  'Smart Tint': 'Smart Tint',
  'Ceramic Coating': 'Other',
};

function displayCategory(category: string) {
  if (category === 'Window Tinting') return 'Automotive Tint';
  if (category === 'Other') return 'Ceramic Coating';
  return category;
}

const PROJECTS_PER_PAGE = 6;

const heroPanels = [
  {
    src: images.gallery.heroCarDark,
    alt: 'Black Toyota Camry Hybrid with ceramic coating and window tint',
    // Panels are tall and narrow, so each image is framed on the car body.
    position: 'object-[58%_center]',
  },
  {
    src: images.gallery.heroCarSilver,
    alt: 'Silver Lexus ES 300h after a full window tint',
    position: 'object-[52%_center]',
  },
  {
    src: images.gallery.heroCarWhite,
    alt: 'White BMW X5 M Sport with tinted windows',
    position: 'object-[62%_center]',
  },
];

/** First two panels are parallelograms; the last one squares off against the page edge. */
const panelClipPaths = [
  'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
  'polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)',
  'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
];

const comparisons: {
  label: string;
  beforeSrc: string;
  afterSrc: string;
  caption: string;
}[] = [
  {
    label: 'Vehicle Wrap',
    beforeSrc: images.vehicleWraps.transformationBefore,
    afterSrc: images.vehicleWraps.transformationAfter,
    caption: 'Full colour change for a bold new look.',
  },
  {
    label: 'Residential Tint',
    beforeSrc: images.residentialTinting.makeYourHomeComfortable.before,
    afterSrc: images.residentialTinting.makeYourHomeComfortable.after,
    caption: 'Reduced heat & glare with solar control film.',
  },
  {
    label: 'Commercial Tint',
    beforeSrc: images.commercialTinting.betterGlass.before,
    afterSrc: images.commercialTinting.betterGlass.after,
    caption: 'Privacy film for a comfortable workspace.',
  },
];

const featuredProjects: { title: string; desc: string; image: string; icon: LucideIcon; path: string }[] = [
  {
    title: 'Showroom Gloss, Protected',
    desc: 'Ceramic coating on a Camry Hybrid for a deep gloss finish that stays easy to clean.',
    image: images.gallery.featuredCeramic,
    icon: Sparkles,
    path: '/services/ceramic-coating',
  },
  {
    title: 'Precision Automotive Tint',
    desc: 'Premium film cut and fitted edge to edge, with no bubbles, gaps or lifted corners.',
    image: images.gallery.featuredTintDetail,
    icon: Car,
    path: '/services/automotive-window-tinting',
  },
  {
    title: 'Residential Comfort & Privacy',
    desc: 'Solar control film to reduce heat and glare while keeping the view from this home.',
    image: images.gallery.featuredResidential,
    icon: Home,
    path: '/services/residential-window-tinting',
  },
];

const serviceCategories: { label: string; path: string; icon: LucideIcon; image: string }[] = [
  {
    label: 'Automotive Tinting',
    path: '/services/automotive-window-tinting',
    icon: Car,
    image: images.gallery.serviceAutomotive,
  },
  {
    label: 'Residential Tinting',
    path: '/services/residential-window-tinting',
    icon: Home,
    image: images.gallery.serviceResidential,
  },
  {
    label: 'Commercial Tinting',
    path: '/services/commercial-window-tinting',
    icon: Building2,
    image: images.gallery.serviceCommercial,
  },
  {
    label: 'Paint Protection Film (PPF)',
    path: '/services/paint-protection-film',
    icon: Shield,
    image: images.gallery.servicePpf,
  },
  {
    label: 'Vehicle Wraps',
    path: '/services/vehicle-wrapping',
    icon: Layers,
    image: images.gallery.serviceWraps,
  },
  {
    label: 'Smart Tint',
    path: '/services/residential-window-tinting#smart-tint',
    icon: SquareStack,
    image: images.gallery.serviceSmartTint,
  },
];

function SectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`text-center text-2xl font-bold uppercase tracking-tight sm:text-3xl ${
        light ? 'text-white' : ''
      }`}
    >
      <span className="relative inline-block pb-3 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:bg-accent-500">
        {children}
      </span>
    </h2>
  );
}

function BeforeAfterCard({
  label,
  beforeSrc,
  afterSrc,
}: {
  label: string;
  beforeSrc: string;
  afterSrc: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] select-none overflow-hidden rounded-sm bg-ink-900">
      <img
        src={afterSrc}
        alt={`${label} after`}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={`${label} before`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-y-0 z-20 w-px bg-white/90" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black shadow-lg">
          &lt;&gt;
        </div>
      </div>

      <span className="absolute left-3 top-3 z-20 rounded-sm bg-accent-500 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
        {label}
      </span>
      <span className="absolute left-1/2 top-3 z-20 -translate-x-[130%] text-[9px] font-bold uppercase tracking-wide text-white drop-shadow">
        Before
      </span>
      <span className="absolute right-3 top-3 z-20 text-[9px] font-bold uppercase tracking-wide text-white drop-shadow">
        After
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

function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  const arrowClass =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-accent-500 hover:text-accent-500';

  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <button type="button" onClick={() => scrollByCard(-1)} className={arrowClass} aria-label="Previous reviews">
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={trackRef}
        className="flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <article
            key={review.id}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-lg border border-ink-100 bg-white p-5 shadow-sm sm:w-[48%] lg:w-[calc(33.333%-0.834rem)]"
          >
            <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-accent-500 text-accent-500' : 'text-ink-200'}`}
                />
              ))}
            </div>
            <p className="mt-3 flex-1 text-[11px] leading-relaxed text-ink-600 sm:text-xs">
              &ldquo;{review.review}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500 text-[11px] font-bold text-white">
                {review.customerName.charAt(0)}
              </span>
              <span>
                <span className="block text-[11px] font-bold text-ink-950">{review.customerName}</span>
                <span className="block text-[10px] text-ink-500">{review.location ?? 'Hobart'}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <button type="button" onClick={() => scrollByCard(1)} className={arrowClass} aria-label="Next reviews">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = projects.filter((p) =>
    activeFilter === 'All' ? true : p.category === filterCategory[activeFilter],
  );
  const visible = showAll ? filtered : filtered.slice(0, PROJECTS_PER_PAGE);

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  return (
    <>
      <SEO
        title="Our Work | Spotless Tinting — Hobart"
        description="Browse recent automotive, residential and commercial tinting, PPF, vehicle wrap and Smart Tint projects completed by Spotless Tinting in Hobart."
        path="/gallery"
        image={images.gallery.heroCarDark}
      />

      {/* HERO — angled image panels */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-ink-950 lg:min-h-[calc(100vh-3.5rem)]">
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col lg:min-h-[calc(100vh-3.5rem)] lg:flex-row">
          <div className="relative z-20 flex w-full flex-1 flex-col justify-center px-6 py-14 sm:px-10 lg:w-[46%] lg:max-w-3xl lg:flex-none lg:py-20 lg:pl-12 lg:pr-10 xl:pl-16">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-500">
                  Our Work
                </span>
                <h1 className="mt-4 text-3xl font-bold uppercase leading-relaxed text-white sm:text-4xl lg:text-[2.3rem] xl:text-[2.7rem] 2xl:text-[3.15rem]">
                  Quality You Can See.
                  <br />
                  Results That Last.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-300">
                  Explore recent projects completed by Spotless Tinting in Hobart. From automotive and
                  residential tinting to PPF, vehicle wraps and Smart Tint, every detail matters.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#projects" className="btn-primary rounded-sm px-6 py-3 text-xs uppercase tracking-wide">
                    View Projects
                    <ArrowDown className="h-4 w-4" />
                  </a>
                  <Link
                    to="/quote"
                    className="btn rounded-sm border border-white/40 bg-transparent px-6 py-3 text-xs uppercase tracking-wide text-white hover:bg-white/10"
                  >
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Desktop angled panels */}
          <div className="relative hidden flex-1 overflow-hidden lg:flex">
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
                  className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${panel.position}`}
                  fetchPriority={i === 0 ? 'high' : undefined}
                />
                <div className="pointer-events-none absolute inset-0 bg-ink-950/10 transition-colors group-hover:bg-transparent" />
              </div>
            ))}
          </div>

          {/* Mobile / tablet panels */}
          <div className="relative flex h-[38vh] min-h-[220px] overflow-hidden lg:hidden">
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
                <img
                  src={panel.src}
                  alt={panel.alt}
                  className={`h-full w-full object-cover ${panel.position}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section id="projects" className="section scroll-mt-20 bg-white py-12 md:py-14">
        <div className="container">
          <Reveal>
            <SectionHeading>Recent Spotless Projects</SectionHeading>
          </Reveal>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => selectFilter(filter)}
                className={`rounded-md border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:text-[11px] ${
                  activeFilter === filter
                    ? 'border-accent-500 bg-accent-500 text-white'
                    : 'border-ink-200 bg-white text-ink-700 hover:border-accent-500 hover:text-accent-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {visible.map((project, i) => (
              <Reveal key={project.id} delay={i * 40}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(filtered.indexOf(project))}
                    className="relative aspect-[4/3] overflow-hidden bg-ink-100 text-left"
                    aria-label={`Open ${project.title} in gallery viewer`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.service}${project.location ? ` in ${project.location}` : ''}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-sm bg-accent-500 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white">
                      {displayCategory(project.category)}
                    </span>
                    {project.badge && (
                      <span className="absolute right-2 top-2 rounded-sm bg-ink-950/70 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white">
                        {project.badge}
                      </span>
                    )}
                  </button>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="text-[11px] font-bold leading-snug text-ink-950 sm:text-xs">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-ink-600 sm:text-[11px]">
                      {project.description}
                    </p>
                    <p className="mt-auto inline-flex items-center gap-1 pt-3 text-[9px] font-medium uppercase tracking-wide text-ink-500">
                      {project.location ? (
                        <>
                          <MapPin className="h-3 w-3 shrink-0 text-accent-500" />
                          {project.location}
                        </>
                      ) : (
                        project.service
                      )}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-ink-500">
              New {activeFilter.toLowerCase()} projects are on the way —{' '}
              <Link to="/quote" className="font-semibold text-accent-600 hover:text-accent-700">
                talk to us about yours
              </Link>
              .
            </p>
          )}

          {!showAll && filtered.length > PROJECTS_PER_PAGE && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="btn-outline inline-flex rounded-sm px-6 py-3 text-[11px] font-bold uppercase tracking-wide text-accent-600"
              >
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SEE THE DIFFERENCE */}
      <section className="bg-ink-950 py-12 md:py-14">
        <div className="container">
          <Reveal>
            <SectionHeading light>See the Difference</SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {comparisons.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <div>
                  <BeforeAfterCard
                    label={item.label}
                    beforeSrc={item.beforeSrc}
                    afterSrc={item.afterSrc}
                  />
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-300 sm:text-xs">
                    {item.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section bg-white py-12 md:py-14">
        <div className="container">
          <Reveal>
            <SectionHeading>Featured Projects</SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProjects.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-sm">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent-500 bg-white text-accent-500">
                      <item.icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-8">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-ink-950 sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink-600 sm:text-xs">{item.desc}</p>
                    <Link
                      to={item.path}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[10px] font-bold uppercase tracking-wide text-accent-500 hover:text-accent-600 sm:text-[11px]"
                    >
                      View Project
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY SERVICE */}
      <section className="section bg-white py-12 md:py-14">
        <div className="container">
          <Reveal>
            <SectionHeading>Explore Our Work by Service</SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
            {serviceCategories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 40}>
                <Link
                  to={cat.path}
                  className="group relative flex h-full min-h-[150px] flex-col items-center justify-center overflow-hidden rounded-lg text-center"
                >
                  <img
                    src={cat.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-ink-950/80 transition-colors group-hover:bg-ink-950/70" />
                  <div className="relative z-10 px-3">
                    <cat.icon className="mx-auto h-9 w-9 text-accent-500" strokeWidth={1.5} />
                    <h3 className="mt-3 text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[11px]">
                      {cat.label}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-accent-400">
                      View Projects
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white py-12 md:py-14">
        <div className="container">
          <Reveal>
            <SectionHeading>What Our Clients Say</SectionHeading>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-10">
              <TestimonialCarousel />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-black">
        <div className="grid items-center lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.4fr)_minmax(0,0.85fr)]">
          <div className="relative h-40 w-full sm:h-56 lg:h-full lg:min-h-[220px]">
            <img
              src={images.gallery.ctaCar}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black lg:to-black"
              aria-hidden
            />
          </div>

          <Reveal>
            <div className="px-6 py-10 sm:px-10 lg:py-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-500 sm:text-xs">
                Ready to Transform or Protect Your Vehicle?
              </p>
              <h2 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
                Let&apos;s Create Something Extraordinary.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">
                From tinting and PPF to wraps and Smart Tint, our expert team is ready to bring your
                vision to life.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="px-6 pb-10 sm:px-10 lg:py-12 lg:pl-0">
              <Link to="/quote" className="btn-primary w-full rounded-sm px-6 py-3 text-xs uppercase tracking-wide sm:w-auto">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-6 flex flex-col gap-3 text-sm text-white/85">
                <a href={business.phoneHref} className="inline-flex items-center gap-2 hover:text-accent-400">
                  <Phone className="h-4 w-4 shrink-0 text-accent-500" />
                  {business.phone}
                </a>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-accent-500" />
                  {business.location}
                </span>
                <a href={business.emailHref} className="inline-flex items-center gap-2 break-all hover:text-accent-400">
                  <Mail className="h-4 w-4 shrink-0 text-accent-500" />
                  {business.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {lightboxIndex !== null && filtered[lightboxIndex] ? (
        <GalleryLightbox
          projects={filtered}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </>
  );
}
