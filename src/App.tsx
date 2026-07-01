import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Compass, PhoneCall, HelpCircle, Check, ArrowUpRight, CompassIcon } from 'lucide-react';

// Components
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Restaurant from './components/Restaurant';
import Bar from './components/Bar';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Modals
import BookingModal from './components/BookingModal';
import ReservationModal from './components/ReservationModal';
import MyReservationsDrawer from './components/MyReservationsDrawer';

// Types
import { Room, Testimonial, GalleryImage } from './types';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [diningModalOpen, setDiningModalOpen] = useState(false);
  const [reservationsDrawerOpen, setReservationsDrawerOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [reservationsCount, setReservationsCount] = useState(0);

  // Load reservations counter from localStorage
  const updateCount = () => {
    const savedBookings = localStorage.getItem('simma_bookings');
    const savedRes = localStorage.getItem('simma_reservations');
    const bookingsList = savedBookings ? JSON.parse(savedBookings) : [];
    const resList = savedRes ? JSON.parse(savedRes) : [];
    setReservationsCount(bookingsList.length + resList.length);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('simma_bookings_updated', updateCount);
    window.addEventListener('simma_reservations_updated', updateCount);
    return () => {
      window.removeEventListener('simma_bookings_updated', updateCount);
      window.removeEventListener('simma_reservations_updated', updateCount);
    };
  }, []);

  // Room catalog data (utilizing our custom real property photographs!)
  const rooms: Room[] = [
    {
      id: 'imperial-kanchen',
      name: 'Simma Imperial Suite',
      description: 'Our crown jewel. Features a vintage roaring slate-stone fireplace, a private panoramic cedar deck, and an artisan hand-beaten copper bathtub.',
      longDescription: 'Directly facing the sunrise summit of Mount Kanchenjunga. The Imperial Suite is designed for deep premium luxury. Furnished with handpicked antiques, a massive stone-masonry hearth, and an expansive bedroom that opens onto a suspended wooden deck. Enjoy private butler tea services served beside the crackling fire.',
      price: 320,
      image: '/src/assets/images/simma_luxury_suite_1782896830068.jpg',
      size: '780 SQ FT',
      occupancy: '2 ADULTS',
      bed: 'EMPEROR LUX BED',
      view: 'KANCHENJUNGA RANGE',
      amenities: [
        'Dedicated 24/7 personal butler',
        'Original roaring slate fireplace',
        'Emperor size luxury bed',
        'Artisan hand-beaten copper bath',
        'Suspended panoramic wood deck',
        'Complimentary private high tea',
      ],
    },
    {
      id: 'classic-double',
      name: 'Classic Double Room',
      description: 'A cozy and welcoming double bed featuring vibrant red accents, designed to provide a restful retreat after a day of exploring Darjeeling.',
      longDescription: 'A classic and thoughtfully appointed double room that blends traditional mountain design with quiet comfort. Features warm timber accents, handcrafted furniture, and rich crimson draperies that cocoon you in comfort. The room opens to views of our misty tea valleys and is stocked with our private organic first-flush selection.',
      price: 150,
      image: '/src/assets/images/simma_classic_double_room.jpg',
      size: '420 SQ FT',
      occupancy: '2 ADULTS',
      bed: '1 QUEEN BED',
      view: 'MISTY VALLEY GARDENS',
      amenities: [
        'High-speed optical Wi-Fi',
        'Private Himalayan Tea station',
        'Underfloor radiant floor heating',
        'Rain shower with brass fittings',
        'Organic cotton bedding & robes',
      ],
    },
    {
      id: 'alpine-twin',
      name: 'Alpine Twin Sanctuary',
      description: 'Warm wooden paneling and vibrant crimson accents create a cozy, inviting twin room, bathed in soft daylight.',
      longDescription: 'Perfect for friends or family traveling together, our Alpine Twin Sanctuary features two premium single beds adorned with high-thread-count linens and warm scarlet textiles. Bathed in the soft alpine daylight of Darjeeling, this room is a peaceful retreat offering stunning garden and pathway vistas.',
      price: 165,
      image: '/src/assets/images/simma_alpine_twin_room.jpg',
      size: '450 SQ FT',
      occupancy: '2 GUESTS',
      bed: '2 SINGLE BEDS',
      view: 'SCENIC GARDEN PATHS',
      amenities: [
        'High-speed optical Wi-Fi',
        'Himalayan tea station',
        'Premium sound speaker system',
        'Plush fleece slippers & robes',
        'Dual-sink vanity bath',
      ],
    },
    {
      id: 'classic-comfort',
      name: 'Classic Comfort Room',
      description: 'Thoughtfully curated for cozy intimacy, our guest room combines vibrant local accents with tranquil woodland views framed by classic panel windows.',
      longDescription: 'Envelop yourself in pure rustic serenity. The Classic Comfort Room is designed with local cedar paneling and gorgeous hand-embroidered textiles. Large paneled windows frame peaceful woodland and garden approach views, allowing you to watch the sunset colors paint the forest canopy while relaxing with a warm cup of Darjeeling tea.',
      price: 140,
      image: '/src/assets/images/simma_classic_comfort_room.jpg',
      size: '390 SQ FT',
      occupancy: '2 ADULTS',
      bed: '1 QUEEN BED',
      view: 'WOODED FOREST VIEW',
      amenities: [
        'High-speed optical Wi-Fi',
        'In-room private library selection',
        'Heated towel warmers',
        'Underfloor bedroom heating',
        'Plush organic cotton linens',
      ],
    },
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      name: 'Lord Sterling',
      location: 'London, UK',
      rating: 5,
      quote: 'An absolute masterpiece of hospitality. Breathtaking views of the peaks combined with the exquisite warmth of the stone fireplaces. The custom Darjeeling dusk cocktail alone is worth the trip.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      stayDate: 'November 2025',
    },
    {
      id: 't-2',
      name: 'Aanya Mukerjee',
      location: 'Kolkata, India',
      rating: 5,
      quote: 'Perched above the clouds. We spent three mornings sipping high-altitude organic tea overlooking Mount Kanchenjunga. Pristine rooms, meticulous design, and peaceful luxury.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      stayDate: 'January 2026',
    },
    {
      id: 't-3',
      name: 'Marc & Chloe Rousseau',
      location: 'Paris, France',
      rating: 5,
      quote: "The Chef's 7-course degustation was a revelation. To find such world-class culinary finesse in a cozy, remote mountain lodge is nothing short of magical.",
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      stayDate: 'March 2026',
    },
  ];

  // Gallery images mapping (utilizing merged real photographs and gorgeous custom-generated images!)
  const galleryImages: GalleryImage[] = [
    {
      id: 'g-1',
      url: '/src/assets/images/simma_hotel_hero_1782896818627.jpg',
      caption: 'The main resort exterior fading into twilight valleys',
      category: 'views',
    },
    {
      id: 'g-2',
      url: '/src/assets/images/simma_darjeeling_twilight_view.jpg',
      caption: 'A serene blue-hour vista over the twinkling hillside of Darjeeling, captured from the comforting luxury of SIMMA',
      category: 'views',
    },
    {
      id: 'g-3',
      url: '/src/assets/images/simma_luxury_suite_1782896830068.jpg',
      caption: 'Fireplace comfort inside the Simma Imperial Suite',
      category: 'rooms',
    },
    {
      id: 'g-4',
      url: '/src/assets/images/simma_classic_double_room.jpg',
      caption: 'A cozy and welcoming double bed featuring vibrant red accents, designed to provide a restful retreat',
      category: 'rooms',
    },
    {
      id: 'g-5',
      url: '/src/assets/images/simma_restaurant_bar_entrance.jpg',
      caption: "An inviting threshold to culinary indulgence at Simma's signature Restaurant & Bar",
      category: 'dining',
    },
    {
      id: 'g-6',
      url: '/src/assets/images/simma_tea_pour_1782897189970.jpg',
      caption: 'Traditional organic Darjeeling first-flush pour ceremony',
      category: 'dining',
    },
    {
      id: 'g-7',
      url: '/src/assets/images/simma_cozy_lounge_bar.jpg',
      caption: 'Unwind at our intimate rustic-chic bar, where warm, artisanal lighting and curated spirits await',
      category: 'bar',
    },
    {
      id: 'g-8',
      url: '/src/assets/images/simma_bar_restaurant_entrance.jpg',
      caption: 'The vibrant street-level facade of Simma, featuring our classic traditional tavern entrance',
      category: 'bar',
    },
    {
      id: 'g-9',
      url: '/src/assets/images/simma_about_garden_1782897032638.jpg',
      caption: 'Boutique resort tea gardens catching afternoon light',
      category: 'views',
    },
    {
      id: 'g-10',
      url: '/src/assets/images/simma_darjeeling_scenic_road_view.jpg',
      caption: "Winding mountain roads and towering pine forests framing the tranquil approach to SIMMA",
      category: 'views',
    },
    {
      id: 'g-11',
      url: '/src/assets/images/simma_classic_comfort_room.jpg',
      caption: 'Thoughtfully curated guest room combining vibrant local accents with tranquil garden views',
      category: 'rooms',
    },
    {
      id: 'g-12',
      url: '/src/assets/images/simma_cozy_minimalist_room.jpg',
      caption: 'A beautifully minimalist retreat featuring warm crimson accents and classic wooden furnishings',
      category: 'rooms',
    },
    {
      id: 'g-13',
      url: '/src/assets/images/simma_classic_cozy_room.jpg',
      caption: 'Warm wood paneling and vibrant accent linens create an intimate sanctuary for restful mountain nights',
      category: 'rooms',
    },
    {
      id: 'g-14',
      url: '/src/assets/images/simma_darjeeling_town_view.jpg',
      caption: "Experience the authentic mountain town charm of Darjeeling's hillside steps just moments away",
      category: 'views',
    },
  ];

  const handleOpenBooking = (room: Room | null = null) => {
    setSelectedRoom(room);
    setBookingModalOpen(true);
  };

  const handleOpenDining = () => {
    setDiningModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-primary-text font-sans antialiased overflow-x-hidden selection:bg-gold/30 selection:text-gold">
      
      {/* Custom Luxury Golden Cursor */}
      <CustomCursor />

      {/* Main Frosted glass / Transparent Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenReservations={() => setReservationsDrawerOpen(true)}
        reservationsCount={reservationsCount}
      />

      {/* Floating Action Badge for "My Reservations" (Quick Access helper) */}
      <AnimatePresence>
        {reservationsCount > 0 && !reservationsDrawerOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => setReservationsDrawerOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gold hover:bg-gold-hover text-charcoal p-4 rounded-full shadow-[0_4px_25px_rgba(201,162,74,0.45)] hover:scale-105 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center border border-white/20 group"
          >
            <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal border border-gold text-gold font-mono text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg">
              {reservationsCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator Bar on extreme top */}
      <div className="fixed top-0 left-0 w-full h-[2.5px] bg-charcoal/10 z-[100] pointer-events-none">
        <motion.div
          className="h-full bg-gold shadow-[0_0_8px_rgba(201,162,74,1)]"
          style={{
            transformOrigin: '0%',
            scaleX: '0', // Fallback or updated via scroll listeners
          }}
          animate={{
            scaleX: '1',
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Fullscreen Cinematic Parallax Hero */}
      <Hero
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenDining={handleOpenDining}
        heroImage="/src/assets/images/simma_hotel_hero_1782896818627.jpg"
      />

      {/* Heritage Split About Section */}
      <About aboutImage="/src/assets/images/simma_about_garden_1782897032638.jpg" />

      {/* Interactive Rooms Section */}
      <Rooms
        rooms={rooms}
        onBookRoom={handleOpenBooking}
      />

      {/* Edge Restaurant Menu Section */}
      <Restaurant
        onReserveTable={handleOpenDining}
        restaurantImage="/src/assets/images/simma_fine_dining_1782896840611.jpg"
      />

      {/* Cozy Twilight Bar Section */}
      <Bar
        onReserveTable={handleOpenDining}
        barImage="/src/assets/images/simma_luxury_bar_1782896853497.jpg"
      />

      {/* Premium Service Amenities Grid */}
      <Amenities />

      {/* Masonry Lightbox Gallery */}
      <Gallery images={galleryImages} />

      {/* Guest Chronicles Testimonials Scroll */}
      <Testimonials testimonials={testimonials} />

      {/* Call to Action Block */}
      <section className="relative py-28 bg-charcoal border-b border-border-custom overflow-hidden">
        {/* Animated gradient background mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-gold/5 to-charcoal/80 opacity-60 pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
            Begin Your Pilgrimage
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-primary-text leading-tight tracking-tight">
            Experience Darjeeling in Style
          </h2>
          <p className="text-sm md:text-base text-secondary-text font-light leading-relaxed max-w-xl mx-auto">
            Your suspended sanctuary overlooking the highest peak of India is prepared. Secure your keys to pristine mountain silence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenBooking(null)}
              className="w-full sm:w-auto bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-xs px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(201,162,74,0.3)] transition-all hover:scale-103 active:scale-[0.98] cursor-pointer"
            >
              Book Stay Now
            </button>

            <button
              onClick={handleOpenDining}
              className="w-full sm:w-auto bg-graphite hover:bg-charcoal text-primary-text hover:text-gold border border-border-custom hover:border-gold/30 font-sans font-semibold text-xs px-8 py-4 rounded-xl transition-all hover:scale-103 active:scale-[0.98] cursor-pointer"
            >
              Contact Concierge Desk
            </button>
          </div>
        </div>
      </section>

      {/* Footer block */}
      <Footer
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenDining={handleOpenDining}
      />

      {/* Modals & Drawers Container */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedRoom={selectedRoom}
        rooms={rooms}
      />

      <ReservationModal
        isOpen={diningModalOpen}
        onClose={() => setDiningModalOpen(false)}
        initialSection="dining"
      />

      <MyReservationsDrawer
        isOpen={reservationsDrawerOpen}
        onClose={() => setReservationsDrawerOpen(false)}
      />

    </div>
  );
}
