import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "./types";
import { getLocalItem } from "@/utils/helper";

export const loginApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<APIResponse<LoginResponse>, { email: string; password: string }>({
      query: ({ email, password }) => {
        const locale = getLocalItem("locale") || "en";

        return {
          url: "/login",
          method: "POST",
          body: { email, password },
          headers: {
            "x-language": locale,
          },
        };
      },
    }),

    socialLogin: builder.mutation<APIResponse<LoginResponse>, { access_token: string }>({
      query: ({ access_token }) => {
        const locale = getLocalItem("locale") || "en";

        return {
          url: "/social-login",
          method: "POST",
          body: { access_token },
          headers: {
            "x-language": locale,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSocialLoginMutation } = loginApi;
