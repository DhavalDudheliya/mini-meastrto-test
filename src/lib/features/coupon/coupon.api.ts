// src/app/services/couponApi.ts
import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Coupon, CreateCouponDto, GetCouponDto, UpdateCouponDto } from "./types";
import Cookie from "js-cookie";
import { IPaginationMetadata } from "../types";

// Create our API with endpoints
export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/coupon`,
    prepareHeaders: (headers) => {
      // Get the token from local storage or your auth state
      const token = Cookie.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    // Create a new coupon
    createCoupon: builder.mutation<APIResponse<Coupon>, CreateCouponDto>({
      query: (couponData) => ({
        url: "/",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),

    // Get all coupons with optional filtering
    getCoupons: builder.query<APIResponse<{ metadata: IPaginationMetadata[]; coupons: Coupon[] }>, GetCouponDto | void>({
      query: (params = {}) => {
        // Convert params object to URL query string
        const queryParams = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
        const queryString = queryParams.toString();

        return {
          url: `${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Coupon"],
    }),

    // Update an existing coupon
    updateCoupon: builder.mutation<APIResponse<Coupon>, { id: string; couponData: UpdateCouponDto }>({
      query: ({ id, couponData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),

    // Delete a coupon
    deleteCoupon: builder.mutation<APIResponse<null>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),

    updateCouponStatus: builder.mutation<APIResponse<Coupon>, { id: string; status: boolean }>({
      query: ({ id, status }) => ({
        url: `/status/${id}`,
        method: "PATCH",
        body: { is_active: status },
      }),
      invalidatesTags: ["Coupon"],
    }),

    uploadCouponCsv: builder.mutation<APIResponse<null>, { file: File; locale: string }>({
      query: ({ file, locale }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("locale", locale);

        return {
          url: "/bulk-coupon-create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Coupon"],
    }),
  }),
});

// Export the auto-generated hooks for use in components
export const { useCreateCouponMutation, useGetCouponsQuery, useUpdateCouponMutation, useDeleteCouponMutation, useUpdateCouponStatusMutation, useUploadCouponCsvMutation } = couponApi;

// Export the reducer and middleware for store configuration
export const { reducer: couponReducer, middleware: couponMiddleware } = couponApi;
