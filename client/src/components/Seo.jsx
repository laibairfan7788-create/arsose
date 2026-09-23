import { Helmet } from 'react-helmet-async';
import { company } from '../company';

export default function Seo({ title, description, noindex = false }) {
  const fullTitle = title
    ? `${title} | ${company.brandName}`
    : `${company.brandName} | Building Business Solutions`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.brandName} />
      <meta property="og:url" content={company.website} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}
