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
              <span>ABOUT WATCH MY TRIP ADVENTURE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
              We Live & Breathe Goa’s Wildest Thrills
            </h2>

            <div className="bg-zinc-950/80 border border-amber-500/30 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                LEADERSHIP
              </span>
              <p className="text-base font-extrabold text-white">Masrur Ahmed & Masum Ahmed</p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Founded and led by <strong>Masrur Ahmed & Masum Ahmed</strong>, <strong>Watch My Trip Adventure</strong> is dedicated to bringing you safe, high-octane water sports, deep-sea scuba exploration, luxury cruises, and 4x4 jungle safari expeditions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white font-bold uppercase text-[11px]">Office Location</h5>
                  <p className="text-zinc-400 text-[11px] leading-snug">
                    Golden Beach Road, Calangute Beach, Calangute, Goa - 403516
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white font-bold uppercase text-[11px]">Phone Hotline</h5>
                  <p className="text-amber-400 font-bold text-[11px]">+91 95886 67027 (Direct & WhatsApp)</p>
                  <p className="text-emerald-400 font-bold text-[11px]">+91 70583 23165 (Support & Bookings)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
