import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  Gem,
  Lock,
  Shield,
  Sun,
  SunDim,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';

const benefitColumns: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Sun,
    title: 'Heat Reduction',
    desc: 'Helps reduce solar heat entering through the glass.',
  },
  {
    icon: Shield,
    title: 'UV Protection',
    desc: 'Blocks up to 99% of harmful ultraviolet rays.',
  },
  {
    icon: SunDim,
    title: 'Glare Control',
    desc: 'Reduces uncomfortable glare for a more comfortable space.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    desc: 'Enhances privacy for vehicles, homes and businesses.',
  },
  {
    icon: Gem,
    title: 'Appearance',
    desc: 'Improves the look of your glass and property.',
  },
];

const techCallouts: {
  side: 'left' | 'right';
  icon: LucideIcon;
  title: string;
  desc: string;
  top: string;
}[] = [
  {
    side: 'left',
    icon: Sun,
    title: 'Solar Heat Reduced',
    desc: 'Helps reduce solar heat and keep spaces cooler.',
    top: '18%',
  },
  {
    side: 'left',
    icon: Eye,
    title: 'Visible Light Controlled',
    desc: 'Maintain natural light while improving comfort.',
    top: '58%',
  },
  {
    side: 'right',
    icon: Shield,
    title: 'UV Rays Filtered',
    desc: 'Blocks up to 99% of harmful UV rays.',
    top: '12%',
  },
  {
    side: 'right',
    icon: SunDim,
    title: 'Glare Reduced',
    desc: 'Minimises harsh glare for better visibility.',
    top: '42%',
  },
  {
    side: 'right',
    icon: Lock,
    title: 'Privacy Enhanced',
    desc: 'Choose the right film for your privacy needs.',
    top: '72%',
  },
];

function BenefitColumn({
  item,
  showDivider,
}: {
  item: (typeof benefitColumns)[number];
  showDivider: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`flex flex-col items-center px-4 text-center sm:px-6 ${
        showDivider ? 'lg:border-r lg:border-ink-200' : ''
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent-500 text-accent-500">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-950 sm:text-sm">
        {item.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-500 sm:text-sm">{item.desc}</p>
    </div>
  );
}

function FilmDiagram() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-lg">
      <img
        src={images.filmTechnology}
        alt="Window film technology layers diagram"
        loading="lazy"
        className="h-full w-full rounded-xl object-cover opacity-90"
      />
      {/* Dummy overlay — replace with dedicated diagram asset later */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-accent-500/10"
        aria-hidden
      />
    </div>
  );
}

function TechCallout({ item }: { item: (typeof techCallouts)[number] }) {
  const Icon = item.icon;
  const isLeft = item.side === 'left';

  return (
    <div
      className={`absolute hidden w-[200px] xl:w-[220px] lg:block ${
        isLeft ? 'left-0 text-right' : 'right-0 text-left'
      }`}
      style={{ top: item.top }}
    >
      <div className={`flex items-start gap-3 ${isLeft ? 'flex-row-reverse' : ''}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-ink-950">{item.title}</h4>
          <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.desc}</p>
        </div>
      </div>
      <div
        className={`absolute top-5 hidden h-px w-10 bg-accent-400 lg:block ${
          isLeft ? '-right-12' : '-left-12'
        }`}
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #f97316 0, #f97316 4px, transparent 4px, transparent 7px)',
        }}
        aria-hidden
      />
    </div>
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
            {/* Desktop: diagram with callouts */}
            <div className="relative hidden min-h-[380px] lg:block">
              <div className="absolute inset-x-[140px] inset-y-8 xl:inset-x-[160px]">
                <FilmDiagram />
              </div>
              {techCallouts.map((item) => (
                <TechCallout key={item.title} item={item} />
              ))}
            </div>

            {/* Mobile / tablet: stacked callouts + image */}
            <div className="space-y-6 lg:hidden">
              <FilmDiagram />
              <div className="grid gap-4 sm:grid-cols-2">
                {techCallouts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 rounded-xl border border-ink-100 p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-500 text-white">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-ink-950">{item.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
