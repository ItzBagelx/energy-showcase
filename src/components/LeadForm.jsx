/**
 * LeadForm.jsx
 * ------------
 * Multi-step lead capture form with animated progress bar.
 *
 * STEP 1 — Property Details
 *   • Postcode (text input)
 *   • Property type (detached / semi-detached / terraced / flat)
 *   • Roof direction (South / South-East / South-West / East/West / Unsure)
 *
 * STEP 2 — Energy Goals (multi-select checkboxes)
 *   • Reduce my energy bills
 *   • Achieve off-grid or hybrid capability
 *   • Reduce my carbon footprint
 *   • Comply with upcoming EPC requirements
 *   • Generate income from smart export
 *
 * STEP 3 — Contact Details + Submission
 *   • Full name, email, phone (optional), message (optional)
 *   • Consent checkbox
 *   • Submit button
 *
 * Best practices followed (from modern-web-guidance "forms" guide):
 *   - autocomplete attributes on all relevant fields
 *   - aria-describedby for error messages
 *   - aria-live for step announcements
 *   - :user-valid / :user-invalid handled via CSS
 *   - No placeholders as labels (separate <label> elements used)
 */
import { useState } from 'react';
import './LeadForm.css';

const TOTAL_STEPS = 3;

const PROPERTY_TYPES = [
  { value: 'detached',       label: 'Detached House' },
  { value: 'semi',           label: 'Semi-Detached' },
  { value: 'terrace',        label: 'Terraced House' },
  { value: 'flat',           label: 'Flat / Apartment' },
  { value: 'large-detached', label: 'Farmhouse / Large Rural Property' },
];

const ROOF_DIRECTIONS = [
  { value: 'south',      label: 'South (ideal)' },
  { value: 'south-east', label: 'South-East' },
  { value: 'south-west', label: 'South-West' },
  { value: 'east-west',  label: 'East / West (split array)' },
  { value: 'unsure',     label: 'Not Sure' },
];

const ENERGY_GOALS = [
  { value: 'reduce-bills',    label: '💰 Significantly reduce my energy bills' },
  { value: 'off-grid',        label: '🏡 Achieve off-grid or battery backup capability' },
  { value: 'carbon',          label: '🌍 Reduce my home\'s carbon footprint' },
  { value: 'epc',             label: '📋 Improve my EPC rating ahead of legislation changes' },
  { value: 'export',          label: '📈 Generate Smart Export income from surplus power' },
];

/* ── Initial form state ── */
const INITIAL_STATE = {
  // Step 1
  postcode:      '',
  propertyType:  '',
  roofDirection: '',
  // Step 2
  goals: [],
  // Step 3
  fullName:  '',
  email:     '',
  phone:     '',
  message:   '',
  consent:   false,
};

