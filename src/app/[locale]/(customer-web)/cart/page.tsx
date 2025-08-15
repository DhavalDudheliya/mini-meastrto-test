'use client';

import CartDetail from "@/components/Cart/CartDetail";
import CartItem from "@/components/Cart/CartItem";
import EmptyCart from "@/components/Cart/EmptyCart";
import { useAppSelector } from "@/lib/hooks";
import { useTranslations } from "next-intl";

const page = ( { params }: { params: { locale: string } }) => {
  const { products } = useAppSelector((state) => state.cart);

  const t = useTranslations();

  return (
    <div className="index-section">
      <div className="py-[45px] pb-0 px-4 md:py-[50px]">
        <div className="container">
          {products.length === 0 || !products.length ? (
            <EmptyCart />
          ) : (
            <>
              <h2 className="mb-4 lg:mb-6 xl:mb-7">{t("your_cart")}</h2>
              <div className="flex flex-wrap gap-5 md:gap-0">
                <div className="w-full md:w-[58.33%]">
                  <div className="pr-0 shadow-sm md:pr-3 xl:pr-9 2xl:pr-[30px] md:shadow-none">
                    <div className="flex flex-col gap-4 lg:gap-6 xl:gap-7">
                      <div className="h-[53vh] md:h-[75vh] overflow-hidden overflow-y-auto thin-scrollbar pr-4">
                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.map((product, i) => (
                                  <CartItem key={i} data={product} />
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[41.66%]">
                  <div className="h-full">
                    <CartDetail locale={params.locale} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
