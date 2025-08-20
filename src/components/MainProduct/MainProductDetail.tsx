"use client";
import React, { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { Product } from "@/lib/features/product/types";
import Recommendation from "./Recommendation";
import { useGetProductsQuery } from "@/lib/features/product/product.api";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addProduct } from "@/lib/features/cart/cart.slice";
import { useAddToCartMutation } from "@/lib/features/cart/cart.api";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { Truck } from "lucide-react";

const MainProductDetail = ({ data, isLoadingProduct }: { isLoadingProduct: boolean; data: Product[] }) => {
  console.log("🚀 ~ data-->", data);
  const t = useTranslations();

  const locale = useLocale();

  const dispatch = useAppDispatch();

  const [addToCartReq, addToCartRes] = useAddToCartMutation();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [rangeValue, setRangeValue] = useState<number>(24);
  const [addCartLoading, setAddCartLoading] = useState<boolean>(false);

  const [selectedFrame, setSelectedFrame] = useState<Product | null>(null);

  const [selectedVariant, setSelectedVariant] = useState<Product | null>(data[0]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  };

  const { isLoggedIn } = useAppSelector((state) => state.user);

  const {
    isLoading,
    isSuccess,
    data: recProducts,
  } = useGetProductsQuery({
    query: `?category=${data[0].category.map((cat) => cat.name[locale]).join(",")}`,
  });

  // Assuming data[0].price is the base price for 24 photos.
  let basePrice = data[0].price;
  const calculatedPrice = 10 * (rangeValue - 24);

  const handleAddToCart = (product: Product) => {
    let cartProducts = [];

    setAddCartLoading(true);

    if (data[0].is_wall_painting) {
      if (!selectedVariant) {
        toast.error(t("please_select_variant"));
        setAddCartLoading(false);
        return;
      }

      if (selectedVariant) {
        cartProducts.push(selectedVariant);
      }
    } else {
      cartProducts.push(product);
    }

    cartProducts.map((cartProduct, cartProductIndex) => {
      if (isLoggedIn) {
        addToCartReq({
          product_id: cartProduct._id,
          quantity: 1,
          selected_pages: rangeValue,
          selected_frame: selectedFrame,
          is_sync: false,
        }).then(({ error, data }) => {
          if (!error) {
            dispatch(
              addProduct({
                ...cartProduct,
                product_id: cartProduct._id,
                quantity: 1,
                selected_pages: rangeValue,
                selected_frame: selectedFrame,
                price: cartProduct.price,
              })
            );
            setAddCartLoading(false);

            if (cartProductIndex === cartProducts.length - 1) {
              toast.success(t("product_added_to_cart"));
            }
          } else {
            toast.error(t("failed_to_add_product_to_cart"));
          }
        });
      } else {
        dispatch(
          addProduct({
            ...cartProduct,
            product_id: cartProduct._id,
            quantity: 1,
            selected_pages: rangeValue,
            selected_frame: selectedFrame,
            price: cartProduct.price,
            local_id: Date.now() + cartProduct._id,
          })
        );

        if (cartProductIndex === cartProducts.length - 1) {
          toast.success(t("product_added_to_cart"));
        }

        setAddCartLoading(false);
      }
    });
  };

  if (selectedVariant) {
    basePrice = selectedVariant.price;
  }

  if (selectedFrame) {
    basePrice += selectedFrame.price;
  }

  const handleSelectFrame = (frame: Product) => {
    setSelectedFrame(frame);
  };

  const noFrame: {
    name: { [key: string]: string };
    price: number;
    _id: string;
  } = {
    name: { en: t("no_frames"), sv: t("no_frames") },
    price: 0,
    _id: "no-frame",
  };

  return (
    <>
      <div className="">
        <div className="py-[45px] pb-0 lg:pb-[20px] px-4 md:pt-[50px] 2xl:pt-[70px]">
          <div className="flex flex-wrap">
            <div className="w-full md:w-[43%]">
              <div className="overflow-hidden flex flex-col gap-2 lg:gap-5 xl:gap-6">
                <div className="main-product-slider">
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {selectedVariant &&
                      selectedVariant.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative pb-[100%] 2xl:pb-[85%] rounded-lg border-2 border-[#FF77C3] overflow-hidden rounded-4 lg:rounded-[20px] lg:border-4 xl:rounded-[30px]">
                            <Image
                              className="absolute top-0 left-0 w-full h-full object-contain"
                              src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${image}`}
                              alt={`Product Image ${index + 1}`}
                              width={800}
                              height={800}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
                <div className="w-full overflow-hidden">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    breakpoints={{
                      250: {
                        spaceBetween: 12,
                      },
                      1024: {
                        spaceBetween: 16,
                      },
                    }}
                    className="mySwiper"
                  >
                    {selectedVariant &&
                      selectedVariant.images.map((image, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="relative pb-[95%] rounded-lg border-2 lg:border-4 border-[#FF77C3] overflow-hidden rounded-4 lg:rounded-[20px] xl:rounded-[30px]">
                              <Image
                                className="absolute top-0 left-0 w-full h-full object-contain"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${image}`}
                                alt={`Thumb Image ${index + 1}`}
                                width={130}
                                height={130}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[57%] pt-5 md:pt-0">
              <div className="h-full pl-0 md:pl-5 lg:pl-6 xl:pl-7 2xl:pl-[37px]">
                <div className="h-full flex flex-col gap-[30px] justify-between">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex flex-col gap-1">
                        <div
                          className="text-[16px] xl:text-[18px] 2xl:text-[22px] flex flex-col gap-1"
                          dangerouslySetInnerHTML={{
                            __html: selectedVariant?.description[locale] ?? "",
                          }} // Render HTML content
                        />
                      </div>
                    </div>

                    {data[0].is_wall_painting || data[0].is_photo_book ? (
                      <>
                        <h6 className="text-lg product-p font-bold text-[#333]">{t("delivery_time")}</h6>
                        <ul className="text-[#333] list-none list-inside product-p">
                          <li>{t("delivery_time_1")}</li>
                          <li>{t("delivery_time_2")}</li>
                          <li>{t("delivery_time_3")}</li>
                        </ul>
                      </>
                    ) : (
                      <div className="flex items-center justify-center border-pink-200 rounded-lg border-2 w-1/2 max-sm:w-full max-lg:w-full bg-white shadow-lg p-4">
                        <div className="w-1/5 border-r-2 border-pink-200 h-full flex items-center justify-center p-3">
                          <Truck className="text-pink-700 w-12 h-12" />
                        </div>
                        <div className="w-full pl-4">
                          <h6 className="text-lg font-semibold text-[#333]">{t("shipping_charges")}</h6>
                          {/* <p className="text-xl font-bold text-pink-700">79.00 SEK</p> */}
                          <p className="text-[#333]">{t("shipment_delivery_time")}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-row gap-1 items-end">
                      <h5 className="product-p font-bold">{t("price")}: </h5>
                      <h5 className="font-normal product-p">
                        {data[0].is_photo_book ? (basePrice + calculatedPrice).toFixed(2) : basePrice.toFixed(2)} SEK
                      </h5>
                    </div>
                    {data[0].is_photo_book && (
                      <div className="flex flex-col  gap-2 p-4 rounded-[10px] bg-[var(--mid-gray)]">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-col gap-1">
                            <p className="text-[16px] xl:text-[18px] 2xl:text-[20px]">{t("pricing_based_on_number_of_pages")}</p>
                            <input type="range" id="price-range" min="24" max="50" value={rangeValue} onChange={handleRangeChange} />
                          </div>
                          <div className="flex justify-between gap-2">
                            <p className="text-[16px]">
                              {data[0].is_photo_book ? (basePrice + calculatedPrice).toFixed(2) : basePrice.toFixed(2)} SEK
                            </p>
                            {rangeValue} {t("pages")}
                            {/* <p className="text-[16px]">{t("page_price")}</p> */}
                          </div>
                        </div>
                      </div>
                    )}

                    {data[0].is_photo_book && (
                      <div className="flex center flex-col gap-2 bg-pink-50 p-2 rounded-lg">
                        <span>{t("starting_at_999_sek_for_a_photobook_with_24_drawings")}</span>
                        <span>{t("shipping_charges_will_be_charged_extra_on_this_price")}</span>
                      </div>
                    )}
                  </div>
                  {data[0].is_wall_painting ? (
                    <div className="flex items-center flex-row gap-5 max-sm:flex-col">
                      <div className="flex items-start flex-col gap-2 justify-start w-full">
                        <h6 className="font-bold text-lg">{t("select_variant")}</h6>
                        <select
                          defaultValue={data[0].variants.findIndex((variant) => variant._id === selectedVariant?._id)}
                          className="w-full bg-[#fd44ac] text-white rounded-full pink font-medium px-5 py-2.5 text-center inline-flex items-center"
                          onChange={(e) => setSelectedVariant(data[0].variants[+e.target.value as number])}
                        >
                          {data[0].variants.map((variant, index) => (
                            <option key={variant._id} value={index}>
                              {variant.name[locale]} - {variant.price.toFixed(2)} SEK
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-start flex-col gap-2 justify-start w-full">
                        <h6 className="font-bold text-lg">{t("select_frames")}</h6>
                        <select
                          defaultValue={2}
                          className="w-full bg-[#fd44ac] text-white rounded-full pink font-medium px-5 py-2.5 text-center inline-flex items-center"
                          onChange={(e) => handleSelectFrame(data[0].frames[+e.target.value as number])}
                        >
                          {[...data[0].frames, noFrame].map((frame, index) => (
                            <option key={frame._id} value={index}>
                              {frame.name[locale]} - {frame.price.toFixed(2)} SEK
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : null}

                  <Button className="text-white" isLoading={false} isDisabled={data[0].quantity === 0} onClick={() => handleAddToCart(data[0])}>
                    {data[0].quantity === 0 ? t("out_of_stock") : t("add_to_cart")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isLoading && recProducts?.data.length ? (
        <>
          <Recommendation product={recProducts.data} />
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* <div className="w-full border-t border-black">
        <Faq />
      </div> */}
    </>
  );
};

export default MainProductDetail;
