// Centralized business info — placeholders marked for replacement with real business details.

export const business = {
  name: 'Spotless Tinting',
  legalName: 'Spotless Tinting Pty Ltd',
  abn: '59 645 122 916',
  tagline: 'Premium Tinting & Vehicle Protection',
  location: 'Moonah & Bellerive, Hobart, Tasmania',
  address: 'Moonah, Hobart, TAS',
  locations: ['Moonah, Hobart, TAS', 'Bellerive, Hobart, TAS'],
  workshopLocations: [
    {
      name: 'Moonah',
      lines: ['Unit 9, 14A Main Road', 'Moonah TAS 7009'],
    },
    {
      name: 'Bellerive',
      lines: ['107A Cambridge Road', 'Bellerive TAS 7018'],
    },
  ],
  phone: '+61 451 459 690',
  phoneDisplay: '0451 459 690',
  phoneHref: 'tel:+61451459690',
  email: 'spotlesstinting@gmail.com',
  emailHref: 'mailto:spotlesstinting@gmail.com',
  website: 'spotlesstinting.com.au',
  hours: [
    { day: 'Monday', hours: '8 AM – 5 PM' },
    { day: 'Tuesday', hours: '8 AM – 5 PM' },
    { day: 'Wednesday', hours: '8 AM – 5 PM' },
    { day: 'Thursday', hours: '8 AM – 5 PM' },
    { day: 'Friday', hours: '8 AM – 5 PM' },
    { day: 'Saturday', hours: '8 AM – 5 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  social: {
    facebook: '[FACEBOOK URL]',
    instagram: '[INSTAGRAM URL]',
    google: 'https://www.google.com/search?q=Spotless+Tinting+Hobart',
  },
  serviceAreas: ['Moonah', 'Bellerive', 'Glenorchy', 'Hobart CBD', 'New Town', 'Greater Hobart'],
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
  {
    label: 'Film Visualizer',
    path: '/film-simulator',
    matchPaths: ['/film-simulator'],
    // 3D Tint Viewer temporarily hidden
    // dropdown: [
    //   { label: 'Film Visualizer', path: '/film-simulator' },
    //   { label: '3D Tint Viewer', path: '/3d-tint-viewer' },
    // ],
  },
  { label: 'Contact', path: '/contact' },
];

/** @deprecated Use navItems */
export const navLinks = navItems.map((item) => ({
  label: item.label,
  path: item.path,
  dropdown: Boolean(item.dropdown),
}));
