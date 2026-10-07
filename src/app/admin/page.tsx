'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Tour, Booking, HeroSlide, GalleryItem, CasinoVenue, CasinoTierPackage, AppUser, LoginLog } from '@/types';
import {
  Lock,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowLeft,
  Package,
  Star,
  Calendar,
  Sparkles,
  RefreshCw,
  LogOut,
  Save,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Clock,
  Check,
  AlertCircle,
  Film,
  Camera,
  LayoutDashboard,
  Upload,
  ExternalLink,
  ChevronRight,
  Sliders,
  Filter,
  Users,
  Phone,
  MessageCircle,
  MapPin,
  Image as ImageIcon,
  Video as VideoIcon,
  Ticket,
  CircleDollarSign,
  Wine,
  Utensils
} from 'lucide-react';

export default function AdminPage() {
  const {
    tours,
    reviews,
    bookings,
    heroSlides,
    cinematicData,
    galleryItems,
    casinoVenues,
    reviewVideoUrl,
    addTour,
    updateTour,
    deleteTour,
    approveReview,
    deleteReview,
    updateReviewVideo,
    updateBookingStatus,
    confirmBookingWithDetails,
    refreshBookingsFromDB,
    updateHeroSlide,
    updateCinematicData,
    addGalleryItem,
    deleteGalleryItem,
    addCasinoVenue,
    updateCasinoVenue,
    deleteCasinoVenue
  } = useApp();

  // Authentication State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [heroSaveMessage, setHeroSaveMessage] = useState<string | null>(null);
  const [cinematicSaveMessage, setCinematicSaveMessage] = useState<string | null>(null);

  // Mobile Navigation Sidebar Drawer State
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'hero' | 'cinematic' | 'tours' | 'casino' | 'gallery' | 'reviews' | 'users'
  >('dashboard');

  // User Logins & Logs State
  const [registeredUsers, setRegisteredUsers] = useState<AppUser[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const u = JSON.parse(localStorage.getItem('goa_all_users') || '[]');
        setRegisteredUsers(u);
        const l = JSON.parse(localStorage.getItem('goa_login_logs') || '[]');
        setLoginLogs(l);
      } catch (e) {
        console.error(e);
      }
    }
  }, [activeTab]);


  // Date Filter State for Dashboard Analytics
  const [datePreset, setDatePreset] = useState<'today' | '7days' | 'thisMonth' | 'all' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Lead Booking Confirmation Modal State
  const [bookingModalLead, setBookingModalLead] = useState<Booking | null>(null);
  const [modalAmount, setModalAmount] = useState<number>(1499);
  const [modalPaymentMode, setModalPaymentMode] = useState<'cod' | 'prepaid' | 'advance_30'>('cod');
  const [modalStatus, setModalStatus] = useState<Booking['status']>('booked');


  // Tour Package Edit Modal State
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState(1499);
  const [formOriginalPrice, setFormOriginalPrice] = useState(2200);
  const [formDiscount, setFormDiscount] = useState('32% OFF');
  const [formDuration, setFormDuration] = useState('Full Day (8:30 AM - 5:30 PM)');
  const [formHeroMedia, setFormHeroMedia] = useState('');
  const [formThumb1, setFormThumb1] = useState('');
  const [formThumb2, setFormThumb2] = useState('');
  const [formThumb3, setFormThumb3] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPlaces, setFormPlaces] = useState('');
  const [formRoute, setFormRoute] = useState('');
  const [formTimings, setFormTimings] = useState('');
  const [formInclusions, setFormInclusions] = useState('');
  const [formMediaGallery, setFormMediaGallery] = useState<string[]>([]);
  const [formVideos, setFormVideos] = useState<string[]>([]);
  const [formItinerary, setFormItinerary] = useState<
    { id: string; time: string; title: string; description: string; photo: string }[]
  >([]);

  // Gallery Upload State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryMediaUrl, setNewGalleryMediaUrl] = useState('');
  const [newGalleryMediaType, setNewGalleryMediaType] = useState<'image' | 'video'>('image');

  // Casino Tariff Management State
  const [selectedCasinoAdminVenueId, setSelectedCasinoAdminVenueId] = useState<string>('deltin-royale');
  const [isCasinoPkgModalOpen, setIsCasinoPkgModalOpen] = useState(false);
  const [editingCasinoPkgId, setEditingCasinoPkgId] = useState<string | null>(null);

  const [pkgFormName, setPkgFormName] = useState('');
  const [pkgFormPrice, setPkgFormPrice] = useState<number>(4400);
  const [pkgFormOriginalPrice, setPkgFormOriginalPrice] = useState<number>(4500);
  const [pkgFormOtpc, setPkgFormOtpc] = useState<number>(2000);
  const [pkgFormLiquorLabel, setPkgFormLiquorLabel] = useState('');
  const [pkgFormAccessTags, setPkgFormAccessTags] = useState('Vegas, Sky Bar');
  const [pkgFormAgeRange, setPkgFormAgeRange] = useState('');
  const [pkgFormImage, setPkgFormImage] = useState('');
  const [pkgFormDrinkCategories, setPkgFormDrinkCategories] = useState<
    { category: string; itemsString: string }[]
  >([]);

  // Venue Header Edit State
  const [isVenueEditOpen, setIsVenueEditOpen] = useState(false);
  const [venueFormName, setVenueFormName] = useState('');
  const [venueFormLocation, setVenueFormLocation] = useState('');
  const [venueFormEffectiveDate, setVenueFormEffectiveDate] = useState('');
  const [venueFormTagline, setVenueFormTagline] = useState('');
  const [venueFormImage, setVenueFormImage] = useState('');

  // Load Auth from sessionStorage
  useEffect(() => {
    try {
      const token = sessionStorage.getItem('goa_admin_token');
      if (token === 'VALID_SECURE_ADMIN_SESSION_2026') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Secret Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (username.trim() === 'admin' && password === 'GoaAdventure2026!Secret#') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('goa_admin_token', 'VALID_SECURE_ADMIN_SESSION_2026');
      } catch (err) {
        console.error(err);
      }
    } else {
      setLoginError('Invalid secret credentials! Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('goa_admin_token');
    } catch (e) {
      console.error(e);
    }
  };

  // Helper: File to Base64 DataURL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dashboard Date Filtered Analytics
  const filteredBookings = useMemo(() => {
    const now = new Date();
    return bookings.filter((b) => {
      if (!b.createdAt) return true;
      const bDate = new Date(b.createdAt);
      if (datePreset === 'today') {
        return bDate.toDateString() === now.toDateString();
      }
      if (datePreset === '7days') {
        const diffDays = (now.getTime() - bDate.getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
      }
      if (datePreset === 'thisMonth') {
        return bDate.getMonth() === now.getMonth() && bDate.getFullYear() === now.getFullYear();
      }
      if (datePreset === 'custom') {
        if (customStartDate && new Date(b.createdAt) < new Date(customStartDate)) return false;
        if (customEndDate && new Date(b.createdAt) > new Date(customEndDate + 'T23:59:59')) return false;
        return true;
      }
      return true; // all
    });
  }, [bookings, datePreset, customStartDate, customEndDate]);

  // Financial KPI calculations
  const totalRevenue = useMemo(() => {
    return filteredBookings
      .filter((b) => b.status !== 'cancelled' && b.status !== 'refunded')
      .reduce((sum, b) => {
        if (b.paymentMode === 'prepaid') return sum + (b.amount || 0);
        if (b.paymentMode === 'advance_30') return sum + (b.advancePaid || Math.round((b.amount || 0) * 0.3));
        return sum;
      }, 0);
  }, [filteredBookings]);

  const pendingCodAmount = useMemo(() => {
    return filteredBookings
      .filter((b) => b.status !== 'cancelled' && b.status !== 'refunded')
      .reduce((sum, b) => {
        if (b.paymentMode === 'cod') return sum + (b.amount || 0);
        if (b.paymentMode === 'advance_30') return sum + (b.balanceDue ?? Math.round((b.amount || 0) * 0.7));
        return sum;
      }, 0);
  }, [filteredBookings]);

  const cancelledBookingsCount = useMemo(() => {
    return filteredBookings.filter((b) => b.status === 'cancelled').length;
  }, [filteredBookings]);

  const totalLeadsCount = filteredBookings.length;

  // Open Confirm Booked Modal
  const openConfirmBookedModal = (lead: Booking) => {
    setBookingModalLead(lead);
    setModalAmount(lead.amount || 1499);
    setModalPaymentMode(lead.paymentMode || 'cod');
    setModalStatus(lead.status || 'booked');
  };

  const handleSaveBookingModal = () => {
    if (!bookingModalLead) return;
    confirmBookingWithDetails(bookingModalLead.id, {
      amount: Number(modalAmount),
      paymentMode: modalPaymentMode,
      status: modalStatus
    });
    setBookingModalLead(null);
  };


  // Tour Package Edit Helpers
  const openNewTourModal = () => {
    setEditingTourId(null);
    setFormTitle('');
    setFormTagline('');
    setFormPrice(1499);
    setFormOriginalPrice(2200);
    setFormDiscount('32% OFF');
    setFormDuration('Full Day (8:30 AM - 5:30 PM)');
    setFormHeroMedia('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop');
    setFormThumb1('https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop');
    setFormThumb2('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop');
    setFormThumb3('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop');
    setFormDescription('Exciting adventure tour package in Goa.');
    setFormPlaces('Calangute, Baga, Grande Island');
    setFormRoute('Hotel Pickup -> Activity Zone -> Return');
    setFormTimings('08:30 AM Pickup | 05:30 PM Drop');
    setFormInclusions('AC Pickup & Drop, Equipment, Guide, Lunch');
    setFormMediaGallery([]);
    setFormVideos(['/gemini_generated_video_89554782.mp4']);
    setFormItinerary([
      {
        id: 'it-1',
        time: '08:30 AM',
        title: 'Hotel Pickup & Transfer',
        description: 'Pick up from North Goa hotel in AC coach.',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop'
      },
      {
        id: 'it-2',
        time: '10:30 AM',
        title: 'Main Adventure Experience',
        description: 'Guided scuba diving session with certified instructors.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop'
      }
    ]);
    setIsTourModalOpen(true);
  };

  const openEditTourModal = (tour: Tour) => {
    setEditingTourId(tour.id);
    setFormTitle(tour.title);
    setFormTagline(tour.tagline);
    setFormPrice(tour.price);
    setFormOriginalPrice(tour.originalPrice);
    setFormDiscount(tour.discount);
    setFormDuration(tour.duration);
    setFormHeroMedia(tour.heroMedia);
    setFormThumb1(tour.thumbnails[0] || '');
    setFormThumb2(tour.thumbnails[1] || '');
    setFormThumb3(tour.thumbnails[2] || '');
    setFormDescription(tour.description);
    setFormPlaces(tour.placesCovered.join(', '));
    setFormRoute(tour.tourRoute);
    setFormTimings(tour.timings);
    setFormInclusions(tour.inclusions.join(', '));
    setFormMediaGallery(tour.mediaGallery || []);
    setFormVideos(tour.videos || ['/gemini_generated_video_89554782.mp4']);
    setFormItinerary(
      tour.itinerary.map((item, idx) => ({
        id: item.id || `it-${idx}`,
        time: item.time || '',
        title: item.title,
        description: item.description,
        photo: item.photo || ''
      }))
    );
    setIsTourModalOpen(true);
  };

  const handleSaveTour = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const placesArray = formPlaces.split(',').map((p) => p.trim()).filter(Boolean);
    const inclusionsArray = formInclusions.split(',').map((i) => i.trim()).filter(Boolean);

    const tourData = {
      slug: slug || `tour-${Date.now()}`,
      title: formTitle,
      tagline: formTagline,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      discount: formDiscount,
      duration: formDuration,
      rating: 4.9,
      reviewCount: 150,
      heroMedia: formHeroMedia,
      thumbnails: [formThumb1, formThumb2, formThumb3] as [string, string, string],
      mediaGallery: formMediaGallery.slice(0, 6),
      videos: formVideos,
      description: formDescription,
      placesCovered: placesArray.length > 0 ? placesArray : ['Goa Spot'],
      tourRoute: formRoute,
      timings: formTimings,
      inclusions: inclusionsArray.length > 0 ? inclusionsArray : ['Pickup & Drop', 'Guide'],
      exclusions: ['Personal Expenses'],
      itinerary: formItinerary.map((it) => ({
        id: it.id,
        time: it.time,
        title: it.title,
        description: it.description,
        photo: it.photo
      }))
    };

    if (editingTourId) {
      updateTour(editingTourId, tourData);
    } else {
      addTour(tourData);
    }

    setIsTourModalOpen(false);
  };

  // Add Itinerary Step
  const addItineraryStep = () => {
    setFormItinerary([
      ...formItinerary,
      {
        id: `it-${Date.now()}`,
        time: '12:00 PM',
        title: 'New Activity Step',
        description: 'Step description details.',
        photo: ''
      }
    ]);
  };

  const removeItineraryStep = (id: string) => {
    setFormItinerary(formItinerary.filter((it) => it.id !== id));
  };

  // Add Gallery Item
  const handleAddGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryMediaUrl) return;
    addGalleryItem({
      tourSlug: 'goa-adventure',
      tourTitle: newGalleryTitle || 'Goa Visual Adventure',
      image: newGalleryMediaUrl,
      mediaType: newGalleryMediaType,
      spanClass: 'h-64 sm:h-72'
    });
    setNewGalleryTitle('');
    setNewGalleryMediaUrl('');
  };

  // Activities Ticker Manager (Max 8)
  const addActivityTicker = () => {
    if (cinematicData.activities.length >= 8) {
      alert('Maximum 8 included activities allowed for cinematic ticker!');
      return;
    }
    updateCinematicData({
      activities: [...cinematicData.activities, 'New Adventure Activity']
    });
  };

  const removeActivityTicker = (idx: number) => {
    const updated = [...cinematicData.activities];
    updated.splice(idx, 1);
    updateCinematicData({ activities: updated });
  };

  const updateActivityTicker = (idx: number, val: string) => {
    const updated = [...cinematicData.activities];
    updated[idx] = val;
    updateCinematicData({ activities: updated });
  };

  // Casino Management Helpers
  const activeAdminVenue = casinoVenues.find(v => v.id === selectedCasinoAdminVenueId) || casinoVenues[0];

  const openNewCasinoPkgModal = () => {
    setEditingCasinoPkgId(null);
    setPkgFormName('NEW TARIFF PACKAGE');
    setPkgFormPrice(3500);
    setPkgFormOriginalPrice(3800);
    setPkgFormOtpc(1500);
    setPkgFormLiquorLabel('UNLIMITED IMFL & HOUSE LIQUOR');
    setPkgFormAccessTags('Vegas, Sky Bar');
    setPkgFormAgeRange('');
    setPkgFormImage('https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=800&auto=format&fit=crop');
    setPkgFormDrinkCategories([
      { category: 'WHISKEY', itemsString: 'Blenders Pride, Signature, Royal Challenge' },
      { category: 'VODKA', itemsString: 'Magic Moments, Smirnoff' },
      { category: 'BEER', itemsString: 'Kingfisher Premium Pint' }
    ]);
    setIsCasinoPkgModalOpen(true);
  };

  const openEditCasinoPkgModal = (pkg: CasinoTierPackage) => {
    setEditingCasinoPkgId(pkg.id);
    setPkgFormName(pkg.name);
    setPkgFormPrice(pkg.price);
    setPkgFormOriginalPrice(pkg.originalPrice || pkg.price);
    setPkgFormOtpc(pkg.otpcWorth);
    setPkgFormLiquorLabel(pkg.liquorTypeLabel);
    setPkgFormAccessTags(pkg.accessTags ? pkg.accessTags.join(', ') : 'Vegas, Sky Bar');
    setPkgFormAgeRange(pkg.ageRange || '');
    setPkgFormImage(pkg.image || activeAdminVenue?.image || '');
    setPkgFormDrinkCategories(
      pkg.drinkCategories ? pkg.drinkCategories.map(c => ({ category: c.category, itemsString: c.items.join(', ') })) : []
    );
    setIsCasinoPkgModalOpen(true);
  };

  const handleSaveCasinoPkg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAdminVenue) return;

    const accessTagsArray = pkgFormAccessTags.split(',').map(s => s.trim()).filter(Boolean);
    const drinkCategoriesArray = pkgFormDrinkCategories.map(c => ({
      category: c.category.toUpperCase(),
      items: c.itemsString.split(',').map(i => i.trim()).filter(Boolean)
    }));

    const newPkg: CasinoTierPackage = {
      id: editingCasinoPkgId || `pkg-${Date.now()}`,
      name: pkgFormName,
      price: Number(pkgFormPrice),
      originalPrice: Number(pkgFormOriginalPrice),
      otpcWorth: Number(pkgFormOtpc),
      liquorTypeLabel: pkgFormLiquorLabel,
      accessTags: accessTagsArray,
      ageRange: pkgFormAgeRange || undefined,
      image: pkgFormImage,
      drinkCategories: drinkCategoriesArray
    };

    let updatedPackages = [...activeAdminVenue.packages];
    if (editingCasinoPkgId) {
      updatedPackages = updatedPackages.map(p => (p.id === editingCasinoPkgId ? newPkg : p));
    } else {
      updatedPackages.push(newPkg);
    }

    updateCasinoVenue(activeAdminVenue.id, { packages: updatedPackages });
    setIsCasinoPkgModalOpen(false);
  };

  const handleDeleteCasinoPkg = (pkgId: string) => {
    if (!activeAdminVenue) return;
    if (confirm('Delete this tariff package?')) {
      const updatedPackages = activeAdminVenue.packages.filter(p => p.id !== pkgId);
      updateCasinoVenue(activeAdminVenue.id, { packages: updatedPackages });
    }
  };

  const openVenueEditModal = () => {
    if (!activeAdminVenue) return;
    setVenueFormName(activeAdminVenue.name);
    setVenueFormLocation(activeAdminVenue.location);
    setVenueFormEffectiveDate(activeAdminVenue.effectiveDate);
    setVenueFormTagline(activeAdminVenue.tagline);
    setVenueFormImage(activeAdminVenue.image);
    setIsVenueEditOpen(true);
  };

  const handleSaveVenueHeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAdminVenue) return;
    updateCasinoVenue(activeAdminVenue.id, {
      name: venueFormName,
      location: venueFormLocation,
      effectiveDate: venueFormEffectiveDate,
      tagline: venueFormTagline,
      image: venueFormImage
    });
    setIsVenueEditOpen(false);
  };

  const handleAddNewVenue = () => {
    const venueName = prompt('Enter New Casino Vessel Name:', 'NEW GOA CASINO');
    if (!venueName) return;
    const slug = venueName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    addCasinoVenue({
      slug: slug || `casino-${Date.now()}`,
      name: venueName.toUpperCase(),
      location: 'CASINO • PANJIM • GOA',
      effectiveDate: 'Effective Season 2025 - 2026',
      tagline: 'Luxury offshore casino experience on the Mandovi River, Goa.',
      image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=1200&auto=format&fit=crop',
      generalInclusions: ['UNLIMITED DINNER', 'UNLIMITED DRINKS*', 'LIVE ENTERTAINMENT'],
      packages: [
        {
          id: `pkg-${Date.now()}-1`,
          name: 'CLASSIC PACKAGE',
          price: 3000,
          originalPrice: 3500,
          otpcWorth: 1000,
          liquorTypeLabel: 'UNLIMITED HOUSE BRAND LIQUOR',
          accessTags: ['Vegas', 'Sky Bar'],
          drinkCategories: [
            { category: 'WHISKEY', items: ['House Brands', 'Blenders Pride'] },
            { category: 'BEER', items: ['Kingfisher Pint'] }
          ]
        }
      ]
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-zinc-950 flex flex-col">
      {!isAuthenticated ? (
        /* SECRET LOGIN SCREEN */
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-950 to-zinc-950">
          <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500" />

            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-extrabold text-white font-serif tracking-tight">
                Secret Admin Portal
              </h1>
              <p className="text-xs text-zinc-400">
                High-security CMS management panel for Watch My Trip Adventure.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1.5">Admin Username</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1.5">Secret Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter Secret Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black uppercase text-xs rounded-xl shadow-lg shadow-amber-500/20 transition transform active:scale-98"
              >
                UN-LOCK ADMIN DASHBOARD
              </button>
            </form>

            <div className="pt-4 border-t border-zinc-800/80 text-center">
              <Link
                href="/"
                className="text-xs text-zinc-400 hover:text-amber-400 transition flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Live Website</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN RESPONSIVE ADMIN WORKSPACE */
        <div className="flex-1 flex flex-col md:flex-row min-h-screen">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800/80 p-5 space-y-6 shrink-0 z-20">
            {/* Admin Header Branding */}
            <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
              <div>
                <h2 className="text-sm font-black text-white leading-tight">Admin CMS</h2>
                <span className="text-[10px] text-amber-400 font-extrabold uppercase">
                  Watch My Trip
                </span>
              </div>
            </div>

            {/* Sidebar Tab Buttons */}
            <nav className="flex-1 space-y-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'dashboard'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>1. Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'hero'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>2. Hero Section</span>
              </button>

              <button
                onClick={() => setActiveTab('cinematic')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'cinematic'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>3. 4K Showcase</span>
              </button>

              <button
                onClick={() => setActiveTab('tours')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'tours'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>4. Top Packages</span>
              </button>

              <button
                onClick={() => setActiveTab('casino')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'casino'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Ticket className="w-4 h-4 text-amber-400 font-bold" />
                <span>5. Casino Tariffs</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'gallery'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>6. Manage Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'reviews'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>7. Reviews</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl transition ${
                  activeTab === 'users'
                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>8. User Logins & Logs</span>
              </button>

            </nav>

            {/* Sidebar Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs font-bold">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 transition"
              >
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Live Site</span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-500/30 hover:bg-red-900/50 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* MOBILE NAVBAR DRAWER */}
          <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="text-xs font-black text-white uppercase">Admin Portal</span>
            </div>

            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-2 text-amber-400 hover:text-white"
            >
              {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileNavOpen && (
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 p-4 space-y-2 animate-in slide-in-from-top-4 z-30">
              {[
                { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard },
                { id: 'hero', label: '2. Hero Section', icon: Sliders },
                { id: 'cinematic', label: '3. 4K Showcase', icon: Film },
                { id: 'tours', label: '4. Top Packages', icon: Package },
                { id: 'casino', label: '5. Casino Tariffs', icon: Ticket },
                { id: 'gallery', label: '6. Manage Gallery', icon: Camera },
                { id: 'reviews', label: '7. Reviews Record', icon: Star },
                { id: 'users', label: '8. User Logins & Logs', icon: Users }

              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id as any);
                      setIsMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold text-left ${
                      activeTab === t.id
                        ? 'bg-amber-500 text-zinc-950'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-zinc-800 flex items-center space-x-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex-1 py-2 bg-zinc-950 border border-zinc-800 text-amber-400 font-bold text-xs rounded-lg text-center"
                >
                  Live Website
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 bg-red-950/60 text-red-400 font-bold text-xs rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* MAIN CONTENT AREA */}
          <section className="flex-1 p-4 sm:p-8 bg-zinc-950 overflow-y-auto max-w-7xl mx-auto w-full">
            {/* TAB 1: DASHBOARD & REVENUE SYSTEM */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Header & Date Filter Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                      BUSINESS INSIGHTS & INQUIRIES
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                      Revenue & Lead Analytics
                    </h1>
                  </div>

                  {/* Date Filter Selector */}
                  <div className="flex flex-wrap items-center gap-2 bg-zinc-950 p-2 rounded-2xl border border-zinc-800 text-xs">
                    <Filter className="w-4 h-4 text-amber-400 ml-2" />
                    <span className="font-bold text-zinc-400 hidden sm:inline">Filter Date:</span>

                    {[
                      { id: 'all', label: 'All Time' },
                      { id: 'today', label: 'Today' },
                      { id: '7days', label: '7 Days' },
                      { id: 'thisMonth', label: 'This Month' },
                      { id: 'custom', label: 'Custom' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setDatePreset(btn.id as any)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition ${
                          datePreset === btn.id
                            ? 'bg-amber-500 text-zinc-950 shadow-md'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Date Range Picker */}
                {datePreset === 'custom' && (
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1">From Date:</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">To Date:</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* 4 Financial KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Total Revenue */}
                  <div className="bg-zinc-900 border border-emerald-500/30 p-6 rounded-3xl shadow-xl space-y-2 relative overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase">
                      Total Revenue (Collected)
                    </span>
                    <h3 className="text-3xl font-black text-emerald-400 font-mono">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </h3>
                    <span className="text-[11px] text-zinc-500 block">From confirmed pre-paid bookings</span>
                  </div>

                  {/* Pending COD Payments */}
                  <div className="bg-zinc-900 border border-amber-500/30 p-6 rounded-3xl shadow-xl space-y-2 relative overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase">
                      Pending COD Payments
                    </span>
                    <h3 className="text-3xl font-black text-amber-400 font-mono">
                      ₹{pendingCodAmount.toLocaleString('en-IN')}
                    </h3>
                    <span className="text-[11px] text-zinc-500 block">Cash to collect on pickup</span>
                  </div>

                  {/* Cancelled Bookings */}
                  <div className="bg-zinc-900 border border-red-500/30 p-6 rounded-3xl shadow-xl space-y-2 relative overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase">
                      Cancelled Bookings
                    </span>
                    <h3 className="text-3xl font-black text-red-400 font-mono">
                      {cancelledBookingsCount}
                    </h3>
                    <span className="text-[11px] text-zinc-500 block">Cancelled lead requests</span>
                  </div>

                  {/* Total Leads */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-2 relative overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-white flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 block uppercase">
                      Total Inquiries / Leads
                    </span>
                    <h3 className="text-3xl font-black text-white font-mono">{totalLeadsCount}</h3>
                    <span className="text-[11px] text-zinc-500 block">All incoming leads</span>
                  </div>
                </div>

                {/* Leads / Inquiries Management Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg font-bold text-white font-serif">Customer Leads & Inquiries</h2>
                    <button
                      onClick={() => refreshBookingsFromDB()}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Sync Live DB</span>
                    </button>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="p-8 text-center bg-zinc-950 rounded-2xl text-zinc-400 text-xs border border-zinc-800">
                      No inquiries found for selected date filter. Incoming leads from booking forms will appear here!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-400 uppercase font-black">
                            <th className="py-3 px-3">Lead ID</th>
                            <th className="py-3 px-3">Customer</th>
                            <th className="py-3 px-3">Tour</th>
                            <th className="py-3 px-3">Date / Guests</th>
                            <th className="py-3 px-3">Mode</th>
                            <th className="py-3 px-3">Amount</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {filteredBookings.map((b) => (
                            <tr key={b.id} className="hover:bg-zinc-950/50 transition">
                              <td className="py-3 px-3 font-mono font-bold text-amber-400">
                                {b.id}
                              </td>
                              <td className="py-3 px-3 space-y-0.5">
                                <span className="font-bold text-white block">{b.customerName}</span>
                                <span className="text-[11px] text-zinc-400 block">{b.customerPhone}</span>
                              </td>
                              <td className="py-3 px-3 text-zinc-300 font-medium">{b.tourTitle}</td>
                              <td className="py-3 px-3 text-zinc-400">
                                {b.date} ({b.guestCount} Guests)
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                    b.paymentMode === 'prepaid'
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : b.paymentMode === 'advance_30'
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                      : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                                  }`}
                                >
                                  {b.paymentMode === 'prepaid'
                                    ? '100% PREPAID'
                                    : b.paymentMode === 'advance_30'
                                    ? '⚡ 30% ADVANCE PAID'
                                    : 'COD CASH'}
                                </span>
                              </td>
                              <td className="py-3 px-3 space-y-0.5">
                                <span className="font-mono font-bold text-white block">₹{b.amount || 0}</span>
                                {b.paymentMode === 'advance_30' && (
                                  <span className="text-[10px] font-bold text-amber-400 block font-mono">
                                    Paid: ₹{(b.advancePaid ?? Math.round((b.amount || 0) * 0.3)).toLocaleString('en-IN')} | Due: ₹{(b.balanceDue ?? Math.round((b.amount || 0) * 0.7)).toLocaleString('en-IN')}
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase ${
                                    b.status === 'booked'
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : b.status === 'contacted'
                                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                      : b.status === 'refunded'
                                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                      : b.status === 'cancelled'
                                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right">
                                <select
                                  value={b.status}
                                  onChange={(e) => {
                                    const val = e.target.value as Booking['status'];
                                    if (val === 'booked') {
                                      openConfirmBookedModal(b);
                                    } else {
                                      updateBookingStatus(b.id, val);
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-xl font-bold text-xs border focus:outline-none transition cursor-pointer ${
                                    b.status === 'booked'
                                      ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/50'
                                      : b.status === 'contacted'
                                      ? 'bg-blue-950/90 text-blue-400 border-blue-500/50'
                                      : b.status === 'refunded'
                                      ? 'bg-purple-950/90 text-purple-400 border-purple-500/50'
                                      : b.status === 'cancelled'
                                      ? 'bg-red-950/90 text-red-400 border-red-500/50'
                                      : 'bg-amber-950/90 text-amber-400 border-amber-500/50'
                                  }`}
                                >
                                  <option value="pending" className="bg-zinc-900 text-amber-400">⏳ Pending</option>
                                  <option value="contacted" className="bg-zinc-900 text-blue-400">📞 Contacted</option>
                                  <option value="booked" className="bg-zinc-900 text-emerald-400">✓ Mark Booked</option>
                                  <option value="cancelled" className="bg-zinc-900 text-red-400">❌ Cancelled</option>
                                  <option value="refunded" className="bg-zinc-900 text-purple-400">💸 Refunded</option>
                                </select>
                              </td>


                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: HERO SECTION MANAGER */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-serif">Manage Hero Carousel Slides</h2>
                    <p className="text-xs text-zinc-400">
                      Edit background photos/videos, titles, subtitles, and CTA buttons for all 3 hero carousel pages.
                    </p>
                  </div>
                  {heroSaveMessage && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-bold animate-pulse">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {heroSaveMessage}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <span className="text-xs font-black uppercase text-amber-400">
                          SLIDE #{idx + 1} ({slide.badge})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setHeroSaveMessage(`Slide #${idx + 1} saved successfully!`);
                            setTimeout(() => setHeroSaveMessage(null), 3500);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl text-xs transition shadow-md hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          Save Slide #{idx + 1}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-zinc-300 font-bold mb-1">Slide Title</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => updateHeroSlide(slide.id, { title: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-300 font-bold mb-1">Badge Tag</label>
                          <input
                            type="text"
                            value={slide.badge}
                            onChange={(e) => updateHeroSlide(slide.id, { badge: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-zinc-300 font-bold mb-1">Subtitle</label>
                          <textarea
                            rows={2}
                            value={slide.subtitle}
                            onChange={(e) => updateHeroSlide(slide.id, { subtitle: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-amber-400 font-bold mb-1">
                            CTA Button Text (Call To Action)
                          </label>
                          <input
                            type="text"
                            value={slide.ctaText || ''}
                            onChange={(e) => updateHeroSlide(slide.id, { ctaText: e.target.value })}
                            placeholder="e.g. Explore Packages"
                            className="w-full bg-zinc-950 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-amber-300 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-amber-400 font-bold mb-1">
                            CTA Link Target URL
                          </label>
                          <input
                            type="text"
                            value={slide.ctaLink || ''}
                            onChange={(e) => updateHeroSlide(slide.id, { ctaLink: e.target.value })}
                            placeholder="e.g. #tours or /tours"
                            className="w-full bg-zinc-950 border border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-amber-300 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-300 font-bold mb-1">Media Type</label>
                          <select
                            value={slide.mediaType}
                            onChange={(e) =>
                              updateHeroSlide(slide.id, {
                                mediaType: e.target.value as 'image' | 'video'
                              })
                            }
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                          >
                            <option value="image">Image Photo</option>
                            <option value="video">MP4 Video</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-zinc-300 font-bold mb-1">
                            Upload File / Media URL
                          </label>
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={slide.mediaUrl}
                              onChange={(e) => updateHeroSlide(slide.id, { mediaUrl: e.target.value })}
                              placeholder="Enter URL"
                              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                            />
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(e) =>
                                handleFileUpload(e, (url) => updateHeroSlide(slide.id, { mediaUrl: url }))
                              }
                              className="w-full text-zinc-400 text-[11px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="h-44 rounded-2xl overflow-hidden relative border border-zinc-800 bg-zinc-950 shadow-inner">
                        {slide.mediaType === 'video' ? (
                          <video
                            src={slide.mediaUrl}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={slide.mediaUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent p-4 flex flex-col justify-end">
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                                {slide.badge}
                              </span>
                              <h4 className="text-sm font-bold text-white line-clamp-1">{slide.title}</h4>
                              <p className="text-[11px] text-zinc-300 line-clamp-1">{slide.subtitle}</p>
                            </div>

                            {/* Live CTA Button Preview */}
                            <div className="px-3 py-1.5 bg-amber-500 text-zinc-950 font-black text-[11px] rounded-lg shadow-md whitespace-nowrap">
                              {slide.ctaText || 'Explore Packages'} →
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Save Action */}
                      <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                        <span className="text-[11px] text-zinc-400">
                          CTA Link: <code className="text-amber-400 font-mono">{slide.ctaLink || '#tours'}</code>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setHeroSaveMessage(`Slide #${idx + 1} ("${slide.title}") saved successfully!`);
                            setTimeout(() => setHeroSaveMessage(null), 3500);
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer uppercase tracking-wider"
                        >
                          <Save className="w-4 h-4" />
                          Save Slide #{idx + 1} CTA & Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: 4K CINEMATIC ADVENTURE SHOWCASE MANAGER */}
            {activeTab === 'cinematic' && (
              <div className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-4">
                  <h2 className="text-xl font-bold text-white font-serif">
                    Manage 4K Cinematic Adventure Showcase
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Edit showcase video background, section headlines, and included activities ticker list (max 8).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">Section Title</label>
                      <input
                        type="text"
                        value={cinematicData.title}
                        onChange={(e) => updateCinematicData({ title: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">Badge Headline</label>
                      <input
                        type="text"
                        value={cinematicData.badge}
                        onChange={(e) => updateCinematicData({ badge: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-zinc-300 font-bold mb-1">Showcase Video File / URL</label>
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={cinematicData.videoUrl}
                          onChange={(e) => updateCinematicData({ videoUrl: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                        />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => updateCinematicData({ videoUrl: url }))
                          }
                          className="text-zinc-400 text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Included Activities Ticker Manager (Max 8 Enforced) */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Activities Ticker Badges ({cinematicData.activities.length}/8 Max)
                      </h3>
                      <span className="text-xs text-zinc-400">
                        Dynamic badges displayed on 4K Showcase section (strictly max 8 items).
                      </span>
                    </div>

                    {cinematicData.activities.length < 8 && (
                      <button
                        onClick={addActivityTicker}
                        className="px-3 py-1.5 bg-amber-500 text-zinc-950 font-extrabold text-xs rounded-xl flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Activity</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {cinematicData.activities.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800"
                      >
                        <span className="font-mono text-amber-400 font-bold">#{idx + 1}</span>
                        <input
                          type="text"
                          value={act}
                          onChange={(e) => updateActivityTicker(idx, e.target.value)}
                          className="flex-1 bg-transparent text-white focus:outline-none font-bold"
                        />
                        <button
                          onClick={() => removeActivityTicker(idx)}
                          className="p-1 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80">
                    {cinematicSaveMessage ? (
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        {cinematicSaveMessage}
                      </div>
                    ) : (
                      <span />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setCinematicSaveMessage('Cinematic Showcase details saved successfully!');
                        setTimeout(() => setCinematicSaveMessage(null), 3500);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Cinematic Showcase Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: OUR TOP PACKAGES MANAGER */}
            {activeTab === 'tours' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
                  <div>
                    <h2 className="text-xl font-bold text-white font-serif">All Adventure Tour Packages</h2>
                    <span className="text-xs text-zinc-400">
                      Manage title, price, cover photo, media gallery (up to 6 items), and day/time itinerary.
                    </span>
                  </div>

                  <Link
                    href="/admin/edit-tour/new"
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Package</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-44 relative bg-zinc-950">
                          <img
                            src={tour.heroMedia}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-amber-500 text-zinc-950 font-black text-xs px-2.5 py-1 rounded-lg shadow-md">
                            ₹{tour.price}
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <h3 className="text-base font-extrabold text-white line-clamp-1">
                            {tour.title}
                          </h3>
                          <p className="text-xs text-zinc-400 line-clamp-2">{tour.tagline}</p>

                          <div className="text-[11px] text-amber-400 font-bold pt-2 border-t border-zinc-800/80">
                            🗓️ Itinerary Steps: {tour.itinerary?.length || 0} Steps
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0 border-t border-zinc-800/60 flex items-center justify-between mt-2">
                        <Link
                          href={`/tour/${tour.slug}`}
                          target="_blank"
                          className="text-xs text-amber-400 hover:underline flex items-center space-x-1 font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Live Page</span>
                        </Link>

                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/edit-tour/${tour.id}`}
                            className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 text-xs font-bold rounded-xl transition flex items-center space-x-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Details</span>
                          </Link>

                          <button
                            onClick={() => {
                              if (confirm(`Delete package "${tour.title}"?`)) {
                                deleteTour(tour.id);
                              }
                            }}
                            className="p-1.5 bg-red-950/40 text-red-400 hover:bg-red-900 rounded-xl border border-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CASINO TARIFFS MANAGER */}
            {activeTab === 'casino' && (
              <div className="space-y-6">
                {/* Top Control Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
                  <div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                      GOA OFF-SHORE VIP CASINOS
                    </span>
                    <h1 className="text-2xl font-extrabold text-white font-serif">
                      Casino Tariffs & Package CMS
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">
                      Manage Deltin Royale, Deltin Jaqk, prices, OTPC chip values, access decks, and liquor category breakdowns.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleAddNewVenue}
                      className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl border border-zinc-700 flex items-center space-x-1.5 transition"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add New Vessel</span>
                    </button>

                    <Link
                      href={`/admin/edit-casino-pkg/${selectedCasinoAdminVenueId}/new`}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Tariff Package</span>
                    </Link>
                  </div>
                </div>

                {/* Venue Selector Bar */}
                <div className="flex flex-wrap items-center gap-3 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400 ml-2">Active Vessel:</span>
                  {casinoVenues.map((venue) => {
                    const isActive = venue.id === selectedCasinoAdminVenueId;
                    return (
                      <button
                        key={venue.id}
                        onClick={() => setSelectedCasinoAdminVenueId(venue.id)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                          isActive
                            ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                            : 'bg-zinc-950 text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        {venue.name} ({venue.packages.length} Packages)
                      </button>
                    );
                  })}
                </div>

                {/* Active Venue Banner Card */}
                {activeAdminVenue && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {activeAdminVenue.location}
                          </span>
                          <span className="text-[10px] text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">
                            {activeAdminVenue.effectiveDate}
                          </span>
                        </div>
                        <h2 className="text-2xl font-black text-white">{activeAdminVenue.name}</h2>
                        <p className="text-xs text-zinc-400">{activeAdminVenue.tagline}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={openVenueEditModal}
                          className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl flex items-center space-x-1.5"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-400" />
                          <span>Edit Vessel Details</span>
                        </button>
                        <button
                          onClick={() => {
                            if (casinoVenues.length <= 1) {
                              alert('Cannot delete the last remaining casino venue!');
                              return;
                            }
                            if (confirm(`Delete venue "${activeAdminVenue.name}"?`)) {
                              deleteCasinoVenue(activeAdminVenue.id);
                              setSelectedCasinoAdminVenueId(casinoVenues[0].id);
                            }
                          }}
                          className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900 rounded-xl border border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                      {activeAdminVenue.packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition shadow-lg"
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-base font-extrabold text-white uppercase">{pkg.name}</h3>
                                <span className="text-xs text-amber-400 font-medium block">{pkg.liquorTypeLabel}</span>
                              </div>
                              <span className="text-lg font-black text-white bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-800">
                                ₹{pkg.price.toLocaleString('en-IN')}
                              </span>
                            </div>

                            {/* OTPC chip */}
                            <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center space-x-2">
                              <CircleDollarSign className="w-4 h-4 text-amber-400 shrink-0" />
                              <span className="text-amber-300 font-bold">
                                {pkg.otpcWorth > 0 ? `OTPC: ₹${pkg.otpcWorth.toLocaleString('en-IN')}` : 'No OTPC (Child/Teen/Entry)'}
                              </span>
                            </div>

                            {/* Drink categories count */}
                            <div className="mt-3 text-[11px] text-zinc-400">
                              🍷 <strong>Included Categories:</strong> {pkg.drinkCategories?.length || 0} categories listed
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-800/80">
                            <Link
                              href={`/admin/edit-casino-pkg/${activeAdminVenue.id}/${pkg.id}`}
                              className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 text-xs font-bold rounded-xl transition flex items-center space-x-1"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-400" />
                              <span>Edit Tariff & Drinks</span>
                            </Link>
                            <button
                              onClick={() => handleDeleteCasinoPkg(pkg.id)}
                              className="p-1.5 bg-red-950/40 text-red-400 hover:bg-red-900 rounded-xl border border-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-4">
                  <h2 className="text-xl font-bold text-white font-serif">Manage Website Gallery</h2>
                  <p className="text-xs text-zinc-400">
                    Add photos and videos to the live gallery. Website automatically displays 9 photos per page.
                  </p>

                  <form onSubmit={handleAddGallerySubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">Title / Caption</label>
                      <input
                        type="text"
                        placeholder="e.g. Scuba Dive Coral Reef"
                        value={newGalleryTitle}
                        onChange={(e) => setNewGalleryTitle(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">Media Type</label>
                      <select
                        value={newGalleryMediaType}
                        onChange={(e) => setNewGalleryMediaType(e.target.value as any)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                      >
                        <option value="image">Image Photo</option>
                        <option value="video">MP4 Video</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-bold mb-1">Upload File / URL</label>
                      <input
                        type="text"
                        placeholder="Media URL"
                        value={newGalleryMediaUrl}
                        onChange={(e) => setNewGalleryMediaUrl(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white mb-1"
                      />
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => handleFileUpload(e, (url) => setNewGalleryMediaUrl(url))}
                        className="text-zinc-400 text-[11px]"
                      />
                    </div>

                    <div className="sm:col-span-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-xl shadow-lg"
                      >
                        Upload to Gallery
                      </button>
                    </div>
                  </form>
                </div>

                {/* Gallery Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative group h-52"
                    >
                      {item.mediaType === 'video' ? (
                        <video src={item.image} autoPlay loop muted className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.image} alt={item.tourTitle} className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent p-3 flex flex-col justify-end">
                        <span className="text-xs font-bold text-white">{item.tourTitle}</span>
                        <button
                          onClick={() => deleteGalleryItem(item.id)}
                          className="mt-2 w-full py-1 bg-red-950/80 hover:bg-red-900 text-red-300 text-[10px] font-bold rounded-lg border border-red-500/30"
                        >
                          Delete Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: REVIEWS MANAGER */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl space-y-4">
                  <h2 className="text-xl font-bold text-white font-serif">Customer Reviews Moderation</h2>
                  <p className="text-xs text-zinc-400">
                    Approve or delete reviews. Also change the background review video.
                  </p>

                  <div className="text-xs space-y-1">
                    <label className="block text-zinc-300 font-bold">Review Background Video URL / Upload</label>
                    <input
                      type="text"
                      value={reviewVideoUrl}
                      onChange={(e) => updateReviewVideo(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, (url) => updateReviewVideo(url))}
                      className="text-zinc-400 text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-white text-sm">{rev.author}</span>
                          <span className="text-xs text-zinc-500">• {rev.date}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              rev.status === 'approved'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>
                        <p className="text-xs text-amber-400 font-medium">Tour: {rev.tourName}</p>
                        <p className="text-xs text-zinc-300 italic">&ldquo;{rev.comment}&rdquo;</p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {rev.status === 'pending' && (
                          <button
                            onClick={() => approveReview(rev.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="p-2 bg-red-950/40 text-red-400 hover:bg-red-900 rounded-xl border border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: USER LOGINS & ACTIVITY LOGS */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Top Banner */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-serif flex items-center space-x-2">
                      <Users className="w-5 h-5 text-emerald-400" />
                      <span>User Accounts & Login Activity Logs</span>
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Monitor all user registrations, auth channels (Email OTP, Phone OTP, Google Login), exact timestamps, and booking conversion statuses.
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users by name, phone, email..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 w-full md:w-64 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Analytics Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Total Registered Users</span>
                    <span className="text-2xl font-black text-white">{registeredUsers.length}</span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Total Logins Recorded</span>
                    <span className="text-2xl font-black text-amber-400">{loginLogs.length}</span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Users With Bookings</span>
                    <span className="text-2xl font-black text-emerald-400">
                      {registeredUsers.filter(u => bookings.some(b => b.userId === u.id || b.customerPhone === u.phone || (u.email && b.customerName.toLowerCase() === u.displayName.toLowerCase()))).length}
                    </span>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Conversion Rate</span>
                    <span className="text-2xl font-black text-cyan-400">
                      {registeredUsers.length > 0
                        ? Math.round((registeredUsers.filter(u => bookings.some(b => b.userId === u.id || b.customerPhone === u.phone)).length / registeredUsers.length) * 100)
                        : 0}%
                    </span>
                  </div>
                </div>

                {/* Registered Users Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Registered User Accounts ({registeredUsers.length})</span>
                  </h3>

                  {registeredUsers.length === 0 ? (
                    <div className="text-center py-8 text-xs text-zinc-500 bg-zinc-950/50 rounded-2xl border border-zinc-800/80">
                      No user accounts registered yet. Click &quot;Book Now&quot; or &quot;Login&quot; on the website to create a test user!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[10px]">
                            <th className="py-3 px-3">User Name</th>
                            <th className="py-3 px-3">Contact (Email/Phone)</th>
                            <th className="py-3 px-3">Auth Method</th>
                            <th className="py-3 px-3">Registered On</th>
                            <th className="py-3 px-3">Booking Status</th>
                            <th className="py-3 px-3">Bookings Count</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {registeredUsers
                            .filter(u => !userSearchQuery || u.displayName.toLowerCase().includes(userSearchQuery.toLowerCase()) || (u.email && u.email.toLowerCase().includes(userSearchQuery.toLowerCase())) || (u.phone && u.phone.includes(userSearchQuery)))
                            .map((u) => {
                              const userBookings = bookings.filter(b => b.userId === u.id || b.customerPhone === u.phone);
                              const hasBooking = userBookings.length > 0;
                              return (
                                <tr key={u.id} className="hover:bg-zinc-800/40 transition">
                                  <td className="py-3 px-3 font-bold text-white flex items-center space-x-2">
                                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs shrink-0">
                                      {u.displayName.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{u.displayName}</span>
                                  </td>
                                  <td className="py-3 px-3 text-zinc-300 font-mono">
                                    {u.email || u.phone || 'N/A'}
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      u.loginMethod === 'google'
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        : u.loginMethod === 'phone'
                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}>
                                      {u.loginMethod}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 text-zinc-400">
                                    {new Date(u.createdAt).toLocaleDateString()} {new Date(u.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                      hasBooking
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                    }`}>
                                      {hasBooking ? '✓ Booking Done' : 'No Booking Yet'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 font-bold text-amber-400">
                                    {userBookings.length} Lead(s)
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Login History Logs Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Real-Time Login Activity Logs ({loginLogs.length})</span>
                  </h3>

                  {loginLogs.length === 0 ? (
                    <div className="text-center py-8 text-xs text-zinc-500 bg-zinc-950/50 rounded-2xl border border-zinc-800/80">
                      No login sessions recorded yet. Log in from the live website to record your first log entry!
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[10px]">
                            <th className="py-3 px-3">Timestamp</th>
                            <th className="py-3 px-3">User Name</th>
                            <th className="py-3 px-3">Contact Detail</th>
                            <th className="py-3 px-3">Method</th>
                            <th className="py-3 px-3">Booking Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {loginLogs
                            .filter(log => !userSearchQuery || log.userName.toLowerCase().includes(userSearchQuery.toLowerCase()) || (log.userEmail && log.userEmail.toLowerCase().includes(userSearchQuery.toLowerCase())) || (log.userPhone && log.userPhone.includes(userSearchQuery)))
                            .map((log) => {
                              const userBookings = bookings.filter(b => b.userId === log.userId || b.customerPhone === log.userPhone);
                              const hasBooking = userBookings.length > 0;
                              return (
                                <tr key={log.id} className="hover:bg-zinc-800/40 transition">
                                  <td className="py-3 px-3 font-mono text-zinc-400">
                                    {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </td>
                                  <td className="py-3 px-3 font-bold text-white">
                                    {log.userName}
                                  </td>
                                  <td className="py-3 px-3 text-zinc-300 font-mono">
                                    {log.userEmail || log.userPhone || 'N/A'}
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-800 text-amber-400 border border-amber-500/20">
                                      {log.loginMethod}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      hasBooking
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                    }`}>
                                      {hasBooking ? '✓ Booking Completed' : 'Pending Booking'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

          </section>
        </div>
      )}

      {/* CONFIRM BOOKED AMOUNT MODAL */}
      {bookingModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-serif">Confirm Lead Booking Details</h3>

            <div className="text-xs space-y-2 text-zinc-300">
              <p>
                <strong>Customer:</strong> {bookingModalLead.customerName} (
                {bookingModalLead.customerPhone})
              </p>
              <p>
                <strong>Tour:</strong> {bookingModalLead.tourTitle}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Finalized Booking Amount (₹)</label>
                <input
                  type="number"
                  value={modalAmount}
                  onChange={(e) => setModalAmount(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Payment Mode</label>
                <select
                  value={modalPaymentMode}
                  onChange={(e) => setModalPaymentMode(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white font-bold"
                >
                  <option value="advance_30">⚡ 30% Advance Token Paid Online</option>
                  <option value="prepaid">💳 100% Full Online Prepaid</option>
                  <option value="cod">💵 COD Cash on Pickup (Pending Payment)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Booking Status Action</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white font-bold"
                >
                  <option value="booked">✓ Confirmed & Booked</option>
                  <option value="contacted">📞 Contacted Lead</option>
                  <option value="pending">⏳ Pending Inquiries</option>
                  <option value="cancelled">❌ Cancelled</option>
                  <option value="refunded">💸 Refunded</option>
                </select>
              </div>
            </div>


            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-800">
              <button
                onClick={() => setBookingModalLead(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBookingModal}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Save & Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOUR PACKAGE ADD/EDIT MODAL */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white font-serif border-b border-zinc-800 pb-3">
              {editingTourId ? 'Edit Tour Package Details' : 'Create New Tour Package'}
            </h3>

            <form onSubmit={handleSaveTour} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Tour Package Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scuba Diving at Grande Island"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Tagline</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Discount Badge</label>
                  <input
                    type="text"
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Main Cover Photo/Video URL or File</label>
                <input
                  type="text"
                  value={formHeroMedia}
                  onChange={(e) => setFormHeroMedia(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white mb-1"
                />
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e, setFormHeroMedia)}
                  className="text-zinc-400 text-[11px]"
                />
              </div>

              {/* 3 Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Thumbnail #1</label>
                  <input
                    type="text"
                    value={formThumb1}
                    onChange={(e) => setFormThumb1(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Thumbnail #2</label>
                  <input
                    type="text"
                    value={formThumb2}
                    onChange={(e) => setFormThumb2(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Thumbnail #3</label>
                  <input
                    type="text"
                    value={formThumb3}
                    onChange={(e) => setFormThumb3(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              {/* UNLIMITED ITINERARY MANAGER */}
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">
                    Day & Time-wise Itinerary ({formItinerary.length} Steps)
                  </h4>
                  <button
                    type="button"
                    onClick={addItineraryStep}
                    className="px-3 py-1 bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formItinerary.map((step, idx) => (
                    <div
                      key={step.id || idx}
                      className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 font-bold">Step #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeItineraryStep(step.id)}
                          className="text-red-400 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Time (e.g. 09:00 AM)"
                          value={step.time}
                          onChange={(e) => {
                            const updated = [...formItinerary];
                            updated[idx].time = e.target.value;
                            setFormItinerary(updated);
                          }}
                          className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Step Title"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...formItinerary];
                            updated[idx].title = e.target.value;
                            setFormItinerary(updated);
                          }}
                          className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Step Description"
                        value={step.description}
                        onChange={(e) => {
                          const updated = [...formItinerary];
                          updated[idx].description = e.target.value;
                          setFormItinerary(updated);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                      />

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Step Photo URL"
                          value={step.photo}
                          onChange={(e) => {
                            const updated = [...formItinerary];
                            updated[idx].photo = e.target.value;
                            setFormItinerary(updated);
                          }}
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => {
                              const updated = [...formItinerary];
                              updated[idx].photo = url;
                              setFormItinerary(updated);
                            })
                          }
                          className="text-zinc-400 text-[10px] w-36"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsTourModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black"
                >
                  Save Package Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CASINO PACKAGE ADD/EDIT MODAL */}
      {isCasinoPkgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingCasinoPkgId ? 'Edit Casino Package Tariff' : 'Add New Casino Package'}
              </h3>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                Vessel: {activeAdminVenue?.name}
              </span>
            </div>

            <form onSubmit={handleSaveCasinoPkg} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CLASSIC package or PREMIUM package"
                  value={pkgFormName}
                  onChange={(e) => setPkgFormName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={pkgFormPrice}
                    onChange={(e) => setPkgFormPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Original Slashed Price (₹)</label>
                  <input
                    type="number"
                    value={pkgFormOriginalPrice}
                    onChange={(e) => setPkgFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">OTPC Gaming Chip (₹)</label>
                  <input
                    type="number"
                    value={pkgFormOtpc}
                    onChange={(e) => setPkgFormOtpc(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-amber-400 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Liquor Category Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UNLIMITED HOUSE BRAND LIQUOR or UNLIMITED IMFL LIQUOR"
                  value={pkgFormLiquorLabel}
                  onChange={(e) => setPkgFormLiquorLabel(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Package Eye-Catching Cover Photo URL / File</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={pkgFormImage}
                  onChange={(e) => setPkgFormImage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white mb-1"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, (url) => setPkgFormImage(url))}
                  className="text-zinc-400 text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Deck Access Tags (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Vegas, Sky Bar"
                    value={pkgFormAccessTags}
                    onChange={(e) => setPkgFormAccessTags(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Age Range (For Child/Teen Packages)</label>
                  <input
                    type="text"
                    placeholder="e.g. Child: 5 yrs - 11 yrs | Teens: 12 yrs - 20 yrs"
                    value={pkgFormAgeRange}
                    onChange={(e) => setPkgFormAgeRange(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* INCLUDED LIQUOR & DRINK BRAND BREAKDOWN LIST */}
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">
                    Included Liquor & Drink Categories ({pkgFormDrinkCategories.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      setPkgFormDrinkCategories([
                        ...pkgFormDrinkCategories,
                        { category: 'NEW CATEGORY', itemsString: 'Brand Item 1, Brand Item 2' }
                      ])
                    }
                    className="px-3 py-1 bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Drink Category</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {pkgFormDrinkCategories.map((cat, idx) => (
                    <div key={idx} className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Category Name (e.g. WHISKEY, VODKA, BEER)"
                          value={cat.category}
                          onChange={(e) => {
                            const updated = [...pkgFormDrinkCategories];
                            updated[idx].category = e.target.value;
                            setPkgFormDrinkCategories(updated);
                          }}
                          className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-amber-400 font-bold text-xs uppercase"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...pkgFormDrinkCategories];
                            updated.splice(idx, 1);
                            setPkgFormDrinkCategories(updated);
                          }}
                          className="text-red-400 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Comma-separated included brand names (e.g. Red Label, Smirnoff, Kingfisher Pint)"
                        value={cat.itemsString}
                        onChange={(e) => {
                          const updated = [...pkgFormDrinkCategories];
                          updated[idx].itemsString = e.target.value;
                          setPkgFormDrinkCategories(updated);
                        }}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCasinoPkgModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black"
                >
                  Save Tariff Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CASINO VENUE HEADER EDIT MODAL */}
      {isVenueEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-white font-serif border-b border-zinc-800 pb-3">
              Edit Casino Vessel Header Info
            </h3>

            <form onSubmit={handleSaveVenueHeader} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Vessel Name *</label>
                <input
                  type="text"
                  required
                  value={venueFormName}
                  onChange={(e) => setVenueFormName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Location Subtitle</label>
                <input
                  type="text"
                  value={venueFormLocation}
                  onChange={(e) => setVenueFormLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Effective Season Badge</label>
                <input
                  type="text"
                  value={venueFormEffectiveDate}
                  onChange={(e) => setVenueFormEffectiveDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Tagline</label>
                <textarea
                  rows={2}
                  value={venueFormTagline}
                  onChange={(e) => setVenueFormTagline(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Vessel Image Photo URL</label>
                <input
                  type="text"
                  value={venueFormImage}
                  onChange={(e) => setVenueFormImage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white mb-1"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, (url) => setVenueFormImage(url))}
                  className="text-zinc-400 text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsVenueEditOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black"
                >
                  Update Vessel Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

