'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus, Quote, CheckCircle2 } from 'lucide-react';

export default function ReviewsSection() {
  const { reviews, reviewVideoUrl, setIsAddReviewModalOpen } = useApp();
  const approvedReviews = reviews.filter((r) => r.status === 'approved');
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (approvedReviews.length === 0) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % approvedReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [approvedReviews.length]);

  const currentReview = approvedReviews[activeIdx] || approvedReviews[0];

  return (
    <section id="reviews" className="py-20 px-4 sm:px-8 bg-zinc-950 border-t border-zinc-800 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-black tracking-widest text-amber-400 uppercase mb-2">
            REAL ADVENTURER EXPERIENCES
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            What Our Guests Say About Us
          </h3>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Split Layout Matching Image 3 Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
          {/* Left Side: Full-bleed Hero Video (Image 3 Style) */}
          <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[460px] bg-zinc-950 overflow-hidden">
            <video
              src={reviewVideoUrl || '/gemini_generated_video_89554782.mp4'}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/20 to-zinc-950 lg:bg-gradient-to-t" />
            <div className="absolute bottom-6 left-6 right-6 bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-amber-400">4.9 STAR OVERALL RATING</p>
                <p className="text-[11px] text-zinc-300">Based on 2,400+ Verified Goa Adventurers</p>
              </div>
              <button
                onClick={() => setIsAddReviewModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-xs transition shadow-md flex items-center space-x-1.5"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write Review</span>
              </button>
            </div>
          </div>

          {/* Right Side: Dark Card Review Carousel (Image 3 Style) */}
          <div className="lg:col-span-6 p-8 sm:p-12 bg-zinc-950 flex flex-col justify-between relative">
            <div className="absolute top-6 right-6 text-amber-500/10">
              <Quote className="w-24 h-24 stroke-[1]" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (currentReview?.rating || 5)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                  OUR TOP REVIEWS
                </span>
              </div>

              {currentReview ? (
                <div className="space-y-6 relative z-10 transition-all duration-500">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    {currentReview.tourName}
                  </h4>

                  <p className="text-base sm:text-lg text-zinc-200 italic font-serif leading-relaxed">
                    &ldquo;{currentReview.comment}&rdquo;
                  </p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-zinc-800">
                    <img
                      src={currentReview.avatar}
                      alt={currentReview.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                    />
                    <div>
                      <h5 className="text-white font-bold text-sm flex items-center space-x-1.5">
                        <span>{currentReview.author}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                      </h5>
                      <p className="text-xs text-zinc-400">{currentReview.date}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-400 text-sm">No reviews yet. Be the first to leave a review!</p>
              )}
            </div>

            {/* Carousel Navigation Controls (Image 3 Style Dots & Arrows) */}
            <div className="mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
              {/* Dot Indicators */}
              <div className="flex space-x-2">
                {approvedReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIdx ? 'w-8 bg-amber-400' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setActiveIdx(
                      (prev) => (prev - 1 + approvedReviews.length) % approvedReviews.length
                    )
                  }
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveIdx((prev) => (prev + 1) % approvedReviews.length)}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-amber-500 hover:text-zinc-950 flex items-center justify-center transition"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
