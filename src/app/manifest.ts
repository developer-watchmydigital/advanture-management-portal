import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Watch my Adventure | #1 Goa Adventure Tours & Water Sports',
    short_name: 'WatchMyAdventure',
    description: 'Book thrilling Goa adventures: Scuba Diving at Grande Island, Bungee Jumping, Dudhsagar Jeep Safari, Mandovi Dinner Cruise & Floating Casinos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#f59e0b',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
