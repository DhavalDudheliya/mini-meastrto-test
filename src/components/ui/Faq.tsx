"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Faq = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="p-6 md:p-10 mx-4 my-8 relative bg-[#fffffc]">
      <div className="absolute top-32 left-2 md:top-20 md:left-10 rotate-180">
        <Image src="/images/circles1.svg" alt="circles" width={10} height={10} className="w-20 h-20 object-cover" />
      </div>
      {/* Heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl md:text-6xl font-bold">{t("explore_faqs")}</h2>
        <p className="mt-2 text-lg">{t("answers_to_what_everyones_asking")}</p>
        <Link href="/faq" type="button" className="border-2 border-[#FFD000] px-4 py-2 mt-8 rounded-2xl hover:bg-[#FFD000] hover:text-white">
          FAQs
        </Link>
      </div>
    </section>
  );
};

export default Faq;
