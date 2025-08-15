import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "../features/auth/auth.api";
import { userApi } from "../features/user/user.api";
import { userReducer } from "../features/user/user.slice";
import { productApi } from "../features/product/product.api";
import { cartReducer } from "../features/cart/cart.slice";
import { cartApi } from "../features/cart/cart.api";
import { paymentApi } from "../features/payment/payment.api";
import { submissionApi } from "../features/submission/submission.api";
import { contactApi } from "../features/contact/contact.api";
import { printingApi } from "../features/printing/printing.api";
import { couponApi } from "../features/coupon/coupon.api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      [loginApi.reducerPath]: loginApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [submissionApi.reducerPath]: submissionApi.reducer,
      [contactApi.reducerPath]: contactApi.reducer,
      [printingApi.reducerPath]: printingApi.reducer,
      [couponApi.reducerPath]: couponApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userApi.middleware,
        loginApi.middleware,
        productApi.middleware,
        cartApi.middleware,
        paymentApi.middleware,
        submissionApi.middleware,
        contactApi.middleware,
        printingApi.middleware,
        couponApi.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
