export interface Car {
  id: string;
  name: string;
  category: string; // e.g., 'Compacte', 'SUV', 'Berline'
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
  phone?: string;
  isGuest?: boolean;
}

export interface SearchParams {
  location: string;
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
}

export interface CarFilters {
  category: string[];
  transmission: string[];
  fuel: string[];
  priceRange: [number, number];
}

export interface BookingState {
  step: number; // 0: Search, 1: Vehicle, 2: Options, 3: Auth/Driver, 4: Payment, 5: Success
  searchParams: SearchParams;
  filters: CarFilters;
  selectedCar: Car | null;
  selectedExtras: string[]; // IDs of selected extras
  driverDetails: User | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}