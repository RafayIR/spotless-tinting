
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '@/data/services';

function ShowcaseCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group relative isolate flex min-h-[250px] overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-white via-white to-accent-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-xl hover:shadow-accent-900/10 ${
        featured ? 'lg:col-span-3 lg:min-h-[310px]' : 'lg:col-span-2'
      }`}
    >
      <div className={`relative z-10 flex w-[56%] flex-col justify-between p-6 sm:p-8 ${featured ? 'lg:w-[48%]' : ''}`}>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-600">
            {featured && service.id === 'ppf' ? 'Protect' : service.name.split(' ')[0]}
          </span>
          <h3 className={`mt-3 max-w-[230px] font-display font-semibold leading-[1.08] text-ink-950 ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {service.name}
          </h3>
          <p className={`mt-4 max-w-[255px] text-sm leading-relaxed text-ink-600 ${featured ? 'sm:text-base' : ''}`}>
            {service.shortDescription}
          </p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-ink-900 transition-colors group-hover:text-accent-600">
          {featured && service.id === 'automotive' ? 'Explore Car Tinting' : `Explore ${service.name.replace(' Window Tinting', '').replace('Paint Protection Film', 'PPF')}`}
          <ArrowRight className="h-4 w-4 text-accent-500 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 w-[62%] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_35%)]">
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
  const [automotive, ppf, residential, commercial, wrapping] = services;

  return (
    <div className="grid gap-4 lg:grid-cols-6">
      <ShowcaseCard service={automotive} featured />
      <ShowcaseCard service={ppf} featured />
      <ShowcaseCard service={residential} />
      <ShowcaseCard service={commercial} />
      <ShowcaseCard service={wrapping} />
    </div>
  );
}
