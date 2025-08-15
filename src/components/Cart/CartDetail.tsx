import { Link } from "@/i18n/routing";
import { shipping_charge } from "@/lib/common/rates";
import { DISCOUNT_TYPES } from "@/lib/constants";
import { clearCoupon, setCoupon } from "@/lib/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import Button from "../ui/Button";

const CartDetail = ({ locale }: { locale: string }) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.cart);
  const [isCouponApplied, setIsCouponApplied] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState("");
  const [couponDiscountPrice, setCouponDiscountPrice] = React.useState(0);
  const [productTotal, setProductTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const productTotal = products
      .map((product) => {
        if (product.is_photo_book) {
          return product.price + 10 * (product.selected_pages - 24);
        } else if (product.is_wall_painting && product.selected_frame) {
          return product.price + product.selected_frame.price;
        } else {
          return product.price * product.quantity;
        }
      })
      .reduce((a, b) => a + b, 0);

    setProductTotal(productTotal);
  }, [products]);

  const validateCoupon = async (code: string) => {
    const token = Cookie.get("token");
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupon/validate/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: products, locale: locale }),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Coupon validation error:", error);
      return { status: false, error: "Failed to validate coupon." };
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (isCouponApplied) {
      setCouponCode("");
      setCouponDiscountPrice(0);
      setIsCouponApplied(false);
      dispatch(clearCoupon());
      toast.success("Coupon removed successfully");
      return;
    }

    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    const response = await validateCoupon(couponCode.trim());
    if (response.status && response.data.coupon) {
      // const discountAmount = calculateDiscount(productTotal, response.data.coupon);
      setCouponDiscountPrice(Number((productTotal - response.data.finalCheckoutPrice).toFixed(2)));
      setCouponCode(response.data.coupon.code);
      setIsCouponApplied(true);

      dispatch(
        setCoupon({
          code: response.data.coupon.code,
          isApplied: true,
        })
      );
      toast.success("Coupon applied successfully");
    } else {
      dispatch(clearCoupon());
      setCouponDiscountPrice(0);
      toast.error(response.error);
    }
  };

  // useEffect(() => {
  //   const validateAndApplyCoupon = async () => {
  //     if (coupon?.isApplied && productTotal > 0) {
  //       const response = await validateCoupon(coupon.code);
  //       if (response.status && response.data.coupon) {
  //         setCouponCode(response.data.coupon.code);
  //         setCouponDiscountPrice(Number((productTotal - response.data.finalCheckoutPrice).toFixed(2)));
  //       } else {
  //         dispatch(clearCoupon());
  //         setCouponCode("");
  //         setCouponDiscountPrice(0);
  //         toast.error(response.error);
  //       }
  //     }
  //   };

  //   validateAndApplyCoupon();
  // }, [coupon, productTotal]);

  return (
    <div className="h-full bg-[var(--light-gray)] rounded-[3px] p-2 sm:p-3 lg:p-4 lg:rounded-lg xl:rounded-2xl 2xl:rounded-[30px] 2xl:p-5 flex flex-col gap-4">
      <div className="flex border-2 border-[var(--light-gray-200)] h-full flex-col gap-4 justify-between rounded-[3px] p-2 sm:p-3 lg:px-4 lg:rounded-lg xl:rounded-2xl 2xl:rounded-[30px] 2xl:px-[20px] 2xl:py-[30px]">
        <div className="flex flex-col gap-8">
          <div>
            <h6>{t("apply_coupon")}</h6>
          </div>
          <div>
            <div className="flex gap-2 justify-between sm:gap-4">
              <input
                disabled={isLoading || isCouponApplied}
                type="text"
                placeholder={t("enter_coupon_code")}
                className="w-full border-2 border-[var(--light-gray-200)] rounded-[3px] p-2 sm:p-3 lg:p-4 lg:rounded-lg xl:rounded-2xl 2xl:rounded-[30px] 2xl:p-5"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button isDisabled={isLoading} isLoading={isLoading} className="w-[140px] btn-pill bg-pink-500" onClick={handleApplyCoupon}>
                {t(`${isCouponApplied ? "remove" : "apply"}`)}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex border-2 border-[var(--light-gray-200)] flex-col h-full gap-4 justify-between rounded-[3px] p-2 sm:p-3 lg:px-4 lg:rounded-lg xl:rounded-2xl 2xl:rounded-[30px] 2xl:px-[20px] 2xl:py-[30px]">
        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-[30px]">
            <div>
              <h6>{t("cart_calculator")}</h6>
            </div>
            <div>
              <div className="flex flex-col gap-2 border-b-2 border-b-[var(--light-gray-200)] pb-2 sm:pb-4 sm:gap-3 md:gap-4  lg:gap-5 lg:pb-5 ">
                <div className="flex gap-2  justify-between  sm:gap-4 ">
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{t("product_amount")}</p>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{productTotal} SEK</p>
                </div>
                <div className="flex gap-2  justify-between  sm:gap-4">
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{t("shipping_charges")}</p>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{shipping_charge} SEK</p>
                </div>
                {isCouponApplied && (
                  <div className="flex gap-2  justify-between  sm:gap-4">
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">{t("coupon_discount")}</p>
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-green-500">
                      - {couponDiscountPrice} SEK
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2  justify-between  sm:gap-4">
              <p className="font-bold text-[var(--pink-500)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                {t("total_amount")}
              </p>
              <p className="font-bold text-[var(--pink-500)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                {productTotal + shipping_charge - couponDiscountPrice} SEK
              </p>
            </div>
          </div>
        </div>
        <Link href={"/checkout"} className="btn-pill pink">
          {t("checkout")}
        </Link>
      </div>
    </div>
  );
};

export default CartDetail;
