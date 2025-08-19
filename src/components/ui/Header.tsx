"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Cookie from "js-cookie";
import { isValidUrl } from "@/utils/helper";
import { clearUser } from "@/lib/features/user/user.slice";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

type HeaderProp = {
  showUser: boolean;
};

const Header = ({ showUser }: HeaderProp) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { name, profile_picture } = useAppSelector((state) => state.user);
  const { counter } = useAppSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 0);
  };

  useEffect(() => {
    // Initial check to set the scroll state if the page is already scrolled
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const locale = useLocale();

  const headerNavLinks: {
    label: string;
    path: "/" | "/product" | "/webshop" | "/contact-us" | "/faq" | "/blog";
    dropdown?: {
      label: string;
      path: "/product/[product-slug]";
      slug: { [key: string]: string };
    }[];
  }[] = [
    { label: t("home"), path: "/" },
    {
      label: t("product"),
      path: "/product",
      dropdown: [
        {
          label: t("wall_painting"),
          path: "/product/[product-slug]",
          slug: {
            en: "wall-painting-16-drawings",
            sv: "personlig-tavla-16-drawings",
          },
        },
        {
          label: t("photo_book"),
          path: "/product/[product-slug]",
          slug: { en: "photo-book", sv: "fotobok" },
        },
      ],
    },
    { label: t("web_shop"), path: "/webshop" },
    { label: t("contact_us"), path: "/contact-us" },
    { label: t("faq"), path: "/faq" },
    { label: t("blog"), path: "/blog" },
  ];

  const handleLogout = () => {
    Cookie.remove("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("userEmail");
    dispatch(clearUser());
    router.push("/login");
  };

  let resolvedProfilePicture;

  if (profile_picture && profile_picture != "undefined" && profile_picture != "null") {
    if (isValidUrl(profile_picture)) {
      resolvedProfilePicture = profile_picture;
    } else {
      resolvedProfilePicture = `${process.env.NEXT_PUBLIC_API_URL}/files?file_key=${profile_picture}`;
    }
  } else {
    resolvedProfilePicture = "/images/avtar.png";
  }

  return (
    <div className={`header px-4 py-2 fixed top-0 z-[9999] w-full md:fixed md:top-0 transition-all duration-300 bg-[#fffffc]`}>
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="header-logo px-0 lg:pl-10 xl:px-0">
            <Link href="/">
              <Image src={"/images/logo.svg"} alt="Mini Maestro logo" width={100} height={50} className="w-[90px] lg:w-[132px]" />
            </Link>
          </div>
          <div className="header-nav">
            <div
              className={`fixed border-r-2 border-r-[var(--light-gray-200)] top-[53.31px] z-[999] left-0 w-[230px] h-[calc(100vh_-_45.31px)] bg-[var(--mid-gray)]  md:border-r-0 p-4 md:relative md:flex-row md:h-auto md:w-max md:left-0 md:top-0 md:bg-transparent transform ${
                menuOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out md:translate-x-0 md:transition-none`}
            >
              <div className="h-full flex flex-col gap-4 justify-between">
                <div className="flex-col flex gap-[20px] lg:gap-5 2xl:gap-[30px] md:flex-row">
                  {headerNavLinks.map((link, index) => (
                    <div key={index} className="relative group">
                      {!link.dropdown ? (
                        <Link
                          key={index}
                          onClick={() => setMenuOpen(false)}
                          href={{ pathname: link.path }}
                          className={`header-nav-link flex items-center gap-1 md:text-[16px] xl:text-[20px] 2xl:text-[22px] font-medium ${
                            pathname === link.path ? "text-orange-500" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          key={index}
                          href={{ pathname: link.path }}
                          onClick={() => setMenuOpen(false)}
                          className={`header-nav-link cursor-pointer flex items-center gap-1 md:text-[16px] xl:text-[20px] 2xl:text-[22px] ${
                            pathname === link.path ? "text-orange-500" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}

                      {link.dropdown && (
                        <ul className="relative w-full mt-2 md:mt-0 md:absolute md:w-max overflow-hidden right-0 border-t-2 border-t-transparent md:bg-white md:shadow-lg rounded-md md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 md:hidden md:group-hover:block">
                          {link.dropdown.map((subLink, subIndex) => (
                            <Link
                              key={subIndex}
                              href={{
                                pathname: subLink.path,
                                params: {
                                  "product-slug": subLink.slug[locale],
                                },
                              }}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 md:text-[16px] xl:text-[20px] 2xl:text-[22px]"
                              onClick={() => setMenuOpen(false)}
                            >
                              <li className="max-[768px]:list-disc">{subLink.label}</li>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/login" className="flex md:hidden justify-center btn-pill pink">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
          <div className="header-cart flex items-center gap-3 lg:gap-5">
            {showUser ? (
              <div className="pb-1 relative header-user">
                <div className="flex items-center gap-[6px] cursor-pointer ">
                  <div className="flex items-center gap-2">
                    <Image
                      src={resolvedProfilePicture}
                      alt="avatar-image"
                      width={50}
                      height={50}
                      className="w-[30px] h-[30px] rounded-[100px] lg:w-[40px] lg:h-[40px] xl:w-[50px] xl:h-[50px]"
                    />
                    <p className="font-bold hidden lg:block text-[var(--orange)] md:text-[16px] xl:text-[20px] 2xl:text-[22px]">
                      {`${name.split(" ")[0]}`} {name.split(" ")[1] ? name.split(" ")[1]?.charAt(0).toUpperCase() + "." : ""}
                    </p>
                  </div>
                  <Image src="/images/user_menu.svg" alt="user-menu" width={12} height={7} />
                </div>
                <div className="header-dropdown">
                  <div className="flex flex-col">
                    <Link onClick={handleLogout} href={{ pathname: "/login" }} className="flex items-center gap-[6px] header-dropdown-menu">
                      <Image
                        src="/images/logout.svg"
                        alt="log-out"
                        width={28}
                        height={28}
                        className="w-[15px] h-[15px] md:w-[25px] md:h-[25px] 2xl:w-[28px] 2xl:h-[28px]"
                      />
                      <p className="font-bold text-[14px] sm:text-[18px]">{t("logout")}</p>
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-[6px] header-dropdown-menu">
                      <Image
                        src="/images/header-order.svg"
                        alt="order"
                        width={28}
                        height={28}
                        className="w-[15px] h-[15px] md:w-[25px] md:h-[25px] 2xl:w-[28px] 2xl:h-[28px]"
                      />
                      <p className="font-bold text-[14px] sm:text-[18px]">{t("order")}</p>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="header-btn md:flex btn-pill pink small-btn hover:shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                {t("sign_in")}
              </Link>
            )}
            <div className="relative inline-block flex-shrink-0">
              <Link href="/cart">
                <Image
                  src="/images/cart.svg"
                  height={35}
                  width={35}
                  alt="cart"
                  className="w-6 h-6 md:w-[30px] md:h-[30px] 2xl:w-[35px] 2xl:h-[35px]"
                />
                <span className="absolute flex items-center justify-center top-[-5px] right-[-5px] bg-red-600 text-white text-sm rounded-full h-5 w-5">
                  {counter}
                </span>
              </Link>
            </div>
            <div className="top-bar-dropdown">
              <LocaleSwitcherSelect />
            </div>

            <div className="flex-col gap-1 flex md:hidden cursor-pointer" onClick={toggleMenu}>
              <div className="w-6 h-[3px] bg-black rounded"></div>
              <div className="w-6 h-[3px] bg-black rounded"></div>
              <div className="w-6 h-[3px] bg-black rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
