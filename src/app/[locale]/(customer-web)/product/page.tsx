import React from "react";
import Hero from "../../../../components/ui/Hero";
import AboutOurProduct from "../../../../components/AboutOurProduct/AboutOurProduct";
import HowItWorkVertical from "../../../../components/HowItWork/Vertical/HowItWorkVertical";
import ProductHero from "@/components/ui/ProductHero";
import Faq from "@/components/ui/Faq";

const page = async () => {
  return (
    <>
      <ProductHero />
      <AboutOurProduct />
      <HowItWorkVertical />
      <Faq />
    </>
  );
};

export default page;