import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/data/projects';



export default function GalleryGrid({
  projects,
  showViewAll = false,
}: {
  projects: Project[];
  showViewAll?: boolean;
}) {

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {projects.map((project) => (

          <Link

            key={project.id}

            to="/gallery"

            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >

            <img

              src={project.image}

              alt={`${project.title} — ${project.service} in ${project.location}`}

              loading="lazy"

              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"

            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                {project.category}
              </span>
              <h3 className="mt-1 text-lg font-bold text-white">{project.title}</h3>
              <p className="text-sm text-ink-200">{project.location}</p>
            </div>
          </Link>
        ))}

      </div>
      {showViewAll && (

        <div className="mt-10 text-center">

          <Link to="/gallery" className="btn-primary">

            View All Our Work

            <ArrowRight className="h-4 w-4" />

          </Link>

        </div>

      )}
    </div>

  );

}

