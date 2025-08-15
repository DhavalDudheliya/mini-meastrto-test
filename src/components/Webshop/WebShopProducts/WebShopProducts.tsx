'use client';

import React from "react";
import Image from "next/image";
import { useGetProductsQuery } from "@/lib/features/product/product.api";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const WebShopProducts = () => {
  const category: { [key: string]: string } = {
    en: "Web Shop",
    sv: "Webbbutik",
  };

  const locale = useLocale();

  const t = useTranslations();

  const { data, isError, isLoading } = useGetProductsQuery({ query: `?category=${category[locale]}` });

  return (
    <div className="index-section px-1 md:px-[30px] lg:px-[78px]">
      <div className="container">
        <div className="flex flex-wrap w-full justify-center overflow-hidden overflow-x-auto">
          {data?.data.map((product, index) => {
            return (
              <Link
                href={{ pathname: "/product/[product-slug]", params: { "product-slug": product.slug[locale] } }}
                key={index}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-[20%]"
              >
                <div className="relative flex flex-col gap-2 items-center p-3">
                  <Image
                    className="w-full h-[10%] border-2 border-[#FF9BF9] object-cover rounded-[16px] sm:rounded-[20px] lg:rounded-[30px]"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${product.main_image}`}
                    alt={product.name[locale]}
                    width={800}
                    height={800}
                  />
                  <div className="w-full justify-center items-center flex">
                    <h6 className="truncate">{product.name[locale]}</h6>
                  </div>
                  <p className="font-light sm:text-[16px] md:text-[18px]">{product.price} SEK</p>
                  <button className="btn-splash pink small-btn">{t('view')}</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WebShopProducts;
