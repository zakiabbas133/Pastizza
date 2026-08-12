export const restaurantInfo = {
  name: 'Pastizza',
  tagline: 'Where craft becomes cuisine.',
  description:
    'An artisan Italian dining experience born from fire, flour, and generations of culinary devotion. At Pastizza, every dish tells a story of heritage reimagined.',
  address: {
    street: '47 Via Roma',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    country: 'United States',
    full: '47 Via Roma, Brooklyn, NY 11201',
  },
  coordinates: {
    lat: 40.6892,
    lng: -73.9857,
  },
  phone: '+1 (718) 555-0147',
  email: 'hello@pastizza.com',
  openingHours: [
    { days: 'Monday – Thursday', hours: '5:00 PM – 10:00 PM' },
    { days: 'Friday – Saturday', hours: '5:00 PM – 11:00 PM' },
    { days: 'Sunday', hours: '4:00 PM – 9:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com/pastizza',
    facebook: 'https://facebook.com/pastizza',
    twitter: 'https://twitter.com/pastizza',
  },
  stats: [
    { value: '12', label: 'Years of Craft' },
    { value: '72h', label: 'Dough Fermentation' },
    { value: '900°', label: 'Oven Temperature' },
    { value: '4.9', label: 'Guest Rating' },
  ],
  chef: {
    name: 'Alessandro Vitale',
    title: 'Executive Chef',
    image: 'https://plus.unsplash.com/premium_photo-1687697861242-03e99059e833?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Born in Naples, trained in Milan and New York, Alessandro brings three decades of fire-kissed tradition to every plate at Pastizza.',
  },
  owner: {
    name: 'Marco Bellini',
    title: 'Founder & Owner',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    bio: 'Marco grew up watching his grandmother stretch dough in a small kitchen in Bologna. Pastizza is his tribute to her — and to the belief that the simplest ingredients, treated with reverence, can create the most extraordinary moments.',
    quote: 'We don\'t just serve food. We invite you into a story that began long before you arrived and will stay with you long after you leave.',
    message:
      'When I opened Pastizza, I wanted to create a place where time slows down. Where the crackle of the oven and the warmth of shared plates remind us why we gather. Thank you for being part of our table.',
  },
  about: {
    history:
      'Founded in 2014, Pastizza began as a single wood-fired oven in a converted warehouse in Brooklyn. What started as a passion project between two friends — one a chef, one a dreamer — has grown into one of the city\'s most celebrated Italian dining destinations.',
    philosophy:
      'We believe in restraint. In letting exceptional ingredients speak. In the alchemy of fire, time, and human hands. Our 72-hour fermented dough, our relationships with small Italian producers, and our commitment to seasonality guide everything we do.',
    cuisine:
      'Modern Italian with Neapolitan soul — wood-fired pastizza, handmade pasta, and dishes that honor tradition while embracing the creativity of New York.',
    values: ['Seasonality', 'Artisan Craft', 'Warm Hospitality', 'Sustainable Sourcing'],
  },
  hero: {
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.7837308357293!2d-73.98788968459411!3d40.68920417933219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a0fd34f593d%3A0x1b7742d97d97766c!2s47%20Via%20Roma%2C%20Brooklyn%2C%20NY%2011201%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000',
};

export const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Owner', href: '#owner' },
  { label: 'Contact', href: '#contact' },
];
