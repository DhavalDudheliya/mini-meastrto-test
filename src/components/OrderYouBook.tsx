import Image from "next/image";
import bgImage from "@/public/hero.jpg"; // Replace with your image
import { useTranslations } from "next-intl";

export default function OrderYouBook({ locale }: { locale: string }) {
  const t = useTranslations();
  return (
    <section className="relative w-full md:h-screen h-[50vh]">
      {/* Background Image */}
      <Image
        src={"/images/child_drawing_heart_for_mini_maestro_book_order.webp"}
        alt="Child drawing heart for Mini Maestro book order"
        fill
        className="object-cover object-[50%_20%] md:object-center"
        priority
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16">
        <div className="max-w-2xl text-white space-y-4">
          <h3 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-tight">
            {t("order_your_book")}
            <br />
            <span className="font-semibold">{t("we_will_handle_the_rest")}</span>
          </h3>
          <p className="text-lg md:text-xl text-white ml-2 lg:text-[40px] md:text-[32px] text-[24px] pb-0 md:pb-10">{t("no_app_no_stress_just_magsiv")}</p>
          <button className="btn-pill yellow">{t("create_your_book")}</button>
        </div>
      </div>
    </section>
  );
}
