import { Link } from 'react-router-dom';
import { Phone, Calendar, FileText } from 'lucide-react';
import { business } from '@/data/business';

export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-ink-100 bg-white/95 backdrop-blur-md shadow-lg lg:hidden">
      <a
        href={business.phoneHref}
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-700"
      >
        <Phone className="h-5 w-5" />
        Call
      </a>
      <Link
        to="/quote"
        className="flex flex-col items-center gap-0.5 border-x border-ink-100 bg-accent-500 py-2.5 text-xs font-semibold text-white"
      >
        <FileText className="h-5 w-5" />
        Get Quote
      </Link>
      <Link
        to="/book"
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium text-ink-700"
      >
        <Calendar className="h-5 w-5" />
        Book
      </Link>
    </div>
  );
}
