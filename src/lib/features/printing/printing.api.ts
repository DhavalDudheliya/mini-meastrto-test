import { APIResponse } from "@/lib/common/types";
import { getLocalItem } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPaginationMetadata } from "../types";
import { IAllPrintingOrderList } from "./types";
import Cookie from "js-cookie";

export const printingApi = createApi({
  reducerPath: "printingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/printing`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query<
      APIResponse<{ metadata: IPaginationMetadata[]; orders: IAllPrintingOrderList[] }>,
      { current_page: number; per_page: number }
    >({
      query: ({ current_page, per_page }) => {
        const locale = getLocalItem("locale") || "en";
        return {
          url: `/all-orders?current_page=${current_page}&per_page=${per_page}`,
          method: "GET",
          headers: {
            "x-language": locale,
          },
        };
      },
    }),

    confirmPrinting: builder.mutation<APIResponse<null>, { order_id: string; product_id: string; attachment: string; submission_id: string }>({
      query: (data) => {
        const locale = getLocalItem("locale") || "en";

        return {
          url: `/confirm-attachment`,
          method: "POST",
          body: data,
          headers: {
            "x-language": locale,
          },
        };
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, useConfirmPrintingMutation } = printingApi;
