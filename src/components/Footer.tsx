import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import Logo from '@/components/Logo';
import { business } from '@/data/business';
import { services } from '@/data/services';

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50 text-ink-600">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + NAP */}
          <div>
            <Logo className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              Premium automotive, residential and commercial window tinting, PPF and vehicle wrapping in Moonah, Hobart.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent-500" />
                <a href={business.phoneHref} className="hover:text-accent-600">{business.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent-500" />
                <a href={business.emailHref} className="hover:text-accent-600">{business.email}</a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-900">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-accent-600">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent-600">About</Link></li>
              <li><Link to="/services" className="hover:text-accent-600">Services</Link></li>
              <li><Link to="/gallery" className="hover:text-accent-600">Our Work</Link></li>
              <li><Link to="/reviews" className="hover:text-accent-600">Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-accent-600">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-accent-600">Contact</Link></li>
              <li><Link to="/book" className="hover:text-accent-600">Book Now</Link></li>
              <li><Link to="/quote" className="font-semibold text-accent-600 hover:text-accent-700">Get a Free Quote</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-900">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="hover:text-accent-600">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + Legal + Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-900">Business Hours</h3>
            <ul className="mt-4 space-y-1.5 text-sm">
              {business.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-2">
                  <span className="text-ink-500">{h.day}</span>
                  <span>{h.hours}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-900">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-accent-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent-600">Terms &amp; Conditions</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-accent-600">Cancellation Policy</Link></li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href={business.social.facebook} aria-label="Facebook" className="rounded-full bg-white p-2.5 text-ink-500 ring-1 ring-ink-200 hover:bg-accent-500 hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={business.social.instagram} aria-label="Instagram" className="rounded-full bg-white p-2.5 text-ink-500 ring-1 ring-ink-200 hover:bg-accent-500 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-200 pt-6 text-xs text-ink-400">
          <p>&copy; {new Date().getFullYear()} {business.name}. All rights reserved. ABN [BUSINESS ABN].</p>
        </div>
      </div>
    </footer>
  );
}
