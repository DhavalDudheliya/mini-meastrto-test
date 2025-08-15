import React from "react";
import CheckoutProduct from "./CheckoutProduct";

const data = [
  {
    product_image: "/images/product_1.png",
    product_name: "Digital Pdf",
    price: "$20",
  }
];

const CheckoutDetails = () => {
  return (
    <div className="h-full mt-[20px] lg:mt-0">
      <div className="h-full lg:ml-6 xl:ml-7 2xl:ml-[60px] ">
        <div className="h-full bg-[var(--light-gray)] rounded-md lg:rounded-2xl 2xl:rounded-[30px] p-3 sm:p-4 md:p-5">
          <div className="h-full p-3 sm:p-4 md:p-5 border-2 border-[var(--light-gray-200)] rounded-md lg:rounded-2xl 2xl:rounded-[30px]">
            <div className="h-full flex flex-col gap-4 justify-between">
              <div className="lg:h-[70%] overflow-hidden overflow-y-auto thin-scrollbar pr-1">
                <div className="h-full flex flex-col gap-2">
                  {data.map((data, i) => (
                    <CheckoutProduct key={i} data={data} />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                  <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-[30px]">
                    <div>
                      <h6>The Total Amount Of</h6>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2 border-b-2 border-b-[var(--light-gray-200)] pb-2 sm:pb-4 sm:gap-3 md:gap-4  lg:gap-5 lg:pb-5 ">
                        <div className="flex gap-2  justify-between  sm:gap-4 ">
                          <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                            Temporary Amount
                          </p>
                          <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                            $60
                          </p>
                        </div>
                        <div className="flex gap-2  justify-between  sm:gap-4">
                          <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                            Temporary Amount
                          </p>
                          <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                            $60
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2  justify-between  sm:gap-4">
                      <p className="font-bold text-[var(--pink-500)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                        Temporary Amount
                      </p>
                      <p className="font-bold text-[var(--pink-500)] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                        $60
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
