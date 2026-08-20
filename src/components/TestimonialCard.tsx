import { Star, Quote } from 'lucide-react';
import type { Review } from '@/data/reviews';

export default function TestimonialCard({ review }: { review: Review }) {
  return (
    <div className="card-surface flex flex-col p-6">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? 'fill-accent-500 text-accent-500' : 'text-ink-200'}`}
          />
        ))}
      </div>
      <Quote className="mt-4 h-7 w-7 text-ink-100" />
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{review.review}</p>
      <div className="mt-5 border-t border-ink-100 pt-4">
        <p className="text-sm font-semibold text-ink-900">{review.customerName}</p>
        <p className="text-xs text-ink-500">
          {review.service} &middot; {review.source}
        </p>
      </div>
    </div>
  );
}
