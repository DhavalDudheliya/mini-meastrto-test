import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Product = {
  name: Record<string, string>;
  slug: Record<string, string>;
  description: string;
  image: string;
};

const Hero: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  const products: Product[] = [
    {
      name: { en: "Wall Painting", sv: "Personlig Tavla" },
      slug: {
        en: "wall-painting-16-drawings",
        sv: "personlig-tavla-16-drawings",
      },
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
    <header className="relative w-full bg-[#FEF7DA1A] md:min-h-[calc(100vh-80px)] h-[50vh] mt-[64px] md:mt-[80px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/images/Hero_home_page.jpg"
        fill
        priority
        sizes="100vw"
        alt="photo book of child drawing"
        className="absolute inset-0 w-full h-full object-cover object-[30%_35%] z-0"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-4 sm:px-6 lg:px-20 flex flex-col items-center justify-center gap-6 py-10">
        {/* Desktop Text */}
        <h1 className="text-white font-bold md:block hidden md:text-[48px] lg:text-[64px] leading-snug">{t("hero_heading")}</h1>
        <h2 className="text-white font-bold md:block hidden md:text-[24px] lg:text-[36px] leading-snug">{t("hero_subheading")}</h2>

        {/* Mobile Text */}
        <h1 className="text-white font-bold md:hidden block text-3xl leading-snug">{t("hero_heading_mobile")}</h1>
        <h3>
          <p className="text-white font-bold md:hidden block text-xl leading-snug">{t("hero_subheading_mobile")}</p>
        </h3>

        <Link
          aria-label="Book your custom photo book now"
          href={{
            pathname: "/product/[product-slug]",
            params: { "product-slug": products[1].slug[locale] },
          }}
          className="btn-pill medium-btn yellow"
        >
          {t("book_now")}
        </Link>
      </div>
    </header>
  );
};

export default Hero;
