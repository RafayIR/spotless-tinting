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
  /** Extra portfolio shots from the same job folder (gallery / lightbox). */
  gallery?: string[];
  service: string;
  /** Optional corner label for genuine before/after project shots. */
  badge?: 'Before' | 'After';
}

const base = '/portfolio-images';

/** Build ordered image URLs for a job folder (image files only). */
function shots(folder: string, files: string[]): string[] {
  return files.map((f) => `${base}/${folder}/${f}`);
}

/**
 * Spotless Tinting portfolio — sourced from /public/portfolio-images.
 * Each folder is one job; the first image is the gallery card cover.
 */
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Lexus ES Hybrid Silver — Window Tint',
    slug: 'lexus-es-hybrid-silver',
    category: 'Window Tinting',
    description: 'Full window tint on a silver Lexus ES Hybrid for heat reduction, UV protection and a clean factory finish.',
    image: `${base}/lexus-es-hybrid-silver/lexus-6.jpeg`,
    gallery: shots('lexus-es-hybrid-silver', ['lexus-6.jpeg', 'lexus-7.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p2',
    title: 'BMW X5 — Full Windows Legal Tint',
    slug: 'bmw-x-full-windows-legal-tint',
    category: 'Window Tinting',
    description: 'Legal-spec tint across the cabin glass of this BMW X5 for comfort, privacy and a sharp finish.',
    image: `${base}/bmw-x-full-windows-legal-tint/bmw-2.jpeg`,
    gallery: shots('bmw-x-full-windows-legal-tint', ['bmw-2.jpeg', 'bmw-3.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p3',
    title: 'GWM Black — Legal Tint',
    slug: 'gwm-black-legal-tint',
    category: 'Window Tinting',
    description: 'Legal window tint on a black GWM for everyday heat control and a darker, even look.',
    image: `${base}/gwm-black-legal-tint/gwm-1.jpg`,
    gallery: shots('gwm-black-legal-tint', ['gwm-1.jpg', 'gwm-2.jpeg', 'gwm-3.jpeg', 'gwm-4.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p4',
    title: 'MG Green — Legal Standard Pro Tint',
    slug: 'mg-green-sept-legal-standard-pro-front-back',
    category: 'Window Tinting',
    description: 'Standard Pro legal tint — lighter fronts with darker rears for comfort and a balanced appearance.',
    image: `${base}/mg-green-sept-legal-standard-pro-front-back/mg-1.jpg`,
    gallery: shots('mg-green-sept-legal-standard-pro-front-back', [
      'mg-1.jpg',
      'mg-2.jpg',
      'mg-3.jpg',
      'mg-4.jpg',
      'mg-5.jpg',
      'mg-6.jpg',
      'mg-7.jpg',
      'mg-8.jpg',
      'mg-9.jpg',
      'mg-10.jpeg',
    ]),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p5',
    title: 'Isuzu V-Max — Nano Ceramic Tint',
    slug: 'isuzu-vmax-nano-ceramic-tint',
    category: 'Window Tinting',
    description: 'Nano ceramic film on an Isuzu V-Max for strong heat rejection without excessive darkness.',
    image: `${base}/isuzu-vmax-nano-ceramic-tint/isuzu-1.jpg`,
    gallery: shots('isuzu-vmax-nano-ceramic-tint', [
      'isuzu-1.jpg',
      'isuzu-2.jpg',
      'isuzu-3.jpg',
      'isuzu-4.jpg',
      'isuzu-5.jpg',
      'isuzu-6.jpg',
      'isuzu-7.jpg',
      'isuzu-8.jpg',
      'isuzu-9.jpg',
      'isuzu-10.jpg',
      'isuzu-11.jpg',
      'isuzu-12.jpeg',
    ]),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p6',
    title: 'Isuzu D-Max — Full Vehicle Tint',
    slug: 'isuze-dmax-all-vehicle-tint',
    category: 'Window Tinting',
    description: 'Full vehicle tint on an Isuzu D-Max for cabin comfort and a uniform finish.',
    image: `${base}/isuze-dmax-all-vehicle-tint/isuze-1.jpg`,
    gallery: shots('isuze-dmax-all-vehicle-tint', ['isuze-1.jpg', 'isuze-2.jpg', 'isuze-3.jpg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p7',
    title: 'Holden Monaro CV — Window Tint',
    slug: 'holden-monaro-cv',
    category: 'Window Tinting',
    description: 'Classic Monaro finished with a clean, dark tint that suits its lines.',
    image: `${base}/holden-monaro-cv/holden-1.jpeg`,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p8',
    title: 'Holden Commodore — Tint Removal',
    slug: 'holdon-commodore-stacy-tint-removal',
    category: 'Window Tinting',
    description: 'Careful film removal on a Commodore, ready for a fresh install or clear glass.',
    image: `${base}/holdon-commodore-stacy-tint-removal/holdon-2.jpeg`,
    gallery: shots('holdon-commodore-stacy-tint-removal', ['holdon-2.jpeg', 'holdon-3.jpeg', 'holdon-4.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p9',
    title: 'Hyundai Hatchback — Window Tint',
    slug: 'hyundai-hatchback',
    category: 'Window Tinting',
    description: 'Side and rear tint on a Hyundai hatch for everyday comfort and a sharper look.',
    image: `${base}/hyundai-hatchback/hyundai-2.jpg`,
    gallery: shots('hyundai-hatchback', ['hyundai-2.jpg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p10',
    title: 'Gary BMW — Front Glare Strip',
    slug: 'gary-bmw-front-glare-strip',
    category: 'Window Tinting',
    description: 'Precision front glare strip for reduced sun strike without compromising forward visibility.',
    image: `${base}/gary-bmw-front-glare-strip/gary-1.jpeg`,
    gallery: shots('gary-bmw-front-glare-strip', ['gary-1.jpeg', 'gary-2.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p11',
    title: 'Mitsubishi Outlander — Window Tint',
    slug: 'mitsubishi-outlander',
    category: 'Window Tinting',
    description: 'Family SUV tinted for UV protection, cooler rear seats and added privacy.',
    image: `${base}/mitsubishi-outlander/mitsubishi-1.jpeg`,
    gallery: shots('mitsubishi-outlander', ['mitsubishi-1.jpeg', 'mitsubishi-2.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p12',
    title: 'Mitsubishi Lancer — Window Tint',
    slug: 'mitsubishi-lancer-ccce-generation',
    category: 'Window Tinting',
    description: 'A clean tint finish for this classic Lancer generation.',
    image: `${base}/mitsubishi-lancer-ccce-generation/mitsubishi-1.jpeg`,
    gallery: shots('mitsubishi-lancer-ccce-generation', ['mitsubishi-1.jpeg', 'mitsubishi-2.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p13',
    title: 'Silver Toyota Camry Hybrid — Window Tint',
    slug: 'silver-toyota-camry-hybrid',
    category: 'Window Tinting',
    description: 'Even window tint on a Camry Hybrid for heat rejection and a sleek cabin finish.',
    image: `${base}/silver-toyota-camry-hybrid/silver-1.jpeg`,
    gallery: shots('silver-toyota-camry-hybrid', ['silver-1.jpeg', 'silver-2.jpeg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p14',
    title: 'Toyota Camry Hybrid Atara S — Window Tint',
    slug: 'toyota-camry-hybrid-atara-s',
    category: 'Window Tinting',
    description: 'Atara S Camry Hybrid finished with professional automotive window film.',
    image: `${base}/toyota-camry-hybrid-atara-s/toyota-1.jpeg`,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p15',
    title: 'Subaru Impreza Hatchback — Window Tint',
    slug: 'subaru-impreza-hatchback',
    category: 'Window Tinting',
    description: 'Crisp, bubble-free tint across the glass of this Impreza hatch.',
    image: `${base}/subaru-impreza-hatchback/subaru-1.jpeg`,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p16',
    title: 'Toyota Corolla — Ceramic Tint',
    slug: 'toyota-corolla-geramic-gurismarn',
    category: 'Window Tinting',
    description: 'Ceramic tint installation on a Corolla for high heat control and a premium look.',
    image: `${base}/toyota-corolla-geramic-gurismarn/toyota-1.jpg`,
    gallery: shots('toyota-corolla-geramic-gurismarn', ['toyota-1.jpg', 'toyota-2.jpg', 'toyota-3.jpg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p17',
    title: 'Workshop Detail — Film Installation',
    slug: 'abu-bakr-bhai-working',
    category: 'Window Tinting',
    description: 'Precision film work in progress at the Spotless Tinting workshop.',
    image: `${base}/abu-bakr-bhai-working/abu-1.jpg`,
    gallery: shots('abu-bakr-bhai-working', ['abu-1.jpg', 'abu-2.jpg']),
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p18',
    title: 'Ceramic Coating',
    slug: 'ceramic-coating',
    category: 'Other',
    description: 'Ceramic coating for deep gloss, hydrophobic protection and easier ongoing maintenance.',
    image: `${base}/ceramic-coating/ceramic-2.jpg`,
    gallery: shots('ceramic-coating', ['ceramic-2.jpg', 'ceramic-3.jpeg', 'ceramic-4.jpeg']),
    service: 'Ceramic Coating',
  },
  {
    id: 'p19',
    title: 'Roof Wrap',
    slug: 'roof-wrap',
    category: 'Vehicle Wraps',
    description: 'Contrast roof wrap for a bold, custom vehicle finish.',
    image: `${base}/roof-wrap/roof-2.jpg`,
    gallery: shots('roof-wrap', ['roof-2.jpg', 'roof-3.jpg']),
    service: 'Vehicle Wrapping',
  },
  {
    id: 'p20',
    title: 'Toyota Camry — Roof Wrap & Full Tint',
    slug: 'toyota-camry-roof-wrap-full-vehicle-tint',
    category: 'Vehicle Wraps',
    description: 'Roof wrap combined with full vehicle tint for a complete custom look.',
    image: `${base}/toyota-camry-roof-wrap-full-vehicle-tint/toyota-1.jpg`,
    gallery: shots('toyota-camry-roof-wrap-full-vehicle-tint', [
      'toyota-1.jpg',
      'toyota-2.jpg',
      'toyota-3.jpeg',
    ]),
    service: 'Vehicle Wrapping',
  },
  {
    id: 'p21',
    title: 'Howrah Residential Window Film',
    slug: 'howrah-residential',
    category: 'Residential',
    location: 'Howrah, Tasmania',
    description: 'Residential window film for comfort, glare control and a cleaner look through the home.',
    image: `${base}/residential/howrah-residential/howrah-1.jpeg`,
    service: 'Residential Window Tinting',
  },
  {
    id: 'p22',
    title: 'Lake Street, King Meadows — Residential Tint',
    slug: 'lake-street-king-meadows',
    category: 'Residential',
    location: 'King Meadows, Tasmania',
    description: 'Solar and privacy film across residential glazing at Lake Street, King Meadows.',
    image: `${base}/residential/lake-street-king-meadows/lake-1.jpg`,
    gallery: Array.from({ length: 36 }, (_, i) => `${base}/residential/lake-street-king-meadows/lake-${i + 1}.jpg`),
    service: 'Residential Window Tinting',
  },
  {
    id: 'p23',
    title: 'Commercial Window Tint',
    slug: 'commercial-tint',
    category: 'Commercial',
    description: 'Commercial glass film for heat control, privacy and a professional finish.',
    image: `${base}/commercial-tint/commercial-1.jpg`,
    gallery: Array.from({ length: 27 }, (_, i) => `${base}/commercial-tint/commercial-${i + 1}.jpg`),
    service: 'Commercial Window Tinting',
  },
  {
    id: 'p24',
    title: 'Elizabeth Pier — Privacy Film',
    slug: 'elizabeth-pier-privacy-film-installation-on-glass',
    category: 'Commercial',
    location: 'Hobart, Tasmania',
    description: 'Privacy film installation on glass at Elizabeth Pier for a clean, professional result.',
    image: `${base}/commercial-tint/elizabeth-pier-privacy-film-installation-on-glass/elizabeth-1.jpg`,
    gallery: Array.from(
      { length: 10 },
      (_, i) =>
        `${base}/commercial-tint/elizabeth-pier-privacy-film-installation-on-glass/elizabeth-${i + 1}.jpg`,
    ),
    service: 'Commercial Window Tinting',
  },
  {
    id: 'p25',
    title: 'Shopfront Signage',
    slug: 'signage',
    category: 'Commercial',
    description: 'Cut vinyl and window graphics for a bold, street-facing commercial identity.',
    image: `${base}/signage/signage-1.jpg`,
    service: 'Commercial Window Tinting',
  },
  {
    id: 'p26',
    title: 'Goodyear — Commercial Graphics',
    slug: 'goodyear',
    category: 'Commercial',
    description: 'Commercial branding graphics applied for a clean, high-impact finish.',
    image: `${base}/signage/goodyear/goodyear-1.png`,
    service: 'Commercial Window Tinting',
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
