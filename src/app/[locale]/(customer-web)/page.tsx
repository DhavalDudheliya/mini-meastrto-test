import Hero from "../../../components/ui/Hero";
import OurProducts from "../../../components/OurProducts/OurProducts";
import HowItWorkX from "../../../components/HowItWork/Horizontal/HowItWorkX";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import HappyFamilies from "@/components/HappyFamilies/HappyFamilies";
import OrderYouBook from "@/components/OrderYouBook";
import Faq from "@/components/ui/Faq";

export type OurProductDataProps = {
  img: string;
  name: string;
  price: string;
};

export default function Home({ params }: { params: any }) {
  const locale = params.locale;

  unstable_setRequestLocale(locale);

  const t = useTranslations();

  const photoBook: { [key: string]: string } = { en: "Photo Book", sv: "Fotobok" };
  const shop: { [key: string]: string } = { en: "Web Shop", sv: "Webbbutik" };

  return (
    <>
      <Hero />
      <OurProducts heading={t("our_product")} query={`?category=${photoBook[locale]}`} />
      <HowItWorkX locale={params.locale} />
      <HappyFamilies locale={params.locale} />
      <OrderYouBook locale={params.locale} />
      <Faq />
    </>
  );
}
