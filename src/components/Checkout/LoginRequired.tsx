'use client';

import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { getPathname, Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LoginRequired = () => {

  const locale = useLocale() as "en" | "sv";

  const pathname = getPathname({ href: { pathname: "/checkout" }, locale: locale });

  return (  
    <div className="w-full pt-10">
      <div className="flex items-center justify-center gap-10 flex-col">
        <Image src="/images/login-required.svg" alt="login_required_image" width={400} height={400} />
        <h5>You are required to login before checkout</h5>
        <Link href={{ pathname: "/login", query: { from: pathname } }} className="w-max">
          <Button>Take Me to Login Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginRequired;
