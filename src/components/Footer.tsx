import { Compass, Mail, Phone, MapPin, Sparkles, Send } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenDining: () => void;
}

export default function Footer({ onOpenBooking, onOpenDining }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal border-t border-border-custom text-secondary-text relative z-10 overflow-hidden">
      {/* Upper Footer: Premium Newsletter Block */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-border-custom/40">
        <div className="md:col-span-6 space-y-2">
          <h3 className="font-serif text-2xl text-primary-text font-medium flex items-center gap-2">
            <Sparkles size={16} className="text-gold" />
            <span>Join Our Mountain Chronicle</span>
          </h3>
          <p className="text-xs text-secondary-text leading-relaxed max-w-sm">
            Receive intimate dispatches, local recipe releases, and priority reservations for high-altitude culinary events.
          </p>
        </div>

        <div className="md:col-span-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to our private dispatches.');
              (e.target as any).reset();
            }}
            className="flex items-center bg-graphite border border-border-custom focus-within:border-gold/50 rounded-xl p-1.5 transition-all max-w-md md:ml-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent border-none text-xs text-primary-text px-3 py-2 focus:outline-none w-full"
              required
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Send size={11} />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Blocks */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-gold">
              <span className="font-serif text-sm font-bold">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold tracking-[0.2em] text-primary-text">
                SIMMA
              </span>
              <span className="text-[8px] tracking-[0.3em] font-mono uppercase text-secondary-text">
                Hotel • Darjeeling
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed max-w-sm">
            Our luxury boutique retreat unites pristine mountain design with deep mountain peace. Unwind in the comforting shelter of Mount Kanchenjunga.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            {['Instagram', 'Facebook', 'Pinterest', 'LinkedIn'].map((network) => (
              <a
                key={network}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Connecting to SIMMA Hotel ${network}...`);
                }}
                className="text-xs text-secondary-text hover:text-gold transition-colors font-mono uppercase tracking-widest"
              >
                {network}
              </a>
            ))}
          </div>
        </div>

        {/* Contact info Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-serif text-base text-primary-text font-medium uppercase tracking-wider">
            Mountain Desk
          </h4>

          <ul className="space-y-3.5 text-xs font-light">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
              <span>Heritage Ridge Lane, Ward No. 4, Darjeeling, West Bengal 734101, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-gold flex-shrink-0" />
              <a href="tel:+913542257462" className="hover:text-gold transition-colors">
                +91 354 225 7462
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-gold flex-shrink-0" />
              <a href="mailto:concierge@simmahotel.com" className="hover:text-gold transition-colors">
                concierge@simmahotel.com
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-base text-primary-text font-medium uppercase tracking-wider">
            Sanctuary
          </h4>

          <ul className="space-y-2.5 text-xs">
            <li>
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#home'); }}
                className="hover:text-gold transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#rooms"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#rooms'); }}
                className="hover:text-gold transition-colors"
              >
                Rooms & Suites
              </a>
            </li>
            <li>
              <a
                href="#restaurant"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#restaurant'); }}
                className="hover:text-gold transition-colors"
              >
                Fine Dining
              </a>
            </li>
            <li>
              <a
                href="#bar"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#bar'); }}
                className="hover:text-gold transition-colors"
              >
                Fireplace Lounge
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#gallery'); }}
                className="hover:text-gold transition-colors"
              >
                Gallery Collection
              </a>
            </li>
          </ul>
        </div>

        {/* Experience Columns (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-serif text-base text-primary-text font-medium uppercase tracking-wider">
            Experience
          </h4>

          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={onOpenBooking} className="hover:text-gold text-left transition-colors cursor-pointer">
                Bespoke Stays
              </button>
            </li>
            <li>
              <button onClick={onOpenDining} className="hover:text-gold text-left transition-colors cursor-pointer">
                Table Reservations
              </button>
            </li>
            <li>
              <a
                href="#amenities"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#amenities'); }}
                className="hover:text-gold transition-colors"
              >
                Resort Services
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => { e.preventDefault(); handleLinkClick('#testimonials'); }}
                className="hover:text-gold transition-colors"
              >
                Guest Reviews
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright bar */}
      <div className="bg-graphite py-6 border-t border-border-custom/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-wider">
          <span>&copy; {currentYear} SIMMA HOTEL, DARJEELING. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-1">
            <span>DESIGNED BY</span>
            <strong className="text-gold font-normal">SIMMA COLLECTIVE</strong>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>PRISTINE MOUNTAIN RESORTS</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
