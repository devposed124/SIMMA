import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, Trash2, ShieldAlert } from 'lucide-react';
import { Booking, Reservation } from '../types';

interface MyReservationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyReservationsDrawer({ isOpen, onClose }: MyReservationsDrawerProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const loadData = () => {
    const savedBookings = localStorage.getItem('simma_bookings');
    const savedRes = localStorage.getItem('simma_reservations');
    
    setBookings(savedBookings ? JSON.parse(savedBookings) : []);
    setReservations(savedRes ? JSON.parse(savedRes) : []);
  };

  useEffect(() => {
    loadData();

    // Listen to custom updates
    window.addEventListener('simma_bookings_updated', loadData);
    window.addEventListener('simma_reservations_updated', loadData);

    return () => {
      window.removeEventListener('simma_bookings_updated', loadData);
      window.removeEventListener('simma_reservations_updated', loadData);
    };
  }, []);

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this luxurious booking?')) {
      const filtered = bookings.filter(b => b.id !== id);
      localStorage.setItem('simma_bookings', JSON.stringify(filtered));
      setBookings(filtered);
      window.dispatchEvent(new Event('simma_bookings_updated'));
    }
  };

  const handleCancelReservation = (id: string) => {
    if (confirm('Are you sure you want to cancel this dining reservation?')) {
      const filtered = reservations.filter(r => r.id !== id);
      localStorage.setItem('simma_reservations', JSON.stringify(filtered));
      setReservations(filtered);
      window.dispatchEvent(new Event('simma_reservations_updated'));
    }
  };

  if (!isOpen) return null;

  const totalCount = bookings.length + reservations.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        />

        {/* Panel Wrapper */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-graphite border-l border-border-custom shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-custom flex justify-between items-center bg-charcoal">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-gold" />
                <h3 className="font-serif text-xl text-primary-text font-medium">My Luxury Concierge</h3>
              </div>
              <button
                onClick={onClose}
                className="text-secondary-text hover:text-gold transition-colors p-1.5 rounded-lg border border-border-custom hover:border-gold/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              {totalCount === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-border-custom flex items-center justify-center text-secondary-text/60">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-primary-text font-serif">No Active Bookings</h4>
                    <p className="text-xs text-secondary-text max-w-xs mx-auto mt-1">
                      Your high-end stays and dining agendas will appear here once reserved.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Luxury Stay Bookings */}
                  {bookings.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest border-b border-border-custom/50 pb-1.5">
                        Active Stay Vouchers ({bookings.length})
                      </h4>
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="bg-charcoal border border-border-custom rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-gold/30 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-mono text-gold font-semibold uppercase">{booking.id}</span>
                                <h5 className="font-serif text-sm text-primary-text font-medium mt-0.5">
                                  {booking.roomName}
                                </h5>
                              </div>
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-secondary-text/60 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                                title="Cancel Booking"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono border-t border-border-custom/30 pt-3">
                              <div>
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">CHECK-IN</span>
                                <span className="text-primary-text">{booking.checkIn}</span>
                              </div>
                              <div>
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">CHECK-OUT</span>
                                <span className="text-primary-text">{booking.checkOut}</span>
                              </div>
                              <div>
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">GUESTS</span>
                                <span className="text-primary-text">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                              </div>
                              <div>
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">AMOUNT</span>
                                <span className="text-gold font-semibold">${booking.totalPrice}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Culinary Reservations */}
                  {reservations.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono text-gold uppercase tracking-widest border-b border-border-custom/50 pb-1.5">
                        Table & Lounge Agendas ({reservations.length})
                      </h4>
                      <div className="space-y-4">
                        {reservations.map((res) => (
                          <div
                            key={res.id}
                            className="bg-charcoal border border-border-custom rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-gold/30 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-mono text-gold font-semibold uppercase">{res.id}</span>
                                <h5 className="font-serif text-sm text-primary-text font-medium mt-0.5">
                                  {res.section === 'dining' ? 'The Summit Dining Room' : 'The Fireplace Lounge'}
                                </h5>
                              </div>
                              <button
                                onClick={() => handleCancelReservation(res.id)}
                                className="text-secondary-text/60 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                                title="Cancel Reservation"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono border-t border-border-custom/30 pt-3">
                              <div>
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">DATE & TIME</span>
                                <span className="text-primary-text">{res.date} @ {res.time}</span>
                              </div>
                              <div>
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">GUESTS</span>
                                <span className="text-primary-text">{res.guests} Guest{res.guests > 1 ? 's' : ''}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-secondary-text block text-[9px] uppercase tracking-wider">OCCASION</span>
                                <span className="text-primary-text font-sans">{res.occasion || 'Casual Dining'}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer help */}
            <div className="p-6 bg-charcoal border-t border-border-custom flex items-start gap-3">
              <ShieldAlert size={16} className="text-gold mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-secondary-text leading-relaxed">
                Need to adjust details or submit dynamic requirements? Please call our 24/7 mountain desk directly at <span className="text-gold font-sans font-medium">+91 (354) 225-7462</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
