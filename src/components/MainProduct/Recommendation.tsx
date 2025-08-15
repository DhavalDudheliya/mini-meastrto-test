"use client";
import Image from "next/image";
import React from "react";
import RecommendationCard from "./RecommendationCard";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Product } from "@/lib/features/product/types";
import { useLocale, useTranslations } from "next-intl";

const Recommendation = ({ product }: { product: Product[] }) => {

  const t = useTranslations()

  const local = useLocale()

  return (
    <div className="index-section px-4 py-10">
      <div className="container">
        <div className="flex flex-col gap-[40px] lg:gap-[60px]">
          <div className="flex justify-center w-full">
            <div className="relative flex flex-col items-center">
              <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold">{t("recommendations")}</h2>
            </div>
          </div>
          <div>
            <div className="swiper-sky-pagination">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                  550: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                className="items-stretch"
              >
                {product.map((data, i) => (
                  <SwiperSlide key={i} className="p-3 rounded-[16px] border-[1px] border-[#FF77C3] sm:rounded-[30px] md:p-[14px]">
                    <RecommendationCard slug={data.slug[local]} main_image={data.main_image} name={data.name[local]} price={data.price} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
