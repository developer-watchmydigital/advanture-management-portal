import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';

import JsonLd from '@/components/JsonLd';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adventure.watchmydigital.com'),
  title: {
    default: 'Watch my Adventure | #1 Extreme Water & Hill Adventures in Goa',
    template: '%s | Watch my Adventure Goa',
  },
  description: 'Book thrilling Goa adventures: Scuba Diving at Grande Island, 55M Bungee Jumping, Dudhsagar Jeep Safari, Mandovi Luxury Dinner Cruise, VIP Floating Casino, and 5-in-1 Water Sports.',
  keywords: [
    'Watch my Adventure',
    'Goa adventures',
    'scuba diving Goa',
    'Grande island scuba',
    'bungee jumping Goa',
    'Dudhsagar waterfall safari',
    'Mandovi dinner cruise',
    'water sports Calangute',
    'Deltin Royale casino pass',
    'Goa water sports combo',
  ],
  authors: [{ name: 'Watch my Adventure' }],
  creator: 'Watch my Adventure',
  publisher: 'Watch my Adventure',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Watch my Adventure | #1 Extreme Water & Hill Adventures in Goa',
    description: 'Book thrilling Goa adventures: Scuba Diving at Grande Island, 55M Bungee Jumping, Dudhsagar Jeep Safari, Dinner Cruises, and Casino Passes.',
    url: 'https://adventure.watchmydigital.com',
    siteName: 'Watch my Adventure',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Watch my Adventure Goa',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch my Adventure | #1 Extreme Water & Hill Adventures in Goa',
    description: 'Book thrilling Goa adventures: Scuba Diving, Bungee Jumping, Dudhsagar Safari & Casino VIP Passes.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          <AppProvider>
            {children}
            <LoginModal />
            <JsonLd />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

