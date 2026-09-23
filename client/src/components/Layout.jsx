import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { company } from '../company';
import { sectors } from '../data';

export function BrandImage({ variant = 'main', className = '' }) {
  const logo = company.logos[variant];
  return <img className={className} src={logo.src} alt={logo.alt} />;
}

export function Logo({ footer = false }) {
  return (
    <Link
      className={`logo${footer ? ' logo--footer' : ''}`}
      to="/"
      aria-label={`${company.brandName} home`}
    >
      <BrandImage />
    </Link>
  );
}

function FooterPhone({ phone }) {
  return (
    <p>
      <Phone size={16} aria-hidden="true" />
      <span>
        <small>{phone.label}</small>
        <a href={phone.href}>{phone.display}</a>
      </span>
    </p>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Logo />
          <button
            className="menu-button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="primary-navigation"
            className={open ? 'nav open' : 'nav'}
            aria-label="Primary navigation"
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <Link className="button button--small" to="/contact">
              Start an enquiry <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Logo footer />
            <p>Building business solutions. Delivering quality across cleaning, chemicals, IT, and hospitality.</p>
            <Link className="text-link light" to="/contact">
              Discuss your requirement <ArrowUpRight size={16} />
            </Link>
          </div>
          <div>
            <h2>Explore</h2>
            <Link to="/about">About {company.brandName}</Link>
            <Link to="/services">Our services</Link>
            {sectors.map((sector) => (
              <Link key={sector.slug} to={`/services/${sector.slug}`}>{sector.name}</Link>
            ))}
          </div>
          <div className="footer-contact">
            <h2>Contact</h2>
            <p>
              <Mail size={16} aria-hidden="true" />
              <span>
                <small>{company.email.label}</small>
                <a href={company.email.href}>{company.email.display}</a>
              </span>
            </p>
            <div className="footer-address">
              <MapPin size={16} aria-hidden="true" />
              <span>
                <small>Address</small>
                <address>{company.address.lines.map((line) => <span key={line}>{line}</span>)}</address>
                <a
                  className="footer-map-link"
                  href={company.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View ARSOS business location on Google Maps (opens in a new tab)"
                >
                  View on Google Maps <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </span>
            </div>
            <FooterPhone phone={company.phones.general} />
            <FooterPhone phone={company.phones.additional} />
            <FooterPhone phone={company.phones.chemical} />
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
          <Link to="/admin/login">Admin portal</Link>
        </div>
      </footer>
    </>
  );
}
