'use client';

import React from 'react';
import Link from 'next/link';
import { Tour } from '@/types';
import { Star, Clock, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const { openBookingModal } = useApp();

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col group backdrop-blur-sm">
      {/* Main Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
        <img
          src={tour.heroMedia}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

        {/* Discount Badge */}
        {tour.discount && (
          <div className="absolute top-3 left-3 bg-amber-500 text-zinc-950 font-black text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>{tour.discount}</span>
          </div>
        )}

        {/* Duration & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center space-x-1 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{tour.duration}</span>
          </span>
          <span className="flex items-center space-x-1 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-800 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{tour.rating} ({tour.reviewCount})</span>
          </span>
        </div>
      </div>

      {/* 3 Preview Thumbnail Photos (Exact requirement from prompt & Image 2) */}
      <div className="grid grid-cols-3 gap-1.5 p-2 bg-zinc-950/90 border-b border-zinc-800/80">
        {tour.thumbnails.slice(0, 3).map((thumb, idx) => (
          <div key={idx} className="h-14 rounded-lg overflow-hidden relative group/thumb">
            <img
              src={thumb}
              alt={`${tour.title} preview ${idx + 1}`}
              className="w-full h-full object-cover group-hover/thumb:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-zinc-950/10 group-hover/thumb:bg-transparent transition" />
          </div>
        ))}
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition font-serif line-clamp-1">
            {tour.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {tour.tagline}
          </p>
        </div>

        {/* Key Inclusions Preview */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5">
          {tour.inclusions.slice(0, 3).map((inc, i) => (
            <span
              key={i}
              className="text-[10px] bg-zinc-800/80 text-zinc-300 px-2 py-0.5 rounded font-medium truncate max-w-[140px]"
            >
              ✓ {inc}
            </span>
          ))}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-400 block line-through">
              ₹{tour.originalPrice}
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-amber-400">
                ₹{tour.price}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                / Person
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href={`/tour/${tour.slug}`}
              className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-bold text-xs transition flex items-center space-x-1 border border-zinc-700"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => openBookingModal(tour)}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs transition shadow-md shadow-amber-500/20"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
