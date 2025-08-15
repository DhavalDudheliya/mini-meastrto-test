import { clearUser, setUser } from "@/lib/features/user/user.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import React, { useEffect } from "react";
import Cookie from "js-cookie";
import { isValidUrl } from "@/utils/helper";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import Button from "./Button";
import { MoveLeft } from "lucide-react";

type DashboardHeaderProp = {
  toggleSidebar: () => void;
};

const DashBoardHeader = ({ toggleSidebar }: DashboardHeaderProp) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const pathname = usePathname();

  useEffect(() => {
    // Retrieve the token from localStorage or cookies
    const token = Cookie.get("token");

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken: any = jwtDecode(token);

        // Assuming the token contains 'name' and 'picture'
        const { email, profile_picture, name, role } = decodedToken;

        // Set values in localStorage if they don't exist
        if (!localStorage.getItem("userName")) {
          localStorage.setItem("userName", name);
        }

        if (!localStorage.getItem("userPicture")) {
          localStorage.setItem("userPicture", profile_picture);
        }

        if (!localStorage.getItem("userEmail")) {
          localStorage.setItem("userEmail", email);
        }

        dispatch(setUser({ name: name, email: email, profile_picture: profile_picture, access_token: token, role: role || "customer" }));
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPicture");
    localStorage.removeItem("userEmail");
    dispatch(clearUser());
    router.push("/login");
  };

  const { name, profile_picture, role } = useAppSelector((state) => state.user);

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

  const { counter } = useAppSelector((state) => state.cart);

  return (
    <div className="bg-[var(--mid-gray)] px-4 py-3 lg:px-5 xl:px-6 2xl:px-10">
      <div className="w-full flex justify-between items-center">
        <div className="w-1/6">
          {pathname !== "/dashboard" && (
            <Button
              onClick={() => {
                router.push({ pathname: "/dashboard" });
              }}
            >
              <div className="gap-5 flex items-center justify-center">
                <MoveLeft />
                <span className="hidden lg:inline-block text-lg capitalize">{t("back")}</span>
              </div>
            </Button>
          )}
        </div>
        <div className="flex gap-3 items-center">
          <div className="pb-1 relative w-fit header-user">
            <div className="flex items-center gap-[6px] cursor-pointer ">
              <div className="flex items-center gap-2">
                <Image
                  src={resolvedProfilePicture}
                  alt="avatar-image"
                  width={50}
                  height={50}
                  className="w-[30px] h-[30px] rounded-[100px] lg:w-[40px] lg:h-[40px] xl:w-[50px] xl:h-[50px]"
                />
                <p className="font-bold text-[var(--orange)] text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
                  {`${name.split(" ")[0]}`} {name.split(" ")[1] ? name.split(" ")[1]?.charAt(0).toUpperCase() + "." : ""}
                </p>
              </div>
              <Image src="/images/user_menu.svg" alt="user-menu" width={12} height={7} />
            </div>
            <div className="header-dropdown">
              <div className="flex flex-col">
                <Link onClick={handleLogout} href="/login" className="flex items-center gap-[6px] header-dropdown-menu">
                  <Image
                    src="/images/logout.svg"
                    alt="log-out"
                    width={28}
                    height={28}
                    className="w-[15px] h-[15px] md:w-[25px] md:h-[25px] 2xl:w-[28px] 2xl:h-[28px]"
                  />
                  <p className="font-bold text-[14px] sm:text-[18px]">{t("logout")}</p>
                </Link>
                <Link href="/webshop" className="flex items-center gap-[6px] header-dropdown-menu">
                  <Image src="/images/header-order.svg" alt="order-icon" width={28} height={28} />
                  <p className="font-bold text-[16px] sm:text-[18px]">{t("order")}</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative inline-block flex-shrink-0">
            <Link href="/cart">
              <Image src="/images/cart.svg" height={35} width={35} alt="cart" className="w-6 h-6 md:w-[30px] md:h-[30px] 2xl:w-[35px] 2xl:h-[35px]" />
              <span className="absolute flex items-center justify-center top-[-5px] right-[-5px] bg-red-600 text-white text-sm rounded-full h-5 w-5">
                {counter}
              </span>
            </Link>
          </div>

          <LocaleSwitcherSelect />
          <div onClick={toggleSidebar} className="flex-col gap-1 -mt-1 flex lg:hidden cursor-pointer">
            <div className="w-6 h-[3px] bg-black rounded"></div>
            <div className="w-6 h-[3px] bg-black rounded"></div>
            <div className="w-6 h-[3px] bg-black rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
