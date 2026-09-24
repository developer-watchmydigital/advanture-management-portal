'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Phone, ArrowLeft, CheckCircle2, Shield, Sparkles, Loader2 } from 'lucide-react';

export default function LoginModal() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    authStep,
    authMethod,
    authInput,
    otpError,
    startEmailLogin,
    startPhoneLogin,
    submitEmailForOTP,
    submitPhoneForOTP,
    verifyOTP,
    loginWithGoogle,
    resetAuthFlow,
  } = useAuth();

  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Reset local state when modal opens
  useEffect(() => {
    if (isLoginModalOpen) {
      setEmailInput('');
      setPhoneInput('');
      setNameInput('');
      setOtpDigits(['', '', '', '', '', '']);
      setIsSubmitting(false);
      setIsSendingOtp(false);
    }
  }, [isLoginModalOpen]);

  // Focus first OTP input when verify step opens
  useEffect(() => {
    if (authStep === 'verify-otp') {
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [authStep]);

  if (!isLoginModalOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) return;
    submitEmailForOTP(emailInput.trim());
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phoneInput.replace(/\s/g, '');
    if (cleaned.length < 10 || !nameInput.trim() || isSendingOtp) return;
    setIsSendingOtp(true);
    try {
      await submitPhoneForOTP(cleaned, nameInput.trim());
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingOtp(false);
    }
  };


  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otpDigits];
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtpDigits(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      otpRefs.current[nextIndex]?.focus();

      // Auto-verify if all filled
      if (newOtp.every(d => d !== '')) {
        setIsSubmitting(true);
        setTimeout(() => {
          verifyOTP(newOtp.join(''));
          setIsSubmitting(false);
        }, 600);
      }
      return;
    }

    const newOtp = [...otpDigits];
    newOtp[index] = value.replace(/\D/g, '');
    setOtpDigits(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all filled
    if (newOtp.every(d => d !== '')) {
      setIsSubmitting(true);
      setTimeout(() => {
        verifyOTP(newOtp.join(''));
        setIsSubmitting(false);
      }, 600);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleManualVerify = () => {
    const code = otpDigits.join('');
    if (code.length !== 6) return;
    setIsSubmitting(true);
    setTimeout(() => {
      verifyOTP(code);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">

        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        {/* Invisible Recaptcha container for Firebase Phone Auth */}
        <div id="recaptcha-container"></div>

        {/* Close button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>


        <div className="relative p-8">

          {/* === IDLE: Choose Login Method === */}
          {authStep === 'idle' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                </div>
                <h2 className="text-2xl font-black text-white font-serif">Welcome to Adventure</h2>
                <p className="text-sm text-zinc-400">Login to book your dream Goa experience</p>
              </div>

              {/* Login Options */}
              <div className="space-y-3">
                <button
                  onClick={startPhoneLogin}
                  className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 hover:border-amber-500/40 hover:bg-zinc-800 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/40 transition">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Continue with Mobile Number</p>
                    <p className="text-[11px] text-zinc-500">Get instant OTP on your phone</p>
                  </div>
                </button>


                {/* Divider */}
                <div className="flex items-center space-x-3 py-1">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">or</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>

                <button
                  onClick={loginWithGoogle}
                  className="w-full flex items-center justify-center space-x-3 px-5 py-4 rounded-2xl bg-white/5 border border-zinc-700/50 hover:border-white/20 hover:bg-white/10 transition-all"
                >
                  {/* Google SVG Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-sm font-bold text-white">Continue with Google</span>
                </button>
              </div>

              {/* Security note */}
              <div className="flex items-center justify-center space-x-2 text-[10px] text-zinc-600">
                <Shield className="w-3 h-3" />
                <span>Your data is safe & encrypted. We never share your info.</span>
              </div>
            </div>
          )}

          {/* === ENTER EMAIL === */}
          {authStep === 'enter-email' && (
            <div className="space-y-6">
              <button onClick={resetAuthFlow} className="flex items-center space-x-1 text-zinc-400 hover:text-white text-xs transition">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Mail className="w-7 h-7 text-blue-400" />
                </div>
                <h2 className="text-xl font-black text-white">Enter your Email</h2>
                <p className="text-xs text-zinc-400">We'll send a 6-digit verification code</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  autoFocus
                  required
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 placeholder-zinc-600 transition"
                />
                <button
                  type="submit"
                  disabled={!emailInput.includes('@')}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send OTP
                </button>
              </form>

              <p className="text-center text-[10px] text-zinc-600">
                🧪 Test mode: OTP is always <span className="text-amber-400 font-bold">123456</span>
              </p>
            </div>
          )}

          {/* === ENTER PHONE === */}
          {authStep === 'enter-phone' && (
            <div className="space-y-6">
              <button onClick={resetAuthFlow} className="flex items-center space-x-1 text-zinc-400 hover:text-white text-xs transition">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                  <Phone className="w-7 h-7 text-emerald-400" />
                </div>
                <h2 className="text-xl font-black text-white">Enter your Phone</h2>
                <p className="text-xs text-zinc-400">We'll send an SMS with a 6-digit OTP</p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-zinc-300 font-bold text-xs mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    autoFocus
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 placeholder-zinc-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-bold text-xs mb-1">Mobile Number *</label>
                  <div className="flex space-x-2">
                    <div className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-3.5 text-zinc-400 font-bold text-sm w-16 text-center shrink-0">
                      +91
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value.replace(/[^\d\s]/g, ''))}
                      className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 placeholder-zinc-600 transition"
                    />
                  </div>
                </div>

                {otpError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 text-center">
                    {otpError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!nameInput.trim() || phoneInput.replace(/\s/g, '').length < 10 || isSendingOtp}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <span>Send OTP</span>
                  )}
                </button>
              </form>

            </div>
          )}

          {/* === VERIFY OTP === */}
          {authStep === 'verify-otp' && (
            <div className="space-y-6">
              <button onClick={() => authMethod === 'email' ? startEmailLogin() : startPhoneLogin()} className="flex items-center space-x-1 text-zinc-400 hover:text-white text-xs transition">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change {authMethod === 'email' ? 'email' : 'phone'}</span>
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                  <Shield className="w-7 h-7 text-amber-400" />
                </div>
                <h2 className="text-xl font-black text-white">Verify OTP</h2>
                <p className="text-xs text-zinc-400">
                  Enter the code sent to{' '}
                  <span className="text-white font-bold">{authInput}</span>
                </p>
              </div>

              {/* OTP Input Grid */}
              <div className="flex justify-center space-x-2.5">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-black rounded-xl border bg-zinc-950 text-white focus:outline-none transition-all ${
                      otpError
                        ? 'border-red-500 focus:border-red-400'
                        : digit
                        ? 'border-amber-500/60 focus:border-amber-400'
                        : 'border-zinc-700 focus:border-amber-500'
                    } focus:ring-1 focus:ring-amber-500/30`}
                  />
                ))}
              </div>

              {/* Error */}
              {otpError && (
                <p className="text-center text-xs text-red-400 font-medium">{otpError}</p>
              )}

              <button
                onClick={handleManualVerify}
                disabled={otpDigits.some(d => !d) || isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify & Login</span>
                )}
              </button>
            </div>
          )}


          {/* === SUCCESS === */}
          {authStep === 'success' && (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 mx-auto bg-emerald-500/15 rounded-full flex items-center justify-center border border-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-black text-white">You're In! 🎉</h2>
              <p className="text-sm text-zinc-400">
                Welcome{authMethod === 'google' ? '' : ' back'}! Redirecting you now...
              </p>
              <div className="flex justify-center">
                <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
