import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Shield,
  Eye,
  Lock,
  Sofa,
  Blinds,
  Frame,
  Flower2,
  LayoutGrid,
  MessageSquare,
  Search,
  Layers,
  SprayCan,
  Paintbrush,
  CircleCheck,
  Plus,
  Phone,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { business } from '@/data/business';

const benefitBar: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Sun,
    title: 'Heat Reduction',
    desc: 'Helps reduce solar heat entering through your windows.',
  },
  {
    icon: Shield,
    title: 'UV Protection',
    desc: 'Quality films can provide high levels of UV rejection, depending on the film selected.',
  },
  {
    icon: Eye,
    title: 'Glare Control',
    desc: 'Helps reduce harsh sunlight and uncomfortable glare.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    desc: 'Choose from film options designed for different levels of privacy.',
  },
  {
    icon: Sofa,
    title: 'Interior Protection',
    desc: 'Helps reduce UV exposure to flooring, furniture and other interior surfaces.',
  },
];

const comfortBenefits = [
  {
    question: 'Too much heat?',
    answer:
      'Help reduce solar heat entering through your windows for a more comfortable indoor environment.',
  },
  {
    question: 'Uncomfortable glare?',
    answer:
      'Reduce harsh sunlight on televisions, screens and living areas while maintaining useful natural light.',
  },
  {
    question: 'UV exposure?',
    answer:
      'Help reduce UV exposure through glass and protect interior surfaces from premature fading.',
  },
  {
    question: 'Need more privacy?',
    answer:
      'Choose from residential privacy film options designed for different rooms and privacy requirements.',
  },
];

const comfortOverlayItems: { iconSrc: string; label: string }[] = [
  {
    iconSrc: images.residentialTinting.makeYourHomeComfortable.barIcons.heatReduction,
    label: 'Reduces Heat',
  },
  {
    iconSrc: images.residentialTinting.makeYourHomeComfortable.barIcons.glareControl,
    label: 'Reduces Glare',
  },
  {
    iconSrc: images.residentialTinting.makeYourHomeComfortable.barIcons.uvProtection,
    label: 'Blocks UV Rays',
  },
  {
    iconSrc: images.residentialTinting.makeYourHomeComfortable.barIcons.privacy,
    label: 'Enhances Privacy',
  },
];

const filmSolutions: {
  title: string;
  desc: string;
  image: string;
  iconSrc: string;
}[] = [
  {
    title: 'Solar Control Window Film',
    desc: 'Help manage solar heat and glare while maintaining natural light and views. A suitable solar-control film can make sun-exposed rooms more comfortable without replacing the existing glass.',
    image: images.residentialTinting.filmSolutions.solarControl.image,
    iconSrc: images.residentialTinting.filmSolutions.solarControl.icon,
  },
  {
    title: 'Privacy Window Film',
    desc: 'Improve privacy in suitable applications while retaining useful natural light. Privacy performance depends on the film selected and the lighting conditions inside and outside the home.',
    image: images.residentialTinting.filmSolutions.privacy.image,
    iconSrc: images.residentialTinting.filmSolutions.privacy.icon,
  },
  {
    title: 'Decorative & Frosted Window Film',
    desc: 'Add privacy and style to bathrooms, entryways, internal glass and feature windows with decorative or frosted film options.',
    image: images.residentialTinting.filmSolutions.decorativeFrosted.image,
    iconSrc: images.residentialTinting.filmSolutions.decorativeFrosted.icon,
  },
  {
    title: 'Safety & Security Window Film',
    desc: 'Specialist film options can help hold broken glass together following impact or breakage. The appropriate product depends on the glass and the level of protection required.',
    image: images.residentialTinting.filmSolutions.safetySecurity.image,
    iconSrc: images.residentialTinting.filmSolutions.safetySecurity.icon,
  },
];

const roomApplications = [
  {
    title: 'Bedrooms',
    desc: 'Privacy, glare control and improved comfort for bedrooms exposed to strong sunlight.',
  },
  {
    title: 'Bathrooms',
    desc: 'Frosted and privacy film options for suitable bathroom glass where visual privacy is a priority.',
  },
  {
    title: 'Living Areas',
    desc: 'Help manage heat and glare while preserving natural light and the openness of large windows.',
  },
  {
    title: 'Skylights',
    desc: 'Solar-control film solutions for suitable overhead glazing where heat and glare can be especially noticeable.',
  },
  {
    title: 'Entryways',
    desc: 'Decorative, frosted and privacy film solutions for entrance glass and sidelights.',
  },
  {
    title: 'Home Offices',
    desc: 'Reduce screen glare and create a more comfortable workspace without unnecessarily blocking daylight.',
  },
];

