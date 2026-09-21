'use client';

import React from 'react';
import { Compass, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-8 bg-zinc-900/40 border-t border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Collage Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop"
                alt="Goa Adventure Experience"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>

            {/* Overlaid Floating Badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-zinc-950/95 border border-amber-500/40 p-5 rounded-2xl shadow-2xl backdrop-blur-xl max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-zinc-950 font-black text-xl flex items-center justify-center shrink-0">
                  10+
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Years of Thrills</h4>
                  <p className="text-xs text-zinc-400">Pioneering adventure tourism across North & South Goa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>ABOUT WANDERERS GOA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
              We Live & Breathe Goa’s Wildest Thrills
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Founded by passionate Goan ocean enthusiasts and adventure junkies, **Wanderers Goa** is dedicated to bringing you safe, high-octane water sports, deep-sea scuba exploration, luxury cruises, and jungle safari expeditions.
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              We manage our own fleet of speedboats, catamaran vessels, and 4x4 safari vehicles. By cutting out third-party middlemen, we guarantee the best rates, direct hotel pickups, and top-tier safety standards for your family and friends.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h5 className="text-white text-xs font-bold">Base Location</h5>
                  <p className="text-[11px] text-zinc-400">Calangute, North Goa</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h5 className="text-white text-xs font-bold">Direct Booking Hotline</h5>
                  <p className="text-[11px] text-zinc-400">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
