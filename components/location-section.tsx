'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LocationSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Mock map implementation - in a real app, you'd use Mapbox GL JS
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="location" className="py-20 bg-gradient-to-br from-warm-gray/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4 font-poppins">
            Discover Our{' '}
            <span className="text-gradient">Location</span>
          </h2>
          <p className="text-xl text-stone-gray max-w-3xl mx-auto">
            Perfectly positioned in the heart of the mountains, with easy access to nature's most spectacular attractions and authentic local experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Container */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="map-container relative bg-gradient-to-br from-sky-blue/20 to-light-blue/30 rounded-2xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
              {/* Embedded Google Map with Pinpoint Location */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2790.046110189591!2d77.9590625!3d30.4526875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d30073200ae9%3A0x6dc1cf067cf83e7b!2sBatolisoulstay!5e1!3m2!1sen!2sin!4v1750061454089!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Batoli Soul Stay Location"
              />
            </div>
          </motion.div>

          {/* Location Info Card + Getting Here */}
          <div className="flex flex-col gap-6">
            {/* Location Info Card */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-blue rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-deep-blue mb-1">Batoli Soul Stay</h3>
                  <p className="text-stone-gray text-sm mb-3">
                    Batoli Soul Stay, Batoli Village,<br/>
                    Dehradun, Uttarakhand, India
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-400" asChild>
                      <a href="https://maps.app.goo.gl/HQu8gsiv2xJUsYeA8?g_st=awb" target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4 mr-1" />
                        Get Directions
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href="https://maps.app.goo.gl/HQu8gsiv2xJUsYeA8?g_st=awb" target="_blank" rel="noopener noreferrer">
                        Share Location
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Getting Here */}
            <motion.div
              className="bg-gradient-to-r from-sky-blue/10 to-light-blue/10 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-deep-blue mb-4">Getting Here</h4>
              <div className="space-y-3 text-sm text-stone-gray">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sky-blue/20 rounded-full flex items-center justify-center">
                    🚗
                  </div>
                  <div>
                    <p className="font-medium">By Car</p>
                    <p className="text-xs">2 hours from city center</p>
                    <p className="text-xs">Then Trekking to the location</p>
                    
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sky-blue/20 rounded-full flex items-center justify-center">
                    🚌
                  </div>
                  <div>
                    <p className="font-medium">By Bus</p>
                    <p className="text-xs">1 hour away from Bus Station</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sky-blue/20 rounded-full flex items-center justify-center">
                    ✈️
                  </div>
                  <div>
                    <p className="font-medium">By Air</p>
                    <p className="text-xs">Regional airport 2 hours away</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}