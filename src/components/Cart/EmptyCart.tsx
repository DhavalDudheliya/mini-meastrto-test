import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const EmptyCart = () => {

  const t = useTranslations();

  return (
    <div className="w-full pt-10">
      <div className="flex items-center justify-center gap-10 flex-col">
        <Image src="/images/lonely_cart.svg" alt="Empty Cart" width={300} height={300} />
        <h5>{t("your_cart_is_empty")}</h5>
        <Link href={"/webshop"} className="w-1/3">
          <Button>{t("shop_now")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
