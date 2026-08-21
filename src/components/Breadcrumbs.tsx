import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  path?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-400">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {crumb.path && !isLast ? (
                <Link to={crumb.path} className="hover:text-ink-700">
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-ink-700' : ''}>{crumb.label}</span>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-ink-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
