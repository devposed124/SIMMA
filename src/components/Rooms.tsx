import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Eye, Bed, Compass, Maximize, UserCheck, X, CheckCircle2 } from 'lucide-react';
import { Room } from '../types';

interface RoomsProps {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
}

export default function Rooms({ rooms, onBookRoom }: RoomsProps) {
  const [activeDetailRoom, setActiveDetailRoom] = useState<Room | null>(null);

  return (
    <section id="rooms" className="py-24 bg-graphite border-b border-border-custom relative overflow-hidden">
      {/* Decorative vertical background grids */}
      <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-border-custom/30 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-10 w-[1px] bg-border-custom/30 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-gold uppercase tracking-[0.3em] font-bold block">
            The Sanctuary Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-text leading-tight tracking-tight">
            Curated Suites Designed for Quiet Solitude
          </h2>
          <p className="text-sm text-secondary-text leading-relaxed font-light">
            Indulge in our collection of bespoke mountain sanctuaries, hand-finished with organic cedarwood and high-elevation stone fireplaces.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group bg-charcoal border border-border-custom rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 interactive-card"
            >
              {/* Image with subtle overlay tag */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Price Badge */}
                <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md border border-gold/30 px-3.5 py-1.5 rounded-full text-gold font-mono text-xs font-semibold">
                  ${room.price}/night
                </div>

                {/* Left Floating View tag */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] text-primary-text font-mono uppercase tracking-wider">
                  <Compass size={11} className="text-gold" />
                  <span>{room.view}</span>
                </div>
              </div>

              {/* Card details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-primary-text font-medium group-hover:text-gold transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-secondary-text leading-relaxed font-light line-clamp-3">
                    {room.description}
                  </p>
                </div>

                {/* Short specs metrics bar */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border-custom/50 text-[10px] text-secondary-text font-mono uppercase">
                  <div className="flex flex-col items-center justify-center text-center border-r border-border-custom/40">
                    <Maximize size={12} className="text-gold mb-1" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center border-r border-border-custom/40">
                    <Bed size={12} className="text-gold mb-1" />
                    <span>{room.bed}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <UserCheck size={12} className="text-gold mb-1" />
                    <span>{room.occupancy}</span>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveDetailRoom(room)}
                    className="flex-1 border border-border-custom hover:border-gold/40 text-secondary-text hover:text-gold font-sans font-semibold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="flex-1 bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-xs py-3 rounded-xl transition-all hover:scale-[1.02] shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Room Detail Lightbox Overlay Drawer */}
      <AnimatePresence>
        {activeDetailRoom && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDetailRoom(null)}
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-md"
            />

            {/* Content Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-3xl bg-graphite border border-border-custom rounded-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailRoom(null)}
                className="absolute top-4 right-4 text-secondary-text hover:text-gold transition-all z-20 bg-charcoal p-2 rounded-full border border-border-custom"
              >
                <X size={16} />
              </button>

              {/* Left Side: Room Image (5 cols) */}
              <div className="md:col-span-5 relative h-48 md:h-full">
                <img
                  src={activeDetailRoom.image}
                  alt={activeDetailRoom.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-graphite via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 bg-charcoal/80 border border-gold/30 px-3 py-1.5 rounded-full text-gold font-mono text-xs">
                  ${activeDetailRoom.price} / Night
                </div>
              </div>

              {/* Right Side: Details (7 cols) */}
              <div className="md:col-span-7 p-6 lg:p-8 overflow-y-auto space-y-6">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-gold uppercase block mb-1">
                    SUITE OVERVIEW
                  </span>
                  <h3 className="font-serif text-3xl text-primary-text leading-tight font-medium">
                    {activeDetailRoom.name}
                  </h3>
                </div>

                <div className="space-y-4 text-xs font-light text-secondary-text leading-relaxed">
                  <p>{activeDetailRoom.longDescription}</p>

                  {/* Room Specs list */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 border-t border-b border-border-custom/40 py-4 font-mono text-[10px] text-primary-text uppercase">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-secondary-text mr-1">VIEW:</span> {activeDetailRoom.view}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-secondary-text mr-1">SIZE:</span> {activeDetailRoom.size}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-secondary-text mr-1">BEDS:</span> {activeDetailRoom.bed}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="text-secondary-text mr-1">OCCUPANCY:</span> {activeDetailRoom.occupancy}
                    </div>
                  </div>

                  {/* Amenities checklist */}
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-gold mb-3">
                      Premium Suite Inclusions
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {activeDetailRoom.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 size={13} className="text-gold flex-shrink-0" />
                          <span className="text-primary-text font-sans font-light">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setActiveDetailRoom(null)}
                    className="border border-border-custom text-secondary-text hover:text-primary-text text-xs font-sans font-semibold px-5 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Return
                  </button>
                  <button
                    onClick={() => {
                      const room = activeDetailRoom;
                      setActiveDetailRoom(null);
                      onBookRoom(room);
                    }}
                    className="bg-gold hover:bg-gold-hover text-charcoal text-xs font-sans font-semibold px-6 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(201,162,74,0.2)] cursor-pointer"
                  >
                    Reserve Stay
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
