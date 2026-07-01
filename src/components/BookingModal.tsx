import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Coffee, Gift, ShieldAlert, Sparkles, Check, ChevronRight, PhoneCall, Clock } from 'lucide-react';
import { Room, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  rooms: Room[];
}

export default function BookingModal({ isOpen, onClose, selectedRoom, rooms }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teaExperience, setTeaExperience] = useState(false);
  const [spaUpgrade, setSpaUpgrade] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Custom premium form and submitting states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('Securing your private suite allocation...');
  const [dietary, setDietary] = useState('none');
  const [welcomeDrink, setWelcomeDrink] = useState('tea');
  const [specialRequest, setSpecialRequest] = useState('');

  // Government ID and Age Verification states
  const [age, setAge] = useState('');
  const [idType, setIdType] = useState('passport');
  const [idNumber, setIdNumber] = useState('');
  const [idFileName, setIdFileName] = useState('');
  const [idUploadProgress, setIdUploadProgress] = useState(0);
  const [idDragActive, setIdDragActive] = useState(false);
  const [idVerified, setIdVerified] = useState(false);

  // File drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIdDragActive(true);
    } else if (e.type === "dragleave") {
      setIdDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setIdFileName(file.name);
    setIdUploadProgress(0);
    setIdVerified(false);

    // Simulate scanning/upload progress for spectacular luxury guest feedback
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setIdUploadProgress(Math.min(prog, 100));
      if (prog >= 100) {
        clearInterval(interval);
        setIdVerified(true);
      }
    }, 120);
  };

  const triggerFileInput = () => {
    document.getElementById('id-file-input')?.click();
  };

  const clearUploadedFile = () => {
    setIdFileName('');
    setIdUploadProgress(0);
    setIdVerified(false);
    const fileInput = document.getElementById('id-file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  // Set initial room if selected
  useEffect(() => {
    if (selectedRoom) {
      setRoomId(selectedRoom.id);
    } else if (rooms.length > 0) {
      setRoomId(rooms[0].id);
    }
  }, [selectedRoom, rooms]);

  const activeRoom = rooms.find((r) => r.id === roomId) || selectedRoom || rooms[0];

  // Price calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  const roomTotal = activeRoom ? activeRoom.price * nights : 0;
  const addonsTotal = (teaExperience ? 45 : 0) + (spaUpgrade ? 90 : 0);
  const totalAmount = roomTotal + addonsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !name || !email || !phone || !age || !idNumber) {
      alert('Please fill out all required fields');
      return;
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18) {
      alert('The primary registering guest must be at least 18 years of age.');
      return;
    }

    if (!idFileName) {
      alert('Please drag & drop or select a valid Government ID for verification.');
      return;
    }

    if (!idVerified) {
      alert('Please wait a moment while we parse and scan your uploaded document...');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('Securing your private suite allocation...');

    // Progress simulation timeouts to display immersive luxury booking animation
    setTimeout(() => {
      setSubmitMessage('Registering guest credentials with Darjeeling Reserve...');
    }, 1100);

    setTimeout(() => {
      setSubmitMessage('Configuring bespoke culinary & greeting settings...');
    }, 2200);

    setTimeout(() => {
      setSubmitMessage('Bespoke ID Verification complete. Generating Stay Ticket...');
    }, 3300);

    setTimeout(() => {
      const newBooking: Booking = {
        id: 'SIMMA-' + Math.floor(100000 + Math.random() * 900000),
        roomId: activeRoom.id,
        roomName: activeRoom.name,
        checkIn,
        checkOut,
        guests,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        totalPrice: totalAmount,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Save to local storage
      const existing = localStorage.getItem('simma_bookings');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newBooking);
      localStorage.setItem('simma_bookings', JSON.stringify(list));

      // Dispatch event to refresh any booking counters
      window.dispatchEvent(new Event('simma_bookings_updated'));

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setStep(3);
    }, 4400);
  };

  const resetForm = () => {
    setStep(1);
    setCheckIn('');
    setCheckOut('');
    setGuests(2);
    setName('');
    setEmail('');
    setPhone('');
    setTeaExperience(false);
    setSpaUpgrade(false);
    setDietary('none');
    setWelcomeDrink('tea');
    setSpecialRequest('');
    setConfirmedBooking(null);
    setIsSubmitting(false);
    setAge('');
    setIdType('passport');
    setIdNumber('');
    setIdFileName('');
    setIdUploadProgress(0);
    setIdDragActive(false);
    setIdVerified(false);
  };

  const handleClose = () => {
    resetForm();
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
          className="relative w-full max-w-4xl bg-graphite border border-border-custom rounded-2xl shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 md:h-[80vh] max-h-[calc(100vh-2rem)] md:max-h-[750px] overflow-y-auto md:overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-secondary-text hover:text-gold transition-colors z-20 bg-charcoal/50 p-2 rounded-full border border-border-custom hover:border-gold/30"
          >
            <X size={18} />
          </button>

          {/* Left Column: Summary / Visuals (4 cols) */}
          <div className="md:col-span-5 bg-charcoal p-6 lg:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-custom md:h-full md:overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-4">
                <Sparkles size={14} />
                <span>Simma Sanctuary</span>
              </div>
              <h3 className="font-serif text-3xl lg:text-4xl text-primary-text leading-tight mb-6">
                Your Luxury Mountain Escape
              </h3>

              {activeRoom && (
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border-custom">
                    <img
                      src={activeRoom.image}
                      alt={activeRoom.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md border border-gold/30 px-3 py-1 rounded-full text-gold font-mono text-xs">
                      ${activeRoom.price}/night
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg text-primary-text font-medium">
                      {activeRoom.name}
                    </h4>
                    <p className="text-secondary-text text-xs mt-1 line-clamp-2">
                      {activeRoom.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-[10px] font-mono uppercase bg-graphite border border-border-custom px-2 py-0.5 rounded text-secondary-text">
                        {activeRoom.size}
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-graphite border border-border-custom px-2 py-0.5 rounded text-secondary-text">
                        {activeRoom.view}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Total computation panel (only show if not confirmed yet) */}
            {step < 3 && (
              <div className="mt-8 pt-6 border-t border-border-custom/50 space-y-3">
                <div className="flex justify-between text-xs text-secondary-text">
                  <span>Room rate ({nights} night{nights > 1 ? 's' : ''})</span>
                  <span className="font-mono text-primary-text">${roomTotal}</span>
                </div>
                {teaExperience && (
                  <div className="flex justify-between text-xs text-secondary-text">
                    <span>Himalayan Tea Session</span>
                    <span className="font-mono text-primary-text">+$45</span>
                  </div>
                )}
                {spaUpgrade && (
                  <div className="flex justify-between text-xs text-secondary-text">
                    <span>Forest Spa Session</span>
                    <span className="font-mono text-primary-text">+$90</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-3 border-t border-dashed border-border-custom/50">
                  <span className="text-sm font-serif text-primary-text">Total Stay</span>
                  <span className="text-2xl font-serif text-gold font-semibold">${totalAmount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Form Steps (7 cols) */}
          <div className="md:col-span-7 p-6 lg:p-8 md:h-full md:overflow-y-auto flex flex-col justify-between">
            {/* Step Indicators */}
            {!isSubmitting && step < 3 && (
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${step === 1 ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-charcoal text-secondary-text'}`}>
                  01 Dates & Extras
                </span>
                <ChevronRight size={12} className="text-secondary-text/50" />
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${step === 2 ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-charcoal text-secondary-text'}`}>
                  02 Guest Information
                </span>
              </div>
            )}

            {/* STEP 1: DATES & EXTRAS */}
            {step === 1 && (
              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="font-serif text-2xl text-primary-text mb-1">Select Dates & Amenities</h4>
                  <p className="text-secondary-text text-xs">Let us customize your perfect stay.</p>
                </div>

                <div className="space-y-4">
                  {/* Room Selection Dropdown if user wants to change room */}
                  <div>
                    <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                      Select Suite
                    </label>
                    <select
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-3 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors"
                    >
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} — ${r.price}/night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold" />
                        <input
                          type="date"
                          value={checkIn}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl pl-10 pr-3 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                        Check-out Date
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold" />
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl pl-10 pr-3 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-charcoal border border-border-custom rounded-xl pl-10 pr-3 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests (Suite Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Curated Experiences Addons */}
                  <div className="pt-2">
                    <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-3">
                      Bespoke Enhancements
                    </label>
                    <div className="space-y-3">
                      {/* Tea Ceremony */}
                      <div
                        onClick={() => setTeaExperience(!teaExperience)}
                        className={`flex items-start gap-4 p-3 rounded-xl border cursor-pointer transition-all ${teaExperience ? 'bg-gold/5 border-gold shadow-[0_0_15px_rgba(201,162,74,0.1)]' : 'bg-charcoal border-border-custom hover:border-gold/30'}`}
                      >
                        <div className="mt-0.5 bg-charcoal p-2 rounded-lg text-gold border border-border-custom">
                          <Coffee size={16} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-primary-text">Darjeeling Tea Masterclass</span>
                            <span className="text-xs font-mono text-gold font-semibold">+$45</span>
                          </div>
                          <p className="text-[11px] text-secondary-text mt-0.5">
                            A private, authentic tasting with a professional tea master in our panoramic tea pavilion.
                          </p>
                        </div>
                      </div>

                      {/* Spa treatment */}
                      <div
                        onClick={() => setSpaUpgrade(!spaUpgrade)}
                        className={`flex items-start gap-4 p-3 rounded-xl border cursor-pointer transition-all ${spaUpgrade ? 'bg-gold/5 border-gold shadow-[0_0_15px_rgba(201,162,74,0.1)]' : 'bg-charcoal border-border-custom hover:border-gold/30'}`}
                      >
                        <div className="mt-0.5 bg-charcoal p-2 rounded-lg text-gold border border-border-custom">
                          <Gift size={16} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-primary-text">Himalayan Cedar Stone Massage</span>
                            <span className="text-xs font-mono text-gold font-semibold">+$90</span>
                          </div>
                          <p className="text-[11px] text-secondary-text mt-0.5">
                            A 60-minute relaxing session utilizing warm volcanic stones and cedar-wood oils.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      if (!checkIn || !checkOut) {
                        alert('Please select check-in and check-out dates.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-[0_4px_20px_rgba(201,162,74,0.25)]"
                  >
                    <span>Proceed to Guest Details</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: GUEST DETAILS & SUBMISSION */}
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center py-12 space-y-6"
              >
                {/* Modern premium spinning glowing circle */}
                <div className="relative w-20 h-20 mb-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-full h-full rounded-full border-2 border-gold/10 border-t-gold border-r-gold/40 shadow-[0_0_20px_rgba(201,162,74,0.2)]"
                  />
                  <div className="absolute inset-2 rounded-full border border-border-custom bg-charcoal flex items-center justify-center">
                    <Sparkles size={20} className="text-gold animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                    <span>Securing Sanctuary Stay</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={submitMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary-text font-serif text-lg md:text-xl max-w-sm mx-auto h-12"
                    >
                      {submitMessage}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-[10px] text-secondary-text font-mono">Please keep this browser active</p>
                </div>
              </motion.div>
            )}

            {!isSubmitting && step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between animate-fadeIn">
                <div className="space-y-5">
                  <div>
                    <h4 className="font-serif text-2xl text-primary-text mb-1">Guest Credentials</h4>
                    <p className="text-secondary-text text-xs">For your elegant stay registration and ID verification.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Sir/Madame Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors"
                          required
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                          Age
                        </label>
                        <input
                          type="number"
                          min="18"
                          max="120"
                          placeholder="Age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="yourname@luxury.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors"
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
                          className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                          required
                        />
                      </div>
                    </div>

                    {/* Government-Issued ID Verification details */}
                    <div className="border-t border-border-custom/55 pt-4 space-y-4">
                      <div>
                        <h5 className="font-serif text-sm text-gold flex items-center gap-1.5">
                          <Sparkles size={13} />
                          Government-Issued ID Verification
                        </h5>
                        <p className="text-secondary-text text-[10px]">Secure check-in requirement under regional reserve bylaws.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                            Document ID Type
                          </label>
                          <select
                            value={idType}
                            onChange={(e) => setIdType(e.target.value)}
                            className="w-full bg-charcoal border border-border-custom rounded-xl px-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                          >
                            <option value="passport">Passport (International Guests)</option>
                            <option value="national">National ID / Aadhaar Card</option>
                            <option value="license">Driver's License</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                            Document ID Number
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Z1234567 / ID Number"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors font-mono"
                            required
                          />
                        </div>
                      </div>

                      {/* Drag and Drop Uploader */}
                      <div>
                        <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                          Upload Document Scan (Drag & Drop or Tap)
                        </label>
                        
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={triggerFileInput}
                          className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[110px] ${
                            idDragActive 
                              ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(201,162,74,0.1)]' 
                              : idFileName 
                                ? 'border-emerald-500/50 bg-emerald-500/5' 
                                : 'border-border-custom hover:border-gold/30 bg-charcoal/50'
                          }`}
                        >
                          <input
                            type="file"
                            id="id-file-input"
                            className="hidden"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                          />

                          {idFileName ? (
                            <div className="space-y-2 w-full">
                              <div className="flex items-center justify-center gap-2 text-emerald-400">
                                {idVerified ? (
                                  <Check size={16} className="bg-emerald-500/20 p-0.5 rounded-full" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                                )}
                                <span className="text-xs font-mono font-medium truncate max-w-[200px]">
                                  {idFileName}
                                </span>
                              </div>
                              
                              {/* Progress bar */}
                              <div className="w-full max-w-[220px] mx-auto bg-charcoal border border-border-custom rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-300 ${idVerified ? 'bg-emerald-500' : 'bg-gold'}`}
                                  style={{ width: `${idUploadProgress}%` }}
                                />
                              </div>

                              <div className="text-[9px] font-mono">
                                {idVerified ? (
                                  <span className="text-emerald-400 uppercase tracking-widest font-semibold">Verification Complete</span>
                                ) : (
                                  <span className="text-gold uppercase tracking-widest animate-pulse">Analyzing Document... {idUploadProgress}%</span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearUploadedFile();
                                }}
                                className="text-[10px] text-red-400 hover:text-red-300 underline font-mono mt-1 cursor-pointer"
                              >
                                Remove & Upload New
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-gold/80 mb-1 flex justify-center">
                                <Sparkles size={16} className="animate-pulse" />
                              </div>
                              <p className="text-xs text-primary-text font-medium">
                                Drag & Drop or <span className="text-gold underline">Click to Select</span>
                              </p>
                              <p className="text-[10px] text-secondary-text">
                                Supports PNG, JPG, or PDF (Max 10MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Custom Fields for Guest Customizations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border-custom/55 pt-3.5">
                      <div>
                        <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                          Culinary Preference
                        </label>
                        <select
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl px-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                        >
                          <option value="none">No Preference</option>
                          <option value="nepalese">Traditional Nepalese / Local</option>
                          <option value="continental">Organic Continental</option>
                          <option value="vegan">Vegan / Vegetarian</option>
                          <option value="gluten-free">Gluten-Free Selects</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                          Welcome Beverage
                        </label>
                        <select
                          value={welcomeDrink}
                          onChange={(e) => setWelcomeDrink(e.target.value)}
                          className="w-full bg-charcoal border border-border-custom rounded-xl px-3 py-2.5 text-xs text-primary-text focus:outline-none focus:border-gold transition-colors"
                        >
                          <option value="tea">Signature First-Flush Tea</option>
                          <option value="sparkling">Sparkling Apple Cider</option>
                          <option value="rhododendron">Rhododendron Cooler</option>
                          <option value="cider">Warm Spiced Cider</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-secondary-text uppercase tracking-wider mb-1.5">
                        Special Requests or Occasion (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Anniversary, dietary allergies, or none"
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        className="w-full bg-charcoal border border-border-custom rounded-xl px-4 py-2.5 text-sm text-primary-text focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Quick Guarantee message */}
                    <div className="p-3 bg-charcoal/50 rounded-xl border border-border-custom flex items-start gap-3">
                      <ShieldAlert size={16} className="text-gold/80 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-secondary-text leading-relaxed">
                        No immediate card payment is required. Your room will be secured instantly, and payments can be settled in person during your stay. Cancellation is free up to 48 hours prior to arrival.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-secondary-text hover:text-primary-text text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    Back to Dates
                  </button>

                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-hover text-charcoal font-sans font-semibold text-sm px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-[0_4px_25px_rgba(201,162,74,0.3)]"
                  >
                    <Check size={16} />
                    <span>Complete Sanctuary Booking</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: BOOKING CONFIRMATION TICKET */}
            {!isSubmitting && step === 3 && confirmedBooking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex flex-col items-center justify-center text-center py-4 overflow-y-auto"
              >
                {/* 2 Hours Confirmation Call banner */}
                <div className="w-full max-w-sm mb-5 p-4 bg-gold/5 border border-gold/30 rounded-2xl text-left space-y-2.5 shadow-[0_4px_20px_rgba(201,162,74,0.1)]">
                  <div className="flex items-center gap-2 text-gold">
                    <PhoneCall size={14} className="animate-bounce" />
                    <span className="text-[11px] font-mono font-semibold tracking-widest uppercase">PLEASE WAIT 2 HOURS</span>
                  </div>
                  <p className="text-[11px] text-primary-text/90 leading-relaxed font-sans">
                    To maintain the exquisite exclusivity of Simma Sanctuary, our personal reservation desk will call you at your provided phone number (<span className="text-gold font-mono font-semibold">{confirmedBooking.guestPhone}</span>) within the next <strong className="text-gold">2 hours</strong> to confirm your suite preparation, transport support, and coordinate welcome amenities.
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] text-secondary-text font-mono">
                    <Clock size={11} />
                    <span>Est. Call Back: Within 2 Hours</span>
                  </div>
                </div>

                <div className="space-y-1 mb-5">
                  <h4 className="font-serif text-2xl text-gold">Stay Requested</h4>
                  <p className="text-secondary-text text-xs max-w-xs mx-auto">
                    Your luxury escape details have been dispatched to our Mountain Desk.
                  </p>
                </div>

                {/* Digital Ticket */}
                <div className="w-full max-w-sm bg-charcoal border border-gold/20 rounded-2xl p-4 text-left font-mono relative overflow-hidden shadow-lg mb-5">
                  {/* Decorative side cutouts */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-graphite border-r border-gold/20 -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-graphite border-l border-gold/20 -translate-y-1/2" />

                  {/* Header */}
                  <div className="flex justify-between border-b border-border-custom/50 pb-2.5 mb-3.5">
                    <span className="text-gold text-xs font-semibold tracking-wider font-sans">SIMMA HOTEL</span>
                    <span className="text-gold text-xs tracking-widest">{confirmedBooking.id}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-[11px]">
                    <div>
                      <span className="text-secondary-text uppercase text-[8px] tracking-widest block mb-0.5">Guest</span>
                      <span className="text-primary-text font-sans font-medium text-sm">{confirmedBooking.guestName}</span>
                    </div>

                    <div>
                      <span className="text-secondary-text uppercase text-[8px] tracking-widest block mb-0.5">Sanctuary Suite</span>
                      <span className="text-primary-text font-sans font-medium">{confirmedBooking.roomName}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-secondary-text uppercase text-[8px] tracking-widest block mb-0.5">Check-In</span>
                        <span className="text-primary-text">{confirmedBooking.checkIn}</span>
                      </div>
                      <div>
                        <span className="text-secondary-text uppercase text-[8px] tracking-widest block mb-0.5">Check-Out</span>
                        <span className="text-primary-text">{confirmedBooking.checkOut}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-0.5">
                      <div>
                        <span className="text-secondary-text uppercase text-[8px] tracking-widest block mb-0.5">Guests</span>
                        <span className="text-primary-text font-sans">{confirmedBooking.guests} Person{confirmedBooking.guests > 1 ? 's' : ''}</span>
                      </div>
                      <div>
                        <span className="text-secondary-text uppercase text-[8px] tracking-widest block mb-0.5">Total Settled</span>
                        <span className="text-gold text-sm font-semibold">${confirmedBooking.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer message */}
                  <div className="border-t border-dashed border-border-custom/50 pt-3 mt-3.5 text-center">
                    <span className="text-[9px] text-gold/80 uppercase tracking-widest font-sans flex items-center justify-center gap-1">
                      <Sparkles size={11} />
                      Golden Ticket Voucher
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="bg-transparent border border-border-custom hover:border-gold/50 text-primary-text hover:text-gold text-xs font-mono px-6 py-2.5 rounded-xl transition-all"
                >
                  Return to Sanctuary Explore
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
