'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LocationSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const shareUrl = 'https://maps.app.goo.gl/HQu8gsiv2xJUsYeA8?g_st=awb';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock map implementation - in a real app, you'd use Mapbox GL JS
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShareLocation = async () => {
    const shareData = {
      title: 'Batoli Soul Stay Location',
      text: 'Check out Batoli Soul Stay at this location!',
      url: shareUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('Shared successfully!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('Location copied to clipboard!');
      } else {
        setShareStatus('Sharing not supported on this device.');
      }
    } catch (error) {
      setShareStatus('Could not share location.');
    }
    setTimeout(() => setShareStatus(''), 3000);
  };

  return (
    <section id="location" className="relative py-12 md:py-20 bg-gradient-to-br from-warm-gray/30 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue mb-4 font-poppins">
            Discover Our{' '}
            <span className="text-gradient">Location</span>
          </h2>
          <p className="text-base md:text-xl text-stone-gray max-w-3xl mx-auto">
            Perfectly positioned in the heart of the mountains, with easy access to nature's most spectacular attractions and authentic local experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Map Container */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="map-container relative bg-gradient-to-br from-sky-blue/20 to-light-blue/30 rounded-2xl overflow-hidden shadow-2xl w-full">
              {/* Embedded Google Map with Pinpoint Location */}
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2790.046110189591!2d77.9590625!3d30.4526875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d30073200ae9%3A0x6dc1cf067cf83e7b!2sBatolisoulstay!5e1!3m2!1sen!2sin!4v1750061454089!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Batoli Soul Stay Location"
                />
              </div>
            </div>
          </motion.div>

          {/* Location Info Card + Getting Here */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Location Info Card */}
            <motion.div
              className="bg-white rounded-xl p-4 md:p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-deep-blue mb-1">Batoli Soul Stay</h3>
                  <p className="text-stone-gray text-sm mb-3">
                    Batoli Soul Stay, Batoli Village,<br/>
                    Dehradun, Uttarakhand, India
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size={isMobile ? "sm" : "default"} className="bg-blue-500 hover:bg-blue-400 text-sm md:text-base" asChild>
                      <a href="https://maps.app.goo.gl/HQu8gsiv2xJUsYeA8?g_st=awb" target="_blank" rel="noopener noreferrer">
                        <Navigation className="h-4 w-4 mr-1" />
                        Get Directions
                      </a>
                    </Button>
                    <Button size={isMobile ? "sm" : "default"} variant="outline" className="text-sm md:text-base" type="button" onClick={handleShareLocation}>
                      Share Location
                    </Button>
                  </div>
                  {shareStatus && (
                    <div className="mt-2 text-sm text-green-600 animate-fade-in">
                      {shareStatus}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Getting Here */}
            <motion.div
              className="bg-gradient-to-r from-sky-blue/10 to-light-blue/10 rounded-xl p-4 md:p-6"
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