const protectItems: { icon: LucideIcon; label: string }[] = [
  { icon: LayoutGrid, label: 'Flooring' },
  { icon: Sofa, label: 'Furniture' },
  { icon: Blinds, label: 'Curtains' },
  { icon: Frame, label: 'Artwork' },
  { icon: Flower2, label: 'Interiors' },
];

const privacyOptions = [
  {
    title: 'Clear Glass',
    subtitle: 'Minimal additional privacy',
    image: images.residentialTinting.protectWhatsInside.clearGlass,
  },
  {
    title: 'Privacy Film',
    subtitle: 'Enhanced privacy in suitable lighting conditions and applications',
    image: images.residentialTinting.protectWhatsInside.privacyFilm,
  },
  {
    title: 'Frosted Film',
    subtitle: 'High visual privacy for spaces where obscuring the view through the glass is preferred',
    image: images.residentialTinting.protectWhatsInside.frostedFilm,
  },
];

const projectFilters = ['All', 'Solar Control', 'Privacy', 'Frosted', 'Smart Film'];

const recentResidentialProjects = [
  {
    id: '1',
    filter: 'Smart Film',
    alt: 'Modern home interior with residential window tinting at dusk',
    image: images.residentialTinting.smartTint.showcase,
  },
  {
    id: '2',
    filter: 'Privacy',
    alt: 'Clear glass dining area with window film installed',
    image: images.residentialTinting.smartTint.clear,
  },
  {
    id: '3',
    filter: 'Solar Control',
    alt: 'Modern residential home with window tinting',
    image: images.modernHome,
  },
  {
    id: '4',
    filter: 'Solar Control',
    alt: 'Living room with solar control window film',
    image: images.residentialTinting.makeYourHomeComfortable.before,
  },
  {
    id: '5',
    filter: 'Frosted',
    alt: 'Frosted smart tint privacy glass in a modern home',
    image: images.residentialTinting.smartTint.frosted,
  },
  {
    id: '6',
    filter: 'Privacy',
    alt: 'Residential privacy window film application',
    image: images.residentialTinting.makeYourHomeComfortable.after,
  },
];

const residentialFaqs = [
  {
    question: 'Does window film make my house dark?',
    answer:
      'Not necessarily. Residential window films are available in different shades and performance levels. Some are designed to provide solar control while retaining high levels of natural light. We\'ll help you compare options based on your windows and the result you want.',
  },
  {
    question: 'Can window film help reduce heat?',
    answer:
      'Yes. Solar-control window films are designed to reduce a portion of the solar energy passing through glass, which can help improve indoor comfort. The level of performance varies by film, glass type and conditions.',
  },
  {
    question: 'Does residential window film provide UV protection?',
    answer:
      'Many quality residential window films provide high levels of UV rejection. The exact performance depends on the product selected, so any specific percentage should be based on the manufacturer\'s specification.',
  },
  {
    question: 'Can window film reduce glare on TVs and screens?',
    answer:
      'Window film can help reduce harsh sunlight and glare, making living areas and home offices more comfortable. The appropriate film depends on the window orientation, glass and amount of glare.',
  },
  {
    question: 'Does privacy film work at night?',
    answer:
      'It depends on the film and lighting conditions. Reflective films that provide daytime privacy may offer less privacy at night when the inside of the home is brighter than outside. Frosted or other specialist privacy films may be more appropriate where consistent visual privacy is required.',
  },
  {
    question: 'Can window film be installed on double-glazed windows?',
    answer:
      'Some window films are suitable for certain types of double glazing, but compatibility depends on the glass construction and the film. The glazing should be assessed before an appropriate product is selected.',
  },
  {
    question: 'Can window film be installed on existing windows?',
    answer:
      'Yes, many architectural window films are designed to be applied to existing glass, subject to glass type, condition and compatibility.',
  },
  {
    question: 'How long does residential window film last?',
    answer:
      'Film lifespan depends on the product, glass, orientation, exposure, installation and environmental conditions. We can explain the expected performance and applicable warranty, where offered, for the film recommended for your project.',
  },
  {
    question: 'Can old residential window film be removed?',
    answer:
      'Existing window film can often be removed. The condition of the film, adhesive and glass should be assessed first so the removal and replacement work can be quoted appropriately.',
  },
  {
    question: 'Which residential window film is right for my home?',
    answer:
      'The right film depends on what you want to improve — such as heat, glare, privacy, UV protection or appearance — as well as the type of glass and room. We can assess the application and recommend suitable options.',
  },
];

