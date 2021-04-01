import { Method } from 'axios';
export interface CommonApiResponse {
    statusCode: number;
    message: string;
    description: string;
}

export interface IapiEndPOint {
    [key: string]: { method: Method; url: string };
}
