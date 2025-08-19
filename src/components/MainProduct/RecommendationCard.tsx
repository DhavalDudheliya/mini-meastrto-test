"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const RecommendationCard = ({ main_image, name, price, slug }: { main_image: string; name: string; price: number; slug: string }) => {
  const t = useTranslations();

  return (
    <Link href={{ pathname: "/product/[product-slug]", params: { "product-slug": slug } }} className="flex w-full">
      <div className="flex flex-col rounded-[16px] gap-4 w-full sm:rounded-[30px]">
        <div className="rounded-[16px] relative pb-[85%] lg:pb-[97%] overflow-hidden sm:rounded-[30px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${main_image}`}
            alt="product-img"
            className="absolute top-0 left-0 object-cover w-full h-full"
            width={390}
            height={390}
          />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-full justify-center items-center flex">
            <h6 className="text-center text-[20px] font-bold">{name}</h6>
          </div>
          <p className="font-light sm:text-[16px] md:text-[18px] mb-10">{price} SEK</p>
        </div>
      </div>
    </Link>
  );
};

export default RecommendationCard;
