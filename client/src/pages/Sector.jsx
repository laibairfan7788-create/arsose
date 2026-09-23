import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import { CTA, Checklist } from '../components/Sections';
import { BrandImage } from '../components/Layout';
import { company } from '../company';
import { sectors } from '../data';

export default function Sector() {
  const { slug } = useParams();
  const index = sectors.findIndex((sector) => sector.slug === slug);
  if (index < 0) return <Navigate to="/services" replace />;

  const sector = sectors[index];
  const Icon = sector.icon;
  const next = sectors[(index + 1) % sectors.length];
  const isChemical = sector.slug === 'chemical-business';
  const isIT = sector.slug === 'it-services';

  return (
    <>
      <Seo title={sector.name} description={sector.description} />
      <section className={`sector-hero ${sector.tone}`}>
        <div className="container">
          <Link className="back-link" to="/services"><ArrowLeft size={16} /> All services</Link>
          <div className="sector-hero-grid">
            <div>
              <p className="eyebrow light">Sector {sector.number}</p>
              <h1>{sector.name}</h1>
              <p className="lede">{sector.tagline}</p>
            </div>
            <div className={`sector-symbol${isIT ? ' sector-symbol--brand' : ''}`}>
              {isIT ? <BrandImage variant="tech" /> : <Icon aria-hidden="true" />}
            </div>
          </div>
        </div>
      </section>
      <section className="section sector-detail">
        <div className="container detail-grid">
          <div>
            <p className="eyebrow">Our capability</p>
            <h2>Dependable support for real operational needs.</h2>
            <p>{sector.description}</p>
            <p>{sector.detail}</p>
            {isIT && (
              <div className="division-callout">
                <strong>ARSOS TECH</strong>
                <p>ARSOS TECH is the technology and IT division of ARSOS, delivering focused technology services as part of the wider ARSOS business.</p>
              </div>
            )}
            {isChemical && (
              <a className="chemical-callout" href={company.phones.chemical.href}>
                <Phone aria-hidden="true" />
                <span>
                  <small>{company.phones.chemical.label}</small>
                  {company.phones.chemical.display}
                </span>
              </a>
            )}
          </div>
          <aside>
            <h3>{sector.label}</h3>
            <Checklist items={sector.items} />
          </aside>
        </div>
        <div className="container next-service">
          <span>Continue exploring</span>
          <Link to={`/services/${next.slug}`}>{next.name}<ArrowRight /></Link>
        </div>
      </section>
      <CTA title={`Looking for ${sector.name.toLowerCase()} support?`} />
    </>
  );
}
