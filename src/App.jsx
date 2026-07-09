/**
 * App.jsx
 * -------
 * Root application component. Assembles all sections in order and
 * wires up the scroll-reveal IntersectionObserver via useScrollReveal().
 *
 * Section order:
 *   1. Header (sticky)
 *   2. Hero
 *   3. Services Hub
 *   4. ROI Calculator
 *   5. Why Us
 *   6. Testimonials
 *   7. Lead Capture Form (Contact)
 *   8. Footer
 */
import React, { Suspense, lazy } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import Header      from './components/Header';
import Hero        from './components/Hero';

const Services      = lazy(() => import('./components/Services'));
const ROICalculator = lazy(() => import('./components/ROICalculator'));
const WhyUs         = lazy(() => import('./components/WhyUs'));
const Testimonials  = lazy(() => import('./components/Testimonials'));
const LeadForm      = lazy(() => import('./components/LeadForm'));
const Footer        = lazy(() => import('./components/Footer'));

import './App.css';

export default function App() {
  // Activate scroll-reveal IntersectionObserver for all .reveal elements
  useScrollReveal();

  return (
    <>
      {/* Skip-to-content link for keyboard accessibility */}
      <a href="#hero" className="skip-link">Skip to main content</a>

      <Header />

      <main id="main">
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '1200px' }} aria-hidden="true" />}>
          <div className="content-deferred">
            <Services />
            <ROICalculator />
            <WhyUs />
            <Testimonials />
            <LeadForm />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={<div style={{ minHeight: '300px' }} aria-hidden="true" />}>
        <div className="content-deferred">
          <Footer />
        </div>
      </Suspense>
    </>
  );
}
