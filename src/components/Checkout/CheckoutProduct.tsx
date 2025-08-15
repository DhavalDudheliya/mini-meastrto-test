import Image from "next/image";
import React from "react";

type CheckoutProductData = {
  product_image: string;
  product_name: string;
  price: string;
};

const CheckoutProduct = ({ data }: { data: CheckoutProductData }) => {
  return (
    <div className="w-full h-auto flex-shrink-0 p-3 bg-white rounded-[10px] border-2 border-[var(--light-gray-200)]">
      <div className="flex items-center gap-4 xl:gap-5">
        <div className="rounded-[10px] overflow-hidden w-[100px] h-[100px] lg:w-[120px] lg:h-[120px]">
          <Image
            alt="product_image"
            src={data.product_image}
            width={140}
            height={140}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h6 className="text-[var(--pink-500)]">{data.product_name}</h6>
          <p className="text-[14px] font-bold md:text-[18px] lg:text-[20px]">
            {data.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
