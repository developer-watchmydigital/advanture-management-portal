import { Metadata } from 'next';
import { INITIAL_CASINO_VENUES } from '@/data/initialCasinoTariffs';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ venueSlug: string; pkgId: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ venueSlug: string; pkgId: string }>;
}): Promise<Metadata> {
  const { venueSlug, pkgId } = await params;
  const venue = INITIAL_CASINO_VENUES.find((v) => v.slug === venueSlug || v.id === venueSlug);
  const pkg = venue?.packages.find((p) => p.id === pkgId);

  if (!venue || !pkg) {
    return {
      title: 'Goa Casino VIP Pass & Entry',
      description: 'Book official Goa luxury offshore casino passes with Watch my Adventure.',
    };
  }

  const title = `🎰 ${venue.name} — ${pkg.name} VIP Pass (₹${pkg.price})`;
  const description = `${venue.name} Goa Casino entry ticket: ${pkg.name}. Includes unlimited buffet dinner, drinks, live entertainment, and OTPC match play coupon.`;

  return {
    title,
    description,
    keywords: [
      venue.name,
      pkg.name,
      'Goa floating casino booking',
      'Deltin casino pass',
      'Mandovi river casino tickets',
      'Watch my Adventure Goa',
    ],
    alternates: {
      canonical: `/casino/${venue.slug}/${pkg.id}`,
    },
    openGraph: {
      title: `${venue.name} ${pkg.name} | Watch my Adventure Goa`,
      description,
      url: `https://adventure.watchmydigital.com/casino/${venue.slug}/${pkg.id}`,
      images: [
        {
          url: pkg.image || venue.image || '/logo.png',
          width: 1200,
          height: 630,
          alt: `${venue.name} ${pkg.name}`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${venue.name} ${pkg.name} | Watch my Adventure`,
      description,
      images: [pkg.image || venue.image || '/logo.png'],
    },
  };
}

export default function CasinoPackageLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
