"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Password from "../ui/Password";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "@/lib/features/user/user.api";
import { isErrorWithMessage, setCookie } from "@/utils/helper";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useSocialLoginMutation } from "@/lib/features/auth/auth.api";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

const SignUpForm = () => {
  const router = useRouter();

  const [socialLogin, socialLoginResponse] = useSocialLoginMutation();

  const handleSocialLogin = (response: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
    socialLogin({ access_token: response.access_token });
  };

  const login = useGoogleLogin({ flow: "implicit", onSuccess: handleSocialLogin, prompt: "consent" });

  const [signUpRequest, { isError, isLoading, isSuccess, reset, data, error }] = useSignupMutation();

  const [uploadedImage, setUploadedImage] = useState<{ file_url: string; file: File } | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage({ file_url: imageUrl, file });
    }
  };

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      signUpRequest({ ...values, profile_picture: uploadedImage?.file });
    },
  });

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } = formik;

  useEffect(() => {
    if (isError) {
      if (isErrorWithMessage(error)) {
        const message = "error" in error ? error.error : error.data.message;
        toast.error(message);
        reset();
      }
    }

    if (isSuccess) {
      toast.success(t("account_created_verify_email"));
      reset();
      router.push({ pathname: "/verify-otp", query: { email: values.email } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (socialLoginResponse.data?.data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }

    }
  }, [socialLoginResponse, router]);

  const t = useTranslations();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 2xl:gap-[30px]">
        <div className="flex flex-col  gap-4 2xl:gap-[25px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              {t('name')}
            </label>
            <input
              className={`border-2 ${touched.name && errors.name ? "border-danger" : ""}`}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="name"
              id="name"
              name="name"
              required
            />
            {touched.name && errors.name ? <span className="danger">{errors.name}</span> : null}
          </div>
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
          <div className="w-full">
            <div className="flex gap-4 flex-wrap lg:gap-5 lg:flex-nowrap ">
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label htmlFor="password" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Password
                </label>
                <Password
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasError={touched.password && !!errors.password}
                  className={`${touched.password && errors.password ? "border-danger" : ""}`}
                  name="password"
                  id="password"
                  required={true}
                />
                {touched.password && errors.password ? <span className="danger">{errors.password}</span> : null}
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-1">
                <label htmlFor="confirm-confirm_password" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                  Confirm Password
                </label>
                <Password
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasError={touched.confirm_password && !!errors.confirm_password}
                  className={`${touched.confirm_password && errors.confirm_password ? "border-danger" : ""}`}
                  name="confirm_password"
                  id="confirm_password"
                  required={true}
                />
                {touched.confirm_password && errors.confirm_password ? <span className="danger">{errors.confirm_password}</span> : null}
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer flex-col gap-1 w-fit">
            <label htmlFor="profile_picture" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              Upload Profile Picture
            </label>
            <div className="relative border-2 overflow-hidden border-[var(--gray)] w-[205px] h-[100px] rounded-[16px] md:rounded-[20px] lg:rounded-[30px]">
              <input
                type="file"
                id="profile_picture"
                name="profile_picture"
                multiple={false}
                onChange={handleImageUpload}
                className="absolute cursor-pointer z-10 opacity-0 w-full h-full top-0 left-0 rounded-[16px] md:rounded-[20px] lg:rounded-[30px]"
              />
              <Image
                src="/images/upload.svg"
                alt="upload-icon"
                width={50}
                height={50}
                className="absolute cursor-pointer top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              />
              {uploadedImage && (
                <Image
                  alt="uploaded-image"
                  src={uploadedImage?.file_url || ""}
                  width={205}
                  height={99}
                  className="absolute w-full h-full top-[0] left-[0] object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-col gap-4 lg:gap-[25px]">
            <Button type="submit" isLoading={isLoading}>
              Create Account
            </Button>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 pb-4 pt-4">
              <div className="bg-[var(--dark-gray)] w-[70px] h-[1px]"></div>
              <p className="text-[14px] text-[var(--dark-gray)]">Or Sign in With</p>
              <div className="bg-[var(--dark-gray)] w-[70px] h-[1px]"></div>
            </div>
            <Button isLoading={socialLoginResponse.isLoading} onClick={login} type="button" variant="outline">
              <Image src="/images/google.png" alt="google-icon" width={100} height={25} className="w-[80px] h-[20px] object-contain" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
