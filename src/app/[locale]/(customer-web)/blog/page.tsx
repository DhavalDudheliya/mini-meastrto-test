"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogList, { Blog } from "@/components/Blog/BlogList";
import TagList, { Tag } from "@/components/Blog/TagList";
import BlogSearch from "@/components/Blog/BlogSearch";
import Pagination from "@/components/Blog/Pagination";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "qs";
import Image from "next/image";

const API_URL = "https://elegant-feast-203fc5fa91.strapiapp.com/api";

const BlogPage = ({params}: {params: any}) => {
  const locale = params.locale;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const router = useRouter();

  // Fetch blogs with TanStack Query
  const { data: blogsData = [], isLoading: loading } = useQuery<Blog[]>({
    queryKey: ["blogs", debouncedSearch, selectedTag, page, locale],
    queryFn: async () => {
      const query = qs.stringify(
        {
          pagination: { page, pageSize: 10 },
          populate: {
            tags: { fields: ["name", "slug"] },
            headerImage: { fields: ["url"] },
            seo: { populate: "*" },
          },
          filters: {
            ...(debouncedSearch && { title: { $containsi: debouncedSearch } }),
            ...(selectedTag && { tags: { slug: { $eq: selectedTag } } }),
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
      setPageCount(res.data.meta?.pagination?.pageCount || 1);
      return res.data.data || [];
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  // Fetch tags with TanStack Query
  const { data: tags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags", locale],
    queryFn: async () => {
      const query = qs.stringify({ locale }, { encodeValuesOnly: true });
      const res = await axios.get(`${API_URL}/tags?${query}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });
      return res.data.data || [];
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const handleBlogClick = (slug: string) => {
    router.push(`./blog/${slug}`);
  };

  const handleTagClick = (slug: string) => {
    setSelectedTag(slug === selectedTag ? undefined : slug);
    setPage(1);
  };

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  return (
    <div className="pt-20 pb-10 px-2 sm:px-4 md:px-8 min-h-screen bg-[#FEF7DA1A]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">BLOGS</h1>
      <BlogSearch value={search} onChange={handleSearch} />
      <div className="flex flex-col-reverse lg:flex-row gap-8 max-w-7xl mx-auto w-full">
        {/* Blog grid */}
        <div className="flex-1 flex flex-col gap-6 relative w-full">
          <div className="absolute -top-10 -left-8 -z-10">
            <Image src="/images/circles2.svg" alt="circles" width={100} height={100} className="w-16 h-16" />
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[150px] sm:min-h-[200px]">
              <span className="text-gray-400 text-base sm:text-lg animate-pulse">Loading blogs...</span>
            </div>
          ) : blogsData.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[150px] sm:min-h-[200px]">
              <span className="text-gray-400 text-base sm:text-lg mb-2">No blogs found.</span>
              <span className="text-2xl sm:text-4xl">📝</span>
            </div>
          ) : (
            <>
              <BlogList blogs={blogsData} onBlogClick={handleBlogClick} />
              <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
            </>
          )}
        </div>
        {/* Tags sidebar */}
        <div className="w-full lg:w-[240px] relative mb-8 lg:mb-0 mr-4">
          <div className="absolute -bottom-6 right-0 sm:-bottom-10 sm:-right-12">
            <Image src="/images/circles1.svg" alt="Blog sidebar" width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
          </div>
          {tagsLoading ? (
            <div className="bg-[#EAF7FF] rounded-xl p-4 sm:p-6 min-w-full sm:min-w-[260px] flex items-center justify-center min-h-[100px] sm:min-h-[200px]">
              <span className="text-gray-400 text-base sm:text-lg animate-pulse">Loading tags...</span>
            </div>
          ) : tags.length === 0 ? (
            <div className="bg-[#EAF7FF] rounded-xl p-4 sm:p-6 min-w-full sm:min-w-[260px] flex flex-col items-center justify-center min-h-[100px] sm:min-h-[200px]">
              <span className="text-gray-400 text-base sm:text-lg mb-2">No tags found.</span>
              <span className="text-xl sm:text-3xl">🏷️</span>
            </div>
          ) : (
            <TagList tags={tags} selectedTag={selectedTag} onTagClick={handleTagClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
