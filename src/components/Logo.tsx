import { Link } from 'react-router-dom';
import { images } from '@/data/images';
import { business } from '@/data/business';

type LogoProps = {
  className?: string;
  asLink?: boolean;
};

export default function Logo({ className = 'h-9 w-auto', asLink = true }: LogoProps) {
  const img = (
    <img
      src={images.logo}
      alt={business.name}
      className={className}
      width={160}
      height={36}
    />
  );

  if (!asLink) return img;

  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label={`${business.name} home`}>
      {img}
    </Link>
  );
}
