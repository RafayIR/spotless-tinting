export interface Review {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  source: string;
}

// Placeholder reviews — clearly marked for replacement with real customer reviews.
export const reviews: Review[] = [
  {
    id: 'rev1',
    customerName: 'Ryan Seibring',
    rating: 5,
    review: 'I am in the business of buying and then selling cars. Have had  several cars tinted from Spotless Tiring. I have always admired the professionalism and quality in their work',
    service: 'Automotive Window Tinting',
    date: '',
    source: 'Google',
  },
  {
    id: 'rev2',
    customerName: 'Angela Clark',
    rating: 5,
    review: 'Amazing service at great price. Had my car tinted first and recommended  Spotless tinting to all my family members',
    date: '',
    source: 'Google',
    service: ""
  },
  {
    id: 'rev3',
    customerName: 'James Fox',
    rating: 5,
    review: 'Had my car tinted from Spotless Tinting and am very satisfied with the finishing of the job. They really look after their customers.',
    service: 'Residential Window Tinting',
    date: '',
    source: 'Google',
  },
];

export const overallRating = {
  score: 5.0,
  count: 3,
  source: 'Google',
};
