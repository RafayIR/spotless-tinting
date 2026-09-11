import { Link } from 'react-router-dom';
import { images } from '@/data/images';
import { business } from '@/data/business';

type LogoProps = {
  className?: string;
  asLink?: boolean;
};

export default function Logo({ className = 'h-16 w-auto', asLink = true }: LogoProps) {

  const img = (
    <>
      <img
        src={images.logo}
        alt={business.name}
        className={`object-contain dark:hidden ${className}`}
        width={250}
        height={250}
        decoding="async"
      />
      <img
        src={images.logoWhite}
        alt={business.name}
        className={`hidden object-contain dark:block ${className}`}
        width={250}
        height={250}
        decoding="async"
      />
    </>
  );

  if (!asLink) return img;

  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label={`${business.name} home`}>
      {img}
    </Link>
  );
}
