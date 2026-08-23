import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Building2,
  Car,
  Check,
  Home,
  Shield,
  Star,
  type LucideIcon,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { getService } from '@/data/services';
import {
  MoreThanDarkerGlassSection,
  WindowFilmTechnologySection,
} from '@/components/WindowFilmSections';

const trustItems = [
  {
    icon: Shield,
    title: 'Quality Products',
    desc: 'Premium films that perform.',
  },
  {
    icon: Star,
    title: 'Expert Installation',
    desc: 'Precision workmanship & attention to detail.',
  },
  {
    icon: Award,
    title: 'Local & Trusted',
    desc: 'Proudly serving Hobart & surrounds.',
  },
];

const tintingCards: {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
  cta: string;
  image: string;
}[] = [
  {
    id: 'automotive',
    slug: 'automotive-window-tinting',
    icon: Car,
    title: 'Automotive Window Tinting',
    desc: 'Premium window films for cars, utes and SUVs — heat rejection, UV protection and style.',
    features: ['Heat Reduction', 'UV Protection', 'Glare Reduction', 'Privacy & Style'],
    cta: 'Explore Automotive Tinting',
    image: images.blackCar,
  },
  {
    id: 'residential',
    slug: 'residential-window-tinting',
    icon: Home,
    title: 'Residential Window Tinting',
    desc: 'Solar control and privacy films that keep your home cooler, safer and more comfortable.',
    features: ['Heat Control', 'UV Protection', 'Glare Reduction', 'Enhanced Privacy'],
    cta: 'Explore Residential Tinting',
    image: images.modernHome,
  },
  {
    id: 'commercial',
    slug: 'commercial-window-tinting',
    icon: Building2,
    title: 'Commercial Window Tinting',
    desc: 'Professional film solutions for offices, retail and commercial buildings across Hobart.',
    features: ['Solar Control', 'Privacy Solutions', 'Glare Reduction', 'Safety & Security Films'],
    cta: 'Explore Commercial Tinting',
    image: images.officeGlass,
  },
];

function TintingCard({
  card,
  delay,
}: {
  card: (typeof tintingCards)[number];
  delay: number;
}) {
  const Icon = card.icon;

  return (
    <Reveal delay={delay}>
      <Link
        to={`/services/${card.slug}`}
        className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-2xl sm:min-h-[520px]"
      >
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/70 to-ink-950/30" />

        <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-accent-500 text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>

          <div className="mt-auto">
            <h2 className="text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-200">{card.desc}</p>

            <ul className="mt-5 space-y-2.5">
              {card.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-white">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent-400 transition-colors group-hover:text-accent-300">
              {card.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function ServicesHubPage() {
  return (
    <>
      <SEO
        title="Services | Spotless Tinting — Hobart, Tasmania"
        description="Professional automotive, residential and commercial window tinting in Hobart. Premium films with expert installation."
        path="/services"
      />

      {/* Diagonal hero banner */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative flex min-h-[640px] flex-col lg:min-h-[670px] lg:flex-row">
          {/* Content panel */}
          <div className="relative z-20 flex w-full flex-col justify-center px-6 py-16 sm:px-10 lg:w-[52%] lg:px-12 lg:py-20 xl:px-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-500">
              Automotive · Residential · Commercial
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold uppercase leading-[1.05] text-ink-950 sm:text-5xl lg:text-[3.25rem]">
              Professional Window Tinting
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-600 sm:text-lg">
              Premium window film solutions for vehicles, homes and commercial spaces — expertly
              installed for comfort, protection and lasting performance across Hobart.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#tinting-options" className="btn-outline">
                Explore Tinting Options
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 grid gap-6 border-t border-ink-100 pt-8 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div key={item.title}>
                  <item.icon className="h-5 w-5 text-accent-500" strokeWidth={1.75} />
                  <h3 className="mt-2 text-sm font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagonal image panel — desktop */}
          <div
            className="relative hidden min-h-full flex-1 lg:block"
            aria-hidden
          >
            <div
              className="absolute inset-y-0 left-0 right-0 overflow-hidden"
              style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <img
                src={images.banner02}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Image — mobile / tablet */}
          <div className="relative h-64 sm:h-80 lg:hidden">
            <img
              src={images.banner02}
              alt="Professional window tinting"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Tinting category cards */}
      <section id="tinting-options" className="section bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow inline-flex items-center gap-5 before:h-px before:w-12 before:bg-accent-400 after:h-px after:w-12 after:bg-accent-400">
                One Solution. Three Applications.
              </span>
              <h2 className="mt-5 text-3xl font-bold md:text-4xl lg:text-5xl">
                Professional Tinting for Every Need
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tintingCards.map((card, i) => (
              <TintingCard key={card.id} card={card} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <MoreThanDarkerGlassSection />
      <WindowFilmTechnologySection />

      {/* Additional services strip */}
      <section className="border-t border-ink-100 bg-ink-50 py-14">
        <div className="container">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <span className="eyebrow">Also Available</span>
                <h2 className="mt-2 text-2xl font-bold text-ink-950">Vehicle Protection &amp; More</h2>
                <p className="mt-2 max-w-xl text-sm text-ink-600">
                  Beyond window tinting — PPF, vehicle wraps and ceramic coating for complete protection.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {(['ppf', 'wrapping', 'ceramic'] as const).map((id) => {
                  const service = getService(
                    id === 'ppf'
                      ? 'paint-protection-film'
                      : id === 'wrapping'
                        ? 'vehicle-wrapping'
                        : 'ceramic-coating',
                  );
                  if (!service) return null;
                  return (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-accent-400 hover:text-accent-600"
                    >
                      {service.name.replace('Paint Protection Film', 'PPF')}
                      <ArrowRight className="h-3.5 w-3.5 text-accent-500" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
