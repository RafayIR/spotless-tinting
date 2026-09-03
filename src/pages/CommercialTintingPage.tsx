import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sun,
  Shield,
  Eye,
  Lock,
  ShieldCheck,
  Store,
  Briefcase,
  Hotel,
  HeartPulse,
  GraduationCap,
  Factory,
  ClipboardList,
  Search,
  Layers,
  FileText,
  Wrench,
  CircleCheck,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import FAQAccordion from '@/components/FAQAccordion';
import { images } from '@/data/images';
import { business } from '@/data/business';

function FeatureIcon({
  iconSrc,
  icon: Icon,
  className = 'h-8 w-8',
}: {
  iconSrc: string;
  icon: LucideIcon;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Icon className={className} strokeWidth={1.75} aria-hidden />;
  }

  return (
    <img
      src={iconSrc}
      alt=""
      className={`object-contain ${className}`}
      aria-hidden
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const benefitBar: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Sun,
    title: 'Solar Control',
    desc: 'Reduce heat and create a more comfortable indoor environment.',
  },
  {
    icon: Shield,
    title: 'UV Protection',
    desc: 'Help protect people, flooring, furnishings and displayed products from UV exposure.',
  },
  {
    icon: Eye,
    title: 'Glare Reduction',
    desc: 'Improve screen visibility and visual comfort throughout the workplace.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    desc: 'Create practical privacy for offices, meeting rooms and customer-facing spaces.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Security',
    desc: 'Help hold damaged glass together and improve protection across vulnerable glazing.',
  },
];

const workEnvironmentBenefits = [
  {
    question: 'Excessive Heat',
    answer:
      'Solar heat entering through large windows can make offices uncomfortable and increase pressure on cooling systems. Solar control film helps reduce heat gain and maintain a more balanced indoor temperature.',
    iconSrc: images.commercialTinting.betterGlass.workplaceIcons.excessiveHeat,
  },
  {
    question: 'Screen Glare',
    answer:
      'Bright sunlight can create distracting glare across computers, displays and work surfaces. Glare-reduction window film improves visual comfort and helps staff work more comfortably.',
    iconSrc: images.commercialTinting.betterGlass.workplaceIcons.screenGlare,
  },
  {
    question: 'Lack of Privacy',
    answer:
      'Clear glass can leave meeting rooms, offices and consultation spaces unnecessarily exposed. Privacy and frosted window film provide an effective solution while allowing light to move through the space.',
    iconSrc: images.commercialTinting.betterGlass.workplaceIcons.lackOfPrivacy,
  },
  {
    question: 'UV Exposure',
    answer:
      'UV rays can contribute to fading and deterioration of flooring, furnishings, merchandise and interior finishes. Commercial window film adds an important layer of protection.',
    iconSrc: images.commercialTinting.betterGlass.workplaceIcons.uvExposure,
  },
  {
    question: 'Glass Safety',
    answer:
      'Safety film is designed to help retain broken glass following accidental impact, severe weather or attempted entry, reducing the risk of loose fragments.',
    iconSrc: images.commercialTinting.betterGlass.workplaceIcons.glassSafety,
  },
];

const comfortOverlayItems: { iconSrc: string; label: string }[] = [
  {
    iconSrc: images.commercialTinting.betterGlass.comparisonBarIcons.heatReduction,
    label: 'Reduces Heat',
  },
  {
    iconSrc: images.commercialTinting.betterGlass.comparisonBarIcons.glareControl,
    label: 'Reduces Glare',
  },
  {
    iconSrc: images.commercialTinting.betterGlass.comparisonBarIcons.uvProtection,
    label: 'Filters UV Rays',
  },
  {
    iconSrc: images.commercialTinting.betterGlass.comparisonBarIcons.privacy,
    label: 'Enhances Privacy',
  },
];

