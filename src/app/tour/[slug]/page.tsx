'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import AddReviewModal from '@/components/AddReviewModal';
import Canvas3DBackground from '@/components/Canvas3DBackground';
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  Sparkles,
  Star,
  Compass,
  Calendar,
  ShieldCheck,
  Users
} from 'lucide-react';

export default function TourDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { tours, openBookingModal } = useApp();

  const tour = tours.find((t) => t.slug === slug || t.id === slug) || tours[0];

  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'route'>('itinerary');

  if (!tour) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p>Tour not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative selection:bg-amber-500 selection:text-zinc-950">
      <Canvas3DBackground />
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.heroMedia}
            alt={tour.title}
            className="w-full h-full object-cover object-center opacity-30 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#tours"
            className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 mb-6 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800 backdrop-blur-md transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tours</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Title & Specs */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-500 text-zinc-950 text-[11px] font-black uppercase px-3 py-1 rounded-md shadow-md">
                  {tour.discount || 'GOA SPECIAL'}
                </span>
                <span className="bg-zinc-900 border border-zinc-700 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-md flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tour.rating} ({tour.reviewCount} Verified Reviews)</span>
                </span>
                <span className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-[11px] font-semibold px-3 py-1 rounded-md flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{tour.duration}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
                {tour.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                {tour.tagline}
              </p>

              {/* Places covered tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {tour.placesCovered.map((place, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-zinc-900/90 text-zinc-300 px-3 py-1 rounded-lg border border-zinc-800 flex items-center space-x-1"
                  >
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{place}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action CTAs Box */}
            <div className="lg:col-span-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400 line-through block">
                    Original ₹{tour.originalPrice}
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-amber-400">₹{tour.price}</span>
                    <span className="text-xs text-zinc-400 font-semibold uppercase">/ Person</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Instant Voucher
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919876543210"
                  className="py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center justify-center space-x-1.5 border border-zinc-700 transition"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/919876543210?text=Hi,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => openBookingModal(tour)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition cursor-pointer"
              >
                BOOK THIS TOUR NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tour Gallery & Detailed Info */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Photo Gallery Grid (Requirement: Cover photo + South Goa photos/videos) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="md:col-span-2 h-72 sm:h-96 rounded-2xl overflow-hidden border border-zinc-800 relative group">
            <img
              src={tour.heroMedia}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-amber-400 border border-zinc-800">
              Main Cover Photo
            </div>
          </div>

          {tour.thumbnails.map((img, i) => (
            <div key={i} className="h-36 sm:h-44 md:h-96 rounded-2xl overflow-hidden border border-zinc-800 relative group">
              <img
                src={img}
                alt={`${tour.title} Gallery ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-zinc-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-zinc-300 border border-zinc-800">
                Gallery Shot #{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Layout split: Left details, Right Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Box */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white font-serif flex items-center space-x-2">
                <Compass className="w-6 h-6 text-amber-400" />
                <span>Tour Overview</span>
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {tour.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Timings</span>
                  <span className="text-xs text-white font-bold">{tour.timings}</span>
                </div>
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Tour Route</span>
                  <span className="text-xs text-white font-bold">{tour.tourRoute}</span>
                </div>
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Best For</span>
                  <span className="text-xs text-amber-400 font-bold">Families, Couples & Friends</span>
                </div>
              </div>
            </div>

            {/* Detailed Itinerary Step-by-Step with Photos (Pickup photo, Journey photo, Activity photo) */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white font-serif flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-amber-400" />
                <span>Day & Time Wise Tour Itinerary</span>
              </h2>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-amber-500/20">
                {tour.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-10 group">
                    {/* Circle Node */}
                    <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-zinc-950 border-2 border-amber-500 flex items-center justify-center text-[10px] font-black text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition">
                      {idx + 1}
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl hover:border-amber-500/30 transition space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        {item.time && (
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                            {item.time}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

                      {/* Photo associated with this itinerary step (Pickup photo, journey photo, etc.) */}
                      {item.photo && (
                        <div className="h-44 sm:h-56 rounded-xl overflow-hidden mt-3 border border-zinc-800">
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions Checklist */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white font-serif flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <span>Package Inclusions & Exclusions</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-zinc-950 border border-emerald-500/20 p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Included in Price</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-zinc-950 border border-red-500/20 p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-extrabold text-red-400 uppercase tracking-wider flex items-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span>Not Included</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Booking Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="text-center space-y-1 pb-4 border-b border-zinc-800">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                  SPECIAL ONLINE RATE
                </span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-black text-amber-400">₹{tour.price}</span>
                  <span className="text-xs text-zinc-400 line-through">₹{tour.originalPrice}</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-bold">Save {tour.discount} per booking</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400">Pickup & Drop:</span>
                  <span className="text-white font-bold">Included (AC Coach)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400">Entry Activity:</span>
                  <span className="text-white font-bold">All Permits Included</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400">Guidance:</span>
                  <span className="text-white font-bold">Certified Local Guide</span>
                </div>
              </div>

              <button
                onClick={() => openBookingModal(tour)}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition cursor-pointer"
              >
                BOOK THIS TOUR
              </button>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-[11px] text-zinc-400 text-center">
                <p>⚡ Instant WhatsApp Voucher Confirmation</p>
                <p>🛡️ Zero Booking Fees & Free Cancellation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal />
      <AddReviewModal />
    </main>
  );
}
