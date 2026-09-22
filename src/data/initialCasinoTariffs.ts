import { CasinoVenue } from '@/types';

export const INITIAL_CASINO_VENUES: CasinoVenue[] = [
  {
    id: 'deltin-royale',
    slug: 'deltin-royale-casino',
    name: 'DELTIN ROYALE',
    location: 'CASINO • PANJIM • GOA',
    effectiveDate: 'Effective Season 2025 - 2026',
    tagline: 'Asia’s largest & most luxurious floating casino vessel on the Mandovi River, Panjim.',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=1200&auto=format&fit=crop',
    generalInclusions: ['UNLIMITED DINNER', 'UNLIMITED DRINKS*', 'LIVE ENTERTAINMENT'],
    packages: [
      {
        id: 'royale-classic',
        name: 'CLASSIC package',
        price: 4400,
        originalPrice: 4500,
        otpcWorth: 2000,
        liquorTypeLabel: 'UNLIMITED HOUSE BRAND LIQUOR',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'WHISKEY', items: ['Signature', 'Blenders Pride', 'Legacy', "Arton's Reserve (House Brands)"] },
          { category: 'VODKA', items: ['Magic Moments'] },
          { category: 'RUM', items: ['Old Monk', 'Bacardi White / Black', 'Cabo'] },
          { category: 'GIN', items: ['Blue Riband'] },
          { category: 'BRANDY', items: ['Honey Bee', 'Mansion House'] },
          { category: 'BEER', items: ['Kingfisher Pint'] },
          { category: 'FENI', items: ['Big Boss Coconut / Cashew'] }
        ],
        serviceHighlights: [
          {
            title: '₹2,000 OTPC Match Play Chip',
            description: 'Receive ₹2,000 in One Time Play Coupons for live gaming tables including Roulette, Blackjack, and Baccarat.',
            photo: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Multi-Cuisine Buffet',
            description: 'Lavish multi-cuisine dinner buffet featuring Live Counter delicacies, Indian, Continental, and Goan specialties.',
            photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'House Brand Spirits & Beer Bar',
            description: 'Non-stop access to house brand whiskeys, vodkas, rums, gins, and chilled Kingfisher pint beers throughout your stay.',
            photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Vegas Deck Stage Shows',
            description: 'Watch international dance troupes, live musical acts, and stand-up performances on the grand Vegas stage.',
            photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Feeder Boat Pickup & Drop',
            description: 'Complimentary round-trip VIP feeder boat ride from Panjim Jetty to Deltin Royale vessel.',
            photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'royale-premium',
        name: 'PREMIUM package',
        price: 4900,
        originalPrice: 5000,
        otpcWorth: 2000,
        liquorTypeLabel: 'UNLIMITED IMFL LIQUOR',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'WHISKEY', items: ['House Brands', 'Red Label', 'Ballantine', 'Black & White', '100 Pipers', 'Vat 69', 'Grants Distinction', 'Grants Triple Wood', 'Black Dog', "Dewar's White Label", 'Budweiser', 'Magnum Whisky', 'Royal Ranthambore'] },
          { category: 'VODKA', items: ['Smirnoff Regular'] },
          { category: 'GIN', items: ['Stranger & Son', 'Sector Gin'] },
          { category: 'BRANDY', items: ['Morpheus'] },
          { category: 'BEER', items: ['Kingfisher Ultra', 'Carlsberg'] },
          { category: 'WINE', items: ["L'Angoor", 'Fratelli Sidus (R&W)', 'Rose Wine'] },
          { category: 'BREEZERS', items: ['Assorted Breezers'] },
          { category: 'ENERGY DRINKS', items: ['In addition to classic package drinks'] }
        ],
        serviceHighlights: [
          {
            title: '₹2,000 OTPC Match Play Chip',
            description: 'Enjoy ₹2,000 One Time Play Coupon to start playing at premier gaming tables immediately.',
            photo: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited IMFL Spirits & Fine Wine',
            description: 'Access to Red Label, Ballantine, Black Dog, 100 Pipers, Smirnoff, Carlsberg, Kingfisher Ultra, and fine wines.',
            photo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Executive Gourmet Dining Buffet',
            description: 'Full access to 5-star executive dining buffet featuring international appetizers, main courses, and desserts.',
            photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Sky Bar & Vegas Deck Access',
            description: 'Exclusive entry to Sky Bar open-air deck and main Vegas amphitheater shows.',
            photo: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'royale-elite',
        name: 'ELITE package',
        price: 5900,
        originalPrice: 6000,
        otpcWorth: 2000,
        liquorTypeLabel: 'UNLIMITED IMPORTED LIQUOR',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'WHISKEY', items: ['Single Malt', 'Black Label', 'Chivas 12yrs', "Dewar's 12yrs", 'Paul John Nirvana'] },
          { category: 'VODKA', items: ['Absolut', 'Ketel One'] },
          { category: 'GIN', items: ['Bombay Sapphire'] },
          { category: 'BEER', items: ['Heineken'] },
          { category: 'WINE', items: ["L'Angoor", 'Fratelli Sidus (R&W)', 'Rose Wine', 'The Source', "Jacob's Creek (R&W)"] },
          { category: 'SPARKLING WINE', items: ['Sula Brut'] },
          { category: 'LIQUOR', items: ["Bailey's", 'Triple Sec'] },
          { category: 'BREEZERS', items: ['Assorted Breezers'] },
          { category: 'ENERGY DRINKS', items: ['In addition to premium package drinks'] }
        ],
        serviceHighlights: [
          {
            title: '₹2,000 High-Roller OTPC Chip',
            description: 'Premium gaming coupons for elite players at exclusive high-stake tables.',
            photo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Ultra-Imported Spirits & Single Malts',
            description: 'Indulge in Black Label, Chivas 12yrs, Single Malts, Absolut, Bombay Sapphire, Heineken, Sula Brut & Bailey’s.',
            photo: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'VIP Lounge & Deck Privileges',
            description: 'Priority seating, dedicated butler assistance, and full access to all vessel decks.',
            photo: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'royale-ladies-classic',
        name: 'LADIES CLASSIC package',
        price: 2900,
        originalPrice: 3200,
        otpcWorth: 1000,
        liquorTypeLabel: 'ALCOHOL AS PER CLASSIC PACKAGE',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'SPECIAL', items: ['Full classic package alcohol & drinks included'] }
        ],
        serviceHighlights: [
          {
            title: '₹1,000 OTPC Match Coupon',
            description: 'Special gaming entry coupon for ladies at live gaming tables.',
            photo: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Classic Drinks & Cocktails',
            description: 'Includes unlimited alcoholic house brand beverages, mocktails, and soft drinks.',
            photo: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Multi-Cuisine Buffet',
            description: 'Delicious 5-star buffet spread with gourmet salads, mains, and dessert counter.',
            photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'royale-child-teens',
        name: 'CHILD & TEENS package',
        price: 1500,
        originalPrice: 1800,
        otpcWorth: 0,
        liquorTypeLabel: 'NON-ALCOHOLIC & MOCKTAILS',
        ageRange: 'Child: 5 yrs - 11 yrs | Teens: 12 yrs - 20 yrs',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'INCLUSIONS', items: ['Unlimited Buffet Dinner', 'Unlimited Mocktails, Juices & Soft Drinks', 'Live Entertainment & Deck Access'] }
        ],
        serviceHighlights: [
          {
            title: 'Kids & Teens Fun Arcade Access',
            description: 'Non-gaming entertainment zone with VR games, arcade simulators, and fun activities.',
            photo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Mocktails & Soft Drinks',
            description: 'Unlimited refreshing mocktails, fresh fruit juices, and carbonated beverages.',
            photo: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Gourmet Dinner Buffet',
            description: 'Full access to dinner buffet including kid-friendly pasta, pizzas, ice-creams, and Goan dishes.',
            photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
          }
        ]
      }
    ]
  },
  {
    id: 'deltin-jaqk',
    slug: 'deltin-jaqk-casino',
    name: 'DELTIN JAQK',
    location: 'CASINO • PANJIM • GOA',
    effectiveDate: 'Effective Season 2025 - 2026',
    tagline: 'Premium offshore casino gaming experience with top-tier dining & non-stop entertainment.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop',
    generalInclusions: ['UNLIMITED DINNER', 'UNLIMITED DRINKS*', 'LIVE ENTERTAINMENT'],
    packages: [
      {
        id: 'jaqk-classic',
        name: 'CLASSIC package',
        price: 2400,
        originalPrice: 2500,
        otpcWorth: 1000,
        liquorTypeLabel: 'UNLIMITED HOUSE BRAND LIQUOR',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'WHISKEY', items: ['Signature', 'Blenders Pride', 'Legacy', "Arton's Reserve (House Brands)"] },
          { category: 'VODKA', items: ['Magic Moments'] },
          { category: 'RUM', items: ['Old Monk', 'Bacardi White / Black', 'Cabo'] },
          { category: 'GIN', items: ['Blue Riband'] },
          { category: 'BRANDY', items: ['Honey Bee', 'Mansion House'] },
          { category: 'BEER', items: ['Kingfisher Pint'] },
          { category: 'FENI', items: ['Big Boss Coconut / Cashew'] }
        ],
        serviceHighlights: [
          {
            title: '₹1,000 OTPC Chip',
            description: 'Get ₹1,000 OTPC chip for live gaming floors.',
            photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Buffet Dinner',
            description: 'Delicious multi-cuisine dinner buffet on board.',
            photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'jaqk-premium',
        name: 'PREMIUM package',
        price: 2900,
        originalPrice: 3000,
        otpcWorth: 1000,
        liquorTypeLabel: 'UNLIMITED IMFL LIQUOR',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'WHISKEY', items: ['House Brands', 'Red Label', 'Ballantine', 'Black & White', '100 Pipers', 'Vat 69', 'Grants Distinction', 'Grants Triple Wood', 'Black Dog', "Dewar's White Label", 'Budweiser', 'Magnum Whisky', 'Royal Ranthambore'] },
          { category: 'VODKA', items: ['Smirnoff Regular'] },
          { category: 'GIN', items: ['Stranger & Son', 'Sector Gin'] },
          { category: 'BRANDY', items: ['Morpheus'] },
          { category: 'BEER', items: ['Kingfisher Ultra', 'Carlsberg'] },
          { category: 'WINE', items: ["L'Angoor", 'Fratelli Sidus (R&W)', 'Rose Wine'] },
          { category: 'BREEZERS', items: ['Assorted Breezers'] },
          { category: 'ENERGY DRINKS', items: ['In addition to classic package drinks'] }
        ],
        serviceHighlights: [
          {
            title: '₹1,000 OTPC Chip',
            description: 'Includes ₹1,000 One Time Play Coupon for gaming.',
            photo: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited IMFL Bar & Wines',
            description: 'Red Label, Ballantine, Smirnoff, Carlsberg & Wines.',
            photo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'jaqk-elite',
        name: 'ELITE package',
        price: 3400,
        originalPrice: 3500,
        otpcWorth: 1000,
        liquorTypeLabel: 'UNLIMITED IMPORTED LIQUOR',
        accessTags: ['Vegas', 'Sky Bar'],
        image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'WHISKEY', items: ['Single Malt', 'Black Label', 'Chivas 12yrs', "Dewar's 12yrs", 'Paul John Nirvana'] },
          { category: 'VODKA', items: ['Absolut', 'Ketel One'] },
          { category: 'GIN', items: ['Bombay Sapphire'] },
          { category: 'BEER', items: ['Heineken'] },
          { category: 'WINE', items: ["L'Angoor", 'Fratelli Sidus (R&W)', 'Rose Wine', 'The Source', "Jacob's Creek (R&W)"] },
          { category: 'SPARKLING WINE', items: ['Sula Brut'] },
          { category: 'LIQUOR', items: ["Bailey's", 'Triple Sec'] },
          { category: 'BREEZERS', items: ['Assorted Breezers'] },
          { category: 'ENERGY DRINKS', items: ['In addition to premium package drinks'] }
        ],
        serviceHighlights: [
          {
            title: '₹1,000 OTPC Chip',
            description: 'OTPC gaming coupons for high deck tables.',
            photo: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Imported Premium Bar',
            description: 'Black Label, Chivas, Heineken, Absolut & Champagne.',
            photo: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop'
          }
        ]
      },
      {
        id: 'jaqk-child-teens',
        name: 'CHILD & TEENS package',
        price: 1250,
        originalPrice: 1500,
        otpcWorth: 0,
        liquorTypeLabel: 'NON-ALCOHOLIC & MOCKTAILS',
        ageRange: 'Child: 5 yrs - 11 yrs | Teens: 12 yrs - 20 yrs',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
        drinkCategories: [
          { category: 'INCLUSIONS', items: ['Unlimited Buffet Dinner', 'Unlimited Mocktails, Juices & Soft Drinks', 'Live Entertainment & Gaming Deck Access'] }
        ],
        serviceHighlights: [
          {
            title: 'Kids Play Zone & Live Acts',
            description: 'Non-stop entertainment, music, and kid friendly fun.',
            photo: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop'
          },
          {
            title: 'Unlimited Mocktails & Buffet',
            description: 'Fresh mocktails and multi-cuisine buffet dinner.',
            photo: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop'
          }
        ]
      }
    ]
  }
];
