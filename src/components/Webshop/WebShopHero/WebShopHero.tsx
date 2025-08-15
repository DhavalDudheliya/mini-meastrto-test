import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const productData: {
  img: string;
  title: { [key: string]: string };
  bgcolor: string;
  slug: { [key: string]: any };
  quantity: number;
}[] = [
  {
    img: `${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=MM_products/water-color-1.png`,
    title: {
      en: "Watercolor Starter Kit for Kids",
      sv: "Vattenfärg Start Kit för barn",
    },
    bgcolor: "#EEFBFF",
    slug: { en: "watercolor-starter-kit", sv: "vattenfarg-start-kit" },
    quantity: 0,
  },
  {
    img: `${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=MM_products/acrylic-paint-kit-1.png`,
    title: {
      en: "Acrylic Paint Starter Kit for Kids",
      sv: "Akrylfärg Start Kit för barn",
    },
    bgcolor: "#FFE6FE",
    slug: { en: "acrylic-paint-starter-kit", sv: "akrylfarg-start-kit" },
    quantity: 0,
  },
];

const WebShopHero = () => {
  const locale = useLocale();

  const t = useTranslations();
  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap pt-[68px]">
        {productData.map((product, index) => (
          <div
            key={index}
            style={{ backgroundColor: product.bgcolor }}
            className={`w-full lg:w-[1/2] py-9 xl:py-[85px] px-4`}
          >
            <div className="flex flex-col gap-4 items-center">
              <Image
                src={product.img}
                alt="product-img"
                width={400}
                height={287}
                className="w-[400px] h-auto"
              />
              <h3>{product.title[locale]}</h3>
              <Link
                  href={{
                    pathname: "/product/[product-slug]",
                    params: { "product-slug": product.slug[locale] },
                  }}
                  className="btn-splash blue medium-btn"
                >
                  {product.quantity == 0 ? (
                <div>
                  {" "}
                  <span className="text-sky-950 font-bold">
                    {t("out_of_stock")}
                  </span>
                </div>
              ) :t("order_now")}
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebShopHero;
