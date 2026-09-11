import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { images } from '@/data/images';
import 'swiper/css';
import 'swiper/css/effect-fade';

type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  isPrimary?: boolean;
};

const slides: HeroSlide[] = [
  {
    id: 'main',
    image: images.homeBanner.slide1,
    imageAlt: 'Professional window tinting and vehicle protection by Spotless Tinting in Hobart',
    eyebrow: 'Car · Home · Commercial',
    title: 'Car, Home & Commercial Window Tinting in Moonah, Hobart',
    subtitle: '360° Film & Protection Solutions — Automotive · Residential · Commercial',
    paragraphs: [
      'Spotless Tinting provides professional window tinting in Hobart, along with paint protection film, vehicle wraps and smart film solutions for vehicles, homes and businesses.',
      'From daily drivers and family homes to offices and shopfronts, we use quality products, careful preparation and precision installation to deliver a clean, professional finish.',
    ],
    primaryCta: { label: 'Get a Free Quote', to: '/quote' },
    secondaryCta: { label: 'Explore Window Tinting', to: '/services' },
    isPrimary: true,
  },
  {
    id: 'automotive',
    image: images.homeBanner.slide2,
    imageAlt: 'Automotive window tinting in Hobart by Spotless Tinting',
    eyebrow: 'Automotive Window Tinting',
    title: 'Car Window Tinting in Hobart',
    paragraphs: [
      'Improve comfort, privacy and protection with professional car window tinting in Hobart. Our premium automotive window films help reduce heat, glare and UV exposure while giving your vehicle a clean, refined finish.',
    ],
    primaryCta: { label: 'Get a Free Quote', to: '/quote' },
    secondaryCta: {
      label: 'Explore Automotive Tinting',
      to: '/services/automotive-window-tinting',
    },
  },
  {
    id: 'residential',
    image: images.homeBanner.slide3,
    imageAlt: 'Residential window tinting in Hobart by Spotless Tinting',
    eyebrow: 'Residential Window Tinting',
    title: 'Residential Window Tinting in Hobart',
    paragraphs: [
      'Create a cooler, more comfortable and private home with professional residential window tinting in Hobart. Our window films help reduce solar heat, glare and UV exposure while maintaining natural light and your view.',
    ],
    primaryCta: { label: 'Get a Free Quote', to: '/quote' },
    secondaryCta: {
      label: 'Explore Residential Tinting',
      to: '/services/residential-window-tinting',
    },
  },
  {
    id: 'commercial',
    image: images.homeBanner.slide4,
    imageAlt: 'Commercial window tinting in Hobart by Spotless Tinting',
    eyebrow: 'Commercial Window Tinting',
    title: 'Commercial Window Tinting in Hobart',
    paragraphs: [
      'Improve comfort, privacy and solar control with professional commercial window tinting in Hobart for offices, shopfronts and workplaces. Choose from solar-control, privacy, frosted and safety window film solutions.',
    ],
    primaryCta: { label: 'Get a Free Quote', to: '/quote' },
    secondaryCta: {
      label: 'Explore Commercial Tinting',
      to: '/services/commercial-window-tinting',
    },
  },
];

function SlideContent({ slide }: { slide: HeroSlide }) {
  const TitleTag = slide.isPrimary ? 'h1' : 'h2';

  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-500">
        {slide.eyebrow}
      </p>
      <TitleTag className="mt-4 text-balance text-4xl font-bold leading-tight !text-ink-950 sm:text-5xl lg:text-[3.1rem]">
        {slide.title}
      </TitleTag>
      {slide.subtitle && (
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-accent-500 sm:text-base">
          {slide.subtitle}
        </p>
      )}
      {slide.paragraphs.map((paragraph, index) => (
        <p
          key={paragraph.slice(0, 32)}
          className={`max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg ${
            index === 0 ? 'mt-5' : 'mt-3'
          }`}
        >
          {paragraph}
        </p>
      ))}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to={slide.primaryCta.to} className="btn-primary">
          {slide.primaryCta.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to={slide.secondaryCta.to}
          className="btn border border-ink-900 bg-white text-ink-950 hover:border-accent-500 hover:text-accent-600"
        >
          {slide.secondaryCta.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function HomeHeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="home-hero-slider relative bg-white">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="h-[calc(100dvh-3rem)] min-h-[560px] max-h-[880px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="!relative !h-full">
            <div className="absolute inset-0" aria-hidden>
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover object-center"
                loading={slide.isPrimary ? 'eager' : 'lazy'}
              />
            </div>
            <div className="container relative z-10 flex h-full flex-col justify-center py-16 lg:py-20">
              <SlideContent slide={slide} />
              <span className="sr-only">{slide.imageAlt}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Always in-viewport bar nav — sits under hero content, not below the fold */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-6 pt-10 sm:pb-8">
        <div className="container">
          <div
            className="pointer-events-auto flex items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-12 bg-accent-500 sm:w-14'
                      : 'w-7 bg-ink-950/20 hover:bg-ink-950/40 sm:w-8'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
