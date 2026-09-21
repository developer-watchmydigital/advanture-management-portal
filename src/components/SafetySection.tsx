'use client';

import React from 'react';
import { ShieldCheck, HeartPulse, LifeBuoy, FileCheck, CheckCircle2 } from 'lucide-react';

const SAFETY_POINTS = [
  {
    icon: LifeBuoy,
    title: 'Dual Air Chambers & Certified Jackets',
    desc: 'All water activities feature SOLAS-grade life jackets fitted specifically for kids and adults.'
  },
  {
    icon: ShieldCheck,
    title: 'Strict SANZ Bungee Standards',
    desc: '55M tower equipped with triple-redundant harness webbing and daily load testing.'
  },
  {
    icon: HeartPulse,
    title: 'First Aid & Oxygen On Board',
    desc: 'Every boat and jeep carries emergency medical kits, trained first-responders & medical oxygen.'
  },
  {
    icon: FileCheck,
    title: '1-on-1 Scuba Diving Companion',
    desc: 'Dedicated PADI diver holds your hand underwater throughout the dive duration.'
  }
];

export default function SafetySection() {
  return (
    <section id="safety" className="py-20 px-4 sm:px-8 bg-zinc-950 border-t border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>SAFETY IS OUR #1 PRIORITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
              Uncompromised World-Class Safety Standards
            </h2>
            <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
              Your thrill is backed by strict international safety protocols, zero-tolerance equipment maintenance, and certified professional instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAFETY_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <div
                  key={i}
                  className="bg-zinc-950/90 border border-zinc-800 p-6 rounded-2xl hover:border-amber-500/40 transition duration-300 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick checklist bar */}
          <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-zinc-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pre-dive Briefing included</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Daily Weather & Wave checks</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sanitized Diving Gear</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Goa Tourism Authorized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
