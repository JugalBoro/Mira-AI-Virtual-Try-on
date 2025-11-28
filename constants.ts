
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
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800',
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
  },
  {
    id: '7',
    name: 'Ivory Pleated Midi',
    description: 'High-waisted pleated skirt in ivory satin, perfect for day-to-night transitions.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800',
    category: 'bottoms'
  },
  {
    id: '8',
    name: 'Structured Wool Coat',
    description: 'Camel wool coat with a modern oversized lapel and hidden buttons.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
    category: 'outerwear'
  },
  {
    id: '9',
    name: 'Emerald Silk Blouse',
    description: 'Deep green silk blouse with bow tie neck and gathered sleeves.',
    price: 295,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800',
    category: 'top'
  },
  {
    id: '10',
    name: 'Tailored Wide-Leg Trousers',
    description: 'High-waisted black trousers with a sharp crease and wide leg silhouette.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    category: 'bottoms'
  },
  {
    id: '11',
    name: 'Sequin Party Dress',
    description: 'Dazzling silver sequin mini dress with spaghetti straps.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    category: 'dress'
  },
  {
    id: '12',
    name: 'Classic Denim Jacket',
    description: 'Vintage wash denim jacket with copper hardware and a boxy fit.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    category: 'outerwear'
  },
  {
    id: '13',
    name: 'Scarlet Satin Midi',
    description: 'A bold red satin midi dress with a high slit and cowl neckline.',
    price: 720,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=800',
    category: 'dress'
  },
  {
    id: '14',
    name: 'Camel Wool Cardigan',
    description: 'Cozy, oversized knit cardigan in a rich camel tone.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&q=80&w=800',
    category: 'top'
  },
  {
    id: '15',
    name: 'Pleated Wide Leg Pants',
    description: 'Flowy, pleated wide-leg trousers in a soft dove grey.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    category: 'bottoms'
  },
  {
    id: '16',
    name: 'Shearling Aviator Jacket',
    description: 'Classic leather aviator jacket with warm shearling lining.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80&w=800',
    category: 'outerwear'
  }
];

export const MODEL_IMAGE_GEN = "gemini-2.5-flash-image";
export const MODEL_CHAT = "gemini-2.5-flash";
