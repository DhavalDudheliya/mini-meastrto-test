import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import { CartProduct } from "./types";
import { Product } from "../product/types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation<
      APIResponse<{ _id: string; products: CartProduct[] }[]>,
      { product_id: string; quantity: number; selected_pages: number; is_sync: boolean; selected_frame: Product | null }
    >({
      query: ({ product_id, quantity, selected_pages, is_sync, selected_frame }) => {
        return {
          url: "/",
          method: "POST",
          body: { product_id, quantity, selected_pages, is_sync, selected_frame },
        };
      },
    }),

    getCart: builder.query<APIResponse<{ _id: string; products: CartProduct[] }[]>, {}>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),

    updateCart: builder.mutation<APIResponse<null>, { product_id: string; quantity?: number; selected_pages?: number; is_remove?: boolean }>({
      query: ({ product_id, quantity, is_remove = false, selected_pages }) => ({
        url: "/",
        method: "PUT",
        body: { product_id, quantity, is_remove, selected_pages },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useUpdateCartMutation } = cartApi;
