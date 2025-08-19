import { Link } from "@/i18n/routing";
import { Product } from "@/lib/features/product/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface OurProductCardProps extends Product {
  bullet_points: Record<string, string[]>;
  src: string;
  index: number;
  alt: string;
}

const OurProductCard = ({ name, slug, bullet_points, is_photo_book, is_wall_painting, quantity, src, index, alt }: OurProductCardProps) => {
  const locale = useLocale();
  const t = useTranslations();
  const isEven = index % 2 === 0;

  return (
    <article
      className={`flex max-w-[500px] rounded-[16px] ${
        isEven ? "bg-[#FFFAE5]" : "bg-[#EFFBFC]"
      } sm:rounded-[30px] pb-16 px-3 md:px-16 relative shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}
      aria-label={typeof name[locale] === "string" ? name[locale] : String(name[locale])}
    >
      <Link
        href={{
          pathname: "/product/[product-slug]",
          params: { "product-slug": slug[locale] },
        }}
        title={typeof name[locale] === "string" ? name[locale] : String(name[locale])}
        aria-label={`View details for ${typeof name[locale] === "string" ? name[locale] : String(name[locale])}`}
        className="flex flex-col rounded-[16px] gap-4 w-full sm:rounded-[30px] focus:outline-none focus:ring-2 focus:ring-sky-500"
        role="link"
      >
        {/* Product Image */}
        <div className="w-full mx-auto flex justify-center items-center">
          <Image
            src={src || ""}
            alt={alt}
            title={alt}
            width={500}
            height={300}
            className="rounded-t-[16px] sm:rounded-t-[30px] h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-full lg:w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6 items-center text-center">
          <h3 className="font-bold text-3xl sm:text-3xl md:text-4xl">{name[locale]}</h3>

          {/* Bullet Points */}
          {(is_photo_book || is_wall_painting) && bullet_points?.[locale]?.length > 0 && (
            <ul className="list-disc list-outside pl-4 text-gray-700 text-sm sm:text-base md:text-lg space-y-1 font-medium text-start flex flex-col items-start justify-center mx-4">
              {bullet_points[locale].map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          )}

          {/* Stock Status */}
          {quantity === 0 ? (
            <span className="btn-pill red small-btn !text-sky-950 !font-bold bottom-0 absolute" aria-label={t("out_of_stock")}>
              {t("out_of_stock")}
            </span>
          ) : (
            <p className="btn-pill yellow small-btn -bottom-5 absolute" aria-label={t("order_now")}>
              {t("order_now")}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default OurProductCard;
