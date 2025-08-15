import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const HowItWorkVertical = () => {

  const t = useTranslations();

  const locale = useLocale();

  const products: {
    name: { [key: string]: string };
    slug: { [key: string]: string };
    description: { [key: string]: string };
    image: string;
  }[] = [
    {
      name: { en: "Wall Painting", sv: "Personlig Tavla" },
      slug: { en: "wall-painting-16-drawings", sv: "personlig-tavla-16-drawings" },
      description: {
        en: "Transform your child's drawings into a unique and personal painting! Our board is designed to, in a simple and stylish way, collect and display all the fine drawings that are otherwise thrown away or piled up. With our personalized painting, you can enjoy your child's creative work every day, as a beautiful wall decoration in the home or as a special gift for loved ones.",
        sv: "Omvandla ditt barns teckningar till en unik och personlig tavla! Vår tavla är utformad för att på ett enkelt och stilrent sätt samla och visa upp alla de fina teckningarna som annars kastas eller läggs på hög. Med vår personliga tavla kan du njuta av ditt barns kreativa verk varje dag, som en vacker väggdekoration i hemmet eller som en speciell gåva till nära och kära.",
      },
      image: "/images/photo_wall_painting.png",
    },
    {
      name: { en: "Photo Book", sv: "Fotobok" },
      slug: { en: "photo-book", sv: "fotobok" },
      description: {
        en: "Give your child's drawings an eternal life by turning them into a personal photo book! Our photo book was created to collect in a simple and stylish way all the wonderful drawings that often end up in drawers or on the refrigerator door. With our book, you can flip through your child's creative journey time and time again - a perfect gift for family and friends or as a precious memory to keep at home.",
        sv: "Ge ditt barns teckningar ett evigt liv genom att omvandla dem till en personlig fotobok! Vår fotobok är skapad för att på ett enkelt och stilrent sätt samla alla de underbara teckningarna som ofta hamnar i lådor eller på kylskåpsdörren. Med vår bok kan du bläddra igenom ditt barns kreativa resa gång på gång – en perfekt present till familj och vänner eller som ett värdefullt minne att ha hemma.",
      },
      image: "/images/photo_book_main.png",
    },
  ];

  return (
    <div className="index-section py-10">
      <div>
        <div className="flex justify-center w-full px-4">
          <div className="relative flex flex-col items-center">
            <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold">{t("how_it_works")}</h2>
          </div>
        </div>
        <div className="container px-4">
          <div className="mt-[40px] sm:mt-[45px] lg:mt-[55px]">
            <div className="flex flex-col gap-[30px] md:[gap-40px] lg:gap-[50px] xl:gap-[90px] 2xl:gap-[112px]">
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full lg:w-5/12 relative">
                  <Image
                    src="/images/custom_photo_book_or_framed_wall_art.webp"
                    width={569}
                    height={392}
                    alt="Custom photo book or framed wall art made from children's drawings"
                    className="w-full h-full rounded-[16px] lg:rounded-[20px] xl:rounded-[30px]"
                  />
                  <div className="w-12 h-12 flex justify-center items-center absolute left-1/2 bottom-[-22px] -translate-x-1/2 md:left-[unset] md:bottom-[unset] md:-right-[48px] md:top-1/2 md:-translate-y-1/2 rounded-full bg-[#FF77C3] text-black">
                    <h5>1</h5>
                  </div>
                </div>
                <div className="w-full lg:w-7/12 flex items-center p-0 pt-14 md:p-4 md:pt-0">
                  <div className="flex flex-col gap-2 pl-0 sm:gap-3 md:pl-[40px] xl:pl-[70px] ">
                    {/* <div className="flex flex-col gap-2 pl-0 sm:gap-3 lg:gap-4 xl:pl-5 2xl:pl-[70px]"> */}
                    <h4 className="text-[24px] md:text-[28px] lg:text-[36px] font-semibold">{t("order_your_shipping_kit")}</h4>
                    <p className="sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{t("order_your_shipping_kit_description")}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap flex-col-reverse md:flex-row md:flex-nowrap">
                <div className="w-full lg:w-7/12 flex items-center p-0 pt-14 md:p-4 md:pt-0">
                  {/* <div className="flex flex-col gap-2 pr-0 sm:gap-3 lg:gap-4 xl:pr-5 2xl:pr-[70px]"> */}
                  <div className="flex flex-col gap-2 pr-[0px] sm:gap-3 sm:pr-[40px] xl:pr-[70px] ">
                    <h4 className="text-[24px] md:text-[28px] lg:text-[36px] font-semibold">{t("our_designer_team_work_their_magic")}</h4>
                    <p className="sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                      {t("our_designer_team_work_their_magic_description")}
                    </p>
                    {/* <p className="btn-splash pink medium-btn">Book Now</p> */}
                  </div>
                </div>
                <div className="w-full lg:w-5/12 relative">
                  <Image
                    src="/images/professional_photographer_capturing.webp"
                    width={569}
                    height={392}
                    alt="Professional photographer capturing and editing children's drawings for a Mini Maestro photo book or framed wall art"
                    className="w-full h-full rounded-[16px] lg:rounded-[20px] xl:rounded-[30px]"
                  />
                  <div className="w-12 h-12 flex justify-center items-center left-1/2 bottom-[-22px] -translate-x-1/2 absolute md:-right-[unset] md:top-[50%] md:left-[0] md:-translate-y-1/2 rounded-full bg-[#FF77C3] text-black">
                    <h5>2</h5>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full lg:w-5/12 relative">
                  <Image
                    src="/images/parents_reviewing_Mini_Maestro_photo_book_proof.webp"
                    width={569}
                    height={392}
                    alt="Parents reviewing Mini Maestro photo book proof before printing"
                    className="w-full h-full rounded-[16px] lg:rounded-[20px] xl:rounded-[30px]"
                  />
                  <div className="w-12 h-12 flex justify-center items-center absolute left-1/2 bottom-[-22px] -translate-x-1/2 md:left-[unset] md:bottom-[unset] md:-right-[48px] md:top-1/2 md:-translate-y-1/2 rounded-full bg-[#FF77C3] text-black">
                    <h5>3</h5>
                  </div>
                </div>
                <div className="w-full lg:w-7/12 flex items-center p-0 pt-14 md:p-4 md:pt-0">
                  <div className="flex flex-col gap-2 pl-0 sm:gap-3 md:pl-[40px] xl:pl-[70px] ">
                    {/* <div className="flex flex-col gap-2 pl-0 sm:gap-3 lg:gap-4 xl:pl-5 2xl:pl-[70px]"> */}
                    <h4 className="text-[24px] md:text-[28px] lg:text-[36px] font-semibold">{t("review_your_proof_and_approve")}</h4>
                    <p className="sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{t("review_your_proof_and_approve_description")}</p>
                    {/* <p className="btn-splash pink medium-btn">Book Now</p> */}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap flex-col-reverse md:flex-row md:flex-nowrap">
                <div className="w-full lg:w-7/12 flex items-center p-0 pt-14 md:p-4 md:pt-0">
                  {/* <div className="flex flex-col gap-2 pr-0 sm:gap-3 lg:gap-4 xl:pr-5 2xl:pr-[70px]"> */}
                  <div className="flex flex-col gap-2 pr-[0px] sm:gap-3 sm:pr-[40px] xl:pr-[70px] ">
                    <h4 className="text-[24px] md:text-[28px] lg:text-[36px] font-semibold">{t("treasured_memories_to_keep_forever")}</h4>
                    <p className="sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                      {t("treasured_memories_to_keep_forever_description")}
                    </p>
                    {/* <p className="btn-splash pink medium-btn">Book Now</p> */}
                  </div>
                </div>
                <div className="w-full lg:w-5/12 relative">
                  <Image
                    src="/images/smiling_child_holding_mini_maestro_art_book.webp"
                    width={569}
                    height={392}
                    alt="Smiling child holding completed Mini Maestro art book"
                    className="w-full h-full rounded-[16px] lg:rounded-[20px] xl:rounded-[30px]"
                  />
                  <div className="w-12 h-12 flex justify-center items-center left-1/2 bottom-[-22px] -translate-x-1/2 absolute md:-right-[unset] md:top-[50%] md:left-[0] md:-translate-y-1/2 rounded-full bg-[#FF77C3] text-black">
                    <h5>4</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkVertical;
