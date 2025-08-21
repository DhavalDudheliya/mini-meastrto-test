import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const ProductHero = () => {
  const t = useTranslations();

  const locale = useLocale();

  const products: {
    name: { [key: string]: string };
    slug: { [key: string]: string };
    description: string;
    image: string;
  }[] = [
    {
      name: { en: "Wall Painting", sv: "Personlig Tavla" },
      slug: { en: "wall-painting-16-drawings", sv: "personlig-tavla-16-drawings" },
      description: t("product_page_photo_book_description"),
      image: "/images/product_2.png",
    },
    {
      name: { en: "Photo Book", sv: "Fotobok" },
      slug: { en: "photo-book", sv: "fotobok" },
      description: t("product_page_photo_book_description"),
      image: "/images/product_1.png",
    },
  ];

  return (
    <>
      <div className="flex flex-col relative bg-[#fffdf4] px-4 min-h-screen md:h-screen ">
        <div className="container relative z-[99] h-full">
          <div className="h-full">
            <div className="h-full overflow-hidden flex items-center justify-center">
              <div className="flex gap-12 flex-wrap items-center md:flex-nowrap pb-3 md:items-center pt-[80px] justify-center md:justify-center h-full md:h-screen">
                <div className="flex flex-col gap-4 w-full items-center text-center md:w-1/2 md:text-left md:items-start 2xl:w-2/4 ">
                  <h1 className="max-w-[648px] text-[32px] md:text-[48px] lg:text-[64px] font-bold">{t("your_childs_art_forever_preserved")}</h1>
                  <p className="sm:text-[20px] md:[text-22px] lg:text-[24px] xl:text-[26px]">{t("product_page_hero_description")}</p>
                  <Link
                    href={{ pathname: "/product/[product-slug]", params: { "product-slug": products[1].slug[locale] } }}
                    className="btn-pill yellow mt-8"
                  >
                    {t("book_now")}
                  </Link>
                </div>
                <div className="w-full md:w-1/2 2xl:w-2/4 ">
                  <Image src="/images/photo_book_hero.png" width={713} height={758} alt="hero-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductHero;