const filmSolutions: {
  title: string;
  desc: string;
  features: string[];
  linkText: string;
  image: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Solar Control Film',
    desc: 'Reduce heat, glare and UV exposure across offices, shopfronts and commercial buildings. Solar control window film improves indoor comfort while maintaining useful natural light and outward visibility.',
    features: ['Heat Reduction', 'Glare Control', 'UV Protection', 'Improved Energy Efficiency'],
    linkText: 'Learn More About Solar Control Film',
    image: images.commercialTinting.windowFilmSolutions.solarControl,
    icon: Sun,
  },
  {
    title: 'Privacy Film',
    desc: 'Create discreet, professional spaces with commercial privacy window film. Choose from translucent, reflective and tinted options for meeting rooms, offices, reception areas and street-facing windows.',
    features: ['Daytime Privacy', 'Multiple Opacity Options', 'Natural Light', 'Modern Appearance'],
    linkText: 'Learn More About Privacy Film',
    image: images.commercialTinting.windowFilmSolutions.privacy,
    icon: Lock,
  },
  {
    title: 'Decorative & Frosted Film',
    desc: 'Add privacy, style and visual identity to clear glass with custom decorative and frosted window film. Ideal for internal partitions, meeting rooms, reception areas and branded commercial environments.',
    features: ['Frosted Finishes', 'Custom Designs & Logos', 'Partial or Full Coverage', 'Internal Glass Solutions'],
    linkText: 'Learn More About Decorative Film',
    image: images.commercialTinting.privacyBranding.decorativeFilm,
    icon: Layers,
  },
  {
    title: 'Safety & Security Film',
    desc: 'Strengthen vulnerable glazing with professionally installed safety and security window film. The film helps hold broken glass together following impact, improving glass retention and reducing loose fragments.',
    features: ['Glass Retention', 'Added Protection', 'Impact Resistance', 'Commercial Applications'],
    linkText: 'Learn More About Safety Film',
    image: images.commercialTinting.betterGlass.after,
    icon: ShieldCheck,
  },
  {
    title: 'Anti-Graffiti Film',
    desc: 'Protect shopfronts and public-facing glass from scratches, markings and everyday surface damage. The sacrificial film can be replaced more easily and cost-effectively than the underlying glass.',
    features: ['Easier Maintenance', 'Sacrificial Protection', 'Clear Appearance', 'Cost-Effective Glass Protection'],
    linkText: 'Learn More About Anti-Graffiti Film',
    image: images.commercialTinting.privacyBranding.frostedFilm,
    icon: Shield,
  },
];

const comfortItems: { iconSrc: string; title: string; desc: string }[] = [
  {
    iconSrc: images.commercialTinting.comfortableWorkplace.reduceHeat,
    title: 'Reduce Heat',
    desc: 'Help maintain a more comfortable and consistent indoor temperature.',
  },
  {
    iconSrc: images.commercialTinting.comfortableWorkplace.controlGlare,
    title: 'Control Glare',
    desc: 'Improve visual comfort around computer screens, displays and workstations.',
  },
  {
    iconSrc: images.commercialTinting.comfortableWorkplace.manageUv,
    title: 'Manage UV',
    desc: 'Help protect flooring, furnishings, interior finishes and displayed products.',
  },
  {
    iconSrc: images.commercialTinting.comfortableWorkplace.enhancePrivacy,
    title: 'Enhance Privacy',
    desc: 'Choose the appropriate level of privacy for different work areas and activities.',
  },
];

const brandingFilms = [
  {
    title: 'Clear Glass',
    subtitle: 'Minimal privacy with uninterrupted views and maximum visual openness.',
    image: images.commercialTinting.privacyBranding.clearGlass,
  },
  {
    title: 'Frosted Film',
    subtitle: 'Enhanced privacy with softly diffused natural light and a clean professional finish.',
    image: images.commercialTinting.privacyBranding.frostedFilm,
  },
  {
    title: 'Decorative Film',
    subtitle: 'Stylish patterns and custom-cut designs that add character and partial privacy.',
    image: images.commercialTinting.privacyBranding.decorativeFilm,
  },
  {
    title: 'Branded Film',
    subtitle:
      'Custom logos, graphics and manifestations that reinforce your visual identity across glass partitions, doors and reception areas.',
    image: images.commercialTinting.privacyBranding.brandedFilm,
  },
];

