import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import { images } from '@/data/images';

const SUNTEK_COMBINED_VIEWER =
  'https://suntekfilms.com/na/en/paint-protection-film/automotive-film-simulator/dealer-auto-tint-ppf-viewer/';

export default function FilmSimulatorPage() {
  return (
    <>
      <SEO
        title="Film Visualizer | Window Tint & PPF Simulator — Spotless Tinting"
        description="Preview automotive window tint and paint protection film coverage with the SunTek interactive film simulator. See how film looks before you buy."
        path="/film-simulator"
        image={images.filmVisualizerBanner}
      />

      <section className="relative min-h-[min(52vh,480px)] overflow-hidden bg-ink-950">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={images.filmVisualizerBanner}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink-950/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/45 to-transparent" />
        </div>

        <div className="container relative z-10 flex min-h-[min(52vh,480px)] flex-col justify-center py-14 md:py-16">
          <Breadcrumbs
            light
            crumbs={[
              { label: 'Home', path: '/' },
              { label: 'Film Visualizer' },
            ]}
          />
          <Reveal>
            <h1 className="mt-6 text-3xl font-bold uppercase tracking-tight text-ink-950 md:text-4xl lg:text-5xl">
              Window Tint &amp; PPF <span className="text-accent-500">Visualizer</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              Explore coverage areas and film options with SunTek&apos;s interactive tool. Preview
              automotive window tint and paint protection film on a vehicle so you can choose with
              more confidence. Best experienced on mobile or tablet.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white py-8 md:py-10">
        <div className="container">
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-ink-100 bg-ink-50 shadow-sm">
              <object
                data={SUNTEK_COMBINED_VIEWER}
                type="text/html"
                title="SunTek automotive window tint and PPF film simulator"
                className="block w-full"
                style={{ height: '1000px', minHeight: '1000px' }}
              >
                <p className="p-8 text-center text-sm text-ink-600">
                  This interactive viewer needs a modern browser with network access.{' '}
                  <a
                    href={SUNTEK_COMBINED_VIEWER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-600 hover:text-accent-700"
                  >
                    Open the SunTek film simulator in a new tab
                  </a>
                  .
                </p>
              </object>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-ink-100 bg-ink-50 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="text-lg font-bold text-ink-950">Ready to choose a film?</h2>
                <p className="mt-1 max-w-xl text-sm text-ink-600">
                  Talk to Spotless Tinting in Moonah and Bellerive about the right tint or PPF for
                  your vehicle.
                </p>
              </div>
              <Link to="/quote" className="btn-primary shrink-0">
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <p className="mt-6 text-center text-[10px] leading-relaxed text-ink-400">
            Interactive tool provided by SunTek Films / Eastman Performance Films, LLC. Spotless
            Tinting is not responsible for third-party tool availability or content.
          </p>
        </div>
      </section>
    </>
  );
}