const advancedFilmFeatures: { title: string; desc: string; iconSrc: string }[] = [
  {
    title: 'Solar Energy Reduced',
    desc: 'Selected solar-control films help reduce solar heat entering through the glass.',
    iconSrc: images.residentialTinting.designedAroundYourHome.technologyIcons.solarEnergy,
  },
  {
    title: 'UV Radiation Reduced',
    desc: 'Quality films can provide high levels of UV rejection, depending on the specific product selected.',
    iconSrc: images.residentialTinting.designedAroundYourHome.technologyIcons.uvRadiation,
  },
  {
    title: 'Glare Reduced',
    desc: 'Helps control harsh sunlight and reflections for improved visual comfort.',
    iconSrc: images.residentialTinting.designedAroundYourHome.technologyIcons.glare,
  },
  {
    title: 'Visible Light Managed',
    desc: 'Choose films designed to balance performance with the amount of natural light you want to retain.',
    iconSrc: images.residentialTinting.designedAroundYourHome.technologyIcons.visibleLight,
  },
  {
    title: 'Privacy Options',
    desc: 'Different film technologies provide different levels and types of privacy.',
    iconSrc: images.residentialTinting.designedAroundYourHome.technologyIcons.privacy,
  },
];

const processSteps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: 'Consult',
    desc: 'We discuss your needs, the rooms involved and the result you want to achieve.',
    icon: MessageSquare,
  },
  {
    num: '02',
    title: 'Assess',
    desc: 'We assess the glass and application requirements before recommending suitable film options.',
    icon: Search,
  },
  {
    num: '03',
    title: 'Select',
    desc: 'Choose a residential window film based on performance, privacy, compatibility and appearance.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Prepare',
    desc: 'The glass is thoroughly cleaned and prepared to create the best possible installation surface.',
    icon: SprayCan,
  },
  {
    num: '05',
    title: 'Install',
    desc: 'Your selected film is professionally installed with care, precision and attention to detail.',
    icon: Paintbrush,
  },
  {
    num: '06',
    title: 'Inspect',
    desc: 'The completed installation is checked to ensure a clean, professional finish, and relevant aftercare guidance is provided.',
    icon: CircleCheck,
  },
];

