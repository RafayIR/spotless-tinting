import { useEffect, useId, useRef, useState } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          size?: 'normal' | 'compact';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    ___grecaptcha_cfg?: unknown;
  }
}

type Props = {
  onChange: (token: string | null) => void;
  className?: string;
};

const SCRIPT_ID = 'google-recaptcha-v2';

function loadRecaptchaScript(): Promise<void> {
  if (window.grecaptcha?.render) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('reCAPTCHA failed to load')));
      // Already loaded
      if (window.grecaptcha?.render) resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'));
    document.head.appendChild(script);
  });
}

/**
 * Google reCAPTCHA v2 checkbox.
 * Requires VITE_RECAPTCHA_SITE_KEY in env.
 * Uses compact size on narrow viewports so the widget cannot force page zoom-out.
 */
export default function GoogleRecaptcha({ onChange, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  const reactId = useId();

  useEffect(() => {
    onChange(null);

    if (!siteKey) {
      setError('reCAPTCHA is not configured (missing VITE_RECAPTCHA_SITE_KEY).');
      return;
    }

    let cancelled = false;

    const compact =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 419px)').matches;

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.grecaptcha) return;
        if (widgetIdRef.current !== null) return;

        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          size: compact ? 'compact' : 'normal',
          callback: (token) => onChange(token),
          'expired-callback': () => onChange(null),
          'error-callback': () => {
            onChange(null);
            setError('reCAPTCHA error. Please refresh and try again.');
          },
        });
      })
      .catch(() => {
        if (!cancelled) setError('Could not load reCAPTCHA. Please refresh the page.');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, [siteKey]);

  if (!siteKey) {
    return (
      <p className="text-sm text-red-600" role="alert">
        reCAPTCHA is not configured. Add VITE_RECAPTCHA_SITE_KEY to your environment.
      </p>
    );
  }

  return (
    <div className={`max-w-full min-w-0 ${className}`}>
      <div ref={containerRef} data-recaptcha={reactId} className="max-w-full overflow-x-auto" />
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const res = await fetch('/api/verify-recaptcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) return false;
  const json = (await res.json()) as { success?: boolean };
  return Boolean(json.success);
}
