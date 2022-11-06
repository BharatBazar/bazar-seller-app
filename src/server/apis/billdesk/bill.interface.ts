import { CommonApiResponse } from './../common.interface';
export interface IBill {
    name: String;
    totalPrice: Number;
    shopId: [];
    products: any;
}

export interface IGetBillResponse extends CommonApiResponse {
    payload: [];
}
