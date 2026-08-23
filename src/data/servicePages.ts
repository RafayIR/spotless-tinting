import {
  Sun,
  Shield,
  Eye,
  Lock,
  Sparkles,
  Star,
  Wrench,
  MapPin,
  MessageSquare,
  SprayCan,
  Scissors,
  Paintbrush,
  CircleCheck,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { images } from './images';

export interface ServiceHeroFeature {
  icon: LucideIcon;
  label: string;
}

export interface ServiceTrustItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ServiceProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface ShadeOption {
  name: string;
  vlt: string;
  desc: string;
  image: string;
}

export interface ServiceGalleryItem {
  id: string;
  title: string;
  image: string;
  filter: 'Sedans' | 'SUVs' | 'Utes' | 'Sports';
}

export interface ServicePageContent {
  heroTagline: string;
  heroSubtitle: string;
  heroFeatures: ServiceHeroFeature[];
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  trustItems: ServiceTrustItem[];
  whyTitle: string;
  whyDesc: string;
  whyChecklist: string[];
  whyImage: string;
  whyOverlay: { highlight: string; text: string };
  shadesTitle: string;
  shadesSubtitle: string;
  shadeOptions: ShadeOption[];
  tintLaws: { title: string; desc: string; ctaLabel: string; ctaPath: string };
  processTitle: string;
  processSubtitle: string;
  processSteps: ServiceProcessStep[];
  galleryTitle: string;
  gallerySubtitle: string;
  galleryFilters: string[];
  galleryItems: ServiceGalleryItem[];
  ctaTitle: string;
  ctaSubtitle: string;
}

export const automotivePageContent: ServicePageContent = {
  heroTagline: 'Comfort · Protection · Style',
  heroSubtitle:
    'Premium window films professionally installed for heat rejection, UV protection, privacy and a refined finish — tailored to your vehicle and Tasmanian tint laws.',
  heroFeatures: [
    { icon: Sun, label: 'Heat Reduction' },
    { icon: Shield, label: 'UV Protection' },
    { icon: Eye, label: 'Glare Reduction' },
    { icon: Lock, label: 'Privacy Enhanced' },
    { icon: Sparkles, label: 'Premium Look' },
  ],
  secondaryCtaLabel: 'View Tint Options',
  secondaryCtaHref: '#shades',
  trustItems: [
    {
      icon: Star,
      title: 'Premium Films',
      desc: 'Ceramic, carbon and dyed options from trusted brands for lasting performance.',
    },
    {
      icon: Wrench,
      title: 'Expert Installation',
      desc: 'Meticulous prep and bubble-free application by experienced technicians.',
    },
    {
      icon: MapPin,
      title: 'Local & Trusted',
      desc: 'Moonah-based, proudly serving Hobart and greater southern Tasmania.',
    },
    {
      icon: Shield,
      title: 'Satisfaction Guarantee',
      desc: 'We stand behind our workmanship with warranty-backed installation.',
    },
  ],
  whyTitle: 'Why Tint Your Vehicle?',
  whyDesc:
    'Window tinting is one of the most effective upgrades for comfort, protection and style. Our premium films reject heat, block harmful UV rays and reduce glare — while giving your vehicle a clean, refined appearance.',
  whyChecklist: [
    'Reduces heat for a cooler interior',
    'Blocks up to 99% of UV rays',
    'Reduces glare for safer driving',
    'Enhances privacy and security',
    'Protects interior from fading',
    'Adds a premium, refined look',
  ],
  whyImage: images.carInterior,
  whyOverlay: {
    highlight: 'Stay cooler in summer.',
    text: 'Protect your skin. Protect your investment.',
  },
  shadesTitle: 'Find Your Perfect Shade',
  shadesSubtitle:
    'Choose the VLT level that suits your style, comfort and legal requirements. We will help you select the right film for every window.',
  shadeOptions: [
    {
      name: 'Light',
      vlt: '35% VLT',
      desc: 'Subtle tint with excellent heat rejection — ideal for front side windows where permitted.',
      image: images.coupeSide,
    },
    {
      name: 'Medium',
      vlt: '20% VLT',
      desc: 'Balanced privacy and visibility with strong solar performance.',
      image: images.luxurySedan,
    },
    {
      name: 'Dark',
      vlt: '5% VLT',
      desc: 'Maximum privacy and a bold, premium appearance on rear windows.',
      image: images.blackCar,
    },
    {
      name: 'Ceramic',
      vlt: 'Premium',
      desc: 'Top-tier heat rejection without a overly dark look — our most popular upgrade.',
      image: images.sportsCar,
    },
    {
      name: 'Factory Match',
      vlt: 'OEM Style',
      desc: 'A clean factory-style finish that complements your vehicle\'s original design.',
      image: images.suvDark,
    },
  ],
  tintLaws: {
    title: 'Tasmanian Tint Laws',
    desc: 'Front side windows must allow at least 35% light transmission. Rear windows and rear windscreen have no VLT restriction in Tasmania. We ensure every installation meets current regulations.',
    ctaLabel: 'Learn More',
    ctaPath: '/faq',
  },
  processTitle: 'Our Tinting Process',
  processSubtitle:
    'A proven six-step process for consistent, flawless results on every vehicle.',
  processSteps: [
    {
      num: '01',
      title: 'Consult',
      desc: 'We discuss your goals, film options and legal requirements for your vehicle.',
      icon: MessageSquare,
    },
    {
      num: '02',
      title: 'Prepare',
      desc: 'Windows are thoroughly cleaned and the workspace prepared for a dust-free install.',
      icon: SprayCan,
    },
    {
      num: '03',
      title: 'Cut',
      desc: 'Film is precision-cut to your vehicle\'s exact window profile.',
      icon: Scissors,
    },
    {
      num: '04',
      title: 'Install',
      desc: 'Expert application with professional tools for a seamless, bubble-free finish.',
      icon: Paintbrush,
    },
    {
      num: '05',
      title: 'Inspect',
      desc: 'Every edge and window is checked under proper lighting before completion.',
      icon: CircleCheck,
    },
    {
      num: '06',
      title: 'Deliver',
      desc: 'Your vehicle is ready — with aftercare guidance so your tint cures perfectly.',
      icon: KeyRound,
    },
  ],
  galleryTitle: 'Recent Automotive Tinting Projects',
  gallerySubtitle: 'A selection of recent tinting work across sedans, SUVs, utes and sports cars.',
  galleryFilters: ['All', 'Sedans', 'SUVs', 'Utes', 'Sports'],
  galleryItems: [
    { id: 'g1', title: 'BMW Sedan', image: images.luxurySedan, filter: 'Sedans' },
    { id: 'g2', title: 'Range Rover SUV', image: images.suvDark, filter: 'SUVs' },
    { id: 'g3', title: 'Holden Ute', image: images.blackCar, filter: 'Utes' },
    { id: 'g4', title: 'Porsche Sports', image: images.sportsCar, filter: 'Sports' },
    { id: 'g5', title: 'Mercedes Sedan', image: images.coupeSide, filter: 'Sedans' },
    { id: 'g6', title: 'Toyota LandCruiser', image: images.heroCar, filter: 'SUVs' },
  ],
  ctaTitle: 'Ready to Upgrade Your Ride?',
  ctaSubtitle:
    'Experience the Spotless difference — premium films, expert installation and results you can see from day one.',
};

export const servicePageBySlug: Record<string, ServicePageContent> = {
  'automotive-window-tinting': automotivePageContent,
};
