// Centralized business info — placeholders marked for replacement with real business details.

export const business = {
  name: 'Spotless Tinting',
  tagline: 'Premium Tinting & Vehicle Protection',
  location: 'Moonah, Hobart, Tasmania',
  address: 'Moonah, Hobart, TAS',
  phone: '+61 451 459 690',
  phoneHref: 'tel:+61451459690',
  email: 'info@spotlesstinting.com.au',
  emailHref: 'mailto:info@spotlesstinting.com.au',
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

export interface NavDropdownItem {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path: string;
  matchPaths?: string[];
  dropdown?: NavDropdownItem[];
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Window Tinting',
    path: '/services',
    matchPaths: [
      '/services',
      '/services/automotive-window-tinting',
      '/services/residential-window-tinting',
      '/services/commercial-window-tinting',
    ],
    dropdown: [
      { label: 'Window Tinting Overview', path: '/services' },
      { label: 'Automotive Window Tinting', path: '/services/automotive-window-tinting' },
      { label: 'Residential Window Tinting', path: '/services/residential-window-tinting' },
      { label: 'Commercial Window Tinting', path: '/services/commercial-window-tinting' },
    ],
  },
  {
    label: 'PPF',
    path: '/services/paint-protection-film',
    matchPaths: ['/services/paint-protection-film'],
  },
  {
    label: 'Vehicle Wraps',
    path: '/services/vehicle-wrapping',
    matchPaths: ['/services/vehicle-wrapping', '/services/ceramic-coating'],
    dropdown: [
      { label: 'Vehicle Wrapping', path: '/services/vehicle-wrapping' },
      { label: 'Ceramic Coating', path: '/services/ceramic-coating' },
    ],
  },
  // {
  //   label: 'Smart Tint',
  //   path: '/services/residential-window-tinting#smart-tint',
  // },
  { label: 'Our Work', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

/** @deprecated Use navItems */
export const navLinks = navItems.map((item) => ({
  label: item.label,
  path: item.path,
  dropdown: Boolean(item.dropdown),
}));
