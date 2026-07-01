export interface Room {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  size: string;
  occupancy: string;
  bed: string;
  view: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  totalPrice: number;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  section: 'dining' | 'bar';
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'fine-dining' | 'cocktails' | 'spirits';
  isLocalSpecialty?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
  stayDate: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'rooms' | 'dining' | 'bar' | 'views';
}
