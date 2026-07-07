/**
 * Testimonials.jsx
 * ----------------
 * Customer testimonials section with:
 * - Real-feeling names, locations, and system details
 * - Star ratings
 * - Profile photos
 * - Horizontal scroll on mobile, 3-col grid on desktop
 */
import './Testimonials.css';

const TESTIMONIALS = [
  {
    id: 'helen',
    name:    'Helen Marsden',
    location: 'Cirencester, Gloucestershire',
    system:   '6 kWp Solar + 10 kWh Battery',
    stars:    5,
    quote:
      "We went from £280/month energy bills to an average of £40 — and we exported £620 back to the grid in our first year. Lumina's team was incredibly professional and the monitoring app means I can see exactly how every unit is generated and used. Best investment we've ever made in this house.",
    img: '/testimonial_woman.png',
  },
  {
    id: 'james',
    name:    'James Whitfield',
    location: 'Loch Lomond, Scotland',
    system:   'Micro-Hydro 4.2 kW Turgo Turbine',
    stars:    5,
    quote:
      "We have a burn running through our land and I never imagined it could power the whole farmhouse. Lumina did a hydrological survey, confirmed the flow rates, and installed a Turgo turbine that now generates over 36,000 kWh a year — more than double our annual consumption. We've sold the surplus back to the grid for three years straight.",
    img: '/testimonial_man.png',
  },
  {
    id: 'ruth',
    name:    'Ruth & David Patel',
    location: 'Hebden Bridge, West Yorkshire',
    system:   '25 kW Biomass Boiler (Wood Chip)',
    stars:    5,
    quote:
      "Our Victorian terrace was costing a fortune to heat on oil. Lumina specified a wood chip boiler perfectly sized for our three-storey property. With the BUS grant, the effective payback was under 6 years. The flue meets all current particulate standards and the fuel delivery is automated — we barely have to think about it.",
    img: '/testimonial_woman.png',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Customer Stories</span>
          <div className="section-divider" />
          <h2 className="section-title" id="testimonials-heading">
            Real Results. <span className="text-lime">Real People.</span>
          </h2>
          <p className="section-subtitle">
            Our customers span rural farmhouses and suburban semis, biomass upgrades and
            off-grid pioneers. Here's what three of them said after living with their Lumina systems.
          </p>
        </div>

        {/* Testimonials grid (horizontal scroll on mobile) */}
        <div className="testimonials-scroll" role="list">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.id}
              className={`testimonial-card card reveal reveal-delay-${i + 1}`}
              role="listitem"
              aria-label={`Testimonial from ${t.name}`}
            >
              {/* Stars */}
              <div className="stars" aria-label={`${t.stars} out of 5 stars`}>
                {'★'.repeat(t.stars)}
              </div>

              {/* Quote */}
              <blockquote className="testimonial-quote">
                <p>"{t.quote}"</p>
              </blockquote>

              {/* Footer: author */}
              <footer className="testimonial-footer">
                <img
                  src={t.img}
                  alt={`Portrait of ${t.name}`}
                  className="testimonial-avatar"
                  loading="lazy"
                  width="48"
                  height="48"
                  decoding="async"
                />
                <div className="testimonial-author-info">
                  <cite className="testimonial-name">{t.name}</cite>
                  <span className="testimonial-location">{t.location}</span>
                  <span className="testimonial-system">{t.system}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Google Reviews indicator */}
        <div className="reviews-summary reveal">
          <div className="stars" aria-label="4.9 out of 5 stars average">★★★★★</div>
          <span className="reviews-score">4.9 / 5.0</span>
          <span className="reviews-count">from 312 verified Google Reviews</span>
        </div>
      </div>
    </section>
  );
}
