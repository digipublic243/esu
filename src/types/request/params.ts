import { ToastStoreType } from "@/store/toast";

export type RequestMethodParamsType = {
  path: string;
  body?: any;
  options?: RequestInit | {};
  header?: HeadersInit;
  setToast?: (toast: ToastStoreType | null) => void;
  setErrorMessage?: (message: string) => void;
  method: string;
};

export type PostRequestMethodParamsType = {
  method: string;
  path: string;
  body: any;
  options?: RequestInit | {};
  header?: HeadersInit;
  setToast?: (toast: ToastStoreType | null) => void;
  setErrorMessage?: (message: string) => void;
  isFormData?: boolean;
};
