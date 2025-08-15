"use client";

import { useParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import RadioDropdown from "./RadioDropdown";
import { useLocale } from "next-intl";
import { setLocalItem } from "@/utils/helper";
import { useSyncLocaleQuery } from "@/lib/features/user/user.api";

export default function LocaleSwitcherSelect() {

  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  let pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  
  useSyncLocaleQuery({ locale }, { skip: false });

  function onSelectChange(option: { label: string; color: string; id: string }) {
    const nextLocale = option.id as Locale;

    if (pathname === "/product/[product-slug]") {
      pathname = "/";
    }

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  useEffect(() => {
    setLocalItem(locale, "locale");
  }, [locale]);

  return (
    <RadioDropdown
      type="language"
      onChange={(option) => onSelectChange(option)}
      uniqueId="payment-selector"
      uniqueName="payment-selector"
      key={"payment-selector"}
      defaultSelected={locale}
    />
  );
}
