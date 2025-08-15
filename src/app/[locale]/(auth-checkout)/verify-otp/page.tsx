"use client";

import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import { useRequestSignUpOtpMutation, useVerifySignupMutation } from "@/lib/features/user/user.api";
import toast from "react-hot-toast";
import { isErrorWithMessage } from "@/utils/helper";
import OTPInput from "react-otp-input";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const t = useTranslations();

  const [requestVerifyOtp, { isError, isLoading, isSuccess, reset, data, error }] = useVerifySignupMutation();

  const [requestNewOtp, otpRequestResponse] = useRequestSignUpOtpMutation();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = React.useState<string>("");

  useEffect(() => {
    if (isError) {
      if (isErrorWithMessage(error)) {
        const message = "error" in error ? error.error : error.data.message;
        toast.error(message);
        reset();
      }
    }

    if (isSuccess) {
      toast.success(t("account_verified_you_can_now_login"));
      reset();
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, reset, data, isSuccess]);

  useEffect(() => {
    if (otpRequestResponse.isLoading) {
      toast.success(t("requesting_new_otp"));
    }

    if (otpRequestResponse.isError) {
      if (isErrorWithMessage(otpRequestResponse.error)) {
        const message = "error" in otpRequestResponse.error ? otpRequestResponse.error.error : otpRequestResponse.error.data.message;
        toast.error(message);
        otpRequestResponse.reset();
      }
    }

    if (otpRequestResponse.isSuccess) {
      toast.success(t("otp_requested_please_check_your_mail"));
      otpRequestResponse.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpRequestResponse]);

  const email = searchParams.get("email");

  if (!email) {
    router.push("/login");
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    requestVerifyOtp({ email, otp: +otp });
  };

  const handleNewOtpRequest = () => {
    requestNewOtp({ email });
  };

  return (
    <div className="w-full h-full overflow-auto lg:h-[100vh] lg:overflow-hidden">
      <div className="flex flex-wrap w-full h-full">
        <div className="w-full lg:w-[43.75%]">
          <div className="w-full h-full">
            <Image
              src="/images/login_left_img.png"
              alt="kids-painting-image"
              width={960}
              height={951}
              className="w-full h-[60vh] object-cover lg:h-screen"
            />
          </div>
        </div>
        <div className="w-full lg:w-[56.25%] h-full relative">
          <Image
            src="/images/logo.svg"
            alt="Custom photo books made from children’s hand-drawn art"
            width={210}
            height={70}
            className="fixed w-[100px] z-[-1] top-4 right-4 sm:w-[150px] sm:right-5 sm:top-5 xl:top-10 xl:right-10 2xl:w-[210px]"
          />
          <Image
            src="/images/hiw_splash.png"
            width={860}
            height={494}
            alt="splash-left"
            className="absolute z-[-1] max-w-[50%] sm:max-w-[36.2%] left-0 top-0"
          />
          <Image
            src="/images/hiw_splash.png"
            width={860}
            height={494}
            alt="splash-left"
            className="absolute hidden max-w-[50%] lg:block sm:max-w-[36.2%] -scale-100 right-0 bottom-0"
          />
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="thin-scrollbar w-full sm:max-w-[90%] xl:max-w-[78.66%] overflow-hidden">
              <div className="flex relative z-[9] flex-col gap-4 lg:gap-5 xl:gap-[30px] 2sxl:gap-[50px]">
                <div className="flex flex-col gap-2">
                  <h3>{t("verify_otp")}</h3>
                  <p className="text-[var(--dark-gray)] text-[14px] md:text-[16px] lg:text-[18px]">
                    {t("already_have_an_account")}{" "}
                    <Link href="/login" className="text-[var(--dark-gray)] underline">
                      {t("login")}
                    </Link>
                  </p>
                </div>
                <div className="bg-light">
                  <div className="flex flex-col gap-4 lg:gap-5 xl:gap-[30px] h-[62max] overflow-hidden overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-4 2xl:gap-[30px]">
                        <div className="flex flex-col gap-4 2xl:gap-[25px]">
                          <div className="flex flex-col gap-1">
                            <label htmlFor="otp" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
                              {t("otp")}
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
                            <div className="mt-2">
                              <p className="text-[var(--dark-gray)] text-[14px] md:text-[16px] lg:text-[18px]">
                                <button type="button" onClick={handleNewOtpRequest} className="text-[var(--dark-gray)] underline">
                                  {t("request_new_otp")}
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex flex-col">
                          <button type="submit" className="btn-pill shadow-[0px_4px_4px_rgba(0,0,0,0.25)] pink w-full">
                            {t("send")}
                          </button>
                        </div>
                      </div>
                    </form>
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

const pageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
};

export default pageWrapper;
