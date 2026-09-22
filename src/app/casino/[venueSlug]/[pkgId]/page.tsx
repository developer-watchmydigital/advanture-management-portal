'use client';

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Canvas3DBackground from '@/components/Canvas3DBackground';
import { useApp } from '@/context/AppContext';
import { Tour } from '@/types';
import {
  ArrowLeft,
  Ticket,
  CircleDollarSign,
  Utensils,
  Wine,
  Music,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    venueSlug: string;
    pkgId: string;
  }>;
}

export default function CasinoPackageDetailPage({ params }: PageProps) {
  const { venueSlug, pkgId } = use(params);
  const router = useRouter();
  const { casinoVenues, openBookingModal } = useApp();

  // Find matching venue and package
  const venue = casinoVenues.find(
    (v) => v.slug === venueSlug || v.id === venueSlug
  ) || casinoVenues[0];

  const pkg = venue?.packages.find((p) => p.id === pkgId) || venue?.packages[0];

  if (!venue || !pkg) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-amber-400 mb-4">Casino Package Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">
          The requested VIP casino package tariff details are unavailable or expired.
        </p>
        <Link
          href="/#casino-tariffs"
          className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm"
        >
          Return to Live Casino Tariffs
        </Link>
      </main>
    );
  }

  const handleBookNow = () => {
    const pseudoTour: Tour = {
      id: `casino-${venue.id}-${pkg.id}`,
      title: `${venue.name} - ${pkg.name}`,
      slug: `${venue.slug}-${pkg.id}`,
      tagline: `${venue.location} | ${pkg.liquorTypeLabel}`,
      price: pkg.price,
      originalPrice: pkg.originalPrice || pkg.price,
      discount: 'VIP ENTRY',
      duration: 'Full Evening Deck Access',
      rating: 4.9,
      reviewCount: 480,
      heroMedia: pkg.image || venue.image,
      thumbnails: [pkg.image || venue.image, venue.image, venue.image],
      mediaGallery: [pkg.image || venue.image],
      description: `VIP Entry to ${venue.name}. Includes ${pkg.liquorTypeLabel}${
        pkg.otpcWorth ? `, OTPC ₹${pkg.otpcWorth.toLocaleString('en-IN')}` : ''
      }, Unlimited Buffet Dinner & Live Entertainment.`,
      placesCovered: ['Panjim Mandovi River', 'Luxury Floating Vessel', 'Gaming Decks'],
      tourRoute: 'Panjim Jetty -> Luxury Feeder Boat -> Offshore Vessel',
      timings: '07:00 PM - 04:00 AM Deck Access',
      inclusions: [
        pkg.liquorTypeLabel,
        pkg.otpcWorth ? `₹${pkg.otpcWorth.toLocaleString('en-IN')} OTPC Chip` : 'Non-Alcoholic Mocktails',
        'Unlimited Multi-Cuisine Buffet Dinner',
        'Live Stage Performances & Deck Entry'
      ],
      exclusions: ['Personal extra gaming chips', 'Private cabana reservations'],
      itinerary: [
        {
          id: '1',
          time: '07:00 PM',
          title: 'Panjim Feeder Boat Boarding',
          description: 'Board feeder boat at Panjim jetty to transfer to offshore luxury vessel.',
          photo: venue.image
        },
        {
          id: '2',
          time: '08:30 PM',
          title: 'Gaming & Unlimited Buffet Dinner',
          description: 'Enjoy live gaming tables, multi-cuisine dinner buffet, and live dance performances.',
          photo: venue.image
        }
      ]
    };

    openBookingModal(pseudoTour);
  };

  // Fallback service photo highlights if none provided
  const servicePhotosList = pkg.serviceHighlights || [
    {
      title: pkg.otpcWorth > 0 ? `₹${pkg.otpcWorth.toLocaleString('en-IN')} OTPC Match Play Chips` : 'VIP Entry Ticket & Gaming Deck',
      description: 'Access to premier gaming floors featuring Roulette, Baccarat, Black Jack, Andar Bahar, and Casino War.',
      photo: pkg.image || venue.image
    },
    {
      title: 'Unlimited Multi-Cuisine Dinner Buffet',
      description: '5-star lavish dinner buffet spread with live counter delicacies, international, Indian & Goan coastal food.',
      photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: pkg.liquorTypeLabel,
      description: 'Non-stop pour of curated spirits, beers, wines, mocktails, and beverages throughout your evening.',
      photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Vegas Amphitheater & Live Acts',
      description: 'Enjoy live dance acts, musical bands, stand-up comedy, and DJ performances on main entertainment decks.',
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'VIP Feeder Boat Transfer',
      description: 'Round-trip AC feeder boat pick-up and drop from Noah’s Ark Panjim Jetty across Mandovi River.',
      photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-amber-500 selection:text-slate-950">
      <Canvas3DBackground />
      <Navbar />

      {/* Hero Banner Header */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={pkg.image || venue.image}
            alt={pkg.name}
            fill
            sizes="100vw"
            className="object-cover opacity-25 filter blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/#casino-tariffs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to VIP Casino Tariffs</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {venue.name}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {venue.location}
                </span>
                <span className="text-xs font-medium text-slate-400 border border-slate-800 px-3 py-1 rounded">
                  {venue.effectiveDate}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                {pkg.name}
              </h1>

              <p className="text-lg font-semibold text-amber-400">
                {pkg.liquorTypeLabel}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Experience full VIP entry on {venue.name} offshore luxury vessel. Includes unlimited gourmet buffet dining, unlimited house/IMFL/imported bar service, live stage acts, and gaming coupons.
              </p>

              {pkg.accessTags && pkg.accessTags.length > 0 && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-slate-400">Deck Access:</span>
                  {pkg.accessTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-amber-300 border border-slate-700"
                    >
                      {tag} Access
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Booking Rate Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    TARIFF RATE PER GUEST
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    GUARANTEED BEST RATE
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    ₹{pkg.price.toLocaleString('en-IN')}
                  </span>
                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <span className="text-lg font-bold text-slate-500 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {pkg.ageRange && (
                  <div className="text-xs font-medium text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                    ℹ️ {pkg.ageRange}
                  </div>
                )}

                {/* OTPC Gaming Badge */}
                {pkg.otpcWorth > 0 ? (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-transparent border border-amber-500/40 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                      <CircleDollarSign className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                        OTPC GAMING MATCH COUPON
                      </div>
                      <div className="text-lg font-black text-white">
                        ₹{pkg.otpcWorth.toLocaleString('en-IN')} Included
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Full vessel entry, dining & show access</span>
                  </div>
                )}

                {/* Instant CTA Button */}
                <button
                  onClick={handleBookNow}
                  className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Ticket className="w-5 h-5 text-slate-950" />
                  <span>BOOK ENTRY SLOT NOW</span>
                </button>

                <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>No Booking Fee • Pay COD or Prepaid Online</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHOTO-RICH SERVICE BREAKDOWN SECTION */}
      <section className="py-16 bg-slate-900/60 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>PHOTO-RICH SERVICE BREAKDOWN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              WHAT’S INCLUDED IN YOUR <span className="text-amber-400">VIP EXPERIENCE</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Every detail of your evening on board {venue.name} is designed for maximum luxury and non-stop entertainment.
            </p>
          </div>

          {/* Service Cards Grid with Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicePhotosList.map((service, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={service.photo}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded">
                      SERVICE #{idx + 1}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-900 text-[11px] text-amber-400 font-bold flex items-center justify-between">
                  <span>Included with {pkg.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INCLUDED LIQUOR BRANDS MATRIX */}
      {pkg.drinkCategories && pkg.drinkCategories.length > 0 && (
        <section className="py-16 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                INCLUDED <span className="text-amber-400">BAR & SPIRITS MATRIX</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Full breakdown of all complimentary alcoholic & non-alcoholic brand options available for {pkg.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pkg.drinkCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Wine className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-amber-300 text-xs tracking-wider uppercase">
                      {cat.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-xs bg-slate-950 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-800 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ENTRY RULES & GUIDELINES */}
      <section className="py-12 bg-slate-900/40 border-t border-slate-800 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 border border-amber-500/20 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Important Vessel Entry Guidelines & Terms</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
              <div className="space-y-2">
                <p>• <strong>Age Restriction:</strong> Guests 21 years and above are permitted on gaming floors. Minors under 21 years are allowed access to dining and show decks only.</p>
                <p>• <strong>Photo Identification:</strong> Valid original government-issued photo ID (Aadhaar, Passport, Driving License) is mandatory for entry.</p>
              </div>

              <div className="space-y-2">
                <p>• <strong>Dress Code:</strong> Smart Casuals or Formals required. Shorts, sleeveless shirts, and flip-flops/floaters are strictly not allowed on gaming decks.</p>
                <p>• <strong>OTPC Terms:</strong> One Time Play Coupons (OTPC) are valid for match play on live tables and non-transferable for cash.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal />
    </main>
  );
}
