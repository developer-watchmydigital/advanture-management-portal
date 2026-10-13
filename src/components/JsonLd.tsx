import React from 'react';

export default function JsonLd() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': 'https://adventure.watchmydigital.com/#agency',
        name: 'Watch my Adventure',
        url: 'https://adventure.watchmydigital.com',
        logo: 'https://adventure.watchmydigital.com/logo.png',
        image: 'https://adventure.watchmydigital.com/logo.png',
        description: 'Premium adventure tour operator in Goa offering Scuba Diving at Grande Island, 55M Bungee Jumping, Dudhsagar Waterfall Jeep Safari, Dinner Cruises, and Floating Casino Passes.',
        telephone: '+919588667027',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calangute - Baga Road, North Goa',
          addressLocality: 'Calangute',
          addressRegion: 'Goa',
          postalCode: '403516',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '15.5439',
          longitude: '73.7553',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '06:00',
            closes: '23:00',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1280',
          bestRating: '5',
          worstRating: '1',
        },
        sameAs: [
          'https://www.instagram.com',
          'https://www.facebook.com',
          'https://wa.me/919588667027',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://adventure.watchmydigital.com/#website',
        url: 'https://adventure.watchmydigital.com',
        name: 'Watch my Adventure',
        description: 'Book Goa Adventures: Scuba Diving, Bungee Jumping, Dudhsagar Safari & Casino VIP Passes',
        publisher: {
          '@id': 'https://adventure.watchmydigital.com/#agency',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
