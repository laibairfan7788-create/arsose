import Seo from '../components/Seo';
import { CTA, PageHero, SectionHeading, Values } from '../components/Sections';
import { company } from '../company';
import { purpose } from '../data';

export default function About(){return <>
  <Seo title="About" description={`Learn about ${company.brandName}, our mission, vision, commitment and values.`} />
  <PageHero eyebrow={`About ${company.brandName}`} title={<>Business works better<br/>when trust comes first.</>} text="A diversified business company focused on quality products, reliable services, and lasting customer relationships." />
  <section className="section intro"><div className="container intro-grid"><SectionHeading eyebrow="Who we are" title="Four sectors. One consistent standard."/><div><p>{company.brandName} is a diversified business company providing reliable products and professional services across Cleaning Items, Chemical, IT Services, and Hotel Supplies.</p><p>Our reach across multiple sectors allows us to serve a wide range of commercial and institutional requirements. We believe successful relationships are built on trust, quality, reliability, and consistent service.</p><p>We work closely with customers to understand their requirements and provide solutions that deliver genuine value, while continually developing our capabilities and strengthening supplier relationships.</p></div></div></section>
  <section className="purpose section"><div className="container"><div className="purpose-list">{purpose.map(({icon:Icon,eyebrow,title,text},i)=><article key={eyebrow}><span className="purpose-index">0{i+1}</span><div className="purpose-icon"><Icon/></div><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div></article>)}</div></div></section>
  <section className="section values"><div className="container"><SectionHeading eyebrow="Core values" title="What we stand for." text="Principles that guide our decisions, service and relationships."/><Values/></div></section><CTA />
  </>}
