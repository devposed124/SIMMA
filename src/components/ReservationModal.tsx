import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Gift, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: 'dining' | 'bar';
}

export default function ReservationModal({ isOpen, onClose, initialSection = 'dining' }: ReservationModalProps) {
  const [section, setSection] = useState<'dining' | 'bar'>(initialSection);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !name || !email || !phone) {
      alert('Please fill out all required fields.');
      return;
    }

    const newReservation: Reservation = {
      id: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      date,
      time,
      guests,
      occasion,
      section,
      createdAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem('simma_reservations');
    const list = existing ? JSON.parse(existing) : [];
    list.push(newReservation);
    localStorage.setItem('simma_reservations', JSON.stringify(list));

    // Dispatch event to refresh any booking counters
    window.dispatchEvent(new Event('simma_reservations_updated'));

    setConfirmedReservation(newReservation);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setDate('');
    setTime('19:00');
    setGuests(2);
    setName('');
    setEmail('');
    setPhone('');
    setOccasion('');
    setConfirmedReservation(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-graphite border border-border-custom rounded-2xl shadow-2xl z-10 p-6 lg:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-secondary-text hover:text-gold transition-colors z-20 bg-charcoal/50 p-2 rounded-full border border-border-custom hover:border-gold/30"
          >
            <X size={18} />
          </button>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-1">
                  <Sparkles size={14} />
                  <span>Culinary Reservations</span>
                </div>
                <h3 className="font-serif text-3xl text-primary-text leading-tight">
                  Reserve a Table
                </h3>
                <p className="text-secondary-text text-xs mt-1">
                  Experience Darjeeling's local essence fused with international gastronomy.
                </p>
              </div>

              {/* Venue Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-charcoal rounded-xl border border-border-custom">
                <button
                  type="button"
                  onClick={() => setSection('dining')}
                  className={`py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                    section === 'dining'
                      ? 'bg-gold text-charcoal shadow-[0_2px_8px_rgba(201,162,74,0.15)] font-semibold'
                      : 'text-secondary-text hover:text-primary-text'
                  }`}
                >
                  The Summit Dining Room
                </button>
                <button
                  type="button"
                  onClick={() => setSection('bar')}
                  className={`py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                    section === 'bar'
                      ? 'bg-gold text-charcoal shadow-[0_2px_8px_rgba(201,162,74,0.15)] font-semibold'
                      : 'text-secondary-text hover:text-primary-text'
                  }`}
                >
                  The Fireplace Amber Lounge
                </button>
              </div>

              {/* Date & Time fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-charcoal border border-border-custom rounded-xl pl-9 pr-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-charcoal border border-border-custom rounded-xl pl-9 pr-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="17:00">05:00 PM (High Tea)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Late Night)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guest size & Occasion */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                    Guests
                  </label>
                  <div className="relative">
                    <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-charcoal border border-border-custom rounded-xl pl-9 pr-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests</option>
                      <option value={8}>8+ Guests (Requires Notice)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                    Special Occasion
                  </label>
                  <div className="relative">
                    <Gift size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-charcoal border border-border-custom rounded-xl pl-9 pr-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="">Casual Dining</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Business">Business Dinner</option>
                      <option value="Tea Ceremony">Himalayan Tea Tasting</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guest Credentials */}
              <div className="space-y-3.5 pt-2 border-t border-border-custom/50">
                <div>
                  <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sir/Madame"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Compliance warning */}
              <div className="p-3 bg-charcoal/50 border border-border-custom rounded-xl flex items-start gap-2.5">
                <AlertCircle size={14} className="text-gold/80 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-secondary-text leading-normal">
                  Table reservation is free of charge. We hold tables for 20 minutes past reservation time. Please inform us of any strict dietary constraints.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-xs py-3.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(201,162,74,0.25)] flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                <span>Confirm Dining Reservation</span>
              </button>
            </form>
          ) : (
            confirmedReservation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-14 h-14 bg-gold/10 border border-gold/40 rounded-full flex items-center justify-center text-gold mx-auto mb-4 animate-pulse">
                  <Check size={28} />
                </div>

                <h4 className="font-serif text-2xl text-primary-text mb-1.5">Table Confirmed</h4>
                <p className="text-secondary-text text-xs max-w-sm mx-auto mb-6">
                  Your curated culinary seating has been secured. A golden confirmation token is generated below.
                </p>

                {/* Reservation Voucher */}
                <div className="bg-charcoal border border-gold/30 rounded-xl p-4 text-left font-mono text-[11px] space-y-3 relative overflow-hidden shadow-lg mb-6">
                  <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-graphite border-r border-gold/30 -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-graphite border-l border-gold/30 -translate-y-1/2" />

                  <div className="flex justify-between border-b border-border-custom/40 pb-2">
                    <span className="text-gold text-[10px] font-semibold tracking-wider font-sans uppercase">
                      {section === 'dining' ? 'SUMMIT DINING ROOM' : 'AMBER FIREPLACE LOUNGE'}
                    </span>
                    <span className="text-gold font-bold">{confirmedReservation.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-secondary-text text-[9px] uppercase tracking-wider block">GUEST</span>
                      <span className="text-primary-text font-sans font-medium">{confirmedReservation.guestName}</span>
                    </div>
                    <div>
                      <span className="text-secondary-text text-[9px] uppercase tracking-wider block">OCCASION</span>
                      <span className="text-primary-text font-sans">
                        {confirmedReservation.occasion || 'Casual Dining'}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary-text text-[9px] uppercase tracking-wider block">DATE & TIME</span>
                      <span className="text-primary-text">
                        {confirmedReservation.date} @ {confirmedReservation.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-secondary-text text-[9px] uppercase tracking-wider block">SIZE</span>
                      <span className="text-primary-text">
                        {confirmedReservation.guests} Guest{confirmedReservation.guests > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-transparent border border-border-custom hover:border-gold/50 text-primary-text hover:text-gold text-[10px] font-mono px-5 py-2.5 rounded-xl transition-all"
                >
                  Return to Restaurant Menu
                </button>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
