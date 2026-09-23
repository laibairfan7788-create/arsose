import { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import Seo from '../components/Seo';
import { PageHero } from '../components/Sections';
import { company } from '../company';
import { sectors } from '../data';

const empty = { name: '', email: '', phone: '', company: '', sector: '', message: '', website: '' };

function ContactPhone({ phone, prominent = false }) {
  return (
    <p className={prominent ? 'contact-phone contact-phone--chemical' : 'contact-phone'}>
      <Phone aria-hidden="true" />
      <span>
        <small>{phone.label}</small>
        <a href={phone.href}>{phone.display}</a>
      </span>
    </p>
  );
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: 'idle', message: '' });
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setState({ status: 'loading', message: '' });
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send your enquiry.');
      setForm(empty);
      setState({ status: 'success', message: 'Thank you. Your enquiry has been received.' });
    } catch (error) {
      setState({ status: 'error', message: error.message });
    }
  };

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${company.brandName} at ${company.legalName} about Cleaning Items, Chemical, IT Services or Hotel Supplies.`}
      />
      <PageHero
        eyebrow={`Contact ${company.brandName}`}
        title={<>Tell us what your<br />business needs.</>}
        text="Send a clear summary of your requirement. We’ll route it to the appropriate business sector."
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <p className="eyebrow">Contact information</p>
            <h2>Let’s start a useful conversation.</h2>
            <p className="company-name">{company.legalName}</p>
            <div className="contact-list">
              <p>
                <Mail aria-hidden="true" />
                <span>
                  <small>{company.email.label}</small>
                  <a href={company.email.href}>{company.email.display}</a>
                </span>
              </p>
              <div className="contact-address">
                <MapPin aria-hidden="true" />
                <span>
                  <small>Address</small>
                  <address>{company.address.lines.map((line) => <span key={line}>{line}</span>)}</address>
                </span>
              </div>
              <ContactPhone phone={company.phones.general} />
              <ContactPhone phone={company.phones.additional} />
              <ContactPhone phone={company.phones.chemical} prominent />
            </div>
          </div>
          <form className="enquiry-form" onSubmit={submit} noValidate>
            <div className="form-row">
              <Field label="Full name" name="name" value={form.name} onChange={change} required />
              <Field label="Work email" name="email" type="email" value={form.email} onChange={change} required />
            </div>
            <div className="form-row">
              <Field label="Phone (optional)" name="phone" value={form.phone} onChange={change} />
              <Field label="Company (optional)" name="company" value={form.company} onChange={change} />
            </div>
            <label>
              Business sector
              <select name="sector" value={form.sector} onChange={change} required>
                <option value="">Choose a sector</option>
                {sectors.map((sector) => <option key={sector.slug} value={sector.slug}>{sector.name}</option>)}
                <option value="general">General enquiry</option>
              </select>
            </label>
            <label>
              How can we help?
              <textarea
                name="message"
                value={form.message}
                onChange={change}
                minLength="20"
                maxLength="2000"
                required
                placeholder="Briefly describe the products or services you need…"
              />
            </label>
            <label className="honeypot" aria-hidden="true">
              Website
              <input name="website" value={form.website} onChange={change} tabIndex="-1" autoComplete="off" />
            </label>
            {state.status === 'success' && (
              <div className="form-notice success" role="status"><CheckCircle2 />{state.message}</div>
            )}
            {state.status === 'error' && (
              <div className="form-notice error" role="alert"><AlertCircle />{state.message}</div>
            )}
            <button className="button" disabled={state.status === 'loading'}>
              {state.status === 'loading' ? 'Sending…' : <>Send enquiry <Send size={17} /></>}
            </button>
            <p className="form-privacy">
              By submitting, you consent to {company.brandName} using these details only to respond to your enquiry.
            </p>
          </form>
        </div>
      </section>
      <section className="section location-section" aria-labelledby="location-heading">
        <div className="container location-card">
          <div className="location-copy">
            <p className="eyebrow">Business location</p>
            <h2 id="location-heading">Find ARSOS in Al Khobar.</h2>
            <address>{company.address.lines.map((line) => <span key={line}>{line}</span>)}</address>
            <a
              className="button"
              href={company.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open ARSOS business location in Google Maps (opens in a new tab)"
            >
              Open in Google Maps <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <p className="location-coordinates">Coordinates: {company.location.coordinates}</p>
          </div>
          <div className="map-panel">
            <iframe
              src={company.location.embedUrl}
              title="ARSOS business location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className="map-fallback">
              If the map is unavailable, use the “Open in Google Maps” link for directions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...props }) {
  return <label>{label}<input {...props} /></label>;
}
