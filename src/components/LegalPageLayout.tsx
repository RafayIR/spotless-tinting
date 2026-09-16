import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { business } from '@/data/business';
import type { LegalDoc } from '@/data/legal/terms';

const relatedLinks = [
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Cancellation & Rescheduling', path: '/cancellation-policy' },
];

type Props = {
  doc: LegalDoc;
  breadcrumbLabel: string;
  /** Optional note when full policy body is not yet published */
  pendingNote?: string;
};

export default function LegalPageLayout({ doc, breadcrumbLabel, pendingNote }: Props) {
  return (
    <>
      <SEO title={`${doc.title} | Spotless Tinting`} description={doc.description} path={doc.path} />

      <section className="border-b border-ink-100 bg-ink-50 dark:border-ink-800 dark:bg-ink-950">
        <div className="container py-10 md:py-14">
          <Breadcrumbs crumbs={[{ label: 'Home', path: '/' }, { label: breadcrumbLabel }]} />
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-500">
            Legal
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink-950 dark:text-white sm:text-4xl">
            {doc.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-600 dark:text-ink-300">
            <span>Spotless Tinting Pty Ltd</span>
            <span>ABN {business.abn}</span>
            <span>Last updated: {doc.lastUpdated}</span>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-ink-950">
        <div className="container py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                On this page
              </p>
              {doc.sections.length > 0 ? (
                <nav className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto pr-2 text-sm">
                  {doc.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-md px-2 py-1.5 text-ink-600 hover:bg-ink-50 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-ink-900 dark:hover:text-white"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
                  Full policy content coming soon.
                </p>
              )}

              <div className="mt-8 border-t border-ink-100 pt-6 dark:border-ink-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                  Related
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedLinks
                    .filter((link) => link.path !== doc.path)
                    .map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="text-ink-700 hover:text-accent-600 dark:text-ink-300 dark:hover:text-accent-400"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>

            <article className="max-w-3xl">
              {pendingNote && (
                <div className="mb-10 rounded-xl border border-ink-200 bg-ink-50 px-5 py-4 text-sm leading-relaxed text-ink-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200">
                  {pendingNote}
                </div>
              )}

              {doc.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-b border-ink-100 py-8 first:pt-0 last:border-b-0 dark:border-ink-800"
                >
                  <h2 className="text-xl font-bold tracking-tight text-ink-950 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-700 dark:text-ink-300">
                    {section.blocks.map((block, i) => {
                      if (block.type === 'ul') {
                        return (
                          <ul key={i} className="list-disc space-y-1.5 pl-5">
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i}>{block.text}</p>;
                    })}
                  </div>
                </section>
              ))}

              <div className="mt-10 rounded-2xl border border-ink-100 bg-ink-50 p-6 dark:border-ink-800 dark:bg-ink-900 sm:p-8">
                <h2 className="text-lg font-bold text-ink-950 dark:text-white">Contact Us</h2>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  Spotless Tinting Pty Ltd · ABN {business.abn}
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {business.workshopLocations.map((loc) => (
                    <div key={loc.name} className="flex gap-3 text-sm">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      <div>
                        <p className="font-semibold text-ink-950 dark:text-white">{loc.name}</p>
                        <p className="mt-1 text-ink-600 dark:text-ink-300">{loc.lines.join(', ')}</p>
                      </div>
                    </div>
                  ))}
                  <a
                    href={business.phoneHref}
                    className="flex items-center gap-3 text-sm font-semibold text-ink-800 hover:text-accent-600 dark:text-ink-200 dark:hover:text-accent-400"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-accent-500" />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={business.emailHref}
                    className="flex items-center gap-3 text-sm font-semibold text-ink-800 hover:text-accent-600 dark:text-ink-200 dark:hover:text-accent-400"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent-500" />
                    {business.email}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
