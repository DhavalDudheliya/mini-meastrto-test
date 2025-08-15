import { Product } from "../product/types";

export interface IPrinting {
  _id: string;
  status: string;
  attachment: string;
  printing_date: string; // This can be typed as `Date` if you plan to convert it to a JavaScript `Date` object.
  order_id: string;
  product_id: string;
  printing_service_order_id: string;
  createdAt: string; // Same as `printing_date`, can be `Date` type if needed.
  updatedAt: string;
  __v: number;
}

interface IPrintingProduct extends Product {
  product_id: string;
}

export interface IAllPrintingOrderList {
  _id: string;
  products: IPrintingProduct;
  printings: IPrinting;
  createdAt: Date;
}
