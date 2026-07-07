/**
 * ROICalculator.jsx
 * -----------------
 * Interactive ROI calculator allowing users to estimate:
 *   - Annual savings (£)
 *   - Break-even point (years)
 *   - 10-year projected ROI (%)
 *
 * Inputs:
 *   - Average monthly energy bill (range slider + number input)
 *   - Property type (detached, semi-detached, terrace, flat)
 *   - Energy preference (Solar PV + Battery, or Biomass Heating)
 *
 * Calculation methodology:
 *   - Solar: Estimate system size from property type, apply avg UK solar
 *     yield (850 kWh/kWp/yr), value at blended rate (import avoided + SEG export)
 *   - Biomass: Estimate gas/oil displaced based on property size,
 *     compare biomass fuel cost vs current fossil fuel cost
 *
 * All calculations are instant (no API) and update on every input change.
 * Numbers are indicative estimates. Actual figures depend on a site survey.
 */
import { useState, useMemo } from 'react';
import './ROICalculator.css';

/* ── Calculation constants ── */
// Solar
const SOLAR_YIELD_KWH_PER_KWP = 850;     // UK average annual yield
const IMPORT_RATE_GBP_PER_KWH = 0.285;   // Updated typical import tariff
const SEG_RATE_GBP_PER_KWH    = 0.15;    // Smart Export Guarantee avg
const SOLAR_INSTALL_COST_PER_KWP = 1800; // £/kWp installed (inc. battery)

// Biomass
const GAS_TARIFF_GBP_PER_KWH  = 0.075;   // Updated gas unit rate
const BIOMASS_FUEL_GBP_PER_KWH = 0.032;  // Wood pellet equivalent cost
const BIOMASS_EFFICIENCY = 0.91;         // Seasonal boiler efficiency
const BIOMASS_INSTALL_COST = 12500;      // Typical domestic biomass system

// Property type → solar system kWp & annual heating demand (kWh)
const PROPERTY_PROFILES = {
  flat:          { solarKwp: 2.5,  heatingKwh: 8000  },
  terrace:       { solarKwp: 3.5,  heatingKwh: 12000 },
  semi:          { solarKwp: 4.0,  heatingKwh: 16000 },
  detached:      { solarKwp: 6.0,  heatingKwh: 22000 },
  'large-detached': { solarKwp: 8, heatingKwh: 30000 },
};

