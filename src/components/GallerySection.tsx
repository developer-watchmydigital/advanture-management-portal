'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Eye, X, Camera } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GalleryItem } from '@/types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-south-goa',
    tourSlug: 'south-goa-tour',
    tourTitle: 'South Goa Sightseeing Tour',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    spanClass: 'md:col-span-2 md:row-span-2 h-[420px] md:h-full' // Large featured tile
  },
  {
    id: 'g-north-goa',
    tourSlug: 'north-goa-tour',
    tourTitle: 'North Goa Forts & Beaches',
    image: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-72'
  },
  {
    id: 'g-dudhsagar',
    tourSlug: 'dudhsagar-tour',
    tourTitle: 'Dudhsagar Waterfalls Jeep Safari',
    image: '/images/gallery/dudhsagar.jpg',
    spanClass: 'h-64 sm:h-72'
  },
  {
    id: 'g-amboli',
    tourSlug: 'amboli-tour',
    tourTitle: 'Amboli Waterfalls Eco Tour',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-72'
  },
  {
    id: 'g-dinner-cruise',
    tourSlug: 'dinner-cruise',
    tourTitle: 'Grand Mandovi Dinner Cruise',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-72'
  },
  {
    id: 'g-casino',
    tourSlug: 'casino-royale',
    tourTitle: 'Casino Royale Evening',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=800&auto=format&fit=crop',
    spanClass: 'md:col-span-2 h-64 sm:h-80'
  },
  {
    id: 'g-bungee',
    tourSlug: 'bungee-jumping',
    tourTitle: '55M High Bungee Jumping',
    image: '/images/bungee_banner.jpg',
    spanClass: 'h-64 sm:h-80'
  },
  {
    id: 'g-scuba',
    tourSlug: 'scuba-diving',
    tourTitle: 'Scuba Diving at Grande Island',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-80'
  },
  {
    id: 'g-scuba-combo',
    tourSlug: 'scuba-water-sports-combo',
    tourTitle: 'Scuba Diving + 5 Water Sports',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-80'
  },
  {
    id: 'g-snow-park',
    tourSlug: 'snow-park-goa',
    tourTitle: 'Goa Snow Park Sub-Zero World',
    image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-80'
  },
  {
    id: 'g-boat-party',
    tourSlug: 'adventure-boat-party',
    tourTitle: 'Adventure Boat Party with DJ',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop',
    spanClass: 'h-64 sm:h-80'
  },
  {
    id: 'g-water-sports',
    tourSlug: 'only-water-sports',
    tourTitle: '5-in-1 Water Sports Combo Pack',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    spanClass: 'md:col-span-2 h-64 sm:h-80'
  }
];

export default function GallerySection() {
  const { galleryItems: contextGalleryItems } = useApp();
  const items = contextGalleryItems && contextGalleryItems.length > 0 ? contextGalleryItems : GALLERY_ITEMS;

  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-20 bg-zinc-950 border-t border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-3">
            <Camera className="w-4 h-4" />
            <span>ADVENTURE VISUAL MOSAIC GALLERY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
            Goa Adventure Gallery
          </h2>
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm">
            Explore photos of all featured adventure packages. Click any picture to preview in full resolution.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Full-Bleed Edge-to-Edge Mosaic Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-amber-500/50 shadow-2xl group cursor-pointer transition-all duration-300 h-64 sm:h-72"
            >
              {/* Main Photo / Video */}
              {item.mediaType === 'video' ? (
                <video
                  src={item.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img
                  src={item.image}
                  alt={item.tourTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              )}

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Title Pill Overlay (Top Left) */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-zinc-950/80 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1 rounded-xl border border-zinc-800/80">
                  {item.tourTitle}
                </span>
              </div>

              {/* Center Hover Zoom Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-2xl">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 9 Photos Per Page Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-bold"
            >
              Previous
            </button>
            <div className="flex items-center space-x-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-black transition border ${
                    currentPage === pageNum
                      ? 'bg-amber-500 border-amber-400 text-zinc-950 shadow-lg shadow-amber-500/30'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs font-bold"
            >
              Next
            </button>
          </div>
        )}

        {/* End of Photos Section CTAs (ONLY WhatsApp and Call - NO Book Button) */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-800 backdrop-blur-md">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              Ready for Your Ultimate Goa Adventure?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Contact our team directly on WhatsApp or phone for instant inquiries & customized pickup scheduling!
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919588667027?text=Hi%20Goa%20Adventures,%20I%20saw%20your%20photo%20gallery%20and%20want%20to%20inquire%20about%20packages"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs tracking-wider uppercase transition shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>

            {/* Call CTA */}
            <a
              href="tel:+919588667027"
              className="flex-1 sm:flex-none px-7 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-400 hover:text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 w-full bg-zinc-950">
              <img
                src={activeItem.image}
                alt={activeItem.tourTitle}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/80 hover:bg-amber-500 hover:text-zinc-950 text-white flex items-center justify-center transition border border-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">{activeItem.tourTitle}</h3>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`https://wa.me/919588667027?text=Hi,%20I%20want%20to%20inquire%20about%20${encodeURIComponent(activeItem.tourTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919588667027"
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-amber-400 hover:text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
