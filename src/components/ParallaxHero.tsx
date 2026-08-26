import { useEffect, useRef, useState, type ReactNode } from 'react';

type ParallaxHeroProps = {
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  children: ReactNode;
  className?: string;
};

export default function ParallaxHero({
  imageSrc,
  imageAlt,
  imageClassName = 'object-cover object-[70%_center]',
  children,
  className = 'relative flex min-h-[100vh] items-center',
}: ParallaxHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [showFixedBg, setShowFixedBg] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [useFixedBg, setUseFixedBg] = useState(true);

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMedia = window.matchMedia('(max-width: 1023px)');

    const applyPreferences = () => {
      setReducedMotion(motionMedia.matches);
      setUseFixedBg(!motionMedia.matches && !mobileMedia.matches);
    };

    applyPreferences();
    motionMedia.addEventListener('change', applyPreferences);
    mobileMedia.addEventListener('change', applyPreferences);

    return () => {
      motionMedia.removeEventListener('change', applyPreferences);
      mobileMedia.removeEventListener('change', applyPreferences);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current) return;
      const { top, height, bottom } = sectionRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      setProgress(Math.min(1, scrolled / height));
      setShowFixedBg(bottom > 0);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, [reducedMotion]);

  const contentOpacity = reducedMotion ? 1 : 1 - progress * 0.85;
  const contentShift = reducedMotion ? 0 : progress * -48;
  const imageScale = reducedMotion ? 1 : 1 + progress * 0.08;

  const backgroundLayers = (
    <>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`h-full w-full origin-center ${imageClassName}`}
        style={
          reducedMotion
            ? undefined
            : { transform: `scale(${imageScale})` }
        }
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/10" />
    </>
  );

  return (
    <>
      {/* Fixed background — stays in place while page scrolls over it (desktop) */}
      {useFixedBg && showFixedBg && (
        <div
          className="pointer-events-none fixed inset-0 z-0 h-screen w-full overflow-hidden transition-opacity duration-300"
          style={{ opacity: 1 - progress * 0.15 }}
          aria-hidden
        >
          {backgroundLayers}
        </div>
      )}

      <section ref={sectionRef} className={className}>
        {/* Static background fallback for mobile / reduced motion */}
        {!useFixedBg && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            {backgroundLayers}
          </div>
        )}

        <div
          className="container relative z-10 py-24 lg:py-28"
          style={
            reducedMotion
              ? undefined
              : {
                  opacity: contentOpacity,
                  transform: `translate3d(0, ${contentShift}px, 0)`,
                }
          }
        >
          {children}
        </div>
      </section>
    </>
  );
}
