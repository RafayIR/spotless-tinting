import { Shield, Wrench, MapPin, Users, Award, Eye } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTA from '@/components/CTA';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';
import { business } from '@/data/business';

const values = [
  { icon: Shield, title: 'Quality First', desc: 'We use premium films and materials, never compromising on quality.' },
  { icon: Wrench, title: 'Expert Workmanship', desc: 'Every installation is carried out by experienced, meticulous technicians.' },
  { icon: MapPin, title: 'Local & Trusted', desc: 'Proudly Hobart-based, serving our local community with care.' },
  { icon: Eye, title: 'Attention to Detail', desc: 'We treat every vehicle and property as if it were our own.' },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | Spotless Tinting — Hobart, Tasmania"
        description="Learn about Spotless Tinting — your local Moonah and Hobart window tinting, PPF and vehicle wrapping specialists."
        path="/about"
      />

      <section className="bg-accent-50 py-16">
        <div className="container">
          <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: 'About' }]} />
          <h1 className="mt-6 text-4xl font-bold text-ink-950 md:text-5xl">About Spotless Tinting</h1>
          <p className="mt-4 max-w-2xl text-ink-600">
            Your local window tinting and vehicle protection specialists in Moonah, Hobart.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="eyebrow">Who We Are</span>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">A Local Hobart Tinting Specialist</h2>
                <p className="mt-4 leading-relaxed text-ink-600">
                  Spotless Tinting is a Moonah-based business serving customers across Hobart and southern Tasmania. We specialise in automotive, residential and commercial window tinting, along with paint protection film, vehicle wrapping and ceramic coating.
                </p>
                <p className="mt-4 leading-relaxed text-ink-600">
                  [BUSINESS HISTORY]
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-2xl">
                <img src={images.installerWork} alt="Spotless Tinting technician installing window film" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Our Values</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Drives Us</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-ink-100 bg-white p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-950">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="eyebrow">Our Team</span>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">Meet the People Behind the Work</h2>
                <p className="mt-4 leading-relaxed text-ink-600">
                  [TEAM INFORMATION]
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span className="eyebrow">Our Approach</span>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">How We Work</h2>
                <ul className="mt-4 space-y-3 text-ink-600">
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />We start with a consultation to understand your needs and recommend the right solution.</li>
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />We prepare every surface meticulously for a flawless finish.</li>
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />We install with precision and care, treating your vehicle or property as our own.</li>
                  <li className="flex items-start gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />We inspect every detail before completing the job.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA
        title="Want to work with us?"
        subtitle="Get in touch to discuss your tinting or vehicle protection project."
        primaryLabel="Get a Free Quote"
        primaryPath="/quote"
        secondaryLabel="Contact Us"
        secondaryPath="/contact"
      />
    </>
  );
}
