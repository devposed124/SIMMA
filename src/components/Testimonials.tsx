import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll slowly every 8 seconds as requested
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-graphite border-b border-border-custom relative overflow-hidden">
      {/* Decorative vertical line grids */}
      <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-border-custom/20 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-border-custom/20 pointer-events-none hidden md:block" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header Block */}
        <div className="mb-12 space-y-4">
          <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
            Guest Chronicles
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary-text leading-tight tracking-tight">
            Loved by Global Seekers of Quiet Luxury
          </h2>
        </div>

        {/* Testimonial Active Display with Soft Fade AnimatePresence */}
        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full border border-gold/30 bg-charcoal flex items-center justify-center text-gold mx-auto shadow-md">
                <Quote size={18} className="fill-gold/10" />
              </div>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Message quote */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-text leading-relaxed tracking-wide italic max-w-3xl mx-auto font-light">
                "{active.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="space-y-1 pt-2">
                <cite className="not-italic text-sm font-sans font-semibold text-primary-text block">
                  {active.name}
                </cite>
                <span className="text-[10px] tracking-widest font-mono text-secondary-text uppercase block">
                  {active.location} • Stayed {active.stayDate}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators / Interactive Controllers */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Back btn */}
          <button
            onClick={handlePrev}
            className="p-2 border border-border-custom hover:border-gold/30 text-secondary-text hover:text-gold rounded-full transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-6 bg-gold' : 'w-1.5 bg-border-custom hover:bg-gold/55'
                }`}
              />
            ))}
          </div>

          {/* Forward btn */}
          <button
            onClick={handleNext}
            className="p-2 border border-border-custom hover:border-gold/30 text-secondary-text hover:text-gold rounded-full transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
