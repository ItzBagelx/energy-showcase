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
import { useScrollReveal } from './hooks/useScrollReveal';
import Header      from './components/Header';
import Hero        from './components/Hero';
import Services    from './components/Services';
import ROICalculator from './components/ROICalculator';
import WhyUs       from './components/WhyUs';
import Testimonials from './components/Testimonials';
import LeadForm    from './components/LeadForm';
import Footer      from './components/Footer';
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
        <Services />
        <ROICalculator />
        <WhyUs />
        <Testimonials />
        <LeadForm />
      </main>

      <Footer />
    </>
  );
}
