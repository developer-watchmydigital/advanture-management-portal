import { Tour } from '@/types';

export const INITIAL_TOURS: Tour[] = [
  {
    id: 'south-goa-tour',
    slug: 'south-goa-tour',
    title: 'South Goa Sightseeing & Cultural Tour',
    tagline: 'Discover Heritage Churches, Pristine Beaches & Spice Plantations',
    price: 499,
    originalPrice: 899,
    discount: '44% OFF',
    duration: 'Full Day (9:00 AM - 7:00 PM)',
    rating: 4.8,
    reviewCount: 340,
    heroMedia: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Immerse yourself in the tranquility and rich heritage of South Goa. Visit historic churches of Old Goa, spiritual temples, lush spice plantations with traditional Goan lunch, and relax at Colva & Miramar beaches.',
    placesCovered: ['Basilica of Bom Jesus', 'Se Cathedral', 'Mangueshi Temple', 'Sahakari Spice Farm', 'Miramar Beach', 'Mandovi River Sunset Cruise Spot'],
    tourRoute: 'Panjim Hotel Pickup -> Old Goa -> Ponda Spice Village -> Miramar -> Panjim Drop',
    timings: '08:30 AM Pickup | 06:30 PM Drop',
    inclusions: [
      'AC Bus / Private Cab Hotel Pickup & Drop',
      'Guided Tour of Old Goa Churches',
      'Entry to Sahakari Spice Farm + Buffet Lunch',
      'Mandovi River Boat Cruise Ticket (Optional)',
      'Government Certified Tour Guide'
    ],
    exclusions: ['Personal expenses & additional snacks', 'Camera entry fees if applicable'],
    itinerary: [
      {
        time: '08:30 AM',
        title: 'Doorstep Hotel Pickup',
        description: 'Our comfortable AC coach picks you up right from your hotel lobby in Calangute, Baga, Candolim, or Panjim.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:00 AM',
        title: 'Old Goa Heritage Churches',
        description: 'Explore UNESCO World Heritage sites including Basilica of Bom Jesus (storing St. Francis Xavier body) & Se Cathedral.',
        photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:00 PM',
        title: 'Tropical Spice Plantation & Goan Buffet',
        description: 'Welcome flower garland, herbal tea briefing, walk through aromatic spice trees, followed by authentic Goan buffet lunch.',
        photo: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '04:30 PM',
        title: 'Miramar Beach & Dona Paula Viewpoint',
        description: 'Enjoy panoramic sunset views overlooking the confluence of Zuari and Mandovi rivers into the Arabian Sea.',
        photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'north-goa-tour',
    slug: 'north-goa-tour',
    title: 'North Goa Forts & Vibrant Beaches Tour',
    tagline: 'Iconic Fort Aguada, Chapora Fort, Anjuna & Calangute Beach Thrills',
    price: 499,
    originalPrice: 899,
    discount: '44% OFF',
    duration: 'Full Day (9:30 AM - 6:30 PM)',
    rating: 4.9,
    reviewCount: 420,
    heroMedia: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Experience the energetic pulse of North Goa! Tour historic Portuguese fortresses like Aguada and Dil Chahta Hai fame Chapora Fort, combined with sun-kissed beaches like Vagator, Anjuna, Calangute, and Baga.',
    placesCovered: ['Fort Aguada & Lighthouse', 'Chapora Fort (Dil Chahta Hai Spot)', 'Vagator Beach Cliff', 'Anjuna Beach', 'Calangute Beach Market'],
    tourRoute: 'Hotel Pickup -> Fort Aguada -> Chapora -> Vagator Cliff -> Calangute Market -> Drop',
    timings: '09:00 AM Pickup | 06:00 PM Drop',
    inclusions: [
      'AC Vehicle Pickup & Drop',
      'Sightseeing at 5 Major North Goa Locations',
      'Experienced Driver Cum Guide',
      'Parking & Toll Charges Included'
    ],
    exclusions: ['Food & Beverages', 'Water sports tickets at beach'],
    itinerary: [
      {
        time: '09:30 AM',
        title: 'Hotel Pickup & Coastal Drive',
        description: 'Morning pickup from your resort in North Goa.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '11:00 AM',
        title: 'Fort Aguada & 17th Century Lighthouse',
        description: 'Explore the vast fortress ocean vantage point built by Portuguese rulers in 1612.',
        photo: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '02:00 PM',
        title: 'Chapora Fort & Vagator Cliffs',
        description: 'Recreate iconic movie moments on top of Chapora Fort with panoramic red cliff ocean backdrop.',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'dudhsagar-tour',
    slug: 'dudhsagar-tour',
    title: 'Dudhsagar Waterfalls & Jungle Safari Express',
    tagline: 'Jeep Safari Through Bhagwan Mahavir Wildlife Sanctuary & Spice Farm Lunch',
    price: 1899,
    originalPrice: 2499,
    discount: '24% OFF',
    duration: 'Full Day (6:00 AM - 5:30 PM)',
    rating: 4.9,
    reviewCount: 510,
    heroMedia: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Witness the mighty 4-tiered "Sea of Milk" Dudhsagar Waterfall! Enjoy an exhilarating 4x4 open Jeep Safari through lush forest streams inside Mollem National Park, refreshing natural pool swim with life jackets, and spice plantation feast.',
    placesCovered: ['Dudhsagar Waterfalls Base Pool', 'Bhagwan Mahavir Wildlife Sanctuary', 'Jeep Safari Offroad Track', 'Spice Plantation Lunch'],
    tourRoute: 'Coast Pickup -> Kolem Base Camp -> 4x4 Forest Jeep Ride -> Dudhsagar Pool -> Spice Farm -> Return',
    timings: '06:00 AM Pickup | 05:00 PM Drop',
    inclusions: [
      'Shared AC Coach Pickup & Drop from Calangute / Baga / Panjim',
      '4x4 Off-road Jeep Safari Permit & Ride',
      'Dudhsagar Forest Entry Fees & Life Jacket Rental',
      'Guided Swimming in Natural Waterfall Pool',
      'Spice Plantation Buffet Lunch (Veg & Non-Veg)'
    ],
    exclusions: ['Camera permit fees at forest checkpost'],
    itinerary: [
      {
        time: '06:00 AM',
        title: 'Early Morning Pickup & Scenic Drive',
        description: 'Comfortable early morning pick-up heading east towards Western Ghats mountain range.',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:30 AM',
        title: '4x4 Open Jeep Safari Ride',
        description: 'Board rugged 4x4 jeeps for an adrenaline-filled 45-min ride through jungle rivers and canopy tracks.',
        photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:00 AM',
        title: 'Dudhsagar Waterfall Swimming & Monkeys',
        description: 'Dip into crystal clear mountain water beneath the cascading white waterfall with life jackets.',
        photo: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'amboli-tour',
    slug: 'amboli-tour',
    title: 'Amboli Hill Station & Waterfall Day Eco-Tour',
    tagline: 'Misty Mountains, Natural Springs & Lush Western Ghats Escapade',
    price: 1699,
    originalPrice: 2200,
    discount: '22% OFF',
    duration: 'Full Day (7:00 AM - 6:00 PM)',
    rating: 4.7,
    reviewCount: 180,
    heroMedia: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Escape the heat into the cool misty high mountain town of Amboli. Known for breathtaking waterfalls, flora, view points over Sahyadri valleys, and traditional Malvani regional feast.',
    placesCovered: ['Amboli Main Waterfall', 'Hiranyakeshi River Temple Source', 'Kavleshet Point Echo Valley', 'Sunset Point View'],
    tourRoute: 'North Goa Pickup -> Sawantwadi -> Amboli Ghats -> Waterfall Base -> Return',
    timings: '07:00 AM Pickup | 06:00 PM Drop',
    inclusions: [
      'AC Transport Return Journey',
      'Visit all top 4 Amboli Scenic Points',
      'Traditional Malvani/Goan Buffet Lunch',
      'Guide Assistance'
    ],
    exclusions: ['Personal shopping & snacks'],
    itinerary: [
      {
        time: '07:00 AM',
        title: 'Scenic Mountain Drive Pickup',
        description: 'Drive up the winding green Amboli Ghats mountain pass.',
        photo: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 AM',
        title: 'Amboli Waterfall Splash',
        description: 'Stand right under the splashing mountain stream and take amazing photos.',
        photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'dinner-cruise',
    slug: 'dinner-cruise',
    title: 'Luxury Dinner Cruise on Mandovi River',
    tagline: 'Live DJ, Goan Folk Dances, Open Deck Stars & Multi-Course Dinner Buffet',
    price: 1299,
    originalPrice: 1999,
    discount: '35% OFF',
    duration: '3 Hours Evening (7:30 PM - 10:30 PM)',
    rating: 4.8,
    reviewCount: 620,
    heroMedia: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Set sail under the starlit sky along Panjim Mandovi riverfront! Enjoy an unforgettable 3-hour luxury cruise with live DJ party music, traditional Goan Fugdi & Dekhnni dance performances, complimentary drinks, and delicious dinner buffet.',
    placesCovered: ['Panjim Floating Jetty', 'Mandovi River Promenade', 'Atal Setu Illuminated Bridge', 'Floating Casinos View'],
    tourRoute: 'Panjim Jetty Boarding -> Mandovi Bay Sailing -> Atal Setu Pass -> Return Jetty',
    timings: '07:30 PM Boarding | 10:30 PM Disembarkation',
    inclusions: [
      '3-Hour Luxury Double Deck Boat Cruise',
      'Welcome Drinks (Soft drinks / Beer / Wine coupons)',
      'Live DJ Music & Dance Floor',
      'Cultural Goan Folk Dance Acts',
      'Unlimited Buffet Dinner (Veg & Non-Veg)',
      'Fun Games & Anchoring'
    ],
    exclusions: ['Hard liquor outside free coupons', 'Personal hotel transfers'],
    itinerary: [
      {
        time: '07:30 PM',
        title: 'Red Carpet Boarding at Panjim Jetty',
        description: 'Warm welcome aboard with complimentary mocktail / beer as DJ tunes set the vibe.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:30 PM',
        title: 'Live DJ Dance Floor & Folk Performances',
        description: 'Dance with professional performers and enjoy views of lit up floating casinos.',
        photo: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '09:30 PM',
        title: 'Lavish Buffet Feast Under Night Sky',
        description: 'Indulge in freshly prepared Goan fish curry, chicken, paneer specialties, desserts and salads.',
        photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'casino-royale',
    slug: 'casino-royale',
    title: 'Offshore Floating Casino VIP Evening Pass',
    tagline: 'Unlimited Food & Drinks, Live Entertainment & One-time Gaming Chips Included',
    price: 2499,
    originalPrice: 3500,
    discount: '28% OFF',
    duration: 'Flexible (6:00 PM onwards)',
    rating: 4.9,
    reviewCount: 480,
    heroMedia: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Feel like Las Vegas right in Goa! Board Asia’s premier offshore floating casino vessel anchored in Mandovi river. Complete package with complimentary OTP playing chips, unlimited house spirits, live international dance performances, and multi-cuisine buffet.',
    placesCovered: ['Mandovi Floating Casino Deck', 'VIP Gaming Floors', 'Live Stage Show Arena'],
    tourRoute: 'Panjim Feeder Boat Station -> Casino Vessel Shuttle -> VIP Gaming Floors',
    timings: 'Entry from 06:00 PM to 04:00 AM (Overnight Access)',
    inclusions: [
      'Express Feeder Boat Shuttle to Casino',
      '₹1000 One-Time Play (OTP) Gaming Chips',
      'Unlimited Premium Drinks & House Spirits on Deck',
      'Multi-cuisine Gourmet Buffet Dinner',
      'Live International Dance & Musical Acts'
    ],
    exclusions: ['Age below 21 for gaming tables (Kids access allowed to restaurant deck only)'],
    itinerary: [
      {
        time: '07:00 PM',
        title: 'Feeder Boat Ride to Floating Palace',
        description: 'Hop onto luxury speed catamaran shuttle across lit Mandovi river.',
        photo: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '08:00 PM onwards',
        title: 'Casino Gaming & Stage Performances',
        description: 'Try your luck at Roulette, Black Jack, Baccarat, Teen Patti with complimentary playing chips.',
        photo: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'bungee-jumping',
    slug: 'bungee-jumping',
    title: '55M High Thrill Bungee Jumping Experience',
    tagline: 'Jump over Mayem Lake with NZ Certified Equipment & HD Drone Video Footage',
    price: 2999,
    originalPrice: 4200,
    discount: '29% OFF',
    duration: '2 Hours Activity Slot',
    rating: 5.0,
    reviewCount: 750,
    heroMedia: '/images/bungee_banner.jpg',
    thumbnails: [
      'https://images.unsplash.com/photo-1541004995602-b3e898709909?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Take the ultimate leap of faith! Jump from a 55-meter custom tower over pristine Mayem Lake under strict New Zealand SANZ safety standards. Includes jump certificate, GoPro raw video & photos package options!',
    placesCovered: ['Mayem Lake Bungee Tower', 'Jump Briefing Base', 'Lake Deck Recovery Boat'],
    tourRoute: 'Base Camp Briefing -> Safety Harness Fitment -> Tower Elevator -> 55m Bungee Jump -> Boat Recovery',
    timings: 'Hourly slots available from 09:30 AM to 05:00 PM',
    inclusions: [
      '55m Bungee Jump Experience',
      'New Zealand Certified Jump Masters Briefing',
      'World-class Harness & Triple Safety Checks',
      'Official Certificate of Bravery',
      'Safety Insurance Coverage'
    ],
    exclusions: ['Optional HD Video & Photo Package (₹500 extra)', 'Hotel transfers'],
    itinerary: [
      {
        time: 'Slot Arrival',
        title: 'Safety Registration & Weight Check',
        description: 'Complete registration, medical clearance, and double harness fitment by expert jump masters.',
        photo: 'https://images.unsplash.com/photo-1541004995602-b3e898709909?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '30 Mins In',
        title: 'The 55-Meter Leap of Faith',
        description: 'Step out onto the platform edge, countdown 3...2...1... BUNGEE! Freefall with wind in your face!',
        photo: '/images/bungee_banner.jpg'
      }
    ],
    isFeatured: true
  },
  {
    id: 'scuba-diving',
    slug: 'scuba-diving',
    title: 'Grande Island Scuba Diving & Snorkeling Safari',
    tagline: 'Undersea World Exploration with PADI Dive Instructor & Underwater Photography',
    price: 1499,
    originalPrice: 2499,
    discount: '40% OFF',
    duration: 'Full Day (7:30 AM - 3:30 PM)',
    rating: 4.9,
    reviewCount: 890,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Dive into the sapphire blue waters of Grande Island! No swimming skills required. Get 1-on-1 personal PADI dive master training, underwater breathing session, coral reef fish exploration with free underwater HD photos & videos!',
    placesCovered: ['Grande Island Coral Reef', 'Dolphin Sightseeing Point', 'Coco Beach Boat Station'],
    tourRoute: 'Hotel Pickup -> Boat Jetty -> 45 min Sea Cruise -> Pool Training -> Grande Island Dive -> Island Lunch -> Return',
    timings: '07:30 AM Pickup | 03:30 PM Drop',
    inclusions: [
      'AC Hotel Pickup & Drop (Calangute, Baga, Candolim, Arpora)',
      'Boat Ride to Grande Island + Dolphin Sightseeing',
      '15-20 Mins Deep Scuba Dive with Personal Diver',
      'Full Underwater Photography & HD Videos Included',
      'Breakfast, Water, Beer/Juice & Buffet Lunch on Beach'
    ],
    exclusions: ['Wetsuit rental (optional)'],
    itinerary: [
      {
        time: '07:30 AM',
        title: 'Morning Pickup & Jetty Cruise',
        description: 'Board scenic boat ride towards Grande Island while spotting wild dolphins playing in the ocean!',
        photo: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '10:30 AM',
        title: '1-on-1 Scuba Dive at Coral Reef',
        description: 'Breathe underwater safely while surrounded by colorful tropical fish and marine corals.',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'scuba-water-sports-combo',
    slug: 'scuba-water-sports-combo',
    title: 'Ultimate Scuba Diving + 5 Water Sports Combo',
    tagline: 'Scuba + Parasailing + Jet Ski + Banana Ride + Bumper Ride + Speed Boat',
    price: 2199,
    originalPrice: 3800,
    discount: '42% OFF',
    duration: 'Full Day (7:30 AM - 4:30 PM)',
    rating: 4.9,
    reviewCount: 1120,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Our most popular best-selling Goa package! Experience the underwater world with scuba diving PLUS fly high in Parasailing, speed on a Jet Ski, splash on Banana Ride, Bumper Boat ride, and Speedboat ride all in one epic day!',
    placesCovered: ['Grande Island Dive Spot', 'Anjuna / Calangute Beach Watersports Zone', 'Dolphin Sightseeing Point'],
    tourRoute: 'Hotel Pickup -> Grande Island Dive -> Dolphin Cruise -> Beach Watersports Arena -> Buffet Lunch -> Hotel Drop',
    timings: '07:30 AM Pickup | 04:30 PM Drop',
    inclusions: [
      'AC Hotel Pickup & Drop',
      'Scuba Diving with Underwater Photos & Videos',
      'Parasailing Ride with Boat Dip Option',
      'High-Speed Jet Ski Ride',
      'Group Banana Boat Ride & Bumper Tube Ride',
      'Speedboat Ride',
      'Dolphin Sightseeing & Beach Buffet Lunch'
    ],
    exclusions: ['Parasailing dip extra if requested on spot'],
    itinerary: [
      {
        time: '08:00 AM',
        title: 'Boat Journey & Scuba Dive Session',
        description: 'Morning deep sea dive experience with certified instructor.',
        photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop'
      },
      {
        time: '01:30 PM',
        title: '5 Beach Water Sports Thrill',
        description: 'Soar through the sky on parasail wing and ride the waves on high speed Jet Skis!',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=600&auto=format&fit=crop'
      }
    ],
    isFeatured: true
  },
  {
    id: 'snow-park-goa',
    slug: 'snow-park-goa',
    title: 'Goa Snow Park Indoor Sub-Zero World',
    tagline: 'Real Snowfall, Ice Slides, Sledging & Snow Bar at -5°C',
    price: 599,
    originalPrice: 900,
    discount: '33% OFF',
    duration: '1.5 Hours Slot Access',
    rating: 4.6,
    reviewCount: 290,
    heroMedia: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548777123-e216912df7f8?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516820208784-270b250306e3?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Experience -5°C freezing snow right inside tropical Goa! Make snowmen, slide down ice slides, play snowball fights, climb ice rocks, and enjoy drinks in real ice glasses at the snow bar.',
    placesCovered: ['Baga Snow Park Arena', 'Ice Slide Zone', 'Real Snowfall Dance Floor'],
    tourRoute: 'Check-in Desk -> Winter Jackets & Boots Fitting -> Sub-zero Snow Chamber',
    timings: 'Slots open every hour from 11:00 AM to 08:00 PM',
    inclusions: [
      '1 Hour Unlimited Access inside Sub-zero Chamber',
      'Sterilized Winter Jackets, Snow Boots & Gloves',
      'Ice Slide Sledging & Snowfall Dance Session'
    ],
    exclusions: ['Warm socks (available for purchase at venue if needed)'],
    itinerary: [
      {
        time: 'Entry Slot',
        title: 'Suit Up in Thermal Gear',
        description: 'Put on warm parkas and heavy boots before stepping into the icy world.',
        photo: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'adventure-boat-party',
    slug: 'adventure-boat-party',
    title: 'Goa Adventure Boat Party with Live DJ & Watersports',
    tagline: 'Catamaran Cruise, Kayaking, SUP Board, Swimming, DJ & Chilled Drinks',
    price: 1599,
    originalPrice: 2500,
    discount: '36% OFF',
    duration: '4 Hours Cruise (1:30 PM - 5:30 PM)',
    rating: 4.8,
    reviewCount: 380,
    heroMedia: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'The ultimate party on the water! Sail on a spacious luxury catamaran into Mandovi bay with live DJ beats, dance floor, kayaking, stand-up paddleboarding, sea diving, chilled beers, and snacks.',
    placesCovered: ['Chorao Island Waters', 'Panjim River Bay', 'St. George Island Anchorage'],
    tourRoute: 'Panjim Boarding -> Bay Sailing -> Anchor Point for Watersports & DJ Party -> Return',
    timings: '01:30 PM Departure | 05:30 PM Return',
    inclusions: [
      '4 Hours Party Catamaran Cruise',
      'Live DJ Music & Upper Deck Dance Floor',
      'Kayaking & Stand-Up Paddle Boarding',
      'Snorkeling & Swimming with Life Jackets',
      'Unlimited Chilled Beer & Soft Drinks',
      'Buffet Meal & Hot Snacks'
    ],
    exclusions: ['Hotel Pickup & Drop (Available on request)'],
    itinerary: [
      {
        time: '01:30 PM',
        title: 'Boarding & DJ Kickoff',
        description: 'Step aboard with cold beers as the DJ turns up the tropical beats.',
        photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'only-water-sports',
    slug: 'only-water-sports',
    title: '5-in-1 Calangute / Baga Water Sports Pack',
    tagline: 'Parasailing + Jet Ski + Banana Ride + Bumper Ride + Speed Boat Express',
    price: 1199,
    originalPrice: 1999,
    discount: '40% OFF',
    duration: '2 Hours Activity Duration',
    rating: 4.8,
    reviewCount: 940,
    heroMedia: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    thumbnails: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'Get your heart racing with North Goa’s famous 5 water sports package right on the vibrant waves of Calangute / Baga beach! Includes safety gear, experienced instructors, and life jackets for all.',
    placesCovered: ['Calangute / Baga Beach Watersports Counter'],
    tourRoute: 'Beach Registration -> Safety Vest Fitment -> Sequential Watersports Ride',
    timings: 'Flexible slots between 09:30 AM and 05:30 PM',
    inclusions: [
      'Parasailing Ride with Parachute Harness',
      'High-Power Wave Jet Ski Thrill Ride',
      'Banana Inflatable Boat Ride',
      'Bumper Tube Towing Ride',
      'Speedboat Ride',
      'Life Jackets & Beach Safety Briefing'
    ],
    exclusions: ['Hotel Transfers', 'Parasailing Dip Charge (₹200 on spot)'],
    itinerary: [
      {
        time: 'Slot Arrival',
        title: 'Beach Registration & Harnessing',
        description: 'Head to our beach counter on Calangute/Baga to gear up for non-stop action.',
        photo: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc23?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
];
