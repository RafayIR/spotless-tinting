import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Sun, Moon } from 'lucide-react';
import Logo from '@/components/Logo';
import { navLinks, business } from '@/data/business';
import { services } from '@/data/services';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const servicesActive =
    location.pathname === '/services' || location.pathname.startsWith('/services/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const headerBg = isDark
    ? scrolled
      ? 'border-white/10 bg-ink-950/95 py-2 shadow-sm backdrop-blur-md'
      : 'border-transparent bg-ink-950 py-3.5'
    : scrolled
      ? 'border-ink-100 bg-white/95 py-2 shadow-sm backdrop-blur-md'
      : 'border-transparent bg-white py-3.5';

  const brandMain = isDark ? 'text-white' : 'text-ink-950';
  const navIdle = isDark ? 'text-ink-300 hover:text-accent-400' : 'text-ink-700 hover:text-accent-600';
  const navActive = isDark ? 'text-accent-400' : 'text-accent-600';
  const callClass = isDark
    ? 'text-ink-300 hover:text-accent-400'
    : 'text-ink-700 hover:text-accent-600';
  const menuBtn = isDark ? 'text-white' : 'text-ink-900';
  // Explicit colors — avoid dark: variants so light-mode text never stays white
  const outlineBtn = isDark
    ? 'btn border border-white/30 bg-transparent text-white hover:bg-white/10'
    : 'btn border border-ink-300 bg-transparent text-ink-950 hover:border-accent-500 hover:bg-accent-50';
  const themeBtn = isDark
    ? 'rounded-full border border-white/20 p-2 text-ink-200 hover:bg-white/10 hover:text-white'
    : 'rounded-full border border-ink-200 p-2 text-ink-700 hover:bg-ink-50 hover:text-ink-950';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${headerBg}`}>
      <div className="container flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-1.5" aria-label="Spotless Tinting home">
          <Logo className="h-9 w-auto sm:h-10" asLink={false} />
          <span className={`font-display text-xl font-bold tracking-tight ${brandMain}`}>Spotless</span>
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
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    servicesActive ? navActive : navIdle
                  }`}
                  aria-expanded={servicesOpen}
                  aria-current={servicesActive ? 'page' : undefined}
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full w-64 pt-2">
                    <div
                      className={`overflow-hidden rounded-xl py-2 shadow-xl ${
                        isDark
                          ? 'border border-ink-800 bg-ink-900'
                          : 'border border-ink-100 bg-white'
                      }`}
                    >
                      <Link
                        to="/services"
                        className={`block px-4 py-2.5 text-sm font-semibold ${
                          location.pathname === '/services'
                            ? isDark
                              ? 'bg-ink-800 text-accent-400'
                              : 'bg-accent-50 text-accent-600'
                            : isDark
                              ? 'text-white hover:bg-ink-800 hover:text-accent-400'
                              : 'text-ink-950 hover:bg-accent-50 hover:text-accent-600'
                        }`}
                      >
                        All Services
                      </Link>
                      <div className={`my-1 border-t ${isDark ? 'border-ink-800' : 'border-ink-100'}`} />
                      {services.map((s) => {
                        const href = `/services/${s.slug}`;
                        const active = location.pathname === href;
                        return (
                          <Link
                            key={s.id}
                            to={href}
                            className={`block px-4 py-2.5 text-sm ${
                              active
                                ? isDark
                                  ? 'bg-ink-800 text-accent-400'
                                  : 'bg-accent-50 text-accent-600'
                                : isDark
                                  ? 'text-ink-300 hover:bg-ink-800 hover:text-accent-400'
                                  : 'text-ink-600 hover:bg-accent-50 hover:text-accent-600'
                            }`}
                          >
                            {s.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? navActive : navIdle
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Desktop CTAs + theme toggle (last on the right) */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={business.phoneHref} className={`flex items-center gap-1.5 text-sm font-medium ${callClass}`}>
            <Phone className="h-4 w-4" />
            Call
          </a>
          <Link to="/book" className={outlineBtn}>
            Book Now
          </Link>
          <Link to="/quote" className="btn-primary">
            Get a Free Quote
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className={themeBtn}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile: theme + menu */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className={themeBtn}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className={`rounded-lg p-2 ${menuBtn}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden ${
            isDark ? 'border-t border-ink-800 bg-ink-950' : 'border-t border-ink-100 bg-white'
          }`}
        >
          <div className="container max-h-[calc(100vh-64px)] overflow-y-auto pb-6 pt-2">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.path}>
                    <div className="flex items-center">
                      <Link
                        to={link.path}
                        className={`flex-1 rounded-lg px-3 py-3 text-base font-medium ${
                          servicesActive
                            ? 'text-accent-500'
                            : isDark
                              ? 'text-white'
                              : 'text-ink-900'
                        }`}
                        aria-current={servicesActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                      <button
                        className={`rounded-lg p-3 ${isDark ? 'text-white' : 'text-ink-900'}`}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-label="Toggle services submenu"
                        aria-expanded={mobileServicesOpen}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    {mobileServicesOpen && (
                      <div
                        className={`ml-3 flex flex-col gap-0.5 border-l pl-3 ${
                          isDark ? 'border-ink-700' : 'border-ink-200'
                        }`}
                      >
                        <Link
                          to="/services"
                          className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                            location.pathname === '/services'
                              ? 'text-accent-500'
                              : 'text-accent-500/80'
                          }`}
                        >
                          All Services
                        </Link>
                        {services.map((s) => {
                          const href = `/services/${s.slug}`;
                          const active = location.pathname === href;
                          return (
                            <Link
                              key={s.id}
                              to={href}
                              className={`rounded-lg px-3 py-2.5 text-sm ${
                                active
                                  ? 'font-semibold text-accent-500'
                                  : isDark
                                    ? 'text-ink-300 hover:text-accent-400'
                                    : 'text-ink-600 hover:text-accent-600'
                              }`}
                            >
                              {s.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-3 text-base font-medium ${
                        isActive
                          ? 'text-accent-500'
                          : isDark
                            ? 'text-ink-300 hover:text-accent-400'
                            : 'text-ink-700 hover:text-accent-600'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
            </nav>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link to="/quote" className="btn-primary w-full">
                Get a Free Quote
              </Link>
              <Link to="/book" className={`${outlineBtn} w-full`}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
