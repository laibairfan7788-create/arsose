import { Link } from 'react-router-dom';
import { ArrowRight, Check, MessageSquareText } from 'lucide-react';
import { company } from '../company';
import { reasons, sectors, values } from '../data';

export function PageHero({ eyebrow, title, text, children }) { return <section className="page-hero"><div className="orb orb-one" /><div className="container"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1>{text && <p className="lede">{text}</p>}{children}</div></section>; }

export function SectionHeading({ eyebrow, title, text, center = false }) { return <div className={`section-heading ${center ? 'center' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>; }

export function SectorGrid({ compact = false }) { return <div className={`sector-grid ${compact ? 'compact' : ''}`}>{sectors.map(s => { const Icon=s.icon; return <Link className={`sector-card ${s.tone}`} to={`/services/${s.slug}`} key={s.slug}><div className="sector-top"><span>{s.number}</span><Icon aria-hidden="true" /></div><div><h3>{s.name}</h3><p>{s.tagline}</p><span className="card-link">Explore sector <ArrowRight size={17} /></span></div></Link>; })}</div>; }

export function WhyUs() { return <section className="section why"><div className="container"><SectionHeading eyebrow="Why choose us" title="One partner. Many business needs." text="Our approach brings practical support, professional standards and attentive service together." /><div className="reason-grid">{reasons.map(({icon: Icon, title, text}, i) => <article key={title}><span className="reason-number">0{i+1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>; }

export function Values() { return <div className="values-grid">{values.map(({icon: Icon,title,text}) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>; }

export function CTA({ title = 'Let’s make your next requirement easier.', text = 'Tell us what your business needs. Our team will review your enquiry and respond using the contact details you provide.' }) { return <section className="cta"><div className="container cta-inner"><div><p className="eyebrow light">Talk to {company.brandName}</p><h2>{title}</h2><p>{text}</p></div><Link className="button button--light" to="/contact"><MessageSquareText size={19} /> Send an enquiry</Link></div></section>; }

export function Checklist({ items }) { return <ul className="checklist">{items.map(item => <li key={item}><span><Check size={15} /></span>{item}</li>)}</ul>; }
