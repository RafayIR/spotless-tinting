import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { navLinks, business } from '@/data/business';
import { services } from '@/data/services';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled
          ? 'border-ink-100 bg-white/95 py-2 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-white py-3.5'
        }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Spotless Tinting home">
          <span className="font-display text-xl font-bold tracking-tight text-ink-950">Spotless</span>
          <span className="font-display text-xl font-light tracking-tight text-accent-500">Tinting</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-accent-600"
                  aria-expanded={servicesOpen}
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute left-0 top-full w-64 pt-2">
                    <div className="overflow-hidden rounded-xl border border-ink-100 bg-white py-2 shadow-xl">
                      <Link
                        to="/services"
                        className="block px-4 py-2.5 text-sm font-semibold text-ink-950 hover:bg-accent-50 hover:text-accent-600"
                      >
                        All Services
                      </Link>
                      <div className="my-1 border-t border-ink-100" />
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.slug}`}
                          className="block px-4 py-2.5 text-sm text-ink-600 hover:bg-accent-50 hover:text-accent-600"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? 'text-accent-600' : 'text-ink-700 hover:text-accent-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.phoneHref}
            className="flex items-center gap-1.5 text-sm font-medium text-ink-700 hover:text-accent-600"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <Link to="/book" className="btn-outline">
            Book Now
          </Link>
          <Link to="/quote" className="btn-primary">
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-ink-900 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <div className="container max-h-[calc(100vh-64px)] overflow-y-auto pb-6 pt-2">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.path}>
                    <button
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink-900"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      aria-expanded={mobileServicesOpen}
                    >
                      {link.label}
                      <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="ml-3 flex flex-col gap-0.5 border-l border-ink-200 pl-3">
                        <Link to="/services" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-accent-600">
                          All Services
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.id}
                            to={`/services/${s.slug}`}
                            className="rounded-lg px-3 py-2.5 text-sm text-ink-600 hover:text-accent-600"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'text-accent-600' : 'text-ink-700 hover:text-accent-600'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link to="/quote" className="btn-primary w-full">
                Get a Free Quote
              </Link>
              <Link to="/book" className="btn-outline w-full">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
