'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Calendar, Users, MapPin, Phone, User, FileText, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal() {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    activeBookingTour,
    setActiveBookingTour,
    tours,
    casinoVenues,
    addBooking
  } = useApp();

  // Combine regular tours and casino VIP packages so any package can be selected
  const allAvailableTours = useMemo(() => {
    const casinoTours = (casinoVenues || []).flatMap((venue) =>
      venue.packages.map((pkg) => ({
        id: `casino-${pkg.id}`,
        slug: `casino-${pkg.id}`,
        title: `🎰 ${venue.name} — ${pkg.name}`,
        tagline: pkg.name,
        price: pkg.price,
        originalPrice: pkg.originalPrice || pkg.price + 500,
        discount: 'VIP ACCESS',
        duration: 'Evening Casino VIP Pass',
        rating: 4.9,
        reviewCount: 150,
        heroMedia: pkg.image || venue.image,
        thumbnails: [pkg.image || venue.image],
        description: `${venue.name} ${pkg.name} VIP Gaming & Dining Pass.`,
        placesCovered: [venue.name, venue.location],
        tourRoute: `${venue.location} -> Feeder Boat -> Vessel`,
        timings: '06:00 PM onwards',
        inclusions: ['Feeder boat transfer', 'Buffet Dinner', 'Unlimited Drinks', 'Live Stage Shows'],
        exclusions: [],
        itinerary: []
      }))
    );

    const list = [...tours, ...casinoTours];

    if (activeBookingTour && !list.some((t) => t.id === activeBookingTour.id)) {
      return [activeBookingTour, ...list];
    }
    return list;
  }, [tours, casinoVenues, activeBookingTour]);

  const [selectedTourId, setSelectedTourId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  useEffect(() => {
    if (activeBookingTour) {
      setSelectedTourId(activeBookingTour.id);
    } else if (allAvailableTours.length > 0) {
      setSelectedTourId((prev) => (prev && allAvailableTours.some((t) => t.id === prev) ? prev : allAvailableTours[0].id));
    }

    if (!date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [activeBookingTour, isBookingModalOpen, allAvailableTours]);

  if (!isBookingModalOpen) return null;

  const currentTour =
    allAvailableTours.find((t) => t.id === selectedTourId) ||
    activeBookingTour ||
    allAvailableTours[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !date || !pickupLocation) {
      alert('Please fill in all required fields (Name, Phone, Date, Pickup Location).');
      return;
    }

    const booking = addBooking({
      tourId: currentTour?.id || 'general',
      tourTitle: currentTour?.title || 'Goa Tour',
      date,
      guestCount,
      customerName,
      customerPhone,
      pickupLocation,
      specialRequirements
    });

    setCreatedBookingId(booking.id);
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setIsSuccess(false);
    setActiveBookingTour(null);
  };

  const getWhatsAppUrl = () => {
    const text = `*NEW BOOKING REQUEST - ${createdBookingId || 'WATCH MY TRIP ADVENTURE'}*\n` +
      `--------------------------------\n` +
      `*Package:* ${currentTour?.title}\n` +
      `*Date of Travel:* ${date}\n` +
      `*Guests:* ${guestCount} Person(s)\n` +
      `*Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Pickup Location:* ${pickupLocation}\n` +
      `*Special Notes:* ${specialRequirements || 'None'}\n` +
      `*Total Estimate:* ₹${(currentTour?.price || 0) * guestCount}\n` +
      `--------------------------------\n` +
      `Please confirm my slot and send driver pickup details!`;

    return `https://wa.me/919588667027?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-amber-950/60 to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden pr-2">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-white font-serif line-clamp-1">
              {isSuccess ? 'Booking Request Submitted!' : (currentTour?.title || 'Book Package')}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form / Success Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <h4 className="text-2xl font-black text-white">Booking Ref: {createdBookingId}</h4>
              <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-amber-400 font-bold">{customerName}</span>! Your slot for{' '}
                <span className="text-white font-semibold">{currentTour?.title}</span> on {date} has been recorded in our system.
              </p>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-left space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Travelers:</span>
                  <span className="text-white font-bold">{guestCount} Guest(s)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Pickup Location:</span>
                  <span className="text-white font-bold">{pickupLocation}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold text-sm pt-2 border-t border-zinc-800">
                  <span>Total Amount:</span>
                  <span>₹{(currentTour?.price || 0) * guestCount}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>CONFIRM ON WHATSAPP NOW</span>
                </a>

                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Tour Selection */}
              <div>
                <label className="block text-zinc-300 font-bold mb-1">
                  Selected Package *
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-medium focus:border-amber-500 focus:outline-none"
                >
                  {allAvailableTours.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — ₹{t.price} / person
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Date of Travel *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-amber-500" />
                    <span>No. of Travelers *</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 95886 67027"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hotel Pickup Location / Resort Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Calangute Residency / Baga Hotel"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Special Requirements / Requests (Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Dietary requests, non-swimmer guidance, pickup time notes..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600 resize-none"
                />
              </div>

              {/* Total Calculation & Submit */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Estimated Total</span>
                  <span className="text-xl font-extrabold text-amber-400">
                    ₹{(currentTour?.price || 0) * guestCount}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform hover:scale-105"
                >
                  CONFIRM & BOOK SLOT
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
