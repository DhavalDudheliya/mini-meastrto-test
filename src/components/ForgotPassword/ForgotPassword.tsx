"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Password from "../ui/Password";
import { useRequestPwdOtpMutation, useResetPasswordMutation, useVerifyPwdOtpMutation } from "@/lib/features/user/user.api";
import toast from "react-hot-toast";
import { isErrorWithMessage } from "@/utils/helper";
import Button from "../ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import { Link, useRouter } from "@/i18n/routing";

const ForgotPassword = () => {
  const router = useRouter();

  const [requestOtp, otpResponse] = useRequestPwdOtpMutation();

  const [verifyOtp, verifyOtpResponse] = useVerifyPwdOtpMutation();

  const [resetPassword, resetPasswordResponse] = useResetPasswordMutation();

  const [isOtpRequested, setIsOtpRequested] = React.useState(false);

  const [isOtpVerified, setIsOtpVerified] = React.useState(false);

  const [otpToken, setOtpToken] = React.useState("");

  const [otp, setOtp] = React.useState<string>("");

  const requestForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values) => {
      requestOtp(values);
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      password: "",
      "confirm-password": "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().min(8).required("Password is required"),
      "confirm-password": Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      resetPassword({ email: requestForm.values.email, password: values.password, token: otpToken });
    },
  });

  const handleOtpVerify = (event: React.FormEvent) => {
    event.preventDefault();
    verifyOtp({ email: requestForm.values.email, otp: +otp });
  };

  const step1 = (
    <form onSubmit={requestForm.handleSubmit}>
      <div className="flex flex-col gap-4 2xl:gap-[30px]">
        <div className="flex flex-col  gap-4 2xl:gap-[25px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              Email
            </label>
            <input
              className={`border-2 ${requestForm.touched.email && requestForm.errors.email ? "border-danger" : ""}`}
              value={requestForm.values.email}
              onChange={requestForm.handleChange}
              onBlur={requestForm.handleBlur}
              type="email"
              id="email"
              name="email"
              required
            />
            {requestForm.touched.email && requestForm.errors.email ? <span className="danger">{requestForm.errors.email}</span> : null}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <Button isLoading={otpResponse.isLoading} type="submit">
            Send
          </Button>
        </div>
      </div>
    </form>
  );

  const step2 = (
    <form onSubmit={handleOtpVerify}>
      <div className="flex flex-col gap-4 2xl:gap-[30px]">
        <div className="flex flex-col  gap-4 2xl:gap-[25px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="otp" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              OTP
            </label>
            <div className="flex gap-1">
              <OTPInput
                containerStyle="flex gap-1"
                inputType="number"
                inputStyle="w-[35px] h-[35px] p-1 px-[10.5px] lg:w-[50px] lg:h-[50px] lg:px-[17.5px]"
                skipDefaultStyles={true}
                value={otp}
                onChange={(v) => {
                  setOtp(v);
                }}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <Button type="submit">Verify</Button>
        </div>
      </div>
    </form>
  );

  const step3 = (
    <form onSubmit={passwordForm.handleSubmit}>
      <div className="flex flex-col gap-4 2xl:gap-[30px]">
        <div className="flex flex-col  gap-4 2xl:gap-[25px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              Password
            </label>
            <Password
              hasError={passwordForm.touched.password && !!passwordForm.errors.password}
              className={`${passwordForm.touched.password && passwordForm.errors.password ? "border-danger" : ""}`}
              name="password"
              id="password"
              required={true}
              onBlur={passwordForm.handleBlur}
              onChange={passwordForm.handleChange}
            />
            {passwordForm.touched.password && passwordForm.errors.password ? <span className="danger">{passwordForm.errors.password}</span> : null}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              Confirm Password
            </label>
            <Password
              hasError={passwordForm.touched["confirm-password"] && !!passwordForm.errors["confirm-password"]}
              className={`${passwordForm.touched["confirm-password"] && passwordForm.errors["confirm-password"] ? "border-danger" : ""}`}
              name="confirm-password"
              id="confirm-password"
              required={true}
              onBlur={passwordForm.handleBlur}
              onChange={passwordForm.handleChange}
            />
            {passwordForm.touched["confirm-password"] && passwordForm.errors["confirm-password"] ? (
              <span className="danger">{passwordForm.errors["confirm-password"]}</span>
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <Button type="submit" isLoading={resetPasswordResponse.isLoading}>
            Reset Password
          </Button>
        </div>
      </div>
    </form>
  );

  useEffect(() => {
    if (otpResponse.isError) {
      if (isErrorWithMessage(otpResponse.error)) {
        const message = "error" in otpResponse.error ? otpResponse.error.error : otpResponse.error.data.message;
        toast.error(message);
        otpResponse.reset();
      }
    }

    if (otpResponse.isSuccess) {
      toast.success("OTP Requested. Please check your email");
      otpResponse.reset();
      setIsOtpRequested(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpResponse]);

  useEffect(() => {
    if (verifyOtpResponse.isError) {
      if (isErrorWithMessage(verifyOtpResponse.error)) {
        const message = "error" in verifyOtpResponse.error ? verifyOtpResponse.error.error : verifyOtpResponse.error.data.message;
        toast.error(message);
        verifyOtpResponse.reset();
      }
    }

    if (verifyOtpResponse.isSuccess) {
      toast.success("OTP Verified");
      verifyOtpResponse.reset();
      setOtpToken(verifyOtpResponse.data.data.token);
      setIsOtpVerified(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyOtpResponse]);

  useEffect(() => {
    if (resetPasswordResponse.isError) {
      if (isErrorWithMessage(resetPasswordResponse.error)) {
        const message = "error" in resetPasswordResponse.error ? resetPasswordResponse.error.error : resetPasswordResponse.error.data.message;
        toast.error(message);
        resetPasswordResponse.reset();
      }
    }

    if (resetPasswordResponse.isSuccess) {
      toast.success("Password Updated");
      resetPasswordResponse.reset();
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordResponse]);

  return (
    <div className="w-full h-full overflow-auto lg:h-[100vh] lg:overflow-hidden">
      <div className="flex flex-wrap w-full h-full">
        <div className="w-full lg:w-[43.75%]">
          <div className="w-full h-full">
            <Image
              src="/images/login_left_img.png"
              width={960}
              height={951}
              alt="kids-painting-image"
              className="w-full h-[60vh] object-cover lg:h-screen"
            />
          </div>
        </div>
        <div className="w-full lg:w-[56.25%] h-full relative">
        <Link href={'/'}>
            <Image
              src="/images/logo.svg"
              alt="Custom photo books made from children’s hand-drawn art"
              width={210}
              height={70}
              className="fixed w-[100px] top-4 right-4 sm:w-[150px] sm:right-5 sm:top-5 xl:top-10 xl:right-10 xl:w-[210px]"
            />
          </Link>
          <Image
            src="/images/hiw_splash.png"
            width={860}
            height={494}
            alt="splash_left"
            className="absolute max-w-[50%] sm:max-w-[36.2%] left-0 top-0 "
          />
          <Image
            src="/images/hiw_splash.png"
            width={860}
            height={494}
            alt="splash_left"
            className="absolute hidden max-w-[50%] lg:block sm:max-w-[36.2%] -scale-100 right-0 bottom-0 "
          />
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="thin-scrollbar w-full sm:max-w-[90%] xl:max-w-[78.66%] lg:overflow-hidden lg:overflow-y-auto lg:pr-1">
              <div className="flex relative z-[9] flex-col gap-4 lg:gap-5 xl:gap-[30px] 2xl:gap-[50px]">
                <div className="flex flex-col gap-2">
                  <h3>Forgot password</h3>
                  <p className="text-[var(--dark-gray)] text-[14px] md:text-[16px] lg:text-[18px]">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[var(--dark-gray)] underline">
                      Back to login
                    </Link>
                  </p>
                </div>
                <div className="bg-light">
                  <div className="flex flex-col gap-4 2xl:gap-[30px]">
                    {isOtpRequested ? (isOtpVerified ? step3 : step2) : step1}
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

export default ForgotPassword;
