'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tour } from '@/types';
import { Star, Clock, ArrowRight, Sparkles, Video } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const { openBookingModal } = useApp();
  const [activeMedia, setActiveMedia] = useState<string>(tour.heroMedia);

  const isVideoMedia = (url: string) => url.toLowerCase().includes('.mp4');

  return (
    <div className="bg-zinc-900/95 border border-zinc-800 hover:border-amber-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col group backdrop-blur-md">
      
      {/* Main Cover Media Stage (Image or Video) */}
      <div className="relative h-60 w-full overflow-hidden bg-zinc-950">
        {isVideoMedia(activeMedia) ? (
          <video
            src={activeMedia}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={activeMedia}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

        {/* Discount Badge */}
        {tour.discount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-zinc-950" />
            <span>{tour.discount}</span>
          </div>
        )}

        {/* Rating Pill */}
        <div className="absolute bottom-3 right-3 flex items-center justify-end text-xs text-white">
          <span className="flex items-center space-x-1 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-zinc-800 text-amber-400 font-bold shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{tour.rating} ({tour.reviewCount})</span>
          </span>
        </div>
      </div>

      {/* 3 Preview Thumbnail Row (Photos & Videos mixed support) */}
      <div className="grid grid-cols-3 gap-2 p-2 bg-zinc-950 border-b border-zinc-800/80">
        {tour.thumbnails.slice(0, 3).map((thumb, idx) => {
          const isVid = isVideoMedia(thumb);
          const isActive = activeMedia === thumb;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveMedia(thumb)}
              className={`h-16 rounded-xl overflow-hidden relative group/thumb border transition-all duration-300 ${
                isActive
                  ? 'border-amber-400 ring-2 ring-amber-500/30 scale-[1.02] shadow-md'
                  : 'border-zinc-800 hover:border-amber-500/50 opacity-90 hover:opacity-100'
              }`}
            >
              {isVid ? (
                <div className="relative w-full h-full bg-zinc-900">
                  <video src={thumb} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                    <span className="bg-amber-500 text-zinc-950 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center space-x-0.5">
                      <Video className="w-2.5 h-2.5" />
                      <span>VIDEO</span>
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={thumb}
                  alt={`${tour.title} preview ${idx + 1}`}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition duration-300"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition font-serif line-clamp-1">
            {tour.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed font-medium">
            {tour.tagline}
          </p>
        </div>

        {/* Key Inclusions Check Badges */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5">
          {tour.inclusions.slice(0, 3).map((inc, i) => (
            <span
              key={i}
              className="text-[10px] bg-zinc-800/90 text-zinc-200 px-2 py-1 rounded-md font-semibold truncate max-w-[150px] border border-zinc-700/60"
            >
              ✓ {inc}
            </span>
          ))}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-zinc-400 block line-through font-mono">
              ₹{tour.originalPrice}
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-amber-400 font-mono">
                ₹{tour.price}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold">
                / Person
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href={`/tour/${tour.slug}`}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-bold text-xs transition flex items-center space-x-1 border border-zinc-700 shadow"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>

            <button
              onClick={() => openBookingModal(tour)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs transition shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

