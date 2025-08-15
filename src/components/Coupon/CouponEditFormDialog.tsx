"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button as Button1 } from "@/components/ui/ButtonS";
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Coupon, UpdateCouponDto } from "@/lib/features/coupon/types";
import { COUPON_PRODUCT_RESTRICTIONS } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "../ui/dialog";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import toast from "react-hot-toast";
import { useUpdateCouponMutation } from "@/lib/features/coupon/coupon.api";
import { Switch } from "../ui/switch";
import moment from "moment";

// Validation schema using Yup
const couponValidationSchema = Yup.object({
  code: Yup.string().required("coupon_code_is_required"),
  valid_from: Yup.date().required("start_date_is_required"),
  valid_until: Yup.date().required("end_date_is_required").min(Yup.ref("valid_from"), "end_date_must_be_after_start_date"),
  max_usage: Yup.number().min(1, "max_usage_must_be_greater_than_0").nullable(),
  minimum_order_value: Yup.number().nullable().min(1, "minimum_order_value_must_be_greater_than_0"),
  product_restriction: Yup.string().nullable(),
  applicable_products: Yup.array().when("product_restriction", {
    is: COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_PRODUCTS,
    then: () => Yup.array().min(1, "At least one product must be selected"),
    otherwise: () => Yup.array().nullable(),
  }),
  applicable_categories: Yup.array().when("product_restriction", {
    is: COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_CATEGORIES,
    then: () => Yup.array().min(1, "at_least_one_category_must_be_selected"),
    otherwise: () => Yup.array().nullable(),
  }),
  restrict_one_use_per_user: Yup.boolean(),
});

export default function CouponEditDialogForm({
  open,
  refetch,
  locale,
  couponData,
  onOpenChange,
  onClose,
}: {
  open: boolean;
  refetch: () => void;
  locale: string;
  couponData: Coupon;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}) {
  const t = useTranslations();
  const [isMaxUsage, setIsMaxUsage] = useState(couponData.max_usage && couponData.max_usage > 0 ? true : false);
  const [isMinOrderValue, setIsMinOrderValue] = useState(couponData.minimum_order_value && couponData.minimum_order_value > 0 ? true : false);

  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

  const formik = useFormik<UpdateCouponDto>({
    initialValues: {
      code: "",
      valid_from: "",
      valid_until: "",
      max_usage: null,
      minimum_order_value: null,
      restrict_one_use_per_user: true,
    },
    validationSchema: couponValidationSchema,
    onSubmit: async (values) => {
      console.log(values);

      const valid_from = moment(values.valid_from).format("YYYY-MM-DD");
      console.log("🚀 ~ valid_from-->", valid_from)
      const valid_until = moment(values.valid_until).format("YYYY-MM-DD");
      console.log("🚀 ~ valid_until-->", valid_until)
      try {
        // Build coupon data, omitting empty/irrelevant fields
        const data: UpdateCouponDto = {
          code: values.code,
          valid_from: valid_from,
          valid_until: valid_until,
          max_usage: values.max_usage && values.max_usage > 0 ? values.max_usage : null,
          minimum_order_value: values.minimum_order_value ?? null,
          restrict_one_use_per_user: !!values.restrict_one_use_per_user,
        };
        await updateCoupon({ id: couponData._id, couponData: data }).unwrap();

        toast.success(t("coupon_updated_successfully"));
        formik.resetForm(); // Reset the form after successful submission
        onClose();

        // Refresh the coupons list
        refetch();
      } catch (error) {
        console.error("Failed to create coupon:", error);
        toast.error(t("coupon_update_failed"));
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      code: couponData.code,
      valid_from: couponData.valid_from,
      valid_until: couponData.valid_until,
      max_usage: couponData.max_usage,
      minimum_order_value: couponData.minimum_order_value,
      restrict_one_use_per_user: couponData.restrict_one_use_per_user,
    });
  }, [couponData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("edit_coupon")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto p-2">
          {/* General Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("general_information")}</h3>

            {/* Discount Code */}
            <div className="space-y-2">
              <Label htmlFor="code">{t("coupon_code")}</Label>
              <Input
                id="code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="WELCOME10"
              />
              {formik.touched.code && formik.errors.code ? <p className="text-sm text-red-500">{t(formik.errors.code)}</p> : null}
            </div>
          </div>

          {/* Validity & Usage Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">{t("validity_and_usage")}</h3>

            {/* Date Range Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("valid_from")}</Label>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button1 variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.valid_from ? moment(formik.values.valid_from).format("YYYY-MM-DD") : <span>{t("pick_a_date")}</span>}
                    </Button1>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      onSelect={(date) => formik.setFieldValue("valid_from", date)}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.valid_from && formik.errors.valid_from ? (
                  <p className="text-sm text-red-500">{t(formik.errors.valid_from as string)}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label>{t("valid_until")}</Label>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button1 variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formik.values.valid_until ? moment(formik.values.valid_until).format("YYYY-MM-DD") : <span>{t("pick_a_date")}</span>}
                    </Button1>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      onSelect={(date) => formik.setFieldValue("valid_until", date)}
                      initialFocus
                      disabled={
                        formik.values.valid_from
                          ? (date) => !!formik.values.valid_from && date < new Date(formik.values.valid_from!)
                          : (date) => date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                {formik.touched.valid_until && formik.errors.valid_until ? (
                  <p className="text-sm text-red-500">{t(formik.errors.valid_until as string)}</p>
                ) : null}
              </div>
            </div>

            {/* Usage Limits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="max_usage">{t("usage_limit")}</Label>
                  <Switch
                    id="max_usage"
                    checked={isMaxUsage}
                    onCheckedChange={(checked) => {
                      setIsMaxUsage(checked);
                      formik.setFieldValue("max_usage", checked ? 1 : null);
                    }}
                  />
                </div>
                {isMaxUsage && (
                  <>
                    <Input
                      id="max_usage"
                      name="max_usage"
                      type="number"
                      value={formik.values.max_usage || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.max_usage && formik.errors.max_usage ? (
                      <p className="text-sm text-red-500">{t(formik.errors.max_usage)}</p>
                    ) : null}
                  </>
                )}
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="restrict_one_use_per_user"
                    checked={formik.values.restrict_one_use_per_user}
                    onCheckedChange={(checked) => formik.setFieldValue("restrict_one_use_per_user", checked)}
                  />
                  <Label htmlFor="restrict_one_use_per_user">{t("limit_to_one_use_per_user")}</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Restrictions Section */}
          <div className="space-y-4 pt-4 border-t w-full">
            <h3 className="text-lg font-semibold">{t("restrictions")}</h3>

            <div className="flex items-start space-x-8 w-full">
              {/* Minimum Order Value */}
              <div className="space-y-2 w-1/2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="minimum_order_value">{t("minimum_order_value")}</Label>
                    <Switch
                      id="min_order_value"
                      checked={isMinOrderValue}
                      onCheckedChange={(checked) => {
                        setIsMinOrderValue(checked);
                        formik.setFieldValue("minimum_order_value", checked ? 1 : null);
                      }}
                    />
                  </div>
                  {isMinOrderValue && (
                    <>
                      <Input
                        id="minimum_order_value"
                        name="minimum_order_value"
                        type="number"
                        value={formik.values.minimum_order_value || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.minimum_order_value && formik.errors.minimum_order_value ? (
                        <p className="text-sm text-red-500">{t(formik.errors.minimum_order_value)}</p>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl w-[135px] h-[40px] items-center justify-center flex disabled:cursor-not-allowed"
              isDisabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
            >
              {t("update_coupon")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}