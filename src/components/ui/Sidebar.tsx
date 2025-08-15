"use client";
import Image from "next/image";
import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { NotebookPen, PrinterCheck, ShoppingBag, TicketPercent } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";


const Sidebar = () => {
  const pathname = usePathname();
  
  const t = useTranslations();
  
  const sidebarMenu: { label: string; path: "/dashboard" | "/printing" | "/coupon"; icon: React.ReactNode }[] = [
    { label: t("order"), path: "/dashboard", icon: <ShoppingBag /> },
    { label: t("printing"), path: "/printing", icon: <PrinterCheck /> },
    { label: t("coupon"), path: "/coupon", icon: <TicketPercent /> },
  ];

  const { role } = useAppSelector((state) => state.user);

  return (
    <div className="w-full py-4 h-screen bg-[var(--mid-gray)] overflow-hidden dashboard-sidebar border-r-2 border-r-[var--light-gray-300)] lg:py-6">
      <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6 2xl:gap-[34px]">
        <div className="w-full flex justify-center">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              width={150}
              height={60}
              className="w-[100px] h-auto md:w-[110px] lg:w-[120px] xl:w-[130px]  2xl:w-[160px] "
              alt="Custom photo books made from children’s hand-drawn art"
            />
          </Link>
        </div>
        <div className="flex flex-col">
          {sidebarMenu.map((menu, i) => (
            <>
              {(menu.path === "/printing" || menu.path === "/coupon") && role !== "admin" ? null : (
                <div key={i} className={`px-4 py-3 xl:px-5 xl:py-4 ${pathname === menu.path ? "bg-[var(--light-gray-300)]" : ""}`}>
                  <Link href={menu.path} className="flex items-center gap-3">
                    <div className={`${pathname === menu.path ? "text-[var(--orange)]" : ""}`}>{menu.icon}</div>
                    <p className={`font-bold ${pathname === menu.path ? "text-[var(--orange)]" : ""} text-[16px] sm:text-[18px] lg:text-[20px]`}>
                      {menu.label}
                    </p>
                  </Link>
                </div>
              )}
            </>
          ))}
            <div className="px-4 py-3 xl:px-5 xl:py-4">
            <a
              href="https://elegant-feast-203fc5fa91.strapiapp.com/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <div><NotebookPen /></div>
              <p className="font-bold text-[16px] sm:text-[18px] lg:text-[20px]">Blog</p>
            </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
