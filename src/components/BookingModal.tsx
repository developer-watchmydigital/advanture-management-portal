'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { X, Calendar, Users, MapPin, Phone, User, FileText, CheckCircle2, MessageCircle, Sparkles, LogIn } from 'lucide-react';
import confetti from 'canvas-confetti';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingModal() {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    activeBookingTour,
    setActiveBookingTour,
    tours,
    casinoVenues,
    addBooking,
    confirmBookingWithDetails
  } = useApp();

  const { user, openLoginModal, setPendingBookingAction } = useAuth();

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
  const [paymentModeChoice, setPaymentModeChoice] = useState<'advance_30' | 'prepaid' | 'cod'>('advance_30');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<{ mode: string; status: string; id?: string; advancePaid?: number; balanceDue?: number }>({
    mode: 'advance_30',
    status: 'pending'
  });

  // Load Razorpay script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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

  // Auto-fill name and phone from logged-in user profile
  useEffect(() => {
    if (user && isBookingModalOpen) {
      if (!customerName && user.displayName) setCustomerName(user.displayName);
      if (!customerPhone && user.phone) setCustomerPhone(user.phone);
    }
  }, [user, isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const currentTour =
    allAvailableTours.find((t) => t.id === selectedTourId) ||
    activeBookingTour ||
    allAvailableTours[0];

  const totalAmount = (currentTour?.price || 0) * guestCount;
  const advanceAmount30 = Math.round(totalAmount * 0.30);
  const balanceDue30 = totalAmount - advanceAmount30;

  const handleOnlineRazorpayPayment = async (booking: any, isPartialAdvance: boolean) => {
    setIsProcessingPayment(true);
    const chargeAmount = isPartialAdvance ? advanceAmount30 : totalAmount;

    try {
      // Step 1: Create Order via Server API for exact charge amount
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: chargeAmount,
          bookingId: booking.id,
          tourTitle: `${isPartialAdvance ? '30% Advance - ' : ''}${currentTour?.title || 'Goa Adventure'}`
        })
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // Step 2: Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TkKOz1sxpHIH97',
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Watch My Trip Adventure',
        description: isPartialAdvance
          ? `30% Advance Token (₹${advanceAmount30.toLocaleString('en-IN')}) for ${currentTour?.title}`
          : `100% Full Payment for ${currentTour?.title}`,
        image: '/logo.png',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Step 3: Verify Payment Signature via Server API
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id
            })
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            const modeKey = isPartialAdvance ? 'advance_30' : 'prepaid';
            const paid = isPartialAdvance ? advanceAmount30 : totalAmount;
            const due = isPartialAdvance ? balanceDue30 : 0;

            confirmBookingWithDetails(booking.id, {
              amount: totalAmount,
              paymentMode: modeKey,
              status: 'booked',
              advancePaid: paid,
              balanceDue: due,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            });

            setPaymentDetails({
              mode: isPartialAdvance ? '30% Advance Paid Online (Razorpay)' : '100% Full Prepaid (Razorpay)',
              status: isPartialAdvance
                ? `Advance ₹${paid.toLocaleString('en-IN')} Collected (Balance ₹${due.toLocaleString('en-IN')} Due on Pickup)`
                : '100% Fully Paid ✓',
              id: response.razorpay_payment_id,
              advancePaid: paid,
              balanceDue: due
            });

            setIsProcessingPayment(false);
            setCreatedBookingId(booking.id);
            setIsSuccess(true);

            try {
              confetti({
                particleCount: 140,
                spread: 85,
                origin: { y: 0.6 }
              });
            } catch (err) {
              console.error(err);
            }
          } else {
            alert('Payment verification failed: ' + (verifyData.error || 'Invalid Signature'));
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: customerName,
          email: user?.email || '',
          contact: customerPhone
        },
        theme: {
          color: '#f59e0b'
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Razorpay Gateway Error. Falling back to COD.');
      setIsProcessingPayment(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Gate: require login before booking
    if (!user) {
      setPendingBookingAction(() => () => {
        setIsBookingModalOpen(true);
      });
      openLoginModal();
      return;
    }

    if (!customerName || !customerPhone || !date || !pickupLocation) {
      alert('Please fill in all required fields (Name, Phone, Date, Pickup Location).');
      return;
    }

    const is30Adv = paymentModeChoice === 'advance_30';
    const isPrep = paymentModeChoice === 'prepaid';
    const paidVal = is30Adv ? advanceAmount30 : isPrep ? totalAmount : 0;
    const dueVal = is30Adv ? balanceDue30 : isPrep ? 0 : totalAmount;

    const booking = addBooking({
      userId: user.id,
      tourId: currentTour?.id || 'general',
      tourTitle: currentTour?.title || 'Goa Tour',
      date,
      guestCount,
      customerName,
      customerPhone,
      pickupLocation,
      specialRequirements,
      amount: totalAmount,
      advancePaid: paidVal,
      balanceDue: dueVal,
      paymentMode: paymentModeChoice,
      paymentStatus: isPrep ? 'collected' : is30Adv ? 'partial_paid' : 'pending'
    });

    setCreatedBookingId(booking.id);

    if (paymentModeChoice === 'advance_30') {
      handleOnlineRazorpayPayment(booking, true);
    } else if (paymentModeChoice === 'prepaid') {
      handleOnlineRazorpayPayment(booking, false);
    } else {
      confirmBookingWithDetails(booking.id, {
        amount: totalAmount,
        paymentMode: 'cod',
        status: 'booked',
        advancePaid: 0,
        balanceDue: totalAmount
      });

      setPaymentDetails({
        mode: '100% Cash on Pickup (COD)',
        status: `₹${totalAmount.toLocaleString('en-IN')} Pending Pickup Collection`,
        advancePaid: 0,
        balanceDue: totalAmount
      });

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
    }
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setIsSuccess(false);
    setActiveBookingTour(null);
  };

  const getWhatsAppUrl = () => {
    const text = `*NEW BOOKING CONFIRMED - ${createdBookingId || 'WATCH MY TRIP ADVENTURE'}*\n` +
      `--------------------------------\n` +
      `*Package:* ${currentTour?.title}\n` +
      `*Date of Travel:* ${date}\n` +
      `*Guests:* ${guestCount} Person(s)\n` +
      `*Total Amount:* ₹${totalAmount}\n` +
      `*Payment Mode:* ${paymentDetails.mode}\n` +
      `*Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Pickup Location:* ${pickupLocation}\n` +
      (specialRequirements ? `*Special Request:* ${specialRequirements}\n` : '') +
      `--------------------------------\n` +
      `Please confirm my pickup driver details.`;
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
              {isSuccess
                ? 'Booking Request Submitted!'
                : activeBookingTour
                ? activeBookingTour.title
                : 'Book Your Goa Adventure — Choose Any Package'}
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
                <label className="block text-zinc-300 font-bold mb-1 flex items-center justify-between">
                  <span>{activeBookingTour ? 'Selected Package' : 'Choose Package / Tour'} *</span>
                  {!activeBookingTour && (
                    <span className="text-[10px] text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      CHOOSE FROM ALL 12+ PACKAGES
                    </span>
                  )}
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full bg-zinc-950 border border-amber-500/30 rounded-xl px-3 py-2.5 text-white font-semibold focus:border-amber-500 focus:outline-none"
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

              {/* PAYMENT MODE SELECTION */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <label className="block text-zinc-300 font-bold text-xs flex items-center justify-between">
                  <span>Choose Payment Method *</span>
                  <span className="text-[10px] text-amber-400 font-extrabold">
                    {paymentModeChoice === 'advance_30' ? `30% Token: ₹${advanceAmount30.toLocaleString('en-IN')}` : `Total: ₹${totalAmount.toLocaleString('en-IN')}`}
                  </span>
                </label>

                <div className="grid grid-cols-1 gap-2">
                  {/* OPTION 1: 30% ADVANCE TOKEN (RECOMMENDED) */}
                  <button
                    type="button"
                    onClick={() => setPaymentModeChoice('advance_30')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                      paymentModeChoice === 'advance_30'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-xs text-white">💳 Pay 30% Advance Token Online</span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-500 text-zinc-950 uppercase">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Pay <strong className="text-amber-400">₹{advanceAmount30.toLocaleString('en-IN')}</strong> now via Razorpay • Pay <strong className="text-zinc-200">₹{balanceDue30.toLocaleString('en-IN')}</strong> cash on pickup
                      </p>
                    </div>
                    <div className="text-right pl-2">
                      <span className="text-sm font-black text-amber-400">₹{advanceAmount30.toLocaleString('en-IN')}</span>
                      <span className="text-[9px] text-zinc-500 block font-mono">NOW</span>
                    </div>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {/* OPTION 2: FULL PREPAID */}
                    <button
                      type="button"
                      onClick={() => setPaymentModeChoice('prepaid')}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                        paymentModeChoice === 'prepaid'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-white">💳 100% Full Payment</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          PREPAID
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1">
                        Pay ₹{totalAmount.toLocaleString('en-IN')} full amount now
                      </span>
                    </button>

                    {/* OPTION 3: COD CASH ON PICKUP */}
                    <button
                      type="button"
                      onClick={() => setPaymentModeChoice('cod')}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                        paymentModeChoice === 'cod'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] text-white">💵 Cash on Pickup</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          COD
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1">
                        Pay ₹{totalAmount.toLocaleString('en-IN')} cash at pickup
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation & Submit */}
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                    {paymentModeChoice === 'advance_30' ? 'Payable Now (30%)' : 'Total Booking Amount'}
                  </span>
                  <span className="text-xl font-extrabold text-amber-400">
                    ₹{paymentModeChoice === 'advance_30' ? advanceAmount30.toLocaleString('en-IN') : totalAmount.toLocaleString('en-IN')}
                  </span>
                  {paymentModeChoice === 'advance_30' && (
                    <span className="text-[10px] text-zinc-400 block">
                      Balance Due on Pickup: ₹{balanceDue30.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition transform hover:scale-105 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessingPayment
                    ? 'CONNECTING RAZORPAY...'
                    : paymentModeChoice === 'advance_30'
                    ? `💳 PAY ₹${advanceAmount30.toLocaleString('en-IN')} (30% ADVANCE)`
                    : paymentModeChoice === 'prepaid'
                    ? `💳 PAY ₹${totalAmount.toLocaleString('en-IN')} FULL AMOUNT`
                    : '✓ CONFIRM COD BOOKING'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
