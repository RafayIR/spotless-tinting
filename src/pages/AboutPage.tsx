import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Wrench, MapPin, Eye, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { business } from '@/data/business';

const values = [
  { icon: Shield, title: 'Quality First', desc: 'We use premium films and materials, never compromising on quality.' },
  { icon: Wrench, title: 'Expert Workmanship', desc: 'Every installation is carried out by experienced, meticulous technicians.' },
  { icon: MapPin, title: 'Local & Trusted', desc: 'Proudly Hobart-based, serving our local community with care.' },
  { icon: Eye, title: 'Attention to Detail', desc: 'We treat every vehicle and property as if it were our own.' },
];

const teamTraits = [
  { icon: images.aboutTeam.people, label: 'Diverse' },
  { icon: images.aboutTeam.star, label: 'Experienced' },
  { icon: images.aboutTeam.location, label: 'Local' },
  { icon: images.aboutTeam.heart, label: 'Passionate' },
];

const locations = [
  {
    name: 'Moonah',
    address: '9/14A Main Road, Moonah TAS 7009',
    image: images.aboutLocations.moonah,
    mapsQuery: '9/14A Main Road, Moonah TAS 7009',
  },
  {
    name: 'Bellerive',
    address: '107A Cambridge Road, Bellerive TAS',
    image: images.aboutLocations.bellerive,
    mapsQuery: '107A Cambridge Road, Bellerive TAS',
  },
];

