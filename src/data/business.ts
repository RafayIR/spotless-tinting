// Centralized business info — placeholders marked for replacement with real business details.

export const business = {
  name: 'Spotless Tinting',
  tagline: 'Premium Tinting & Vehicle Protection',
  location: 'Moonah, Hobart, Tasmania',
  address: 'Moonah, Hobart, TAS',
  phone: '+61 451 459 690',
  phoneHref: 'tel:+61451459690',
  email: 'spotlesstinting@gmail.com',
  emailHref: 'mailto:spotlesstinting@gmail.com',
  website: 'spotlesstinting.com.au',
  hours: [
    { day: 'Monday', hours: 'By appointment' },
    { day: 'Tuesday', hours: 'By appointment' },
    { day: 'Wednesday', hours: 'By appointment' },
    { day: 'Thursday', hours: 'By appointment' },
    { day: 'Friday', hours: 'By appointment' },
    { day: 'Saturday', hours: 'By appointment' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  social: {
    facebook: '[FACEBOOK URL]',
    instagram: '[INSTAGRAM URL]',
    google: 'https://www.google.com/search?q=Spotless+Tinting+Hobart',
  },
  serviceAreas: ['Moonah', 'Glenorchy', 'Hobart CBD', 'New Town', 'Greater Hobart'],
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', dropdown: true },
  { label: 'Our Work', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'FAQs', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];
