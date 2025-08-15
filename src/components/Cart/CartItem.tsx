import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect } from "react";
import { removeProduct, updateCartCounter } from "@/lib/features/cart/cart.slice";
import { CartProduct } from "@/lib/features/cart/types";
import { useUpdateCartMutation } from "@/lib/features/cart/cart.api";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const CartItem = ({ data }: { data: CartProduct }) => {

  const local = useLocale();

  const dispatch = useAppDispatch();

  const [updateCartReq, updateCartRes] = useUpdateCartMutation();

  const { isLoggedIn } = useAppSelector((state) => state.user);

  const { counter, products } = useAppSelector((state) => state.cart);

  const t = useTranslations();

  const handleRemoveProduct = () => {
    if (isLoggedIn) {

      const currentProduct = products.find((product) => product._id === data._id);

      if (currentProduct && currentProduct?.quantity > 1) {
        updateCartReq({ product_id: data._id, is_remove: false, quantity: currentProduct.quantity - 1 });
      } else {        

        updateCartReq({ product_id: data._id, is_remove: true });
      }
    } else {
      dispatch(removeProduct({ ...(data.local_id ? { local_id: data.local_id } : { _id: data._id }) }));
    }
  };

  useEffect(() => {
    const { isLoading, isError, isSuccess, error } = updateCartRes;

    if (!isLoading && isSuccess) {
      dispatch(removeProduct({ _id: data._id }));
      dispatch(updateCartCounter(counter - 1));
      toast.success("Product removed from cart");
    }

    if (!isLoading && error) {
      toast.error("Failed to remove product from cart");
    }
  }, [updateCartRes, updateCartRes.isError, updateCartRes.isSuccess, updateCartRes.error, updateCartRes.isLoading]);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          height={200}
          width={200}
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/?file_key=${data.main_image}`}
          alt={data.name[local]}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="text-[18px]">
              <Link className="text-[var(--pink-500)] " href={{ pathname: "/product/[product-slug]", params: { "product-slug": data.slug[local] } }}>
                {data.name[local] || data.name.en}
              </Link>
            </h3>
            <p className="ml-4 whitespace-nowrap">
              {data.is_photo_book
                ? data.price + 10 * (data.selected_pages - 24)
                : (data.is_wall_painting && data.selected_frame)
                ? data.price + data.selected_frame.price
                : data.price * data.quantity}{" "}
              SEK
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">
            {data.is_photo_book
              ? `${data.selected_pages} pages`
              : data.is_wall_painting
              ? `${data?.selected_frame?.name[local] || "No Frame"}`
              : `${data.quantity} Qty`}
          </p>

          <div className="flex">
            <button onClick={() => handleRemoveProduct()} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
              {t("remove")}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
