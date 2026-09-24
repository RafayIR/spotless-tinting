import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileBar from './MobileBar';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white transition-colors duration-300 dark:bg-ink-950">
      <Header />
      {/* pt accounts for fixed header: logo h-11 + py-3 ≈ 4.25rem on mobile */}
      <main className="relative z-10 flex-1 pt-[4.5rem] lg:pt-14">
        <Outlet />
      </main>
      <Footer />
      <div className="h-14 lg:hidden" aria-hidden />
      <MobileBar />
    </div>
  );
}
