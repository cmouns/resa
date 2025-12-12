import { Car, ExtraOption } from './types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    name: 'Mercedes Classe E 450D (AMG Line)',
    category: 'Berline Luxe',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 185,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Diesel',
    rating: 5.0,
    reviews: 42,
    features: ['Climatisation', 'GPS', 'Cuir', 'Toit ouvrant']
  },
  {
    id: '2',
    name: 'Mercedes GLE 63S (Coupé)',
    category: 'SUV Sportif',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c2287f38d?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 340,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Essence',
    rating: 4.9,
    reviews: 28,
    features: ['4x4', 'Sièges Sport', 'Son Burmester']
  },
  {
    id: '3',
    name: 'Audi RS6 Avant',
    category: 'Break Sportif',
    image: 'https://images.unsplash.com/photo-1603584173870-7b299f589389?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 290,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Essence',
    rating: 4.8,
    reviews: 65,
    features: ['Quattro', 'Coffre XXL', 'Virtual Cockpit']
  },
  {
    id: '4',
    name: 'Porsche Macan GTS',
    category: 'SUV Compact',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 210,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Essence',
    rating: 4.9,
    reviews: 50,
    features: ['Mode Sport', 'Suspension Air', 'Carplay']
  },
  {
    id: '5',
    name: 'Range Rover Sport',
    category: 'SUV Luxe',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 250,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Hybride',
    rating: 4.7,
    reviews: 35,
    features: ['Tout terrain', 'Luxe Anglais', 'Panoramique']
  }
];

export const INSURANCE_OPTIONS: ExtraOption[] = [
  {
    id: 'insurance_basic',
    name: 'Franchise maximale : 4500€',
    price: 0,
    description: 'Protection de base incluse.',
    type: 'insurance'
  },
  {
    id: 'insurance_medium',
    name: 'Franchise réduite : 1500€',
    price: 25,
    description: 'Réduisez votre responsabilité en cas de dommages.',
    type: 'insurance'
  },
  {
    id: 'insurance_full',
    name: 'Franchise Zéro (0€)',
    price: 45,
    description: 'Roulez l\'esprit tranquille, aucune franchise à payer.',
    type: 'insurance'
  }
];

export const MILEAGE_OPTIONS: ExtraOption[] = [
  {
    id: 'km_200',
    name: 'Forfait 200km / jour',
    price: 0,
    description: 'Inclus dans le tarif de base.',
    type: 'mileage'
  },
  {
    id: 'km_unlimited',
    name: 'Kilométrage illimité',
    price: 0, // Often implies a base rate change, but for demo keeping simple or 0 if user wants it free per screenshot
    description: 'Roulez sans compter.',
    type: 'mileage'
  }
];

export const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: 'additional_driver',
    name: '2ème conducteur',
    price: 5.99,
    description: 'Conduisez à tour de rôle en toute légalité.',
    type: 'extra'
  },
  {
    id: 'protection_int',
    name: 'Protection internationale',
    price: 6.99,
    description: 'Roulez à l\'étranger l\'esprit tranquille.',
    type: 'extra'
  },
  {
    id: 'glass_protection',
    name: 'Protection pare-brise',
    price: 12.99,
    description: 'Protégez votre pare-brise contre les impacts.',
    type: 'extra'
  }
];

export const POPULAR_LOCATIONS = [
  "Aéroport",
  "Gare Saint-Jean",
  "Centre Ville",
  "Agence Mérignac"
];