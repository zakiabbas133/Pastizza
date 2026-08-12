export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'interior' | 'exterior' | 'food' | 'chef' | 'drinks' | 'atmosphere';
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
    alt: 'Elegant restaurant interior with warm ambient lighting',
    category: 'interior',
    size: 'large',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    alt: 'Wood-fired margherita pastizza with fresh basil',
    category: 'food',
    size: 'medium',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    alt: 'Chef preparing dishes in open kitchen',
    category: 'chef',
    size: 'tall',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    alt: 'Fine dining table setting with candlelight',
    category: 'atmosphere',
    size: 'wide',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80',
    alt: 'Artisan pasta dish with truffle shavings',
    category: 'food',
    size: 'small',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    alt: 'Restaurant exterior at dusk with warm glow',
    category: 'exterior',
    size: 'medium',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1621873495884-845a939892d1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Craft cocktail with citrus garnish',
    category: 'drinks',
    size: 'small',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80',
    alt: 'Intimate dining atmosphere with soft lighting',
    category: 'atmosphere',
    size: 'large',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    alt: 'Gourmet pastizza with premium toppings',
    category: 'food',
    size: 'tall',
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    alt: 'Executive chef plating a signature dish',
    category: 'chef',
    size: 'medium',
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    alt: 'Cozy table moment with a shared starter at dusk',
    category: 'atmosphere',
    size: 'medium',
  },
];
