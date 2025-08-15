"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCreateSessionMutation } from "@/lib/features/payment/payment.api";

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/lib/hooks";
import { ISessionRequest } from "@/lib/features/payment/types";
import Loading from "@/app/[locale]/loading";
import LoginRequired from "./LoginRequired";

import './styles.css';

const CheckoutContainer = () => {
  const [sessionReq, {}] = useCreateSessionMutation();

  const [clientSecret, setClientSecret] = React.useState<string>("");

  const { products, coupon } = useAppSelector((state) => state.cart);

  const { isLoggedIn } = useAppSelector((state) => state.user);

  const checkoutProducts: ISessionRequest[] = products.map((product) => {
    return {
      product_id: product.product_id,

      quantity: product.quantity,

      selected_pages: product.selected_pages,

      selected_frame: product.selected_frame,
    };
  });

  useEffect(() => {
    if (!clientSecret && checkoutProducts.length > 0) {

      // Create a session payload that includes coupon information if it exists
      const sessionPayload = {
        session: checkoutProducts,
        // Include coupon information if a coupon is applied
        coupon_code: coupon?.isApplied ? coupon.code : null
      };

      // Create a Checkout Session
      sessionReq({ session: sessionPayload })
        .unwrap()
        .then(({ data }) => setClientSecret(data.client_secret));
    }
  }, [products]);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_live_51PotygP1sgj8xklaJhE6hGIXwLtxhk2ChmN8Xm0Gcsf1Wg8psvvUipXTEXwliggxkIO1InbNskwZ2Cp3hmmdNg2f00SbVvwm2W");
  return (
    <div className="px-4 my-[70px] flex w-full items-center justify-around min-h-[710px] stripe-class">
      {!isLoggedIn ? (
        <LoginRequired />
      ) : (
        <>
          {clientSecret ? (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret: clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <Loading />
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutContainer;
