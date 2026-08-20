import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/data/services';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-ink-900/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-ink-950">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
