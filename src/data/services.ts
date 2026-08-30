import { images } from './images';

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  benefits: string[];
  ctaLabel: string;
  ctaPath: string;
  metaTitle: string;
  metaDescription: string;
  crossLinks?: string[];
}

export const services: Service[] = [
  {
    id: 'automotive',
    name: 'Automotive Window Tinting',
    slug: 'automotive-window-tinting',
    shortDescription: 'Heat reduction, UV protection, privacy and a refined finish with premium window films.',
    description:
      'Our automotive window tinting service delivers premium heat rejection, UV protection and enhanced privacy for your vehicle. We offer a range of film technologies — ceramic, carbon and dyed — in multiple VLT (Visible Light Transmission) options to suit your style and legal requirements. Every installation is carried out by experienced technicians with meticulous attention to detail, ensuring a clean, bubble-free finish that lasts.',
    heroImage: images.banner02,
    benefits: [
      'Up to 99% UV protection',
      'Significant heat reduction',
      'Reduced glare for safer driving',
      'Enhanced privacy and security',
      'Premium film options (ceramic, carbon, dyed)',
      'Multiple VLT options',
      'Professional, bubble-free installation',
    ],
    ctaLabel: 'Get a Free Quote',
    ctaPath: '/quote',
    metaTitle: 'Car Window Tinting Hobart | Spotless Tinting',
    metaDescription:
      'Professional car window tinting in Hobart for heat reduction, UV protection, glare control, privacy and style. Explore tint options or get a quote from Spotless Tinting.',
    crossLinks: ['paint-protection-film', 'vehicle-wrapping'],
  },
  {
    id: 'residential',
    name: 'Residential Window Tinting',
    slug: 'residential-window-tinting',
    shortDescription: 'Improve comfort, privacy and UV protection while maintaining the look of your home.',
    description:
      'Residential window tinting keeps your home cooler in summer, warmer in winter and protects your furnishings from UV fading. Our solar control and privacy films reduce glare on screens and surfaces while maintaining natural light. We also offer security films that help hold broken glass in place. Every film is professionally installed with minimal disruption to your home.',
    heroImage: images.residentialWindow,
    benefits: [
      'Solar heat reduction',
      'Glare reduction on screens and surfaces',
      'UV protection for furnishings and flooring',
      'Daytime privacy without curtains',
      'Security film options available',
      'Energy efficiency improvements',
      'Clean, professional installation',
    ],
    ctaLabel: 'Get a Free Quote',
    ctaPath: '/quote',
    metaTitle: 'Home Window Tinting Hobart | Spotless Tinting',
    metaDescription:
      'Residential window tinting in Hobart. Reduce heat, glare and UV while improving privacy. Solar control and security film options. Free quotes.',
  },
  {
    id: 'commercial',
    name: 'Commercial Window Tinting',
    slug: 'commercial-window-tinting',
    shortDescription: 'Solar control, privacy and protection for offices, shopfronts and commercial spaces.',
    description:
      'Commercial window tinting improves comfort and energy efficiency for offices, retail stores and commercial buildings. Our films reduce solar heat and glare, enhance privacy for meeting rooms and street-facing spaces, and can include anti-graffiti or branded film options. We work with businesses across Hobart to deliver tailored solutions with minimal disruption to operations.',
    heroImage: images.commercialBuilding,
    benefits: [
      'Solar heat and glare control',
      'Improved workplace comfort and productivity',
      'Privacy for offices and meeting rooms',
      'Anti-graffiti protective film options',
      'Branded and decorative film options',
      'Energy cost reduction',
      'Minimal disruption to your business',
    ],
    ctaLabel: 'Request a Commercial Quote',
    ctaPath: '/quote',
    metaTitle: 'Office & Shopfront Tinting Hobart | Spotless Tinting',
    metaDescription:
      'Commercial window tinting for offices, retail and shopfronts in Hobart. Solar control, privacy, anti-graffiti and branded film options.',
  },
  {
    id: 'ppf',
    name: 'Paint Protection Film',
    slug: 'paint-protection-film',
    shortDescription: "Preserve your paintwork against stone chips, scratches and everyday road damage.",
    description:
      'Paint Protection Film (PPF) is a transparent, self-healing urethane film applied to your vehicle\'s paint to protect against stone chips, scratches and road debris. We offer full-vehicle coverage and targeted protection for high-impact areas including the bonnet, bumper, mirrors and door edges. The film is virtually invisible, self-healing and maintains the gloss and clarity of your paintwork.',
    heroImage: images.heroCar,
    benefits: [
      'Self-healing technology',
      'Protection against stone chips and scratches',
      'Virtually invisible finish',
      'Full vehicle or targeted area coverage',
      'High-impact zone protection (bonnet, bumper, mirrors)',
      'Preserves resale value',
      'Long-lasting durability',
    ],
    ctaLabel: 'Get a PPF Quote',
    ctaPath: '/quote',
    metaTitle: 'Paint Protection Film Hobart | Spotless Tinting',
    metaDescription:
      'Paint Protection Film (PPF) in Hobart. Self-healing, virtually invisible protection against stone chips and scratches. Full vehicle or targeted areas.',
    crossLinks: ['automotive-window-tinting', 'vehicle-wrapping'],
  },
  {
    id: 'wrapping',
    name: 'Vehicle Wrapping',
    slug: 'vehicle-wrapping',
    shortDescription: 'Transform, personalise or promote your vehicle with professionally installed wraps.',
    description:
      'Vehicle wrapping transforms the appearance of your car, ute or fleet with premium vinyl films. Choose from full colour changes, partial wraps and commercial fleet branding. We offer matte, gloss, satin and custom finishes from leading vinyl brands. Every wrap is precision-cut and professionally applied for a seamless, showroom-quality result that protects your original paint underneath.',
    heroImage: images.matteWrap,
    benefits: [
      'Full colour change or partial wraps',
      'Matte, gloss, satin and custom finishes',
      'Fleet and commercial branding',
      'Protects original paintwork',
      'Removable and changeable',
      'Precision-cut, seamless application',
      'Showroom-quality finish',
    ],
    ctaLabel: 'Discuss Your Wrap',
    ctaPath: '/quote',
    metaTitle: 'Car Wraps & Vehicle Wrapping Hobart | Spotless Tinting',
    metaDescription:
      'Vehicle wrapping in Hobart. Full and partial wraps, colour changes and fleet branding in matte, gloss and satin finishes. Discuss your wrap today.',
    crossLinks: ['automotive-window-tinting', 'paint-protection-film'],
  },
  {
    id: 'ceramic',
    name: 'Ceramic Coating',
    slug: 'ceramic-coating',
    shortDescription: 'Advanced ceramic coating for a deep gloss finish, hydrophobic protection and easier maintenance.',
    description:
      'Ceramic coating is a liquid polymer applied to your vehicle\'s exterior that chemically bonds with the paint to create a durable, hydrophobic protective layer. The result is a deep, rich gloss that enhances the appearance of your vehicle while making it easier to clean and maintain. Ceramic coating helps protect against environmental contaminants, bird droppings and light scratches, keeping your vehicle looking newer for longer.',
    heroImage: images.ceramicCoating,
    benefits: [
      'Deep, enhanced gloss finish',
      'Hydrophobic — water and dirt repellent',
      'Easier washing and maintenance',
      'Protection against environmental contaminants',
      'Reduces light swirl marks',
      'Long-lasting protection',
      'Maintains vehicle appearance',
    ],
    ctaLabel: 'Get a Free Quote',
    ctaPath: '/quote',
    metaTitle: 'Ceramic Coating Hobart | Spotless Tinting',
    metaDescription:
      'Ceramic coating in Hobart. Deep gloss, hydrophobic protection and easier maintenance for your vehicle. Get a free quote today.',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
