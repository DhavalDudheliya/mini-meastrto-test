"use client";

import React, { useEffect, useState } from "react";

import "swiper/css";
import { useGetProductsQuery } from "@/lib/features/product/product.api";
import MainProductDetail from "./MainProductDetail";
import "swiper/css";
import { Product } from "@/lib/features/product/types";
import { notFound } from "next/navigation";

const MainProductLoading = () => {
  return (
    <div className="p-4">
      <div className="py-[45px] px-4 md:pt-[50px] md:pb-[0] 2xl:pt-[70px]">
        <div className="flex flex-wrap">
          <div className="w-full md:w-[43%]">
            <div className="overflow-hidden flex flex-col gap-2 lg:gap-5 xl:gap-6">
              <div className="relative w-full pb-[100%] 2xl:pb-[85%] bg-gray-300 animate-pulse rounded-lg border-2 border-[var(--pink-200)] overflow-hidden rounded-4 lg:rounded-[20px] lg:border-4 xl:rounded-[30px]">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse"></div>
              </div>
              <div className="w-full overflow-hidden">
                <div className="flex overflow-x-auto space-x-4">
                  {[0, 1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="relative w-[130px] h-[130px] bg-gray-300 animate-pulse rounded-lg border-2 lg:border-4 border-[var(--pink-200)] overflow-hidden rounded-4 lg:rounded-[20px] xl:rounded-[30px]"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[57%] pt-5 md:pt-0">
            <div className="h-full pl-0 md:pl-5 lg:pl-6 xl:pl-7 2xl:pl-[37px]">
              <div className="h-full flex flex-col gap-[30px] justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="w-[150px] h-6 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-[300px] h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="w-[200px] h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                  <div className="flex flex-row gap-1 items-end">
                    <div className="w-[100px] h-4 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                  <div className="flex flex-col w-1/2 gap-2 p-4 rounded-[10px] bg-[var(--mid-gray)]">
                    <div className="w-[150px] h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="flex justify-between gap-2">
                      <div className="w-[80px] h-4 bg-gray-300 animate-pulse rounded"></div>
                      <div className="w-[80px] h-4 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-[150px] h-4 bg-gray-300 animate-pulse rounded"></div>
                    <div className="flex gap-[14px]">
                      {[0, 1].map((_, index) => (
                        <div key={index} className="p-2 lg:p-3 xl:p-4 bg-gray-300 animate-pulse rounded-md lg:rounded-[10px]">
                          <div className="w-[50px] h-[50px] bg-gray-200 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-[200px] h-10 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainProduct = ({ slug }: { slug: string }) => {
  const { data, isError, isLoading } = useGetProductsQuery({ query: `?slug=${slug}` });

  const [productData, setData] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [_notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isLoading && data?.data.length && data?.data.length) {
      setData(data?.data);
      setLoading(false);
    } else if (!isLoading && data?.data.length === 0) {
      setLoading(false);
      setNotFound(true);
    } else {
      setLoading(true);
      setNotFound(false);
    }
  }, [data, isLoading]);

  if (_notFound) {
   return notFound(); // Redirects to the 404 page
  }

  return (
    <div className="index-section">
      <div className="container">{loading ? <MainProductLoading /> : <MainProductDetail isLoadingProduct={loading} data={productData} />}</div>
    </div>
  );
};

export default MainProduct;
