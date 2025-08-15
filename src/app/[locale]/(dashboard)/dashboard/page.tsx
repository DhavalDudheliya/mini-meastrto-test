"use client";

import AdminTable from "@/components/Dashboard/Admin/Order/AdminTable";
import { useGetOrderMutation } from "@/lib/features/order/order.api";
import { Order } from "@/lib/features/order/types";
import { IPaginationMetadata } from "@/lib/features/types";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [getOrderReq, getOrderRes] = useGetOrderMutation();

  const [orderId, setOrderId] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<IPaginationMetadata>({ current_page: 0, per_page: 20, total: 20 });
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    getOrderReq({ order_id: orderId, current_page: currentPage });
  }, [orderId, currentPage]);

  // Refetch orders every 10 seconds only if user is active on this screen (tab)
  useEffect(() => {

    const interval = setInterval(() => {

      getOrderReq({ order_id: orderId, current_page: currentPage });

    }, 10000);

    return () => clearInterval(interval);

  }, [orderId, currentPage]);

  useEffect(() => {
    if (getOrderRes.isSuccess && getOrderRes.data.data) {
      const orders = getOrderRes.data.data;

      setOrders(orders.orders);
      setPagination(orders.metadata[0]);
    }
  }, [getOrderRes]);
  return <AdminTable onSearch={setOrderId} onPageChange={setCurrentPage} pagination={pagination} data={orders} />;
};

export default Page;
