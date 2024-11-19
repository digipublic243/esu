import { LocalStorageToken } from "@/src/types/localStorage/token";
import { RequestHandler } from "../api";
import { LocalStorageUser } from "@/src/types/localStorage/user";
import { LoginResponse } from "@/src/types/auth/loginResponse.type";

export class AuthChecking {
  requestHandler;
  constructor() {
    this.requestHandler = new RequestHandler();
  }
  async tokenValidity() {
    const brutToken = localStorage.getItem("dpToken");
    if (brutToken == null) return false;
    const localStorageToken: LocalStorageToken = JSON.parse(brutToken);

    const data = await this.requestHandler.get({
      path: "/auth/check-token-validity",
      method: "GET",
      header: {
        authorization: "Bearer " + localStorageToken.accessToken,
      },
    });
    return data;
  }

  async getUserFromLocalStorage(): Promise<LocalStorageUser | null> {
    const brutUser = await localStorage.getItem("dpUser");
    if (brutUser == null) return null;
    const localStorageUser: LocalStorageUser = await JSON.parse(brutUser);
    return localStorageUser;
  }
}
