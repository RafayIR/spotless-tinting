// import { Cog, Layers, ShieldCheck, Trophy, type LucideIcon } from 'lucide-react';
import { images } from '@/data/images';
import Reveal from '@/components/Reveal';

/*
type Feature = {
  id: string;
  icon?: LucideIcon;
  badge?: string;
  title: string;
  desc: string;
  thumb: string;
  thumbAlt: string;
};

const leftFeatures: Feature[] = [
  {
    id: 'warranty',
    icon: ShieldCheck,
    title: 'Lifetime Warranty',
    desc: 'We stand behind our work with industry-leading lifetime warranty for complete peace of mind.',
    thumb: images.homeWhyChoose.warranty,
    thumbAlt: 'Tinted car window badged with lifetime protection',
  },
  {
    id: 'precision',
    icon: Cog,
    title: 'Precision Installation',
    desc: 'Expert installation with meticulous attention to detail and flawless finishes every time.',
    thumb: images.homeWhyChoose.precision,
    thumbAlt: 'Installer squeegeeing film onto glass',
  },
];

const rightFeatures: Feature[] = [
  {
    id: 'films',
    icon: Layers,
    title: 'Premium Window Films',
    desc: 'High-performance window films that reduce heat, block UV rays and enhance privacy and comfort.',
    thumb: images.homeWhyChoose.films,
    thumbAlt: 'Layered diagram of advanced window film technology',
  },
  {
    id: 'ppf',
    badge: 'PPF',
    title: 'Paint Protection Film',
    desc: "Advanced PPF protects your vehicle's paintwork from stone chips, scratches and everyday wear and tear.",
    thumb: images.homeWhyChoose.ppf,
    thumbAlt: 'Paint protection film being laid onto a panel',
  },
];

const allFeatures = [leftFeatures[0], rightFeatures[0], leftFeatures[1], rightFeatures[1]];

function FeatureBadge({ feature }: { feature: Feature }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md shadow-ink-950/5">
      {feature.badge ? (
        <span className="text-[10px] font-extrabold tracking-wider text-accent-500">
          {feature.badge}
        </span>
      ) : feature.icon ? (
        <feature.icon className="h-5 w-5 text-accent-500" strokeWidth={1.75} />
      ) : null}
    </span>
  );
}

function FeatureBlock({ feature, side }: { feature: Feature; side: 'left' | 'right' }) {
  const isRight = side === 'right';

  return (
    <div className={`flex flex-col gap-5 ${isRight ? 'items-end text-right' : 'items-start text-left'}`}>
      <div className={`flex items-start gap-3 ${isRight ? 'flex-row-reverse' : ''}`}>
        <FeatureBadge feature={feature} />
        <div className="max-w-[14rem] xl:max-w-[15rem]">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950">{feature.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{feature.desc}</p>
        </div>
      </div>
      <img
        src={feature.thumb}
        alt={feature.thumbAlt}
        className="h-28 w-28 rounded-full object-cover xl:h-32 xl:w-32"
        loading="lazy"
      />
    </div>
  );
}

function ExperienceStat({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <span className="h-8 w-px bg-accent-500/60" aria-hidden />
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md shadow-ink-950/5">
        <Trophy className="h-6 w-6 text-accent-500" strokeWidth={1.75} />
      </span>
      <p className="mt-3 text-2xl font-bold uppercase tracking-tight text-accent-500 sm:text-3xl">
        15+ Years
      </p>
      <p className="text-sm font-bold uppercase tracking-wide text-ink-950">Of Experience</p>
      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ink-500">
        Trusted by thousands of customers across Hobart for quality, care and outstanding results.
      </p>
    </div>
  );
}
*/

export default function WhyChooseFeatures() {
  return (
    <section className="section overflow-hidden bg-white py-14 md:py-16 dark:bg-ink-950">
      <div className="container">
        {/*
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-accent-500">
              <span className="h-px w-7 bg-accent-500" aria-hidden />
              Why Choose Spotless Tinting
              <span className="h-px w-7 bg-accent-500" aria-hidden />
            </p>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-tight text-ink-950 md:text-4xl lg:text-[2.75rem]">
              Excellence in <span className="text-accent-500">Every Detail</span>
            </h2>
            <p className="panel-muted mt-5 text-sm leading-relaxed sm:text-base">
              We combine premium products, expert installation and unmatched attention to detail to
              deliver protection, performance and style you can rely on.
            </p>
          </div>
        </Reveal>
        */}

        <Reveal>
          {/* Light mode: dark artwork on white bg */}
          <img
            src={images.homeWhyChoose.car}
            alt="Why choose Spotless Tinting — lifetime warranty, premium films, precision installation, PPF and 15+ years of experience"
            className="mx-auto w-full max-w-6xl object-contain dark:hidden"
            loading="lazy"
          />
          {/* Dark mode: white artwork on dark bg */}
          <img
            src={images.homeWhyChoose.carDark}
            alt="Why choose Spotless Tinting — lifetime warranty, premium films, precision installation, PPF and 15+ years of experience"
            className="mx-auto hidden w-full max-w-6xl object-contain dark:block"
            loading="lazy"
          />
        </Reveal>

        {/*
        Desktop callouts + mobile feature cards were replaced by the full graphic above.

        <Reveal>
          <div className="mt-10 hidden lg:block">
            <div className="relative">
              <img
                src={images.homeWhyChoose.car}
                alt="Car diagram with lines pointing to the areas Spotless Tinting protects"
                className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                loading="lazy"
              />
              <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] items-center gap-8 xl:gap-12">
                <div className="flex h-full flex-col justify-between gap-12 py-2">
                  {leftFeatures.map((feature) => (
                    <FeatureBlock key={feature.id} feature={feature} side="left" />
                  ))}
                </div>
                <div className="min-h-[26rem] xl:min-h-[30rem]" aria-hidden />
                <div className="flex h-full flex-col justify-between gap-12 py-2">
                  {rightFeatures.map((feature) => (
                    <FeatureBlock key={feature.id} feature={feature} side="right" />
                  ))}
                </div>
              </div>
            </div>
            <ExperienceStat className="-mt-2" />
          </div>
        </Reveal>

        <div className="mt-10 lg:hidden">
          <Reveal>
            <img
              src={images.homeWhyChoose.car}
              alt="Silver sports car detailed by Spotless Tinting"
              className="mx-auto w-full max-w-md object-contain"
              loading="lazy"
            />
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {allFeatures.map((feature, i) => (
              <Reveal key={feature.id} delay={i * 50}>
                <div className="flex items-start gap-4">
                  <img
                    src={feature.thumb}
                    alt={feature.thumbAlt}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-2.5">
                      <FeatureBadge feature={feature} />
                      <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{feature.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <ExperienceStat className="mt-10" />
          </Reveal>
        </div>
        */}
      </div>
    </section>
  );
}
