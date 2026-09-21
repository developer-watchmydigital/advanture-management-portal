'use client';

import React, { useState, useEffect } from 'react';
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
    addBooking
  } = useApp();

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
    } else if (tours.length > 0) {
      setSelectedTourId(tours[0].id);
    }
    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, [activeBookingTour, tours]);

  if (!isBookingModalOpen) return null;

  const currentTour = tours.find((t) => t.id === selectedTourId) || tours[0];

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

    // Trigger celebration confetti
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

  // Generate WhatsApp Direct Booking URL
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
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-serif">
              {isSuccess ? 'Booking Request Submitted!' : 'Reserve Your Goa Adventure'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
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
                  Selected Tour Package *
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-medium focus:border-amber-500 focus:outline-none"
                >
                  {tours.map((t) => (
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
                    placeholder="+91 9876543210"
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
                  <span>Pickup Location (Hotel / Area in Goa) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hard Rock Hotel, Calangute"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-zinc-300 font-bold mb-1 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Special Requirements / Requests</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Non-swimmers, vegetarian lunch preference, child safety vest needed"
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                />
              </div>

              {/* Price Calculation */}
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-400 block">Total Estimated Price</span>
                  <span className="text-xl font-extrabold text-amber-400">
                    ₹{(currentTour?.price || 0) * guestCount}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  Pay at Pickup Option Available
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                BOOK NOW
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
