"use client";

import LoginForm from "@/components/login/LoginForm";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const page = () => {

  const t = useTranslations();

  return (
    <div className="w-full h-full overflow-auto lg:h-[100vh] lg:overflow-hidden">
      <div className="flex flex-wrap w-full h-full">
        <div className="w-full lg:w-[43.75%]">
          <div className="w-full h-full">
            <Image
              alt="kids-painting-img"
              src="/images/login_left_img.png"
              width={960}
              height={951}
              className="w-full h-[60vh] object-cover lg:h-screen"
            />
          </div>
        </div>
        <div className="w-full lg:w-[56.25%] h-full relative">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="Custom photo books made from children’s hand-drawn art"
              width={210}
              height={70}
              className="fixed w-[100px] top-4 right-4 sm:w-[150px] sm:right-5 sm:top-5 xl:top-10 xl:right-10 xl:w-[210px]"
            />
          </Link>
          <Image
            src="/images/hiw_splash.png"
            width={860}
            height={494}
            alt="splash_left"
            className="absolute max-w-[50%] sm:max-w-[36.2%] left-0 top-0 "
          />
          <Image
            src="/images/hiw_splash.png"
            width={860}
            height={494}
            alt="splash_left"
            className="absolute hidden max-w-[50%] lg:block sm:max-w-[36.2%] -scale-100 right-0 bottom-0 "
          />
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="thin-scrollbar w-full sm:max-w-[90%] xl:max-w-[78.66%] lg:overflow-hidden lg:overflow-y-auto lg:pr-1">
              <div className="flex relative z-[9] flex-col gap-4 lg:gap-5 xl:gap-[30px] 2xl:gap-[50px]">
                <div className="flex flex-col gap-2">
                  <h3>{t("login")}</h3>
                  <p className="text-[var(--dark-gray)] text-[14px] md:text-[16px] lg:text-[18px]">
                    {t("don't_have_an_account")}{" "}
                    <Link href="/signup" className="text-[var(--dark-gray)] underline">
                      {t("sign_up")}
                    </Link>
                  </p>
                </div>
                <div className="bg-light">
                  <div className="flex flex-col gap-4 lg:gap-5 xl:gap-[30px]">
                    <LoginForm />
                    <div>
                      <p className="text-[var(--dark-gray)] text-[14px] md:text-[16px] lg:text-[18px]">
                        {t("don't_remeber_password")}{" "}
                        <Link href="/forgot-password" className="text-[var(--dark-gray)] underline">
                          {t("forgot_password")}
                        </Link>
                      </p>
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