function ResidentialFAQGrid({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  const renderColumn = (columnItems: { question: string; answer: string }[], offset: number) => (
    <div className="divide-y divide-ink-200">
      {columnItems.map((item, i) => {
        const index = offset + i;
        const isOpen = open === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-sm text-ink-800 sm:text-base">{item.question}</span>
              <Plus
                className={`h-4 w-4 shrink-0 text-ink-950 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                strokeWidth={2}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm leading-relaxed text-ink-600">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-ink-200">
      <div className="md:pr-8">{renderColumn(columns[0], 0)}</div>
      <div className="md:pl-8">{renderColumn(columns[1], midpoint)}</div>
    </div>
  );
}

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before Window Film',
  afterLabel = 'After Window Film',
  overlayItems,
  variant = 'default',
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  overlayItems?: { iconSrc: string; label: string }[];
  variant?: 'default' | 'comfort' | 'smart-tint';
}) {
  const [pos, setPos] = useState(50);
  const isComfort = variant === 'comfort';
  const isSmartTint = variant === 'smart-tint';

  return (
    <div
      className={`relative overflow-hidden bg-ink-900 select-none ${
        isSmartTint || isComfort ? 'aspect-[16/10]' : 'aspect-[4/3]'
      } ${isSmartTint ? 'rounded-md' : isComfort ? 'rounded-md' : 'rounded-2xl'}`}
    >
      <img
        src={afterSrc}
        alt={afterLabel}
        className={`absolute inset-0 h-full w-full object-cover ${
          isComfort || isSmartTint ? '' : 'brightness-90 contrast-110'
        }`}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className={`absolute inset-0 h-full w-full object-cover ${
            isComfort || isSmartTint ? '' : 'brightness-125'
          }`}
        />
        {!isComfort && !isSmartTint && <div className="absolute inset-0 bg-white/20" />}
      </div>

      <div className="absolute inset-y-0 z-20 w-px bg-white/90" style={{ left: `${pos}%` }}>
        <div
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg ${
            isComfort
              ? 'h-9 w-9 bg-white text-[10px] font-bold text-ink-950'
              : 'h-10 w-10 bg-accent-500 text-white'
          }`}
        >
          {isComfort || isSmartTint ? (
            <span aria-hidden className="text-[10px] font-bold tracking-tight">
              &lt;&gt;
            </span>
          ) : (
            <span className="text-xs font-bold">⇄</span>
          )}
        </div>
      </div>

      {isSmartTint ? (
        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2">
          <div className="flex items-center justify-center bg-black/70 py-2 sm:py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
              {beforeLabel}
            </span>
          </div>
          <div className="flex items-center justify-center bg-black/70 py-2 sm:py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
              {afterLabel}
            </span>
          </div>
        </div>
      ) : (
        <>
          <span
            className={`absolute top-4 z-20 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
              isComfort ? 'left-4 bg-ink-950/90' : 'left-4 bg-ink-950/70'
            }`}
          >
            {beforeLabel}
          </span>
          <span
            className={`absolute top-4 z-20 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
              isComfort ? 'right-4 bg-ink-950/90' : 'right-4 bg-accent-500/90'
            }`}
          >
            {afterLabel}
          </span>
        </>
      )}

      {overlayItems && overlayItems.length > 0 && (
        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 divide-x divide-white/15 bg-ink-950/80 backdrop-blur-sm sm:grid-cols-4">
          {overlayItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 px-2 py-3 text-center sm:gap-2.5 sm:px-3 sm:py-3.5"
            >
              <img src={item.iconSrc} alt="" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden loading="lazy" />
              <span className="text-[9px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[10px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

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

const residentialPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Residential Window Tinting',
  provider: {
    '@type': 'LocalBusiness',
    name: business.name,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Moonah',
      addressRegion: 'TAS',
      addressCountry: 'AU',
    },
  },
  areaServed: {
    '@type': 'City',
    name: 'Hobart',
  },
  description:
    'Professional residential window tinting in Hobart and Moonah. Solar control, privacy, frosted, safety and smart tint films for heat reduction, glare control and UV protection.',
};

export default function ResidentialTintingPage() {
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const filteredProjects =
    activeProjectFilter === 'All'
      ? recentResidentialProjects.slice(0, 5)
      : recentResidentialProjects.filter((p) => p.filter === activeProjectFilter).slice(0, 5);

  return (
    <>
      <SEO
        title="Residential Window Tinting Hobart | Home Window Film | Spotless Tinting"
        description="Professional residential window tinting in Hobart and Moonah. Reduce heat, glare and UV, improve privacy and protect interiors with solar control, privacy, frosted, safety and smart tint films. Free quotes from Spotless Tinting."
        path="/services/residential-window-tinting"
        image={images.modernHome}
        schema={residentialPageSchema}
      />

      {/* HERO */}
      <section className="overflow-hidden bg-white">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 lg:py-16 xl:px-16">
            <h1 className="text-3xl font-bold uppercase leading-[1.05] text-ink-950 sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
              Residential Window Tinting in Hobart
            </h1>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-500 sm:text-sm">
              <span className="relative inline-block pb-2">
                Comfort
                <span className="absolute bottom-0 left-0 h-1 w-8 bg-accent-500" aria-hidden />
              </span>
              <span className="text-accent-500/90"> · Privacy · Protection</span>
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-600 sm:text-base">
              Professional residential window film designed to help reduce heat and glare, improve
              privacy and provide UV protection for homes across Hobart. From living areas and bedrooms
              to bathrooms, home offices and skylights, we&apos;ll help you choose a film suited to your
              glass, your space and the result you want — without unnecessarily compromising natural
              light or appearance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/quote" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#solutions" className="btn-outline">
                Explore Film Options
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[5/3]">
            <img
              src={images.modernHome}
              alt="Modern home with residential window tinting"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-white via-white/80 to-transparent lg:block lg:w-28 xl:w-32"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <div className="relative z-10">
        {/* BENEFITS BAR */}
        <section className="border-b border-ink-100 bg-ink-50 py-8 md:py-10">
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
        <section className="bg-white py-12 md:py-16">
          <div className="container">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-10 xl:gap-12">
              <Reveal>
                <div className="lg:pr-2 xl:pr-4">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl lg:text-[2rem]">
                    Make Your Home More Comfortable
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Large windows bring beautiful natural light into a home, but they can also bring
                    unwanted heat, glare, UV exposure and privacy concerns. Residential window tinting
                    provides a practical way to improve comfort while retaining the glass and views you
                    already enjoy.
                  </p>
                  <ul className="mt-6 space-y-5">
                    {comfortBenefits.map((item) => (
                      <li key={item.question} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                          <CircleCheck className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-ink-950 sm:text-base">{item.question}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-600 sm:text-base">{item.answer}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <BeforeAfterSlider
                  variant="comfort"
                  beforeSrc={images.residentialTinting.makeYourHomeComfortable.before}
                  afterSrc={images.residentialTinting.makeYourHomeComfortable.after}
                  beforeLabel="Before Window Film"
                  afterLabel="After Window Film"
                  overlayItems={comfortOverlayItems}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* FILM SOLUTIONS */}
        <section id="solutions" className="bg-white py-6 md:py-8">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Window Film Solutions for Every Home
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                  Different rooms and windows have different requirements. We offer residential window
                  film solutions for solar control, privacy, decorative applications and additional glass
                  protection, with recommendations based on the glass, room and outcome you want.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filmSolutions.map((sol, i) => (
                <Reveal key={sol.title} delay={i * 50}>
                  <article className="flex h-full flex-col rounded-lg border border-ink-100 bg-white">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative px-5 pb-5 pt-7">
                      <div className="absolute left-5 top-0 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-500 bg-white shadow-sm">
                        <img
                          src={sol.iconSrc}
                          alt=""
                          className="h-[22px] w-[22px] object-contain object-center"
                          aria-hidden
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950 sm:text-base">
                        {sol.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{sol.desc}</p>
                      <Link
                        to="/quote"
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent-500 transition-colors hover:text-accent-600"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGNED AROUND HOME + TECH */}
        <section className="bg-white py-6 md:py-8">
          <div className="container">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-8">
              <Reveal>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Residential Window Film for Every Space
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">
                    Residential window film can be tailored to the way each room is used. We assess the
                    glass, sunlight, privacy needs and desired appearance before recommending a suitable
                    film solution.
                  </p>
                  <img
                    src={images.residentialTinting.designedAroundYourHome.houseDiagram}
                    alt="House diagram showing window film applications for bedrooms, bathrooms, entryways, living areas, skylights and home offices"
                    loading="lazy"
                    className="mx-auto mt-5 w-[90%] object-contain"
                  />
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    How Residential Window Film Works
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Modern residential window film is designed to manage solar energy, UV exposure,
                    glare, visible light and privacy through existing glass. Different films provide
                    different levels of performance, allowing us to recommend an option based on your
                    windows, room and desired result.
                  </p>
                  <div className="mt-5 grid items-start gap-6 sm:gap-4">
                    <img
                      src={images.residentialTinting.designedAroundYourHome.glassDiagram}
                      alt="Window film layer diagram showing glass panes and tint film"
                      loading="lazy"
                      className="w-full object-contain"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROTECT + PRIVACY */}
        <section className="bg-white py-6 md:py-8">
          <div className="container">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8">
              <Reveal>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Protect Your Home&apos;s Interiors
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600 sm:text-base">
                    Sunlight and UV exposure can contribute to fading and deterioration of interior
                    materials over time. Quality residential window film can help reduce UV exposure
                    through glass, providing another layer of protection for the things inside your home.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-start gap-x-5 gap-y-6 sm:gap-x-6 md:gap-x-8">
                    {protectItems.map((item) => (
                      <div key={item.label} className="flex flex-col items-center">
                        <item.icon className="h-7 w-7 text-accent-500" strokeWidth={1.5} />
                        <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wide text-ink-950 sm:text-[11px]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Privacy Window Film for Your Home
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Privacy needs vary from room to room. We can help you compare residential window
                    film options based on how much privacy, natural light and visibility you want, as
                    well as the lighting conditions around the glass.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-2.5">
                    {privacyOptions.map((opt) => (
                      <div
                        key={opt.title}
                        className="relative aspect-[4/3] overflow-hidden rounded-md"
                      >
                        <img
                          src={opt.image}
                          alt={opt.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center bg-black/75 px-2 py-2.5 text-center sm:px-3 sm:py-3">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
                            {opt.title}
                          </p>
                          <p className="mt-0.5 text-[9px] leading-snug text-white/90 sm:text-[10px]">
                            {opt.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-right text-[10px] leading-relaxed text-ink-400 sm:text-xs">
                    Privacy performance depends on film type and lighting conditions. Reflective films
                    that provide daytime privacy may provide less privacy at night when the interior is
                    brighter than outside.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SMART TINT */}
        <section id="smart-tint" className="bg-black py-4 md:py-6">
          <div className="container">
            <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)_minmax(0,1fr)] xl:gap-9">
              <Reveal>
                <img
                  src={images.residentialTinting.smartTint.showcase}
                  alt="Modern dining room with floor-to-ceiling glass windows"
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-md object-cover"
                />
              </Reveal>

              <Reveal delay={60}>
                <div className="max-w-sm text-left lg:max-w-none lg:px-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white sm:text-sm">
                    Looking for Privacy on Demand?
                  </p>
                  <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-accent-500 md:text-4xl">
                    Smart Tint for On-Demand Privacy
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                    For selected residential spaces, Smart Tint can provide flexible privacy by switching
                    suitable glass between clear and frosted states. It can be a useful option where
                    privacy is needed on demand rather than permanently.
                  </p>
                  <Link
                    to="/services/residential-window-tinting#smart-tint"
                    className="btn mt-6 border border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10"
                  >
                    Discover Smart Tint
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <BeforeAfterSlider
                  variant="smart-tint"
                  beforeSrc={images.residentialTinting.smartTint.clear}
                  afterSrc={images.residentialTinting.smartTint.frosted}
                  beforeLabel="Clear"
                  afterLabel="Frosted"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-white py-12 md:py-16">
          <div className="container">
            <Reveal>
              <div className="text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Our Residential Window Tinting Process
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
                  A quality residential window film installation starts with the right assessment and
                  careful preparation. Our process is designed to make the experience straightforward
                  from the first conversation through to final inspection.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 hidden lg:block">
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

        {/* RECENT PROJECTS + FAQ */}
        <section className="bg-white py-12 md:py-16">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Recent Residential Window Tinting Projects
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                  Explore recent residential window film installations completed by Spotless Tinting
                  across Hobart and surrounding areas, including solar-control, privacy and frosted
                  film applications.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveProjectFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:text-xs ${
                    activeProjectFilter === filter
                      ? 'border-accent-500 bg-accent-500 text-white'
                      : 'border-ink-200 bg-white text-ink-950 hover:border-accent-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
              {filteredProjects.map((project, i) => (
                <Reveal key={project.id} delay={i * 50} className="min-w-0">
                  <div className="aspect-[16/10] overflow-hidden rounded-md">
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <div className="mt-8 text-center">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 border border-accent-500 px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-500 transition-colors hover:bg-accent-500 hover:text-white sm:text-sm"
                >
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 text-center md:mt-14">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Residential Window Tinting FAQs
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8">
                <ResidentialFAQGrid items={residentialFaqs} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* LOCAL SEO */}
        {/* <section className="bg-ink-50 py-12 md:py-16">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Residential Window Tinting in Moonah, Hobart
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                  Spotless Tinting provides professional residential window tinting in Hobart, with
                  window film solutions for homes throughout Moonah and surrounding areas. Whether
                  you&apos;re dealing with excessive afternoon heat, glare through large windows, fading
                  interiors or a lack of privacy, we&apos;ll help you find a film suited to your glass and
                  the way you use your home.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-ink-700 sm:flex-row sm:gap-6">
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center gap-2 font-semibold hover:text-accent-600"
                  >
                    <Phone className="h-4 w-4" />
                    {business.phone}
                  </a>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent-500" />
                    {business.location}
                  </span>
                </div>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-accent-500 px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-500 transition-colors hover:bg-accent-500 hover:text-white sm:text-sm"
                  >
                    Get Directions
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to="/quote" className="btn-primary">
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section> */}

        {/* FINAL CTA */}
        <section className="bg-ink-950 py-12 md:py-16">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  Make Your Home More Comfortable
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mt-5 text-sm leading-relaxed text-ink-300 sm:text-base">
                  Talk to Spotless Tinting about residential window film for heat reduction, glare
                  control, UV protection and privacy. Tell us what you&apos;d like to improve and we&apos;ll
                  help you compare suitable options for your home.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link to="/quote" className="btn bg-white text-accent-600 hover:bg-ink-50">
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="btn border border-white/40 bg-transparent text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {business.phone}
                  </a>
                </div>
                <p className="mt-6 text-sm text-white/80">{business.location}</p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
