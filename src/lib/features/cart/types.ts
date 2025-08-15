import { Product } from "../product/types";

export interface CartProduct extends Product {
  selected_pages: number;
  selected_frame: Product;
  quantity: number;
  product_id: string;
  local_id?: string;
}
