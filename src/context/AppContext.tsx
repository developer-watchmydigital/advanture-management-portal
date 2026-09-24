'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour, Review, Booking, HeroSlide, CinematicShowcaseData, GalleryItem, CasinoVenue } from '@/types';
import { INITIAL_TOURS } from '@/data/initialTours';
import { INITIAL_REVIEWS } from '@/data/initialReviews';
import { INITIAL_HERO_SLIDES } from '@/data/initialHeroSlides';
import { INITIAL_CINEMATIC_DATA } from '@/data/initialCinematic';
import { INITIAL_GALLERY_ITEMS } from '@/data/initialGallery';
import { INITIAL_CASINO_VENUES } from '@/data/initialCasinoTariffs';
import { useAuth } from '@/context/AuthContext';

interface AppContextType {
  tours: Tour[];
  reviews: Review[];
  bookings: Booking[];
  heroSlides: HeroSlide[];
  cinematicData: CinematicShowcaseData;
  galleryItems: GalleryItem[];
  casinoVenues: CasinoVenue[];
  reviewVideoUrl: string;

  activeBookingTour: Tour | null;
  setActiveBookingTour: (tour: Tour | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isAddReviewModalOpen: boolean;
  setIsAddReviewModalOpen: (open: boolean) => void;

  // Admin / CRUD Actions
  addTour: (tour: Omit<Tour, 'id'>) => void;
  updateTour: (id: string, tour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;

  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  updateReviewVideo: (url: string) => void;

  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  confirmBookingWithDetails: (id: string, details: { amount: number; paymentMode: 'cod' | 'prepaid'; status?: Booking['status'] }) => void;

  updateHeroSlide: (id: string, slideData: Partial<HeroSlide>) => void;
  updateCinematicData: (data: Partial<CinematicShowcaseData>) => void;
  
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  addCasinoVenue: (venue: Omit<CasinoVenue, 'id'>) => void;
  updateCasinoVenue: (id: string, venue: Partial<CasinoVenue>) => void;
  deleteCasinoVenue: (id: string) => void;

  openBookingModal: (tour?: Tour) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, openLoginModal, setPendingBookingAction } = useAuth();

  const [tours, setTours] = useState<Tour[]>(INITIAL_TOURS);

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(INITIAL_HERO_SLIDES);
  const [cinematicData, setCinematicData] = useState<CinematicShowcaseData>(INITIAL_CINEMATIC_DATA);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [casinoVenues, setCasinoVenues] = useState<CasinoVenue[]>(INITIAL_CASINO_VENUES);
  const [reviewVideoUrl, setReviewVideoUrl] = useState<string>('/gemini_generated_video_89554782.mp4');

  const [activeBookingTour, setActiveBookingTour] = useState<Tour | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedTours = localStorage.getItem('goa_tours');
      if (savedTours) setTours(JSON.parse(savedTours));

      const savedReviews = localStorage.getItem('goa_reviews');
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const savedBookings = localStorage.getItem('goa_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedHero = localStorage.getItem('goa_hero_slides');
      if (savedHero) setHeroSlides(JSON.parse(savedHero));

      const savedCinematic = localStorage.getItem('goa_cinematic_data');
      if (savedCinematic) setCinematicData(JSON.parse(savedCinematic));

      const savedGallery = localStorage.getItem('goa_gallery_items');
      if (savedGallery) setGalleryItems(JSON.parse(savedGallery));

      const savedCasino = localStorage.getItem('goa_casino_tariffs');
      if (savedCasino) setCasinoVenues(JSON.parse(savedCasino));

      const savedRevVideo = localStorage.getItem('goa_review_video');
      if (savedRevVideo) setReviewVideoUrl(savedRevVideo);
    } catch (e) {
      console.error('Error loading from localStorage', e);
    }
  }, []);

  // Save changes helper functions
  const saveTours = (newTours: Tour[]) => {
    setTours(newTours);
    try { localStorage.setItem('goa_tours', JSON.stringify(newTours)); } catch (e) { console.error(e); }
  };

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    try { localStorage.setItem('goa_reviews', JSON.stringify(newReviews)); } catch (e) { console.error(e); }
  };

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try { localStorage.setItem('goa_bookings', JSON.stringify(newBookings)); } catch (e) { console.error(e); }
  };

  const saveHeroSlides = (slides: HeroSlide[]) => {
    setHeroSlides(slides);
    try { localStorage.setItem('goa_hero_slides', JSON.stringify(slides)); } catch (e) { console.error(e); }
  };

  const saveCinematicData = (data: CinematicShowcaseData) => {
    setCinematicData(data);
    try { localStorage.setItem('goa_cinematic_data', JSON.stringify(data)); } catch (e) { console.error(e); }
  };

  const saveGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
    try { localStorage.setItem('goa_gallery_items', JSON.stringify(items)); } catch (e) { console.error(e); }
  };

  const saveCasinoVenues = (venues: CasinoVenue[]) => {
    setCasinoVenues(venues);
    try { localStorage.setItem('goa_casino_tariffs', JSON.stringify(venues)); } catch (e) { console.error(e); }
  };

  const saveReviewVideoUrl = (url: string) => {
    setReviewVideoUrl(url);
    try { localStorage.setItem('goa_review_video', url); } catch (e) { console.error(e); }
  };

  // Tour actions
  const addTour = (tourData: Omit<Tour, 'id'>) => {
    const newId = tourData.slug || `tour-${Date.now()}`;
    const newTour: Tour = { ...tourData, id: newId };
    const updated = [newTour, ...tours];
    saveTours(updated);
  };

  const updateTour = (id: string, updatedFields: Partial<Tour>) => {
    const updated = tours.map(t => (t.id === id ? { ...t, ...updatedFields } : t));
    saveTours(updated);
  };

  const deleteTour = (id: string) => {
    const updated = tours.filter(t => t.id !== id);
    saveTours(updated);
  };

  // Review actions
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'pending'
    };
    const updated = [newReview, ...reviews];
    saveReviews(updated);
  };

  const approveReview = (id: string) => {
    const updated = reviews.map(r => (r.id === id ? { ...r, status: 'approved' as const } : r));
    saveReviews(updated);
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
  };

  const updateReviewVideo = (url: string) => {
    saveReviewVideoUrl(url);
  };

  // Booking actions
  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'pending',
      paymentMode: 'cod',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => (b.id === id ? { ...b, status } : b));
    saveBookings(updated);
  };

  const confirmBookingWithDetails = (id: string, details: { amount: number; paymentMode: 'cod' | 'prepaid'; status?: Booking['status'] }) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: details.status || ('booked' as const),
          amount: details.amount,
          paymentMode: details.paymentMode,
          paymentStatus: details.paymentMode === 'prepaid' ? ('collected' as const) : ('pending' as const)
        };
      }
      return b;
    });
    saveBookings(updated);
  };

  // Hero slide actions
  const updateHeroSlide = (id: string, slideData: Partial<HeroSlide>) => {
    const updated = heroSlides.map(s => (s.id === id ? { ...s, ...slideData } : s));
    saveHeroSlides(updated);
  };

  // Cinematic showcase actions
  const updateCinematicData = (data: Partial<CinematicShowcaseData>) => {
    const updated = { ...cinematicData, ...data };
    saveCinematicData(updated);
  };

  // Gallery actions
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    const updated = [newItem, ...galleryItems];
    saveGalleryItems(updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter(g => g.id !== id);
    saveGalleryItems(updated);
  };

  // Casino Venue actions
  const addCasinoVenue = (venueData: Omit<CasinoVenue, 'id'>) => {
    const newId = venueData.slug || `casino-${Date.now()}`;
    const newVenue: CasinoVenue = { ...venueData, id: newId };
    const updated = [...casinoVenues, newVenue];
    saveCasinoVenues(updated);
  };

  const updateCasinoVenue = (id: string, updatedFields: Partial<CasinoVenue>) => {
    const updated = casinoVenues.map(v => (v.id === id ? { ...v, ...updatedFields } : v));
    saveCasinoVenues(updated);
  };

  const deleteCasinoVenue = (id: string) => {
    const updated = casinoVenues.filter(v => v.id !== id);
    saveCasinoVenues(updated);
  };

  const openBookingModal = (tour?: Tour) => {
    if (!user) {
      if (tour) setActiveBookingTour(tour);
      setPendingBookingAction(() => () => {
        if (tour) setActiveBookingTour(tour);
        setIsBookingModalOpen(true);
      });
      openLoginModal();
      return;
    }
    if (tour) {
      setActiveBookingTour(tour);
    }
    setIsBookingModalOpen(true);
  };


  return (
    <AppContext.Provider
      value={{
        tours,
        reviews,
        bookings,
        heroSlides,
        cinematicData,
        galleryItems,
        casinoVenues,
        reviewVideoUrl,
        activeBookingTour,
        setActiveBookingTour,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isAddReviewModalOpen,
        setIsAddReviewModalOpen,
        addTour,
        updateTour,
        deleteTour,
        addReview,
        approveReview,
        deleteReview,
        updateReviewVideo,
        addBooking,
        updateBookingStatus,
        confirmBookingWithDetails,
        updateHeroSlide,
        updateCinematicData,
        addGalleryItem,
        deleteGalleryItem,
        addCasinoVenue,
        updateCasinoVenue,
        deleteCasinoVenue,
        openBookingModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
