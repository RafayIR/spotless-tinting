import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '@/data/services';
import { images } from '@/data/images';

function ShowcaseCard({
  service,
  category,
  cta,
  image,
  featured = false,
}: {
  service: Service;
  category: string;
  cta: string;
  image: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={`service-showcase-card group relative isolate flex min-h-[240px] overflow-hidden rounded-2xl border border-ink-100 bg-[#f7f7f8] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-xl hover:shadow-ink-950/5 dark:border-ink-700 dark:bg-ink-900 dark:hover:border-accent-500/40 dark:hover:shadow-black/30 ${
        featured ? 'lg:col-span-3 lg:min-h-[300px]' : 'lg:col-span-2 lg:min-h-[230px]'
      }`}
    >
      <div
        className={`relative z-10 flex w-[55%] flex-col justify-between bg-[#f7f7f8] p-6 dark:bg-ink-900 sm:p-7 ${
          featured ? 'lg:w-[48%] lg:p-8' : ''
        }`}
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-500 dark:text-accent-400">
            {category}
          </span>
          <h3
            className={`mt-3 max-w-[240px] font-display font-semibold leading-[1.1] text-ink-950 dark:text-white ${
              featured ? 'text-2xl sm:text-[1.7rem]' : 'text-lg sm:text-xl'
            }`}
          >
            {service.name === 'Paint Protection Film'
              ? 'Paint Protection Film (PPF)'
              : service.name}
          </h3>
          <p
            className={`mt-3 max-w-[260px] leading-relaxed text-ink-600 dark:text-ink-300 ${
              featured ? 'text-sm sm:text-[15px]' : 'text-sm'
            }`}
          >
            {service.shortDescription}
          </p>
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-ink-900 transition-colors group-hover:text-accent-600 dark:text-ink-200 dark:group-hover:text-accent-400">
          {cta}
          <ArrowRight className="h-4 w-4 text-accent-500 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_28%)]">
        <img
          src={image}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 dark:brightness-90"
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
        image={images.homeVehicleServices.automotive}
        featured
      />
      <ShowcaseCard
        service={ppf}
        category="Protect"
        cta="Explore PPF"
        image={images.homeVehicleServices.ppf}
        featured
      />
      <ShowcaseCard
        service={residential}
        category="Residential"
        cta="Explore Residential"
        image={images.homeVehicleServices.residential}
      />
      <ShowcaseCard
        service={commercial}
        category="Commercial"
        cta="Explore Commercial"
        image={images.homeVehicleServices.commercial}
      />
      <ShowcaseCard
        service={wrapping}
        category="Vehicle Wraps"
        cta="Explore Wraps"
        image={images.homeVehicleServices.wrapping}
      />
    </div>
  );
}
