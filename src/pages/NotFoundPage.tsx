import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import SEO from '@/components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Spotless Tinting"
        description="The page you requested could not be found."
        path="/404"
      />
      <section className="section flex min-h-[60vh] items-center bg-white dark:bg-ink-950">
        <div className="container text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-500">404</p>
          <h1 className="mt-3 text-4xl font-bold text-ink-950 dark:text-white md:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-ink-600 dark:text-ink-300">
            That link doesn&apos;t exist or may have moved. Head back home or request a free quote.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
