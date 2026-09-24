



'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppUser, LoginLog } from '@/types';
import {
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';



type AuthStep = 'idle' | 'enter-email' | 'enter-phone' | 'verify-otp' | 'success';

const recordLoginLog = (userToLog: AppUser) => {
  try {
    const existingLogs: LoginLog[] = JSON.parse(localStorage.getItem('goa_login_logs') || '[]');
    const newLog: LoginLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId: userToLog.id,
      userName: userToLog.displayName,
      userEmail: userToLog.email,
      userPhone: userToLog.phone,
      loginMethod: userToLog.loginMethod,
      timestamp: new Date().toISOString(),
      hasBooked: false,
    };
    existingLogs.unshift(newLog);
    localStorage.setItem('goa_login_logs', JSON.stringify(existingLogs));
  } catch (err) {
    console.error('Failed to record login log', err);
  }
};

interface AuthContextType {

  user: AppUser | null;
  isAuthLoading: boolean;

  // Login modal control
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  // Auth flow state
  authStep: AuthStep;
  authMethod: 'email' | 'phone' | 'google' | null;
  authInput: string; // email or phone that user entered
  otpError: string;

  // Auth actions
  startEmailLogin: () => void;
  startPhoneLogin: () => void;
  submitEmailForOTP: (email: string) => void;
  submitPhoneForOTP: (phone: string, name?: string) => void;
  verifyOTP: (otp: string) => boolean | Promise<boolean>;
  loginWithGoogle: () => void;
  logout: () => void;
  resetAuthFlow: () => void;

