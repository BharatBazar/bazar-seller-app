import { CommonApiResponse } from './../common.interface';
export interface IBill {
    name: String;
    totalPrice: Number;
    shop: [];
    products: [];
}

export interface IGetBillResponse extends CommonApiResponse {
    payload: [];
}
