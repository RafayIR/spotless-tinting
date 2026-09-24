import { Helmet } from 'react-helmet-async';
import { business } from '@/data/business';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  schema?: object;
}

export default function SEO({ title, description, path, image, schema }: SEOProps) {
  const url = `https://${business.website}${path}`;
  const img = image
    ? image.startsWith('http')
      ? image
      : `https://${business.website}${image.startsWith('/') ? image : `/${image}`}`
    : `https://${business.website}/og-default.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
