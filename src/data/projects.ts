import { images } from './images';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Window Tinting' | 'PPF' | 'Vehicle Wraps' | 'Residential' | 'Commercial' | 'Other';
  location: string;
  description: string;
  image: string;
  service: string;
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Sports Car Ceramic Tint',
    slug: 'sports-car-ceramic-tint',
    category: 'Window Tinting',
    location: 'Hobart, TAS',
    description: 'Full ceramic window tint on a sports coupe for maximum heat rejection and a sleek dark finish.',
    image: images.sportsCar,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p2',
    title: 'Luxury Sedan Full PPF',
    slug: 'luxury-sedan-full-ppf',
    category: 'PPF',
    location: 'Moonah, TAS',
    description: 'Full-vehicle paint protection film application on a luxury sedan for comprehensive stone chip protection.',
    image: images.luxurySedan,
    service: 'Paint Protection Film',
  },
  {
    id: 'p3',
    title: 'Matte Black Vehicle Wrap',
    slug: 'matte-black-vehicle-wrap',
    category: 'Vehicle Wraps',
    location: 'Glenorchy, TAS',
    description: 'Full matte black colour-change wrap transforming the appearance of this vehicle with a premium satin finish.',
    image: images.matteWrap,
    service: 'Vehicle Wrapping',
  },
  {
    id: 'p4',
    title: 'Modern Home Solar Film',
    slug: 'modern-home-solar-film',
    category: 'Residential',
    location: 'New Town, TAS',
    description: 'Solar control window film installed on a modern home to reduce heat and glare while preserving natural light.',
    image: images.residentialWindow,
    service: 'Residential Window Tinting',
  },
  {
    id: 'p5',
    title: 'Office Building Tint',
    slug: 'office-building-tint',
    category: 'Commercial',
    location: 'Hobart CBD, TAS',
    description: 'Commercial solar control film across an office building to improve workplace comfort and reduce energy costs.',
    image: images.officeGlass,
    service: 'Commercial Window Tinting',
  },
  {
    id: 'p6',
    title: 'SUV Window Tint',
    slug: 'suv-window-tint',
    category: 'Window Tinting',
    location: 'Hobart, TAS',
    description: 'Premium window tint on a family SUV for UV protection, heat reduction and enhanced privacy.',
    image: images.suvDark,
    service: 'Automotive Window Tinting',
  },
  {
    id: 'p7',
    title: 'Shopfront Anti-Graffiti Film',
    slug: 'shopfront-anti-graffiti-film',
    category: 'Commercial',
    location: 'Moonah, TAS',
    description: 'Anti-graffiti protective film applied to a retail shopfront to protect against vandalism and reduce maintenance costs.',
    image: images.shopfront,
    service: 'Commercial Window Tinting',
  },
  {
    id: 'p8',
    title: 'Ceramic Coating Application',
    slug: 'ceramic-coating-application',
    category: 'Other',
    location: 'Hobart, TAS',
    description: 'Ceramic coating applied for a deep gloss finish and hydrophobic protection, making maintenance effortless.',
    image: images.ceramicCoating,
    service: 'Ceramic Coating',
  },
];

export const galleryCategories = ['All', 'Window Tinting', 'PPF', 'Vehicle Wraps', 'Residential', 'Commercial', 'Other'] as const;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
