import axios, { AxiosRequestConfig, Method } from 'axios';
export interface CommonApiResponse {
    statusCode: number;
    message: string;
    description: string;
    status: 0 | 1;
}

export interface IapiEndPOint {
    [key: string]: { method: Method; url: string };
}

export const makeRequest = (options: AxiosRequestConfig) => axios(options);
