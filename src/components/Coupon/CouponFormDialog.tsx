"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Calendar as CalendarIcon, Check, ChevronsUpDown, Download, Plus } from "lucide-react";

import { Button as Button1 } from "@/components/ui/ButtonS";
import Button from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CreateCouponDto } from "@/lib/features/coupon/types";
import { COUPON_PRODUCT_RESTRICTIONS, DISCOUNT_TYPES } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { useCreateCouponMutation, useUploadCouponCsvMutation } from "@/lib/features/coupon/coupon.api";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import moment from "moment";

// Validation schema using Yup
const couponValidationSchema = Yup.object({
  code: Yup.string().required("coupon_code_is_required"),
  discount_type: Yup.string().oneOf(Object.values(DISCOUNT_TYPES)).required("discount_type_is_required"),
  discount_value: Yup.number().when("discount_type", {
    is: DISCOUNT_TYPES.PERCENTAGE,
    then: () =>
      Yup.number()
        .required("discount_value_is_required")
        .min(1, "discount_value_must_be_greater_than_0")
        .max(100, "discount_value_must_be_less_than_or_equal_to_100"),
    otherwise: () => Yup.number().min(1, "discount_value_must_be_greater_than_0").required("discount_value_is_required"),
  }),
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

export default function CouponDialogForm({ open, onOpenChange, refetch, locale }: { open: boolean; onOpenChange: (open: boolean) => void, refetch: () => void, locale: string }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [products, setProducts] = useState<{ value: string; label: string }[]>([]);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isMaxUsage, setIsMaxUsage] = useState(false);
  const [isMinOrderValue, setIsMinOrderValue] = useState(false);

  const t = useTranslations();

   const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
   const [uploadCouponCsv, { isLoading, isError, isSuccess, error }] = useUploadCouponCsvMutation();

   const formik = useFormik<CreateCouponDto>({
     initialValues: {
       code: "",
       discount_type: DISCOUNT_TYPES.FIXED_AMOUNT,
       discount_value: 0,
       valid_from: null,
       valid_until: null,
       max_usage: null,
       minimum_order_value: null,
       product_restriction: COUPON_PRODUCT_RESTRICTIONS.ALL_PRODUCTS,
       applicable_products: [],
       applicable_categories: [],
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
         const couponData: CreateCouponDto = {
           code: values.code,
           discount_type: values.discount_type,
           discount_value: values.discount_value,
            // valid_from: values.valid_from,
            // valid_until: values.valid_until,
           valid_from: valid_from,
           valid_until: valid_until,
           max_usage: values.max_usage && values.max_usage > 0 ? values.max_usage : null,
           minimum_order_value: values.minimum_order_value ?? null,
           product_restriction: values.product_restriction,
           applicable_products: values.product_restriction === COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_PRODUCTS ? values.applicable_products : null,
           applicable_categories:
             values.product_restriction === COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_CATEGORIES ? values.applicable_categories : null,
           restrict_one_use_per_user: !!values.restrict_one_use_per_user,
         };
         await createCoupon(couponData).unwrap();
         toast.success(t("coupon_created_successfully"));
         formik.resetForm(); // Reset the form after successful submission
         setCsvFile(null); // Reset the CSV file state
         onOpenChange(false); // Close the dialog

         // Refresh the coupons list
         refetch();
       } catch (error) {
         console.error("Failed to create coupon:", error);
         toast.error(t("coupon_creation_failed"));
       }
     },
   });
   

  useEffect(() => {
    const token = Cookie.get("token");

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const formattedProducts = data.data.map((product: any) => ({
          value: product._id,
          label: locale === "en" ? product.name.en : product.name.sv,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();

        const formattedCategories = data.data.map((category: any) => ({
          value: category._id,
          label: locale === "en" ? category.name.en : category.name.sv,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setCsvFile(e.target.files[0]);
      }
    };

    const handleUpload = async () => {
      if (!csvFile) return;
      const formData = new FormData();
      formData.append("file", csvFile);

      try {
        await uploadCouponCsv({ file: csvFile, locale }).unwrap();
        setCsvFile(null); // Reset the CSV file state
        formik.resetForm();
        refetch();
        onOpenChange(false);
        toast.success("Successfully uploaded coupons");
      } catch (err) {

        console.error("Upload error", err);
        if (err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data) {
          toast.error((err as any).data.message);
        } else {
          toast.error("An error occurred during upload.");
        }
      }
    };

    const handleFileDownload = () => {
      const csvContent = `code,discount_type,discount_value,valid_from,valid_until,max_usage,restrict_one_use_per_user,minimum_order_value,product_restriction,applicable_products,applicable_categories`;

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "coupons.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button type="button" variant="filled">
            <Plus className="w-6 h-6 mr-2" />
            {t("create_coupon")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t("create_coupon")}</DialogTitle>
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

              {/* Discount Type */}
              <div className="space-y-2">
                <Label>{t("discount_type")}</Label>
                <div className="flex items-start justify-center space-x-2">
                  <RadioGroup
                    name="discount_type"
                    value={formik.values.discount_type}
                    onValueChange={(value) => formik.setFieldValue("discount_type", value)}
                    className="flex items-center gap-5 w-[200px]"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={DISCOUNT_TYPES.FIXED_AMOUNT} id="fixed_amount" />
                      <Label htmlFor="fixed_amount">{t("fixed_amount")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={DISCOUNT_TYPES.PERCENTAGE} id="percentage" />
                      <Label htmlFor="percentage">{t("percentage")}</Label>
                    </div>
                  </RadioGroup>

                  <div className="flex flex-col items-start justify-start w-full space-y-1">
                    <div className="flex items-center space-x-2">
                      <Input
                        id="discount_value"
                        name="discount_value"
                        type="number"
                        placeholder="Ex. 10"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="!w-[200px]"
                      />
                      <span className="text-sm">{formik.values.discount_type === DISCOUNT_TYPES.FIXED_AMOUNT ? "SEK" : "%"}</span>
                    </div>
                    {formik.touched.discount_value && formik.errors.discount_value ? (
                      <p className="ml-1 text-sm text-red-500">({t(formik.errors.discount_value)})</p>
                    ) : null}
                  </div>
                </div>
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
                            ? (date) => !!formik.values.valid_from && date < new Date(formik.values.valid_from as string)
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
                <div className="space-y-4 w-1/2">
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
                  {/* CSV File Upload */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Label htmlFor="csv_file">{t("upload_unique_codes")} (CSV)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Download onClick={handleFileDownload} className="cursor-pointer text-pink-500" size={20} />
                          </TooltipTrigger>
                          <TooltipContent>Download CSV Template</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input className="cursor-pointer" id="csv_file" name="csv_file" type="file" accept=".csv" onChange={handleFileChange} />
                    {csvFile && (
                      <p className="text-sm text-green-500">
                        {t("file_uploaded")}: {csvFile.name.length > 10 ? `${csvFile.name.slice(0, 10)}...` : csvFile.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Restrictions */}
                <div className="space-y-4 w-1/2">
                  <Label>{t("applies_to")}</Label>
                  <RadioGroup
                    name="product_restriction"
                    value={formik.values.product_restriction || ""}
                    onValueChange={(value) => {
                      formik.setFieldValue("product_restriction", value);
                      // Reset selections when changing restriction type
                      if (value === "all_products") {
                        formik.setFieldValue("applicable_products", []);
                        formik.setFieldValue("applicable_categories", []);
                      }
                    }}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={COUPON_PRODUCT_RESTRICTIONS.ALL_PRODUCTS} id="all_products" />
                      <Label htmlFor="all_products">{t("all_products")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_PRODUCTS} id="specific_products" />
                      <Label htmlFor="specific_products">{t("specific_products")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_CATEGORIES} id="product_categories" />
                      <Label htmlFor="product_categories">{t("product_categories")}</Label>
                    </div>
                  </RadioGroup>

                  {/* Product Selection (shown only when specific products selected) */}
                  {formik.values.product_restriction === COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_PRODUCTS && (
                    <div className="space-y-2">
                      <Popover modal open={productsOpen} onOpenChange={setProductsOpen}>
                        <PopoverTrigger asChild>
                          <Button1 variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                            {formik.values.applicable_products?.length
                              ? `${formik.values.applicable_products.length} product(s) selected`
                              : "Search and select..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button1>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search products..." />
                            <CommandEmpty>{t("no_products_found")}</CommandEmpty>
                            <CommandGroup>
                              {products.map((product) => (
                                <CommandItem
                                  key={product.value}
                                  onSelect={() => {
                                    const currentProducts = formik.values.applicable_products || [];
                                    const newProducts = currentProducts.includes(product.value)
                                      ? currentProducts.filter((p) => p !== product.value)
                                      : [...currentProducts, product.value];
                                    formik.setFieldValue("applicable_products", newProducts);
                                  }}
                                >
                                  <Checkbox checked={formik.values.applicable_products?.includes(product.value)} className="mr-2" />
                                  {product.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {formik.touched.applicable_products && formik.errors.applicable_products ? (
                        <p className="text-sm text-red-500">{t(formik.errors.applicable_products as string)}</p>
                      ) : null}
                    </div>
                  )}

                  {/* Category Selection (shown only when product categories selected) */}
                  {formik.values.product_restriction === COUPON_PRODUCT_RESTRICTIONS.SPECIFIC_CATEGORIES && (
                    <div className="space-y-2">
                      <Popover modal open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                        <PopoverTrigger asChild>
                          <Button1 variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                            {formik.values.applicable_categories?.length
                              ? `${formik.values.applicable_categories.length} category(s) selected`
                              : "Search and select..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button1>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandEmpty>{t("no_categories_found")}</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  key={category.value}
                                  onSelect={() => {
                                    const currentCategories = formik.values.applicable_categories || [];
                                    const newCategories = currentCategories.includes(category.value)
                                      ? currentCategories.filter((c) => c !== category.value)
                                      : [...currentCategories, category.value];
                                    formik.setFieldValue("applicable_categories", newCategories);
                                  }}
                                >
                                  <Checkbox checked={formik.values.applicable_categories?.includes(category.value)} className="mr-2" />
                                  {category.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {formik.touched.applicable_categories && formik.errors.applicable_categories ? (
                        <p className="text-sm text-red-500">{t(formik.errors.applicable_categories as string)}</p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button for form */}
            {!csvFile && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl w-[125px] h-[40px] items-center justify-center flex disabled:cursor-not-allowed"
                  isDisabled={formik.isSubmitting}
                  isLoading={formik.isSubmitting}
                >
                  {t("save_coupon")}
                </Button>
              </div>
            )}
            {/* Submit Button for csv */}
            {csvFile && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl w-[125px] h-[40px] items-center justify-center flex disabled:cursor-not-allowed"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onClick={handleUpload}
                >
                  {t("save_coupon")}
                </Button>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    );
}