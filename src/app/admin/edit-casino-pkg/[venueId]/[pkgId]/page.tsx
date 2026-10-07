'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CasinoTierPackage, CasinoDrinkCategory } from '@/types';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  DollarSign,
  Wine,
  GlassWater,
  Image as ImageIcon,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function DedicatedEditCasinoPkgPage() {
  const router = useRouter();
  const params = useParams();
  const venueId = params?.venueId as string;
  const pkgId = params?.pkgId as string;
  const isNew = pkgId === 'new';

  const { casinoVenues, updateCasinoVenue } = useApp();

  // Active Venue
  const activeVenue = casinoVenues.find((v) => v.id === venueId) || casinoVenues[0];

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(4400);
  const [originalPrice, setOriginalPrice] = useState<number>(4500);
  const [otpcWorth, setOtpcWorth] = useState<number>(2000);
  const [liquorTypeLabel, setLiquorTypeLabel] = useState('');
  const [accessTagsStr, setAccessTagsStr] = useState('Vegas, Sky Bar');
  const [ageRange, setAgeRange] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [drinkCategories, setDrinkCategories] = useState<CasinoDrinkCategory[]>([]);

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

  // Load existing package details
  useEffect(() => {
    if (!isNew && pkgId && activeVenue) {
      const existing = activeVenue.packages.find((p) => p.id === pkgId);
      if (existing) {
        setName(existing.name || '');
        setPrice(existing.price || 4400);
        setOriginalPrice(existing.originalPrice || 4500);
        setOtpcWorth(existing.otpcWorth || 2000);
        setLiquorTypeLabel(existing.liquorTypeLabel || '');
        setAccessTagsStr(existing.accessTags?.join(', ') || '');
        setAgeRange(existing.ageRange || '');
        setNote(existing.note || '');
        setImage(existing.image || '');
        setDrinkCategories(existing.drinkCategories || []);
      }
    }
  }, [pkgId, isNew, activeVenue]);

  // Image Upload helper
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

  // Drink Category Handlers
  const addDrinkCategory = () => {
    setDrinkCategories([
      ...drinkCategories,
      {
        category: 'NEW CATEGORY (e.g. WHISKEY)',
        items: ['Brand 1', 'Brand 2']
      }
    ]);
  };

  const updateDrinkCategoryName = (idx: number, categoryName: string) => {
    const copy = [...drinkCategories];
    if (copy[idx]) {
      copy[idx].category = categoryName;
      setDrinkCategories(copy);
    }
  };

  const updateDrinkCategoryItems = (idx: number, commaSeparatedItems: string) => {
    const copy = [...drinkCategories];
    if (copy[idx]) {
      copy[idx].items = commaSeparatedItems
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean);
      setDrinkCategories(copy);
    }
  };

  const removeDrinkCategory = (idx: number) => {
    setDrinkCategories(drinkCategories.filter((_, i) => i !== idx));
  };

  // Save Handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVenue) return;

    setSaveSuccess(false);

    const accessTags = accessTagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedPkg: CasinoTierPackage = {
      id: isNew ? `pkg-${Date.now()}` : pkgId,
      name: name.trim(),
      price: Number(price),
      originalPrice: Number(originalPrice),
      otpcWorth: Number(otpcWorth),
      liquorTypeLabel: liquorTypeLabel.trim(),
      drinkCategories,
      accessTags,
      ageRange: ageRange.trim(),
      note: note.trim(),
      image: image.trim()
    };

    let newPackagesList = [...activeVenue.packages];
    if (isNew) {
      newPackagesList.push(updatedPkg);
    } else {
      newPackagesList = newPackagesList.map((p) => (p.id === pkgId ? updatedPkg : p));
    }

    updateCasinoVenue(activeVenue.id, { packages: newPackagesList });

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
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase border border-amber-500/30">
                  {activeVenue?.name || 'Casino Vessel'}
                </span>
                <h1 className="text-lg font-black text-white font-serif">
                  {isNew ? 'Create New Casino Tariff Package' : `Edit: ${name || 'Tariff Package'}`}
                </h1>
              </div>
              <p className="text-xs text-zinc-400">
                Full-Screen Casino CMS Editor • Watch My Trip VIP Offshore Casino
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            type="button"
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/25 flex items-center space-x-2 cursor-pointer uppercase tracking-wider active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Casino Package</span>
          </button>
        </div>
      </header>

      {/* SAVE SUCCESS BANNER */}
      {saveSuccess && (
        <div className="bg-emerald-500/20 border-b border-emerald-500/40 text-emerald-300 px-6 py-3 text-xs font-bold flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Casino tariff package saved successfully! Changes are updated live on the website.</span>
          </div>
          <Link href="/admin" className="underline hover:text-white font-black">
            Return to Admin List →
          </Link>
        </div>
      )}

      {/* MAIN CONTENT FORM */}
      <form onSubmit={handleSave} className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        
        {/* LEFT COLUMN: CORE TARIFF DETAILS (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1: BASIC TARIFF DETAILS */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white font-serif">1. Tariff Package Basics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CLASSIC package or ELITE package"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-amber-400 font-bold mb-1">Liquor Type Header Label *</label>
                <input
                  type="text"
                  required
                  value={liquorTypeLabel}
                  onChange={(e) => setLiquorTypeLabel(e.target.value)}
                  placeholder="e.g. UNLIMITED HOUSE BRAND LIQUOR"
                  className="w-full bg-zinc-950 border border-amber-500/30 rounded-xl px-3 py-2 text-amber-300 font-bold"
                />
              </div>
            </div>

            {/* PRICING & OTPC */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-amber-400 font-bold mb-1">Package Price (₹) *</label>
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
                <label className="block text-amber-400 font-bold mb-1">OTPC Chip Value (₹)</label>
                <input
                  type="number"
                  value={otpcWorth}
                  onChange={(e) => setOtpcWorth(Number(e.target.value))}
                  placeholder="e.g. 2000"
                  className="w-full bg-zinc-950 border border-amber-500/40 rounded-xl px-3 py-2 text-amber-300 font-mono text-base font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Access Decks (Comma Separated)</label>
                <input
                  type="text"
                  value={accessTagsStr}
                  onChange={(e) => setAccessTagsStr(e.target.value)}
                  placeholder="Vegas, Sky Bar, VIP Lounge"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Age Range / Restriction</label>
                <input
                  type="text"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  placeholder="e.g. 21+ Adults Only or 5 yrs - 11 yrs"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">Package Note / Fine Print</label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Governed by vessel management dress code & ID proof mandatory"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white"
              />
            </div>
          </div>

          {/* SECTION 2: COVER PHOTO */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white font-serif border-b border-zinc-800 pb-3">
              Package Image & Banner
            </h2>

            <div>
              <label className="block text-zinc-300 font-bold mb-1">Package Banner Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter URL"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white mb-2"
              />
              
              <label className="block text-zinc-400 text-[11px] mb-1">Or Upload Local Image File:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, setImage)}
                className="w-full text-zinc-400 text-[11px]"
              />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DRINK CATEGORIES & MENU BUILDER (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">

          {/* DRINK CATEGORIES BUILDER */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Wine className="w-4 h-4 text-amber-400" />
                  <h2 className="text-base font-bold text-white font-serif">
                    Included Drinks & Brands ({drinkCategories.length})
                  </h2>
                </div>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Organize liquor & beverage brands by category.
                </p>
              </div>

              <button
                type="button"
                onClick={addDrinkCategory}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl text-xs flex items-center space-x-1 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="space-y-4">
              {drinkCategories.length === 0 ? (
                <div className="text-center py-8 bg-zinc-950/60 rounded-2xl border border-dashed border-zinc-800 text-zinc-500">
                  No drink categories added yet. Click &quot;Add Category&quot; above to list included beverages!
                </div>
              ) : (
                drinkCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                      <span className="font-mono text-amber-400 font-bold text-xs">
                        Category #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDrinkCategory(idx)}
                        className="text-red-400 hover:text-red-300 font-bold text-xs flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-bold mb-1">Category Title</label>
                      <input
                        type="text"
                        value={cat.category}
                        onChange={(e) => updateDrinkCategoryName(idx, e.target.value)}
                        placeholder="e.g. WHISKEY, VODKA, BEER"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-bold mb-1">
                        Brand Items (Comma Separated)
                      </label>
                      <textarea
                        rows={2}
                        value={cat.items?.join(', ') || ''}
                        onChange={(e) => updateDrinkCategoryItems(idx, e.target.value)}
                        placeholder="e.g. Teacher's, 100 Pipers, Absolut, Smirnoff, Bacardi"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-zinc-200"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* LIVE TARIFF CARD PREVIEW */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              Live Tariff Card Preview
            </h3>

            <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-black text-white uppercase">{name || 'PACKAGE NAME'}</h4>
                  <span className="text-xs text-amber-400 font-medium block">
                    {liquorTypeLabel || 'UNLIMITED LIQUOR'}
                  </span>
                </div>
                <span className="text-lg font-black text-white bg-zinc-950 px-3 py-1 rounded-xl border border-zinc-800">
                  ₹{price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-bold">
                  {otpcWorth > 0 ? `OTPC Chip Included: ₹${otpcWorth.toLocaleString('en-IN')}` : 'No OTPC Included'}
                </span>
              </div>

              <div className="text-[11px] text-zinc-400 space-y-1 pt-2 border-t border-zinc-800">
                <div><strong>Vessel:</strong> {activeVenue?.name}</div>
                <div><strong>Categories:</strong> {drinkCategories.length} listed</div>
              </div>
            </div>

            <button
              onClick={handleSave}
              type="button"
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black rounded-2xl text-xs transition shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Casino Package</span>
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}
