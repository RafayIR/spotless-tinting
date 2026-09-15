import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/Reveal';
import CarViewer from '@/components/CarViewer';
import { images } from '@/data/images';

export default function CarViewerPage() {
  return (
    <>
      <SEO
        title="3D Tint Visualizer | Spotless Tinting — Hobart"
        description="Explore automotive window tint levels in 3D. Rotate, zoom and preview Light, Medium and Dark film on a vehicle before you book."
        path="/3d-tint-viewer"
        image={images.filmVisualizerBanner}
      />

      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <img
            src={images.filmVisualizerBanner}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink-950/75" />
        </div>
        <div className="container relative z-10 py-12 md:py-16">
          <Breadcrumbs
            light
            crumbs={[
              { label: 'Home', path: '/' },
              { label: '3D Tint Viewer' },
            ]}
          />
          <Reveal>
            <h1 className="mt-6 max-w-3xl text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              See Tint Levels in <span className="text-accent-500">3D</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Interact with our 3D vehicle preview — rotate, zoom and compare Light, Medium and Dark
              window film looks before you decide.
            </p>
          </Reveal>
        </div>
      </section>

      <CarViewer />

      <section className="border-t border-ink-800 bg-ink-950 py-10">
        <div className="container flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-white">Ready to tint your vehicle?</h2>
            <p className="mt-1 text-sm text-ink-300">
              Get a free quote from Spotless Tinting in Moonah and Bellerive.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/film-simulator" className="btn border border-white/30 bg-transparent text-white hover:bg-white/10">
              SunTek Film Visualizer
            </Link>
            <Link to="/quote" className="btn-primary">
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
