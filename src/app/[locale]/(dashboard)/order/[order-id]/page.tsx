"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { useGetOrderMutation, useUpdateOrderStatusMutation } from "@/lib/features/order/order.api";
import { Order } from "@/lib/features/order/types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, Package, Printer } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import moment from "moment";
import { extra_page_charge, shipping_charge } from "@/lib/common/rates";

export default function Page({ params }: { params: { "order-id": string } }) {
  const orderId = params["order-id"];

  const locale = useLocale();

  const t = useTranslations();

  const [orderReq, { isError, isSuccess, data, isLoading }] = useGetOrderMutation();

  const [updateStatusReq, updateStatusRes] = useUpdateOrderStatusMutation();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      orderReq({ order_id: orderId, current_page: 0 });
    }
  }, [orderId]);

  useEffect(() => {
    if (isSuccess && data && data.data.orders.length > 0) {
      setOrder(data.data.orders[0]);
    } else {
      setOrder(null);
    }
  }, [isError, isSuccess, data]);

  const subTotal = order?.products
    .reduce((acc, product) => {
      // Calculate the base price
      let total = product.price * product.quantity;

      // If the product is a photobook and has more than 24 pages, add the extra page cost
      if (product.is_photo_book && product.selected_pages > 24) {
        const extraPages = product.selected_pages - 24;
        total += extraPages * extra_page_charge * product.quantity; // Assuming 10 SEK per extra page
      }

      if (product.is_wall_painting && product.selected_frame) {
        const frameCoast = product.selected_frame.price;

        total += frameCoast;
      }

      return acc + total;
    }, 0)
    .toFixed(2);

  const total = order?.total_amount || 0;

  const { role } = useAppSelector((state) => state.user);

  const [loadingPrint, setLoadingPrint] = useState(false);

  const handlePrint = async (id: string) => {
    try {
      // Dynamically import print-js only when this function is called
      const printJS = (await import("print-js")).default;

      // Now call the printJS function with the configuration
      printJS({
        printable: id,
        type: "html",
        targetStyles: ["*"],
        documentTitle: "Order",
        onLoadingStart: () => {
          setLoadingPrint(true);
        },
        onLoadingEnd: () => {
          setLoadingPrint(false);
        },
      });
    } catch (error) {
      console.error("Error loading print-js:", error);
    }
  };

  const handleFulfillOrder = (order_id: string, status: string) => {
    updateStatusReq({ order_id, status });
  };

  useEffect(() => {
    if (updateStatusRes.isSuccess && !updateStatusRes.isLoading) {
      toast.success(t("status_updated_successfully"));
    }

    if (updateStatusRes.isError && !updateStatusRes.isLoading) {
      toast.error(t("status_update_failed"));
    }
  }, [updateStatusRes]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 w-full gap-5">
        <Link href={"/dashboard"}>
          <Button>
            <div className="flex items-center gap-2 max-[425px]:text-sm">
              <ArrowLeft />
              {t("back_to_orders")}
            </div>
          </Button>
        </Link>
        <div className="flex items-center w-full gap-3 flex-row justify-between ">
          <Button isLoading={loadingPrint} onClick={() => handlePrint("printable")}>
            <div className="flex items-center gap-2 max-[425px]:text-sm">
              <Printer />
              {t("print_order")}
            </div>
          </Button>
          {role === "admin" && (
            <Button
              isDisabled={order?.status === "shipped"}
              className={`${
                order?.status === "shipped"
                  ? "bg-blue-500 btn-pill w-full items-center justify-center flex disabled:cursor-not-allowed"
                  : "pink btn-pill w-full items-center justify-center flex"
              }`}
              onClick={() => handleFulfillOrder(orderId, "shipped")}
            >
              <div className="flex items-center gap-2 max-[425px]:text-sm">
                <Package />
                {order?.status === "shipped" ? t("order_fulfilled") : t("fulfill_order")}
              </div>
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 min-h-96 max-[767px]:flex-col w-full">
        <div className="flex w-1/2 max-[767px]:w-full items-start flex-col rounded-sm border-2 border-gray-100 p-5">
          <div className="flex flex-col gap-2">
            <h5>
              {t("order_id")}: {order?._id}
            </h5>
            <p className="text-gray-800">
              {t("placed_on")} {moment(order?.createdAt).format("DD/MM/YYYY")} {t("at")} {moment(order?.createdAt).format("hh:mm A")}
            </p>
          </div>
          <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
          <div className="flex flex-col">
            <h6>{t("customer")}</h6>
            <p className="font-bold text-lg">{order?.customer.name}</p>
            <p className="text-lg">{order?.customer.email}</p>
          </div>
          <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
          <div className="flex flex-col">
            <h6>{t("shipping_address")}</h6>
            <p>{order?.shipping_address.line1}</p>
            <p>{order?.shipping_address.line2}</p>
            <p>
              {order?.shipping_address.city}, {order?.shipping_address.postal_code}, {order?.shipping_address.state},{" "}
              {order?.shipping_address.country}
            </p>
          </div>
        </div>
        <div className="flex w-1/2 max-[767px]:w-full items-start flex-col rounded-sm border-2 border-gray-100 p-5">
          <div className="flex flex-col gap-2">
            <h5>{t("payment")}</h5>
          </div>
          <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-xl">{t("subtotal")}</p>
              <p className="text-xl">{subTotal} SEK</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-xl">{t("shipping")}</p>
              <p className="text-xl">{shipping_charge.toFixed(2)} SEK</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="text-xl">{t("tax")}</p>
              <p className="text-xl">00.00 SEK</p>
            </div>
            <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
            <div className="flex items-center justify-between w-full">
              <p className="text-xl">{t("total")}</p>
              <p className="text-xl">{(total / 100).toFixed(2)} SEK</p>
            </div>
            <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
            <div className="flex items-center justify-between w-full">
              <p className="text-xl">{t("payment_method")}</p>
              <p className="text-xl">{t("card")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-sm border-2 w-full border-gray-100 p-5">
        <div className="bg-gray-50 p-1">
          <h3>{t("items")}</h3>
        </div>
        <div className="w-full overflow-hidden overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b-2 border-[var(--gray-100)]">
                <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                  <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("product")}</p>
                </th>
                <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                  <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("quantity")}</p>
                </th>
                <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                  <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("price")}</p>
                </th>
                <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                  <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("total")}</p>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {order &&
                order.products.map((row, index) => (
                  <>
                    <tr key={index} className="border-t-2 border-[var(--gray-100)] hover:bg-gray-50 hover:cursor-pointer ">
                      <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                        <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                          <div className="flex items-center gap-[10px] w-max">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${row.main_image}`}
                              width={50}
                              height={50}
                              alt="product_image"
                              className="flex-shrink-0 rounded-full w-[50px] h-[50px]"
                            />
                            <div className="flex flex-col flex-shrink-0">
                              <p className="font-semibold whitespace-nowrap text-[14px] xl:text-[16px]">
                                {row.name[locale]}

                                {row.is_photo_book && `(${row.selected_pages - 24} ${t("extra_pages")})`}

                                {row.is_wall_painting && row.selected_frame ? ` (${row.selected_frame.name[locale]})` : ""}
                              </p>
                            </div>
                          </div>
                        </p>
                      </td>
                      <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                        <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row.quantity}</p>
                      </td>
                      <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                        <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row.price.toFixed(2)} SEK</p>
                      </td>
                      <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                        <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                          {(
                            row.quantity * row.price +
                            (row.is_photo_book
                              ? (row.selected_pages - 24) * 10
                              : row.is_wall_painting && row.selected_frame
                              ? row.selected_frame.price
                              : 0)
                          ).toFixed(2)}{" "}
                          SEK
                        </p>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="hidden">
        <div id="printable" className="flex gap-5 w-[800px] flex-col items-center justify-center">
          <div className="flex flex-col w-full items-center gap-5 min-h-96">
            <div className="flex w-full items-start flex-col rounded-sm border-2 border-gray-100 p-5">
              <div className="flex flex-col gap-2">
                <h5>
                  {t("order_id")}: {order?._id}
                </h5>
                <p className="text-gray-800">
                  {t("placed_on")} {moment(order?.createdAt).format("DD/MM/YYYY")} {t("at")} {moment(order?.createdAt).format("hh:mm A")}
                </p>
              </div>
              <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
              <div className="flex flex-col">
                <h6>{t("customer")}</h6>
                <p className="font-bold text-lg">{order?.customer.name}</p>
                <p className="text-lg">{order?.customer.email}</p>
              </div>
              <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
              <div className="flex flex-col">
                <h6>{t("shipping_address")}</h6>
                <p>{order?.shipping_address.line1}</p>
                <p>{order?.shipping_address.line2}</p>
                <p>
                  {order?.shipping_address.city}, {order?.shipping_address.postal_code}, {order?.shipping_address.state},{" "}
                  {order?.shipping_address.country}
                </p>
              </div>
            </div>
            <div className="flex w-full items-start flex-col rounded-sm border-2 border-gray-100 p-5">
              <div className="flex flex-col gap-2">
                <h5>{t("payment")}</h5>
              </div>
              <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl">{t("subtotal")}</p>
                  <p className="text-xl">{subTotal} SEK</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl">{t("shipping")}</p>
                  <p className="text-xl">{shipping_charge.toFixed(2)} SEK</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl">{t("tax")}</p>
                  <p className="text-xl">00.00 SEK</p>
                </div>
                <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl">{t("total")}</p>
                  <p className="text-xl">{(total / 100).toFixed(2)} SEK</p>
                </div>
                <div className="border-[1px] my-5 border-gray-200 border-dashed w-full" />
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl">{t("payment_method")}</p>
                  <p className="text-xl">{t("card")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full rounded-sm border-2 border-gray-100 p-5">
            <div className="bg-gray-50 p-1">
              <h3>{t("items")}</h3>
            </div>
            <div>
              <table className="max-w-screen-lg">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b-2 border-[var(--gray-100)]">
                    <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("product")}</p>
                    </th>
                    <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("quantity")}</p>
                    </th>
                    <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("price")}</p>
                    </th>
                    <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("total")}</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {order &&
                    order.products.map((row, index) => (
                      <>
                        <tr key={index} className="border-t-2 border-[var(--gray-100)] hover:bg-gray-50 hover:cursor-pointer ">
                          <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                            <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                              <div className="flex items-center gap-[10px] w-max">
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${row.main_image}`}
                                  width={50}
                                  height={50}
                                  alt="product_image"
                                  className="flex-shrink-0 rounded-full w-[50px] h-[50px]"
                                />
                                <div className="flex flex-col flex-shrink-0">
                                  <p className="font-semibold whitespace-nowrap text-[14px] xl:text-[16px]">
                                    {row.name[locale]}

                                    {row.is_photo_book && `(${row.selected_pages - 24} ${t("extra_pages")})`}

                                    {row.is_wall_painting && row.selected_frame ? ` (${row.selected_frame.name[locale]})` : ""}
                                  </p>
                                </div>
                              </div>
                            </p>
                          </td>
                          <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                            <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row.quantity}</p>
                          </td>
                          <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                            <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row.price.toFixed(2)} SEK</p>
                          </td>
                          <td className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                            <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                              {(
                                row.quantity * row.price +
                                (row.is_photo_book
                                  ? (row.selected_pages - 24) * 10
                                  : row.is_wall_painting && row.selected_frame
                                  ? row.selected_frame.price
                                  : 0)
                              ).toFixed(2)}{" "}
                              SEK
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
