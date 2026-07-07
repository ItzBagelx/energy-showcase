/**
 * Header.jsx
 * ----------
 * Sticky navigation header with:
 * - Logo + wordmark
 * - Desktop anchor navigation
 * - Prominent "Get a Quote" CTA button
 * - Hamburger menu for mobile with smooth slide-down drawer
 * - Scroll-aware background blur (glassmorphism)
 */
import { useState, useEffect, useCallback } from 'react';
import './Header.css';

const NAV_LINKS = [
  { label: 'Services',      href: '#services' },
  { label: 'ROI Calculator', href: '#calculator' },
  { label: 'Why Us',        href: '#why-us' },
  { label: 'Testimonials',  href: '#testimonials' },
];

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Add glassmorphism background once user scrolls 80px
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on any nav click
  const handleNavClick = () => setMenuOpen(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container header-inner">
        {/* ── Brand / Logo ── */}
        <a href="#hero" className="brand" aria-label="Lumina Energy Group — Home">
          <span className="brand-icon" aria-hidden="true">
            <LeafIcon />
          </span>
          <span className="brand-name">
            <span className="brand-verdant">Lumina</span>
            <span className="brand-energy"> Energy</span>
          </span>
        </a>

        {/* ── Desktop Navigation ── */}
        <nav className="nav-desktop" aria-label="Main navigation">
          <ul role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="nav-link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Header CTA (desktop) ── */}
        <a href="#contact" className="btn btn-primary header-cta" id="header-cta-btn">
          Get a Free Quote
        </a>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="mobile-nav-link" onClick={handleNavClick}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-primary w-full text-center" onClick={handleNavClick}>
              Get a Free Quote
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/* ── Inline SVG leaf icon for zero-network-request branding ── */
function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M14 3C8.5 3 4 7.5 4 14c0 2.5.8 4.8 2.2 6.7L14 25l7.8-4.3C23.2 18.8 24 16.5 24 14c0-6.5-4.5-11-10-11z"
        fill="currentColor"
        className="leaf-fill"
      />
      <path
        d="M14 25V14M14 14C10 12 7 8 7 8"
        stroke="var(--clr-forest)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
