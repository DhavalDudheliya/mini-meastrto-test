"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import qs from "qs";
import BlogPageDetail from "./BlogPageDetail";
import Seo from "../Seo";

const API_URL = "https://elegant-feast-203fc5fa91.strapiapp.com/api";

const BlogPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const locale = params?.locale;
  const {
    data: blog,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["blog", slug, locale],
    queryFn: async () => {
      if (!slug) throw new Error("No blog slug provided");
      const query = qs.stringify(
        {
          filters: { slug: { $eq: slug } },
          populate: {
            tags: { fields: ["name", "slug"] },
            headerImage: { fields: ["url"] },
            seo: { populate: "*" },
          },
          locale,
        },
        { encodeValuesOnly: true }
      );
      const res = await axios.get(`${API_URL}/blogs?${query}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });
      if (res.data.data && res.data.data.length > 0) {
        return res.data.data[0];
      } else {
        throw new Error("Blog not found");
      }
    },
    enabled: !!slug,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
    console.log("🚀 ~ error-->", error)

  if (loading) {
    return <div className="min-h-[400px] flex items-center justify-center text-gray-400 text-xl">Loading blog...</div>;
  }
  if (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.error?.message
        ? error.response.data.error.message
        : error.message || "An error occurred";
    return <div className="min-h-[400px] flex items-center justify-center text-red-400 text-xl">{errorMessage}</div>;
  }
  if (!blog) return null;

  // Strapi v4 nested data
  const { title, content, tags, headerImage, seo } = blog;

  return (
    <>
      <Seo seo={seo} />
      <BlogPageDetail title={title} content={content} headerImage={headerImage} tags={tags} />;
    </>
  );
};

export default BlogPage;
