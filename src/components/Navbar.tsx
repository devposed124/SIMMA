import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenReservations: () => void;
  reservationsCount: number;
}

export default function Navbar({ onOpenBooking, onOpenReservations, reservationsCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Restaurant', href: '#restaurant' },
    { name: 'Bar', href: '#bar' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal/80 backdrop-blur-md border-b border-border-custom py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
          >
            <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold bg-charcoal/50 group-hover:border-gold group-hover:scale-105 transition-all shadow-[0_0_8px_rgba(201,162,74,0.15)]">
              <span className="font-serif text-sm font-bold tracking-tighter">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-primary-text leading-tight group-hover:text-gold transition-colors">
                SIMMA
              </span>
              <span className="text-[8px] tracking-[0.3em] font-mono uppercase text-secondary-text">
                Hotel • Darjeeling
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs font-sans text-secondary-text hover:text-gold uppercase tracking-widest transition-colors font-medium relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Right Actions (Book CTA & Concierge) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* My Reservations Access */}
            <button
              onClick={onOpenReservations}
              className="relative p-2.5 rounded-xl border border-border-custom bg-charcoal/30 hover:border-gold/30 hover:text-gold text-secondary-text transition-all flex items-center justify-center cursor-pointer group"
              title="My Reservations"
            >
              <Calendar size={15} />
              {reservationsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-charcoal font-mono text-[9px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(201,162,74,0.4)] animate-pulse">
                  {reservationsCount}
                </span>
              )}
            </button>

            {/* Book Stay button */}
            <button
              onClick={onOpenBooking}
              className="bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-xs px-5 py-2.5 rounded-xl transition-all hover:scale-103 active:scale-[0.98] shadow-[0_4px_15px_rgba(201,162,74,0.15)] flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={12} />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile Actions block */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* My Reservations on Mobile */}
            <button
              onClick={onOpenReservations}
              className="relative p-2 rounded-lg border border-border-custom bg-charcoal/40 text-secondary-text transition-colors"
            >
              <Calendar size={15} />
              {reservationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold text-charcoal font-mono text-[8px] font-bold flex items-center justify-center">
                  {reservationsCount}
                </span>
              )}
            </button>

            {/* Burger menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border-custom bg-charcoal/40 text-secondary-text hover:text-primary-text transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-lg lg:hidden flex flex-col justify-between pt-24 pb-8 px-6"
          >
            {/* Mobile menu list */}
            <div className="space-y-6 flex flex-col items-center justify-center flex-grow">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif text-2xl text-primary-text hover:text-gold transition-colors block text-center"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full max-w-xs mt-4 bg-gold text-charcoal font-sans font-semibold text-sm py-3 rounded-xl shadow-[0_4px_15px_rgba(201,162,74,0.2)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Book Your Stay</span>
              </motion.button>
            </div>

            {/* Mobile footer credentials */}
            <div className="text-center pt-6 border-t border-border-custom/50">
              <span className="text-[10px] tracking-widest font-mono text-secondary-text block">
                📍 DARJEELING, INDIA
              </span>
              <a
                href="tel:+913542257462"
                className="inline-flex items-center gap-1.5 text-xs text-gold font-sans font-medium mt-2"
              >
                <PhoneCall size={12} />
                <span>+91 354 225 7462</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
