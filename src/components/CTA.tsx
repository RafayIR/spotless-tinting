import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryPath: string;
  secondaryLabel?: string;
  secondaryPath?: string;
  dark?: boolean;
}

export default function CTA({
  title,
  subtitle,
  primaryLabel,
  primaryPath,
  secondaryLabel,
  secondaryPath,
  dark = true,
}: CTAProps) {
  return (
    <section className={`section ${dark ? 'bg-accent-500' : 'bg-accent-50'}`}>
      <div className="container text-center">
        <h2 className={`mx-auto max-w-2xl text-balance text-3xl font-bold md:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-ink-950'}`}>
          {title}
        </h2>
        <p className={`mx-auto mt-4 max-w-xl text-balance text-base md:text-lg ${dark ? 'text-white/90' : 'text-ink-600'}`}>
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={primaryPath} className={`btn w-full sm:w-auto ${dark ? 'bg-white text-accent-600 hover:bg-ink-50' : 'btn-primary'}`}>
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryLabel && secondaryPath && (
            <Link
              to={secondaryPath}
              className={`btn w-full sm:w-auto ${dark ? 'border border-white/40 bg-transparent text-white hover:bg-white/10' : 'btn-outline'}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
