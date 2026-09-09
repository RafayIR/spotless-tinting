import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: ensure content becomes visible after 1.5s even if observer fails
    const fallback = setTimeout(() => setVisible(true), 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      // `.reveal` must stay on the element: the shown state is styled as
      // `.reveal.is-visible`, so both classes have to be present together.
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      // The reveal is a transition, not a keyframe animation, so the stagger
      // has to be a transition-delay.
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
