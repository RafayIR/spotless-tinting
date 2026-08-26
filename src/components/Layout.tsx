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
    <div className="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-ink-950">
      <Header />
      <main className="relative z-10 flex-1 pt-16 lg:pt-14">
        <Outlet />
      </main>
      <Footer />
      <div className="h-14 lg:hidden" aria-hidden />
      <MobileBar />
    </div>
  );
}
