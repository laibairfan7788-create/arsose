import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { BrandImage } from '../components/Layout';
import Seo from '../components/Seo';
import { CTA, SectorGrid, SectionHeading, WhyUs } from '../components/Sections';
import { company } from '../company';

export default function Home() { return <>
  <Seo description={`${company.brandName} provides dependable services across Cleaning Items, Chemical, IT Services and Hotel Supplies.`} />
  <section className="hero"><div className="hero-pattern" /><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow light">Diversified trading &amp; services</p><h1>Built around<br/><em>your business.</em></h1><p className="lede">Reliable products and professional services across four essential sectors—brought together by one customer-focused partner.</p><div className="hero-actions"><Link className="button button--light" to="/services">Explore our services <ArrowUpRight size={18}/></Link><Link className="text-link light" to="/about">Get to know {company.brandName} <ArrowDownRight size={18}/></Link></div></div>
    <div className="hero-visual" aria-label={`${company.brandName} connects four business sectors`}><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="hero-badge"><span>4</span> connected<br/>business sectors</div><div className="hero-note"><CheckCircle2 /> Quality<br/>Value<br/>Dependability</div></div></div>
  </section>
  <section className="statement"><div className="container statement-grid"><p>Your trusted business partner</p><h2>We make procurement and business support <em>simpler, more reliable,</em> and more efficient.</h2></div></section>
  <section className="section sectors"><div className="container"><SectionHeading eyebrow="Our services" title="Solutions shaped for modern operations." text={`${company.brandName} operates across four key business areas, supporting evolving commercial and institutional requirements.`}/><SectorGrid /></div></section>
  <section className="section split-feature"><div className="container split-grid"><div className="feature-art"><span className="art-ring"/><div><BrandImage /><small>One relationship.<br/>Multiple capabilities.</small></div></div><div><SectionHeading eyebrow="A practical partnership" title="Quality products meet responsive service."/><p>We work closely with customers to understand their requirements and provide solutions that deliver genuine value. As those needs change, we continue to strengthen our capabilities, supplier relationships, and service portfolio.</p><Link className="text-link" to="/about">Our approach <ArrowUpRight size={17}/></Link></div></div></section>
  <WhyUs/><CTA />
  </>; }
