import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import "./index.css"

import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
// import ServicesHub from '@/pages/ServicesHub';
// import ServiceDetail from '@/pages/ServiceDetail';
// import GalleryPage from '@/pages/GalleryPage';
// import ProjectDetail from '@/pages/ProjectDetail';
// import ReviewsPage from '@/pages/ReviewsPage';
// import FAQPage from '@/pages/FAQPage';
// import TintAftercare from '@/pages/TintAftercare';
// import WarrantyPage from '@/pages/WarrantyPage';
import ContactPage from '@/pages/Contactpage;
import QuotePage from '@/pages/QuotePage;
import BookPage from '@/pages/BookPage';
// import PrivacyPolicy from '@/pages/PrivacyPolicy';
// import TermsPage from '@/pages/TermsPage';
// import CancellationPolicy from '@/pages/CancellationPolicy';
// import NotFoundPage from '@/pages/NotFoundPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
           <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:slug" element={<ProjectDetail />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/tint-aftercare" element={<TintAftercare />} />
            <Route path="/warranty" element={<WarrantyPage />} /> */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} /> 
            <Route path="/book" element={<BookPage />} />
            {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
