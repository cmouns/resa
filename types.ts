export interface Car {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: 'Manuelle' | 'Automatique';
  fuel: 'Essence' | 'Diesel' | 'Électrique' | 'Hybride';
  rating: number;
  reviews: number;
  features: string[];
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  birthDate: string;
  licenseNumber: string;
  licenseDate: string;
  licenseCountry: string;
  isProfessional: boolean;
}

export interface SearchParams {
  location: string;
  returnLocation?: string; // Added separate return location
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
  description: string;
  type: 'insurance' | 'mileage' | 'extra'; // Categorize options
}

export interface CarFilters {
  category: string[];
  transmission: string[];
  fuel: string[];
  priceRange: [number, number];
}

export interface BookingState {
  step: number; 
  searchParams: SearchParams;
  filters: CarFilters;
  selectedCar: Car | null;
  selectedExtras: string[]; 
  selectedInsurance: string; // ID of selected insurance
  selectedMileage: string; // ID of selected mileage
  driverDetails: User | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}