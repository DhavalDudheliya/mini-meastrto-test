import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const AboutOurProduct = () => {
  const t = useTranslations();

  const local = useLocale();

  const products: {
    name: { [key: string]: string };
    slug: { [key: string]: string };
    description: string;
    description2: string;
    bullets: string[];
    image: string;
    alt: string;
  }[] = [
    {
      name: { en: "Wall Painting", sv: "Personlig Tavla" },
      slug: { en: "wall-painting-16-drawings", sv: "personlig-tavla-16-drawings" },
      description: t("product_page_wall_paint_description"),
      description2: t("product_page_wall_paint_description2"),
      bullets: [t("product_page_wp_bullet_1"), t("product_page_wp_bullet_2"), t("product_page_wp_bullet_3")],
      image: "/images/photo_book_featuring_child's_artwork.png",
      alt: "Photo book featuring child's artwork",
    },
    {
      name: { en: "Photo Book", sv: "Fotobok" },
      slug: { en: "photo-book", sv: "fotobok" },
      description: t("product_page_photo_book_description"),
      description2: t("product_page_photo_book_description2"),
      bullets: [t("product_page_pb_bullet_1"), t("product_page_pb_bullet_2"), t("product_page_pb_bullet_3")],
      image: "/images/mini_maestro_framed_wall_art.png",
      alt: "Mini Maestro framed wall art",
    },
  ];

  return (
    <div className="index-section">
      <div className="overflow-hidden">
        <div className="flex justify-center w-full px-4">
          <div className="relative flex flex-col items-center">
            <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold">{t("about_our_product")}</h2>
          </div>
        </div>
        <div className="mt-[30px] sm:mt-[40px] lg:mt-[55px] flex flex-col gap-16 max-w-[1500px] mx-auto py-10">
          {products.map((product, index) => (
            <div className={`flex px-6 md:px-0 flex-col relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              {index === 0 && (
                <div className="absolute -bottom-8 right-[20%] z-10">
                  <Image src="/images/pd4.svg" alt="circles" width={100} height={100} className="w-16 h-16" />
                </div>
              )}
              {index === 1 && (
                <div className="absolute bottom-[1px] left-2">
                  <Image src="/images/pd3.svg" alt="circles" width={100} height={100} className="w-12 h-12" />
                </div>
              )}
              <div
                key={index}
                id={product.slug[local]}
                className={`flex flex-col md:flex-row ${
                  index % 2 !== 0 ? "md:flex-row-reverse bg-[#effafb]" : "bg-[#FFF9E6]"
                } items-center justify-center px-6 pb-10 md:p-16 bg-[#FFF9E6] w-full md:w-[90%] lg:w-[80%] xl:w-[70%] rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}
              >
                {/* Image Section */}
                <div className="flex justify-center items-center w-full md:w-[50%] p-4">
                  <div className="flex justify-center items-center overflow-hidden">
                    <Image src={product.image} width={380} height={380} alt={product.alt} className="object-cover rounded-lg shadow-md" />
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-[50%] flex flex-col gap-4 p-6 bg-white rounded-[20px] shadow-md max-w-[500px] relative">
                  <h3 className="text-2xl md:text-3xl font-bold">{product.name[local]}</h3>
                  <p className="text-gray-700 leading-relaxed hidden md:block">{product.description}</p>
                  <p className="text-gray-700 leading-relaxed">{product.description2}</p>
                  <ul className="list-disc list-outside text-gray-700 space-y-1 mb-10 ml-4">
                    {product.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                  <Link
                    href={{
                      pathname: "/product/[product-slug]",
                      params: { "product-slug": product.slug[local] },
                    }}
                    className="btn-pill2 yellow small-btn absolute -bottom-5 left-1/2 transform -translate-x-1/2 hover:translate-y-[-2px] hover:transition-all hover:duration-300 min-w-40"
                  >
                    {t("order_now")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutOurProduct;
