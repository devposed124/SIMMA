import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2, Sparkles } from 'lucide-react';
import { GalleryImage } from '../types';

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rooms' | 'dining' | 'bar' | 'views'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on active category
  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter((img) => img.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Sanctuary' },
    { id: 'rooms', label: 'Suites & Villas' },
    { id: 'dining', label: 'Fine Culinary' },
    { id: 'bar', label: 'Lounge & Cellar' },
    { id: 'views', label: 'Himalayan Views' },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIdx = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIdx);
  };

  return (
    <section id="gallery" className="py-24 bg-charcoal border-b border-border-custom relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
            Visual Solitude
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-text leading-tight tracking-tight">
            Cinematic Glimpses of SIMMA
          </h2>
          <p className="text-sm text-secondary-text leading-relaxed font-light">
            A photographic ledger of our pristine architecture, organic tea gardens, and cozy candlelit lounges.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id as any);
                setLightboxIndex(null); // Reset lightbox on filter change
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-gold border-gold text-charcoal shadow-md font-semibold'
                  : 'bg-graphite/40 border-border-custom text-secondary-text hover:border-gold/30 hover:text-gold'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => setLightboxIndex(idx)}
                className="relative overflow-hidden rounded-2xl border border-border-custom aspect-[4/3] group cursor-pointer interactive-card shadow-md"
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Overlay with elegant details */}
                <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-6" />
                
                {/* Elegant overlay elements */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono tracking-widest text-gold uppercase bg-charcoal/80 border border-gold/30 px-2.5 py-1 rounded-full">
                      {image.category === 'dining' ? 'culinary' : image.category}
                    </span>
                    <Maximize2 size={13} className="text-secondary-text group-hover:text-gold transition-colors" />
                  </div>

                  <div className="space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="font-serif text-lg text-primary-text font-medium leading-tight">
                      {image.caption}
                    </h4>
                    <span className="text-[10px] text-secondary-text font-sans font-light flex items-center gap-1">
                      <Sparkles size={10} className="text-gold" />
                      <span>Simma Heritage</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Lightbox frame container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video md:aspect-[16/10] bg-charcoal border border-border-custom rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 text-secondary-text hover:text-gold transition-all z-20 bg-charcoal/80 p-2.5 rounded-full border border-border-custom hover:border-gold/30"
              >
                <X size={18} />
              </button>

              {/* Prev button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text hover:text-gold transition-all z-20 bg-charcoal/80 p-3 rounded-full border border-border-custom hover:border-gold/30 cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text hover:text-gold transition-all z-20 bg-charcoal/80 p-3 rounded-full border border-border-custom hover:border-gold/30 cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>

              {/* Image Frame */}
              <div className="flex-grow flex items-center justify-center bg-black/30 p-2 overflow-hidden">
                <img
                  src={filteredImages[lightboxIndex].url}
                  alt={filteredImages[lightboxIndex].caption}
                  className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description strip */}
              <div className="bg-charcoal/90 border-t border-border-custom/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase block">
                    {filteredImages[lightboxIndex].category} collection
                  </span>
                  <h4 className="font-serif text-xl text-primary-text font-medium leading-tight">
                    {filteredImages[lightboxIndex].caption}
                  </h4>
                </div>

                <div className="text-[10px] font-mono text-secondary-text uppercase tracking-widest bg-graphite border border-border-custom px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center">
                  IMAGE {lightboxIndex + 1} OF {filteredImages.length}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
