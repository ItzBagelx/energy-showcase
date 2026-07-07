/**
 * useScrollReveal.js
 * ------------------
 * Custom hook that observes elements with the "reveal" class and toggles
 * the "visible" class when they enter the viewport.
 *
 * This provides the IntersectionObserver fallback for browsers that don't
 * support scroll-driven CSS animations, as well as the primary mechanism
 * for the .reveal utility class defined in index.css.
 */
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once revealed, stop observing to avoid resets
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12, // Trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px', // Small negative margin for a nicer trigger point
      }
    );

    // Observe all elements with the .reveal class
    const targets = document.querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