const advancedFilmFeatures: { title: string; desc: string; iconSrc: string }[] = [
  {
    title: 'Solar Energy',
    desc: 'Helps reduce the amount of solar heat entering through your building\'s glass.',
    iconSrc: images.commercialTinting.advancedFilmTechnology.icons.solarEnergy,
  },
  {
    title: 'UV Rays',
    desc: 'Filters damaging UV rays to help protect interiors and displayed products.',
    iconSrc: images.commercialTinting.advancedFilmTechnology.icons.uvRadiation,
  },
  {
    title: 'Glare',
    desc: 'Reduces harsh glare for improved comfort and screen visibility.',
    iconSrc: images.commercialTinting.advancedFilmTechnology.icons.glare,
  },
  {
    title: 'Visible Light',
    desc: 'Maintains useful natural light while controlling excessive brightness.',
    iconSrc: images.commercialTinting.advancedFilmTechnology.icons.visibleLight,
  },
  {
    title: 'Privacy Options',
    desc: 'Choose from clear, tinted, reflective, translucent and frosted solutions to achieve the right level of privacy.',
    iconSrc: images.commercialTinting.advancedFilmTechnology.icons.privacy,
  },
];

const safetyFeatures: { title: string; desc: string; iconSrc: string; icon: LucideIcon }[] = [
  {
    title: 'Glass Retention',
    desc: 'Helps hold broken glass fragments in place following impact.',
    iconSrc: images.commercialTinting.safetyAndSecurity.icons.glassRetention,
    icon: Layers,
  },
  {
    title: 'Safety & Security',
    desc: 'Suitable for a range of commercial, public-facing and high-traffic environments.',
    iconSrc: images.commercialTinting.safetyAndSecurity.icons.safetyApplications,
    icon: ShieldCheck,
  },
  {
    title: 'Professional Installation',
    desc: 'Installed by experienced professionals for consistent coverage and reliable performance.',
    iconSrc: images.commercialTinting.safetyAndSecurity.icons.professionalInstallation,
    icon: Wrench,
  },
];

const industries: { icon: LucideIcon; label: string; desc: string; iconSrc: string }[] = [
  {
    icon: Briefcase,
    label: 'Offices',
    desc: 'Heat, glare and privacy solutions for productive, comfortable workplaces.',
    iconSrc: images.commercialTinting.industries.offices,
  },
  {
    icon: Store,
    label: 'Retail & Shopfronts',
    desc: 'Solar control, UV protection, safety and anti-graffiti film for customer-facing glass.',
    iconSrc: images.commercialTinting.industries.retailShopfronts,
  },
  {
    icon: Hotel,
    label: 'Hospitality',
    desc: 'Improve guest comfort, privacy and presentation across cafés, restaurants and accommodation venues.',
    iconSrc: images.commercialTinting.industries.hospitality,
  },
  {
    icon: HeartPulse,
    label: 'Healthcare',
    desc: 'Create practical privacy for consultation rooms, treatment spaces and reception areas.',
    iconSrc: images.commercialTinting.industries.healthcare,
  },
  {
    icon: GraduationCap,
    label: 'Education',
    desc: 'Safety, glare control and privacy solutions for schools, training facilities and learning spaces.',
    iconSrc: images.commercialTinting.industries.education,
  },
  {
    icon: Factory,
    label: 'Industrial & Commercial',
    desc: 'Durable window film solutions for warehouses, facilities, workshops and larger commercial properties.',
    iconSrc: images.commercialTinting.industries.industrialCommercial,
  },
];

