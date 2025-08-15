import { defineRouting } from "next-intl/routing";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "sv"],

  // Used when no locale matches
  defaultLocale: "sv",

  pathnames: {
    "/": "/",
    "/product": {
      en: "/product",
      sv: "/produkter",
    },
    "/webshop": {
      en: "/webshop",
      sv: "/webbshop",
    },
    "/contact-us": {
      en: "/contact-us",
      sv: "/kontakta-oss",
    },
    "/faq": {
      en: "/faq",
      sv: "/faq",
    },
    "/login": {
      en: "/login",
      sv: "/logga-in",
    },
    "/cart": {
      en: "/cart",
      sv: "/vagn",
    },
    "/dashboard": {
      en: "/dashboard",
      sv: "/instrumentpanelen",
    },
    "/product/[product-slug]": {
      en: "/product/[product-slug]",
      sv: "/produkt/[product-slug]",
    },
    "/signup": {
      en: "/signup",
      sv: "/registrera",
    },
    "/forgot-password": {
      en: "/forgot-password",
      sv: "/glomt-losenord",
    },
    "/verify-otp": {
      en: "/verify-otp",
      sv: "/verifiera-otp",
    },
    "/submission": {
      en: "/submission",
      sv: "/insandning",
    },
    "/checkout": {
      en: "/checkout",
      sv: "/kassa",
    },
    "/order/[order-id]": {
      en: "/order/[order-id]",
      sv: "/beställa/[order-id]",
    },
    "/privacy-policy": {
      en: "/privacy-policy",
      sv: "/integritetspolicy",
    },
    "/terms-and-conditions": {
      en: "/terms-and-conditions",
      sv: "/villkor",
    },
    "/cookie-policy": {
      en: "/cookie-policy",
      sv: "/cookie-policy",
    },
    "/printing": {
      en: "/printing",
      sv: "/tryckning",
    },
    "/return-policy": {
      en: "/return-policy",
      sv: "/return-policy"
    },
    "/coupon": {
      en: "/coupon",
      sv: "/kupong",
    },
    "/blog": {
      en: "/blog",
      sv: "/blogg",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation(routing);

export type Locale = (typeof routing.locales)[number];

export const locales = routing.locales;
