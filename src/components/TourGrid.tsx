'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import TourCard from './TourCard';
import { Sparkles, Search, Compass } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Packages' },
  { id: 'scuba', label: 'Scuba & Watersports' },
  { id: 'sightseeing', label: 'Tours & Safaris' },
  { id: 'cruise', label: 'Cruises & Party Boats' },
  { id: 'extreme', label: 'Bungee & Flyboarding' }
];

export default function TourGrid() {
  const { tours } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.placesCovered.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'scuba')
      return tour.id.includes('scuba') || tour.id.includes('water-sports') || tour.id.includes('snorkeling') || tour.id.includes('flyboard');
    if (selectedCategory === 'sightseeing')
      return tour.id.includes('tour') || tour.id.includes('dudhsagar') || tour.id.includes('amboli') || tour.id.includes('boating');
    if (selectedCategory === 'cruise')
      return tour.id.includes('cruise') || tour.id.includes('casino') || tour.id.includes('party');
    if (selectedCategory === 'extreme')
      return tour.id.includes('bungee') || tour.id.includes('snow') || tour.id.includes('flyboard');

    return true;
  });

  return (
    <section id="tours" className="py-20 px-4 sm:px-8 bg-zinc-950 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>EXPLORE GOA ADVENTURES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
            Our Top Recommended Packages
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select from our top-rated Goa adventure tours. Every package includes pickup, entry fees, guidance, certified gear & best price guarantee!
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tours, places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-xs text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none transition"
            />
          </div>
        </div>

        {/* Tour Grid (12 Items) */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No tours found</h3>
            <p className="text-sm text-zinc-400 mt-1">Try adjusting your category or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-zinc-950 font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
