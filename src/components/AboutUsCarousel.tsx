import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { images } from '@/data/images';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = images.aboutUsCarousel.map((src, i) => ({
  src,
  alt: `Spotless Tinting workshop and installation — photo ${i + 1}`,
}));

export default function AboutUsCarousel({ className = '' }: { className?: string }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink-100 ${className}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="about-us-carousel aspect-[4/3] w-full [&_.swiper-pagination-bullet]:bg-white/70 [&_.swiper-pagination-bullet-active]:bg-accent-500"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.src}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/45 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/70"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/45 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/70"
        aria-label="Next photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <p className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-ink-950/50 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-white backdrop-blur-sm">
        {active + 1} / {slides.length}
      </p>
    </div>
  );
}
