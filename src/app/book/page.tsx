'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Canvas3DBackground from '@/components/Canvas3DBackground';
import { useApp } from '@/context/AppContext';
import { Calendar, Users, MapPin, Phone, User, FileText, CheckCircle2, MessageCircle, ArrowLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookPage() {
  const { tours, casinoVenues, activeBookingTour, addBooking } = useApp();

  const allAvailableTours = React.useMemo(() => {
    const casinoTours = (casinoVenues || []).flatMap((venue) =>
      venue.packages.map((pkg) => ({
        id: `casino-${pkg.id}`,
        slug: `casino-${pkg.id}`,
        title: `🎰 ${venue.name} — ${pkg.name}`,
        tagline: pkg.name,
        price: pkg.price,
        originalPrice: pkg.originalPrice || pkg.price + 500,
        discount: pkg.discount || '',
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

  const [selectedTourId, setSelectedTourId] = useState<string>(() => {
    return activeBookingTour?.id || tours[0]?.id || 'dudhsagar-tour';
  });

  React.useEffect(() => {
    if (activeBookingTour) {
      setSelectedTourId(activeBookingTour.id);
    }
  }, [activeBookingTour]);

  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guestCount, setGuestCount] = useState<number>(2);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const currentTour =
    allAvailableTours.find((t) => t.id === selectedTourId) ||
    activeBookingTour ||
    allAvailableTours[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !date || !pickupLocation) {
      alert('Please fill in all required fields.');
      return;
    }

    const booking = addBooking({
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      date,
      guestCount,
      customerName,
      customerPhone,
      pickupLocation,
      specialRequirements
    });

    setBookingRef(booking.id);
    setIsSuccess(true);

    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
    }
  };

  const getWhatsAppUrl = () => {
    const text = `*NEW TOUR BOOKING - ${bookingRef}*\n` +
      `--------------------------------\n` +
      `*Package:* ${currentTour?.title}\n` +
      `*Date:* ${date}\n` +
      `*Travelers:* ${guestCount} Guests\n` +
      `*Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Pickup Location:* ${pickupLocation}\n` +
      `*Special Notes:* ${specialRequirements || 'None'}\n` +
      `*Total Price:* ₹${(currentTour?.price || 0) * guestCount}\n` +
      `--------------------------------\n` +
      `Please confirm my spot & send pickup driver info!`;

    return `https://wa.me/919588667027?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative selection:bg-amber-500 selection:text-zinc-950">
      <Canvas3DBackground />
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-8 max-w-4xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 mb-6 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSTANT CONFIRMATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Book Your Goa Adventure
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Fill out your travel details below. Receive instant WhatsApp confirmation and driver pickup details!
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <h2 className="text-3xl font-black text-white">Booking Ref: {bookingRef}</h2>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Congratulations <span className="text-amber-400 font-bold">{customerName}</span>! Your slot for{' '}
                <span className="text-white font-semibold">{currentTour?.title}</span> on {date} has been confirmed.
              </p>

              <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 text-left space-y-3 text-xs max-w-md mx-auto">
                <div className="flex justify-between text-zinc-400">
                  <span>Package:</span>
                  <span className="text-white font-bold">{currentTour?.title}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Date & Travelers:</span>
                  <span className="text-white font-bold">{date} ({guestCount} Guests)</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Pickup Location:</span>
                  <span className="text-white font-bold">{pickupLocation}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold text-base pt-3 border-t border-zinc-800">
                  <span>Total Amount:</span>
                  <span>₹{(currentTour?.price || 0) * guestCount}</span>
                </div>
              </div>

              <div className="pt-4 max-w-md mx-auto space-y-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>CONFIRM & GET DRIVER DETAILS ON WHATSAPP</span>
                </a>

                <Link
                  href="/"
                  className="block w-full py-3 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
              <div>
                <label className="block text-zinc-200 font-bold mb-1.5">
                  Select Tour Package *
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none"
                >
                  {allAvailableTours.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — ₹{t.price} / person
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-200 font-bold mb-1.5 flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Date of Travel *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-200 font-bold mb-1.5 flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Number of Travelers *</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-200 font-bold mb-1.5 flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-amber-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-200 font-bold mb-1.5 flex items-center space-x-1.5">
                    <Phone className="w-4 h-4 text-amber-500" />
                    <span>WhatsApp / Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-200 font-bold mb-1.5 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>Pickup Location (Hotel Name / Beach Area in Goa) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radisson Blu Resort, Cavelossim or Baga Beach Road"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                />
              </div>

              <div>
                <label className="block text-zinc-200 font-bold mb-1.5 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>Special Requirements / Requests</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need child size life jacket, non-swimmer guidance, vegetarian food option"
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:border-amber-500 focus:outline-none placeholder-zinc-600"
                />
              </div>

              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block">Total Package Amount</span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{(currentTour?.price || 0) * guestCount}
                  </span>
                </div>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                  Includes Free Pickup & Drop
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition cursor-pointer"
              >
                BOOK NOW
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
