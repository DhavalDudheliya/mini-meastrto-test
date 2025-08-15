export interface APIResponse<T> {
  status: number;
  data: T;
  message: string;
  error: string;
}
