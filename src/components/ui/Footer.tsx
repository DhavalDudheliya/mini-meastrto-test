import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

const Footer = () => {
  const t = useTranslations();

  return (
    <div className="flex-col bg-[#fffffc] relative overflow-hidden border-t border-black">
      <div className="absolute bottom-10 right-10 rotate-[220deg] z-0">
        <Image src="/images/circles1.svg" alt="circles" width={10} height={10} className="w-20 h-20 object-cover" />
      </div>
      <div className="container relative z-[9]">
        <div className="flex flex-wrap pt-[60px] pb-8 px-4">
          <div className="w-full pb-4 md:w-1/2 lg:w-1/3 sm:pr-4">
            <div className="flex flex-col">
              <Image src="/images/logo.svg" width={142} height={50} alt="header-logo" className="w-[142px]" />
              <p className="text-[14px] sm:text-[16px] md:text-[18px]">{t("description")}</p>
            </div>
          </div>
          <div className="w-1/2 pb-4 md:w-1/2 lg:w-1/6 sm:pr-4">
            <div className="flex flex-col gap-1">
              <h6>{t("navigation")}</h6>
              <div className="flex flex-col gap-2 text-[14px] sm:text-[16px] md:text-[18px]">
                <Link href="/" className="footer-nav-link text-[var(--orange)]">
                  {t("home")}
                </Link>
                <Link href="/product" className="footer-nav-link text-[var(--orange)]">
                  {t("product")}
                </Link>
                <Link href="/webshop" className="footer-nav-link text-[var(--orange)]">
                  {t("web_shop")}
                </Link>
                <Link href="/contact-us" className="footer-nav-link text-[var(--orange)]">
                  {t("contact_us")}
                </Link>
                <Link href="/contact-us" className="footer-nav-link text-[var(--orange)]">
                  {t("contact_us")}
                </Link>
                <Link href="/faq" className="footer-nav-link text-[var(--orange)]">
                  {t("faq")}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 pb-4 md:w-1/2 lg:w-1/6 sm:pr-4">
            <div className="flex flex-col gap-1">
              <h6>{t("need_more_help")}</h6>
              <div className="flex flex-col gap-2 text-[14px] sm:text-[16px] md:text-[18px]">
                <Link href="/terms-and-conditions" className="footer-nav-link text-[var(--orange)]">
                  {t("tnc")}
                </Link>
                <Link href="/privacy-policy" className="footer-nav-link text-[var(--orange)]">
                  {t("privacy_policy")}
                </Link>
                <Link href="/cookie-policy" className="footer-nav-link text-[var(--orange)]">
                  {t("cookie_policy")}
                </Link>
                <Link href="/return-policy" className="footer-nav-link text-[var(--orange)]">
                  {t("return_policy")}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 pb-4 md:w-1/2 lg:w-1/3 sm:pr-4">
            <div className="flex flex-col gap-1">
              <h6>{t("contact_us")}</h6>
              <div className="flex flex-col gap-2 text-[14px] sm:text-[16px] md:text-[18px]">
                <p>{t("address")}: Stockholm, Sweden</p>
                <p>{t("email")}: info@mini-maestro.com</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/6">
            <div className="flex flex-col gap-1">
              <h6>{t("follow_us")}</h6>
              <div className="flex gap-3">
                <NextLink target="blank" href={"https://www.tiktok.com/@minimaestro.moments"}>
                  <Image alt="facebook" src="/images/tiktok.svg" width={24} height={24} className="w-[24px] h-[24px]" />
                </NextLink>
                <NextLink target="blank" href={"https://www.instagram.com/mini.maestro.moments/"}>
                  <Image alt=" " src="/images/insta.svg" width={24} height={24} className="w-[24px] h-[24px]" />
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="p-4 text-center text-[14px]">{t("copy_right")}</p>
      </div>
    </div>
  );
};

export default Footer;