export default function LeadForm() {
  const [step,      setStep]      = useState(1);
  const [formData,  setFormData]  = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState({});

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  /* ── Helpers ── */
  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  const toggleGoal = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  /* ── Validation per step ── */
  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!formData.postcode.trim())           e.postcode      = 'Please enter your postcode.';
      if (!formData.propertyType)              e.propertyType  = 'Please select your property type.';
      if (!formData.roofDirection)             e.roofDirection = 'Please select your roof direction.';
    }
    if (step === 2) {
      if (formData.goals.length === 0)         e.goals = 'Please select at least one energy goal.';
    }
    if (step === 3) {
      if (!formData.fullName.trim())           e.fullName = 'Please enter your full name.';
      if (!formData.email.includes('@'))       e.email    = 'Please enter a valid email address.';
      if (!formData.consent)                   e.consent  = 'You must agree to be contacted.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // In a real application, you'd POST formData to your API here.
      // For demo purposes we just show the success screen.
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <section className="lead-form-section" id="contact" aria-labelledby="form-heading">
        <div className="container">
          <div className="form-success card">
            <div className="success-icon" aria-hidden="true">✅</div>
            <h3 className="success-title">You're on Your Way to Energy Independence!</h3>
            <p className="success-text">
              Thank you, <strong className="text-lime">{formData.fullName}</strong>. One of our
              MCS-certified engineers will be in touch within one working day to arrange your
              free site survey at <strong>{formData.postcode}</strong>.
            </p>
            <p className="success-text text-muted">
              Check your inbox at <strong className="text-cream">{formData.email}</strong> for a
              confirmation email with what to expect.
            </p>
            <button
              className="btn btn-outline mt-8"
              onClick={() => { setSubmitted(false); setStep(1); setFormData(INITIAL_STATE); }}
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="lead-form-section" id="contact" aria-labelledby="form-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Free Site Survey</span>
          <div className="section-divider" />
          <h2 className="section-title" id="form-heading">
            Start Your <span className="text-lime">Renewable Journey</span> Today
          </h2>
          <p className="section-subtitle">
            Answer three short steps and one of our engineers will be in touch within
            one working day to arrange your free, no-obligation site survey.
          </p>
        </div>

        <div className="form-wrapper card reveal reveal-delay-1">
          {/* ── Step Indicator ── */}
          <div className="step-indicator" aria-label="Form progress">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`step-dot${step === s ? ' active' : step > s ? ' done' : ''}`} aria-current={step === s ? 'step' : undefined}>
                <span className="step-dot-num">{step > s ? '✓' : s}</span>
                <span className="step-dot-label">
                  {s === 1 ? 'Property' : s === 2 ? 'Your Goals' : 'Contact'}
                </span>
              </div>
            ))}
          </div>

          {/* ── Progress Bar ── */}
          <div className="progress-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Form completion progress">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* ── Accessible live step announcement ── */}
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Step {step} of {TOTAL_STEPS}:{' '}
            {step === 1 ? 'Property details' : step === 2 ? 'Energy goals' : 'Contact details'}
          </p>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1 */}
            {step === 1 && (
              <Step1
                data={formData}
                errors={errors}
                onChange={update}
              />
            )}
            {/* Step 2 */}
            {step === 2 && (
              <Step2
                goals={formData.goals}
                error={errors.goals}
                onToggle={toggleGoal}
              />
            )}
            {/* Step 3 */}
            {step === 3 && (
              <Step3
                data={formData}
                errors={errors}
                onChange={update}
              />
            )}

            {/* ── Navigation buttons ── */}
            <div className="form-nav">
              {step > 1 && (
                <button type="button" className="btn btn-outline" onClick={prevStep}>
                  ← Back
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button type="button" className="btn btn-primary ml-auto" onClick={nextStep} id={`form-next-step-${step}`}>
                  Continue →
                </button>
              ) : (
                <button type="submit" className="btn btn-primary ml-auto" id="form-submit-btn">
                  🚀 Request My Free Survey
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Step 1: Property Details ── */
function Step1({ data, errors, onChange }) {
  return (
    <div className="form-step">
      <h3 className="step-title">Tell us about your property</h3>
      <p className="step-subtitle">This helps us size the right system and assess local solar/hydro potential.</p>

      <div className="form-grid">
        {/* Postcode */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" htmlFor="f-postcode">Postcode</label>
          <input
            id="f-postcode"
            type="text"
            className="form-input"
            autoComplete="postal-code"
            placeholder="e.g. SW1A 1AA"
            value={data.postcode}
            onChange={(e) => onChange('postcode', e.target.value.toUpperCase())}
            aria-describedby={errors.postcode ? 'err-postcode' : undefined}
            aria-invalid={!!errors.postcode}
            required
          />
          {errors.postcode && <span id="err-postcode" className="field-error" role="alert">{errors.postcode}</span>}
        </div>

        {/* Property Type */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-property-type">Property Type</label>
          <select
            id="f-property-type"
            className="form-input"
            value={data.propertyType}
            onChange={(e) => onChange('propertyType', e.target.value)}
            aria-describedby={errors.propertyType ? 'err-property-type' : undefined}
            aria-invalid={!!errors.propertyType}
            required
          >
            <option value="" disabled>Select type…</option>
            {PROPERTY_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.propertyType && <span id="err-property-type" className="field-error" role="alert">{errors.propertyType}</span>}
        </div>

        {/* Roof Direction */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-roof">Main Roof Direction</label>
          <select
            id="f-roof"
            className="form-input"
            value={data.roofDirection}
            onChange={(e) => onChange('roofDirection', e.target.value)}
            aria-describedby={errors.roofDirection ? 'err-roof' : undefined}
            aria-invalid={!!errors.roofDirection}
            required
          >
            <option value="" disabled>Select direction…</option>
            {ROOF_DIRECTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {errors.roofDirection && <span id="err-roof" className="field-error" role="alert">{errors.roofDirection}</span>}
          <span className="field-hint">
            💡 South-facing roofs receive up to 20% more solar irradiance than east/west.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Energy Goals ── */
function Step2({ goals, error, onToggle }) {
  return (
    <div className="form-step">
      <h3 className="step-title">What are your energy ambitions?</h3>
      <p className="step-subtitle">Select all that apply. This helps us tailor our recommendations.</p>

      <fieldset className="goals-fieldset" aria-describedby={error ? 'err-goals' : undefined}>
        <legend className="sr-only">Energy goals</legend>
        {ENERGY_GOALS.map(({ value, label }) => (
          <label
            key={value}
            className={`goal-option${goals.includes(value) ? ' selected' : ''}`}
            htmlFor={`goal-${value}`}
          >
            <input
              type="checkbox"
              id={`goal-${value}`}
              checked={goals.includes(value)}
              onChange={() => onToggle(value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      {error && <span id="err-goals" className="field-error" role="alert">{error}</span>}
    </div>
  );
}

/* ── Step 3: Contact Details ── */
function Step3({ data, errors, onChange }) {
  return (
    <div className="form-step">
      <h3 className="step-title">Almost there — let's get you connected</h3>
      <p className="step-subtitle">We'll be in touch within one working day to book your free survey.</p>

      <div className="form-grid">
        {/* Full name */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" htmlFor="f-name">Full Name</label>
          <input
            id="f-name"
            type="text"
            className="form-input"
            autoComplete="name"
            placeholder="Jane Smith"
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            aria-describedby={errors.fullName ? 'err-name' : undefined}
            aria-invalid={!!errors.fullName}
            required
          />
          {errors.fullName && <span id="err-name" className="field-error" role="alert">{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-email">Email Address</label>
          <input
            id="f-email"
            type="email"
            className="form-input"
            autoComplete="email"
            placeholder="jane@example.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            aria-describedby={errors.email ? 'err-email' : undefined}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && <span id="err-email" className="field-error" role="alert">{errors.email}</span>}
        </div>

        {/* Phone (optional) */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-phone">
            Phone <span className="text-muted" aria-label="optional">(optional)</span>
          </label>
          <input
            id="f-phone"
            type="tel"
            className="form-input"
            autoComplete="tel"
            placeholder="07700 900000"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" htmlFor="f-message">
            Anything else we should know? <span className="text-muted">(optional)</span>
          </label>
          <textarea
            id="f-message"
            className="form-input form-textarea"
            rows="3"
            placeholder="E.g. we have an EV, a south-facing outbuilding, or a stream at the bottom of the garden…"
            value={data.message}
            onChange={(e) => onChange('message', e.target.value)}
          />
        </div>

        {/* Consent */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="consent-label" htmlFor="f-consent">
            <input
              id="f-consent"
              type="checkbox"
              checked={data.consent}
              onChange={(e) => onChange('consent', e.target.checked)}
              aria-describedby={errors.consent ? 'err-consent' : undefined}
              aria-invalid={!!errors.consent}
            />
            <span>
              I agree to be contacted by Lumina Energy Group regarding my enquiry.
              We will never share your data with third parties. View our{' '}
              <a href="#" className="text-lime">Privacy Policy</a>.
            </span>
          </label>
          {errors.consent && <span id="err-consent" className="field-error" role="alert">{errors.consent}</span>}
        </div>
      </div>
    </div>
  );
}
