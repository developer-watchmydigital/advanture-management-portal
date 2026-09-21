'use client';

import React from 'react';
import { Truck, ShieldCheck, UserCheck, Tag, Zap, Headphones } from 'lucide-react';

const PROVIDES = [
  {
    icon: Truck,
    title: 'Doorstep Pickup & Drop',
    desc: 'Free hotel transfers in AC coaches across Calangute, Baga, Candolim, Arpora & Panjim.'
  },
  {
    icon: ShieldCheck,
    title: 'Certified Safety Gear',
    desc: 'Top-tier PADI dive tanks, SANZ bungee harnesses & international grade life jackets.'
  },
  {
    icon: UserCheck,
    title: 'Licensed Local Guides',
    desc: 'Friendly, experienced local tour captains and certified dive instructors.'
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    desc: 'Direct operator rates with zero hidden agent fees or surge pricing.'
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    desc: 'Receive immediate booking voucher & driver contact details via WhatsApp.'
  },
  {
    icon: Headphones,
    title: '24/7 On-Ground Support',
    desc: 'Dedicated helpline active throughout your tour journey in Goa.'
  }
];

export default function ProvidesSection() {
  return (
    <section id="provides" className="py-16 px-4 sm:px-8 bg-zinc-900/60 border-y border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-black tracking-widest text-amber-400 uppercase mb-2">
            WORRY-FREE ADVENTURES
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            What We Provide With Every Package
          </h3>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROVIDES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 p-6 rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl group backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-zinc-950 transition duration-300 text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
