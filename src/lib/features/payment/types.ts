import { Product } from "../product/types";

export interface ISession {
  client_secret: string;
}

export interface ISessionRequest {
  product_id: string;
  quantity: number;
  selected_pages?: number;
  selected_frame: Product;
}

export interface ICouponData {
  code: string;
  discount_type: string;
  discount_value: number;
}

export interface ICreateSessionRequest {
  session: ISessionRequest[];
  coupon_code?: string | null;
}