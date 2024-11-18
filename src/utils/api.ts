import { LocalStorageToken } from "@/types/localStorage/token";
import {
  PostRequestMethodParamsType,
  RequestMethodParamsType,
} from "@/types/request/params";
import { ResponseInterface } from "@/types/request/responseInterface";

export class RequestHandler {
  static get(arg0: { method: string; path: string }) {
    throw new Error("Method not implemented.");
  }
  API_BASE_URL;
  header: { [key: string]: any; authorization?: string } = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  constructor() {
    this.API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  async get(params: RequestMethodParamsType): Promise<any> {
    console.log("fetching....");
    console.log(params.path);
    const url = `${this.API_BASE_URL}${params.path}`;
    const brutToken = localStorage.getItem("dpToken");
    let localStorageToken: LocalStorageToken | null = null;
    if (brutToken !== null) localStorageToken = JSON.parse(brutToken);

    let headers = {
      ...this.header,
      ...params.header,
    };
    if (
      !(params.header && "authorization" in params.header) &&
      localStorageToken
    )
      headers["authorization"] = "Bearer " + localStorageToken.accessToken;

    const defaultOptions: RequestInit = {
      headers: headers,
      ...params.options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data: ResponseInterface = await response.json();

      if (!response.ok) {
        if (params.setToast)
          params.setToast({
            message: data.error.message || data.message,
            opts: { icon: "⛔" },
          });
        if (params.setErrorMessage)
          params.setErrorMessage(data.error.message || data.message);
        return false;
      }
      if (params.setToast)
        params.setToast({
          message: data?.message || data.message,
          opts: { icon: "✅" },
        });
      return data;
    } catch (error) {
      console.error("Fetch API error:", error);
      if (params.setErrorMessage)
        params.setErrorMessage("une erreur s'est produite");
      if (params.setToast)
        params.setToast({
          message: "une erreur s'est produite",
          opts: { icon: "⛔" },
        });
      return false;
    }
  }

  async post(params: PostRequestMethodParamsType): Promise<any> {
    const url = `${this.API_BASE_URL}${params.path}`;
    const brutToken = localStorage.getItem("dpToken");
    let localStorageToken: LocalStorageToken | null = null;
    if (brutToken !== null) localStorageToken = JSON.parse(brutToken);

    let headers = {
      ...this.header,
      ...params.header,
      "Content-Type": "application/json; charset=utf-8",
    };

    if (
      !(params.header && "authorization" in params.header) &&
      localStorageToken
    ) {
      headers["authorization"] = "Bearer " + localStorageToken.accessToken;
    }
    if (params.isFormData) {
      headers["Content-Type"] =
        "multipart/form-data; boundary=--------------------------865266423364791733449498";
      // "multipart/form-data";
    }

    const defaultOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: params.isFormData ? params.body : JSON.stringify(params.body),
      ...params.options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      if (!response.ok) {
        console.log("Erreur lors de la création :", data);
        if (params.setToast) {
          params.setToast({ message: data.message, opts: { icon: "⛔" } });
        }
        if (params.setErrorMessage) {
          params.setErrorMessage(String(data));
        }
        return false;
      }

      if (params.setToast) {
        params.setToast({ message: data.message, opts: { icon: "✅" } });
      }
      return data;
    } catch (error) {
      console.error("Erreur Fetch API:", error);
      if (params.setErrorMessage) {
        params.setErrorMessage("Une erreur s'est produite");
      }
      if (params.setToast) {
        params.setToast({
          message: "Une erreur s'est produite",
          opts: { icon: "⛔" },
        });
      }
      return false;
    }
  }

  async update(params: RequestMethodParamsType): Promise<any> {
    const url = `${this.API_BASE_URL}${params.path}`;
    const brutToken = localStorage.getItem("dpToken");
    let localStorageToken: LocalStorageToken | null = null;
    if (brutToken !== null) localStorageToken = JSON.parse(brutToken);

    let headers = {
      ...this.header,
      ...params.header,
    };
    if (
      !(params.header && "authorization" in params.header) &&
      localStorageToken
    )
      headers["authorization"] = "Bearer " + localStorageToken.accessToken;

    const defaultOptions: RequestInit = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(params.body),
      ...params.options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      if (!response.ok) {
        console.log("data updated successfully:....", data);
        if (params.setToast)
          params.setToast({ message: data.message, opts: { icon: "⛔" } });
        if (params.setErrorMessage) params.setErrorMessage(String(data));
        return false;
      }
      if (params.setToast)
        params.setToast({ message: data.message, opts: { icon: "✅" } });
      return data;
    } catch (error) {
      console.error("Fetch API error:", error);
      if (params.setErrorMessage)
        params.setErrorMessage("une erreur s'est produite");
      if (params.setToast)
        params.setToast({
          message: "une erreur s'est produite",
          opts: { icon: "⛔" },
        });
      return false;
    }
  }
}
