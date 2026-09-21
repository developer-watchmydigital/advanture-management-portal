import { Review } from '@/types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Rohan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    tourName: 'Scuba Diving + 5 Water Sports Combo',
    rating: 5,
    comment: 'The scuba diving experience at Grande Island was breathtaking! We saw clownfish and corals up close. The 5 water sports package was smooth and super fun. Highly recommended team in Goa!',
    date: 'September 15, 2026',
    status: 'approved'
  },
  {
    id: 'rev-2',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    tourName: 'Luxury Dinner Cruise on Mandovi River',
    rating: 5,
    comment: 'We booked the dinner cruise for our anniversary. The live DJ, folk dance performance, and Mandovi river view under Atal Setu were unforgettable. Buffet was delicious with plenty of veg options!',
    date: 'September 12, 2026',
    status: 'approved'
  },
  {
    id: 'rev-3',
    author: 'Vikram & Ananya',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    tourName: '55M High Bungee Jumping',
    rating: 5,
    comment: 'Jumped 55M over Mayem lake! The safety standards were top notch, pure NZ style harness and super reassuring guides. The drone video turned out insane!',
    date: 'September 08, 2026',
    status: 'approved'
  },
  {
    id: 'rev-4',
    author: 'Amitabh Sen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    tourName: 'Dudhsagar Waterfalls Jeep Safari',
    rating: 5,
    comment: 'The 4x4 Jeep ride through the dense sanctuary streams was thrilling. Swimming under Dudhsagar waterfall with life jackets is a bucket list experience. Pickup was right on time.',
    date: 'August 28, 2026',
    status: 'approved'
  }
];
