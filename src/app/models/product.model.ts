export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
}
