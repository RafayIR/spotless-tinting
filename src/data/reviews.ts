export interface Review {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  source: string;
  location?: string;
}

// Placeholder reviews — clearly marked for replacement with real customer reviews.
export const reviews: Review[] = [
  {
    id: 'rev1',
    customerName: 'Ryan Seibring',
    rating: 5,
    review:
      'I am in the business of buying and then selling cars. Have had several cars tinted from Spotless Tinting. I have always admired the professionalism and quality in their work',
    service: 'Automotive Window Tinting',
    date: '',
    source: 'Google',
    location: 'Hobart',
  },
  {
    id: 'rev2',
    customerName: 'Angela Clark',
    rating: 5,
    review:
      'Amazing service at great price. Had my car tinted first and recommended Spotless tinting to all my family members',
    date: '',
    source: 'Google',
    service: '',
    location: 'Hobart',
  },
  {
    id: 'rev3',
    customerName: 'James Fox',
    rating: 5,
    review:
      'Had my car tinted from Spotless Tinting and am very satisfied with the finishing of the job. They really look after their customers.',
    service: 'Residential Window Tinting',
    date: '',
    source: 'Google',
    location: 'Hobart',
  },
];

export const overallRating = {
  score: 5.0,
  count: 150,
  countLabel: '150+',
  source: 'Google',
};

export const trustedBrands = [
  { name: 'SunTek', logo: '/home/brands/1.png' },
  { name: 'Avery Dennison', logo: '/home/brands/2.png' },
  { name: 'XPEL', logo: '/home/brands/3.png' },
  { name: 'LLumar', logo: '/home/brands/4.png' },
  { name: 'HEXIS', logo: '/home/brands/5.png' },
  { name: '3M', logo: '/home/brands/6.png' },
] as const;
