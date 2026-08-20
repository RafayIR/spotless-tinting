import { Link } from 'react-router-dom';
import {
  Shield, Sun, Eye, Wrench, Award, MapPin, Star, ArrowRight, Check,
} from 'lucide-react';
import SEO from '@/components/CTA';
import CTA from '@/components/CTA';
import ServicesShowcase from '@/components/ServicesShowcase';
import GalleryGrid from '@/components/GalleryGrid';
import TestimonialCard from '@/components/TestimonialCard';
import FAQAccordion from '@/components/FAQAccordion';
import ProcessTimeline from '@/components/ProcessTimeline';
import Reveal from '@/components/Reveal';
import { services } from '@/data/services';
import { reviews, overallRating } from '@/data/reviews';
import { faqs } from '@/data/faqs';
import { projects } from '@/data/projects';
import { business } from '@/data/business';
import { images } from '@/data/images';

const whyChoose = [
  { icon: Shield, title: 'Premium Films', desc: 'We use quality film technologies selected for performance and longevity.' },
  { icon: Wrench, title: 'Professional Installation', desc: 'Experienced technicians with meticulous attention to detail.' },
  { icon: Sun, title: 'Heat & UV Reduction', desc: 'Significant heat rejection and up to 99% UV protection.' },
  { icon: Eye, title: 'Enhanced Privacy', desc: 'Improved privacy and security for vehicles and properties.' },
  { icon: Award, title: 'Quality Workmanship', desc: 'We stand behind our work with warranty-backed installation.' },
  { icon: MapPin, title: 'Local Hobart Business', desc: 'Proudly serving Moonah, Hobart and greater southern Tasmania.' },
];

const trustIndicators = [
  'Professional installation',
  'Premium films',
  'Local Hobart business',
  'Warranty-backed workmanship',
];

export default function HomePage() {
  const homepageFaqs = faqs.slice(0, 6);
  const galleryPreview = projects.slice(0, 6);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoWash',
    name: business.name,
    image: images.heroCar,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Moonah',
      addressRegion: 'TAS',
      addressCountry: 'AU',
    },
    telephone: business.phone,
    areaServed: business.serviceAreas,
  };

  return (
    <>
      {/* <SEO
        title="Spotless Tinting | Car, Home & Commercial Window Tinting — Moonah, Hobart"
        description="Premium automotive, residential and commercial window tinting in Moonah, Hobart. PPF, vehicle wrapping and ceramic coating. Get a free quote today."
        path="/"
        image={images.heroCar}
        schema={localBusinessSchema}
      /> */}

      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.heroCar}
            alt="Premium tinted luxury vehicle at Spotless Tinting Hobart"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/10" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="eyebrow text-accent-400">Moonah &middot; Hobart &middot; Tasmania</span>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Premium Tinting &amp; Vehicle Protection in Hobart
            </h1>
            <p className="mt-5 max-w-xl text-balance text-base text-ink-200 sm:text-lg">
              Professional automotive, residential and commercial window tinting in Moonah and Hobart, plus PPF and vehicle wrapping.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/quote" className="btn-primary">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/gallery" className="btn-light">
                View Our Work
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-200">
              {trustIndicators.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="section overflow-hidden bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="eyebrow inline-flex items-center gap-5 before:h-px before:w-12 before:bg-accent-400 after:h-px after:w-12 after:bg-accent-400">
                What We Do
              </span>
              <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                Premium Film <span className="font-normal">&amp; Protection Solutions</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-ink-600">
                From automotive window tinting to property films, paint protection and vehicle wraps, we deliver professional solutions designed for protection, comfort and style.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ServicesShowcase services={services.slice(0, 5)} />
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Why Spotless</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Why Choose Spotless Tinting</h2>
              <p className="mt-4 text-ink-600">
                We combine premium materials, experienced workmanship and a commitment to every customer.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="flex h-full gap-4 rounded-2xl border border-ink-100 bg-white p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-950">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLESS PROCESS */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">How It Works</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">The Spotless Process</h2>
              <p className="mt-4 text-ink-600">
                A simple, transparent process from first enquiry to final inspection.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* LOCAL SERVICE AREA */}
      <section className="section bg-accent-50">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="eyebrow">Service Area</span>
                <h2 className="mt-3 text-3xl font-bold text-ink-950 md:text-4xl">Serving Hobart &amp; Southern Tasmania</h2>
                <p className="mt-4 text-ink-600">
                  Based in Moonah, Spotless Tinting services customers across Hobart and surrounding areas. Whether you're in the city centre or greater Hobart, we're your local tinting and vehicle protection specialists.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {business.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-white px-4 py-2 text-sm text-ink-700"
                    >
                      <MapPin className="h-3.5 w-3.5 text-accent-500" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={images.commercialBuilding}
                  alt="Commercial building window tinting in Hobart, Tasmania"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Portfolio</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Our Work</h2>
              <p className="mt-4 text-ink-600">
                A selection of our recent tinting, PPF and wrapping projects across Hobart.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <GalleryGrid projects={galleryPreview} showViewAll />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-ink-50">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Customer Reviews</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <span className="text-sm font-medium text-ink-700">
                  {overallRating.score.toFixed(1)} from {overallRating.count} reviews on {overallRating.source}
                </span>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <TestimonialCard review={r} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/reviews" className="btn-outline">
              Read More Reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <Reveal>
              <div>
                <span className="eyebrow">Questions</span>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
                <p className="mt-4 text-ink-600">
                  Answers to the most common questions about our tinting, PPF and wrapping services.
                </p>
                <Link to="/faq" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                  View All FAQs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <FAQAccordion items={homepageFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTA
        title="Ready to upgrade your vehicle, home or business?"
        subtitle="Talk to Spotless Tinting about the right tinting or protection solution for your project."
        primaryLabel="Get a Free Quote"
        primaryPath="/quote"
        secondaryLabel="Book Now"
        secondaryPath="/book"
      />
    </>
  );
}
