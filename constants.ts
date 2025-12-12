import { Car, ExtraOption } from './types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    name: 'Renault Clio V',
    category: 'Citadine',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 35,
    seats: 5,
    transmission: 'Manuelle',
    fuel: 'Essence',
    rating: 4.8,
    reviews: 124,
    features: ['Climatisation', 'Bluetooth', 'GPS', 'Régulateur']
  },
  {
    id: '2',
    name: 'Peugeot 2008',
    category: 'SUV Compact',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 55,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Essence',
    rating: 4.7,
    reviews: 89,
    features: ['Caméra de recul', 'Apple CarPlay', 'Sièges chauffants']
  },
  {
    id: '3',
    name: 'Tesla Model 3',
    category: 'Berline Électrique',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 85,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Électrique',
    rating: 4.9,
    reviews: 210,
    features: ['Autopilot', 'Toit panoramique', 'Superchargeur inclus']
  },
  {
    id: '4',
    name: 'Citroën C3 Aircross',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 48,
    seats: 5,
    transmission: 'Manuelle',
    fuel: 'Diesel',
    rating: 4.5,
    reviews: 76,
    features: ['Grand coffre', 'Confort avancé', 'USB arrière']
  },
  {
    id: '5',
    name: 'Fiat 500',
    category: 'Micro-citadine',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 29,
    seats: 4,
    transmission: 'Manuelle',
    fuel: 'Hybride',
    rating: 4.6,
    reviews: 150,
    features: ['Toit ouvrant', 'Mode City', 'Consommation faible']
  },
  {
    id: '6',
    name: 'Mercedes-Benz Classe A',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    pricePerDay: 75,
    seats: 5,
    transmission: 'Automatique',
    fuel: 'Diesel',
    rating: 4.9,
    reviews: 95,
    features: ['Intérieur cuir', 'MBUX', 'Éclairage d\'ambiance']
  }
];

export const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: 'insurance_full',
    name: 'Assurance Tous Risques',
    price: 15,
    description: 'Couverture complète sans franchise.'
  },
  {
    id: 'baby_seat',
    name: 'Siège Bébé',
    price: 8,
    description: 'Siège adapté pour enfant de 0 à 4 ans.'
  },
  {
    id: 'gps',
    name: 'GPS Garanti',
    price: 5,
    description: 'Système de navigation satellite mis à jour.'
  },
  {
    id: 'additional_driver',
    name: 'Conducteur Additionnel',
    price: 10,
    description: 'Ajoutez un second conducteur au contrat.'
  }
];

export const POPULAR_LOCATIONS = [
  "Paris - Gare de Lyon",
  "Paris - Aéroport CDG",
  "Lyon - Part Dieu",
  "Marseille - Saint Charles",
  "Bordeaux - Saint Jean",
  "Nice - Aéroport"
];