import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import RadioDropdown from "../../../ui/RadioDropdown";
import rightPaginationIcon from "../../../../../public/images/right_pagination.svg";
import leftPaginationIcon from "../../../../../public/images/left_pagination.svg";
import { Order } from "@/lib/features/order/types";
import moment from "moment";
import { IPaginationMetadata } from "@/lib/features/types";
import { useAppSelector } from "@/lib/hooks";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Eye, ReceiptText } from "lucide-react";
import { useUpdateOrderStatusMutation } from "@/lib/features/order/order.api";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

const OrderDialog = ({ data, onClose }: { data: Order; onClose: () => void }) => {
  const locale = useLocale();

  const t = useTranslations();

  return (
    <div className="absolute z-[999] overflow-hidden top-0 left-0 w-full h-full bg-[#00000040] p-4">
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        <div className="p-3 w-full max-w-[600px] h-auto lg:max-w-[980px] bg-[var(--mid-gray)] rounded-md sm:rounded-xl 2xl:rounded-[30px] sm:p-4 xl:p-5 2xl:p-[30px]">
          <div className="relative h-full p-3 bg-white border-2 border-[var(--light-gray-200)] rounded-md sm:rounded-xl 2xl:rounded-[30px] sm:p-4 xl:p-5 2xl:p-[30px] overflow-hidden">
            <button onClick={onClose}>
              <Image
                src="/images/dialog_close.svg"
                alt="dialog-close"
                width={36}
                height={36}
                className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 absolute top-4 right-4 cursor-pointer z-[11]"
              />
            </button>
            <div className="w-full h-[500px] mt-10 overflow-x-auto">
              <table className="w-full overflow-auto overflow-x-auto">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b-2 border-[var(--gray-100)]">
                    <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("product")}</p>
                    </th>
                    <th className="w-[50px] py-3 px-4 lg:px-5 xl:px-[24px] text-center">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("notification")}</p>
                    </th>
                    <th className="py-3 px-4 w-[170px]  text-left lg:px-5 xl:px-[24px]">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("submission")}</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {data.products.map((row, index) => (
                    <tr key={index} className="border-t-2 border-[var(--gray-100)] hover:bg-gray-50 hover:cursor-pointer ">
                      <td className="px-5 py-2 xl:py-3">
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
                      <td className="w-[50px] py-3 px-4 lg:px-5 xl:px-[24px] text-center">
                        {row?.notification && <div className="mx-auto w-[16px] h-[16px] bg-[var(--pink-500)] rounded-[50%]"></div>}
                      </td>
                      <td className="px-5 py-2 w-[170px] xl:py-3">
                        <div className="flex w-full justify-center cursor-pointer">
                          {row.is_photo_book || row.is_wall_painting ? (
                            <Link href={{ pathname: "/submission", query: { order_id: data._id, product_id: row._id } }}>
                              <Button>
                                <div className="flex gap-2">
                                  <Eye /> <span className="text-lg">{t("view")}</span>
                                </div>
                              </Button>
                            </Link>
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminTable = ({
  data,
  pagination,
  onPageChange,
  onSearch,
}: {
  data: Order[];
  pagination: IPaginationMetadata;
  onPageChange: (number: number) => void;
  onSearch: (searchTerm: string) => void;
}) => {
  const t = useTranslations();

  const [searchTerm, setSearchTerm] = useState("");

  const [isOrderOpen, setOrderOpen] = useState<{ open: boolean; order: Order | null }>({ open: false, order: null });

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
  };

  const handleRowClick = (data: Order) => {
    setOrderOpen({ open: true, order: data });
  };

  const handleSearch = (value: string) => {
    onSearch(value);
    handlePageClick({ selected: 0 });
    setSearchTerm(value);
  };

  const { role } = useAppSelector((state) => state.user);

  const [updateStatusReq, updateStatusRes] = useUpdateOrderStatusMutation();

  const handleUpdateStatus = (status: string, order_id: string) => {
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

  const statusDropdown = [
    {
      label: t("waiting_confirmation"),
      color: "text-[var(--blue-500)]",
      id: "waiting-confirmation",
      icon: null,
    },
    {
      label: t("accepted"),
      color: "text-[var(--blue-500)]",
      id: "accepted",
      icon: null,
    },
    {
      label: t("processing"),
      color: "text-[var(--yellow)]",
      id: "processing",
      icon: null,
    },
    {
      label: t("shipped"),
      color: "text-[var(--orange)]",
      id: "shipped",
      icon: null,
    },
    {
      label: t("delivered"),
      color: "text-[var(--green)]",
      id: "delivered",
      icon: null,
    },
  ];

  return (
    <>
      <div className="h-full">
        <div className="border-2 h-full overflow-hidden border-[var(--gray-100)] rounded-md lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[30px]">
          <div className="py-3 border-b-2 border-b-[var(--gray-100)] w-full px-4 ext-left lg:px-5 xl:py-4 xl:px-[24px]">
            <input
              type="search"
              placeholder={t("search_by_order_id")}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full max-w-[626px]"
            />
          </div>
          <div className="h-[calc(100%_-_120px)] xl:h-[calc(100%_-_136px)] overflow-auto">
            <table className="w-full admin-table">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b-2 border-[var(--gray-100)]">
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("order")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("date")}</p>
                  </th>
                  <th className="py-3 px-4 lg:px-5 xl:px-[24px] text-center">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("notification")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("amount")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("status")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("details")}</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    onClick={() => handleRowClick(row)}
                    key={index}
                    className="border-t-2 border-[var(--gray-100)] hover:bg-gray-50 hover:cursor-pointer "
                  >
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row._id}</p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{moment(row.createdAt).format("DD MMM YYYY")}</p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      {row?.notification && <div className="mx-auto w-[16px] h-[16px] bg-[var(--pink-500)] rounded-[50%]"></div>}
                    </td>
                    <td className="px-5 py-2 xl:py-3">{(row.total_amount / 100).toFixed(2)} SEK</td>
                    {role === "admin" ? (
                      <td
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        className="w-min px-5 py-2 xl:py-3"
                      >
                        <RadioDropdown
                          type="status"
                          onChange={(e) => handleUpdateStatus(e.id, row._id)}
                          uniqueId={`status-${index}`}
                          uniqueName={`status-${index}`}
                          key={`status-${index}`}
                          defaultSelected={row.status}
                        />
                      </td>
                    ) : (
                      <td className="w-min px-5 py-2 xl:py-3">
                        <div className="bg-[var(--green-50)] w-[180px] dropdown-list-btn rounded-2xl flex items-center justify-between gap-2">
                          <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap uppercase">
                            {statusDropdown.find((status) => status.id === row.status)?.label || ""}
                          </p>
                        </div>
                      </td>
                    )}
                    <td
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      <div className="hover:bg-gray-100 rounded-lg flex items-center justify-center">
                        <Link href={{ pathname: "/order/[order-id]", params: { "order-id": row._id } }}>
                          <ReceiptText />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center py-4 px-4 border-t-2 border-t-[var(--gray-100)] lg:px-5 xl:px-[24px]">
            <p className="text-[14px] lg:text-[16px]">
              {t("showing")} {pagination ? pagination.per_page * pagination.current_page : 0} to{" "}
              {pagination ? pagination.per_page * pagination.current_page + pagination.per_page : 0} of {pagination ? pagination.total : 0}{" "}
              {t("results")}
            </p>
            <ReactPaginate
              pageCount={Math.ceil(pagination ? +pagination.total / +pagination.per_page : 0)}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName="pagination-container flex justify-end gap-2"
              pageClassName="pagination-item"
              activeClassName="active"
              disabledClassName="disabled"
              previousLabel={<Image width={12} height={7} src={leftPaginationIcon} alt="previous page" />}
              nextLabel={<Image width={12} height={7} src={rightPaginationIcon} alt="next page" />}
              previousClassName="w-[28px] object-scale-down h-[28px] bg-[--light-gray-200] text-[var(--dark-gray)] rounded flex items-center justify-center"
              nextClassName="w-[28px] object-scale-down	h-[28px] bg-[--light-gray-200] text-[var(--dark-gray)] rounded flex items-center justify-center"
            />
          </div>
        </div>

        {/* Order Dialog */}
        {isOrderOpen.open && isOrderOpen?.order && (
          <OrderDialog onClose={() => setOrderOpen({ open: false, order: null })} data={isOrderOpen.order} />
        )}
      </div>
    </>
  );
};

export default AdminTable;
