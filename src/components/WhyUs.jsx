/**
 * WhyUs.jsx
 * ---------
 * "Why Choose Us" section featuring:
 * - 6 trust pillars (accreditations, guarantees, track record)
 * - MCS / HETAS / RECC certification badges
 * - Short process overview (4-step journey)
 */
import './WhyUs.css';

const TRUST_PILLARS = [
  {
    icon: '🏅',
    title: 'MCS & HETAS Accredited',
    text: 'Our MCS accreditation is required by law to access all UK government renewable energy grants and schemes (BUS, SEG). HETAS certifies our biomass installations meet clean-air standards.',
  },
  {
    icon: '📐',
    title: 'Bespoke System Design',
    text: 'We use SAP 10 modelling and hydrological data from the Environment Agency to design each system from scratch — sized for your actual usage profile, not a national average.',
  },
  {
    icon: '🔧',
    title: '25-Year Workmanship Guarantee',
    text: 'Every installation is backed by a 25-year structural workmanship guarantee and a 10-year manufacturer panel warranty, administered independently so it survives any business changes.',
  },
  {
    icon: '📊',
    title: 'Transparent Performance Monitoring',
    text: `We install remote monitoring on every system. You'll receive a monthly performance report versus our guaranteed generation figure — with automatic alerts if output drops.`,
  },
  {
    icon: '🤝',
    title: 'Grant Navigation Included',
    text: 'Navigating the Boiler Upgrade Scheme, Smart Export Guarantee, and LROC submissions is complex. We handle all paperwork and liaise directly with Ofgem and your DNO on your behalf.',
  },
  {
    icon: '🌍',
    title: 'Net-Zero Certified Supply Chain',
    text: 'We source panels from manufacturers audited against ILO labour standards, and our installation vehicles are 100% electric. Your green install is genuinely green from start to finish.',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title:  'Free Site Survey',
    text:   'A qualified engineer visits, assesses your roof structure, orientation, shading, and reviews your energy bills. No charge, no obligation.',
  },
  {
    number: '02',
    title:  'Custom Design & Quote',
    text:   "We produce a detailed system design with guaranteed generation figures and a fixed-price quote. You'll see exactly what you get before you commit.",
  },
  {
    number: '03',
    title:  'Professional Installation',
    text:   'Typical residential solar takes 1–2 days. Our in-house team handles scaffolding, electrical work, and DNO notification — everything under one roof.',
  },
  {
    number: '04',
    title:  'Monitor & Optimise',
    text:   'Post-installation commissioning, system handover, and ongoing remote monitoring. We treat a new installation as the start of a relationship, not the end.',
  },
];

const CERTIFICATIONS = [
  { name: 'MCS',   full: 'Microgeneration Certification Scheme',   num: 'MCS-123456' },
  { name: 'HETAS', full: 'Heating Equipment Testing & Approval',    num: 'HETAS-78910' },
  { name: 'RECC',  full: 'Renewable Energy Consumer Code',          num: 'RECC-11234' },
  { name: 'NAPIT', full: 'National Association of Prof. Inspectors', num: 'NAPIT-56789' },
];

export default function WhyUs() {
  return (
    <section className="why-us-section" id="why-us" aria-labelledby="why-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Why Lumina</span>
          <div className="section-divider" />
          <h2 className="section-title" id="why-heading">
            Certified. Experienced. <span className="text-lime">Accountable.</span>
          </h2>
          <p className="section-subtitle">
            Hundreds of renewable energy installers compete for your business. Here's what
            separates a trusted partner from a van-and-drill operation.
          </p>
        </div>

        {/* Trust pillars grid */}
        <div className="pillars-grid">
          {TRUST_PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`pillar-card card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <span className="pillar-icon" aria-hidden="true">{pillar.icon}</span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="certs-bar reveal">
          <p className="certs-label">Registered & Certified With:</p>
          <div className="certs-list" role="list">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="cert-badge" role="listitem" aria-label={`${cert.full}, number ${cert.num}`}>
                <span className="cert-name">{cert.name}</span>
                <span className="cert-num">{cert.num}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process steps */}
        <div className="process-section reveal">
          <h3 className="process-heading">Your Journey With Us</h3>
          <div className="process-steps">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="process-step">
                <div className="process-step-inner">
                  <span className="process-number">{step.number}</span>
                  <h4 className="process-title">{step.title}</h4>
                  <p className="process-text">{step.text}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="process-connector" aria-hidden="true">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
