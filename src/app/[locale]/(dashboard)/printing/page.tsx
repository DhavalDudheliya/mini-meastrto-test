"use client";

import { IPaginationMetadata } from "@/lib/features/types";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import rightPaginationIcon from "../../../../../public/images/right_pagination.svg";
import leftPaginationIcon from "../../../../../public/images/left_pagination.svg";
import { FileDown } from "lucide-react";
import { useGetAllOrdersQuery } from "@/lib/features/printing/printing.api";
import { IAllPrintingOrderList } from "@/lib/features/printing/types";
import { useRouter } from "@/i18n/routing";

const PrintingTable = ({
  data,
  pagination,
  onPageChange,
  onSearch,
}: {
  data: IAllPrintingOrderList[];
  pagination: IPaginationMetadata;
  onPageChange: (number: number) => void;
  onSearch: (searchTerm: string) => void;
}) => {
  const t = useTranslations();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    handlePageClick({ selected: 0 });
    setSearchTerm(value);
  };

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
  };

  const locale = useLocale();

  const router = useRouter();

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
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("name")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("pdf")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("product_type")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("printing_status")}</p>
                  </th>
                  <th className="py-3 px-4 text-left lg:px-5 xl:px-[24px]">
                    <p className="font-semibold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">{t("printing_date")}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    onClick={() => {
                      router.push({ pathname: "/submission", query: { order_id: row._id, product_id: row.products.product_id } });
                    }}
                    key={index}
                    className="border-t-2 border-[var(--gray-100)] hover:bg-gray-50 hover:cursor-pointer"
                  >
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row._id}</p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{moment(row.createdAt).format("DD MMM YYYY")}</p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">{row.products.name[locale]}</p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                        {row?.printings?.attachment ? (
                          <FileDown
                            onClick={() => {
                              window.open(`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${row.printings.attachment}`);
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                        {row.products.is_photo_book ? t("photo_book") : row.products.is_wall_painting ? t("wall_painting") : "Unknown"}
                      </p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                        {row?.printings?.status === "sent_to_printing" ? (
                          <div className="bg-green-100 h-auto text-center rounded-lg font-bold text-lg">{t("sent_to_printing")}</div>
                        ) : (
                          <div className="bg-red-100 h-auto text-center rounded-lg font-bold text-lg">{t("waiting_printing")}</div>
                        )}
                      </p>
                    </td>
                    <td className="px-5 py-2 xl:py-3">
                      <p className="font-semibold text-[14px] xl:text-[16px] whitespace-nowrap">
                        {moment(row?.printings?.createdAt).format("DD MMM YYYY")}
                      </p>
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
      </div>
    </>
  );
};

const page = () => {

  const [pagination, setPagination] = useState<IPaginationMetadata>({ current_page: 0, per_page: 20, total: 20 });

  const [currentPage, setCurrentPage] = useState<number>(0);

  const [orderId, setOrderId] = useState("");

  const { data } = useGetAllOrdersQuery({ current_page: currentPage, per_page: 20 });

  const [printingList, setPrintingList] = useState<IAllPrintingOrderList[]>([]);

  useEffect(() => {
    if (data?.data && data.data.orders.length > 0) {
      setPrintingList(data.data.orders);
      setPagination(data.data.metadata[0]);
    }

  }, [data?.data]);

  return (
    <>
      <PrintingTable onSearch={setOrderId} onPageChange={setCurrentPage} data={printingList} pagination={pagination} />
    </>
  );
};

export default page;
