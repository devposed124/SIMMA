import { motion } from 'motion/react';
import { Wifi, Car, Utensils, GlassWater, ConciergeBell, Mountain, Clock, Shirt, Users, Zap, Sparkles } from 'lucide-react';

export default function Amenities() {
  const list = [
    { name: 'Free Premium Wi-Fi', icon: <Wifi size={20} className="text-gold" />, desc: 'High-speed gigabit fiber throughout the resort grounds.' },
    { name: 'Secured Parking', icon: <Car size={20} className="text-gold" />, desc: 'Valet and self-parking for all guests with EV chargers.' },
    { name: 'The Summit Dining Room', icon: <Utensils size={20} className="text-gold" />, desc: 'Exquisite culinary thalis and international fusion menus.' },
    { name: 'Amber Fireplace Bar', icon: <GlassWater size={20} className="text-gold" />, desc: 'Signature craft cocktails, premium malts, and cozy stone hearth.' },
    { name: '24/7 Room Service', icon: <ConciergeBell size={20} className="text-gold" />, desc: 'Hearthside meals and morning tea served right to your bed.' },
    { name: 'Mount Kanchenjunga Views', icon: <Mountain size={20} className="text-gold" />, desc: 'Breathtaking panoramic views of the snowy peaks from private balconies.' },
    { name: '24×7 Mountain Reception', icon: <Clock size={20} className="text-gold" />, desc: 'Dedicated local curators to plan your tea garden treks.' },
    { name: 'Valet Laundry Service', icon: <Shirt size={20} className="text-gold" />, desc: 'Same-day botanical steam laundry and dry cleaning.' },
    { name: 'Family Suites', icon: <Users size={20} className="text-gold" />, desc: 'Expansive duplex layout villas hosting up to 4 adults.' },
    { name: 'Dual Grid Power Backup', icon: <Zap size={20} className="text-gold" />, desc: 'Uninterrupted heating and electrical supply during high mountain fog.' },
  ];

  return (
    <section id="amenities" className="py-24 bg-graphite border-b border-border-custom relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-border-custom/25 pointer-events-none hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-border-custom/25 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
            The Simma Standard
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-text leading-tight tracking-tight">
            Elevating Mountain Comfort
          </h2>
          <p className="text-sm text-secondary-text leading-relaxed font-light">
            Every service is meticulously curated to protect your quietude, ensuring seamless convenience in the high elevation of Darjeeling.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
              className="p-5 bg-charcoal border border-border-custom rounded-2xl flex flex-col justify-between group hover:border-gold/30 hover:shadow-[0_8px_25px_rgba(201,162,74,0.06)] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Icon block */}
                <div className="w-10 h-10 rounded-xl bg-graphite border border-border-custom flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all">
                  {item.icon}
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-base text-primary-text font-medium group-hover:text-gold transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-secondary-text leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Minimal decorative indicator on card bottom */}
              <div className="w-4 h-[1.5px] bg-border-custom/80 group-hover:bg-gold group-hover:w-full transition-all duration-300 mt-5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
