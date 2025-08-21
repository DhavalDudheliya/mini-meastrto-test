"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CouponTable from "@/components/Dashboard/Admin/Coupon/CouponTable";
import { IPaginationMetadata } from "@/lib/features/types";
import {  useGetCouponsQuery } from "@/lib/features/coupon/coupon.api";
import { Coupon } from "@/lib/features/coupon/types";
import CouponDialogForm from "@/components/Coupon/CouponFormDialog";

const CouponPage = ({ params }: { params: { locale: string } }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");

   const locale = params.locale;
  // RTK Query hooks
  const { data: couponsResponse, isLoading, refetch } = useGetCouponsQuery({ current_page: currentPage, per_page: 5, code: searchInput });
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const t = useTranslations();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [pagination, setPagination] = useState<IPaginationMetadata>({ current_page: 0, per_page: 5, total: 20 });

  useEffect(() => {
    if (couponsResponse && couponsResponse.data) {
      const { coupons, metadata } = couponsResponse.data;
      setCoupons(coupons);
      setPagination(metadata[0]);
    }
  }, [couponsResponse]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  // Handle search by coupon code with debounce (500ms)
  const handleSearch = debounce((code: string) => {
    setSearchInput(code);
  }, 500);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{t("coupons")}</h1>
        <div>
          <CouponDialogForm open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} refetch={refetch} locale={locale} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <CouponTable data={coupons} onPageChange={setCurrentPage} pagination={pagination} onSearch={handleSearch} refetch={refetch} locale={locale} />
      )}

      {/* {isCreateModalOpen && <CouponDialogForm open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} refetch={refetch} />} */}
      {/* {isCreateModalOpen && <CreateCouponModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} refetch={refetch} />} */}
    </div>
  );
};

function debounce(func: (code: string) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: [string]) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export default CouponPage;

