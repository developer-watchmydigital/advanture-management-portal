'use client';

import React from 'react';
import { Award, Users, ThumbsUp, Sparkles, Compass, Smile } from 'lucide-react';

const REASONS = [
  {
    icon: Award,
    stat: '10+ Years',
    title: 'Goa’s #1 Adventure Operator',
    desc: 'Trusted by over 50,000+ satisfied travelers across India & internationally.'
  },
  {
    icon: Users,
    stat: 'Certified Guides',
    title: 'PADI & SANZ Trained Team',
    desc: 'Our dive masters and jump operators undergo rigorous annual international safety certifications.'
  },
  {
    icon: ThumbsUp,
    stat: '100% Transparent',
    title: 'Zero Hidden Charges',
    desc: 'What you see is what you pay. Free pickups, entry tickets, and equipment included.'
  },
  {
    icon: Smile,
    stat: '4.9★ Rating',
    title: '5-Star Customer Experience',
    desc: 'Top customer reviews on Google & TripAdvisor for exceptional hospitality.'
  }
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 px-4 sm:px-8 bg-zinc-900/50 border-t border-zinc-800 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE WANDERERS GOA DIFFERENCE</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
              Why Adventurers Choose Us Every Time
            </h2>
            
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              We don’t just book tickets; we craft unforgettable lifelong Goa memories. From private speedboat island transfers to high-grade underwater photography, every detail is engineered for maximum thrill and absolute safety.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://wa.me/919588667027"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs tracking-wider uppercase transition shadow-lg shadow-amber-500/20"
              >
                Talk to Our Trip Expert
              </a>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REASONS.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl hover:border-amber-500/40 transition duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      {reason.stat}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
