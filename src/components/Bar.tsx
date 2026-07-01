import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, GlassWater, Flame, Compass, HelpCircle, X } from 'lucide-react';

interface BarProps {
  onReserveTable: () => void;
  barImage: string;
}

interface Cocktail {
  id: string;
  name: string;
  tagline: string;
  ingredients: string[];
  lore: string;
  garnish: string;
  strength: 'Mellow' | 'Balanced' | 'Spirited';
}

export default function Bar({ onReserveTable, barImage }: BarProps) {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  const cocktails: Cocktail[] = [
    {
      id: 'cc-1',
      name: 'Darjeeling Dusk',
      tagline: 'A slow-sipping toast to our volcanic mountain ridges.',
      ingredients: ['Smoked Black Tea Infusion', 'Double-aged Rye Whiskey', 'Local Wildflower Honey', 'Orange Bitters'],
      lore: 'This slow-burning infusion captures the heavy twilight air of the Happy Valley terraces. The rye provides robust spice, balanced by the honeyed tannins of our signature tea.',
      garnish: 'Dehydrated blood orange wheel & single charred pine needle',
      strength: 'Spirited',
    },
    {
      id: 'cc-2',
      name: 'Kanchenjunga Peak',
      tagline: 'As cold, crisp, and rare as the high summit.',
      ingredients: ['Curated Juniper Gin', 'Hand-foraged Pine Needle Cordial', 'Himalayan Spring Tonic', 'Edible Gold Leaf flakes'],
      lore: 'Inspired by the first golden morning rays catching the highest snow fields of Mount Kanchenjunga. Pristine, dry, botanical, and elegantly carbonated.',
      garnish: 'Frozen organic juniper berries dusted with sugar',
      strength: 'Balanced',
    },
    {
      id: 'cc-3',
      name: 'Snow Leopard Toddy',
      tagline: 'Warm, spicy warmth for chilly mountain evenings.',
      ingredients: ['Premium Himalayan Dark Rum', 'Crushed Green Cardamom', 'Simma House Cinnamon Blend', 'Fresh Organic Apple Cider'],
      lore: 'Brewed over copper pans at the bar fireplace, this warm Toddy is named after the silent protectors of the high cedar forest. Intensely comforting and sweet.',
      garnish: 'Toasted cinnamon bark stirrer',
      strength: 'Balanced',
    },
    {
      id: 'cc-4',
      name: 'Amber Hearth',
      tagline: 'A smoked masterpiece celebrating our stone fireplaces.',
      ingredients: ['Toasted Cedar-wood Bourbon', 'Smoked Maple reduction', 'Alpine Angostura', 'Dry French Vermouth'],
      lore: 'We smoke individual glasses using local cedarwood boards in front of your eyes. A rich, heavy, and deeply satisfying tribute to premium autumn retreats.',
      garnish: 'Brandied organic cherry',
      strength: 'Spirited',
    },
  ];

  return (
    <section id="bar" className="relative py-24 bg-charcoal border-b border-border-custom overflow-hidden">
      {/* Dynamic warm amber radial background glows */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[600px] h-[600px] bg-amber/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Intimate visual and text descriptions (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-amber uppercase tracking-[0.3em] font-bold block">
                The Fireplace Amber Lounge
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary-text leading-tight tracking-tight">
                Dark Atmosphere & Curated Elixirs
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed font-light">
                As the thick fog rolls over the Darjeeling valleys, take refuge in our cozy candlelit lounge. Dominated by a massive granite hearth, the Bar is a luxurious study in dark leather, heavy brass accents, and glowing amber warmth.
              </p>
            </div>

            {/* List of characteristics */}
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-3.5 group">
                <div className="p-2 bg-graphite border border-border-custom text-amber rounded-lg group-hover:border-amber/40 transition-colors">
                  <Flame size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-primary-text font-medium group-hover:text-amber transition-colors">
                    Hearthside Cozy Acoustics
                  </h4>
                  <p className="text-secondary-text font-light mt-0.5">
                    Cozy seating nestled beside our vintage roaring stone fireplace with soft vinyl records.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <div className="p-2 bg-graphite border border-border-custom text-amber rounded-lg group-hover:border-amber/40 transition-colors">
                  <GlassWater size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-primary-text font-medium group-hover:text-amber transition-colors">
                    Himalayan Craft Botany
                  </h4>
                  <p className="text-secondary-text font-light mt-0.5">
                    Spirits infused on-site using wild mountain juniper, cardamom, pine needles, and high tea.
                  </p>
                </div>
              </div>
            </div>

            {/* Reserve seat CTA */}
            <div className="pt-2">
              <button
                onClick={onReserveTable}
                className="inline-flex items-center gap-2 group bg-amber hover:bg-gold-hover text-charcoal font-sans font-semibold text-xs px-6 py-4 rounded-xl shadow-[0_4px_20px_rgba(232,179,90,0.25)] transition-all cursor-pointer"
              >
                <span>Reserve A Hearth Seat</span>
                <Compass size={14} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Immersive Bar Visuals & Interactive Storybook cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Edge image banner */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border-custom shadow-2xl">
              <img
                src={barImage}
                alt="Simma Cozy Amber Bar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent pointer-events-none" />
              
              {/* Floating menu callout */}
              <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md border border-amber/40 px-3 py-1.5 rounded-full text-amber font-mono text-[10px] tracking-wider uppercase font-semibold">
                🔥 Hot Fireplace Lounge Open Daily
              </div>
            </div>

            {/* Cocktail stories list (Glowing on Hover!) */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber mb-4 block">
                Click Curated Himalayan Craft Cocktails
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cocktails.map((cocktail) => (
                  <div
                    key={cocktail.id}
                    onClick={() => setSelectedCocktail(cocktail)}
                    className="p-4 bg-graphite/40 border border-border-custom rounded-xl cursor-pointer hover:border-amber/50 hover:bg-amber/[0.02] hover:shadow-[0_0_15px_rgba(232,179,90,0.1)] transition-all duration-300 group relative"
                  >
                    {/* Glowing highlight indicator */}
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-amber group-hover:shadow-[0_0_8px_rgba(232,179,90,1)] transition-all" />

                    <h5 className="font-serif text-base text-primary-text font-medium group-hover:text-amber transition-colors">
                      {cocktail.name}
                    </h5>
                    <p className="text-[11px] text-secondary-text line-clamp-1 mt-1 font-light">
                      {cocktail.tagline}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[9px] font-mono uppercase bg-charcoal border border-border-custom px-2 py-0.5 rounded text-secondary-text">
                        {cocktail.strength}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Cocktail Story detail lightbox */}
      <AnimatePresence>
        {selectedCocktail && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCocktail(null)}
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-md"
            />

            {/* Card Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-md bg-graphite border border-amber/30 rounded-2xl p-6 lg:p-8 z-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedCocktail(null)}
                className="absolute top-4 right-4 text-secondary-text hover:text-amber transition-colors p-1.5 rounded-full bg-charcoal"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-amber text-[9px] font-mono tracking-widest uppercase">
                    <Sparkles size={11} />
                    <span>Signature Elixir</span>
                  </div>
                  <h3 className="font-serif text-3xl text-primary-text font-medium">
                    {selectedCocktail.name}
                  </h3>
                  <p className="text-xs text-amber font-sans font-light italic">
                    "{selectedCocktail.tagline}"
                  </p>
                </div>

                {/* Lore / Story description */}
                <div className="p-4 bg-charcoal border border-border-custom rounded-xl text-xs font-light text-secondary-text leading-relaxed">
                  <h4 className="font-mono text-[9px] uppercase tracking-wider text-amber mb-1.5">The Mountain Lore</h4>
                  {selectedCocktail.lore}
                </div>

                {/* Ingredients & Garnish */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[9px] font-mono uppercase tracking-widest text-amber mb-2">Botanical Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCocktail.ingredients.map((ing, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-charcoal border border-border-custom px-2.5 py-1 rounded text-primary-text">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border-custom/50 pt-4">
                    <h4 className="text-[9px] font-mono uppercase tracking-widest text-amber mb-1">Crowning Garnish</h4>
                    <p className="text-xs text-primary-text font-sans font-light">{selectedCocktail.garnish}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-border-custom/50 flex justify-between items-center text-[9px] font-mono text-secondary-text uppercase">
                  <span>STRENGTH: <strong className="text-amber">{selectedCocktail.strength}</strong></span>
                  <span>SERVED CHILLED AT THE HEARTH</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
