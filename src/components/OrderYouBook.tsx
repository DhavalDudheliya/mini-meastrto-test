import Image from "next/image";
import bgImage from "@/public/hero.jpg"; // Replace with your image
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Product = {
  name: Record<string, string>;
  slug: Record<string, string>;
  description: string;
  image: string;
};

export default function OrderYouBook({ locale }: { locale: string }) {
  const t = useTranslations();

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
    <section className="relative w-full md:h-screen h-[50vh]">
      {/* Background Image */}
      <Image
        src={"/images/Picture_little_boy.jpg"}
        alt="Child drawing heart for Mini Maestro book order"
        fill
        className="object-cover object-[50%_20%] md:object-center"
        priority
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/35 z-10"></div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16 z-20">
        <div className="max-w-2xl text-white space-y-4 h-full flex flex-col items-start justify-center">
          <h3 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-tight">
            {t("order_your_book")}
            <br />
            <span className="font-semibold">{t("we_will_handle_the_rest")}</span>
          </h3>
          <p className="text-lg md:text-xl text-white ml-2 lg:text-[40px] md:text-[32px] text-[24px] pb-0 md:pb-10">
            {t("no_app_no_stress_just_magsiv")}
          </p>
          <Link
            aria-label="Book your custom photo book now"
            href={{
              pathname: "/product/[product-slug]",
              params: { "product-slug": products[1].slug[locale] },
            }}
            className="btn-pill medium-btn yellow"
          >
            {t("create_your_book")}
          </Link>
        </div>
      </div>
    </section>
  );
}
