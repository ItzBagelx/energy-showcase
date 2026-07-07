/**
 * Services.jsx
 * ------------
 * Services hub section with three technology categories:
 *  1. Solar PV & Battery Storage
 *  2. Biomass Heating
 *  3. Micro-Hydro Power
 *
 * Each card has:
 * - Icon, title, and technical description
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
    icon: '☀️',
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
    gradient: 'linear-gradient(135deg, hsl(45,90%,25%) 0%, hsl(147,55%,9%) 100%)',
    accentColor: 'hsl(45, 90%, 58%)',
  },
  {
    id: 'biomass',
    icon: '🌿',
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
    gradient: 'linear-gradient(135deg, hsl(115,50%,18%) 0%, hsl(147,55%,9%) 100%)',
    accentColor: 'hsl(115, 60%, 50%)',
  },
  {
    id: 'hydro',
    icon: '💧',
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
    gradient: 'linear-gradient(135deg, hsl(210,60%,18%) 0%, hsl(147,55%,9%) 100%)',
    accentColor: 'hsl(210, 80%, 60%)',
  },
];

export default function Services() {
  // Track which card's detail panel is expanded
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <section className="services-section" id="services" aria-labelledby="services-heading">
      {/* Section header */}
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

        {/* Service cards grid */}
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

/* ── Individual Service Card ── */
function ServiceCard({ service, isExpanded, onToggle, delayClass }) {
  const { id, icon, eyebrow, title, summary, specs, detail, cta, accentColor } = service;

  return (
    <article
      className={`service-card card reveal ${delayClass}`}
      role="listitem"
      style={{ '--accent': accentColor }}
      aria-labelledby={`svc-title-${id}`}
    >
      {/* Icon */}
      <div className="service-icon" aria-hidden="true">{icon}</div>

      {/* Eyebrow */}
      <span className="service-eyebrow">{eyebrow}</span>

      {/* Title */}
      <h3 className="service-title" id={`svc-title-${id}`}>{title}</h3>

      {/* Summary */}
      <p className="service-summary">{summary}</p>

      {/* Technical specs table */}
      <dl className="service-specs">
        {specs.map(({ label, value }) => (
          <div key={label} className="spec-row">
            <dt className="spec-label">{label}</dt>
            <dd className="spec-value">{value}</dd>
          </div>
        ))}
      </dl>

      {/* Expandable detail panel (accordion) */}
      <button
        className="service-accordion-btn"
        aria-expanded={isExpanded}
        aria-controls={`svc-detail-${id}`}
        onClick={onToggle}
        id={`svc-accordion-${id}`}
      >
        {isExpanded ? 'Show less' : 'Technical deep-dive'}
        <span className={`accordion-arrow${isExpanded ? ' open' : ''}`} aria-hidden="true">›</span>
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
      <a href="#contact" className="service-cta btn btn-outline">
        {cta} →
      </a>
    </article>
  );
}
