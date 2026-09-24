'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X, User, LogOut, CalendarCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, openLoginModal, logout, isAuthLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

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
              <span className="text-white font-black drop-shadow-md">Watch my</span>
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

            {/* Auth Button / User Avatar */}
            {!isAuthLoading && (
              <>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center space-x-2 px-2 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700 hover:border-amber-500/50 transition group"
                    >
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-lg object-cover" />
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-zinc-950 font-black text-[10px]">
                          {getInitials(user.displayName)}
                        </div>
                      )}
                      <span className="text-xs font-bold text-zinc-200 group-hover:text-white max-w-[80px] truncate hidden lg:inline">
                        {user.displayName.split(' ')[0]}
                      </span>
                      <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
                        {/* User info */}
                        <div className="p-4 border-b border-zinc-800">
                          <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                          <p className="text-[11px] text-zinc-500 truncate">{user.email || user.phone || ''}</p>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/my-bookings"
                            onClick={() => { setUserDropdownOpen(false); setMobileMenuOpen(false); }}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-zinc-800 text-zinc-300 hover:text-white transition text-sm"
                          >
                            <CalendarCheck className="w-4 h-4 text-amber-500" />
                            <span className="font-medium">My Bookings</span>
                          </Link>
                          <button
                            onClick={() => { logout(); setUserDropdownOpen(false); }}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 transition text-sm"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>
                )}
              </>
            )}
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

            {/* Mobile Auth Section */}
            {!isAuthLoading && (
              <div className="pt-3 border-t border-zinc-800">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-9 h-9 rounded-xl object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-zinc-950 font-black text-xs">
                          {getInitials(user.displayName)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-white">{user.displayName}</p>
                        <p className="text-[10px] text-zinc-500">{user.email || user.phone}</p>
                      </div>
                    </div>
                    <Link
                      href="/my-bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-zinc-900 text-amber-400 font-medium text-sm"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>My Bookings</span>
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-zinc-900 text-red-400 font-medium text-sm w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { openLoginModal(); setMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black text-sm shadow-lg shadow-amber-500/25"
                  >
                    <User className="w-4 h-4" />
                    <span>Login / Sign Up</span>
                  </button>
                )}
              </div>
            )}

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
