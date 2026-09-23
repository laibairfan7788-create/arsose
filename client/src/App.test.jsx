import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import App from './App';

const renderAt = (path) => render(
  <HelmetProvider>
    <MemoryRouter initialEntries={[path]}><App /></MemoryRouter>
  </HelmetProvider>
);

describe('ARSOS routes', () => {
  it('renders all four public sector labels on home', () => {
    const view = renderAt('/');
    expect(screen.getAllByText('Cleaning Items').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Chemical').length).toBeGreaterThan(0);
    expect(screen.getAllByText('IT Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Hotel Supplies').length).toBeGreaterThan(0);
    expect(view.container).not.toHaveTextContent(/Chemical Business/i);
  });

  it('keeps the accessible mobile navigation toggle behavior', () => {
    renderAt('/');
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(navigation).not.toHaveClass('open');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(navigation).toHaveClass('open');
  });

  it('uses the official ARSOS logo in the global layout and admin branding', () => {
    const publicView = renderAt('/');
    const header = within(publicView.container.querySelector('header'));
    const footer = within(publicView.container.querySelector('footer'));
    [header, footer].forEach((region) => {
      expect(region.getByRole('img', { name: 'ARSOS' })).toHaveAttribute(
        'src',
        '/assets/brand/arsos-main-logo.png'
      );
      expect(region.queryByRole('img', { name: 'ARSOS TECH' })).not.toBeInTheDocument();
    });
    publicView.unmount();

    renderAt('/admin/login');
    expect(screen.getByRole('img', { name: 'ARSOS' })).toHaveAttribute(
      'src',
      '/assets/brand/arsos-main-logo.png'
    );
    expect(screen.queryByRole('img', { name: 'ARSOS TECH' })).not.toBeInTheDocument();
  });

  it('shows ARSOS TECH only as the IT division branding', () => {
    const view = renderAt('/services/it-services');
    expect(screen.getByRole('heading', { level: 1, name: 'IT Services' })).toBeInTheDocument();
    expect(screen.getByText('Technology consulting')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'ARSOS TECH' })).toHaveAttribute(
      'src',
      '/assets/brand/arsos-tech-logo.jpg'
    );
    expect(screen.getByText(/ARSOS TECH is the technology and IT division of ARSOS/i)).toBeInTheDocument();

    const header = within(view.container.querySelector('header'));
    const footer = within(view.container.querySelector('footer'));
    expect(header.queryByRole('img', { name: 'ARSOS TECH' })).not.toBeInTheDocument();
    expect(footer.queryByRole('img', { name: 'ARSOS TECH' })).not.toBeInTheDocument();
  });

  it('uses Chemical as the public label while retaining the existing route', () => {
    ['/about', '/services', '/services/chemical-business', '/contact'].forEach((path) => {
      const view = renderAt(path);
      expect(view.container).toHaveTextContent('Chemical');
      expect(view.container).not.toHaveTextContent(/Chemical Business/i);
      view.unmount();
    });
  });

  it('renders the approved company identity, address, phones and location', () => {
    renderAt('/contact');
    expect(screen.getByText('ARSOS Trading Company Private Limited for Storage')).toBeInTheDocument();
    const emailLinks = screen.getAllByRole('link', { name: 'Sales@arsos.com.sa' });
    expect(emailLinks.length).toBeGreaterThanOrEqual(2);
    emailLinks.forEach((link) => expect(link).toHaveAttribute('href', 'mailto:Sales@arsos.com.sa'));
    [
      'Prince Thamir Bin Abdul Aziz Street, Cross 19,',
      'Al Khobar Shamaliya – 34426,',
      'East Province,',
      'Kingdom of Saudi Arabia'
    ].forEach((line) => expect(screen.getAllByText(line).length).toBeGreaterThanOrEqual(2));
    [
      ['+966 53 063 6274', 'tel:+966530636274'],
      ['+966 50 873 5106', 'tel:+966508735106'],
      ['+966 55 778 1769', 'tel:+966557781769']
    ].forEach(([label, href]) => {
      const links = screen.getAllByRole('link', { name: label });
      expect(links.length).toBeGreaterThanOrEqual(2);
      links.forEach((link) => expect(link).toHaveAttribute('href', href));
    });

    const mapsUrl = 'https://www.google.com/maps?q=26.29572,50.20931';
    const mapLinks = [
      screen.getByRole('link', { name: 'Open in Google Maps' }),
      screen.getByRole('link', { name: 'View on Google Maps' })
    ];
    mapLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', mapsUrl);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
    expect(screen.getByText('Coordinates: 26.29572,50.20931')).toBeInTheDocument();
    expect(screen.getByTitle('ARSOS business location on Google Maps')).toHaveAttribute(
      'src',
      `${mapsUrl}&output=embed`
    );
    expect(screen.getByTitle('ARSOS business location on Google Maps')).toHaveAttribute('loading', 'lazy');
  });

  it('renders a prominent chemical enquiry phone link on the Chemical page', () => {
    renderAt('/services/chemical-business');
    expect(screen.getByRole('heading', { level: 1, name: 'Chemical' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chemical enquiries +966 55 778 1769' }))
      .toHaveAttribute('href', 'tel:+966557781769');
  });

  it('does not render public contact placeholders', () => {
    const view = renderAt('/contact');
    expect(view.container).not.toHaveTextContent('[To be provided]');
    expect(view.container).not.toHaveTextContent(/real company contact details have not yet been supplied/i);
  });
});
