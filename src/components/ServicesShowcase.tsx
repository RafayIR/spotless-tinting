import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '@/data/services';

function ShowcaseCard({
  service,
  category,
  cta,
  featured = false,
}: {
  service: Service;
  category: string;
  cta: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group relative isolate flex min-h-[240px] overflow-hidden rounded-2xl border border-ink-100 bg-[#f7f7f8] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-xl hover:shadow-ink-950/5 ${
        featured ? 'lg:col-span-3 lg:min-h-[300px]' : 'lg:col-span-2 lg:min-h-[230px]'
      }`}
    >
      <div
        className={`relative z-10 flex w-[55%] flex-col justify-between p-6 sm:p-7 ${
          featured ? 'lg:w-[48%] lg:p-8' : ''
        }`}
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-500">
            {category}
          </span>
          <h3
            className={`mt-3 max-w-[240px] font-display font-semibold leading-[1.1] text-ink-950 ${
              featured ? 'text-2xl sm:text-[1.7rem]' : 'text-lg sm:text-xl'
            }`}
          >
            {service.name === 'Paint Protection Film'
              ? 'Paint Protection Film (PPF)'
              : service.name}
          </h3>
          <p
            className={`mt-3 max-w-[260px] leading-relaxed text-ink-600 ${
              featured ? 'text-sm sm:text-[15px]' : 'text-sm'
            }`}
          >
            {service.shortDescription}
          </p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-ink-900 transition-colors group-hover:text-accent-600">
          {cta}
          <ArrowRight className="h-4 w-4 text-accent-500 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_28%)]">
        <img
          src={service.heroImage}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

export default function ServicesShowcase({ services }: { services: Service[] }) {
  const byId = (id: string) => services.find((s) => s.id === id)!;

  const automotive = byId('automotive');
  const ppf = byId('ppf');
  const residential = byId('residential');
  const commercial = byId('commercial');
  const wrapping = byId('wrapping');

  return (
    <div className="grid gap-4 lg:grid-cols-6">
      <ShowcaseCard
        service={automotive}
        category="Automotive"
        cta="Explore Car Tinting"
        featured
      />
      <ShowcaseCard service={ppf} category="Protect" cta="Explore PPF" featured />
      <ShowcaseCard service={residential} category="Residential" cta="Explore Residential" />
      <ShowcaseCard service={commercial} category="Commercial" cta="Explore Commercial" />
      <ShowcaseCard service={wrapping} category="Vehicle Wraps" cta="Explore Wraps" />
    </div>
  );
}
