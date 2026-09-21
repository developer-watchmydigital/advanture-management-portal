'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X, Shield, Compass, Lock } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Contact Bar */}
      <div className="bg-zinc-950/90 text-zinc-300 border-b border-amber-500/10 text-xs py-2 px-4 sm:px-8 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center space-x-6">
          <a
            href="tel:+919588667027"
            className="flex items-center space-x-2 hover:text-amber-400 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium">+91 95886 67027</span>
          </a>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline text-zinc-400">
            📍 Golden Beach Road, Calangute Beach, Calangute, Goa - 403516
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/919588667027?text=Hi%20Goa%20Adventures,%20I%20want%20to%20inquire%20about%20packages"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/20" />
            <span>24/7 WhatsApp Help</span>
          </a>
        </div>
      </div>

      {/* Main Floating Glassmorphic Nav */}
      <nav
        className={`px-4 sm:px-8 transition-all duration-300 ${isScrolled
          ? 'bg-zinc-950/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/20 py-1.5'
          : 'bg-gradient-to-b from-zinc-950/90 to-transparent py-1 sm:py-1.5'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo matching exact reference image layout */}
          <Link href="/" className="flex items-center group relative py-0.1">
            {/* Eagle Icon - Significantly Increased Size */}
            <img
              src="/logo.png"
              alt="Watch my trip Adventure"
              className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />

            {/* Brand Text starting inside the semi-circle curve of the eagle (aligned vertically) */}
            <div className="-ml-5 sm:-ml-7 translate-y-2.5 sm:translate-y-3 flex items-baseline space-x-1.5 font-sans tracking-tighter leading-none text-2xl sm:text-3xl font-black">
              <span className="text-white font-black drop-shadow-md">Watch my trip</span>
              <span className="text-[#ff4d4d] font-black drop-shadow-md">Adventure</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7 font-medium text-sm text-zinc-200 translate-y-2.5 sm:translate-y-3">
            <Link href="/" className="hover:text-amber-400 transition">
              Home
            </Link>
            <Link href="#tours" className="hover:text-amber-400 transition">
              Tour Packages
            </Link>
            <Link href="#provides" className="hover:text-amber-400 transition">
              Services
            </Link>
            <Link href="#why-us" className="hover:text-amber-400 transition">
              Why Us
            </Link>
            <Link href="#safety" className="hover:text-amber-400 transition">
              Safety First
            </Link>
            <Link href="#reviews" className="hover:text-amber-400 transition">
              Reviews
            </Link>
            <Link href="#about" className="hover:text-amber-400 transition">
              About
            </Link>
          </div>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3 translate-y-2.5 sm:translate-y-3">
            <a
              href="tel:+919588667027"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 hover:border-amber-500 hover:text-amber-400 transition text-xs font-semibold shadow-md"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/919588667027?text=Hi%20Goa%20Adventures,%20I%20want%20to%20book%20a%20tour"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:from-emerald-500 hover:to-teal-400 transition text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none translate-y-2.5 sm:translate-y-3"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-zinc-800/80 space-y-3 bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-200 hover:text-amber-400 font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="#tours"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-200 hover:text-amber-400 font-medium text-sm"
            >
              Tour Packages
            </Link>
            <Link
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-200 hover:text-amber-400 font-medium text-sm"
            >
              Why Us
            </Link>
            <Link
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-200 hover:text-amber-400 font-medium text-sm"
            >
              Safety First
            </Link>
            <Link
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-200 hover:text-amber-400 font-medium text-sm"
            >
              Reviews
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-900 text-zinc-200 hover:text-amber-400 font-medium text-sm"
            >
              About Us
            </Link>

            <div className="pt-3 border-t border-zinc-800 grid grid-cols-2 gap-2">
              <a
                href="tel:+919588667027"
                className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-amber-400 font-bold text-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919588667027"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