const processSteps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: 'Enquire',
    desc: 'Tell us about your property, glazing and the problems you would like to address.',
    icon: ClipboardList,
  },
  {
    num: '02',
    title: 'Site Assessment',
    desc: 'We assess the glass, environment, orientation and intended use of each space.',
    icon: Search,
  },
  {
    num: '03',
    title: 'Film Recommendation',
    desc: 'We recommend the most suitable commercial window film based on performance, privacy and appearance.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Quote',
    desc: 'You receive a clear, detailed quotation outlining the recommended solution and installation scope.',
    icon: FileText,
  },
  {
    num: '05',
    title: 'Installation',
    desc: 'Our team carefully cleans and prepares the glass before professionally installing the selected film with minimal disruption.',
    icon: Wrench,
  },
  {
    num: '06',
    title: 'Final Inspection',
    desc: 'We inspect the completed installation and explain the appropriate aftercare for your new window film.',
    icon: CircleCheck,
  },
];

const commercialFaqs = [
  {
    question: 'Can window film reduce heat in an office?',
    answer:
      'Yes. Solar control window film is designed to reduce the amount of solar heat entering through glass, helping create a more comfortable indoor environment. The result will depend on the selected film, glass type, window orientation and building conditions, so we recommend assessing the property before specifying a solution.',
  },
  {
    question: 'Can window film reduce glare on computer screens?',
    answer:
      'Yes. Glare-reduction film can reduce excessive brightness and reflections around monitors, displays and workstations. We can recommend a film that controls glare while preserving an appropriate level of natural light.',
  },
  {
    question: 'Can you add privacy film to office partitions?',
    answer:
      'Yes. We install frosted, decorative and custom privacy film on internal glass partitions, meeting rooms, consultation rooms and office doors. Coverage can be full height, partial height or custom cut to suit the space.',
  },
  {
    question: 'Can you create frosted film with our company logo?',
    answer:
      'Yes. Custom logos, graphics, privacy bands and branded manifestations can be produced for office partitions, glass doors, reception areas and shopfronts. Final artwork and measurements are confirmed before production.',
  },
  {
    question: 'Can window film be installed outside business hours?',
    answer:
      'Commercial installation scheduling depends on the size and location of the project. Where practical, we can discuss installation times that reduce disruption to your staff, customers and normal business operations.',
  },
  {
    question: 'What is safety and security window film?',
    answer:
      'Safety and security film is a strong transparent film applied to glass to help retain fragments if the pane breaks. It can improve protection against accidental impact and other glass-breakage risks, although it does not make glass unbreakable.',
  },
  {
    question: 'Can window film be installed on double-glazed glass?',
    answer:
      'Some films are compatible with certain types of double glazing, but film selection must consider the glass construction and condition. We assess the glazing and recommend a compatible product rather than applying one film to every window type.',
  },
  {
    question: 'How long does commercial window film last?',
    answer:
      'The expected service life depends on the film type, glass, orientation, exposure and installation conditions. We use quality products and will explain the relevant product warranty and aftercare requirements for your selected solution.',
  },
  {
    question: 'How much does commercial window tinting cost in Hobart?',
    answer:
      'Commercial window tinting prices depend on the film selected, total glass area, access, glass type and installation requirements. Contact Spotless Tinting with your measurements or arrange a site assessment for a tailored quotation.',
  },
  {
    question: 'Which areas do you service?',
    answer:
      'Spotless Tinting provides commercial window tinting across Hobart and surrounding areas. Contact us with your property location and project requirements, and our team will confirm availability.',
  },
];

const galleryFilters = ['All', 'Solar Control', 'Privacy', 'Frosted & Decorative', 'Safety', 'Smart Film'];

