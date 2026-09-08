import { images } from './images';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category:
    | 'Window Tinting'
    | 'PPF'
    | 'Vehicle Wraps'
    | 'Residential'
    | 'Commercial'
    | 'Smart Tint'
    | 'Other';
  /** Omitted where the job location has not been confirmed. */
  location?: string;
  description: string;
  image: string;
  service: string;
  /** Optional corner label for genuine before/after project shots. */
  badge?: 'Before' | 'After';
}

// Real Spotless Tinting portfolio photography (see /public/portfolio).
// Vehicle names follow the client's own folder labels; locations are only set
// where the photo confirms them.
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Lexus ES 300h — Full Window Tint',
    slug: 'lexus-es-300h-window-tint',
    category: 'Window Tinting',
    description: 'Premium film across every window for heat reduction, privacy and a factory-clean finish.',
    image: images.gallery.projects.lexusEs,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p2',
    title: 'BMW X5 M Sport — Window Tint',
    slug: 'bmw-x5-m-sport-window-tint',
    category: 'Window Tinting',
    location: 'Hobart, Tasmania',
    description: 'Dark, even tint across the cabin glass of this X5 for privacy and glare control.',
    image: images.gallery.projects.bmwX5,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p3',
    title: 'Toyota Camry Hybrid — Ceramic Coating',
    slug: 'toyota-camry-hybrid-ceramic-coating',
    category: 'Other',
    location: 'Hobart, Tasmania',
    description: 'Ceramic coating for a deep gloss finish and easier ongoing maintenance.',
    image: images.gallery.projects.camryCeramic,
    service: 'Ceramic Coating',
  },
  {
    id: 'p4',
    title: 'Home Window Film Installation',
    slug: 'home-window-film-installation',
    category: 'Residential',
    location: 'Hobart, Tasmania',
    description: 'Solar control film across the living-area glazing to cut heat and glare while keeping the view.',
    image: images.gallery.projects.residentialFilm,
    service: 'Residential Window Tinting',
  },
  {
    id: 'p5',
    title: 'Shopfront Window Graphics',
    slug: 'shopfront-window-graphics',
    category: 'Commercial',
    description: 'Cut vinyl branding applied to shopfront glass for a bold, street-facing identity.',
    image: images.gallery.projects.shopfrontSignage,
    service: 'Commercial Window Tinting',
  },
  {
    id: 'p6',
    title: 'Holden SS-V — Window Tint',
    slug: 'holden-ssv-window-tint',
    category: 'Window Tinting',
    location: 'Hobart, Tasmania',
    description: 'Dark rear tint for privacy and heat control, finished edge to edge.',
    image: images.gallery.projects.holdenSsv,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p7',
    title: 'Subaru Impreza — Window Tint',
    slug: 'subaru-impreza-window-tint',
    category: 'Window Tinting',
    description: 'Crisp, bubble-free tint across the side and rear glass of this Impreza hatch.',
    image: images.gallery.projects.subaruImpreza,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p8',
    title: 'Mitsubishi Outlander — Window Tint',
    slug: 'mitsubishi-outlander-window-tint',
    category: 'Window Tinting',
    description: 'Family SUV tinted for UV protection, cooler rear seats and added privacy.',
    image: images.gallery.projects.outlander,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p9',
    title: 'Mitsubishi Lancer GSR — Window Tint',
    slug: 'mitsubishi-lancer-gsr-window-tint',
    category: 'Window Tinting',
    description: 'A clean, dark finish that suits the lines of this classic Lancer GSR.',
    image: images.gallery.projects.lancer,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p10',
    title: 'Hyundai i30 — Window Tint',
    slug: 'hyundai-i30-window-tint',
    category: 'Window Tinting',
    description: 'Side and rear glass tinted for everyday comfort and a sharper look.',
    image: images.gallery.projects.hyundaiI30,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p11',
    title: 'Toyota Camry Hybrid — Window Tint',
    slug: 'toyota-camry-hybrid-window-tint',
    category: 'Window Tinting',
    description: 'Full window tint on a Camry Hybrid for heat rejection and a sleek, factory look.',
    image: images.gallery.projects.camryHybrid,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p12',
    title: 'Toyota Camry Atara S — Window Tint',
    slug: 'toyota-camry-atara-s-window-tint',
    category: 'Window Tinting',
    description: 'Rear and side glass tinted to keep the cabin cooler and more private.',
    image: images.gallery.projects.camryAtaraS,
    service: 'Automotive Window Tinting',
  },
];

export const galleryCategories = [
  'All',
  'Window Tinting',
  'PPF',
  'Vehicle Wraps',
  'Residential',
  'Commercial',
  'Smart Tint',
  'Other',
] as const;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
