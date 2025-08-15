import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateSessionRequest, ISession, ISessionRequest } from "./types";
import Stripe from "stripe";
import Cookie from "js-cookie";
import { getLocalItem } from "@/utils/helper";
import { Product } from "../product/types";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/payment`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createSession: builder.mutation<APIResponse<ISession>, { session: ICreateSessionRequest }>({
      query: ({ session }) => {
        const locale = getLocalItem("locale") || "en";

          console.log("🚀 ~ session-->", session)
        return {
          url: "/",
          method: "POST",
          body: { ...session },
          headers: {
            "x-language": locale,
          },
        };
      },
    }),

    retrieveSession: builder.mutation<
      APIResponse<Stripe.Checkout.Session>,
      { session_id: string; products: { product_id: string; quantity: number; selected_pages?: number; selected_frame: Product; cart_id: string }[] }
    >({
      query: ({ products, session_id }) => {
        return {
          url: "/retrieve",
          method: "POST",
          body: { products, session_id },
        };
      },
    }),
  }),
});

export const { useCreateSessionMutation, useRetrieveSessionMutation } = paymentApi;
