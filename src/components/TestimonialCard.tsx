import { Star } from 'lucide-react';
import type { Review } from '@/data/reviews';

function shortName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

function initials(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName.slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function TestimonialCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? 'fill-accent-500 text-accent-500' : 'text-ink-200'}`}
          />
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
        &ldquo;{review.review}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-100 text-xs font-bold text-ink-600"
          aria-hidden
        >
          {initials(review.customerName)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-950">{shortName(review.customerName)}</p>
          <p className="text-xs text-ink-400">{review.location ?? 'Hobart'}</p>
        </div>
      </div>
    </article>
  );
}
