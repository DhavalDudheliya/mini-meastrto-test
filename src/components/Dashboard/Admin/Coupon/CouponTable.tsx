import Image from "next/image";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import rightPaginationIcon from "../../../../../public/images/right_pagination.svg";
import leftPaginationIcon from "../../../../../public/images/left_pagination.svg";
import { IPaginationMetadata } from "@/lib/features/types";
import { useAppSelector } from "@/lib/hooks";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { COUPON_PRODUCT_RESTRICTIONS, DISCOUNT_TYPES } from "@/lib/constants";
import { Copy, Trash2 } from "lucide-react";
import { useDeleteCouponMutation, useUpdateCouponStatusMutation } from "@/lib/features/coupon/coupon.api";
import Button from "@/components/ui/Button";
import { Coupon } from "@/lib/features/coupon/types";
import CouponEditDialogForm from "@/components/Coupon/CouponEditFormDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import moment from "moment";

const ConfirmationDialog = ({ data, onClose, refetch }: { data: Coupon; onClose: () => void; refetch: () => void }) => {
  const { _id } = data;
  const [id, setId] = useState<string>(_id);
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const t = useTranslations();

  const handleDeleteCoupon = async () => {
    try {
      await deleteCoupon(id).unwrap();
      setId("");
      toast.success(t("coupon_deleted_successfully"));
      onClose();
      refetch();

    } catch (error) {
      console.error("Failed to delete coupon:", error);
      toast.error(t("coupon_delete_failed"));
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-300`}>
      <div className={`w-full max-w-lg transform rounded-xl bg-white shadow-2xl transition-all duration-300`}>
        <div className="flex items-center justify-between border-b-2 border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">{t("delete_coupon")}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <Image src="/images/dialog_close.svg" alt="Close" width={20} height={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-700">{t("are_you_sure_you_want_to_delete_this_coupon")}</p>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="button" variant="filled" onClick={handleDeleteCoupon} isLoading={isDeleting}>
              {t("delete")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CouponTable = ({
  data,
  pagination,
  onPageChange,
  onSearch,
  refetch,
  locale
}: {
  data: Coupon[];
  pagination: IPaginationMetadata;
  onPageChange: (number: number) => void;
  onSearch: (searchTerm: string) => void;
  refetch: () => void;
  locale: string
}) => {
  const t = useTranslations();

  const [searchTerm, setSearchTerm] = useState("");

  const [isCouponOpen, setCouponOpen] = useState<boolean>(false);
  const [couponData, setCouponData] = useState<Coupon | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState<{ open: boolean; coupon: Coupon | null }>({ open: false, coupon: null });

  const [ updateCouponStatus, { isLoading: isUpdating } ] = useUpdateCouponStatusMutation();

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
  };

  const handleRowClick = (data: Coupon) => {
    setCouponOpen(true);
    setCouponData(data);
  };

  const handleSearch = (value: string) => {
    onSearch(value);
    handlePageClick({ selected: 0 });
    setSearchTerm(value);
  };

  const { role } = useAppSelector((state) => state.user);

  const handleSelectChange = async (row: Coupon) => {
    try {
      await updateCouponStatus({ id: row._id, status: !row.is_active }).unwrap();

      toast.success(t("status_updated_successfully"));
      refetch();
    } catch (error) {
      console.error("Failed to update coupon:", error);
      toast.error(t("coupon_update_failed"));
    };
  };

  const onClose = () => {
    setCouponOpen(false);
    setCouponData(null);
  }

  const handleCopyClick = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(t("coupon_code_copied"));
  }

  const formattedText = (text: string) => {
      return text.split('_').join(' ');
  }

  return (
    <>
      <div className="h-full">
        <div className="border-2 h-full overflow-hidden border-[var(--gray-100)] rounded-md lg:rounded-2xl xl:rounded-3xl 2xl:rounded-[30px]">
          <div className="py-3 border-b-2 border-b-[var(--gray-100)] w-full px-4 ext-left lg:px-5 xl:py-4 xl:px-[24px]">
            <input
              type="search"
              placeholder={t("search_by_coupon_code")}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full max-w-[626px]"
            />
          </div>
          <div className="h-[calc(100%_-_120px)] xl:h-[calc(100%_-_136px)] overflow-auto">
            <table className="w-full admin-table">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b-2 border-[var(--gray-100)]">
                  <th className="py-3 px-4 text-left lg:px-5">
                    <p className="font-semibold text-[16px]">{t("coupon_code")}</p>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px">{t("discount")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5 w-[100px]">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("status")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("valid_from")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("valid_until")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("usage_count")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("usage_limit")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("minimum_order")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("restrictions")}</p>
                    </div>
                  </th>
                  <th className="py-3 px-4 lg:px-5">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold text-[16px]">{t("action")}</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr onClick={() => handleRowClick(row)} key={index} className="border-t-2 border-[var(--gray-100)] hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-2 xl:py-3" onClick={(event) => event.stopPropagation()}>
                      <div className="flex items-center justify-start gap-2">
                        <p className="font-semibold text-[14px] whitespace-nowrap">{row.code}</p>
                        <Copy size={16} className="cursor-pointer" onClick={(event) => handleCopyClick(row.code)} />
                      </div>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      <p className="font-semibold text-[14px] whitespace-nowrap">
                        {row.discount_type === DISCOUNT_TYPES.PERCENTAGE ? `${row.discount_value}%` : `${row.discount_value} SEK`}
                      </p>
                    </td>
                    <td
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      className="px-6 py-2 flex items-center justify-center w-[140px]"
                    >
                      <Select
                        value={row.is_active ? "active" : "inactive"}
                        onValueChange={async (value) => {
                          const newStatus = value === "active";
                          if (newStatus !== row.is_active) {
                            try {
                              await updateCouponStatus({ id: row._id, status: newStatus }).unwrap();
                              toast.success(t("status_updated_successfully"));
                              refetch();
                            } catch (error) {
                              console.error("Failed to update coupon:", error);
                              toast.error(t("coupon_update_failed"));
                            }
                          }
                        }}
                      >
                        <SelectTrigger className={`w-[120px] font-semibold ${row.is_active ? "text-green-500" : "text-red-500"}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">{t("active")}</SelectItem>
                          <SelectItem value="inactive">{t("inactive")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      <p className="font-semibold text-[14px] whitespace-nowrap">
                        {row.valid_from ? moment(row.valid_from).format("YYYY-MM-DD") : "-"}
                      </p>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      <p className="font-semibold text-[14px] whitespace-nowrap">
                        {row.valid_until ? moment(row.valid_until).format("YYYY-MM-DD") : "-"}
                      </p>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      <p className="font-semibold text-[14px] whitespace-nowrap">{row.usage_count}</p>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      <p className="font-semibold text-[14px] whitespace-nowrap">{row.max_usage ? row.max_usage : "-"}</p>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      <p className="font-semibold text-[14px] whitespace-nowrap">
                        {row.minimum_order_value ? row.minimum_order_value : "-"} {row.minimum_order_value ? "SEK" : ""}
                      </p>
                    </td>
                    <td className="px-6 py-2 xl:py-3 text-center">
                      {row.product_restriction === COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_PRODUCTS && (
                        <HoverCard>
                          <HoverCardTrigger className="text-[14px] font-semibold">
                            {row.product_restriction ? formattedText(row.product_restriction) : "-"}
                          </HoverCardTrigger>
                          <HoverCardContent className="w-auto" side="top">
                            {row.applicable_products && row.applicable_products.length > 0 ? (
                              <ul className="flex flex-col gap-1">
                                {row.applicable_products.map((product: any, index: number) => (
                                  <li key={index} className="font-semibold text-[14px] whitespace-nowrap">
                                    {product.name[locale]}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="font-semibold text-[14px] whitespace-nowrap">-</p>
                            )}
                          </HoverCardContent>
                        </HoverCard>
                      )}
                      {row.product_restriction === COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_CATEGORIES && (
                        <HoverCard>
                          <HoverCardTrigger className="text-[14px] font-semibold">
                            {row.product_restriction ? formattedText(row.product_restriction) : "-"}
                          </HoverCardTrigger>
                          <HoverCardContent className="w-auto" side="top">
                            {row.applicable_categories && row.applicable_categories.length > 0 ? (
                              <ul className="flex flex-col gap-1">
                                {row.applicable_categories.map((category: any, index: number) => (
                                  <li key={index} className="font-semibold text-[14px] whitespace-nowrap">
                                    {category.name[locale]}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[14px] whitespace-nowrap">-</p>
                            )}
                          </HoverCardContent>
                        </HoverCard>
                      )}
                      {row.product_restriction === COUPON_PRODUCT_RESTRICTIONS.ALL_PRODUCTS && (
                        <p className="font-semibold text-[14px] whitespace-nowrap">{formattedText(row.product_restriction)}</p>
                      )}
                      <p className="font-semibold text-[14px] whitespace-nowrap"></p>
                    </td>
                    <td className="px-6 py-2 display flex items-center justify-center">
                      {/* <button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setCouponOpen({ open: true, coupon: row });
                        }}
                        className="mr-4"
                      >
                        <Pencil className="w-5 h-5" />
                      </button> */}
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setConfirmationOpen({ open: true, coupon: row });
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center py-4 px-4 border-t-2 border-t-[var(--gray-100)] lg:px-5 xl:px-[24px]">
            <p className="text-[14px] lg:text-[16px]">
              {t("showing")} {pagination ? pagination.per_page * pagination.current_page + 1 : 0} to{" "}
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

        {/* Coupon Dialog */}
        {isCouponOpen && couponData && (
          <CouponEditDialogForm
            onOpenChange={setCouponOpen}
            open={isCouponOpen}
            couponData={couponData}
            refetch={refetch}
            locale={locale}
            onClose={onClose}
          />
        )}

        {/* Confirmation Dialog */}
        {isConfirmationOpen?.open && isConfirmationOpen?.coupon && (
          <ConfirmationDialog onClose={() => setConfirmationOpen({ open: false, coupon: null })} data={isConfirmationOpen.coupon} refetch={refetch} />
        )}
      </div>
    </>
  );
};

export default CouponTable;
