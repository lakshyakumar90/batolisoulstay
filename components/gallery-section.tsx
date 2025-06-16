'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Mountain, Home, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/gallery1.mp4',
    alt: 'Mountain view from Batoli Home Stay',
    category: 'views',
    title: 'Breathtaking Mountain Vista',
  },
  {
    id: 2,
    src: '/gallery2.jpg',
    alt: 'Mountain view of Batoli Home Stay',
    category: 'views',
    title: 'Peaceful',
  },
  {
    id: 3,
    src: '/gallery3.jpg',
    alt: 'Impressive Views at Batoli',
    category: 'Views',
    title: 'Impressive Views',
  },
  {
    id: 6,
    src: '/gallery6.jpg',
    alt: 'Scenes in Winter',
    category: 'Views',
    title: 'Views in Winter',
  },
  {
    id: 5,
    src: '/gallery5.jpg',
    alt: 'Sunrise at Batoli',
    category: 'Views',
    title: 'Sunrise',
  },
  {
    id: 7,
    src: '/gallery7.jpg',
    alt: 'Views on Cloudy day',
    category: 'Views',
    title: 'Views on Cloudy day',
  },
  {
    id: 8,
    src: '/gallery8.jpg',
    alt: 'Views on Cloudy day',
    category: 'Views',
    title: 'Views on Cloudy day',
  },
  {
    id: 9,
    src: '/gallery9.jpg',
    alt: 'Be comfortable',
    category: 'Comfort',
    title: 'Be comfortable',
  },
  {
    id: 10,
    src: '/gallery10.jpg',
    alt: 'Sun on a Cloudy day',
    category: 'Cloudy',
    title: 'Sun on a Cloudy day',
  },
  {
    id: 11,
    src: '/gallery11.jpg',
    alt: 'Heavenly Visuals',
    category: 'Views',
    title: 'Heavenly Visuals',
  },
  {
    id: 12,
    src: '/gallery12.jpg',
    alt: 'Nature at its best',
    category: 'Nature',
    title: 'Nature at its best',
  },
    {
    id: 4,
    src: '/gallery4.jpg',
    alt: 'Sunset view from the property',
    category: 'views',
    title: 'Golden Hour Magic',
  },
];

export function GallerySection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });
  const [videoMuted, setVideoMuted] = useState(true);

  // Always show all images, no filter
  const filteredImages = galleryImages;

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!lightboxImage) return;

    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredImages.length
      : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, currentImageIndex]);

  const updateOverlaySize = () => {
    if (imageRef.current) {
      setOverlaySize({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      });
    } else if (videoRef.current) {
      setOverlaySize({
        width: videoRef.current.clientWidth,
        height: videoRef.current.clientHeight,
      });
    }
  };
  useEffect(() => {
    setVideoMuted(true); // Always start muted when opening a video
    updateOverlaySize();
    window.addEventListener('resize', updateOverlaySize);
    return () => window.removeEventListener('resize', updateOverlaySize);
  }, [lightboxImage]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-4 font-poppins">
            Capture the{' '}
            <span className="text-gradient">Moments</span>
          </h2>
          <p className="text-xl text-stone-gray max-w-2xl mx-auto">
            Explore the beauty of Batoli Home Stay through our gallery of cherished moments and stunning views
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={galleryRef}
          className="masonry-grid"
          variants={container}
          initial="hidden"
          animate={controls}
          layout={false} // Disable framer-motion layout animations for performance
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.id}`}
                className="gallery-item masonry-item cursor-pointer group"
                variants={item}
                onClick={() => openLightbox(image)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                layout={false} // Disable layout animation on each item
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  {image.src.endsWith('.mp4') ? (
                    <video
                      src={image.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-white/80 capitalize">{image.category}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-60 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-60 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <motion.div
              className="relative max-w-4xl w-full mx-4 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImage.src.endsWith('.mp4') ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <video
                    ref={videoRef}
                    src={lightboxImage.src}
                    autoPlay
                    muted={videoMuted}
                    loop
                    playsInline
                    onLoadedMetadata={updateOverlaySize}
                    className="w-auto max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
                  />
                  {/* Mute/Unmute Button */}
                  <button
                    type="button"
                    onClick={() => setVideoMuted((m) => !m)}
                    className="absolute top-4 left-4 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 pr-1 text-white rounded-full flex items-center justify-center focus:outline-none"
                    style={{ pointerEvents: 'auto' }}
                    aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {videoMuted ? (
                      // Mute icon
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" /></svg>
                    ) : (
                      // Unmute icon (with a line through it)
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" /><line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" /></svg>
                    )}
                  </button>
                </div>
              ) : (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    ref={imageRef}
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    onLoad={updateOverlaySize}
                    className="w-auto max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
                  />
                  <div
                    ref={overlayRef}
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: overlaySize.width,
                      height: overlaySize.height * 0.33, // 1/3rd of image height
                      pointerEvents: 'none',
                      borderBottomLeftRadius: '0.5rem',
                      borderBottomRightRadius: '0.5rem',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                    }}
                  >
                    <div className="flex flex-col justify-end h-full p-6">
                      <h3 className="text-white text-xl font-semibold mb-2 break-words">
                        {lightboxImage.title}
                      </h3>
                      <p className="text-white/80 capitalize break-words">
                        {lightboxImage.category} • {currentImageIndex + 1} of {filteredImages.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}