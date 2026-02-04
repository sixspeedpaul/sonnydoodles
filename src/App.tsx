import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Benefits from './sections/Benefits';
import IngredientsSpotlight from './sections/IngredientsSpotlight';
import Products from './sections/Products';
import DeliverySection from './sections/DeliverySection';
import CoatHealth from './sections/CoatHealth';
import Testimonials from './sections/Testimonials';
import MustHaves from './sections/MustHaves';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Refresh ScrollTrigger on resize
  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#2B2B2B',
            color: '#F6F3EE',
            border: 'none',
          },
        }}
      />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Benefits />
        <IngredientsSpotlight />
        <Products />
        <DeliverySection />
        <CoatHealth />
        <Testimonials />
        <MustHaves />
        <Footer />
      </main>
    </div>
  );
}

export default App;
