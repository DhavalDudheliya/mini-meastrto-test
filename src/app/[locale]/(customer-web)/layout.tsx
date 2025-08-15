/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/user.slice";
import { useGetCartQuery } from "@/lib/features/cart/cart.api";
import { addUserProducts, initializeCart, setLoadingCart, updateCartCounter } from "@/lib/features/cart/cart.slice";
import { getLocalItem } from "@/utils/helper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { access_token } = useAppSelector((state) => state.user);

  const { counter } = useAppSelector((state) => state.cart);

  const [loggedInUser, setLoggedInUser] = useState(false);

  const { data, isLoading, isSuccess, refetch } = useGetCartQuery({}, { skip: !(loggedInUser && access_token) });

  useEffect(() => {
    // Retrieve the token from localStorage or cookies
    const token = Cookie.get("token");

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken: any = jwtDecode(token);

        // Assuming the token contains 'name' and 'picture'
        const { email, profile_picture, name, role } = decodedToken;

        // Set values in localStorage if they don't exist
        if (!localStorage.getItem("userName")) {
          localStorage.setItem("userName", name);
        }

        if (!localStorage.getItem("userPicture")) {
          localStorage.setItem("userPicture", profile_picture);
        }

        if (!localStorage.getItem("userEmail")) {
          localStorage.setItem("userEmail", email);
        }

        dispatch(setUser({ name: name, email: email, profile_picture: profile_picture, access_token: token, role: role || "customer" }));

        // Update state
        setLoggedInUser(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // Cart initialization
  useEffect(() => {
    if (loggedInUser && access_token) {
      if (isSuccess && !isLoading) {
        const cart = data.data;

        if (cart[0]?.products.length > 0) {
          dispatch(initializeCart(cart[0].products));
        } else {
          dispatch(initializeCart([]));
        }
        dispatch(setLoadingCart(false));
      }
    } else {
      const products = getLocalItem("cart");
      if (products && products.length > 0) {
        dispatch(initializeCart(products));
        dispatch(updateCartCounter(products.length));
      }
    }
  }, [loggedInUser, isSuccess, isLoading, data, access_token]);

  useEffect(() => {
    if (loggedInUser && access_token) {
      refetch();
    }
  }, [counter]);

  const ReactQueryProvider = require("./react-query-provider").default;
  return (
    <ReactQueryProvider>
      <Header showUser={loggedInUser} />
      {children}
      <Footer />
    </ReactQueryProvider>
  );
}
