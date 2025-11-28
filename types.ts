export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'dress' | 'top' | 'outerwear' | 'bottoms';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface GeneratedLook {
  id: string;
  originalImage: string;
  product: Product;
  resultImage: string;
  timestamp: number;
}

export enum AppView {
  HOME = 'HOME',
  FITTING_ROOM = 'FITTING_ROOM',
  CATALOG = 'CATALOG'
}