const galleryItems = [
  {
    id: '1',
    filter: 'Solar Control',
    alt: 'Commercial building with solar control window film',
    image: images.commercialTinting.windowFilmSolutions.solarControl,
  },
  {
    id: '2',
    filter: 'Privacy',
    alt: 'Office meeting room with frosted privacy window film',
    image: images.commercialTinting.privacyBranding.frostedFilm,
  },
  {
    id: '3',
    filter: 'Frosted & Decorative',
    alt: 'Commercial glass partition with decorative frosted film',
    image: images.commercialTinting.privacyBranding.decorativeFilm,
  },
  {
    id: '4',
    filter: 'Safety',
    alt: 'Commercial entry door with safety and security window film',
    image: images.commercialTinting.betterGlass.after,
  },
  {
    id: '5',
    filter: 'Smart Film',
    alt: 'Modern commercial office with smart tint glass',
    image: images.commercialTinting.privacyBranding.clearGlass,
  },
  {
    id: '6',
    filter: 'Solar Control',
    alt: 'Commercial office with privacy band window film',
    image: images.commercialTinting.windowFilmSolutions.privacy,
  },
];

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before Window Film',
  afterLabel = 'After Window Film',
  overlayItems,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  overlayItems?: { iconSrc: string; label: string }[];
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-ink-900 select-none">
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="absolute inset-y-0 z-20 w-px bg-white/90" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-bold text-ink-950 shadow-lg">
          <span aria-hidden>&lt;&gt;</span>
        </div>
      </div>

      <span className="absolute left-4 top-4 z-20 rounded bg-ink-950/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 z-20 rounded bg-ink-950/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
        {afterLabel}
      </span>

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
        aria-label="Compare before and after window film"
      />
    </div>
  );
}

const commercialPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Commercial Window Tinting',
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
    'Professional commercial window tinting in Hobart for offices, shopfronts and workplaces. Solar control, privacy, frosted, safety and anti-graffiti film solutions.',
};

