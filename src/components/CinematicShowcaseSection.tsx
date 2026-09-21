'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Compass, ShieldCheck, ArrowDown, Film, Maximize2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const PACKAGE_BADGES = [
  { name: 'Scuba Diving at Grande Island', tag: 'Deep Sea Coral Reef' },
  { name: '55M Bungee Jump', tag: 'Mayem Lake Thrill' },
  { name: 'Dudhsagar Jeep Safari', tag: '4x4 Offroad Jungle Track' },
  { name: 'Mandovi Luxury Cruise', tag: 'Live DJ & Goan Dinner' },
  { name: 'VIP Floating Casino', tag: 'Las Vegas Vibe in Goa' },
  { name: '5-in-1 Beach Watersports', tag: 'Jet Ski & Parasailing' },
  { name: 'Goa Snow Park', tag: '-5°C Freezing Ice Slide' },
  { name: 'Catamaran Party Boat', tag: 'DJ Beats & Chilled Beer' }
];

export default function CinematicShowcaseSection() {
  const { cinematicData, openBookingModal } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoUrl = cinematicData?.videoUrl || '/gemini_generated_video_89554782.mp4';
  const activities = cinematicData?.activities?.slice(0, 8) || [
    'Scuba Diving at Grande Island',
    '55M Bungee Jump Mayem Lake',
    'Dudhsagar 4x4 Jeep Safari',
    'Mandovi Luxury Cruise'
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleScrollToTours = () => {
    const el = document.getElementById('tours');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 px-4 sm:px-8 bg-zinc-950 border-y border-amber-500/20 overflow-hidden z-10">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75 contrast-110"
        />
        {/* Dark Vignette Overlay Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-zinc-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/90" />
      </div>

      {/* Main Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Package Ticker */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
              <Film className="w-4 h-4 animate-pulse" />
              <span>{cinematicData?.badge || '4K CINEMATIC ADVENTURE SHOWCASE'}</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white font-serif tracking-tight leading-tight drop-shadow-2xl">
              {cinematicData?.title || 'All Goa Adventures In One Thrilling Shot'}
            </h2>

            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal max-w-xl text-shadow">
              {cinematicData?.subtitle || 'Feel the heartbeat of Goa! Watch our high-octane visual preview featuring deep-sea coral diving, 55-meter lake bungee jumping, 4x4 jungle jeep safaris, and starlight luxury river cruises.'}
            </p>

            {/* Quick Interactive Package Badges (Max 8) */}
            <div className="pt-2">
              <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider block mb-3">
                ⚡ Featured Included Activities (Max 8):
              </span>
              <div className="flex flex-wrap gap-2">
                {activities.map((actName, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950/80 hover:bg-amber-500 hover:text-zinc-950 border border-zinc-700/80 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-200 transition duration-300 backdrop-blur-md flex items-center space-x-1.5 cursor-pointer shadow-lg"
                    onClick={handleScrollToTours}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 group-hover:text-zinc-950" />
                    <span>{actName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTAs & Video Controls */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleScrollToTours}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/30 transition transform hover:scale-105 flex items-center space-x-2"
              >
                <span>EXPLORE ALL 12 PACKAGES</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => openBookingModal()}
                className="px-6 py-4 rounded-xl bg-zinc-900/90 border border-zinc-700 hover:border-amber-400 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md hover:bg-zinc-900 transition flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>BOOK YOUR SLOT NOW</span>
              </button>
            </div>
          </div>

          {/* Right Floating Stats & Player Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Video Player Control Card */}
            <div className="bg-zinc-950/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                    GOA TRAILER PREVIEW
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 transition"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 transition"
                    title={isPlaying ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Stat Counters Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-2xl font-black text-amber-400 block">12+</span>
                  <span className="text-[11px] text-zinc-300 font-bold uppercase">Extreme Packages</span>
                  <p className="text-[10px] text-zinc-500">Scuba, Bungee, Safaris & Cruises</p>
                </div>

                <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-2xl font-black text-amber-400 block">50k+</span>
                  <span className="text-[11px] text-zinc-300 font-bold uppercase">Satisfied Guests</span>
                  <p className="text-[10px] text-zinc-500">Verified 4.9★ Guest Reviews</p>
                </div>

                <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-2xl font-black text-emerald-400 block">100%</span>
                  <span className="text-[11px] text-zinc-300 font-bold uppercase">Safety Record</span>
                  <p className="text-[10px] text-zinc-500">Certified PADI & SANZ Standards</p>
                </div>

                <div className="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-2xl font-black text-amber-400 block">₹0</span>
                  <span className="text-[11px] text-zinc-300 font-bold uppercase">Hidden Fees</span>
                  <p className="text-[10px] text-zinc-500">Free Hotel Pickup & Drop</p>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-zinc-400 flex items-center justify-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Goa Tourism Authorized & Certified Direct Operator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
