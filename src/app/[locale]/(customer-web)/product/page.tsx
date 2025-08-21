import React from "react";
import AboutOurProduct from "../../../../components/AboutOurProduct/AboutOurProduct";
import ProductHero from "@/components/ui/ProductHero";
import Faq from "@/components/ui/Faq";
import HowItWorkX from "@/components/HowItWork/Horizontal/HowItWorkX";
import { useTranslations } from "next-intl";

const page = async ({ params }: { params: any }) => {
  const locale = params.locale;
  return (
    <>
      <ProductHero />
      <AboutOurProduct />
      {/* <HowItWorkVertical /> */}
      <HowItWorkX locale={locale} />
      <Faq />
    </>
  );
};

export default page;
