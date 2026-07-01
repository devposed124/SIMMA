import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Sparkles, Navigation, Compass, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenDining: () => void;
  heroImage: string;
}

export default function Hero({ onOpenBooking, onOpenDining, heroImage }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic parallax values
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  // Spring settings for smooth easing
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(xValue, springConfig);
  const smoothY = useSpring(yValue, springConfig);

  // Map mouse movement to subtle offsets (max 6-8px as requested)
  const bgTranslateX = useTransform(smoothX, [-100, 100], [-8, 8]);
  const bgTranslateY = useTransform(smoothY, [-100, 100], [-8, 8]);

  const textTranslateX = useTransform(smoothX, [-100, 100], [4, -4]);
  const textTranslateY = useTransform(smoothY, [-100, 100], [4, -4]);

  const logoTranslateX = useTransform(smoothX, [-100, 100], [10, -10]);
  const logoTranslateY = useTransform(smoothY, [-100, 100], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height, left, top } = container.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      // Normalize to percentage ranges [-100, 100]
      const pctX = (x / (width / 2)) * 100;
      const pctY = (y / (height / 2)) * 100;

      xValue.set(pctX);
      yValue.set(pctY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [xValue, yValue]);

  // Generate some elegant floating light particles
  const particles = Array.from({ length: 18 }, (_, i) => {
    const size = Math.random() * 3 + 2;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * -20;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-amber/30 pointer-events-none filter blur-[1px]"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          top: `${top}%`,
        }}
        animate={{
          y: [-40, -150, -40],
          x: [0, Math.random() * 40 - 20, 0],
          opacity: [0.1, 0.7, 0.1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />
    );
  });

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-charcoal flex items-center justify-center"
    >
      {/* Cinematic Background Layer with Parallax */}
      <motion.div
        className="absolute inset-0 w-[105%] h-[105%] -left-[2.5%] -top-[2.5%] pointer-events-none scale-105"
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Soft Dark Gradients & Light Ray Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/60 pointer-events-none" />
      
      {/* Ambient Light Ray Simulation */}
      <div className="absolute top-0 left-1/4 w-[50%] h-full bg-gradient-to-b from-amber/5 to-transparent -skew-x-12 filter blur-[80px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Floating Fog Drift Layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-1/2 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-40 pointer-events-none filter blur-[20px]"
        animate={{
          x: [0, -1000, 0],
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Amber Light Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles}
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        {/* Floating location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring' }}
          className="inline-flex items-center gap-2 bg-charcoal/70 backdrop-blur-md border border-gold/40 px-4 py-2 rounded-full mb-8 shadow-[0_4px_15px_rgba(201,162,74,0.15)] hover:border-gold transition-colors"
        >
          <span className="animate-bounce">📍</span>
          <span className="text-[10px] tracking-[0.25em] font-mono text-gold uppercase font-bold">
            Darjeeling, India
          </span>
        </motion.div>

        {/* Brand Crest with slight depth offset */}
        <motion.div
          style={{ x: logoTranslateX, y: logoTranslateY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: 'spring' }}
          className="w-14 h-14 rounded-full border border-gold/50 flex items-center justify-center text-gold mb-6 bg-charcoal/40 backdrop-blur-sm shadow-[0_0_20px_rgba(201,162,74,0.2)]"
        >
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '40s' }} />
        </motion.div>

        {/* Large Elegant Heading */}
        <motion.div
          style={{ x: textTranslateX, y: textTranslateY }}
          className="space-y-4 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-text leading-[1.1] tracking-tight"
          >
            Luxury in the Heart of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber to-gold">Darjeeling</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-lg md:text-xl text-secondary-text font-light tracking-[0.15em] flex items-center justify-center gap-3"
          >
            <span>Stay.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <span>Dine.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <span>Unwind.</span>
          </motion.p>
        </motion.div>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full justify-center"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-sm px-8 py-4 rounded-xl shadow-[0_4px_25px_rgba(201,162,74,0.3)] hover:scale-103 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles size={15} />
            <span>Book Your Stay</span>
          </button>

          <button
            onClick={onOpenDining}
            className="w-full sm:w-auto bg-charcoal/60 hover:bg-charcoal text-primary-text hover:text-gold font-sans font-semibold text-sm px-8 py-4 rounded-xl border border-border-custom hover:border-gold/30 backdrop-blur-sm hover:scale-103 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass size={15} />
            <span>Explore Dining</span>
          </button>
        </motion.div>

        {/* Slow scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-secondary-text cursor-pointer hover:text-gold transition-colors"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] tracking-[0.25em] font-mono uppercase">Descend</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
