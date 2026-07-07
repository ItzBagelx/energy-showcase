/**
 * Hero.jsx
 * ---------
 * Full-viewport hero section with:
 * - Headline + sub-copy
 * - Dual CTA buttons (primary + outline)
 * - Stat chips (social proof)
 * - Hero background image (LCP candidate — loaded with fetchpriority="high" via <link preload> in index.html)
 * - Decorative gradient overlays
 */
import './Hero.css';

const STATS = [
  { value: '1,200+', label: 'Installations' },
  { value: '£3.8M',  label: 'Client Savings' },
  { value: '23 yr',  label: 'Experience' },
  { value: '5★',     label: 'Average Rating' },
];

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero section">
      {/* Background image — this is the LCP element; no lazy-loading */}
      <img
        src="/hero.png"
        alt="Aerial view of solar panels and wind turbines on rolling green hills at golden hour"
        className="hero-bg-img"
        fetchpriority="high"
        decoding="async"
        width="1920"
        height="1080"
      />

      {/* Gradient overlays for contrast and readability */}
      <div className="hero-overlay hero-overlay--bottom" aria-hidden="true" />
      <div className="hero-overlay hero-overlay--left"   aria-hidden="true" />

      {/* Decorative glow blobs */}
      <div className="glow-blob hero-glow-1" aria-hidden="true" />
      <div className="glow-blob hero-glow-2" aria-hidden="true" />

      <div className="container hero-content">
        {/* Eyebrow badge */}
        <div className="badge hero-badge" aria-label="MCS certified company">
          <span aria-hidden="true">🏅</span>
          MCS Certified · Trusted UK Installer
        </div>

        {/* Main headline — split for visual emphasis */}
        <h1 className="hero-headline">
          Power Your Home
          <br />
          <em>With the Earth's Energy.</em>
        </h1>

        {/* Sub-copy */}
        <p className="hero-subtext">
          From rooftop solar and battery storage to biomass heating and micro-hydro
          turbines — Lumina Energy Group designs, installs, and maintains bespoke
          renewable systems that slash your bills and future-proof your property.
        </p>

        {/* CTA buttons */}
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary" id="hero-cta-primary">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2l1.5 4.5H15l-3.75 2.75 1.5 4.5L9 11l-3.75 2.75 1.5-4.5L3 6.5h4.5L9 2z" fill="currentColor"/>
            </svg>
            Get a Free Site Survey
          </a>
          <a href="#calculator" className="btn btn-outline" id="hero-cta-calc">
            Calculate My Savings
          </a>
        </div>

        {/* Stat chips */}
        <div className="hero-stats" role="list" aria-label="Company statistics">
          {STATS.map(({ value, label }) => (
            <div key={label} className="hero-stat-item" role="listitem">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="scroll-cue-line" />
        <span className="scroll-cue-dot" />
      </div>
    </section>
  );
}
