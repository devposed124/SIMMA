import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Coffee, UtensilsCrossed, Wine, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';

interface RestaurantProps {
  onReserveTable: () => void;
  restaurantImage: string;
}

export default function Restaurant({ onReserveTable, restaurantImage }: RestaurantProps) {
  const [activeCategory, setActiveCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'fine-dining'>('fine-dining');

  const menuItems: MenuItem[] = [
    // Breakfast
    {
      id: 'bf-1',
      name: 'Singbulli Estate Honey Toast',
      description: 'Sourdough brushed with organic mountain wildflower honey, hand-churned yak butter, and wild strawberries.',
      price: 18,
      category: 'breakfast',
      isLocalSpecialty: true,
    },
    {
      id: 'bf-2',
      name: 'Simma Morning Basket',
      description: 'Freshly baked cardamom croissants, local apricot preserves, and a steaming pot of First Flush Happy Valley tea.',
      price: 22,
      category: 'breakfast',
      isLocalSpecialty: true,
    },
    // Lunch
    {
      id: 'lh-1',
      name: 'Himalayan Stream Trout',
      description: 'Pan-seared fresh trout crusted with wild mountain mustard, organic greens, and ginger-infused reduction.',
      price: 34,
      category: 'lunch',
    },
    {
      id: 'lh-2',
      name: 'The Organic Tea-Grower\'s Thali',
      description: 'A traditional organic platter of black lentils, local mustard greens, wild fiddlehead ferns, and hand-rolled flatbreads.',
      price: 28,
      category: 'lunch',
      isLocalSpecialty: true,
    },
    // Dinner
    {
      id: 'dn-1',
      name: 'Slow-Braised Mountain Lamb',
      description: 'Tender lamb shoulder slow-cooked for 12 hours with wild mountain coriander, local potatoes, and reduction jus.',
      price: 46,
      category: 'dinner',
    },
    {
      id: 'dn-2',
      name: 'Wild Forest Gnocchi',
      description: 'Handmade potato gnocchi with locally foraged pine mushrooms, mountain cedar-smoked cheese, and fresh thyme.',
      price: 38,
      category: 'dinner',
      isLocalSpecialty: true,
    },
    // Fine Dining
    {
      id: 'fd-1',
      name: 'The Kanchenjunga Degustation',
      description: 'A masterpiece 7-course culinary voyage showcasing rare high-altitude ingredients, curated by Chef Tenzing.',
      price: 120,
      category: 'fine-dining',
      isLocalSpecialty: true,
    },
    {
      id: 'fd-2',
      name: 'Smoked Cedar Black Cod',
      description: 'Line-caught cod glazed with premium black tea reduction, served over white truffle root purée and wild herbs.',
      price: 54,
      category: 'fine-dining',
    },
  ];

  const currentMenu = menuItems.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={14} /> },
    { id: 'lunch', label: 'Lunch', icon: <UtensilsCrossed size={14} /> },
    { id: 'dinner', label: 'Dinner', icon: <Wine size={14} /> },
    { id: 'fine-dining', label: 'Fine Degustation', icon: <Sparkles size={14} /> },
  ];

  return (
    <section id="restaurant" className="relative bg-charcoal border-b border-border-custom overflow-hidden">
      {/* Edge-to-edge cinematic banner with content overlay */}
      <div className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden">
        <img
          src={restaurantImage}
          alt="Simma Fine Dining Experience"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/30 to-transparent" />

        <div className="absolute bottom-12 md:bottom-20 left-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-2xl space-y-4"
            >
              <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
                The Summit Dining Room
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-primary-text leading-tight tracking-tight">
                Locally Inspired, Internationally Reimagined
              </h2>
              <p className="text-sm md:text-base text-secondary-text font-light max-w-xl leading-relaxed">
                Enjoy a curated gastronomic voyage blending traditional Himalayan secrets with avant-garde French techniques. Every dish tells a story of Darjeeling’s rich, volcanic soil.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Menu Browser */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Menu Information Column (4 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
                The Culinary Agenda
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-primary-text leading-tight">
                Honoring the Seasons of the Hills
              </h3>
              <p className="text-xs text-secondary-text leading-relaxed font-light">
                Our kitchen collaborates daily with organic growers along the Singalila ridge line, sourcing heirloom grains, wild-foraged mushrooms, and artisanal yak cheeses. Each menu is dynamically paired with high-elevation organic tea varietals.
              </p>
            </div>

            {/* Interactive Category Selector Sidebar */}
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left font-sans transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-gold border-gold text-charcoal shadow-[0_4px_15px_rgba(201,162,74,0.2)] font-semibold'
                      : 'bg-graphite/40 border-border-custom text-secondary-text hover:border-gold/30 hover:text-gold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeCategory === cat.id ? 'text-charcoal' : 'text-gold'}>
                      {cat.icon}
                    </span>
                    <span className="text-xs font-semibold tracking-wider uppercase">{cat.label}</span>
                  </div>
                  <ChevronRight size={14} className={activeCategory === cat.id ? 'translate-x-0.5' : 'text-secondary-text/50'} />
                </button>
              ))}
            </div>

            {/* Quick table reserve button */}
            <div className="pt-2">
              <button
                onClick={onReserveTable}
                className="w-full bg-transparent border border-gold text-gold hover:bg-gold hover:text-charcoal font-sans font-semibold text-xs py-4 rounded-xl tracking-widest uppercase transition-all shadow-[0_4px_15px_rgba(201,162,74,0.05)] cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar size={13} />
                <span>Reserve A Table</span>
              </button>
            </div>
          </div>

          {/* Right Menu Content List Column (7 cols) */}
          <div className="lg:col-span-7 bg-graphite/60 border border-border-custom rounded-2xl p-6 lg:p-8 shadow-xl min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Header title for category */}
                <div className="border-b border-border-custom/40 pb-4 flex justify-between items-center">
                  <h4 className="font-serif text-xl text-primary-text font-medium capitalize">
                    {activeCategory === 'fine-dining' ? 'Signature Degustation' : activeCategory} Menu
                  </h4>
                  <span className="text-[10px] font-mono text-gold tracking-widest uppercase">
                    12:00 PM — 10:30 PM
                  </span>
                </div>

                {/* Items loop */}
                <div className="space-y-6 divide-y divide-border-custom/30">
                  {currentMenu.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`pt-5 first:pt-0 flex flex-col sm:flex-row justify-between items-start gap-4 group`}
                    >
                      <div className="space-y-1.5 flex-grow">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h5 className="font-serif text-lg text-primary-text font-medium group-hover:text-gold transition-colors">
                            {item.name}
                          </h5>
                          {item.isLocalSpecialty && (
                            <span className="text-[8px] tracking-widest font-mono font-bold bg-gold/15 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full uppercase">
                              Estate Specialty
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-secondary-text font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Price Badge */}
                      <span className="font-serif text-xl text-gold font-medium font-semibold whitespace-nowrap">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Wine/Beverage notice */}
                <div className="border-t border-dashed border-border-custom/50 pt-5 text-center">
                  <p className="text-[10px] font-mono text-secondary-text tracking-wider leading-relaxed uppercase">
                    🍷 Custom wine pairings available upon request • Local organic herbal mocktails served fresh
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
