'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Award, Calendar, Heart } from 'lucide-react';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [ref, inView] = useInView({
    threshold: isMobile ? 0.1 : 0.2,
    triggerOnce: true,
  });
  
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -10 : -20]);
  const ySpring = useSpring(y, { 
    stiffness: isMobile ? 50 : 100, 
    damping: isMobile ? 20 : 30 
  });
  
  // Animation controls for the section
  const sectionControls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      sectionControls.start('show');
    }
  }, [inView, sectionControls]);

  // Content animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { x: isMobile ? 15 : 30, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start('show');
      setHasAnimated(true);
    }
  }, [inView, controls, hasAnimated]);

  const counterVariants = {
    hidden: { opacity: 0, y: isMobile ? 5 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.7 : 1,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    {
      icon: Calendar,
      value: 365,
      suffix: '',
      label: 'Days Open',
      description: 'Available year-round for your convenience',
    },
    {
      icon: Heart,
      value: 99,
      suffix: '%',
      label: 'Satisfaction Rate',
      description: 'Guest satisfaction and positive reviews',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-12 md:py-20 bg-gradient-to-br from-warm-gray to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <motion.div
            ref={imageRef}
            className="relative order-2 lg:order-1"
            style={{ y: isMobile ? 0 : ySpring }}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/about.jpg"
                alt="Batoli Home Stay exterior with mountain backdrop"
                className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/20 to-transparent" />
            </div>
            
            {/* Floating Card - Hidden on mobile */}
            <motion.div
              className="hidden md:block absolute -right-4 -bottom-4 bg-white p-6 rounded-xl shadow-xl cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sky-blue rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-deep-blue">Made with Love</p>
                  <p className="text-sm text-black/70">Authentic hospitality</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            ref={contentRef}
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
          >
            <motion.div variants={item} ref={ref}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue mb-4 md:mb-6 font-poppins">
                Your Home Away <br className="hidden md:block"></br> From{' '}
                <span className="text-gradient">Home</span>
              </h2>
              
              <p className="text-base md:text-lg text-stone-gray leading-relaxed mb-4 md:mb-6">
                Tucked away in the tranquil embrace of the mountains, Batoli Soul Stay invites you to a refined escape from the chaos of urban life. Now open to discerning guests, our haven seamlessly blends adventure, serenity, and captivating vistas.
              </p>
              
              <p className="text-base md:text-lg text-stone-gray leading-relaxed mb-6 md:mb-8">
                Awaken to awe-inspiring mountain panoramas, and lose yourself in the timeless allure of nature. Whether you crave exhilarating exploration or peaceful rejuvenation, our elegant homestay provides the ultimate sanctuary for your mountain retreat.
              </p>

              {/* Features List */}
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  'Breathtaking Mountain Vistas',
                  'Expert Local Guides',
                  'Scenic Hiking Trails',
                  'Tranquil Nature Retreat',
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, x: isMobile ? 10 : 20 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.1 * index
                        }
                      }
                    }}
                  >
                    <div className="w-2 h-2 bg-sky-blue rounded-full" />
                    <span className="text-sm md:text-base text-stone-gray font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Section */}
              <motion.div
                ref={statsRef}
                className="grid grid-cols-2 gap-4 md:gap-6"
                initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {stats && Array.isArray(stats) && stats.length > 0 ? (
                  stats.map((stat, index) => (
                    <motion.div
                      key={stat.label || stat.description || index}
                      className="text-center p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-sky-blue/20 hover:bg-white/70 transition-all duration-300 hover-lift"
                      variants={counterVariants}
                      initial="hidden"
                      animate={controls}
                      custom={index}
                    >
                      {stat.icon && <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-sky-blue mx-auto mb-2" />}
                      <div className="text-xl md:text-2xl font-bold text-deep-blue mb-1">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        >
                          {stat.value}{stat.suffix}
                        </motion.span>
                      </div>
                      {stat.label && (
                        <p className="text-xs md:text-sm font-semibold text-stone-gray mb-1">
                          {stat.label}
                        </p>
                      )}
                      <p className="text-xs text-stone-gray/70 hidden md:block">
                        {stat.description}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-red-500">No stats available.</div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}