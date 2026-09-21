'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Compass, Phone, MessageCircle, Search, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Your Journey Begins in Goa',
    subtitle: 'Dive deep into sapphire ocean waters with certified instructors, fly high with parasailing & experience luxury dinner cruises.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop',
    tag: 'ULTIMATE WATERSPORTS & SCUBA'
  },
  {
    id: 2,
    title: '55M High Bungee Leap & Jungle Safaris',
    subtitle: 'Feel the rush over Mayem Lake and race 4x4 open Jeeps to the iconic Dudhsagar Waterfalls.',
    image: '/images/bungee_banner.jpg',
    tag: 'HIGH-ALTITUDE EXTREME THRILLS'
  },
  {
    id: 3,
    title: 'VIP Floating Casinos & Dinner Cruises',
    subtitle: 'Unwind on Mandovi river with live DJ beats, cultural dance performances, unlimited buffet & casino gaming floors.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1920&auto=format&fit=crop',
    tag: 'EXCLUSIVE GOA NIGHTLIFE'
  }
];

export default function HeroSection() {
  const { heroSlides, openBookingModal } = useApp();
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [
    {
      id: 'h-1',
      title: 'Your Journey Begins in Goa',
      subtitle: 'Dive deep into sapphire ocean waters with certified instructors, fly high with parasailing & experience luxury dinner cruises.',
      badge: 'ULTIMATE WATERSPORTS & SCUBA',
      mediaType: 'image' as const,
      mediaUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop',
      ctaText: 'Explore Packages',
      ctaLink: '#tours'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-zinc-950">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          {slide.mediaType === 'video' ? (
            <video
              src={slide.mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center transform scale-105"
            />
          ) : (
            <img
              src={slide.mediaUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 animate-pulse-subtle"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
        </div>
      ))}

      {/* Hero Content Overlay - Centered Layout */}
      <div className="relative z-10 max-w-5xl mx-auto text-center my-auto flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{activeSlide.badge || 'GOA ADVENTURE TOURS'}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight font-serif drop-shadow-2xl">
          {activeSlide.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto font-normal leading-relaxed text-shadow">
          {activeSlide.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => openBookingModal()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:scale-105 transition transform flex items-center space-x-2"
          >
            <span>BOOK YOUR ADVENTURE</span>
            <Compass className="w-4 h-4 text-zinc-950" />
          </button>
          
          <a
            href="tel:+919876543210"
            className="px-5 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-700 hover:border-amber-400 text-white font-bold text-xs backdrop-blur-md hover:bg-zinc-900 transition flex items-center space-x-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>CALL: +91 98765 43210</span>
          </a>

          <a
            href="https://wa.me/919876543210?text=Hi%20Goa%20Adventures,%20I%20want%20to%20know%20package%20details"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WHATSAPP US</span>
          </a>
        </div>
      </div>

      {/* Carousel Prev/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-950/60 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-700 text-white flex items-center justify-center transition backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-950/60 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-700 text-white flex items-center justify-center transition backdrop-blur-md"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
