"use client";

import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import * as yup from "yup";
import Button from "../ui/Button";
import { useCreateContactMutation } from "@/lib/features/contact/contact.api";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./styles.css";

const ContactUsForm = () => {
  const [createContactReq, { isLoading, isError, isSuccess }] = useCreateContactMutation();

  const t = useTranslations();

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().optional(),
    message: yup.string().required(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validateOnBlur: true,
    onSubmit: (values) => {
      createContactReq({
        email: values.email,
        message: values.message,
        name: values.name,
        phone: values.phone,
      });
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = formik;

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success(t("contact_us_success"));
    }

    if (isError && !isLoading) {
      toast.error(t("contact_us_error"));
    }
  }, [isSuccess, isLoading, isError]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 xl:gap-[34px]">
        <div className="flex flex-col gap-4 xl:gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px]">
              {t("full_name")}
            </label>
            <input
              onBlur={handleBlur}
              className={`${touched.name && errors.name ? "border-danger" : "blue"}`}
              onChange={handleChange}
              value={values.name}
              id="name"
              type="text"
            />
            {touched.name && errors.name ? <span className="danger capitalize">{errors.name}</span> : null}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
              {t("email")}
            </label>
            <input
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              id="email"
              className={`${touched.email && errors.email ? "border-danger" : "blue"}`}
              type="email"
            />
          </div>
          {touched.email && errors.email ? <span className="danger capitalize">{errors.email}</span> : null}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
              {t("phone_number")}
            </label>
            <PhoneInput
              inputStyle={{
                width: "100%",
                borderRadius: "20px",
                borderColor: "#5ad6fcbb",
                borderWidth: "2px",
              }}
              buttonStyle={{
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderLeftWidth: "2px",
                borderColor: "#5ad6fcbb",
                borderWidth: "2px",
                borderRightWidth: "0",
                backgroundColor: "#5ad6fcbb",
              }}
              country={"us"}
              value={values.phone}
              onBlur={handleBlur}
              onChange={(a, b, c, val) => {
                formik.setFieldValue("phone", val);
              }}
            />
            {touched.phone && errors.phone ? <span className="danger capitalize">{errors.phone}</span> : null}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[22px]">
              {t("message")}
            </label>
            <textarea
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.message}
              id="message"
              className={`${touched.message && errors.message ? "border-danger" : "blue"}`}
              rows={4}
            />
            {touched.message && errors.message ? <span className="danger capitalize">{errors.message}</span> : null}
          </div>
        </div>
        <Button isLoading={isLoading} type="submit" className="btn-pill blue">
          <p>{t("send")}</p>
        </Button>
      </div>
    </form>
  );
};

export default ContactUsForm;
