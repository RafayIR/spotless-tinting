import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '@/data/images';

const slides = images.aboutUsCarousel.map((src, i) => ({
  src,
  alt: `Spotless Tinting workshop and installation — photo ${i + 1}`,
}));

const AUTOPLAY_MS = 4000;

export default function AboutUsCarousel({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + total) % total);
  };

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden rounded-2xl bg-ink-100 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {/* Fixed aspect box — images are absolute so intrinsic size cannot stretch the layout */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-out ${
              index === active ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/45 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/70 sm:left-3"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/45 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/70 sm:right-3"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5"
            role="tablist"
            aria-label="About photos"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show photo ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === active ? 'bg-accent-500' : 'bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
