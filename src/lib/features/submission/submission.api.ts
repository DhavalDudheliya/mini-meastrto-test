import { APIResponse } from "@/lib/common/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import { ISubmissionApi } from "./types";

export const submissionApi = createApi({
  reducerPath: "submissionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/submission`,
    prepareHeaders: (headers) => {
      const token = Cookie.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createSubmission: builder.mutation<
      APIResponse<null>,
      { order_id: string; product_id: string; message: string; attachments: File[]; in_reply_to?: string }
    >({
      query: ({ attachments, message, order_id, product_id, in_reply_to }) => {
        const formData = new FormData();

        formData.append("order_id", order_id);
        formData.append("product_id", product_id);
        formData.append("message", message);
        if (in_reply_to) formData.append("in_reply_to", in_reply_to);
        attachments.forEach((attachment) => {
          formData.append("attachments", attachment);
        });

        return {
          url: "/",
          method: "POST",
          body: formData,
        };
      },
    }),

    getSubmission: builder.query<APIResponse<ISubmissionApi>, { order_id: string; product_id: string }>({
      query: ({ order_id, product_id }) => {
        return {
          url: `/?order_id=${order_id}&product_id=${product_id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateSubmissionMutation, useGetSubmissionQuery } = submissionApi;
