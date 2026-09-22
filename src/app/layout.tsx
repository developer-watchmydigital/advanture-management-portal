import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

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
  title: 'Watch my Adventure | #1 Extreme Water & Hill Adventures in Goa',
  description: 'Book thrilling Goa adventures: Scuba Diving at Grande Island, 55M Bungee Jumping, Dudhsagar Jeep Safari, Mandovi Luxury Dinner Cruise, VIP Floating Casino, and 5-in-1 Water Sports.',
  keywords: ['Watch my Adventure', 'Goa adventures', 'scuba diving Goa', 'bungee jumping Goa', 'Dudhsagar safari', 'Mandovi dinner cruise', 'water sports Calangute'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased min-h-screen" suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
