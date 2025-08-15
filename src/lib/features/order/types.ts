interface Product {
  _id: string;
  quantity: number;
  selected_pages: number;
  selected_frame: Product;
  createdAt: string;
  updatedAt: string;
  name: { [key: string]: string };
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  price: number;
  images: string[];
  main_image: string;
  category: string[];
  slug: string;
  is_photo_book?: boolean;
  is_wall_painting?: boolean;
  notification?: boolean;
}

interface ShippingAddress {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  email: string;
  name: string;
}
export interface Order {
  _id: string;
  products: Product[];
  shipping_address: ShippingAddress;
  status: string;
  updatedAt: string;
  createdAt: string;
  total_amount: number;
  user_id: string;
  notification?: boolean;
  customer: Customer;
}