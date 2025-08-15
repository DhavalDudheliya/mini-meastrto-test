import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VerifyOtpResponse } from "./types";
import { getLocalItem } from "@/utils/helper";
import Cookie from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/user`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<APIResponse<null>, { name: string; email: string; password: string; profile_picture?: File }>({
      query: ({ email, password, profile_picture, name }) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (profile_picture) formData.append("profile_picture", profile_picture);

        const locale = getLocalItem("locale") || "en";

        return {
          url: "/signup",
          method: "POST",
          body: formData,
          headers: {
            "x-language": locale,
          },
        };
      },
    }),

    verifySignup: builder.mutation<APIResponse<null>, { otp: number; email: string }>({
      query: ({ otp, email }) => ({
        url: "verify-signup-otp",
        method: "POST",
        body: { otp, email },
      }),
    }),

    requestSignUpOtp: builder.mutation<APIResponse<null>, { email: string }>({
      query: ({ email }) => ({
        url: "resend-signup-otp",
        method: "POST",
        body: { email },
      }),
    }),

    requestPwdOtp: builder.mutation<APIResponse<null>, { email: string }>({
      query: ({ email }) => ({
        url: "request-forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    verifyPwdOtp: builder.mutation<APIResponse<VerifyOtpResponse>, { otp: number; email: string }>({
      query: ({ otp, email }) => ({
        url: "verify-forgot-password-otp",
        method: "POST",
        body: { otp, email },
      }),
    }),

    resetPassword: builder.mutation<APIResponse<null>, { email: string; password: string; token: string }>({
      query: ({ email, password, token }) => ({
        url: "reset-password",
        method: "POST",
        body: { email, password, token },
      }),
    }),

    syncLocale: builder.query<boolean, { locale: string }>({
      query: ({ locale }) => ({
        url: `sync-locale?locale=${locale}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifySignupMutation,
  useRequestSignUpOtpMutation,
  useRequestPwdOtpMutation,
  useVerifyPwdOtpMutation,
  useResetPasswordMutation,
  useSyncLocaleQuery,
} = userApi;
