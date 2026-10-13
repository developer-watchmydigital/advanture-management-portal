import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Goa Adventure Tours & Water Sports Online',
  description: 'Book Scuba Diving, Bungee Jumping, Dudhsagar Jeep Safari, and Mandovi Dinner Cruises with instant WhatsApp confirmation and hotel pickup in Goa.',
  alternates: {
    canonical: '/book',
  },
  openGraph: {
    title: 'Book Goa Adventure Tours Online | Watch my Adventure',
    description: 'Instant booking for top-rated Goa water sports, adventure tours, and casino passes.',
    url: 'https://adventure.watchmydigital.com/book',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
