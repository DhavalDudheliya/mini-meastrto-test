import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import { Order } from "./types";
import { IPaginationMetadata } from "../types";

export const orderApi = createApi({
  reducerPath: "paymentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/order`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getOrder: builder.mutation<APIResponse<{ metadata: IPaginationMetadata[]; orders: Order[] }>, { order_id: string; current_page: number }>({
      query: ({ order_id, current_page }) => {
        return {
          url: "/",
          method: "POST",
          body: { order_id, current_page },
        };
      },
    }),

    updateOrderStatus: builder.mutation<APIResponse<any>, { order_id: string; status: string }>({
      query: ({ order_id, status }) => {
        return {
          url: "/status",
          method: "POST",
          body: { order_id, status },
        };
      },
    }),
  }),
});

export const { useGetOrderMutation, useUpdateOrderStatusMutation } = orderApi;
