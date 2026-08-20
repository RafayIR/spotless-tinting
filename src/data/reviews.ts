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
    customerName: '[CUSTOMER NAME]',
    rating: 5,
    review: '[INSERT REAL REVIEW — Replace this placeholder with a genuine customer review once available.]',
    service: 'Automotive Window Tinting',
    date: '[DATE]',
    source: 'Google',
  },
  {
    id: 'rev2',
    customerName: '[CUSTOMER NAME]',
    rating: 5,
    review: '[INSERT REAL REVIEW — Replace this placeholder with a genuine customer review once available.]',
    service: 'Paint Protection Film',
    date: '[DATE]',
    source: 'Google',
  },
  {
    id: 'rev3',
    customerName: '[CUSTOMER NAME]',
    rating: 5,
    review: '[INSERT REAL REVIEW — Replace this placeholder with a genuine customer review once available.]',
    service: 'Residential Window Tinting',
    date: '[DATE]',
    source: 'Facebook',
  },
];

export const overallRating = {
  score: 5.0,
  count: 3,
  source: 'Google',
};
