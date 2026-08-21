import { ShieldCheck, Crosshair, Layers, Gem } from 'lucide-react';
import { images } from '@/data/images';
import Reveal from '@/components/Reveal';

type Feature = {
  id: string;
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
  /** Desktop card placement */
  cardClass: string;
  align: 'left' | 'right' | 'center';
  /** Hotspot on the car diagram (%) */
  spot: { left: string; top: string };
};

const features: Feature[] = [
  {
    id: 'warranty',
    icon: ShieldCheck,
    title: 'Lifetime Warranty',
    desc: 'We stand behind our work with industry-leading lifetime warranty for complete peace of mind.',
    cardClass: 'lg:left-0 lg:top-[2%] lg:w-[250px] xl:w-[270px]',
    align: 'left',
    spot: { left: '44%', top: '30%' },
  },
  {
    id: 'precision',
    icon: Crosshair,
    title: 'Precision Installation',
    desc: 'Expert installation with meticulous attention to detail and flawless finishes every time.',
    cardClass: 'lg:left-0 lg:top-[38%] lg:w-[250px] xl:w-[270px]',
    align: 'left',
    spot: { left: '30%', top: '50%' },
  },
  {
    id: 'films',
    icon: Layers,
    title: 'Premium Window Films',
    desc: 'High-performance window films that reduce heat, block UV rays and enhance privacy and comfort.',
    cardClass: 'lg:right-0 lg:top-[2%] lg:w-[250px] xl:w-[270px]',
    align: 'right',
    spot: { left: '60%', top: '36%' },
  },
  {
    id: 'ppf',
    icon: ShieldCheck,
    title: 'Paint Protection Film',
    desc: "Advanced PPF protects your vehicle's paintwork from stone chips, scratches and everyday wear and tear.",
    cardClass: 'lg:right-0 lg:top-[42%] lg:w-[250px] xl:w-[270px]',
    align: 'right',
    spot: { left: '74%', top: '60%' },
  },
  {
    id: 'detail',
    icon: Gem,
    title: 'Attention to Detail',
    desc: 'From preparation to the final inspection, we focus on the small details that make a big difference.',
    cardClass: 'lg:top-[78%] lg:left-1/2 lg:w-[280px] lg:-translate-x-1/2',
    align: 'center',
    spot: { left: '46%', top: '68%' },
  },
];

/** Approximate card anchor points (%) for dashed connectors */
const lineAnchors: Record<string, { x: number; y: number }> = {
  warranty: { x: 24, y: 14 },
  precision: { x: 24, y: 48 },
  films: { x: 76, y: 14 },
  ppf: { x: 76, y: 52 },
  detail: { x: 46, y: 78 },
};

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const isRight = feature.align === 'right';
  const isCenter = feature.align === 'center';

  return (
    <div
      className={`flex gap-3 ${isRight ? 'flex-row-reverse' : ''} ${
        isCenter ? 'flex-col items-center' : 'items-start'
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md shadow-ink-950/5">
        {feature.id === 'ppf' ? (
          <span className="text-[10px] font-extrabold tracking-wider text-accent-500">PPF</span>
        ) : (
          <Icon className="h-5 w-5 text-accent-500" strokeWidth={1.75} />
        )}
      </div>
      <div className={isCenter ? 'text-center' : isRight ? 'text-right' : 'text-left'}>
        <h3 className="text-sm font-bold uppercase tracking-wide text-ink-950">{feature.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{feature.desc}</p>
      </div>
    </div>
  );
}

export default function WhyChooseFeatures() {
  return (
    <section className="section overflow-hidden bg-[#fafafa]">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why Choose Spotless Tinting</span>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl lg:text-[2.75rem]">
              Excellence in Every Detail
            </h2>
            <p className="mt-5 text-ink-600">
              We combine premium products, expert installation and unmatched attention to detail to
              deliver protection, performance and style you can rely on.
            </p>
          </div>
        </Reveal>

        {/* Mobile / tablet */}
        <div className="mt-12 lg:hidden">
          <Reveal>
            <div className="relative mx-auto max-w-lg">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 top-1/3 opacity-40"
                aria-hidden
                style={{
                  backgroundImage:
                    'repeating-radial-gradient(ellipse 60% 35% at 50% 80%, #d4d8dd 0, #d4d8dd 1px, transparent 1px, transparent 40px)',
                  maskImage: 'radial-gradient(ellipse 65% 50% at 50% 75%, black, transparent)',
                }}
              />
              <img
                src={images.carIllustration}
                alt="Technical wireframe illustration of a sports car"
                className="relative z-10 mx-auto w-full max-w-md object-contain"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {features.map((feature, i) => (
              <Reveal key={feature.id} delay={i * 60}>
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Desktop hotspot layout */}
        <Reveal delay={80}>
          <div className="relative mx-auto mt-14 hidden aspect-[16/11] max-w-6xl lg:block">
            {/* Floor rings */}
            <div
              className="pointer-events-none absolute inset-x-[10%] bottom-[6%] top-[22%] opacity-45"
              aria-hidden
              style={{
                backgroundImage:
                  'repeating-radial-gradient(ellipse 52% 26% at 50% 70%, #c8cdd4 0, #c8cdd4 1px, transparent 1px, transparent 38px)',
                maskImage: 'radial-gradient(ellipse 58% 42% at 50% 68%, black 15%, transparent 72%)',
              }}
            />

            {/* Car */}
            <div className="absolute inset-[10%_20%_14%_20%] z-10 flex items-center justify-center">
              <img
                src={images.carIllustration}
                alt="Technical wireframe illustration of a sports car"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Dashed connectors */}
            <svg
              className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {features.map((f) => {
                const from = lineAnchors[f.id];
                const toX = parseFloat(f.spot.left);
                const toY = parseFloat(f.spot.top);
                return (
                  <line
                    key={`line-${f.id}`}
                    x1={from.x}
                    y1={from.y}
                    x2={toX}
                    y2={toY}
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.85"
                  />
                );
              })}
            </svg>

            {/* Hotspots */}
            {features.map((f) => (
              <span
                key={`spot-${f.id}`}
                className="absolute z-30 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 ring-[5px] ring-accent-500/20"
                style={{ left: f.spot.left, top: f.spot.top }}
                aria-hidden
              />
            ))}

            {/* Feature cards */}
            {features.map((f) => (
              <div key={f.id} className={`absolute z-40 ${f.cardClass}`}>
                <FeatureCard feature={f} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
