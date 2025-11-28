import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ethereal Silk Gown',
    description: 'A flowing crimson silk evening gown with a plunging neckline and draped silhouette.',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    category: 'dress'
  },
  {
    id: '2',
    name: 'Midnight Velvet Blazer',
    description: 'Structured deep blue velvet blazer with gold buttons, sharp shoulders, and a tailored fit.',
    price: 895,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    category: 'outerwear'
  },
  {
    id: '3',
    name: 'Cashmere Turtleneck',
    description: 'Luxurious beige cashmere turtleneck sweater, oversized fit with ribbed cuffs.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    category: 'top'
  },
  {
    id: '4',
    name: 'Noir Leather Trench',
    description: 'Full-length black leather trench coat with a belted waist and wide lapels. Matrix inspired chic.',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?auto=format&fit=crop&q=80&w=800',
    category: 'outerwear'
  },
  {
    id: '5',
    name: 'Floral Chiffon Summer Dress',
    description: 'Light and airy chiffon dress with a delicate floral print in pastel pinks and greens.',
    price: 680,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    category: 'dress'
  },
  {
    id: '6',
    name: 'Urban Streetwear Hoodie',
    description: 'Heavyweight cotton hoodie in charcoal grey with minimalist branding and drop shoulders.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    category: 'top'
  }
];

export const MODEL_IMAGE_GEN = "gemini-2.5-flash-image";
export const MODEL_CHAT = "gemini-2.5-flash";
