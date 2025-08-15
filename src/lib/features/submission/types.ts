import { IPrinting } from "../printing/types";

interface Submission {
  _id: string;
  user_id: string;
  order_id: string;
  product_id: string;
  file_key: string[]; // Array of file keys (URLs or file names)
  is_finalized: boolean;
  message: string;
  from_admin: boolean;
  in_reply_to: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface ISubmissionApi {
  submission: Submission[];
  printing: IPrinting;
}