import { ConnectedUserType } from "./connectedUser.type";

export interface LoginResponse {
    code: number;
    statusCode: string;
    message: string;
    data: {
        token: {
            accessToken: string;
            refreshToken: string;
        },
        user: ConnectedUserType
    }
}