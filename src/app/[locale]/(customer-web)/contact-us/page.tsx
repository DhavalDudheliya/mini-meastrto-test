import ContactUsForm from "@/components/ContactUs/ContactUsForm";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const contactInfo = [
  {
    bg_img: "/images/blue_mini_splash.png",
    icon: "/images/mail.svg",
    info: "info@mini-maestro.com",
  },
  {
    bg_img: "/images/orange_splash_mini.png",
    icon: "/images/location.svg",
    info: "Stockholm, Sweden",
  },
];

const page = ({ params }: { params: any }) => {

  const locale = params.locale;

  unstable_setRequestLocale(locale);

  const t = useTranslations();

  return (
    <div className="px-4 mb-10 flex items-center justify-center min-h-screen mt-[80px] md:mt-[100px]">
      <div className="container">
        <div className="flex flex-wrap items-center flex-col-reverse gap-[30px] md:flex-nowrap md:gap-0 md:flex-row">
          <div className="w-full md:w-[40%] xl:w-1/2">
            <div>
              <div className="flex flex-col gap-[20px] md:gap-[30px] lg:gap-[44px] xl:gap-[54px] 2xl:gap-[64px]">
                <div className="flex flex-col gap-2">
                  <h2>{t("get_in_touch")}</h2>
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">{t("get_in_touch_description")}</p>
                </div>
                <div className="flex flex-col gap-[20px] sm:gap-[25px] md:gap-[30px] lg:gap-[33px]">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div
                        className="flex w-[50px] h-[40px] lg:w-[71.17px] lg:h-[58px] justify-center items-center"
                        style={{
                          backgroundImage: `url(${info.bg_img})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                      >
                        <Image src={info.icon} width={30} height={30} alt="splash_image" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]" />
                      </div>
                      <p className="text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">{info.info}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%] xl:w-1/2">
            <div className="pl-0 md:pl-4 xl:pl-[30px]">
              <div className="bg-[var(--blue-200)] rounded-[16px] p-2 sm:rounded-[20px] md:p-4 lg:rounded-[30px] lg:py-[32px] lg:px-[24px]">
                <div className="bg-white border-2 border-[var(--blue-300)] p-2 rounded-[16px] sm:rounded-[20px] md:p-4 lg:px-[28px] lg:rounded-[30px] lg:py-[24px]">
                  <div className="flex flex-col gap-4 xl:gap-[34px]">
                    <div className="flex flex-col">
                      <h5>{t("we_are_just_a_message_away")}</h5>
                      <p className="font-light text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                        {t("reach_out_to_us_for_any_queries_or_concerns")}
                      </p>
                    </div>
                    <div>
                      <ContactUsForm />
                    </div>
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

export default page;
