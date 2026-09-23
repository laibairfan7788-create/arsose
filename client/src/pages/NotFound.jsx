import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { company } from '../company';
export default function NotFound(){return <section className="not-found"><Seo title="Page not found" description="The requested page was not found." noindex/><p className="eyebrow">404</p><h1>That page isn’t here.</h1><p>Let’s get you back to the {company.brandName} website.</p><Link className="button" to="/">Return home</Link></section>}
