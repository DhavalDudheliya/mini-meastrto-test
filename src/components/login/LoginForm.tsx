"use client";

import React, { useCallback, useEffect, useState } from "react";
import Password from "../ui/Password";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation, useSocialLoginMutation } from "@/lib/features/auth/auth.api";
import { isErrorWithMessage, setCookie } from "@/utils/helper";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Image from "next/image";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeCart } from "@/lib/features/cart/cart.slice";
import { useAddToCartMutation, useGetCartQuery } from "@/lib/features/cart/cart.api";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const search = useSearchParams();

  const from = search.get("from") || "/";

  const t = useTranslations();

  const [addToCartReq, {}] = useAddToCartMutation();

  const { refetch } = useGetCartQuery({});

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.cart);

  const router = useRouter();

  const [loginRequest, { error, isError, reset, isSuccess, data, isLoading }] = useLoginMutation();

  const [socialLogin, socialLoginResponse] = useSocialLoginMutation();

  const handleSocialLogin = (response: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    socialLogin({ access_token: response.access_token });
  };

  const login = useGoogleLogin({ flow: "implicit", onSuccess: handleSocialLogin, prompt: "consent" });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(t("email_required")),
    password: Yup.string().min(8).required(t("password_required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      loginRequest(values);
    },
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = formik;

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [role, setRole] = useState("");

  const syncCart = useCallback(() => {
    if (products.length > 0) {
      const addToCartPromise = products.map(async (product) => {
        await addToCartReq({
          product_id: product.product_id,
          quantity: product.quantity,
          selected_pages: product.selected_pages,
          selected_frame: product.selected_frame,
          is_sync: true,
        }).unwrap();
      });

      Promise.all(addToCartPromise).then(() => {
        refetch().then(({ data, isSuccess }) => {
          if (data && isSuccess && data.data[0]?.products) {
            const products = data.data[0].products;

            dispatch(initializeCart(products));
            setLoginSuccess(true);
          }
        });
      });
    } else {
      setLoginSuccess(true);
    }
  }, [isSuccess, socialLoginResponse.isSuccess]);

  useEffect(() => {
    if (isError) {
      if (isErrorWithMessage(error)) {
        const message = "error" in error ? error.error : error.data.message;
        const status = "error" in error ? error.status : error.data.status;
        if (status === 2) {
          router.push({ pathname: "/verify-otp", query: { email: values.email } });
        }
        toast.error(message);
        reset();
      }
    }

    if (isSuccess) {
      toast.success(t("login_success"));
      reset();
      setCookie("token", data.data.token, 30);
      syncCart();
      setRole(data.data.role);
    }
  }, [error, isError, reset, data, isSuccess]);

  useEffect(() => {
    if (socialLoginResponse.isError) {
      if (isErrorWithMessage(socialLoginResponse.error)) {
        const message = "error" in socialLoginResponse.error ? socialLoginResponse.error.error : socialLoginResponse.error.data.message;
        toast.error(message);
        socialLoginResponse.reset();
      }
    }

    if (socialLoginResponse.isSuccess) {
      toast.success(t("login_success"));
      socialLoginResponse.reset();
      setCookie("token", socialLoginResponse.data.data.token, 30);
      syncCart();
      setRole(socialLoginResponse.data.data.role);
    }
  }, [socialLoginResponse]);

  useEffect(() => {
    if (loginSuccess) {
      if (role == "admin") {
        router.push("/dashboard");
      } else {
        router.push(from as "/" | "/checkout");
      }
      
    }
  }, [loginSuccess]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 2xl:gap-[30px]">
        <div className="flex flex-col  gap-4 2xl:gap-[25px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              {t("email")}
            </label>
            <input
              className={`border-2 ${touched.email && errors.email ? "border-danger" : ""}`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name="email"
              required
            />
            {touched.email && errors.email ? <span className="danger">{errors.email}</span> : null}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              {t("password")}
            </label>
            <Password
              hasError={touched.password && !!errors.password}
              className={`${touched.password && errors.password ? "border-danger" : ""}`}
              name="password"
              id="password"
              required={true}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password ? <span className="danger">{errors.password}</span> : null}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <Button type="submit" isLoading={isLoading}>
            {t("login")}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 pb-4 pt-4">
          <div className="bg-[var(--dark-gray)] w-[70px] h-[1px]"></div>
          <p className="text-[14px] text-[var(--dark-gray)]">{t("or_sign_in_with")}</p>
          <div className="bg-[var(--dark-gray)] w-[70px] h-[1px]"></div>
        </div>
        <Button onClick={login} isLoading={socialLoginResponse.isLoading} type="button" variant="outline">
          <Image src="/images/google.png" alt="google-icon" width={100} height={25} className="w-[80px] h-[20px] object-contain" />
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
