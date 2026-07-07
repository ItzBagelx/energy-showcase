/**
 * Footer.jsx
 * ----------
 * Site footer with:
 * - Company description + contact details
 * - Navigation column links
 * - Social links
 * - Copyright + legal links
 */
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <a href="#hero" className="brand footer-logo-link" aria-label="Lumina Energy Group — Back to top">
            <span className="brand-icon" aria-hidden="true" style={{ color: 'var(--clr-lime)' }}>
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 3C8.5 3 4 7.5 4 14c0 2.5.8 4.8 2.2 6.7L14 25l7.8-4.3C23.2 18.8 24 16.5 24 14c0-6.5-4.5-11-10-11z" fill="var(--clr-lime)"/>
                <path d="M14 25V14M14 14C10 12 7 8 7 8" stroke="var(--clr-forest)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="brand-name" style={{ fontSize: 'var(--text-lg)' }}>
              <span className="brand-verdant">Lumina</span>
              <span className="brand-energy"> Energy</span>
            </span>
          </a>
          <p className="footer-desc">
            MCS-certified renewable energy installation across England, Scotland, and Wales.
            Specialising in Solar PV, battery storage, biomass heating, and micro-hydro power.
          </p>
          <address className="footer-contact not-italic">
            <p>
              <span className="text-muted">📍</span> Unit 4, Greenfield Business Park,
              Cheltenham GL53 7PN
            </p>
            <p>
              <span className="text-muted">📞</span>{' '}
              <a href="tel:+441234567890" className="footer-link">01234 567 890</a>
            </p>
            <p>
              <span className="text-muted">✉️</span>{' '}
              <a href="mailto:hello@luminaenergy.co.uk" className="footer-link">
                hello@luminaenergy.co.uk
              </a>
            </p>
          </address>
        </div>

        {/* Services nav */}
        <nav className="footer-nav-col" aria-label="Services navigation">
          <h4 className="footer-nav-heading">Services</h4>
          <ul role="list">
            <li><a href="#services" className="footer-link">Solar PV & Battery</a></li>
            <li><a href="#services" className="footer-link">Biomass Heating</a></li>
            <li><a href="#services" className="footer-link">Micro-Hydro Power</a></li>
            <li><a href="#calculator" className="footer-link">ROI Calculator</a></li>
          </ul>
        </nav>

        {/* Company nav */}
        <nav className="footer-nav-col" aria-label="Company navigation">
          <h4 className="footer-nav-heading">Company</h4>
          <ul role="list">
            <li><a href="#why-us" className="footer-link">Why Choose Us</a></li>
            <li><a href="#testimonials" className="footer-link">Customer Stories</a></li>
            <li><a href="#" className="footer-link">Case Studies</a></li>
            <li><a href="#" className="footer-link">Blog & Guides</a></li>
            <li><a href="#contact" className="footer-link">Contact Us</a></li>
          </ul>
        </nav>

        {/* Accreditations col */}
        <div className="footer-nav-col">
          <h4 className="footer-nav-heading">Accreditations</h4>
          <div className="footer-certs">
            {['MCS', 'HETAS', 'RECC', 'NAPIT'].map((cert) => (
              <span key={cert} className="footer-cert-badge">{cert}</span>
            ))}
          </div>
          <p className="footer-cert-note text-muted">
            All installations eligible for UK government grant schemes including the Boiler
            Upgrade Scheme and Smart Export Guarantee.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {year} Lumina Energy Group Ltd. Registered in England & Wales. Company No. 12345678.
            VAT: GB 123 4567 89.
          </p>
          <nav aria-label="Legal navigation">
            <ul role="list" className="footer-legal">
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms & Conditions</a></li>
              <li><a href="#" className="footer-link">Cookie Policy</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
