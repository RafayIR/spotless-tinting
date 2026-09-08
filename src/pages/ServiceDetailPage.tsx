import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, MapPin, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import ProcessTimeline from '@/components/ProcessTimeline';
import { getService } from '@/data/services';
import { servicePageBySlug } from '@/data/servicePages';
import { business } from '@/data/business';
import { projects } from '@/data/projects';
import type { ServicePageContent } from '@/data/servicePages';
import AutomotiveTintingPage from '@/pages/AutomotiveTintingPage';
import CommercialTintingPage from '@/pages/CommercialTintingPage';
import ResidentialTintingPage from '@/pages/ResidentialTintingPage';
import PaintProtectionFilmPage from '@/pages/PaintProtectionFilmPage';
import VehicleWrapsPage from '@/pages/VehicleWrapsPage';

function ServiceHero({
  name,
  content,
  heroImage,
}: {
  name: string;
  content: ServicePageContent;
  heroImage: string;
}) {
  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden lg:min-h-[90vh]">
      <div className="absolute inset-0">
        <img src={heroImage} alt={name} className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
      </div>

      <div className="container relative z-10 pb-12 pt-28 lg:pb-16">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: name },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-400">
            {content.heroTagline}
          </p>
          <h1 className="mt-4 text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {name.replace('Tinting', '').trim()}{' '}
            <span className="text-accent-400">Tinting</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={content.secondaryCtaHref} className="btn border border-white/30 bg-transparent text-white hover:bg-white/10">
              {content.secondaryCtaLabel}
            </a>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {content.heroFeatures.map((f) => (
            <li key={f.label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustBar({ items }: { items: ServicePageContent['trustItems'] }) {
  return (
    <section className="border-b border-ink-100 bg-white py-10 md:py-12">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection({ content }: { content: ServicePageContent }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="eyebrow">Benefits</span>
              <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                {content.whyTitle}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-600">{content.whyDesc}</p>
              <ul className="mt-8 space-y-3">
                {content.whyChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-700 sm:text-base">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={content.whyImage}
                alt={content.whyTitle}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 max-w-[260px] rounded-xl bg-ink-950/85 p-4 backdrop-blur-sm">
                <p className="text-sm font-bold text-accent-400">{content.whyOverlay.highlight}</p>
                <p className="mt-1 text-sm text-white/90">{content.whyOverlay.text}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ShadesSection({ content }: { content: ServicePageContent }) {
  return (
    <section id="shades" className="section bg-ink-950">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-accent-400">Tint Options</span>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              {content.shadesTitle}
            </h2>
            <p className="mt-4 text-ink-300">{content.shadesSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {content.shadeOptions.map((shade, i) => (
              <Reveal key={shade.name} delay={i * 60}>
                <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={shade.image}
                      alt={`${shade.name} tint option`}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                        {shade.name}
                      </h3>
                      <span className="text-xs font-bold text-accent-400">{shade.vlt}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">{shade.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-ink-800 bg-ink-900 p-6 lg:min-h-full">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-accent-400">
                  {content.tintLaws.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">{content.tintLaws.desc}</p>
              </div>
              <Link
                to={content.tintLaws.ctaPath}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-accent-400"
              >
                {content.tintLaws.ctaLabel}
                <ArrowRight className="h-4 w-4 text-accent-500" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceProcessSection({ content }: { content: ServicePageContent }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
              {content.processTitle}
            </h2>
            <p className="mt-4 text-ink-600">{content.processSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 hidden lg:block">
          <div className="grid grid-cols-6 gap-2">
            {content.processSteps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === content.processSteps.length - 1;
              return (
                <div key={step.num} className="relative flex flex-col items-center text-center">
                  {!isLast && (
                    <ChevronRight
                      className="absolute -right-3 top-8 z-10 h-5 w-5 text-accent-400"
                      aria-hidden
                    />
                  )}
                  <span className="text-xs font-bold text-accent-500">{step.num}</span>
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md shadow-ink-950/10">
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
          {content.processSteps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === content.processSteps.length - 1;
            return (
              <div key={step.num} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md">
                    <Icon className="h-5 w-5 text-ink-900" strokeWidth={1.6} />
                  </div>
                  {!isLast && <div className="my-1 w-px flex-1 bg-accent-300" />}
                </div>
                <div className={`pb-7 ${isLast ? 'pb-0' : ''}`}>
                  <span className="text-xs font-bold text-accent-500">{step.num}</span>
                  <h3 className="mt-1 text-sm font-bold uppercase text-ink-950">{step.title}</h3>
                  <p className="mt-1 text-sm text-ink-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceGallerySection({ content }: { content: ServicePageContent }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? content.galleryItems
      : content.galleryItems.filter((item) => item.filter === activeFilter);

  return (
    <section className="section bg-ink-950">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-accent-400">Portfolio</span>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              {content.galleryTitle}
            </h2>
            <p className="mt-4 text-ink-300">{content.gallerySubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {content.galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                activeFilter === filter
                  ? 'bg-accent-500 text-white'
                  : 'border border-ink-700 text-ink-300 hover:border-accent-500 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                    {item.filter}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="btn border border-ink-600 bg-transparent text-white hover:border-accent-500 hover:bg-accent-500/10"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCtaSection({ content, heroImage }: { content: ServicePageContent; heroImage: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="h-full w-full object-cover object-center" aria-hidden />
        <div className="absolute inset-0 bg-ink-950/90" />
      </div>
      <div className="container relative z-10 section text-center">
        <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
          {content.ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-300">{content.ctaSubtitle}</p>
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
  );
}

function GenericServicePage({
  name,
  description,
  benefits,
  heroImage,
}: {
  name: string;
  description: string;
  benefits: string[];
  heroImage: string;
}) {
  const relatedProjects = projects.filter((p) =>
    p.service.toLowerCase().includes(name.split(' ')[0].toLowerCase()),
  ).slice(0, 6);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/30" />
        </div>
        <div className="container relative z-10 pb-12 pt-28">
          <Breadcrumbs
            crumbs={[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: name },
            ]}
          />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold text-white md:text-5xl">{name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-200">{description}</p>
          <Link to="/quote" className="btn-primary mt-8">
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="eyebrow">Overview</span>
                <h2 className="mt-3 text-3xl font-bold">What We Offer</h2>
                <p className="mt-4 leading-relaxed text-ink-600">{description}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50 p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <span className="text-sm text-ink-700">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How It Works</span>
              <h2 className="mt-3 text-3xl font-bold">The Spotless Process</h2>
            </div>
          </Reveal>
          <div className="mt-12">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <Reveal>
              <h2 className="text-center text-3xl font-bold">Related Projects</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl">
                  <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section bg-accent-500 text-center">
        <div className="container">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Talk to Spotless Tinting about {name.toLowerCase()} for your project.
          </p>
          <Link to="/quote" className="btn mt-8 bg-white text-accent-600 hover:bg-ink-50">
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const service = getService(slug);
  const pageContent = servicePageBySlug[slug];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  if (slug === 'automotive-window-tinting') {
    return <AutomotiveTintingPage />;
  }

  if (slug === 'commercial-window-tinting') {
    return <CommercialTintingPage />;
  }

  if (slug === 'residential-window-tinting') {
    return <ResidentialTintingPage />;
  }

  if (slug === 'paint-protection-film') {
    return <PaintProtectionFilmPage />;
  }

  if (slug === 'vehicle-wrapping') {
    return <VehicleWrapsPage />;
  }

  if (!pageContent) {
    return (
      <>
        <SEO title={service.metaTitle} description={service.metaDescription} path={`/services/${slug}`} image={service.heroImage} />
        <GenericServicePage
          name={service.name}
          description={service.description}
          benefits={service.benefits}
          heroImage={service.heroImage}
        />
      </>
    );
  }

  return (
    <>
      <SEO title={service.metaTitle} description={service.metaDescription} path={`/services/${slug}`} image={service.heroImage} />
      <ServiceHero name={service.name} content={pageContent} heroImage={service.heroImage} />
      <TrustBar items={pageContent.trustItems} />
      <WhySection content={pageContent} />
      <ShadesSection content={pageContent} />
      <ServiceProcessSection content={pageContent} />
      <ServiceGallerySection content={pageContent} />
      <ServiceCtaSection content={pageContent} heroImage={service.heroImage} />
    </>
  );
}
