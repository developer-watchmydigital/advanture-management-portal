'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CalendarCheck, Clock, MapPin, Users, Package, ArrowLeft,
  User, Mail, Phone, LogIn, CheckCircle2, XCircle, AlertCircle,
  PhoneCall, Star, Sparkles, RefreshCw, RotateCcw
} from 'lucide-react';

export default function MyBookingsPage() {
  const { user, isAuthLoading, openLoginModal } = useAuth();
  const { bookings } = useApp();

  // Filter bookings for the current user
  const userBookings = useMemo(() => {
    if (!user) return [];
    return bookings.filter(
      b => b.userId === user.id ||
           (user.phone && b.customerPhone === user.phone) ||
           (user.email && b.customerName.toLowerCase() === user.displayName.toLowerCase())
    );
  }, [bookings, user]);

  // Separate into upcoming, cancelled/refunded, and past
  const today = new Date().toISOString().split('T')[0];

  const upcomingBookings = useMemo(() => {
    return userBookings
      .filter(b => b.date >= today && b.status !== 'cancelled' && b.status !== 'refunded')
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [userBookings, today]);

  const cancelledOrRefundedBookings = useMemo(() => {
    return userBookings
      .filter(b => b.status === 'cancelled' || b.status === 'refunded')
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [userBookings]);

  const pastBookings = useMemo(() => {
    return userBookings
      .filter(b => b.date < today && b.status !== 'cancelled' && b.status !== 'refunded')
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [userBookings, today]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'booked':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 text-[10px] font-bold uppercase border border-blue-500/20">
            <PhoneCall className="w-3 h-3" />
            <span>Contacted</span>
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-400 text-[10px] font-bold uppercase border border-purple-500/20">
            <RefreshCw className="w-3 h-3 text-purple-400" />
            <span>Refunded</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-red-500/15 text-red-400 text-[10px] font-bold uppercase border border-red-500/20">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase border border-amber-500/20">
            <AlertCircle className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
    }
  };


  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (isAuthLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-zinc-950 pt-40 pb-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    );
  }

  // Not logged in — show login prompt
  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-zinc-950 pt-40 pb-20">
          <div className="max-w-lg mx-auto text-center px-4 space-y-6">
            <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
              <LogIn className="w-10 h-10 text-zinc-600" />
            </div>
            <h1 className="text-3xl font-black text-white font-serif">Login Required</h1>
            <p className="text-zinc-400 text-sm">
              Please login to view your bookings and manage your adventures.
            </p>
            <button
              onClick={openLoginModal}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition"
            >
              <User className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
            <div>
              <Link href="/" className="text-xs text-zinc-500 hover:text-amber-400 transition">
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Back button */}
          <Link href="/" className="inline-flex items-center space-x-1 text-zinc-500 hover:text-amber-400 text-xs transition mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          {/* User Profile Card */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

            <div className="relative flex items-center space-x-5">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/30" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-zinc-950 font-black text-xl shrink-0">
                  {getInitials(user.displayName)}
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white">{user.displayName}</h1>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-1">
                  {user.email && (
                    <span className="flex items-center space-x-1 text-xs text-zinc-400">
                      <Mail className="w-3 h-3 text-zinc-600" />
                      <span>{user.email}</span>
                    </span>
                  )}
                  {user.phone && (
                    <span className="flex items-center space-x-1 text-xs text-zinc-400">
                      <Phone className="w-3 h-3 text-zinc-600" />
                      <span>{user.phone}</span>
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-zinc-600 mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-zinc-950/60 rounded-2xl p-4 text-center border border-zinc-800">
                <p className="text-2xl font-black text-amber-400">{userBookings.length}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Total Bookings</p>
              </div>
              <div className="bg-zinc-950/60 rounded-2xl p-4 text-center border border-zinc-800">
                <p className="text-2xl font-black text-emerald-400">{upcomingBookings.length}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Upcoming</p>
              </div>
              <div className="bg-zinc-950/60 rounded-2xl p-4 text-center border border-zinc-800">
                <p className="text-2xl font-black text-purple-400">{cancelledOrRefundedBookings.length}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Cancelled/Refunded</p>
              </div>
              <div className="bg-zinc-950/60 rounded-2xl p-4 text-center border border-zinc-800">
                <p className="text-2xl font-black text-zinc-400">{pastBookings.length}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mt-1">Past</p>
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <section className="mb-10">
            <div className="flex items-center space-x-2 mb-4">
              <CalendarCheck className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-white">Upcoming Bookings</h2>
            </div>

            {upcomingBookings.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-10 text-center">
                <Sparkles className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm font-medium">No upcoming bookings yet</p>
                <Link href="/#tours" className="inline-block mt-4 text-xs text-amber-400 hover:text-amber-300 font-bold transition">
                  Browse Tour Packages →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map(booking => (
                  <div key={booking.id} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 hover:border-amber-500/20 transition group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusBadge(booking.status)}
                          <span className="text-[10px] text-zinc-600 font-mono">{booking.id}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white truncate group-hover:text-amber-400 transition">
                          {booking.tourTitle}
                        </h3>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-zinc-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-amber-500/60" />
                            <span>{formatDate(booking.date)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-amber-500/60" />
                            <span>{booking.guestCount} Guest(s)</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-amber-500/60" />
                            <span className="truncate max-w-[150px]">{booking.pickupLocation}</span>
                          </span>
                        </div>
                      </div>
                      {booking.amount && (
                        <div className="text-right shrink-0">
                          <p className="text-lg font-black text-amber-400">₹{booking.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-zinc-600 uppercase">{booking.paymentMode === 'prepaid' ? 'Paid' : 'COD'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Cancelled & Refunded Bookings Section */}
          {cancelledOrRefundedBookings.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center space-x-2 mb-4">
                <RotateCcw className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-black text-white">Cancelled & Refunded Bookings</h2>
              </div>

              <div className="space-y-4">
                {cancelledOrRefundedBookings.map(booking => (
                  <div key={booking.id} className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 hover:border-purple-500/30 transition group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusBadge(booking.status)}
                          <span className="text-[10px] text-zinc-500 font-mono">{booking.id}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-zinc-300 truncate">
                          {booking.tourTitle}
                        </h3>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-zinc-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-zinc-500" />
                            <span>{formatDate(booking.date)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-zinc-500" />
                            <span>{booking.guestCount} Guest(s)</span>
                          </span>
                        </div>
                        {booking.status === 'refunded' && (
                          <p className="text-[11px] text-purple-400 font-medium mt-2 flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Refund processed for this booking.</span>
                          </p>
                        )}
                        {booking.status === 'cancelled' && (
                          <p className="text-[11px] text-red-400 font-medium mt-2 flex items-center space-x-1">
                            <XCircle className="w-3 h-3" />
                            <span>Booking was cancelled.</span>
                          </p>
                        )}
                      </div>
                      {booking.amount && (
                        <div className="text-right shrink-0">
                          <p className="text-lg font-black text-zinc-400 line-through">₹{booking.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-purple-400 uppercase font-bold">{booking.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}


          {/* Past Bookings */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="w-5 h-5 text-zinc-500" />
              <h2 className="text-lg font-black text-white">Past Bookings</h2>
            </div>

            {pastBookings.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-10 text-center">
                <Clock className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm font-medium">No past bookings</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastBookings.map(booking => (
                  <div key={booking.id} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 opacity-80 hover:opacity-100 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusBadge(booking.status)}
                          <span className="text-[10px] text-zinc-700 font-mono">{booking.id}</span>
                        </div>
                        <h3 className="text-sm font-bold text-zinc-300 truncate">
                          {booking.tourTitle}
                        </h3>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-zinc-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(booking.date)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{booking.guestCount} Guest(s)</span>
                          </span>
                        </div>
                      </div>
                      {booking.amount && (
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-zinc-400">₹{booking.amount.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
