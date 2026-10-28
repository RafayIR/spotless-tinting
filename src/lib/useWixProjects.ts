import { useEffect, useMemo, useState } from 'react';
import { projects as staticProjects, type Project } from '@/data/projects';
import { getWixProjects, mergeWithStatic, type WixProject } from '@/lib/wixPortfolio';

export type WixProjectsState = {
  projects: WixProject[];
  loading: boolean;
  error: string | null;
};

/**
 * Loads published projects from Wix CMS.
 * `projects` is [] while loading, when nothing is published, or when the request fails —
 * check `error` to tell those apart and fall back to static data if needed.
 */
export function useWixProjects(): WixProjectsState {
  const [state, setState] = useState<WixProjectsState>({
    projects: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    getWixProjects()
      .then(({ projects }) => {
        if (!cancelled) setState({ projects, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          projects: [],
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load projects',
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/**
 * The site-wide portfolio: static projects render immediately and Wix CMS projects are merged
 * in once loaded. If Wix is unreachable the static list is returned unchanged.
 */
export function usePortfolioProjects(): Project[] {
  const { projects: wixProjects } = useWixProjects();
  return useMemo(() => mergeWithStatic(wixProjects, staticProjects), [wixProjects]);
}