/* ── Main Component ── */
export default function ROICalculator() {
  // — Input state —
  const [monthlyBill,   setMonthlyBill]   = useState(120);   // £/month
  const [propertyType,  setPropertyType]  = useState('semi');
  const [preference,    setPreference]    = useState('solar');

  // — Derive all results from inputs (no side effects needed) —
  const results = useMemo(() => {
    const annualBill = monthlyBill * 12;
    const profile    = PROPERTY_PROFILES[propertyType];

    if (preference === 'solar') {
      // kWh generated per year
      const annualGen  = profile.solarKwp * SOLAR_YIELD_KWH_PER_KWP;
      // Estimate current usage from bill
      const currentUsageKwh = annualBill / IMPORT_RATE_GBP_PER_KWH;
      // Self-consume up to 90% of generation or 90% of current usage with a battery
      const selfConsumedKwh = Math.min(annualGen * 0.9, currentUsageKwh * 0.9);
      const exportedKwh = Math.max(0, annualGen - selfConsumedKwh);
      
      const selfConsumeSavings = selfConsumedKwh * IMPORT_RATE_GBP_PER_KWH;
      const exportSavings = exportedKwh * SEG_RATE_GBP_PER_KWH;
      const annualSavings = Math.round(selfConsumeSavings + exportSavings);
      
      // System cost (battery included)
      const installCost  = Math.round(profile.solarKwp * SOLAR_INSTALL_COST_PER_KWP);
      const breakEven    = parseFloat((installCost / annualSavings).toFixed(1));
      const tenYearROI   = Math.round(((annualSavings * 10 - installCost) / installCost) * 100);
      const systemOutput = `${profile.solarKwp} kWp (${Math.round(annualGen).toLocaleString()} kWh/yr)`;
      return { annualSavings, installCost, breakEven, tenYearROI, systemOutput, annualBill };
    } else {
      // Biomass: compare fossil fuel cost vs biomass fuel cost for current heat demand
      const currentCost  = annualBill;
      const heatKwh      = currentCost / GAS_TARIFF_GBP_PER_KWH;
      const biomassCost  = (heatKwh / BIOMASS_EFFICIENCY) * BIOMASS_FUEL_GBP_PER_KWH;
      
      // Annual saving = cost of current fuel - biomass fuel cost
      const annualSavings = Math.round(currentCost - biomassCost);
      const installCost   = BIOMASS_INSTALL_COST;
      // UK BUS grant reduces effective cost
      const effectiveCost = Math.max(installCost - 5000, installCost * 0.6);
      const breakEven     = parseFloat((effectiveCost / annualSavings).toFixed(1));
      const tenYearROI    = Math.round(((annualSavings * 10 - effectiveCost) / effectiveCost) * 100);
      const systemOutput  = `${(heatKwh / 1000).toFixed(0)} MWh/yr heat demand`;
      return { annualSavings, installCost, breakEven, tenYearROI, systemOutput, annualBill };
    }
  }, [monthlyBill, propertyType, preference]);

  // Format currency
  const gbp = (n) => `£${Math.abs(n).toLocaleString()}`;
  // Colour the ROI indicator
  const roiColour = results.tenYearROI > 50 ? 'positive' : results.tenYearROI > 0 ? 'neutral' : 'negative';

  return (
    <section className="calc-section" id="calculator" aria-labelledby="calc-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">ROI Calculator</span>
          <div className="section-divider" />
          <h2 className="section-title" id="calc-heading">
            How Much Could You <span className="text-lime">Actually Save?</span>
          </h2>
          <p className="section-subtitle">
            Adjust the sliders to match your situation. Results are indicative
            estimates based on Ofgem-published tariffs and MCS yield data.
            A free site survey will refine these figures to your exact property.
          </p>
        </div>

        <div className="calc-card card reveal reveal-delay-1">
          {/* ── Inputs Panel ── */}
          <div className="calc-inputs">
            <h3 className="calc-panel-title">Your Details</h3>

            {/* Monthly Bill Slider */}
            <div className="form-group">
              <label className="form-label" htmlFor="calc-bill">
                Average Monthly Energy Bill
                <span className="calc-bill-display">
                  {gbp(monthlyBill)}<span className="text-muted">/mo</span>
                </span>
              </label>
              <input
                type="range"
                id="calc-bill"
                min="40"
                max="500"
                step="5"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                aria-valuetext={`${gbp(monthlyBill)} per month`}
              />
              <div className="range-labels">
                <span>£40</span>
                <span>£500</span>
              </div>
            </div>

            {/* Property Type */}
            <div className="form-group">
              <label className="form-label" htmlFor="calc-property">Property Type</label>
              <select
                id="calc-property"
                className="form-input"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="flat">Flat / Apartment</option>
                <option value="terrace">Terraced House</option>
                <option value="semi">Semi-Detached House</option>
                <option value="detached">Detached House</option>
                <option value="large-detached">Large Detached / Farmhouse</option>
              </select>
            </div>

            {/* Technology Preference */}
            <fieldset className="form-group pref-fieldset">
              <legend className="form-label">Energy Technology</legend>
              <div className="pref-options">
                {[
                  { value: 'solar',   label: '☀️ Solar PV + Battery' },
                  { value: 'biomass', label: '🌿 Biomass Heating' },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className={`pref-option${preference === value ? ' selected' : ''}`}
                    htmlFor={`pref-${value}`}
                  >
                    <input
                      type="radio"
                      id={`pref-${value}`}
                      name="energy-preference"
                      value={value}
                      checked={preference === value}
                      onChange={() => setPreference(value)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* ── Results Panel ── */}
          <div className="calc-results" aria-live="polite" aria-atomic="true">
            <h3 className="calc-panel-title">Your Estimated Returns</h3>

            {/* Primary metric — annual savings */}
            <div className="calc-primary-metric">
              <span className="calc-metric-label">Estimated Annual Savings</span>
              <span className="calc-metric-value">{gbp(results.annualSavings)}</span>
              <span className="calc-metric-sub">per year</span>
            </div>

            {/* Secondary metrics */}
            <div className="calc-secondary-metrics">
              {/* Break-even */}
              <div className="calc-metric-card">
                <span className="cmk-value">{results.breakEven} yrs</span>
                <span className="cmk-label">Break-even Point</span>
              </div>
              {/* 10-year ROI */}
              <div className={`calc-metric-card roi-${roiColour}`}>
                <span className="cmk-value">{results.tenYearROI}%</span>
                <span className="cmk-label">10-Year ROI</span>
              </div>
              {/* System cost */}
              <div className="calc-metric-card">
                <span className="cmk-value">{gbp(results.installCost)}</span>
                <span className="cmk-label">Est. System Cost</span>
              </div>
            </div>

            {/* System spec */}
            <p className="calc-system-spec">
              <span className="text-muted">Recommended system:</span>{' '}
              <strong className="text-lime">{results.systemOutput}</strong>
            </p>

            {/* 10-year projection bar chart */}
            <TenYearChart annualSavings={results.annualSavings} installCost={results.installCost} />

            <p className="calc-disclaimer">
              ⚠ These figures are indicative estimates only, based on published Ofgem tariffs
              and industry-average yields. Final figures depend on your site, orientation, and
              usage. Book a free survey for a guaranteed quote.
            </p>

            <a href="#contact" className="btn btn-primary w-full text-center calc-cta" id="calc-cta-btn">
              Get a Personalised Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * TenYearChart
 * ------------
 * A simple SVG bar chart showing cumulative savings vs system cost over 10 years.
 * No external charting library — lightweight and accessible.
 */
function TenYearChart({ annualSavings, installCost }) {
  const years  = Array.from({ length: 10 }, (_, i) => i + 1);
  const maxVal = Math.max(annualSavings * 10, installCost) * 1.05;
  const barW   = 100 / 10 - 2; // percentage width of each bar group

  return (
    <div className="chart-container">
      <p className="chart-title">10-Year Cumulative Savings</p>
      <svg
        role="img"
        aria-label="Bar chart showing 10-year cumulative savings vs installation cost"
        viewBox="0 0 300 120"
        className="chart-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Horizontal gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1="30"
            y1={100 - ratio * 90}
            x2="298"
            y2={100 - ratio * 90}
            stroke="hsla(147,30%,60%,0.12)"
            strokeWidth="0.5"
          />
        ))}
        {/* Cost baseline */}
        <line
          x1="30"
          y1={100 - (installCost / maxVal) * 90}
          x2="298"
          y2={100 - (installCost / maxVal) * 90}
          stroke="hsl(0,70%,55%)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        {/* Savings bars */}
        {years.map((yr, i) => {
          const cumSavings = annualSavings * yr;
          const barHeight  = (cumSavings / maxVal) * 90;
          const x          = 30 + i * ((270) / 10) + 2;
          const y          = 100 - barHeight;
          const isPastBreakEven = cumSavings >= installCost;
          return (
            <g key={yr}>
              <rect
                x={x}
                y={y}
                width={barW / 100 * 270}
                height={barHeight}
                rx="2"
                fill={isPastBreakEven ? 'hsl(88,85%,52%)' : 'hsl(147,40%,35%)'}
              />
              <text x={x + (barW / 100 * 270) / 2} y="112" textAnchor="middle" fontSize="6" fill="hsl(147,12%,62%)">{yr}</text>
            </g>
          );
        })}
        {/* Y-axis label */}
        <text x="0" y="55" transform="rotate(-90,6,55)" fontSize="6" fill="hsl(147,12%,62%)" textAnchor="middle">£ savings</text>
        {/* Legend */}
        <rect x="30" y="4" width="8" height="4" rx="1" fill="hsl(88,85%,52%)" />
        <text x="42" y="8" fontSize="5.5" fill="hsl(147,12%,62%)">Past break-even</text>
        <line x1="100" y1="6" x2="110" y2="6" stroke="hsl(0,70%,55%)" strokeWidth="1" strokeDasharray="3 2" />
        <text x="112" y="8" fontSize="5.5" fill="hsl(147,12%,62%)">Install cost</text>
      </svg>
      <p className="chart-x-label">Year</p>
    </div>
  );
}