const aboutHighlights = [
  {
    icon: images.aboutBeneathHeader.trophy,
    title: '15+ Years',
    subtitle: 'Industry Experience',
  },
  {
    icon: images.aboutBeneathHeader.location,
    title: '2 Locations',
    subtitle: 'Moonah & Bellerive',
  },
  {
    icon: images.aboutBeneathHeader.map,
    title: 'Tasmanian Local',
    subtitle: 'Proudly Local',
  },
  {
    icon: images.aboutBeneathHeader.diamond,
    title: 'Premium Products',
    subtitle: 'Quality Focused',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | Spotless Tinting — Hobart, Tasmania"
        description="Learn about Spotless Tinting — your local Moonah and Hobart window tinting, PPF and vehicle wrapping specialists."
        path="/about"
        image={images.aboutUsBanner}
      />

      {/* HERO */}
      <section className="relative min-h-[min(78vh,720px)] overflow-hidden bg-white">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={images.aboutUsBanner}
            alt=""
            className="h-full w-full object-cover object-[68%_center]"
          />
          {/* Soft feathered white fade — no hard edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #fff 0%, #fff 34%, rgba(255,255,255,0.92) 44%, rgba(255,255,255,0.55) 54%, rgba(255,255,255,0.18) 64%, transparent 76%)',
            }}
          />
        </div>

        <div className="container relative z-10 flex min-h-[min(78vh,720px)] flex-col justify-center py-16 lg:py-20">
          <div className="absolute left-4 top-6 sm:left-6 lg:left-[max(2rem,calc((100%-1320px)/2+2rem))] lg:top-8">
            <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
          </div>

          <div className="max-w-xl pt-10 lg:max-w-[34rem]">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-500 sm:text-xs">
              <span className="h-px w-6 bg-accent-500 sm:w-8" aria-hidden />
              About Spotless Tinting
              <span className="h-px w-6 bg-accent-500 sm:w-8" aria-hidden />
            </p>
            <h1 className="mt-5 text-balance text-3xl font-bold uppercase leading-[1.08] tracking-tight text-ink-950 sm:text-4xl lg:text-[2.75rem]">
              15+ Years of Precision, Protection &{' '}
              <span className="text-accent-500">Craftsmanship.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600 sm:text-base">
              Professional tinting and vehicle protection solutions, delivered with quality
              workmanship and attention to detail across Hobart.
            </p>
            <Link to="/quote" className="btn-primary mt-8 inline-flex uppercase tracking-wide">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="pointer-events-none absolute bottom-8 right-6 text-right font-script text-2xl leading-tight text-ink-950 sm:bottom-10 sm:right-10 sm:text-3xl md:text-[2.15rem]">
            More Than a Tint
            <span
              className="mx-auto mt-1 block h-[3px] w-[4.75rem] rounded-full bg-accent-500 sm:ml-auto sm:mr-0"
              aria-hidden
            />
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS BAR */}
      <section className="relative z-10">
        <div
          className="py-8 sm:py-9 -mt-4"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,244,236,0) 0%, #fff4ec 18%, #fff4ec 82%, rgba(255,244,236,0) 100%)',
          }}
        >
          <div className="container">
            <div className="grid grid-cols-1 divide-y divide-accent-200/50 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-accent-200/60">
              {aboutHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex min-h-[4.5rem] items-center justify-center gap-3 px-4 py-4 sm:min-h-[5rem] sm:px-5 lg:px-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-[4rem] sm:w-[4rem]">
                    <img
                      src={item.icon}
                      alt=""
                      className="object-contain mix-blend-multiply sm:h-full sm:w-full"
                      loading="lazy"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-accent-500 sm:text-xs">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-700 sm:text-[11px]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section py-4 bg-white">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <Reveal>
              <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
                {/* Main left image — About Us banner */}
                <div className="w-[68%] overflow-hidden rounded-2xl border-[3px] border-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] sm:border-4">
                  <img
                    src={images.aboutExperience.main}
                    alt="Spotless Tinting workshop and technician"
                    className="aspect-[3/4] w-full object-cover object-[42%_center] sm:aspect-[4/5]"
                    loading="lazy"
                  />
                </div>

                {/* Top-right small — installation detail */}
                <div className="absolute right-0 top-[6%] w-[44%] overflow-hidden rounded-xl border-[3px] border-white shadow-[0_8px_24px_rgba(15,23,42,0.14)] sm:top-[8%] sm:w-[42%] sm:rounded-2xl sm:border-4">
                  <img
                    src={images.aboutExperience.overlayTop}
                    alt="Close-up of window film installation"
                    className="aspect-[5/4] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Bottom-right small — overlaps main image */}
                <div className="absolute bottom-[4%] right-0 w-[50%] overflow-hidden rounded-xl border-[3px] border-white shadow-[0_8px_24px_rgba(15,23,42,0.14)] sm:bottom-[6%] sm:w-[48%] sm:rounded-2xl sm:border-4">
                  <img
                    src={images.aboutExperience.overlayBottom}
                    alt="Tinted glass with scenic outdoor view"
                    className="aspect-[5/4] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div>
                <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-500 sm:text-xs">
                  <span className="h-0.5 w-7 bg-accent-500" aria-hidden />
                  Who We Are
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl lg:text-[2.15rem]">
                  Experience Behind{' '}
                  <span className="text-accent-500">Every Finish.</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">
                  For more than 15 years, Spotless Tinting has focused on quality workmanship,
                  professional service and reliable results across automotive, residential and
                  commercial projects.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-stretch">
                  <div className="flex h-full flex-col rounded-xl bg-ink-50 p-4 sm:p-5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={images.aboutMissionVision.mission}
                        alt=""
                        className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
                        loading="lazy"
                        aria-hidden
                      />
                      <h3 className="text-[11px] font-bold uppercase tracking-wide text-accent-500 sm:text-xs">
                        Our Mission
                      </h3>
                    </div>
                    <p className="mt-3 text-[12px] leading-relaxed text-ink-600 sm:text-[13px]">
                      Deliver quality tinting and protection solutions through skilled workmanship,
                      premium products and exceptional service.
                    </p>
                  </div>
                  <div className="flex h-full flex-col rounded-xl bg-ink-50 p-4 sm:p-5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={images.aboutMissionVision.vision}
                        alt=""
                        className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
                        loading="lazy"
                        aria-hidden
                      />
                      <h3 className="text-[11px] font-bold uppercase tracking-wide text-accent-500 sm:text-xs">
                        Our Vision
                      </h3>
                    </div>
                    <p className="mt-3 text-[12px] leading-relaxed text-ink-600 sm:text-[13px]">
                      To be one of Tasmania&apos;s most trusted names in tinting and vehicle
                      protection.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* <section className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Our Values</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Drives Us</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-ink-100 bg-white p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-950">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}


      {/* OUR TEAM */}
      <section className="section py-8 overflow-x-clip bg-white">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-10 xl:gap-12">
          <Reveal>
            <div className="px-5 md:px-8 lg:pl-[max(2rem,calc((100vw-1320px)/2+1rem))] lg:pr-2">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-500 sm:text-xs">
                <span className="h-px w-6 bg-accent-500" aria-hidden />
                Our Team
                <span className="h-px w-6 bg-accent-500" aria-hidden />
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl lg:text-[2.35rem] lg:leading-[1.15]">
                Different Backgrounds.
                <br />
                <span className="text-accent-500">One Standard.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600 sm:text-base">
                A multicultural team united by craftsmanship, customer care and pride in every job.
              </p>

              <div className="mt-8 flex max-w-md justify-between gap-3 sm:mt-10 sm:gap-4">
                {teamTraits.map((trait) => (
                  <div key={trait.label} className="flex flex-col items-center text-center">
                    <img
                      src={trait.icon}
                      alt=""
                      className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                      loading="lazy"
                      aria-hidden
                    />
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-ink-950 sm:text-[10px]">
                      {trait.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="px-5 md:px-8 lg:px-0">
              <div className="overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-l-2xl lg:rounded-r-none">
                <img
                  src={images.aboutTeam.photo}
                  alt="The Spotless Tinting team in the workshop"
                  className="block w-full object-cover object-[center_38%]"
                  style={{ aspectRatio: '2752 / 768' }}
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section py-8 bg-white">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.35fr)_minmax(180px,0.55fr)] lg:gap-4 xl:gap-8">
            <Reveal>
              <div className="max-w-xl lg:max-w-none">
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-500 sm:text-xs">
                  <span className="h-px w-6 bg-accent-500" aria-hidden />
                  Proudly Tasmanian
                  <span className="h-px w-6 bg-accent-500" aria-hidden />
                </p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl lg:text-[2.15rem] lg:leading-[1.2]">
                  Your Local Tinting Specialists{' '}
                  <span className="text-accent-500">in Hobart.</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-600 sm:text-base">
                  Proudly Tasmanian and locally based, Spotless Tinting serves customers across
                  Hobart and surrounding areas with professional window tinting and vehicle
                  protection solutions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
                {locations.map((loc) => (
                  <article
                    key={loc.name}
                    className="overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] ring-1 ring-ink-100/80"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={loc.image}
                        alt={`Spotless Tinting ${loc.name} storefront`}
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                        <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950">
                          {loc.name}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-[12px] leading-snug text-ink-500">{loc.address}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-accent-500 transition-colors hover:text-accent-600"
                      >
                        Get Directions
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto flex w-full max-w-[220px] items-center justify-center lg:ml-auto lg:mr-0 lg:max-w-[240px]">
                <img
                  src={images.aboutLocations.map}
                  alt=""
                  className="w-full object-contain opacity-[0.2] invert"
                  loading="lazy"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <p className="text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] text-ink-700 sm:text-[11px]">
                    Tasmanian Local.
                    <br />
                    Two Locations.
                    <br />
                    One Standard.
                  </p>
                  <span className="mt-2.5 h-0.5 w-9 rounded-full bg-accent-500" aria-hidden />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT FOOTER CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={images.aboutFooter}
            alt=""
            className="h-full w-full object-cover object-[72%_center] sm:object-right"
          />
          {/* Soft left fade so copy stays readable */}
          {/* <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 28%, rgba(255,255,255,0.35) 48%, transparent 62%)',
            }}
          /> */}
        </div>

        <div className="container relative z-10 py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="max-w-xl">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-500 sm:text-xs">
                <span className="h-px w-6 bg-accent-500" aria-hidden />
                Ready to Work With Spotless?
                <span className="h-px w-6 bg-accent-500" aria-hidden />
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl lg:text-[2.35rem] lg:leading-tight">
                Quality You Can See.
                <br />
                <span className="text-accent-500">Service You Can Trust.</span>
              </h2>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/quote" className="btn-primary rounded-md uppercase tracking-wide">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={business.phoneHref}
                  className="btn  rounded-md inline-flex border border-ink-900 bg-white uppercase tracking-wide text-ink-950 hover:border-accent-500 hover:bg-accent-50"
                >
                  <Phone className="h-4 w-4 text-accent-500" />
                  Call 0451 459 690
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
