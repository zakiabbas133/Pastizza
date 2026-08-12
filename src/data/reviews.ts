export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Elena Marchetti',
    rating: 5,
    text: 'Pastizza redefined what Italian dining means to me. The truffle pastizza alone is worth the journey — every bite felt like a love letter to Naples.',
    date: 'January 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: '2',
    name: 'James Whitfield',
    rating: 5,
    text: 'An absolutely cinematic experience from the moment you walk in. The service is impeccable, the wine list is thoughtful, and the wood-fired oven is pure magic.',
    date: 'December 2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: '3',
    name: 'Sofia Laurent',
    rating: 5,
    text: 'We celebrated our anniversary here and it was unforgettable. The tasting menu was a masterpiece — each course more surprising than the last.',
    date: 'November 2025',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: '4',
    name: 'Marcus Chen',
    rating: 4,
    text: 'The atmosphere alone transports you. Dark wood, warm lighting, the smell of fresh dough — and the burrata starter might be the best I\'ve ever had.',
    date: 'October 2025',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    id: '5',
    name: 'Isabella Romano',
    rating: 5,
    text: 'As someone from Rome, I was skeptical. Pastizza earned my respect. Authentic flavors with a modern, elegant presentation. Bravissimi.',
    date: 'September 2025',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
];
