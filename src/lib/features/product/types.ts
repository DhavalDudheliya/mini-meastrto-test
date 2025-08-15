export interface Category {
  _id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  image: string;
  meta_title: { [key: string]: string };
  meta_description: { [key: string]: string };
  meta_keywords: string;
  is_deleted: boolean;
  created_by: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number;
}

export interface Product {
  _id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  meta_title: { [key: string]: string };
  meta_description: { [key: string]: string };
  meta_keywords: string;
  price: number;
  images: string[];
  main_image: string;
  category: Category[];
  software: string;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number;
  slug: { [key: string]: string };
  is_photo_book?: boolean;
  stripe_price_id: string;
  has_variants: boolean;
  variants: Product[];
  variant_name: string;
  is_wall_painting: boolean;
  is_frame: boolean;
  frames: Product[];
  small_description?: { [key: string]: string };
  quantity?: number
}