  // Pending booking action (to resume after login)
  pendingBookingAction: (() => void) | null;
  setPendingBookingAction: (action: (() => void) | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated OTP for testing — always "123456"
const SIMULATED_OTP = '123456';

// Simulated Google accounts for testing
const SIMULATED_GOOGLE_ACCOUNTS = [
  { name: 'Akhil Sharma', email: 'akhil@gmail.com', photo: '' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>('idle');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google' | null>(null);
  const [authInput, setAuthInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [pendingBookingAction, setPendingBookingAction] = useState<(() => void) | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('goa_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading auth user', e);
    }
    setIsAuthLoading(false);
  }, []);

  const saveUser = (u: AppUser | null) => {
    setUser(u);
    try {
      if (u) {
        localStorage.setItem('goa_auth_user', JSON.stringify(u));
      } else {
        localStorage.removeItem('goa_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
    setAuthStep('idle');
    setAuthMethod(null);
    setAuthInput('');
    setOtpError('');
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setAuthStep('idle');
    setAuthMethod(null);
    setAuthInput('');
    setOtpError('');
  }, []);

  const resetAuthFlow = useCallback(() => {
    setAuthStep('idle');
    setAuthMethod(null);
    setAuthInput('');
    setOtpError('');
  }, []);

  const startEmailLogin = useCallback(() => {
    setAuthStep('enter-email');
    setAuthMethod('email');
    setAuthInput('');
    setOtpError('');
  }, []);

  const startPhoneLogin = useCallback(() => {
    setAuthStep('enter-phone');
    setAuthMethod('phone');
    setAuthInput('');
    setOtpError('');
  }, []);

  const submitEmailForOTP = useCallback((email: string) => {
    setAuthInput(email);
    setAuthStep('verify-otp');
    setOtpError('');
    // In real app: send OTP email via Firebase/backend here
    console.log(`[Auth Simulation] OTP sent to email: ${email}. Use code: ${SIMULATED_OTP}`);
  }, []);

  const [enteredName, setEnteredName] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const submitPhoneForOTP = useCallback(async (phone: string, name?: string) => {
    const rawNumber = phone.replace(/\s/g, '');
    const formattedPhone = rawNumber.startsWith('+') ? rawNumber : `+91${rawNumber}`;
    setAuthInput(phone);
    if (name) setEnteredName(name.trim());
    setOtpError('');

    try {
      if (typeof window !== 'undefined') {
        // Clear DOM element and previous recaptcha instance to prevent "reCAPTCHA has already been rendered in this element"
        const container = document.getElementById('recaptcha-container');
        if (container) {
          container.innerHTML = '';
        }

        if ((window as any).recaptchaVerifier) {
          try {
            (window as any).recaptchaVerifier.clear();
          } catch (e) {
            console.warn('Recaptcha clear notice', e);
          }
          (window as any).recaptchaVerifier = null;
        }

        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {},
        });
        (window as any).recaptchaVerifier = appVerifier;

        const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(confirmation);
        setAuthStep('verify-otp');
      }
    } catch (error: any) {
      console.error('Firebase SMS OTP Error:', error);
      if (error?.code === 'auth/invalid-phone-number') {
        setOtpError('Invalid phone number. Please enter a valid 10-digit mobile number.');
      } else if (error?.code === 'auth/too-many-requests') {
        setOtpError('SMS rate limit reached. Please wait a few minutes or add your number to Firebase test numbers.');
      } else if (error?.code === 'auth/operation-not-allowed' || error?.message?.includes('region enabled')) {
        setOtpError('Phone Auth / India (+91) region is not enabled in Firebase Console. Enable Phone provider & India (+91) in Firebase Settings.');
      } else if (error?.message?.includes('already been rendered')) {
        setOtpError('reCAPTCHA reset. Please click Send OTP again.');
      } else {
        setOtpError(error?.message || 'Failed to send SMS OTP. Please try again.');
      }
    }
  }, []);

  const verifyOTP = useCallback(async (otp: string): Promise<boolean> => {
    setOtpError('');

    if (!confirmationResult) {
      setOtpError('Session expired. Please request a new OTP.');
      return false;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;

      const finalName = enteredName.trim() || firebaseUser.displayName || `User ${authInput.slice(-4)}`;

      const newUser: AppUser = {
        id: firebaseUser.uid,
        displayName: finalName,
        phone: firebaseUser.phoneNumber || authInput,
        loginMethod: 'phone',
        createdAt: new Date().toISOString(),
      };

      let activeUser = newUser;
      try {
        const existingUsers: AppUser[] = JSON.parse(localStorage.getItem('goa_all_users') || '[]');
        const existingIndex = existingUsers.findIndex(u => (newUser.phone && u.phone === newUser.phone) || u.id === newUser.id);
        if (existingIndex !== -1) {
          const existing = existingUsers[existingIndex];
          activeUser = {
            ...existing,
            displayName: finalName || existing.displayName,
            phone: firebaseUser.phoneNumber || existing.phone || authInput,
          };
          existingUsers[existingIndex] = activeUser;
          localStorage.setItem('goa_all_users', JSON.stringify(existingUsers));
          saveUser(activeUser);
        } else {
          existingUsers.push(newUser);
          localStorage.setItem('goa_all_users', JSON.stringify(existingUsers));
          saveUser(newUser);
        }
      } catch {
        saveUser(newUser);
      }

      recordLoginLog(activeUser);
      setAuthStep('success');

      setTimeout(() => {
        closeLoginModal();
        if (pendingBookingAction) {
          pendingBookingAction();
          setPendingBookingAction(null);
        }
      }, 1200);

      return true;
    } catch (err: any) {
      console.error('OTP Verification Error:', err);
      if (err?.code === 'auth/invalid-verification-code') {
        setOtpError('Invalid 6-digit OTP code. Please check your SMS and try again.');
      } else if (err?.code === 'auth/code-expired') {
        setOtpError('OTP code has expired. Please request a new code.');
      } else {
        setOtpError(err?.message || 'OTP verification failed. Please try again.');
      }
      return false;
    }
  }, [authInput, enteredName, confirmationResult, closeLoginModal, pendingBookingAction]);




  const loginWithGoogle = useCallback(async () => {
    setAuthMethod('google');
    setOtpError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const newUser: AppUser = {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Google User',
        email: firebaseUser.email || undefined,
        phone: firebaseUser.phoneNumber || undefined,
        photoURL: firebaseUser.photoURL || undefined,
        loginMethod: 'google',
        createdAt: new Date().toISOString(),
      };

      let activeUser = newUser;
      try {
        const existingUsers: AppUser[] = JSON.parse(localStorage.getItem('goa_all_users') || '[]');
        const existing = existingUsers.find(u => (newUser.email && u.email === newUser.email) || u.id === newUser.id);
        if (existing) {
          activeUser = {
            ...existing,
            displayName: newUser.displayName || existing.displayName,
            photoURL: newUser.photoURL || existing.photoURL
          };
          saveUser(activeUser);
        } else {
          existingUsers.push(newUser);
          localStorage.setItem('goa_all_users', JSON.stringify(existingUsers));
          saveUser(newUser);
        }
      } catch {
        saveUser(newUser);
      }

      recordLoginLog(activeUser);
      setAuthStep('success');

      setTimeout(() => {
        closeLoginModal();
        if (pendingBookingAction) {
          pendingBookingAction();
          setPendingBookingAction(null);
        }
      }, 1200);
    } catch (error: any) {
      console.error('Firebase Google Sign-In Error:', error);
      if (error?.code !== 'auth/popup-closed-by-user') {
        setOtpError(error?.message || 'Google Sign-In failed. Please try again.');
      }
    }
  }, [closeLoginModal, pendingBookingAction]);


  const logout = useCallback(() => {
    saveUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        isLoginModalOpen,
        openLoginModal,
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
        logout,
        resetAuthFlow,
        pendingBookingAction,
        setPendingBookingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
