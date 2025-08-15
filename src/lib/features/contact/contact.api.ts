import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/contact-us`,
  }),
  endpoints: (builder) => ({
    createContact: builder.mutation<APIResponse<null>, { email: string; name: string; phone?: string; message: string }>({
      query: ({ email, message, name, phone }) => {
        return {
          url: "/",
          method: "POST",
          body: { email, message, name, phone },
        };
      },
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;