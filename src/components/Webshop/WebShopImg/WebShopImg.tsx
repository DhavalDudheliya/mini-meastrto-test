import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const WebShopImg = ({ locale }: { locale: string }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className="index-section p-4">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-wrap gap-[28px] md:flex-nowrap">
          <div className="relative w-full md:w-1/2 border border-black rounded-3xl">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="relative">
                <Image
                  width={805.56}
                  height={652}
                  src="/images/photo_book_collage.png"
                  alt="product-img"
                  className="rounded-[16px] md:rounded-[20px] lg:rounded-[30px]"
                />
                {/* Text on top of the image */}
                <p className="absolute bottom-16 left-1/4 transform -translate-x-1/2 text-yellow-900 uppercase">
                  {t("photo_book")}
                </p>
              </div>
              <Link className="btn-splash pink medium-btn mb-4" href="/product">
                {t("order_now")}
              </Link>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 border border-black rounded-3xl">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="relative">
                <Image
                  width={805.56}
                  height={652}
                  src="/images/wall_paint_collage.png"
                  alt="product-img"
                  className="rounded-[16px] md:rounded-[20px] lg:rounded-[30px]"
                />
                {/* Text on top of the image */}
                <p className="absolute bottom-16 left-1/4 transform -translate-x-1/2 text-yellow-900 uppercase">
                  {t("wall_painting")}
                </p>
              </div>
              <Link className="btn-splash pink medium-btn mb-4" href="/product">
                {t("order_now")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebShopImg;
