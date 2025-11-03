export type Category = {
  id: string;
  label: string;
  image: string;
};

export type ExploreItem = {
  id: string;
  title1: string;
  title2?: string;
  color: string;
  image: string;
};

export type ProductItem = {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  serves?: string;
  discount?: string;
  isVeg?: boolean;
  isBestseller?: boolean;
};

export const categories: Category[] = [
  { id: 'c1', label: 'Bestsellers', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=100' },
  { id: 'c2', label: 'Chaats', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=100' },
  { id: 'c3', label: 'Crispy Bites', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=100' },
  { id: 'c4', label: 'Rolls', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=100' },
  { id: 'c5', label: 'Desserts', image: 'https://images.unsplash.com/photo-1606312619070-d48f4fbc70d3?q=80&w=100' },
  { id: 'c6', label: 'Grills', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=100' },
  { id: 'c7', label: 'Fresh Arrivals', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=100' },
  { id: 'c8', label: 'Sandwiches & Wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=100' },
  { id: 'c9', label: 'Maggi & Quick Bites', image: 'https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?q=80&w=100' },
  { id: 'c10', label: 'Hot Beverages', image: 'https://images.unsplash.com/photo-1648192312898-838f9b322f47?q=80&w=100' },
  { id: 'c11', label: 'Cold Beverages', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=100' },
  { id: 'c12', label: 'Breakfast', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=100' },
];

export const exploreCards: ExploreItem[] = [
  { id: 'e1', title1: 'FRESH', title2: 'Deals', color: '#22C55E', image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1080' },
  { id: 'e2', title1: 'POST', title2: 'WORKOUT', color: '#22C55E', image: 'https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?q=80&w=1080' },
  { id: 'e3', title1: 'PROTEIN', title2: 'PACKED', color: '#C86A2B', image: 'https://images.unsplash.com/photo-1630492755175-46314a0deaf6?q=80&w=1080' },
  { id: 'e4', title1: 'Desk', title2: 'Friendly', color: '#7A6F30', image: 'https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?q=80&w=1080' },
];

export const newlyLaunchedProducts: ProductItem[] = [
  { id: 'newly-1', title: 'Frankenstein Matcha Cookie', price: '₹69', originalPrice: '₹99', image: 'https://images.unsplash.com/photo-1606312619070-d48f4fbc70d3?q=80&w=1000', serves: '1 Piece', discount: '30', isVeg: true },
  { id: 'newly-2', title: 'Spiced Carrot Crumble', price: '₹105', originalPrice: '₹145', image: 'https://images.unsplash.com/photo-1606312619070-d48f4fbc70d3?q=80&w=1000', serves: '1 Piece', discount: '26', isVeg: true },
  { id: 'newly-3', title: 'Halloween Brownie', price: '₹99', originalPrice: '₹129', image: 'https://images.unsplash.com/photo-1606312619070-d48f4fbc70d3?q=80&w=1000', serves: '1 Piece', discount: '23', isVeg: true },
];

export const chaatProducts: ProductItem[] = [
  { id: 'chaat-1', title: 'Chole Aloo Tikki Chaat', price: '₹119', originalPrice: '₹149', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000', serves: 'Serves 1', discount: '20', isVeg: true },
  { id: 'chaat-2', title: 'Dahi Aloo Tikki Chaat', price: '₹119', originalPrice: '₹149', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000', serves: 'Serves 1', discount: '20', isVeg: true, isBestseller: true },
  { id: 'chaat-3', title: 'Chole H', price: '₹119', originalPrice: '₹149', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000', serves: 'Serves 1', discount: '20', isVeg: true },
];

export const brewProducts: ProductItem[] = [
  { id: 'brew-1', title: 'Coffee', price: '₹89', originalPrice: '₹129', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000', discount: '31', isVeg: true },
  { id: 'brew-2', title: 'Iced Coffee', price: '₹129', originalPrice: '₹172', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000', discount: '25', isVeg: true },
  { id: 'brew-3', title: 'Cold Brew', price: '₹149', originalPrice: '₹199', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000', discount: '25', isVeg: true },
];


