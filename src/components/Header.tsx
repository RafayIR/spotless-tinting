import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { navItems, type NavItem } from '@/data/business';
import { useTheme } from '@/context/ThemeContext';

function isNavItemActive(item: NavItem, pathname: string, hash: string) {
  if (item.path.includes('#')) {
    const [base, anchor] = item.path.split('#');
    return pathname === base && hash === `#${anchor}`;
  }

  if (item.matchPaths?.length) {
    return item.matchPaths.some(
      (p) => pathname === p || (p !== '/services' && pathname.startsWith(`${p}/`)),
    );
  }

  if (item.path === '/') return pathname === '/';
  return pathname === item.path;
}

function isDropdownChildActive(item: NavItem, pathname: string) {
  return item.dropdown?.some((child) => {
    if (child.path.includes('#')) return false;
    return pathname === child.path;
  });
}

function NavItemLink({
  item,
  isActive,
  isDark,
  onClick,
  className = '',
}: {
  item: NavItem;
  isActive: boolean;
  isDark: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const idle = isDark ? 'text-white/90 hover:text-accent-400' : 'text-ink-800 hover:text-accent-600';
  const active = 'text-accent-500';

  return (
    <Link
      to={item.path}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`group relative inline-flex items-center gap-1 px-2 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors xl:px-2.5 xl:text-xs ${
        isActive ? active : idle
      } ${className}`}
    >
      <span>{item.label}</span>
      {isActive && (
        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent-500" aria-hidden />
      )}
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname, location.hash]);

  const headerBg = isDark
    ? scrolled
      ? 'border-white/10 bg-ink-950/95 py-2 shadow-sm backdrop-blur-md'
      : 'border-transparent bg-ink-950 py-3'
    : scrolled
      ? 'border-ink-100 bg-white/95 py-2 shadow-sm backdrop-blur-md'
      : 'border-transparent bg-white py-3';

  const themeBtn = isDark
    ? 'rounded-full border border-white/20 p-2 text-ink-200 hover:bg-white/10 hover:text-white'
    : 'rounded-full border border-ink-200 p-2 text-ink-700 hover:bg-ink-50 hover:text-ink-950';
  const menuBtn = isDark ? 'text-white' : 'text-ink-900';

  const renderDropdown = (item: NavItem, mobile = false) => {
    const isOpen = mobile ? mobileDropdown === item.label : openDropdown === item.label;
    const isActive =
      isNavItemActive(item, location.pathname, location.hash) ||
      isDropdownChildActive(item, location.pathname);

    if (mobile) {
      return (
        <div key={item.label}>
          <div className="flex items-center">
            <Link
              to={item.path}
              className={`flex-1 rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide ${
                isActive ? 'text-accent-500' : isDark ? 'text-white' : 'text-ink-900'
              }`}
            >
              {item.label}
            </Link>
            <button
              type="button"
              className={`rounded-lg p-3 ${isDark ? 'text-white' : 'text-ink-900'}`}
              onClick={() => setMobileDropdown(isOpen ? null : item.label)}
              aria-label={`Toggle ${item.label} submenu`}
              aria-expanded={isOpen}
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {isOpen && item.dropdown && (
            <div
              className={`ml-3 flex flex-col gap-0.5 border-l pl-3 ${
                isDark ? 'border-ink-700' : 'border-ink-200'
              }`}
            >
              {item.dropdown.map((child) => {
                const childActive =
                  !child.path.includes('#') && location.pathname === child.path;
                return (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`rounded-lg px-3 py-2.5 text-sm ${
                      childActive
                        ? 'font-semibold text-accent-500'
                        : isDark
                          ? 'text-ink-300 hover:text-accent-400'
                          : 'text-ink-600 hover:text-accent-600'
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => setOpenDropdown(item.label)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <Link
          to={item.path}
          aria-expanded={isOpen}
          aria-current={isActive ? 'page' : undefined}
          className={`group relative inline-flex items-center gap-1 px-2 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors xl:px-2.5 xl:text-xs ${
            isActive
              ? 'text-accent-500'
              : isDark
                ? 'text-white/90 hover:text-accent-400'
                : 'text-ink-800 hover:text-accent-600'
          }`}
        >
          <span>{item.label}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          {isActive && (
            <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent-500" aria-hidden />
          )}
        </Link>
        {isOpen && item.dropdown && (
          <div className="absolute left-0 top-full w-64 pt-2">
            <div
              className={`overflow-hidden rounded-xl py-2 shadow-xl ${
                isDark ? 'border border-ink-800 bg-ink-900' : 'border border-ink-100 bg-white'
              }`}
            >
              {item.dropdown.map((child) => {
                const childActive =
                  !child.path.includes('#') && location.pathname === child.path;
                return (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={`block px-4 py-2.5 text-sm ${
                      childActive
                        ? isDark
                          ? 'bg-ink-800 text-accent-400'
                          : 'bg-accent-50 text-accent-600'
                        : isDark
                          ? 'text-ink-300 hover:bg-ink-800 hover:text-accent-400'
                          : 'text-ink-600 hover:bg-accent-50 hover:text-accent-600'
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${headerBg}`}>
      <div className="container flex items-center justify-between gap-3">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Spotless Tinting home">
          <Logo className="h-11 w-auto sm:h-12" asLink={false} />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navItems.map((item) =>
            item.dropdown ? (
              renderDropdown(item)
            ) : (
              <NavItemLink
                key={item.label}
                item={item}
                isActive={isNavItemActive(item, location.pathname, location.hash)}
                isDark={isDark}
              />
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/quote" className="btn-primary px-4 py-2.5 text-[11px] uppercase tracking-wide xl:px-5 xl:text-xs">
            Get a Free Quote
            <ArrowRight className="h-3.5 w-3.5" />
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
            type="button"
            className={`rounded-lg p-2 ${menuBtn}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`lg:hidden ${
            isDark ? 'border-t border-ink-800 bg-ink-950' : 'border-t border-ink-100 bg-white'
          }`}
        >
          <div className="container max-h-[calc(100vh-64px)] overflow-y-auto pb-6 pt-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.dropdown ? (
                  renderDropdown(item, true)
                ) : (
                  <NavItemLink
                    key={item.label}
                    item={item}
                    isActive={isNavItemActive(item, location.pathname, location.hash)}
                    isDark={isDark}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm"
                  />
                ),
              )}
            </nav>
            <div className="mt-4">
              <Link to="/quote" className="btn-primary w-full uppercase tracking-wide" onClick={() => setMobileOpen(false)}>
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
