import { Helmet } from 'react-helmet-async';

const BASE = 'TechCore';

export default function SEO({ title, description, path = '' }) {
  const fullTitle = title ? `${title} | ${BASE}` : `${BASE} — Product Engineering Agency`;
  const url = `https://techcore.dev${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
