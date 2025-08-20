import React from "react";
import HowItWorksCard from "./HowItWorksCard";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Head from "next/head";

const HowItWorkX = ({ locale }: { locale: string }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  const howItWork = [
    {
      img: "/images/1_box.jpg",
      alt: "Custom photo book or framed wall art made from children's drawings",
      title: t("order_your_shipping_kit"),
      desc: t("order_your_shipping_kit_description"),
    },
    {
      img: "/images/2_Editing.jpg",
      alt: "Professional photographer capturing and editing children's drawings for a Mini Maestro photo book or framed wall art",
      title: t("our_designer_team_work_their_magic"),
      desc: t("our_designer_team_work_their_magic_description"),
    },
    {
      img: "/images/3_Approve.jpg",
      alt: "Parents reviewing Mini Maestro photo book proof before printing",
      title: t("review_your_proof_and_approve"),
      desc: t("review_your_proof_and_approve_description"),
    },
    {
      img: "/images/4_Memories_preser.jpg",
      alt: "Smiling child holding completed Mini Maestro art book",
      title: t("treasured_memories_to_keep_forever"),
      desc: t("treasured_memories_to_keep_forever_description"),
    },
  ];

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("how_it_works"),
    step: howItWork.map((card, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: card.title,
      text: card.desc,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${card.img}`,
    })),
  };

  return (
    <div className="index-section relative">
      {/* JSON-LD for SEO */}
      <Head>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>

      <div className="relative bg-[#fffffc] px-[16px] p-4 lg:px-5 lg:pt-[30px] xl:pb-[5%] 2xl:px-[123px]">
        <div className="flex flex-col gap-[30px] lg:gap-[50px]">
          {/* Heading */}
          <div className="flex justify-center w-full">
            <div className="relative flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-bold text-center">{t("how_it_works")}</h2>
            </div>
          </div>

          {/* Steps list */}
          <ol className="flex flex-wrap flex-col justify-center md:flex-row gap-4 list-none" aria-label={`${t("how_it_works")} steps`}>
            {howItWork.map((card, index) => (
              <HowItWorksCard key={index} img={card.img} alt={card.alt} title={card.title} description={card.desc} step={index + 1} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkX;
