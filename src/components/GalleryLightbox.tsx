import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import type { Project } from '@/data/projects';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

function projectImages(project: Project): string[] {
  if (project.gallery?.length) return project.gallery;
  return [project.image];
}

export default function GalleryLightbox({
  projects,
  startIndex,
  onClose,
}: {
  projects: Project[];
  startIndex: number;
  onClose: () => void;
}) {
  const [projectIndex, setProjectIndex] = useState(startIndex);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const project = projects[projectIndex];
  const images = project ? projectImages(project) : [];
  const src = images[imageIndex] ?? project?.image;
  const hasMultiple = images.length > 1;
  const canPrev = projects.length > 1 || hasMultiple;
  const canNext = projects.length > 1 || hasMultiple;

  const goPrev = useCallback(() => {
    setZoom(1);
    if (imageIndex > 0) {
      setImageIndex((i) => i - 1);
      return;
    }
    if (projects.length <= 1) return;
    const nextProj = (projectIndex - 1 + projects.length) % projects.length;
    const prevImages = projectImages(projects[nextProj]);
    setProjectIndex(nextProj);
    setImageIndex(Math.max(0, prevImages.length - 1));
  }, [imageIndex, projectIndex, projects]);

  const goNext = useCallback(() => {
    setZoom(1);
    if (imageIndex < images.length - 1) {
      setImageIndex((i) => i + 1);
      return;
    }
    if (projects.length <= 1) return;
    setProjectIndex((i) => (i + 1) % projects.length);
    setImageIndex(0);
  }, [imageIndex, images.length, projects.length]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, Number((z + ZOOM_STEP).toFixed(1))));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, Number((z - ZOOM_STEP).toFixed(1))));
  }, []);

  const resetZoom = useCallback(() => setZoom(1), []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, onClose, resetZoom, zoomIn, zoomOut]);

  useEffect(() => {
    setProjectIndex(startIndex);
    setImageIndex(0);
    setZoom(1);
  }, [startIndex]);

  if (!project || !src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink-950/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} gallery`}
    >
      {/* Header */}
      <div className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white sm:text-base">{project.title}</p>
          <p className="truncate text-[11px] text-ink-300 sm:text-xs">
            {project.service}
            {hasMultiple ? ` · ${imageIndex + 1} / ${images.length}` : ''}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="min-w-[3rem] text-center text-xs font-semibold tabular-nums text-white">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            disabled={zoom === MIN_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-14"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {canPrev ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-4"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : null}

        <div
          className={`max-h-full max-w-full overflow-auto ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
          <img
            key={src}
            src={src}
            alt={`${project.title} — ${project.service}`}
            className="mx-auto max-h-[min(80vh,900px)] max-w-[min(96vw,1200px)] select-none object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            draggable={false}
          />
        </div>

        {canNext ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-4"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        ) : null}
      </div>

      {/* Thumbnails when a job has multiple shots */}
      {hasMultiple ? (
        <div className="relative z-20 flex shrink-0 justify-center gap-2 overflow-x-auto px-4 pb-5">
          {images.map((thumb, i) => (
            <button
              key={thumb}
              type="button"
              onClick={() => {
                setImageIndex(i);
                resetZoom();
              }}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-opacity ${
                i === imageIndex
                  ? 'border-accent-500 opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === imageIndex}
            >
              <img src={thumb} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
