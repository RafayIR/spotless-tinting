import { useState } from 'react';
import { Check, Send, Award, MapPin, Users, Wrench } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import GoogleRecaptcha from '@/components/forms/GoogleRecaptcha';
import { SafeInput, SafeTextarea } from '@/components/forms/SafeFields';
import { FORM_CHAR_HINT } from '@/lib/formValidation';
import { formDataToPayload, submitEnquiry } from '@/lib/submitEnquiry';
import { business } from '@/data/business';

const reasons = [
  {
    icon: Award,
    title: 'Craftsmanship First',
    desc: 'We take pride in clean, precise installs and take the time to do every job properly.',
  },
  {
    icon: Wrench,
    title: 'Varied Work',
    desc: 'Automotive, residential and commercial tinting, paint protection film, wraps and ceramic coating.',
  },
  {
    icon: Users,
    title: 'Supportive Team',
    desc: 'A multicultural team united by customer care and pride in the finished result.',
  },
  {
    icon: MapPin,
    title: 'Two Hobart Workshops',
    desc: 'Work from our Moonah and Bellerive locations, serving customers across Greater Hobart.',
  },
];

const positions = [
  'Window Tint Installer',
  'PPF / Vehicle Wrap Installer',
  'Ceramic Coating / Detailer',
  'Apprentice / Trainee',
  'Customer Service / Admin',
  'Other',
];

const experienceLevels = ['No experience yet', 'Under 1 year', '1 to 3 years', '3 years or more'];

const availabilityOptions = ['Full time', 'Part time', 'Casual'];

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // Bumped after a failed send so the single-use captcha is re-issued
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!captchaToken) {
      setFormError('Please complete the captcha.');
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiry(
        formDataToPayload(e.currentTarget, {
          formType: 'careers',
          captchaToken,
        }),
      );
      setSubmitted(true);
      setCaptchaToken(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to send application.');
      setCaptchaToken(null);
      setCaptchaKey((k) => k + 1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Careers | Spotless Tinting — Hobart"
        description="Join the Spotless Tinting team in Hobart. Send an expression of interest for window tinting, PPF, vehicle wrap and workshop roles in Moonah and Bellerive."
        path="/careers"
      />

      <section className="bg-accent-50 py-16 dark:bg-ink-900">
        <div className="container">
          <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'Careers' }]} />
          <h1 className="mt-6 text-4xl font-bold text-ink-950 dark:text-white md:text-5xl">
            Careers at Spotless Tinting
          </h1>
          <p className="mt-4 max-w-2xl text-ink-600 dark:text-ink-300">
            Love cars, detail and quality workmanship? We&apos;re always keen to hear from
            motivated people who want to join our team in Hobart.
          </p>
        </div>
      </section>

      <section className="section bg-white dark:bg-ink-950">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Why Join Us</span>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-ink-950 dark:text-white md:text-4xl">
              Work With {business.name}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 40}>
                <div className="card-surface h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400">
                    <reason.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-ink-950 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {reason.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-900">
        <div className="container max-w-3xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Apply</span>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-tight text-ink-950 dark:text-white md:text-4xl">
              Send an Expression of Interest
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              Tell us a little about yourself and the kind of role you&apos;re after. We&apos;ll be
              in touch when a suitable position is available.
            </p>
          </div>

          {submitted ? (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-500/15">
                  <Check className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-ink-950 dark:text-white">Application Sent!</h3>
                <p className="mt-3 max-w-md text-ink-600 dark:text-ink-300">
                  Thanks for your interest in joining Spotless Tinting. We&apos;ll review your details
                  and contact you if there&apos;s a suitable opportunity.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn-outline mt-8">
                  Submit Another Application
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="card-surface p-6 dark:bg-ink-950 md:p-8">
                <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
                  <p className="text-xs text-ink-500 dark:text-ink-400">{FORM_CHAR_HINT}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    Fields marked <span className="font-semibold text-red-500">*</span> are required.
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="name" className="label-field label-required">Full Name</label>
                      <SafeInput id="name" name="name" mode="text" required autoComplete="name" className="input-field" placeholder="Your full name" />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="phone" className="label-field label-required">Phone</label>
                      <SafeInput id="phone" name="phone" mode="numbers" required autoComplete="tel" className="input-field" placeholder="Your phone" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="email" className="label-field label-required">Email</label>
                      <SafeInput id="email" name="email" mode="email" type="email" required autoComplete="email" className="input-field" placeholder="your@email.com" />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="suburb" className="label-field label-required">Suburb</label>
                      <SafeInput id="suburb" name="suburb" mode="text" required autoComplete="address-level2" className="input-field" placeholder="e.g. Moonah" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="position" className="label-field label-required">Position of Interest</label>
                    <select id="position" name="position" required className="input-field">
                      <option value="">Select a position</option>
                      {positions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="experience" className="label-field">Relevant Experience</label>
                      <select id="experience" name="experience" className="input-field">
                        <option value="">Select experience</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="availability" className="label-field">Availability</label>
                      <select id="availability" name="availability" className="input-field">
                        <option value="">Select availability</option>
                        {availabilityOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="message" className="label-field label-required">About You</label>
                    <SafeTextarea
                      id="message"
                      name="message"
                      mode="text"
                      required
                      rows={4}
                      className="input-field"
                      placeholder="Tell us about your experience and why you would like to work with us"
                    />
                  </div>

                  <GoogleRecaptcha key={captchaKey} onChange={setCaptchaToken} className="max-w-full overflow-x-auto" />
                  {formError && (
                    <p className="text-sm text-red-600" role="alert">
                      {formError}
                    </p>
                  )}

                  <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                    <Send className="h-4 w-4" /> {submitting ? 'Sending…' : 'Submit Application'}
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    Prefer to talk? Call us on{' '}
                    <a href={business.phoneHref} className="font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400">
                      {business.phone}
                    </a>
                    .
                  </p>
                </form>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
