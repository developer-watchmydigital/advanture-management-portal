import { MetadataRoute } from 'next';
import { INITIAL_TOURS } from '@/data/initialTours';
import { INITIAL_CASINO_VENUES } from '@/data/initialCasinoTariffs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adventure.watchmydigital.com';

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/my-bookings`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. Dynamic Adventure Tour Package Pages
  const tourRoutes: MetadataRoute.Sitemap = INITIAL_TOURS.map((tour) => ({
    url: `${baseUrl}/tour/${tour.slug || tour.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Dynamic Casino Venue & Package Pages
  const casinoRoutes: MetadataRoute.Sitemap = INITIAL_CASINO_VENUES.flatMap((venue) =>
    venue.packages.map((pkg) => ({
      url: `${baseUrl}/casino/${venue.slug}/${pkg.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    }))
  );

  return [...staticRoutes, ...tourRoutes, ...casinoRoutes];
}