export default function CommercialTintingPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered =
    activeFilter === 'All'
      ? galleryItems.slice(0, 5)
      : galleryItems.filter((g) => g.filter === activeFilter).slice(0, 5);

  return (
    <>
      <SEO
        title="Commercial Window Tinting Hobart | Office & Shopfront Film | Spotless Tinting"
        description="Professional commercial window tinting in Hobart for offices, shopfronts and workplaces. Reduce heat, glare and UV, improve privacy and protect glass with solar control, privacy, frosted, safety and anti-graffiti films."
        path="/services/commercial-window-tinting"
        image={images.commercialTintingBanner}
        schema={commercialPageSchema}
      />

      {/* HERO */}
      <section className="overflow-hidden bg-white">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 lg:py-16 xl:px-16">
            <h1 className="text-3xl font-bold uppercase leading-[1.05] text-ink-950 sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
              Commercial Window Tinting Hobart
            </h1>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-500 sm:text-sm">
              <span className="relative inline-block pb-2">
                Performance
                <span className="absolute bottom-0 left-0 h-1 w-8 bg-accent-500" aria-hidden />
              </span>
              <span className="text-accent-500/90"> · Privacy · Protection</span>
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-600 sm:text-base">
              Professional commercial window tinting for offices, shopfronts and commercial properties
              across Hobart. Our tailored window film solutions help reduce heat and glare, improve
              privacy, filter damaging UV rays and enhance the safety and appearance of your glass.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/quote" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#solutions" className="btn-outline">
                Explore Commercial Solutions
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[5/3]">
            <img
              src={images.commercialTintingBanner}
              alt="Modern commercial building with window tinting"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = images.professionalTintingForEveryNeedCommercial;
              }}
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

        {/* BETTER GLASS */}
        <section className="bg-white py-12 md:py-16">
          <div className="container">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-10 xl:gap-12">
              <Reveal>
                <div className="lg:pr-2 xl:pr-4">
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl lg:text-[2rem]">
                    Better Glass. Better Work Environment.
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    The right commercial window film can transform how your workplace looks and feels.
                    By controlling sunlight, glare and visibility through glass, we can help create a
                    more comfortable, private and practical environment without sacrificing natural light
                    or outward views.
                  </p>
                  <ul className="mt-6 space-y-5">
                    {workEnvironmentBenefits.map((item) => (
                      <li key={item.question} className="flex items-start gap-3">
                        <img
                          src={item.iconSrc}
                          alt=""
                          className="mt-0.5 h-8 w-8 shrink-0 object-contain sm:h-9 sm:w-9"
                          aria-hidden
                          loading="lazy"
                        />
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
                  beforeSrc={images.commercialTinting.betterGlass.before}
                  afterSrc={images.commercialTinting.betterGlass.after}
                  beforeLabel="Before Window Film"
                  afterLabel="After Window Film"
                  overlayItems={comfortOverlayItems}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* FILM SOLUTIONS */}
        <section id="solutions" className="section bg-ink-50">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Window Film Solutions for Your Business
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                  From heat-reducing film for exterior windows to custom frosting for internal
                  partitions, Spotless Tinting provides commercial window film solutions tailored to
                  your building, operational needs and desired appearance.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{sol.desc}</p>
                      <ul className="mt-4 space-y-1.5">
                        {sol.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-ink-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/quote"
                        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold uppercase tracking-wide text-accent-600"
                      >
                        {sol.linkText}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SPACES + COMFORT + PRIVACY + TECH */}
        <section className="bg-ink-50 py-12 md:py-16">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-14 xl:gap-x-16">
              {/* Solutions Across Every Space */}
              <Reveal>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Solutions Across Every Space
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Commercial window tinting can be tailored to different areas of the same property,
                    providing the right balance of comfort, privacy, protection and presentation
                    throughout your workplace.
                  </p>
                  <img
                    src={images.commercialTinting.solutionsAcrossEverySpace.diagram}
                    alt="Commercial building diagram showing window film applications for offices, meeting rooms, shopfronts, reception areas, glass partitions and entry doors"
                    loading="lazy"
                    className="mt-6 w-full object-contain"
                  />
                </div>
              </Reveal>

              {/* Create a More Comfortable Workplace */}
              <Reveal delay={80}>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Create a More Comfortable Workplace
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Our office window tinting solutions help Hobart businesses create calmer, more
                    functional workplaces by addressing the everyday effects of sunlight and exposed
                    glass.
                  </p>
                  <div className="mt-8 grid grid-cols-2 divide-x divide-ink-200 sm:grid-cols-4">
                    {comfortItems.map((item) => (
                      <div key={item.title} className="flex flex-col items-center px-3 text-center first:pl-0 last:pr-0 sm:px-4">
                        <img
                          src={item.iconSrc}
                          alt=""
                          className="h-12 w-12 object-contain"
                          aria-hidden
                          loading="lazy"
                        />
                        <h3 className="mt-4 text-[11px] font-bold uppercase tracking-wide text-ink-950 sm:text-xs">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[11px] leading-relaxed text-ink-600 sm:text-xs">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Privacy & Branding Solutions */}
              <Reveal>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Privacy &amp; Branding Solutions
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Turn plain glass into a practical design feature with custom privacy, decorative
                    and branded window film. We can tailor the level of coverage, opacity and visual
                    style to suit your brand and workplace.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                    {brandingFilms.map((film) => (
                      <div key={film.title} className="overflow-hidden rounded-md bg-white">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={film.image}
                            alt={film.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="px-2 py-3 text-center">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-ink-950 sm:text-[11px]">
                            {film.title}
                          </p>
                          <p className="mt-0.5 text-[9px] text-ink-500 sm:text-[10px]">{film.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-center text-xs leading-relaxed text-ink-600 sm:text-sm">
                    Create functional, on-brand commercial spaces with custom frosted and decorative
                    window film in Hobart.
                  </p>
                </div>
              </Reveal>

              {/* Advanced Film Technology */}
              <Reveal delay={80}>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Advanced Film Technology
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Modern commercial window film is engineered to improve glass performance without
                    unnecessarily darkening your workplace. We help you select the appropriate film
                    based on your glazing, orientation, privacy requirements and operational
                    priorities.
                  </p>
                  <div className="mt-6 grid items-start gap-6 sm:gap-4">
                    <img
                      src={images.commercialTinting.advancedFilmTechnology.diagram}
                      alt="Window film layer diagram showing glass panes and tint film"
                      loading="lazy"
                      className="w-[80%] mx-auto object-contain" 
                    />

                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SAFETY + INDUSTRIES */}
        <section className="bg-ink-950 py-12 md:py-16">
          <div className="container">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <Reveal>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    Safety &amp; Security You Can Rely On
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-300 sm:text-base">
                    Commercial glass can be vulnerable to accidental impact, severe weather and
                    attempted entry. Professionally installed safety and security window film helps
                    hold shattered glass together, adding protection without significantly changing the
                    appearance of your glazing.
                  </p>
                  <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-4">
                    {safetyFeatures.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-accent-500">
                          <FeatureIcon iconSrc={feature.iconSrc} icon={feature.icon} className="h-9 w-9" />
                        </div>
                        <p className="text-[10px] leading-snug text-ink-300 sm:text-[11px]">
                          <span className="font-bold uppercase tracking-wide text-white">
                            {feature.title}
                          </span>
                          <span className="text-ink-400"> — </span>
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/quote"
                    className="mt-8 inline-flex items-center gap-2 border border-accent-500 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-500 sm:px-6 sm:py-3 sm:text-xs"
                  >
                    Learn More About Safety Film
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    Ideal for a Wide Range of Industries
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-300 sm:text-base">
                    We provide commercial window tinting across Hobart for businesses and organisations
                    of different sizes. Every solution is selected according to the building, glass
                    type, daily use and required level of privacy or protection.
                  </p>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map((ind) => (
                      <div key={ind.label} className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-accent-500">
                          <FeatureIcon
                            iconSrc={ind.iconSrc}
                            icon={ind.icon}
                            className="h-9 w-9"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-white">
                            {ind.label}
                          </p>
                          <p className="mt-1 text-[11px] leading-relaxed text-ink-300 sm:text-xs">
                            {ind.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS + FAQ */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <Reveal>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    The Spotless Commercial Process
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                  <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    From the initial enquiry through to final inspection, our commercial window tinting
                    process is designed to make planning and installation clear and straightforward.
                  </p>
                </Reveal>
                <div className="mt-8 space-y-0">
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
                          <h3 className="mt-0.5 text-sm font-bold uppercase text-ink-950">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm text-ink-500">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Reveal>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                    Commercial Window Tinting FAQs
                  </h2>
                  <div className="mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                </Reveal>
                <div className="mt-8">
                  <FAQAccordion
                    items={commercialFaqs}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-white py-12 md:py-16">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink-950 md:text-3xl">
                  Recent{' '}
                  <span className="relative inline-block pb-2">
                    Commercial
                    <span className="absolute bottom-0 left-0 h-1 w-8 bg-accent-500" aria-hidden />
                  </span>{' '}
                  Projects
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
                  Explore recent commercial window tinting projects completed for offices, shopfronts
                  and workplaces. Our portfolio includes solar control, privacy, frosted, decorative,
                  safety and specialised glass film solutions.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {galleryFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:text-xs ${
                    activeFilter === filter
                      ? 'border-accent-500 bg-accent-500 text-white'
                      : 'border-ink-200 bg-white text-ink-950 hover:border-accent-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={i * 50} className="min-w-0">
                  <div className="aspect-[3/4] overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.alt}
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
                  View All Commercial Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-ink-950 py-12 md:py-16">
          <div className="container">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  Improve Your Commercial Space with Professional Window Film
                </h2>
                <div className="mx-auto mt-3 h-1 w-10 bg-accent-500" aria-hidden />
                <p className="mt-5 text-sm leading-relaxed text-ink-300 sm:text-base">
                  Whether you need to reduce heat and glare, add privacy, protect valuable interiors
                  or create custom branding across your glass, Spotless Tinting can recommend a
                  commercial window film solution suited to your property. Contact our team today to
                  arrange an assessment or request a commercial window tinting quote in Hobart.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link to="/quote" className="btn bg-white text-accent-600 hover:bg-ink-50">
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="btn border border-white/40 bg-transparent text-white hover:bg-white/10"
                  >
                    Contact Spotless Tinting
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
