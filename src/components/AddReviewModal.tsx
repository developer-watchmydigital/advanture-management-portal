'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

export default function AddReviewModal() {
  const { isAddReviewModalOpen, setIsAddReviewModalOpen, tours, addReview } = useApp();
  
  const [author, setAuthor] = useState('');
  const [tourName, setTourName] = useState(tours[0]?.title || 'Scuba Diving Tour');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isAddReviewModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) {
      alert('Please provide your name and review comment.');
      return;
    }

    addReview({
      author,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop`,
      tourName,
      rating,
      comment
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsAddReviewModalOpen(false);
    setIsSubmitted(false);
    setAuthor('');
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <div className="p-6 bg-gradient-to-r from-amber-950/50 to-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquarePlus className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-serif">Share Your Goa Experience</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-white">Thank You for Your Feedback!</h4>
              <p className="text-xs text-zinc-300">
                Your review has been recorded. It will appear on our homepage once verified by our team!
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-amber-500 text-zinc-950 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Tour Experienced</label>
                <select
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  {tours.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Star Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Your Review Comment *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the scuba diving, jeep safari, staff behavior..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black uppercase text-xs rounded-xl transition shadow-lg"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
