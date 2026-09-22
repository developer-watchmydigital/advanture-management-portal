'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProvidesSection from '@/components/ProvidesSection';
import CinematicShowcaseSection from '@/components/CinematicShowcaseSection';
import { CasinoTariffSection } from '@/components/CasinoTariffSection';
import TourGrid from '@/components/TourGrid';
import GallerySection from '@/components/GallerySection';
import WhyUsSection from '@/components/WhyUsSection';
import SafetySection from '@/components/SafetySection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import AddReviewModal from '@/components/AddReviewModal';
import Canvas3DBackground from '@/components/Canvas3DBackground';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative selection:bg-amber-500 selection:text-zinc-950">
      {/* 3D Ambient Dynamic Particle Canvas Backdrop */}
      <Canvas3DBackground />

      {/* Glassmorphic Sticky Header */}
      <Navbar />

      {/* 1. Hero Section (Image 1 Layout Reference) */}
      <HeroSection />

      {/* 2. What We Provide Section (Post-Hero Highlights) */}
      <ProvidesSection />

      {/* 2.5. Cinematic All-Package Video Showcase Section */}
      <CinematicShowcaseSection />

      {/* 2.8. Goa VIP Casino Tariff Cards (Deltin Royale & Deltin Jaqk) */}
      <CasinoTariffSection />

      {/* 3. Adventure Packages Grid (12 Tours - Image 2 Layout Reference) */}
      <TourGrid />

      {/* 3.5. 12 Tour Adventure Visual Gallery Section */}
      <GallerySection />

      {/* 4. Why Choose Us Section */}
      <WhyUsSection />

      {/* 5. Safety First Section */}
      <SafetySection />

      {/* 6. About Us Section */}
      <AboutSection />

      {/* 7. Reviews Section (Image 3 Layout Reference) */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <BookingModal />
      <AddReviewModal />
    </main>
  );
}
