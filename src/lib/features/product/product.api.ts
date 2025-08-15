import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./types";
import { getLocalItem } from "@/utils/helper";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/product`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<APIResponse<Product[]>, { query: string }>({
      query: ({ query }) => {

        const locale = getLocalItem("locale") || "en";

        return {
          url: `/${query}`,
          method: "GET",
          headers: {
            "x-language": locale,
          },
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productApi;