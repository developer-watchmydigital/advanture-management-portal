import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CasinoVenue, CasinoTierPackage, Tour } from '@/types';
import { Sparkles, Trophy, Wine, Utensils, Music, ShieldCheck, ChevronDown, ChevronUp, Ticket, CircleDollarSign, Eye } from 'lucide-react';

export const CasinoTariffSection: React.FC = () => {
  const { casinoVenues, openBookingModal } = useApp();
  const [selectedVenueId, setSelectedVenueId] = useState<string>(
    casinoVenues[0]?.id || 'deltin-royale'
  );
  const [expandedLiquorPackageId, setExpandedLiquorPackageId] = useState<string | null>(null);

  const activeVenue: CasinoVenue | undefined = casinoVenues.find(v => v.id === selectedVenueId) || casinoVenues[0];

  if (!activeVenue) return null;

  const handleBookPackage = (pkg: CasinoTierPackage) => {
    // Construct a pseudo Tour object to reuse the existing booking modal & leads pipeline
    const pseudoTour: Tour = {
      id: `casino-${activeVenue.id}-${pkg.id}`,
      title: `${activeVenue.name} - ${pkg.name}`,
      slug: `${activeVenue.slug}-${pkg.id}`,
      tagline: `${activeVenue.location} | ${pkg.liquorTypeLabel}`,
      price: pkg.price,
      originalPrice: pkg.originalPrice || pkg.price,
      discount: 'VIP ENTRY',
      duration: 'Full Evening Deck Access',
      rating: 4.9,
      reviewCount: 480,
      heroMedia: pkg.image || activeVenue.image,
      thumbnails: [pkg.image || activeVenue.image, activeVenue.image, activeVenue.image],
      mediaGallery: [pkg.image || activeVenue.image],
      description: `VIP Entry to ${activeVenue.name}. Includes ${pkg.liquorTypeLabel}${pkg.otpcWorth ? `, OTPC ₹${pkg.otpcWorth.toLocaleString('en-IN')}` : ''}, Unlimited Buffet Dinner & Live Entertainment.`,
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
          photo: activeVenue.image
        },
        {
          id: '2',
          time: '08:30 PM',
          title: 'Gaming & Unlimited Buffet Dinner',
          description: 'Enjoy live gaming tables, multi-cuisine dinner buffet, and live dance performances.',
          photo: activeVenue.image
        }
      ]
    };

    openBookingModal(pseudoTour);
  };

  const toggleLiquorExpand = (packageId: string) => {
    if (expandedLiquorPackageId === packageId) {
      setExpandedLiquorPackageId(null);
    } else {
      setExpandedLiquorPackageId(packageId);
    }
  };

  return (
    <section id="casino-tariffs" className="relative py-20 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Goa VIP Casino Tariffs • Exclusive Entry Packages</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            OFFSHORE CASINO <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">VIP PACKAGES</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Book instant entry slots for Goa’s premier luxury casino vessels. Enjoy gaming OTPC chips, unlimited buffet dining, premium liquor & live entertainment on Mandovi River.
          </p>
        </div>

        {/* Venue Selector Tabs */}
        {casinoVenues.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {casinoVenues.map(venue => {
              const isActive = venue.id === selectedVenueId;
              return (
                <button
                  key={venue.id}
                  onClick={() => {
                    setSelectedVenueId(venue.id);
                    setExpandedLiquorPackageId(null);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-amber-500/50 hover:text-amber-300'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{venue.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Venue Banner Header */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 mb-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Image Thumbnail */}
            <div className="lg:col-span-4 relative h-48 sm:h-56 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg">
              <Image
                src={activeVenue.image}
                alt={activeVenue.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded">
                OFFSHORE VESSEL
              </div>
            </div>

            {/* Venue Details */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {activeVenue.location}
                  </span>
                  <span className="text-xs font-medium text-slate-400 border border-slate-700 px-3 py-1 rounded-md">
                    {activeVenue.effectiveDate}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  {activeVenue.name}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base mb-6">
                  {activeVenue.tagline}
                </p>
              </div>

              {/* General Inclusions Pill Strip */}
              <div className="bg-slate-950/70 rounded-xl border border-amber-500/20 p-4">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-2">
                  ✨ ALL ENTRY PACKAGES INCLUDE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <span>UNLIMITED DINNER</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Wine className="w-4 h-4" />
                    </div>
                    <span>UNLIMITED DRINKS*</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Music className="w-4 h-4" />
                    </div>
                    <span>LIVE ENTERTAINMENT</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tariff Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeVenue.packages.map((pkg) => {
            const isChildOrTeen = pkg.price < 2000;
            const isExpanded = expandedLiquorPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/60 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                {/* Package Eye-Catching Cover Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={pkg.image || activeVenue.image}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Highlight Badge */}
                  {pkg.name.toUpperCase().includes('PREMIUM') && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {activeVenue.name}
                    </span>
                    <h4 className="text-xl font-extrabold text-white uppercase tracking-wide group-hover:text-amber-400 transition-colors mt-1 drop-shadow-md">
                      {pkg.name}
                    </h4>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-400/90 block mb-3">
                      {pkg.liquorTypeLabel}
                    </span>

                    {/* Access Tags if present */}
                    {pkg.accessTags && pkg.accessTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pkg.accessTags.map((tag, i) => (
                          <span key={i} className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {tag} Access
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price Block */}
                    <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 mb-4">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-medium">
                        Tariff Rate per Guest
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-white">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                          <span className="text-sm font-semibold text-slate-500 line-through">
                            ₹{pkg.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {pkg.ageRange && (
                        <div className="text-[11px] text-amber-300/80 mt-1 font-medium">
                          {pkg.ageRange}
                        </div>
                      )}
                    </div>

                    {/* OTPC Chip Badge if applicable */}
                    {pkg.otpcWorth > 0 ? (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/30 mb-4">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                          <CircleDollarSign className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            OTPC GAMING CHIP
                          </div>
                          <div className="text-sm font-black text-white">
                            ₹{pkg.otpcWorth.toLocaleString('en-IN')} Included
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 mb-4">
                        <Ticket className="w-5 h-5 text-slate-400 shrink-0" />
                        <div className="text-xs text-slate-400 font-medium">
                          Entry & Full Dining deck access
                        </div>
                      </div>
                    )}

                    {/* Liquor breakdown details toggle */}
                    {pkg.drinkCategories && pkg.drinkCategories.length > 0 && (
                      <div className="mb-4">
                        <button
                          onClick={() => toggleLiquorExpand(pkg.id)}
                          className="w-full flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 py-1 border-b border-dashed border-slate-800"
                        >
                          <span>{isExpanded ? 'Hide Included Brands' : 'View Included Brands'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1 text-xs scrollbar-thin scrollbar-thumb-slate-700">
                            {pkg.drinkCategories.map((cat, idx) => (
                              <div key={idx} className="bg-slate-950/60 p-2 rounded border border-slate-800/80">
                                <span className="font-bold text-amber-300 block text-[11px]">
                                  {cat.category}:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {cat.items.map((item, itemIdx) => (
                                    <span key={itemIdx} className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Dual Action Buttons: View Details + Book Entry Slot */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <Link
                      href={`/casino/${activeVenue.slug}/${pkg.id}`}
                      className="w-full py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all duration-300 flex items-center justify-center gap-1.5 shadow"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Details & Photo Gallery</span>
                    </Link>

                    <button
                      onClick={() => handleBookPackage(pkg)}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 active:scale-[0.98]"
                    >
                      <Ticket className="w-4 h-4 text-slate-950" />
                      <span>Book Entry Slot</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Disclaimer Footer */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 max-w-3xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            *Terms & Conditions apply. OTPC: One Time Play Coupon valid on gaming floors. Government photo ID required for entry (21+ for gaming deck).
          </span>
        </div>

      </div>
    </section>
  );
};
