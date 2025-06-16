'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize scroll-based animations
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 90]);
  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const scrollToNext = () => {
    if (typeof window === 'undefined') return;
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Framer Motion */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero1.jpg)',
          y: ySpring
        }}
        aria-label="Mountain retreat at Batoli Soul Stay"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-poppins"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: isMounted ? 0.5 : 0
            }}
          >
            Welcome to{' '}
            <span className="text-gradient bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent">
              Batoli
            </span>
            <br />
            Soul Stay
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: isMounted ? 0.8 : 0.2
            }}
          >
            Experience tranquility in the heart of the mountains. 
            Where breathtaking views meet authentic hospitality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: isMounted ? 1 : 0.3
            }}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-sky-blue hover:bg-sky-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-white hover:text-deep-blue min-w-[220px]"
              aria-label="Book your stay at Batoli Home Stay"
            >
              <a href="#contact">{/* Link to contact form section */}
                <Calendar className="mr-2 h-5 w-5" />
                Book Your Stay
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-deep-blue px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 glass-effect"
              aria-label="Explore our location"
            >
              <a href="#location">{/* Link to location section */}
                <MapPin className="mr-2 h-5 w-5" />
                Explore Location
              </a>
            </Button>
          </motion.div>

          {/* Experience Highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mt-12 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium">Mountain Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-light-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium">Peaceful Retreat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-powder-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium">Authentic Experience</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-all duration-300 z-30 animate-bounce-gentle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.button>
    </section>
  );
}