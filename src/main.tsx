import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import "./index.css"

import { ThemeProvider } from '@/context/ThemeContext';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesHubPage from '@/pages/ServicesHubPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import GalleryPage from '@/pages/GalleryPage';
// import ProjectDetail from '@/pages/ProjectDetail';
// import ReviewsPage from '@/pages/ReviewsPage';
// import FAQPage from '@/pages/FAQPage';
// import TintAftercare from '@/pages/TintAftercare';
// import WarrantyPage from '@/pages/WarrantyPage';
import ContactPage from '@/pages/Contactpage';
import QuotePage from '@/pages/QuotePage';
import BookPage from '@/pages/BookPage';
import FilmSimulatorPage from '@/pages/FilmSimulatorPage';
import NotFoundPage from '@/pages/NotFoundPage';
// import PrivacyPolicy from '@/pages/PrivacyPolicy';
// import TermsPage from '@/pages/TermsPage';
// import CancellationPolicy from '@/pages/CancellationPolicy';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesHubPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              {/* <Route path="/gallery/:slug" element={<ProjectDetail />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/tint-aftercare" element={<TintAftercare />} />
              <Route path="/warranty" element={<WarrantyPage />} /> */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/film-simulator" element={<FilmSimulatorPage />} />
              {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} /> */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
