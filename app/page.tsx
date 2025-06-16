'use client';

import { useEffect, useRef } from 'react';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { GallerySection } from '@/components/gallery-section';
import { AccommodationSection } from '@/components/accommodation-section';
import { LocationSection } from '@/components/location-section';
import { Footer } from '@/components/footer';
import { ContactUsSection } from '@/components/contact-us-section';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import Lenis from 'lenis';

// Custom hook to handle isomorphic layout effects
function useIsomorphicLayoutEffect(callback: () => void, deps: any[] = []) {
  const effect = typeof window !== 'undefined' ? useEffect : () => {};
  return effect(callback, deps);
}

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>();

  useIsomorphicLayoutEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      // Fix: add type for t
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Handle scroll events
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <LocationSection />
      <ContactUsSection />
      <Footer />
    </main>
  );
}