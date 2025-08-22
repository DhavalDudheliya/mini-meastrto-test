"use client";

import React, { useEffect, useState } from "react";
import OurProductCard from "./OurProductCard";
import Image from "next/image";
import { Product } from "@/lib/features/product/types";
import { OurProductDataProps } from "@/app/[locale]/(customer-web)/page";
import { useGetProductsQuery } from "@/lib/features/product/product.api";

export type OurProductsProps = {
  heading: string;
  cardData: OurProductDataProps[];
};

const ProductPlaceholder = () => {
  return (
    <section className="p-4 index-section" aria-label="Loading products">
      <div className="container">
        <div className="flex flex-col gap-[30px] lg:gap-[40px]">
          <header className="flex justify-center w-full">
            <div className="relative w-full flex flex-col items-center">
              <div className="h-8 w-96 bg-gray-300 animate-pulse rounded mb-2" aria-hidden="true"></div>
            </div>
          </header>
          <div>
            <div className="flex flex-wrap justify-center gap-[16px] md:gap-[20px] xl:gap-[30px]">
              {[0, 1].map((_, index) => (
                <article
                  key={index}
                  className="flex flex-col items-center gap-4 p-4 bg-gray-100 animate-pulse rounded-lg"
                  style={{ width: "300px", height: "400px" }}
                  aria-label="Product loading placeholder"
                >
                  <div className="bg-gray-300 h-48 w-full rounded" aria-hidden="true"></div>
                  <div className="bg-gray-300 h-6 w-3/4 rounded" aria-hidden="true"></div>
                  <div className="bg-gray-300 h-6 w-1/2 rounded" aria-hidden="true"></div>
                  <div className="bg-gray-300 h-6 mt-8 w-1/2 rounded" aria-hidden="true"></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OurProducts = ({ heading, query }: { heading: string; query: string }) => {
  const [product, setProduct] = useState<Product[]>([]);
  const { data, isLoading } = useGetProductsQuery({ query: query });

  useEffect(() => {
    if (!isLoading && data?.data.length) {
      setProduct(data?.data);
    }
  }, [data]);

  // SEO: Structured data for products (JSON-LD)
  const productStructuredData =
    product && product.length
      ? [
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product[0]?.name?.en || "",
            image: "/images/photo_book_featuring_child's_artwork.png",
            description: product[0]?.description?.en || "",
          },
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Wall art",
            image: "/images/mini_maestro_framed_wall_art.png",
            description: product[1]?.description?.en || "",
          },
        ]
      : [];

  return (
    <>
      {/* SEO: Structured data for products */}
      {productStructuredData.length > 0 && (
        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(productStructuredData)}
        </script>
      )}
      {isLoading ? (
        <ProductPlaceholder />
      ) : (
        <section className="index-section py-16 px-6 min-h-screen bg-[#fffffc]" aria-labelledby="our-products-heading">
          <div className="container">
            <div className="flex flex-col gap-[40px] lg:gap-[55px]">
              <header className="flex justify-center w-full">
                <div className="relative flex flex-col items-center">
                  <h2 id="our-products-heading" className="lg:text-[64px] md:text-[48px] text-[32px] font-bold">
                    {heading}
                  </h2>
                </div>
              </header>
              <div>
                <div className="flex flex-wrap justify-center gap-12 md:gap-14 lg:gap-16 relative" role="list">
                  <div className="absolute hidden md:block md:-top-10 md:-left-8 mx-4">
                    <Image src="/images/pd1.svg" alt="circles" width={100} height={100} className="w-16 h-16" />
                  </div>
                  <div className="absolute hidden md:block md:-bottom-10 md:right-8">
                    <Image src="/images/pd2.svg" alt="circles" width={100} height={100} className="w-16 h-16" />
                  </div>
                  {product && product.length
                    ? [
                        {
                          ...product[0],
                          src: "/images/photo_book_featuring_child's_artwork.png",
                          bullet_points: {
                            en: ["Professionally photographed & edited drawings", "Fits 24 drawings or more", "Printed as a 20×20 cm hardcover book"],
                            sv: [
                              "Teckningarna fotograferas och redigeras professionellt",
                              "Plats för 24 teckningar, eller fler",
                              "Inbunden bok i 20×20 cm",
                            ],
                          },
                          alt: "Photo book featuring child's artwork",
                        },
                        {
                          ...product[1],
                          name: {
                            en: "Wall art",
                            sv: "Tavla",
                          },
                          src: "/images/mini_maestro_framed_wall_art.png",
                          bullet_points: {
                            en: ["Professionally photographed & edited drawings", "Collage of 1, 9 or 16 drawings", "Printed & framed"],
                            sv: [
                              "Teckningarna fotograferas och redigeras professionellt",
                              "Välj ett kollage av 1, 9 eller 16 teckningar",
                              "Tryck och ramas in, redo att hängas upp",
                            ],
                          },
                          alt: "Mini Maestro framed wall art",
                        },
                      ].map((card, index) => (
                        <article className="h-full" key={index} aria-label={card.name?.en || String(card.name)} role="listitem">
                          <OurProductCard {...card} index={index} />
                        </article>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OurProducts;
