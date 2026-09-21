'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Phone, MessageCircle, Mail, MapPin, Lock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs py-14 px-4 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center group relative">
            <img
              src="/logo.png"
              alt="Watch my trip Adventure"
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <div className="-ml-5 translate-y-2 flex items-baseline space-x-1.5 font-sans tracking-tighter leading-none text-2xl font-black">
              <span className="text-white font-black drop-shadow-md">Watch my trip</span>
              <span className="text-[#ff4d4d] font-black drop-shadow-md">Adventure</span>
            </div>
          </Link>

          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            Experience non-stop adventure in North & South Goa! Certified scuba diving, 55m lake bungee jumping, luxury dinner cruises, and 4x4 jungle safaris.
          </p>

          <div className="pt-2 text-xs space-y-1">
            <span className="text-amber-400 font-extrabold uppercase tracking-wider block text-[10px]">
              Leadership:
            </span>
            <span className="text-white font-bold block">Masrur Ahmed & Masum Ahmed</span>
          </div>

          <div className="flex items-center space-x-3 pt-3">
            <a
              href="tel:+919588667027"
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-amber-500 rounded-xl text-amber-400 font-bold flex items-center space-x-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <a
              href="https://wa.me/919588667027"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center space-x-1.5 transition shadow-lg shadow-emerald-600/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">
            Popular Packages
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="/tour/scuba-water-sports-combo" className="hover:text-amber-400 transition">Scuba + 5 Watersports</Link></li>
            <li><Link href="/tour/bungee-jumping" className="hover:text-amber-400 transition">55M Bungee Jumping</Link></li>
            <li><Link href="/tour/dudhsagar-tour" className="hover:text-amber-400 transition">Dudhsagar Jeep Safari</Link></li>
            <li><Link href="/tour/dinner-cruise" className="hover:text-amber-400 transition">Mandovi Dinner Cruise</Link></li>
            <li><Link href="/tour/casino-royale" className="hover:text-amber-400 transition">VIP Floating Casino</Link></li>
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">
            Company
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="#why-us" className="hover:text-amber-400 transition">Why Choose Us</Link></li>
            <li><Link href="#safety" className="hover:text-amber-400 transition">Safety Standards</Link></li>
            <li><Link href="#about" className="hover:text-amber-400 transition">About Us</Link></li>
            <li><Link href="#reviews" className="hover:text-amber-400 transition">Guest Reviews</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">
            Office Location
          </h4>
          <div className="space-y-3">
            <p className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Golden Beach Road, Calangute Beach, Calangute, Goa - 403516</span>
            </p>
            <div className="space-y-1">
              <p className="flex items-center space-x-2 text-white font-bold">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+919588667027" className="hover:text-amber-400 transition">+91 95886 67027</a>
              </p>
              <span className="text-[10px] text-amber-400 font-bold block pl-5">(Direct & WhatsApp)</span>
              <p className="flex items-center space-x-2 text-zinc-300 pt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+917058323165" className="hover:text-emerald-400 transition">+91 70583 23165</a>
              </p>
              <span className="text-[10px] text-emerald-400 font-bold block pl-5">(Support & Bookings)</span>
            </div>
            <p className="flex items-center space-x-2 pt-1">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:support-package@watchmydigital.com" className="hover:text-amber-400 transition break-all">
                support-package@watchmydigital.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-zinc-500 gap-4">
        <p>© {new Date().getFullYear()} Wanderers Goa Adventures. All rights reserved.</p>
        <p className="flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>for Ultimate Goa Experiences</span>
        </p>
      </div>
    </footer>
  );
}
