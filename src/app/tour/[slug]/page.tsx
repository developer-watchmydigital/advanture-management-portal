'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import AddReviewModal from '@/components/AddReviewModal';
import Canvas3DBackground from '@/components/Canvas3DBackground';
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  Sparkles,
  Star,
  Compass,
  ShieldCheck,
  Users,
  Camera,
  Video,
  X,
  Play
} from 'lucide-react';

export default function TourDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { tours, openBookingModal } = useApp();

  const tour = tours.find((t) => t.slug === slug || t.id === slug) || tours[0];

  // Gallery Media Tab State (Photos vs Videos)
  const [mediaTab, setMediaTab] = useState<'photos' | 'videos'>('photos');

  // Interactive View Stage / Lightbox Modal State
  const [lightboxMedia, setLightboxMedia] = useState<{
    url: string;
    type: 'image' | 'video';
    title: string;
  } | null>(null);

  if (!tour) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p>Tour not found.</p>
      </div>
    );
  }

  // Compile photos & videos lists
  const photoList = [
    { url: tour.heroMedia, title: 'Main Cover Photo' },
    ...tour.thumbnails
      .filter((t) => !t.toLowerCase().includes('.mp4'))
      .map((t, idx) => ({ url: t, title: `Gallery Shot #${idx + 1}` })),
    ...(tour.mediaGallery || [])
      .filter((t) => !t.toLowerCase().includes('.mp4'))
      .map((t, idx) => ({ url: t, title: `Gallery Shot #${idx + 3}` }))
  ];

  const videoList = [
    ...(tour.videos || []),
    ...tour.thumbnails.filter((t) => t.toLowerCase().includes('.mp4')),
    '/gemini_generated_video_89554782.mp4'
  ];
  // Deduplicate videos
  const uniqueVideos = Array.from(new Set(videoList));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative selection:bg-amber-500 selection:text-zinc-950">
      <Canvas3DBackground />
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative pt-28 pb-16 px-4 sm:px-8 overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.heroMedia}
            alt={tour.title}
            className="w-full h-full object-cover object-center opacity-30 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#tours"
            className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 mb-6 bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800 backdrop-blur-md transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tours</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Title & Specs */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-500 text-zinc-950 text-[11px] font-black uppercase px-3 py-1 rounded-md shadow-md">
                  {tour.discount || 'GOA SPECIAL'}
                </span>
                <span className="bg-zinc-900 border border-zinc-700 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-md flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{tour.rating} ({tour.reviewCount} Verified Reviews)</span>
                </span>
                <span className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-[11px] font-semibold px-3 py-1 rounded-md flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{tour.duration}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
                {tour.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                {tour.tagline}
              </p>

              {/* Places covered tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {tour.placesCovered.map((place, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-zinc-900/90 text-zinc-300 px-3 py-1 rounded-lg border border-zinc-800 flex items-center space-x-1"
                  >
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{place}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action CTAs Box */}
            <div className="lg:col-span-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-400 line-through block font-mono">
                    Original ₹{tour.originalPrice}
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-amber-400 font-mono">₹{tour.price}</span>
                    <span className="text-xs text-zinc-400 font-semibold uppercase">/ Person</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  Instant Voucher
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919588667027"
                  className="py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center justify-center space-x-1.5 border border-zinc-700 transition"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/919588667027?text=Hi,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => openBookingModal(tour)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition cursor-pointer"
              >
                BOOK THIS TOUR NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tour Gallery & Detailed Info */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* TWO TABS MEDIA GALLERY SECTION (PHOTOS vs VIDEOS) */}
        <div className="mb-12 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <h2 className="text-2xl font-bold text-white font-serif flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>Package Experience Gallery</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Explore real photos and 4K video clips captured during this tour package experience.
              </p>
            </div>

            {/* Media Selector Tabs: 📸 Photos vs 🎥 Videos */}
            <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
              <button
                onClick={() => setMediaTab('photos')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  mediaTab === 'photos'
                    ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>📸 Photos ({photoList.length})</span>
              </button>

              <button
                onClick={() => setMediaTab('videos')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  mediaTab === 'videos'
                    ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>🎥 Videos ({uniqueVideos.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: 📸 PHOTOS GRID (Exact layout from Image 2) */}
          {mediaTab === 'photos' && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {photoList.map((photo, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setLightboxMedia({
                      url: photo.url,
                      type: 'image',
                      title: photo.title
                    })
                  }
                  className={`rounded-2xl overflow-hidden border border-zinc-800 relative group cursor-pointer shadow-lg hover:border-amber-500/60 transition duration-300 ${
                    i === 0 ? 'md:col-span-2 h-72 sm:h-80' : 'h-48 sm:h-56'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition" />
                  
                  <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-amber-400 border border-zinc-800 shadow">
                    {photo.title}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-amber-500/90 text-zinc-950 p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform scale-90 group-hover:scale-100">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: 🎥 VIDEOS GRID */}
          {mediaTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {uniqueVideos.map((videoUrl, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setLightboxMedia({
                      url: videoUrl,
                      type: 'video',
                      title: `${tour.title} - Video Clip #${idx + 1}`
                    })
                  }
                  className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 relative group cursor-pointer shadow-xl hover:border-amber-500/60 transition duration-300 h-64 flex flex-col justify-between"
                >
                  <div className="relative w-full h-48 overflow-hidden bg-black">
                    <video src={videoUrl} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition transform">
                        <Play className="w-6 h-6 fill-zinc-950 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-400 border border-zinc-800">
                      4K VIDEO CLIP #{idx + 1}
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900 flex items-center justify-between text-xs font-bold text-zinc-200">
                    <span>Click to Play View Stage</span>
                    <span className="text-amber-400">Watch Clip →</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Layout split: Left details, Right Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Box */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white font-serif flex items-center space-x-2">
                <Compass className="w-6 h-6 text-amber-400" />
                <span>Tour Overview</span>
              </h2>

              {/* Special Highlighting Banner (e.g. All activities in dam water; non-swimmers can also enjoy) */}
              {tour.tagline && (
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-md">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{tour.tagline}</span>
                </div>
              )}

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {tour.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Timings</span>
                  <span className="text-xs text-white font-bold">{tour.timings}</span>
                </div>
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Tour Route</span>
                  <span className="text-xs text-white font-bold">{tour.tourRoute}</span>
                </div>
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Best For</span>
                  <span className="text-xs text-amber-400 font-bold">Families, Couples & Friends</span>
                </div>
              </div>
            </div>



            {/* Inclusions & Exclusions Checklist */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white font-serif flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <span>Package Inclusions & Exclusions</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-zinc-950 border border-emerald-500/20 p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Included in Price</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {tour.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-zinc-950 border border-red-500/20 p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-extrabold text-red-400 uppercase tracking-wider flex items-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span>Not Included</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {tour.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Booking Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="text-center space-y-1 pb-4 border-b border-zinc-800">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
                  SPECIAL ONLINE RATE
                </span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-black text-amber-400 font-mono">₹{tour.price}</span>
                  <span className="text-xs text-zinc-400 line-through font-mono">₹{tour.originalPrice}</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-bold">Save {tour.discount} per booking</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400">Pickup & Drop:</span>
                  <span className="text-white font-bold">Included (AC Coach)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400">Entry Activity:</span>
                  <span className="text-white font-bold">All Permits Included</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-400">Guidance:</span>
                  <span className="text-white font-bold">Certified Local Guide</span>
                </div>
              </div>

              <button
                onClick={() => openBookingModal(tour)}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 transition cursor-pointer"
              >
                BOOK THIS TOUR
              </button>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-[11px] text-zinc-400 text-center">
                <p>⚡ Instant WhatsApp Voucher Confirmation</p>
                <p>🛡️ Zero Booking Fees & Free Cancellation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIEW STAGE / LIGHTBOX MODAL */}
      {lightboxMedia && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-sm font-bold text-white">{lightboxMedia.title}</span>
              <button
                onClick={() => setLightboxMedia(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-xl bg-zinc-950 border border-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[75vh] w-full flex items-center justify-center bg-black rounded-2xl overflow-hidden">
              {lightboxMedia.type === 'video' ? (
                <video
                  src={lightboxMedia.url}
                  controls
                  autoPlay
                  className="max-h-[70vh] w-auto max-w-full rounded-xl"
                />
              ) : (
                <img
                  src={lightboxMedia.url}
                  alt={lightboxMedia.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BookingModal />
      <AddReviewModal />
    </main>
  );
}
