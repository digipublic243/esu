export interface ResponseInterface {
    code: number;
    statusCode: string;
    message: string;
    data?: any[];
    error?: any
}