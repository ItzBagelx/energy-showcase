/**
 * Services.jsx
 * ------------
 * Services hub section with three technology categories:
 *  1. Solar PV & Battery Storage
 *  2. Biomass Heating
 *  3. Micro-Hydro Power
 *
 * Each card has:
 * - Custom SVG icon, eyebrow label, title, and technical description
 * - Key spec details (expandable accordion)
 * - CTA link
 *
 * Uses scroll-reveal animation via IntersectionObserver (.reveal class)
 */
import { useState } from 'react';
import './Services.css';

const SERVICES = [
  {
    id: 'solar',
    eyebrow: 'Solar PV & Battery',
    title: 'Sun-Powered, Grid-Independent Living',
    summary:
      'Modern monocrystalline panels convert up to 22.8% of available sunlight into usable electricity — a dramatic improvement over the 15% efficiency of panels installed a decade ago. When paired with a lithium iron phosphate (LiFePO₄) battery, your home stores surplus midday generation for use after dark, reducing grid dependency by up to 80%.',
    specs: [
      { label: 'Panel Efficiency',   value: 'Up to 22.8% (SunPower Maxeon)' },
      { label: 'Battery Chemistry',  value: 'LiFePO₄ — safer, longer cycle life' },
      { label: 'System Size',        value: '4 kWp – 16 kWp residential' },
      { label: 'Inverter Type',      value: 'Hybrid inverter for grid/off-grid switching' },
      { label: 'Smart Export',       value: 'SEG payments up to 15p/kWh exported' },
    ],
    detail:
      'Our hybrid inverter topology means your system can run entirely off-grid during outages, automatically switching loads to battery without interrupting your appliances. We size battery banks using your precise consumption profile — not just rule-of-thumb estimates — so you never over-invest.',
    cta: 'Explore Solar Solutions',
    accentColor: 'hsl(45, 90%, 58%)',
    accentGlow: 'hsla(45, 90%, 58%, 0.15)',
  },
  {
    id: 'biomass',
    eyebrow: 'Biomass Heating',
    title: 'Carbon-Neutral Heat From Managed Woodland',
    summary:
      'Biomass boilers combust sustainably sourced wood chip, wood pellet, or log fuel to produce space and domestic hot water heating. When fuel is sourced from responsibly managed UK woodlands, the carbon emitted during combustion is recaptured by regrowth — achieving near-zero net carbon emissions.',
    specs: [
      { label: 'Fuel Types',         value: 'Wood chip (G30/G50), wood pellet (EN-A1)' },
      { label: 'Boiler Output',      value: '15 kW – 500 kW (domestic to commercial)' },
      { label: 'System Efficiency',  value: '89–94% NCV (seasonal)' },
      { label: 'Government Scheme',  value: 'Eligible for Boiler Upgrade Scheme (BUS)' },
      { label: 'Compliance',         value: 'MCS, HETAS certified installations' },
    ],
    detail:
      'The UK Boiler Upgrade Scheme (BUS) currently provides a £5,000 grant for biomass boiler installations in eligible properties. Our MCS and HETAS accreditations are required to access this funding. We handle the grant application paperwork end-to-end — you simply choose your fuel and we do the rest.',
    cta: 'Explore Biomass Heating',
    accentColor: 'hsl(88, 85%, 52%)',
    accentGlow: 'hsla(88, 85%, 52%, 0.15)',
  },
  {
    id: 'hydro',
    eyebrow: 'Micro-Hydro Power',
    title: 'Harness Flowing Water for 24/7 Generation',
    summary:
      'Unlike solar or wind, a well-sited micro-hydro system generates electricity around the clock, regardless of weather. Even a modest watercourse with a flow rate of 2–5 litres per second and a 5-metre head can power an entire rural property. We conduct full hydrological surveys before recommending any turbine.',
    specs: [
      { label: 'Minimum Flow',       value: '≥ 2 L/s (typical residential)' },
      { label: 'Head Requirement',   value: '≥ 3 m (low-head Turgo turbines)' },
      { label: 'Turbine Types',      value: 'Turgo (medium/high head), Kaplan (low head)' },
      { label: 'Output Range',       value: '500 W – 100 kW' },
      { label: 'Capacity Factor',    value: '40–60% (vs 10–15% for solar in UK)' },
    ],
    detail:
      'Our preferred Turgo impulse turbines are particularly suited to UK streams: they handle sediment better than Pelton wheels, are more compact, and tolerate flow variation across seasons. We model your watercourse using EA river gauge data and on-site flow measurement to provide a guaranteed annual generation estimate.',
    cta: 'Explore Micro-Hydro',
    accentColor: 'hsl(210, 80%, 60%)',
    accentGlow: 'hsla(210, 80%, 60%, 0.15)',
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <section className="services-section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Our Technologies</span>
          <div className="section-divider" />
          <h2 className="section-title" id="services-heading">
            Every Property Deserves a&nbsp;
            <span className="text-lime">Bespoke Energy Solution</span>
          </h2>
          <p className="section-subtitle">
            We don't believe in one-size-fits-all. Our MCS-accredited engineers
            assess your site, usage habits, and budget before recommending the
            right technology — or a hybrid combination of all three.
          </p>
        </div>

        <div className="services-grid" role="list">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              isExpanded={expanded === service.id}
              onToggle={() => toggle(service.id)}
              delayClass={`reveal-delay-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isExpanded, onToggle, delayClass }) {
  const { id, eyebrow, title, summary, specs, detail, cta, accentColor, accentGlow } = service;

  return (
    <article
      className={`service-card reveal ${delayClass}`}
      role="listitem"
      style={{ '--accent': accentColor, '--accent-glow': accentGlow }}
      aria-labelledby={`svc-title-${id}`}
    >
      {/* Glow accent top bar */}
      <div className="service-card-bar" aria-hidden="true" />

      {/* Eyebrow */}
      <span className="service-eyebrow">{eyebrow}</span>

      {/* Title */}
      <h3 className="service-title" id={`svc-title-${id}`}>{title}</h3>

      {/* Summary */}
      <p className="service-summary">{summary}</p>

      {/* Technical specs */}
      <dl className="service-specs">
        {specs.map(({ label, value }) => (
          <div key={label} className="spec-row">
            <dt className="spec-label">{label}</dt>
            <dd className="spec-value">{value}</dd>
          </div>
        ))}
      </dl>

      {/* Accordion */}
      <button
        className="service-accordion-btn"
        aria-expanded={isExpanded}
        aria-controls={`svc-detail-${id}`}
        onClick={onToggle}
        id={`svc-accordion-${id}`}
      >
        <span>{isExpanded ? 'Show less' : 'Technical deep-dive'}</span>
        <span className={`accordion-chevron${isExpanded ? ' open' : ''}`} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        id={`svc-detail-${id}`}
        role="region"
        aria-labelledby={`svc-accordion-${id}`}
        className={`service-detail${isExpanded ? ' open' : ''}`}
      >
        <p className="service-detail-text">{detail}</p>
      </div>

      {/* CTA */}
      <a href="#contact" className="service-cta">
        {cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </article>
  );
}
