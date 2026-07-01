import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Heart, Award, Sparkles, X, Compass, ArrowRight } from 'lucide-react';

interface AboutProps {
  aboutImage: string;
}

export default function About({ aboutImage }: AboutProps) {
  const [showStoryModal, setShowStoryModal] = useState(false);

  const pillars = [
    {
      title: 'Luxury Rooms',
      desc: 'Bespoke suites made of sustainable cedarwood and premium local slate, overlooking deep valleys.',
      icon: <Award className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Local Gastronomy',
      desc: 'Fusion recipes infused with organic local tea and ingredients freshly picked from our organic kitchen gardens.',
      icon: <Sparkles className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Amber Fireplace Bar',
      desc: 'A cozy twilight lounge hosting local acoustic musicians and curated Himalayan craft elixirs.',
      icon: <Star className="w-5 h-5 text-gold" />,
    },
    {
      title: 'Unrivaled Mountain Views',
      desc: 'Wake up to the direct, clear skyline of Mount Kanchenjunga rising majestically above the clouds.',
      icon: <Compass className="w-5 h-5 text-gold" />,
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-charcoal border-b border-border-custom overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Split Layout Visual Column (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative group"
          >
            <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/5] rounded-2xl overflow-hidden border border-border-custom shadow-2xl">
              {/* Inner subtle glow */}
              <div className="absolute inset-0 border border-white/5 rounded-2xl z-10 pointer-events-none" />
              
              <img
                src={aboutImage}
                alt="Simma Hotel Garden Overlook"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating stats card */}
              <div className="absolute bottom-6 left-6 right-6 bg-graphite/90 backdrop-blur-md border border-border-custom p-4 rounded-xl flex items-center justify-between shadow-lg">
                <div className="text-center flex-1 border-r border-border-custom/50">
                  <span className="block font-serif text-2xl text-gold font-bold">1924</span>
                  <span className="block text-[9px] font-mono uppercase text-secondary-text tracking-widest">Est. Heritage</span>
                </div>
                <div className="text-center flex-1 border-r border-border-custom/50">
                  <span className="block font-serif text-2xl text-gold font-bold">7,200ft</span>
                  <span className="block text-[9px] font-mono uppercase text-secondary-text tracking-widest">Altitude</span>
                </div>
                <div className="text-center flex-1">
                  <span className="block font-serif text-2xl text-gold font-bold">5 ★</span>
                  <span className="block text-[9px] font-mono uppercase text-secondary-text tracking-widest">Luxury Rating</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Split Layout Description Column (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
                Heritage & Sanctuary
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary-text leading-tight tracking-tight">
                A Haven Where Clouds Rest & Luxury Resides
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed font-light">
                Perched on the premium crest of Darjeeling, <strong className="text-gold font-normal">SIMMA HOTEL</strong> merges deep mountain peace with five-star modern elegance. Initially a summer tea estate bungalow built in 1924, our sanctuary has been completely reimagined into an eco-conscious boutique retreat.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-2 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-graphite rounded-lg border border-border-custom group-hover:border-gold/30 transition-colors">
                      {pillar.icon}
                    </div>
                    <h4 className="font-serif text-lg text-primary-text font-medium group-hover:text-gold transition-colors">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-secondary-text leading-relaxed font-light pl-11">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action button */}
            <div className="pt-4">
              <button
                onClick={() => setShowStoryModal(true)}
                className="inline-flex items-center gap-2 group text-xs text-gold font-sans font-semibold uppercase tracking-widest border border-gold/40 hover:border-gold px-6 py-3.5 rounded-xl bg-transparent hover:bg-gold/5 transition-all cursor-pointer"
              >
                <span>Learn Our Story</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Story Heritage Lightbox Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStoryModal(false)}
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-graphite border border-border-custom rounded-2xl p-6 lg:p-8 overflow-y-auto max-h-[85vh] z-10 shadow-2xl"
            >
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 text-secondary-text hover:text-gold transition-colors p-1.5 rounded-full bg-charcoal"
              >
                <X size={16} />
              </button>

              <div className="space-y-6 font-light">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-gold tracking-widest uppercase">Est. 1924</span>
                  <h3 className="font-serif text-3xl text-primary-text">Our Himalayan Chronicle</h3>
                </div>

                <div className="aspect-video w-full rounded-xl overflow-hidden border border-border-custom">
                  <img
                    src={aboutImage}
                    alt="Simma gardens heritage view"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-xs text-secondary-text leading-relaxed">
                  The story of SIMMA HOTEL began over a century ago as a refuge for botanists and mountain pioneers exploring the high ridges of the Eastern Himalayas. Surrounded by the legendary Makaibari and Happy Valley tea fields, the original estate houses were celebrated for their pristine architecture and serene hospitality.
                </p>

                <p className="text-xs text-secondary-text leading-relaxed">
                  In 2024, our dedicated design collective embarked on a careful two-year restoration. Our blueprint committed to preservation: salvaging original mountain cedar timber, restoring slate fireplaces, and relying on local stonemasons to secure our retaining walls using heritage dry-stacking methods.
                </p>

                <p className="text-xs text-secondary-text leading-relaxed">
                  Today, we welcome global travelers to experience the perfect equilibrium of pristine nature and meticulous boutique craftsmanship. Whether enjoying high tea harvested from our garden terraces or basking in the amber warmth of our stone hearth lounge, your presence is woven into the living story of SIMMA.
                </p>

                <div className="pt-4 border-t border-border-custom/50 flex justify-between items-center text-[10px] text-gold font-mono">
                  <span>RESORT & SPA SANCTUARY</span>
                  <span>DARJEELING, INDIA</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
