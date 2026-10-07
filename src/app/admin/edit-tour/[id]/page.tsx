'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Tour, ItineraryItem } from '@/types';
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';

export default function DedicatedEditTourPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params?.id as string;
  const isNew = tourId === 'new';

  const { tours, addTour, updateTour } = useApp();

  // Authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState<number>(1499);
  const [originalPrice, setOriginalPrice] = useState<number>(2200);
  const [discount, setDiscount] = useState('32% OFF');
  const [duration, setDuration] = useState('Full Day (8:30 AM - 5:30 PM)');
  const [rating, setRating] = useState<number>(4.9);
  const [reviewCount, setReviewCount] = useState<number>(128);
  const [heroMedia, setHeroMedia] = useState('');
  const [thumb1, setThumb1] = useState('');
  const [thumb2, setThumb2] = useState('');
  const [thumb3, setThumb3] = useState('');
  const [description, setDescription] = useState('');
  const [placesCovered, setPlacesCovered] = useState('');
  const [tourRoute, setTourRoute] = useState('');
  const [timings, setTimings] = useState('8:30 AM to 5:30 PM (Daily)');
  const [inclusions, setInclusions] = useState('');
  const [exclusions, setExclusions] = useState('');
  const [mediaGalleryStr, setMediaGalleryStr] = useState('');
  const [videosStr, setVideosStr] = useState('');
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('goa_admin_token');
      if (token === 'VALID_SECURE_ADMIN_SESSION_2026') {
        setIsAuthenticated(true);
      } else {
        router.push('/admin');
      }
    } catch (e) {
      console.error(e);
      router.push('/admin');
    }
  }, [router]);

  // Load existing tour data if editing
  useEffect(() => {
    if (!isNew && tourId && tours.length > 0) {
      const existing = tours.find((t) => t.id === tourId || t.slug === tourId);
      if (existing) {
        setTitle(existing.title || '');
        setSlug(existing.slug || '');
        setTagline(existing.tagline || '');
        setPrice(existing.price || 1499);
        setOriginalPrice(existing.originalPrice || 2200);
        setDiscount(existing.discount || '');
        setDuration(existing.duration || '');
        setRating(existing.rating || 4.9);
        setReviewCount(existing.reviewCount || 128);
        setHeroMedia(existing.heroMedia || '');
        setThumb1(existing.thumbnails?.[0] || '');
        setThumb2(existing.thumbnails?.[1] || '');
        setThumb3(existing.thumbnails?.[2] || '');
        setDescription(existing.description || '');
        setPlacesCovered(existing.placesCovered?.join(', ') || '');
        setTourRoute(existing.tourRoute || '');
        setTimings(existing.timings || '');
        setInclusions(existing.inclusions?.join('\n') || '');
        setExclusions(existing.exclusions?.join('\n') || '');
        setMediaGalleryStr(existing.mediaGallery?.join('\n') || '');
        setVideosStr(existing.videos?.join('\n') || '');
        setItinerary(existing.itinerary || []);
        setIsFeatured(!!existing.isFeatured);
      }
    }
  }, [tourId, isNew, tours]);

  // Image / Video File Upload helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setter(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Itinerary Step Actions
  const addItineraryStep = () => {
    setItinerary([
      ...itinerary,
      {
        id: `step-${Date.now()}`,
        time: '09:00 AM',
        title: 'New Activity Step',
        description: 'Describe the activity details here.',
        photo: ''
      }
    ]);
  };

  const updateItineraryStep = (id: string | undefined, index: number, field: keyof ItineraryItem, val: string) => {
    const copy = [...itinerary];
    if (copy[index]) {
      copy[index] = { ...copy[index], [field]: val };
      setItinerary(copy);
    }
  };

  const removeItineraryStep = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  // Form Submit Handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);

    const generatedSlug =
      slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
      title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const tourData: Omit<Tour, 'id'> = {
      slug: generatedSlug,
      title: title.trim(),
      tagline: tagline.trim(),
      price: Number(price),
      originalPrice: Number(originalPrice),
      discount: discount.trim(),
      duration: duration.trim(),
      rating: Number(rating),
      reviewCount: Number(reviewCount),
      heroMedia: heroMedia.trim(),
      thumbnails: [thumb1.trim(), thumb2.trim(), thumb3.trim()],
      description: description.trim(),
      placesCovered: placesCovered
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
      tourRoute: tourRoute.trim(),
      timings: timings.trim(),
      inclusions: inclusions
        .split('\n')
        .map((i) => i.trim())
        .filter(Boolean),
      exclusions: exclusions
        .split('\n')
        .map((e) => e.trim())
        .filter(Boolean),
      mediaGallery: mediaGalleryStr
        .split('\n')
        .map((m) => m.trim())
        .filter(Boolean),
      videos: videosStr
        .split('\n')
        .map((v) => v.trim())
        .filter(Boolean),
      itinerary,
      isFeatured
    };

    if (isNew) {
      addTour(tourData);
    } else {
      updateTour(tourId, tourData);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-400 text-sm">
        Authenticating Admin Portal...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-24">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition flex items-center space-x-2 border border-zinc-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Panel</span>
            </Link>

            <div>
              <h1 className="text-lg font-black text-white font-serif">
                {isNew ? 'Create New Tour Package' : `Edit: ${title || 'Tour Package'}`}
              </h1>
              <p className="text-xs text-zinc-400">
                Full-Screen Dedicated Editor • Watch My Trip Adventure
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isNew && slug && (
              <Link
                href={`/tour/${slug}`}
                target="_blank"
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 border border-zinc-700"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Live Page</span>
              </Link>
            )}

            <button
              onClick={handleSave}
              type="button"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/25 flex items-center space-x-2 cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Package Details</span>
            </button>
          </div>
        </div>
      </header>

      {/* SAVE SUCCESS BANNER */}
      {saveSuccess && (
        <div className="bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 px-6 py-3 text-xs font-bold flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Tour package saved successfully! Changes are updated live across the website.</span>
          </div>
          <Link
            href="/admin"
            className="underline hover:text-white font-black"
          >
            Return to Admin List →
          </Link>
        </div>
      )}

      {/* MAIN CONTENT FORM */}
      <form onSubmit={handleSave} className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        
        {/* LEFT COLUMN: CORE DETAILS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white font-serif">1. Basic Tour Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-zinc-300 font-bold mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dudhsagar Waterfalls with Jungle Safari & Spice Plantation"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-bold focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">URL Slug (e.g. dudhsagar-jeep-safari)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Auto-generated if left blank"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Tagline / Brief Subtitle</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Jeep Safari Through Mollem National Park, Natural Swimming & Old Goa"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* PRICING & RATING */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-amber-400 font-bold mb-1">Offer Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-amber-500/40 rounded-xl px-3 py-2 text-amber-300 font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-400 font-mono text-base"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Discount Tag</label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="e.g. 32% OFF"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Duration Label</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Full Day (8:30 AM - 5:30 PM)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: DESCRIPTION & ROUTE */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white font-serif">2. Detailed Description & Timings</h2>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">Full Overview Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive description of the adventure tour package..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Places Covered (Comma Separated)</label>
                <input
                  type="text"
                  value={placesCovered}
                  onChange={(e) => setPlacesCovered(e.target.value)}
                  placeholder="Mollem National Park, Dudhsagar Waterfall, Spice Plantation, Old Goa Churches"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Operating Timings</label>
                <input
                  type="text"
                  value={timings}
                  onChange={(e) => setTimings(e.target.value)}
                  placeholder="8:30 AM to 5:30 PM (Daily)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">Tour Route / Pickup Details</label>
              <input
                type="text"
                value={tourRoute}
                onChange={(e) => setTourRoute(e.target.value)}
                placeholder="Pickup from Calangute, Baga, Candolim, Arpora & Panjim Main Highway"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* SECTION 3: INCLUSIONS & EXCLUSIONS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-serif border-b border-zinc-800 pb-3">
              3. Inclusions & Exclusions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-emerald-400 font-bold mb-1">
                  Inclusions (One item per line)
                </label>
                <textarea
                  rows={5}
                  value={inclusions}
                  onChange={(e) => setInclusions(e.target.value)}
                  placeholder={"Hotel Pickup & Drop\n4x4 Jeep Safari Ride\nSpice Plantation Buffet Lunch\nLife Jacket & Entry Fees"}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-200 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-red-400 font-bold mb-1">
                  Exclusions (One item per line)
                </label>
                <textarea
                  rows={5}
                  value={exclusions}
                  onChange={(e) => setExclusions(e.target.value)}
                  placeholder={"Personal Expenses\nExtra Food / Drinks\nCamera Fees"}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-200 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: UNLIMITED ITINERARY STEP BUILDER */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white font-serif">
                  4. Day & Time-wise Step-by-Step Itinerary ({itinerary.length} Steps)
                </h2>
                <p className="text-zinc-400 text-[11px]">
                  Build an interactive timeline guide for explorers booking this tour.
                </p>
              </div>

              <button
                type="button"
                onClick={addItineraryStep}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-4">
              {itinerary.length === 0 ? (
                <div className="text-center py-8 bg-zinc-950/60 rounded-2xl border border-dashed border-zinc-800 text-zinc-500">
                  No itinerary steps added yet. Click &quot;Add Step&quot; above to build the itinerary timeline!
                </div>
              ) : (
                itinerary.map((step, idx) => (
                  <div
                    key={step.id || idx}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                      <span className="font-mono text-amber-400 font-bold text-xs">
                        Step #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItineraryStep(idx)}
                        className="text-red-400 hover:text-red-300 font-bold text-xs flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Step</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-zinc-400 font-bold mb-1">Timing Tag</label>
                        <input
                          type="text"
                          value={step.time || ''}
                          onChange={(e) => updateItineraryStep(step.id, idx, 'time', e.target.value)}
                          placeholder="e.g. 08:30 AM"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-zinc-300 font-bold mb-1">Step Headline *</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateItineraryStep(step.id, idx, 'title', e.target.value)}
                          placeholder="e.g. Hotel Pickup & AC Coach Transfer"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-bold mb-1">Step Description</label>
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => updateItineraryStep(step.id, idx, 'description', e.target.value)}
                        placeholder="Explain what happens during this step..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-bold mb-1">Step Photo URL (Optional)</label>
                      <input
                        type="text"
                        value={step.photo || ''}
                        onChange={(e) => updateItineraryStep(step.id, idx, 'photo', e.target.value)}
                        placeholder="https://images.unsplash.com/photo..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: MEDIA & PREVIEWS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">

          {/* MAIN HERO MEDIA & LIVE PREVIEW */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-serif border-b border-zinc-800 pb-3">
              Hero Cover Media & Live Preview
            </h2>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">Main Cover Photo/Video URL</label>
              <input
                type="text"
                value={heroMedia}
                onChange={(e) => setHeroMedia(e.target.value)}
                placeholder="Enter URL"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white mb-2"
              />
              
              <label className="block text-zinc-400 text-[11px] mb-1">Or Upload Local Media File:</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => handleFileUpload(e, setHeroMedia)}
                className="w-full text-zinc-400 text-[11px]"
              />
            </div>

            {/* PREVIEW BOX */}
            <div className="h-48 rounded-2xl overflow-hidden relative border border-zinc-800 bg-zinc-950 shadow-inner">
              {heroMedia.endsWith('.mp4') || heroMedia.includes('video') ? (
                <video src={heroMedia} autoPlay loop muted className="w-full h-full object-cover" />
              ) : heroMedia ? (
                <img src={heroMedia} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 space-y-1">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-[11px]">No cover media uploaded</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                  ₹{price} <span className="line-through text-zinc-400 text-[9px] font-normal">₹{originalPrice}</span>
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-1">{title || 'Tour Title Preview'}</h3>
                <p className="text-[10px] text-zinc-300 line-clamp-1">{tagline || 'Tagline preview...'}</p>
              </div>
            </div>
          </div>

          {/* 3 THUMBNAILS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-serif border-b border-zinc-800 pb-3">
              Card Preview Thumbnails (3)
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-zinc-400 font-bold mb-1">Thumbnail #1 Photo/Video URL</label>
                <input
                  type="text"
                  value={thumb1}
                  onChange={(e) => setThumb1(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">Thumbnail #2 Photo/Video URL</label>
                <input
                  type="text"
                  value={thumb2}
                  onChange={(e) => setThumb2(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-bold mb-1">Thumbnail #3 Photo/Video URL</label>
                <input
                  type="text"
                  value={thumb3}
                  onChange={(e) => setThumb3(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* MEDIA GALLERIES */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-serif border-b border-zinc-800 pb-3">
              Photo & Video Galleries
            </h2>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                Photo Gallery URLs (One per line, up to 6)
              </label>
              <textarea
                rows={4}
                value={mediaGalleryStr}
                onChange={(e) => setMediaGalleryStr(e.target.value)}
                placeholder="https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-300 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">
                MP4 Video Gallery URLs (One per line)
              </label>
              <textarea
                rows={3}
                value={videosStr}
                onChange={(e) => setVideosStr(e.target.value)}
                placeholder="https://assets.mixkit.co/videos/...\nhttps://example.com/video2.mp4"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-300 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* FEATURED TOGGLE & SAVE CTA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500 bg-zinc-950 border-zinc-800"
              />
              <span className="text-xs font-bold text-white">
                Feature on Homepage Top Adventures Ticker
              </span>
            </label>

            <button
              onClick={handleSave}
              type="button"
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black rounded-2xl text-xs transition shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Tour Package Changes</span>
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}
