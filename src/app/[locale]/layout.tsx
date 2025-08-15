import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Toaster } from "react-hot-toast";
import React, { Suspense } from "react";
import Loading from "./loading";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { GoogleTagManager } from '@next/third-parties/google'

import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Define metadata for both locales
const localeMetadata: {
  [key: string]: any;
} = {
  en: {
    title: "Mini Maestro Turn | Your Child's Art into Timeless Memories. Art Books, Wall Paintings, & Supplies",
    description:
      "Preserve your child’s creativity with our personalized photobooks and stunning wall paintings. We transform kids' art into cherished keepsakes and offer a wide range of painting supplies to inspire the next masterpiece. Celebrate your child’s imagination with us!",
    robots: "index, follow",
    applicationName: "Mini Maestro",
    openGraph: {
      title: "Mini Maestro | Transform Your Child's Art into Memories",
      description:
        "Turn your child's artwork into personalized photobooks, wall paintings, and more. Explore our painting supplies to inspire creativity!",
      images: [
        {
          url: "https://mini-maestro.com/_next/image?url=%2Fimages%2Fphoto_book_hero.png&w=750&q=75", // Replace with your image URL
          width: 750,
          height: "auto",
          alt: "Mini Maestro - Turn Your Child's Art into Memories",
        },
      ],
      url: "https://mini-maestro.com", // Replace with your domain
      type: "website",
    },
  },
  sv: {
    title: "Mini Maestro | Förvandla Ditt Barns Konst till Tidlösa Minnen. Konstböcker, Väggmålningar & Målarprodukter",
    description:
      "Bevara ditt barns kreativitet med våra personliga fotoböcker och fantastiska väggmålningar. Vi förvandlar barnens konst till värdefulla minnen och erbjuder ett brett utbud av målarprodukter för att inspirera nästa mästerverk. Fira ditt barns fantasi med oss!",
    robots: "index, follow",
    applicationName: "Mini Maestro",
    openGraph: {
      title: "Mini Maestro | Förvandla Ditt Barns Konst till Minnen",
      description:
        "Förvandla ditt barns konstverk till personliga fotoböcker, väggmålningar och mer. Utforska våra målarprodukter för att inspirera kreativitet!",
      images: [
        {
          url: "https://mini-maestro.com/_next/image?url=%2Fimages%2Fphoto_book_hero.png&w=750&q=75", // Replace with your image URL
          width: 750,
          height: "auto",
          alt: "Mini Maestro -  Förvandla Ditt Barns Konst till Minnen",
        },
      ],
      url: "https://mini-maestro.com", // Replace with your domain
      type: "website",
    },
  },
};

export default async function Layout({ children, params }: { children: React.ReactNode; params: any }) {
  const locale = params.locale;

  unstable_setRequestLocale(locale);

  // Provide locale-specific metadata
  const metadata = localeMetadata[locale] || localeMetadata["en"];

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId="GTM-K6XR2C38" />
      <head>
        {/* Basic Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="robots" content={metadata.robots} />
        <meta name="application-name" content={metadata.applicationName} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        {metadata.openGraph.images.map((image: any, index: number) => (
          <React.Fragment key={index}>
            <meta property="og:image" content={image.url} />
            <meta property="og:image:width" content={image.width.toString()} />
            <meta property="og:image:height" content={image.height.toString()} />
            <meta property="og:image:alt" content={image.alt} />
          </React.Fragment>
        ))}

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        {metadata.openGraph.images.length > 0 && <meta name="twitter:image" content={metadata.openGraph.images[0].url} />}
      </head>
      <body className={`${nunito.className} x-scroll-hidden`}>
        <GoogleOAuthProvider clientId="807886062055-n3aov28rm151ls1fe6tn4glbn9ujke2u.apps.googleusercontent.com">
          <StoreProvider>
            <NextIntlClientProvider messages={messages}>
              <Suspense fallback={<Loading />}>
                <Toaster toastOptions={{ className: "border-2 border-pink-300" }} containerStyle={{ zIndex: "99999" }} position="top-right" />
                {children}
              </Suspense>
            </NextIntlClientProvider>
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
