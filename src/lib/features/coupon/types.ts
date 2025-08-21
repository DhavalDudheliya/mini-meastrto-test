import { DISCOUNT_TYPES } from "@/lib/constants";

export interface PercentageDiscount {
  value: number;
  stripe_coupon_id: string;
}

export interface FixedAmountDiscount {
  en?: {
    value: number;
    stripe_coupon_id: string;
  } | null;
  sv?: {
    value: number;
    stripe_coupon_id: string;
  } | null;
}

export interface MinimumOrderValue {
  en?: number | null;
  sv?: number | null;
}

export interface Coupon {
  _id: string;
  code: string;
  discount_type: DISCOUNT_TYPES;
  discount_value: number;
  valid_from: string;
  valid_until: string;
  usage_count?: number;
  restrict_one_use_per_user?: boolean;
  product_restriction?: string;
  applicable_products?: string[];
  applicable_categories?: string[];
  minimum_order_value?: number | null;
  used_by?: string[];
  max_usage?: number;
  is_active: boolean;
}

export interface CreateCouponDto {
  _id?: string;
  code: string;
  discount_type: DISCOUNT_TYPES;
  discount_value?: number;
  valid_from: string | null;
  valid_until: string | null;
  max_usage?: number | null;
  minimum_order_value?: number | null;
  product_restriction?: string | null;
  applicable_products?: string[] | null;
  applicable_categories?: string[] | null;
  restrict_one_use_per_user?: boolean;
}

export interface UpdateCouponDto {
  code?: string;
  valid_from: string;
  valid_until: string;
  max_usage?: number | null;
  minimum_order_value?: number | null;
  product_restriction?: string | null;
  applicable_products?: string[] | null;
  applicable_categories?: string[] | null;
  restrict_one_use_per_user?: boolean;
  is_active?: boolean;
}

export interface GetCouponDto {
  code?: string;
  per_page?: number;
  current_page?: number;
}
