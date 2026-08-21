import {
  Car,
  Search,
  Layers,
  Paintbrush,
  CircleCheck,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { images } from '@/data/images';

const steps: {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    num: '01',
    title: 'Customer Arrives',
    desc: 'We take the time to understand your needs and your vehicle.',
    icon: Car,
  },
  {
    num: '02',
    title: 'Vehicle Inspection',
    desc: 'Your vehicle and glass are carefully inspected to ensure the best possible results.',
    icon: Search,
  },
  {
    num: '03',
    title: 'Film Selection',
    desc: 'Choose the perfect film for your style, privacy and performance needs.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Precision Installation',
    desc: 'Our expert installers apply the film with precision and care.',
    icon: Paintbrush,
  },
  {
    num: '05',
    title: 'Quality Inspection',
    desc: 'We thoroughly inspect every detail to ensure flawless results.',
    icon: CircleCheck,
  },
  {
    num: '06',
    title: 'Vehicle Delivery',
    desc: 'Your vehicle is ready. Enjoy the Spotless difference!',
    icon: KeyRound,
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Faded car wireframe background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-[42%] opacity-[0.12] lg:block"
        aria-hidden
      >
        <img
          src={images.carIllustration}
          alt=""
          className="mx-auto h-auto w-[72%] max-w-4xl object-contain"
        />
      </div>

      {/* Desktop horizontal timeline */}
      <div className="relative z-10 hidden lg:block">
        <div className="relative grid grid-cols-6 gap-3 pt-2">
          {/* Connector line through icon centers */}
          <div
            className="absolute left-[8.33%] right-[8.33%] top-[4.75rem] h-px bg-accent-400"
            aria-hidden
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center text-center">
                <span className="text-sm font-bold tracking-wide text-accent-500">{step.num}</span>
                <div className="relative z-10 mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md shadow-ink-950/10">
                  <Icon className="h-6 w-6 text-ink-900" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 text-xs font-bold uppercase tracking-wide text-ink-950 xl:text-sm">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[160px] text-xs leading-relaxed text-ink-500 xl:max-w-[180px] xl:text-[13px]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet stacked */}
      <div className="relative z-10 space-y-0 lg:hidden">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          return (
            <div key={step.num} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-white shadow-md shadow-ink-950/10">
                  <Icon className="h-5 w-5 text-ink-900" strokeWidth={1.6} />
                </div>
                {!isLast && <div className="my-1 w-px flex-1 bg-accent-300" />}
              </div>
              <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                <span className="text-xs font-bold text-accent-500">{step.num}</span>
                <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
