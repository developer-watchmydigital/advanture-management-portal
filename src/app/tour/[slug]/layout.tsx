import { Metadata } from 'next';
import { INITIAL_TOURS } from '@/data/initialTours';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = INITIAL_TOURS.find((t) => t.slug === slug || t.id === slug);

  if (!tour) {
    return {
      title: 'Goa Adventure Tour Package',
      description: 'Book thrilling adventure tours in Goa with Watch my Adventure.',
    };
  }

  const title = `${tour.title} — Book Online`;
  const description = `${tour.tagline ? tour.tagline + '. ' : ''}${tour.description?.slice(0, 150)}... Instant confirmation & hotel pickup.`;

  return {
    title,
    description,
    keywords: [
      tour.title,
      'Goa tour booking',
      ...tour.placesCovered,
      'Watch my Adventure',
    ],
    alternates: {
      canonical: `/tour/${tour.slug || tour.id}`,
    },
    openGraph: {
      title: `${tour.title} | Watch my Adventure Goa`,
      description,
      url: `https://adventure.watchmydigital.com/tour/${tour.slug || tour.id}`,
      images: [
        {
          url: tour.heroMedia || '/logo.png',
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tour.title} | Watch my Adventure Goa`,
      description,
      images: [tour.heroMedia || '/logo.png'],
    },
  };
}

export default function TourDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
