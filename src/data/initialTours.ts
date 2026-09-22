import { Tour } from '@/types';

export const INITIAL_TOURS: Tour[] = [
  {
    id: 'dudhsagar-tour',
    slug: 'dudhsagar-tour',
    title: 'Dudhsagar Waterfalls with Jungle Safari & Spice Plantation',
    tagline: 'Jeep Safari Through Mollem National Park, Natural Swimming & Old Goa Heritage',
    price: 2499,
    originalPrice: 3200,
    discount: '22% OFF',
    duration: 'Full Day (6:00 AM - 5:30 PM)',
    rating: 4.9,
    reviewCount: 510,
    heroMedia: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Embark on Goa’s iconic wilderness expedition! Experience an exciting 4x4 off-road Jeep safari through Mollem National Park streams, trek to Dudhsagar Waterfalls for a refreshing swim with life jackets, savor a Goan buffet lunch at a tropical spice farm, and explore historic Old Goa Churches.',
    placesCovered: ['Dudhsagar Waterfalls Base Pool', 'Mollem National Park', 'Sahakari Spice Plantation', 'Basilica of Bom Jesus / Se Cathedral'],
    tourRoute: 'Hotel Pickup -> Mollem Basecamp -> 4x4 Jeep Safari -> Dudhsagar Pool Swim -> Spice Farm Lunch -> Old Goa Churches -> Hotel Drop',
    timings: '06:00 AM Pickup | 05:30 PM Drop',
    inclusions: [
      'Pick-up and drop-off service',
      'Air-conditioned transport',
      'Jeep safari through Mollem National Park',
      'Forest entry charges and permits',
      'Life jacket rental for swimming at the falls',
      'Guided Spice Plantation tour',
      'Buffet lunch with authentic Goan Veg and Non-Veg selections',
      'Stop at Old Goa Churches'
    ],
    exclusions: ['Camera permits at checkpost if applicable'],
    itinerary: [
      {
        time: '06:00 AM - 08:30 AM',
        title: 'Hotel Pickup & Transit to Mollem',
        description: 'Early morning AC coach pickup from hotel to the Mollem basecamp.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:30 AM - 10:00 AM',
        title: 'Off-Road Jeep Safari',
        description: 'Adventurous off-road Jeep Safari crossing jungle streams and rocky paths inside Mollem National Park.',
        photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:00 AM - 12:00 PM',
        title: 'Dudhsagar Trek & Natural Waterfall Pool Swim',
        description: '15-minute trek to Dudhsagar Waterfalls; 1 to 1.5 hours of leisure time for swimming with safety life jackets.',
        photo: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '12:30 PM - 02:30 PM',
        title: 'Spice Plantation Guided Tour & Buffet Lunch',
        description: 'Jeep ride back to base and arrival at the Spice Plantation; welcome drink, guided flora walk, and buffet lunch.',
        photo: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '02:30 PM - 04:30 PM',
        title: 'Heritage Old Goa Churches Visit',
        description: 'Visit to the heritage Old Goa Churches (Basilica of Bom Jesus / Se Cathedral).',
        photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '04:30 PM - 05:30 PM',
        title: 'Return Drive & Hotel Drop',
        description: 'Return drive and comfortable hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'grand-island-snorkeling',
    slug: 'grand-island-snorkeling',
    title: 'Grand Island Snorkeling & Dolphin Sightseeing Trip',
    tagline: 'Scenic Boat Cruise, Wild Dolphin Spotting, Snorkeling, Bottom Fishing & Island Buffet',
    price: 1799,
    originalPrice: 2499,
    discount: '28% OFF',
    duration: 'Full Day (8:00 AM - 5:00 PM)',
    rating: 4.8,
    reviewCount: 390,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Sail away to Grand Island! Spot wild dolphins leaping in open waters, explore vibrant underwater marine life with snorkeling gear, try your hand at bottom fishing, and relax on the beach with chilled beers and a delicious buffet lunch.',
    placesCovered: ['Grand Island Reefs', 'Dolphin Bay', 'Monkey Beach / Island Shore', 'Boat Jetty'],
    tourRoute: 'Hotel Pickup -> Jetty Departure -> Dolphin Cruise -> Grand Island Snorkeling & Fishing -> Monkey Beach Lunch -> Jetty Drop',
    timings: '08:00 AM Pickup | 05:00 PM Drop',
    inclusions: [
      'Shared pick-up and drop-off from North Goa hotels',
      'Scenic boat ride to Grand Island',
      'Snorkeling equipment and basic instructor guidance',
      'Bottom fishing with hand lines and bait',
      'Dolphin spotting in open waters',
      'Chilled beer, soft drinks, and packaged mineral water',
      'Mid-day fruits and light snacks',
      'Beachside buffet lunch with Veg and Non-Veg items'
    ],
    exclusions: ['Personal extra items'],
    itinerary: [
      {
        time: '08:00 AM - 09:00 AM',
        title: 'Hotel Pickup & Transfer',
        description: 'Hotel pickup and transfer to the boat jetty.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:00 AM - 10:30 AM',
        title: 'Grand Island Cruise & Dolphin Spotting',
        description: 'Cruise out to Grand Island while spotting wild dolphins playing around the bay.',
        photo: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 AM - 01:00 PM',
        title: 'Coral Reef Snorkeling & Bottom Fishing',
        description: 'Snorkeling session near coral reefs and boat fishing trials; light refreshments, beers, and soft drinks served onboard.',
        photo: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:00 PM - 03:30 PM',
        title: 'Island Beach Relaxation & Buffet Lunch',
        description: 'Transfer to Monkey Beach / Island Beach for a buffet lunch and seaside relaxation.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '03:30 PM - 05:00 PM',
        title: 'Return Cruise & Drop-off',
        description: 'Scenic boat ride return to the mainland jetty followed by hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'melvin-dinner-cruise',
    slug: 'melvin-dinner-cruise',
    title: 'Melvin Dinner Party Cruise (Mandovi River)',
    tagline: '3-Hour Mandovi Cruise, Complimentary Drinks, Appetizers, Live Bollywood DJ & Folk Dance',
    price: 1999,
    originalPrice: 2800,
    discount: '28% OFF',
    duration: 'Evening Cruise (7:30 PM - 12:30 AM)',
    rating: 4.9,
    reviewCount: 460,
    heroMedia: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Dance the night away on the Melvin Dinner Party Cruise along the illuminated Mandovi River! Featuring live Bollywood DJ sets, traditional Goan dance acts, complimentary drinks, plated appetizers, and a full buffet dinner.',
    placesCovered: ['Santa Monika Jetty, Panjim', 'Mandovi River Promenade', 'Atal Setu Night View', 'Floating Casinos Deck'],
    tourRoute: 'Hotel Bus Pickup -> Santa Monika Jetty -> Mandovi River Sailing -> Dinner & DJ Party -> Return Drop',
    timings: '07:30 PM Pickup | 08:30 PM Reporting | 12:30 AM Drop',
    inclusions: [
      'Pick-up and drop-off facility',
      '2.5 to 3 hours Mandovi River cruise',
      '2 Pints of Beer OR 2 Pegs of Hard Drinks / Soft Drinks per guest',
      'Plated appetizers (Veg and Non-Veg)',
      'Full buffet dinner featuring Veg and Non-Veg options',
      'Non-stop Bollywood DJ party with live dance floor',
      'Traditional Goan and Bollywood folk dance performances',
      'Dedicated bar counter and separate washrooms for men and women'
    ],
    exclusions: ['Additional liquor outside complimentary quota'],
    itinerary: [
      {
        time: '07:30 PM - 08:30 PM',
        title: 'Hotel Pickup & Transfer to Santa Monika Jetty',
        description: 'Hotel bus pickup and transfer to Santa Monika Jetty, Panjim.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:30 PM - 09:00 PM',
        title: 'Boarding & Welcome Drinks',
        description: 'Boarding, welcome drinks, and plated appetizers served on arrival.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:00 PM - 10:15 PM',
        title: 'Mandovi River Sailing & Cultural Show',
        description: 'Sailing along the Mandovi River; panoramic night views of Panaji city skyline, paired with traditional Goan folk performances.',
        photo: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:15 PM - 11:30 PM',
        title: 'Bollywood DJ Dance Floor & Buffet Dinner',
        description: 'Open DJ dance floor session along with an open dinner buffet.',
        photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:30 PM - 12:30 AM',
        title: 'Docking & Hotel Return Transfer',
        description: 'Cruise docks back at the jetty; boarding return transfers for hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'scuba-diving',
    slug: 'scuba-diving',
    title: 'Grand Island PADI Scuba Diving & Sightseeing',
    tagline: '1-on-1 Certified Scuba Dive, HD Underwater Photos & Videos, 38km Sightseeing Cruise & Buffet Lunch',
    price: 1999,
    originalPrice: 2999,
    discount: '33% OFF',
    duration: 'Full Day (7:30 AM - 4:30 PM)',
    rating: 4.9,
    reviewCount: 890,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Immerse in an underwater paradise! Enjoy a 38 km scenic boat cruise past Aguada Fort, Central Jail, and Lighthouse while spotting wild dolphins, followed by personal 1-on-1 PADI scuba diving, complimentary HD photos & videos, coral reef snorkeling, and a hot buffet lunch.',
    placesCovered: ['Grand Island Coral Reef', 'Aguada Fort View', 'Central Jail', 'Lighthouse Point', 'Dolphin Zone'],
    tourRoute: 'Hotel Pickup -> Departure Harbor -> 38 km Boat Cruise & Sightseeing -> PADI Scuba Dive -> Hot Buffet Lunch -> Return Harbor Drop',
    timings: '07:30 AM Pickup | 04:30 PM Drop',
    inclusions: [
      'Hotel pick-up and drop-off',
      '38 km scenic boat cruise to Grand Island',
      'One-on-one Scuba diving with certified PADI dive instructors',
      'Complimentary underwater HD photos and videos',
      'Snorkeling gear and assistance',
      'Marine life and coral reef sightseeing (over 30 fish species)',
      'Sightseeing by boat: Aguada Fort, Central Jail, Lighthouse, and Dolphin spotting',
      'Buffet lunch (Chicken Masala, Mix Veg, Dal Fry, Rice, Chapati, Salad) with mineral water and juice'
    ],
    exclusions: ['Personal extra snacks'],
    itinerary: [
      {
        time: '07:30 AM - 08:30 AM',
        title: 'Hotel Pickup & Harbor Transfer',
        description: 'Hotel pickup and 20-minute road transfer to the departure harbor.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:30 AM - 10:30 AM',
        title: '38 KM Cruise & Coastal Sightseeing',
        description: '38 km boat journey to Grand Island; en route sightseeing of Aguada Fort, Central Jail, and Lighthouse, alongside dolphin spotting.',
        photo: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 AM - 01:30 PM',
        title: 'PADI Scuba Diving & Underwater HD Media',
        description: 'Scuba diving orientation and personal dives accompanied by PADI trainers; underwater video recording and open-water snorkeling.',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:30 PM - 03:00 PM',
        title: 'Hot Multi-Cuisine Buffet Lunch',
        description: 'Hot buffet lunch served on the boat or island shore (Chicken Masala, Mix Veg, Dal Fry, Rice, Chapati, Salad).',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '03:00 PM - 04:30 PM',
        title: 'Return Cruise & Hotel Drop-off',
        description: 'Return cruise to harbor and hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'only-water-sports',
    slug: 'only-water-sports',
    title: '5-in-1 Watersports Combo Package',
    tagline: 'Parasailing + Jet Ski + Banana Ride + Bumper Tube + Speed Boat Thrill',
    price: 1699,
    originalPrice: 2499,
    discount: '32% OFF',
    duration: '2 Hours Activity (09:30 AM - 05:30 PM)',
    rating: 4.8,
    reviewCount: 940,
    heroMedia: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Unleash your inner thrill-seeker! Experience Goa’s ultimate beach action package featuring Parasailing, Jet Ski riding, Bumper Tube ride, Banana Boat ride, and high-speed boat spin with full safety gear and certified operators.',
    placesCovered: ['Water Sports Beach Counter', 'Goa Coastline Flying Zone', 'Jet Ski Bay'],
    tourRoute: 'Beach Counter Registration -> Safety Briefing -> Jet Ski & Speed Boat -> Bumper & Banana Ride -> Parasailing Flight',
    timings: '09:30 AM - 05:30 PM (Flexible daytime slots)',
    inclusions: [
      'Parasailing (with speed boat launch and parachute harness)',
      'Jet Ski Ride (with experienced instructor operator)',
      'Banana Boat Ride',
      'Bumper Tube Ride',
      'Speed Boat Ride',
      'Standard life safety jackets and certified lifeguards on-site'
    ],
    exclusions: ['Hotel transfers', 'Parasailing dip extra if requested on spot'],
    itinerary: [
      {
        time: 'Step 1',
        title: 'Briefing & Gear Up',
        description: 'Arrival at the water sports beach counter; safety briefing and life vest fittings.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 2',
        title: 'High-Speed Adrenaline',
        description: 'Jet ski ride slicing through waves followed by a group speed boat spin.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 3',
        title: 'Inflatable Fun',
        description: 'Bumper tube ride and high-energy inflatable banana ride behind the speedboat.',
        photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 4',
        title: 'Skyline Adventure',
        description: 'Parasailing winch takeoff for panoramic 360-degree aerial views of the Goa coastline.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'calma-dinner-cruise',
    slug: 'calma-dinner-cruise',
    title: 'Calma Family Dinner Party Cruise',
    tagline: 'Couples & Family Exclusive 2.5 Hr Mandovi Cruise, 2 Tequila Shots & Drinks, Live DJ & Casino Views',
    price: 1799,
    originalPrice: 2500,
    discount: '28% OFF',
    duration: 'Evening Cruise (8:00 PM - 11:30 PM)',
    rating: 4.8,
    reviewCount: 320,
    heroMedia: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A premium evening cruise designed exclusively for couples and families! Sail past illuminated floating casinos and Atal Setu Bridge with 2 complimentary tequila shots, drinks, 3 cultural dance performances, AC dance floor, and a delicious buffet dinner.',
    placesCovered: ['Panaji Boarding Point', 'Mandovi Estuary', 'Atal Setu Bridge View', 'Floating Casinos Deck'],
    tourRoute: 'Hotel Pickup -> Panaji Boarding -> Mandovi River Cruise -> Dinner & Shows -> Hotel Return',
    timings: '08:00 PM Pickup | 08:45 PM Reporting | 11:30 PM Return',
    inclusions: [
      'Pick-up and drop-off facility',
      '2.5 hours cruise along Mandovi River',
      '2 Complimentary Tequila Shots',
      '2 Drinks per person (Choice of alcoholic or non-alcoholic)',
      'Buffet dinner (Veg and Non-Veg options)',
      'Live DJ, Goan folk dances, and 3 entertainment dance performances',
      'Air-conditioned dance floor and open-air chill-out lounge',
      'Views of the Atal Setu Bridge and illuminated floating casinos'
    ],
    exclusions: ['Extra drinks outside package'],
    itinerary: [
      {
        time: '08:00 PM - 08:45 PM',
        title: 'Hotel Pickup & Reporting',
        description: 'Pickup from hotel hub and reporting at Panaji boarding point.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:00 PM - 09:30 PM',
        title: 'Embarkation & Tequila Welcome Shots',
        description: 'Embarkation, serving of complimentary tequila shots, and sailing out into the river.',
        photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:30 PM - 10:30 PM',
        title: 'Atal Setu Views & Dance Performances',
        description: 'Passing by the illuminated Atal Setu Bridge and floating casinos; Goan cultural dance performances and interactive entertainment games.',
        photo: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 PM - 11:15 PM',
        title: 'Buffet Dinner & DJ AC Dance Floor',
        description: 'Multi-cuisine dinner buffet opens; DJ opens the AC dance floor.',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:30 PM',
        title: 'Jetty Docking & Return Bus Drop',
        description: 'Docking back at Panjim jetty and return bus drops.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'nirvana-dinner-cruise',
    slug: 'nirvana-dinner-cruise',
    title: 'Nirvana Luxury Dinner Cruise',
    tagline: 'Multi-Deck Luxury Vessel, Complimentary Beers/Pegs, Plated Starters, Live Bollywood DJ & Discotheque',
    price: 1999,
    originalPrice: 2800,
    discount: '28% OFF',
    duration: 'Evening Cruise (7:30 PM - 11:30 PM+)',
    rating: 4.9,
    reviewCount: 410,
    heroMedia: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Experience pure opulence on Mandovi river! Step aboard Nirvana—a multi-deck luxury cruise ship featuring 2 complimentary drinks, plated starters, Goan folk & Bollywood stage shows, a high-energy discotheque dance floor, and a deluxe dinner buffet.',
    placesCovered: ['Panjim Cruise Jetty', 'Mandovi River Promenade', 'Capital City Skyline', 'Observation Decks'],
    tourRoute: 'Hotel Transfer -> Panjim Jetty -> Luxury Double-Decker Cruise -> Discotheque & Dinner -> Return Drop',
    timings: '07:30 PM Pickup | 08:30 PM Reporting | 11:30 PM Drop',
    inclusions: [
      'Pick-up and drop-off service',
      'Multi-deck luxury cruise experience on Mandovi River',
      '2 Pints Beer OR 2 Pegs Hard Drinks / Soft Drinks per guest',
      'Plated appetizers (Veg and Non-Veg)',
      'Deluxe buffet dinner (Veg and Non-Veg selections)',
      'Live Goan cultural folk dance and Bollywood performances',
      'Non-stop DJ music on a spacious discotheque dance floor',
      'Access to open observation decks, bar counters, and clean washroom facilities'
    ],
    exclusions: ['Personal extra orders'],
    itinerary: [
      {
        time: '07:30 PM - 08:30 PM',
        title: 'Hotel Transfer to Panjim Jetty',
        description: 'Transfer from hotel to Panjim cruise jetty.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:30 PM - 09:00 PM',
        title: 'Boarding Double-Decker Vessel & Starters',
        description: 'Boarding the luxury double-decker vessel; welcome drinks and plated appetizers served.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:00 PM - 10:15 PM',
        title: 'River Transit & Cultural Stage Showcase',
        description: 'River transit past Goa’s capital sights; traditional cultural dance showcases on the central stage.',
        photo: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:15 PM - 11:15 PM',
        title: 'Bollywood Discotheque & Deluxe Buffet',
        description: 'Bollywood DJ party set on the main dance floor; dinner buffet opened.',
        photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:30 PM onwards',
        title: 'Return Docking & Guest Drop-off',
        description: 'Return dock arrival and guest drop-off.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'arushi-dinner-cruise',
    slug: 'arushi-dinner-cruise',
    title: 'Arushi Dinner Cruise',
    tagline: '2.5 Hr Mandovi River Transit, 2 Drinks + 2 Tequila Shots, Unlimited Buffet & Historic Landmarks View',
    price: 1499,
    originalPrice: 2200,
    discount: '31% OFF',
    duration: '2.5 Hours (9:00 PM - 11:30 PM)',
    rating: 4.7,
    reviewCount: 280,
    heroMedia: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'A budget-friendly yet festive dinner cruise along the Mandovi estuary! Enjoy 2 drinks plus 2 tequila shots, unlimited Veg & Non-Veg buffet dinner with starters, live DJ, Goan folk dances, and sights of floating casinos, Adil Shah Palace, and Reis Magos Fort.',
    placesCovered: ['Panjim City Skyline', 'Floating Casinos', 'Adil Shah Palace', 'Reis Magos Fort', 'Fort Aguada Coast'],
    tourRoute: 'Bus Pickup -> Panjim Jetty Check-in -> Mandovi River Cruise -> Starters & Tequila Shots -> Buffet Dinner -> Drop',
    timings: '07:00 PM Bus Pickup | 08:30 PM Reporting | 09:00 PM - 11:00 PM Departure',
    inclusions: [
      'Bus pick-up and drop-off service',
      '2.5 hours river cruise',
      '2 Complimentary drinks + 2 Tequila shots (Alcoholic/Non-Alcoholic)',
      'Unlimited Veg and Non-Veg buffet dinner with starters',
      'Bollywood and Goan folk dance performances',
      'Live DJ and open dance floor',
      'Sights of Panjim City, Floating Casinos, Adil Shah Palace, Reis Magos Fort, Fort Aguada, and Central Jail'
    ],
    exclusions: ['Extra bar items'],
    itinerary: [
      {
        time: '07:00 PM - 08:30 PM',
        title: 'Bus Pickup & Jetty Check-In',
        description: 'Hotel bus pickup and check-in at Panjim Jetty by 8:30 PM.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:00 PM - 09:45 PM',
        title: 'Departure, Tequila Shots & Starters',
        description: 'Cruise departure along the Mandovi estuary; tequila shots served with veg/non-veg starters; views of Adil Shah Palace and floating casinos.',
        photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:45 PM - 10:30 PM',
        title: 'Folk Dances & DJ Floor Session',
        description: 'Folk dances and live DJ session; scenic overlook of Reis Magos and Aguada coastlines.',
        photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 PM - 11:00 PM',
        title: 'Unlimited Buffet Dinner Service',
        description: 'Unlimited buffet dinner service featuring Veg and Non-Veg delicacies.',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:00 PM - 11:30 PM',
        title: 'Docking & Hotel Bus Drop',
        description: 'Docking at the pier followed by hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'bungee-jumping',
    slug: 'bungee-jumping',
    title: 'Jumpin Heights Bungy Jump (Mayem Lake, North Goa)',
    tagline: '55m Cantilever Bungy Jump over Mayem Lake operated under NZ Safety Standards (AS/NZS 5848)',
    price: 4850,
    originalPrice: 5500,
    discount: '12% OFF',
    duration: '2 Hours Activity Slot',
    rating: 5.0,
    reviewCount: 750,
    heroMedia: '/images/bungee_banner.jpg',
    thumbnails: [
      'https://images.unsplash.com/photo-1541004995602-b3e898709909?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      '/images/bungee_banner.jpg',
      'https://images.unsplash.com/photo-1541004995602-b3e898709909?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Take the ultimate leap from India’s premier 55-meter bungee jump tower over Mayem Lake! Run under official Australia & New Zealand Safety Standards (AS/NZS 5848) with instructors trained by New Zealand technical experts and ex-military staff.',
    placesCovered: ['Mayem Lake, Bicholim, North Goa', '55m Cantilever Bungee Tower', 'Recovery Deck'],
    tourRoute: 'Mayem Lake Base -> Safety Briefing & Weigh-in -> Tower Climb -> 55m Bungy Leap -> Certificate & HD Video Collection',
    timings: 'Daily slots 09:30 AM to 05:00 PM (Closed on Tuesdays)',
    inclusions: [
      'Fixed-platform bungy jump over Mayem Lake',
      'Jump operated under Australia and New Zealand Safety Standards (AS/NZS 5848)',
      'Jump masters trained by New Zealand technical experts and ex-military staff',
      '"Dared-To-Jump" official certificate',
      'High-definition video recording (for Instagram/socials)'
    ],
    exclusions: ['Transportation to Mayem Lake (available on request)', 'Age < 12 or Weight < 40kg / > 110kg'],
    itinerary: [
      {
        time: 'Step 1',
        title: 'Check-In & Briefing',
        description: 'Arrival at Mayem Lake Bungy Zone; weigh-in, safety waiver verification, and gear prep.',
        photo: 'https://images.unsplash.com/photo-1541004995602-b3e898709909?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 2',
        title: 'The Tower Climb',
        description: 'Ascend to the purpose-built 55-meter cantilever bungee tower overlooking Mayem Lake.',
        photo: '/images/bungee_banner.jpg'
      },
      {
        time: 'Step 3',
        title: 'The Leap of Faith',
        description: 'Professional harness inspection followed by the "3..2..1.. BUNGY" leap over the lake.',
        photo: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 4',
        title: 'Recovery & Official Certification',
        description: 'Lowering to the recovery platform, gear release, and collection of the official jump certificate and HD jump footage.',
        photo: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'forest-boating-amboli',
    slug: 'forest-boating-amboli',
    title: 'Forest Boating Park (Ghatkarwadi Dam, Amboli)',
    tagline: 'Kayaking, Paddle Boating, Speed Boating, Children Park & Western Ghats Nature Tour',
    price: 1999,
    originalPrice: 2800,
    discount: '28% OFF',
    duration: 'Full Day (8:30 AM - 5:00 PM)',
    rating: 4.8,
    reviewCount: 230,
    heroMedia: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Escape into the lush green Western Ghats at Ghatkarwadi Dam near Amboli! Enjoy a 55 km scenic mountain road trip, water sports including kayaking, pedal boating, speed boating, children play park, morning breakfast, and hot buffet lunch.',
    placesCovered: ['Ghatkarwadi Dam Reservoir', 'Amboli Forest Viewpoints', 'Children Play Park', 'Western Ghats Waterfalls'],
    tourRoute: 'North Goa Hotel Pickup -> 55km Western Ghats Drive -> Ghatkarwadi Dam -> Watersports & Lunch -> Amboli Viewpoints -> Return Drop',
    timings: '08:30 AM Pickup | 05:00 PM Drop',
    inclusions: [
      'North Goa hotel pick-up and drop-off',
      'Water sports activities: Kayaking, Paddle Boating, and Speed Boating',
      'Access to Children\'s Play Area',
      'Scenic viewpoints, waterfalls, Amboli forest, and Western Ghats wildlife sightseeing',
      'Morning breakfast and hot tea',
      '1 Full meal (Veg / Non-Veg buffet lunch)',
      'Packaged mineral water',
      'Trained safety staff and life jackets'
    ],
    exclusions: ['Personal shopping & extra snacks'],
    itinerary: [
      {
        time: '08:30 AM - 10:30 AM',
        title: 'North Goa Hotel Pickup & Ghats Road Trip',
        description: 'Pick up from North Goa hotel and start the scenic 55 km road trip through the Western Ghats.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 AM - 11:15 AM',
        title: 'Arrival at Ghatkarwadi Dam & Morning Tea',
        description: 'Arrival at Ghatkarwadi Dam; enjoy morning tea/breakfast surrounded by nature.',
        photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:15 AM - 01:30 PM',
        title: 'Dam Water Adventure & Children Park',
        description: 'Water adventure time—enjoy kayaking, pedal boating, and high-speed boating in the dam reservoir. Families can also access the children\'s park.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:30 PM - 02:30 PM',
        title: 'Delicious Buffet Lunch',
        description: 'Relish a delicious Veg or Non-Veg lunch meal prepared fresh.',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '02:30 PM - 04:00 PM',
        title: 'Amboli Viewpoints & Waterfall Sightseeing',
        description: 'Guided scenic sightseeing covering nearby Amboli viewpoints, waterfalls, and bird/nature spotting.',
        photo: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '04:00 PM - 05:00 PM',
        title: 'Return Drive & Hotel Drop-off',
        description: 'Relaxing return journey back to North Goa followed by hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'south-goa-tour',
    slug: 'south-goa-tour',
    title: 'South Goa AC Coach Sightseeing Tour',
    tagline: 'Old Goa UNESCO Churches, St. Augustine Tower, Mangueshi Temple & Miramar Beach',
    price: 499,
    originalPrice: 899,
    discount: '44% OFF',
    duration: 'Full Day (8:30 AM - 7:30 PM)',
    rating: 4.8,
    reviewCount: 340,
    heroMedia: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Explore the historical and spiritual heart of Goa aboard an AC Coach! Visit UNESCO World Heritage Old Goa Churches, St. Augustine Tower ruins, Mangueshi and Balaji Temples, Miramar Beach, and get guidance for optional dolphin boat rides and Mandovi cruises.',
    placesCovered: ['Basilica of Bom Jesus', 'Se Cathedral', 'St. Augustine Tower Ruins', 'Mangueshi Temple', 'Balaji Temple', 'Miramar Beach'],
    tourRoute: 'Boarding Point Pickup -> Old Goa Churches & Tower -> Mangueshi & Balaji Temples -> Lunch -> Miramar Beach -> Mandovi Jetty -> Return Drop',
    timings: '08:30 AM Pickup | 07:30 PM Drop',
    inclusions: [
      'Full-day guided sightseeing in an Air-Conditioned Coach',
      'Historical visits: Old Goa Churches (Basilica of Bom Jesus / Se Cathedral) & St. Augustine Tower ruins',
      'Cultural temple visits: Mangueshi Temple & Balaji Temple',
      'Coastal stops: Miramar Beach / Miramar Fort area',
      'Assistance for optional activities: Dolphin Spotting Boat Trip & Evening Mandovi Cruise'
    ],
    exclusions: ['Lunch (Meal self-sponsored at restaurant)', 'Optional Mandovi cruise ticket'],
    itinerary: [
      {
        time: '08:30 AM - 09:30 AM',
        title: 'AC Coach Pickup & Start',
        description: 'Pick up from boarding point/hotel and start the AC coach tour.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:30 AM - 12:00 PM',
        title: 'Old Goa Heritage Churches & St. Augustine Tower',
        description: 'Explore the heritage of Old Goa—marvel at the architecture of Old Goa Churches and visit the historic St. Augustine Tower.',
        photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '12:00 PM - 01:30 PM',
        title: 'Mangueshi & Balaji Temple Spiritual Visit',
        description: 'Spiritual tour stops at the famous Mangueshi Temple and Balaji Temple.',
        photo: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:30 PM - 02:30 PM',
        title: 'Goan Lunch Break',
        description: 'Lunch break at a popular local Goan restaurant (meal self-sponsored).',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '02:30 PM - 05:00 PM',
        title: 'Miramar Beach & Optional Dolphin Spotting',
        description: 'Coastal relaxation at Miramar Fort/Beach along with an optional boat ride for seasonal dolphin sightseeing.',
        photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '05:30 PM - 07:00 PM',
        title: 'Optional Mandovi Evening River Cruise',
        description: 'Head to the Panaji jetty for an optional scenic evening river cruise on the Mandovi.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '07:00 PM - 07:30 PM',
        title: 'Return Drop-off',
        description: 'Drop-off back at your original pickup locations.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'north-goa-tour',
    slug: 'north-goa-tour',
    title: 'North Goa AC Coach Sightseeing Tour',
    tagline: 'Fort Aguada, Sinquerim Fort, Baga, Anjuna, Vagator & Snow Park',
    price: 449,
    originalPrice: 799,
    discount: '43% OFF',
    duration: 'Full Day (8:30 AM - 5:00 PM)',
    rating: 4.9,
    reviewCount: 420,
    heroMedia: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Discover North Goa’s legendary coastline and forts! Tour 17th-century Fort Aguada, Sinquerim Fort, and soak in the vibrant atmosphere of Sinquerim, Baga, Anjuna, and Vagator red-cliff beaches with an optional visit to Snow Park.',
    placesCovered: ['Fort Aguada & Lighthouse', 'Sinquerim Fort', 'Sinquerim Beach', 'Baga Beach', 'Anjuna Beach', 'Vagator Beach'],
    tourRoute: 'Boarding Point -> Fort Aguada -> Sinquerim Beach -> Baga Beach & Snow Park -> Vagator & Anjuna -> Drop',
    timings: '08:30 AM Pickup | 05:00 PM Drop',
    inclusions: [
      'Full-day transport in an Air-Conditioned Coach',
      'Heritage fort visits: Fort Aguada & Sinquerim Fort',
      'Popular beach visits: Sinquerim Beach, Baga Beach, Anjuna Beach, and Vagator Beach',
      'Optional visit to Snow Park Goa'
    ],
    exclusions: ['Food & Beverages', 'Snow Park entry ticket'],
    itinerary: [
      {
        time: '08:30 AM - 09:30 AM',
        title: 'AC Coach Boarding',
        description: 'Pick up from North Goa boarding points via AC coach.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:30 AM - 11:30 AM',
        title: 'Fort Aguada & Sinquerim Fort',
        description: 'Visit the 17th-century Portuguese Fort Aguada, its historic lighthouse, and the adjacent Sinquerim Fort overlooking the Arabian Sea.',
        photo: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:30 AM - 01:00 PM',
        title: 'Sinquerim & Baga Beach Walk',
        description: 'Stroll around Sinquerim Beach and head to the bustling Baga Beach strip.',
        photo: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:00 PM - 02:30 PM',
        title: 'Lunch Break & Snow Park Visit',
        description: 'Lunch break around Baga / optional fun visit inside Snow Park.',
        photo: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '02:30 PM - 04:30 PM',
        title: 'Vagator Red Cliffs & Anjuna Shore',
        description: 'Drive along the northern coastline to visit the red-cliff views at Vagator Beach and the rocky shores of Anjuna Beach.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '04:30 PM - 05:00 PM',
        title: 'Return Bus Drop-off',
        description: 'Board the coach for a comfortable drop back to your pickup points.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'adventure-boat-party',
    slug: 'adventure-boat-party',
    title: 'Adventure Boat Party (Double Decker Cruise)',
    tagline: 'Double Decker Cruise, Kayaking, SUP Boarding, Snorkeling, Dolphin Spotting & Chilled Beers',
    price: 1599,
    originalPrice: 2500,
    discount: '36% OFF',
    duration: '4.5 Hours Cruise (Morning/Sunset Slots)',
    rating: 4.8,
    reviewCount: 380,
    heroMedia: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'The ultimate party on the water! Sail on a spacious double-decker cruise boat into Mandovi bay with open sunbathing deck, wild dolphin spotting, snorkeling, kayaking, stand-up paddleboarding, bottom fishing, chilled beers, and a hot buffet lunch.',
    placesCovered: ['Mandovi Bay Anchorage', 'Dolphin Spotting Point', 'Chorao Island Waters', 'Upper Sunbathing Deck'],
    tourRoute: 'Hotel Pickup -> Jetty Departure -> Dolphin Spotting -> Anchor Bay for Watersports & Fishing -> Buffet Lunch -> Return Jetty',
    timings: 'Morning Slot: 09:30 AM - 02:30 PM | Sunset Slot: 01:30 PM - 07:00 PM',
    inclusions: [
      'Hotel pick-up and drop-off facility',
      'Sightseeing boat cruise with open sunbathing deck',
      'Water adventure activities: Snorkeling, Kayaking, and Stand-Up Paddle (SUP) Boarding',
      'Bottom fishing with lines',
      'Dolphin sightseeing & swimming in open waters',
      'Safety life jackets with instructor assistance',
      'Fresh snacks, chilled beers, soft drinks, and mineral water',
      'Buffet lunch (both Veg & Non-Veg options)'
    ],
    exclusions: ['Personal expenses outside menu'],
    itinerary: [
      {
        time: 'Slot Start',
        title: 'Reporting & Boarding',
        description: 'Hotel pickup transfer to the jetty; welcome aboard the double-decker party boat with chilled beers/soft drinks.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 2',
        title: 'Cruise & Marine Sighting',
        description: 'Cruise toward the island bay while watching for wild dolphins leaping around the boat.',
        photo: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 3',
        title: 'Water Adventures & Fishing',
        description: 'Anchor at an calm bay for an active session—try kayaking, SUP paddleboarding, snorkeling around reef fish, and leisure line-fishing.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 4',
        title: 'Party & Buffet Dining',
        description: 'Enjoy hot starters, a full Veg/Non-Veg buffet lunch, music, and sunbathing on the top deck.',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 5',
        title: 'Return Docking',
        description: 'Gentle sail back to the pier followed by hotel drop-off.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'flyboarding-adventure',
    slug: 'flyboarding-adventure',
    title: 'Hydro-Flight Flyboarding Adventure',
    tagline: 'Fly up to 30 Feet Above Water with 1-on-1 Certified Instructor & Action HD Videos',
    price: 2999,
    originalPrice: 4200,
    discount: '28% OFF',
    duration: '1 Hour Activity (09:30 AM - 05:30 PM)',
    rating: 5.0,
    reviewCount: 190,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=400&auto=format&fit=crop'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Defy gravity with hydro-flight flyboarding! Learn to hover and soar up to 20-30 feet over water with personalized 1-on-1 guidance from certified water masters, complete safety harness & helmet, plus 4K action videos of your flight.',
    placesCovered: ['Flyboarding Water Sports Launch Deck', 'Goa Jet Ski Arena'],
    tourRoute: 'Water Sports Deck Check-in -> Ground Briefing -> Boot Fitment -> 1-on-1 Flight Session -> HD Video Collection',
    timings: '09:30 AM - 05:30 PM (Flexible daytime slots)',
    inclusions: [
      'Comprehensive safety briefing & ground control technique instruction',
      'Hydro-flight flyboard equipment rental & specialized jet-nozzle boots',
      'Complete safety gear (CE-certified life vest and helmet)',
      'One-on-one session fully supervised by certified professional instructors',
      'Professional HD photos and action videos of your flight'
    ],
    exclusions: ['Hotel transfers'],
    itinerary: [
      {
        time: 'Step 1',
        title: 'Gear-Up & Safety Briefing',
        description: 'Meet your instructor at the watersports deck for a 10-minute briefing on throttle dynamics, balance control, and hand signals.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 2',
        title: 'Equipment & Boot Fitment',
        description: 'Strap into the high-pressure hydro-boots and secure your life jacket and helmet.',
        photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 3',
        title: 'The Flight Above Water',
        description: 'Take to the water as the jet-ski propulsion lifts you up to 20–30 feet above the water’s surface under direct instructor throttle supervision.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: 'Step 4',
        title: 'Media Collection & Debrief',
        description: 'Land smoothly back into the water, unstrap gear, and collect your action photos and 4K/HD video clips.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'amboli-tour',
    slug: 'amboli-tour',
    title: 'Amboli Waterfall + Scuba Diving & Water Sports (Combo)',
    tagline: '🌊 All activities will be done in dam water; non-swimmers can also enjoy!',
    price: 2400,
    originalPrice: 3200,
    discount: '25% OFF',
    duration: 'Full Day (7:30 AM - 5:00 PM)',
    rating: 4.9,
    reviewCount: 310,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=400&auto=format&fit=crop',
      '/gemini_generated_video_89554782.mp4'
    ],
    mediaGallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    ],
    videos: [
      '/gemini_generated_video_89554782.mp4'
    ],
    description: 'Experience the ultimate adventure combo! Visit breathtaking Amboli Waterfalls and enjoy Scuba Diving with complimentary underwater pictures & video, plus 5 thrilling water sports (Jet Ski, Speed Boat, Banana Ride, Bumper Ride) in safe dam water. Suitable for both swimmers and non-swimmers!',
    placesCovered: ['Amboli Waterfall', 'Dam Water Adventure Zone', 'Scuba Diving Deck', 'Water Sports Point'],
    tourRoute: 'Hotel Pickup -> Amboli Waterfall -> Dam Water Sports Zone -> Breakfast & Lunch -> Return Drop',
    timings: '07:30 AM Pickup | 05:00 PM Drop',
    inclusions: [
      'Pick Up & Drop',
      'Pre Training Session & PADI - Expertise Guidance',
      'Complimentary Pictures & Video Inside The Water',
      'Breakfast Included',
      'Lunch (Veg / Non Veg)'
    ],
    exclusions: ['Personal extra snacks'],
    itinerary: [
      {
        title: 'Amboli Waterfall Sightseeing',
        description: 'Explore the spectacular Amboli waterfall cascade surrounded by misty green Western Ghats.',
        photo: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Scuba Diving Session (Photos & Video Included)',
        description: 'Guided scuba dive with certified PADI experts, full equipment, and complimentary underwater video & photo capture.',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Jet Ski Water Ride',
        description: 'High-speed jet ski adventure across calm dam waters with expert instructor.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Speed Boat Ride',
        description: 'Thrilling speed boat ride in serene dam waters.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Banana Boat Ride',
        description: 'Fun inflatable banana boat ride for groups & families.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
      },
      {
        title: 'Bumper Ride',
        description: 'Exciting bumper tube ride gliding over water waves.',
        photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  }
];
