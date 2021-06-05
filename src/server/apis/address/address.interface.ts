import { CommonApiResponse } from './../common.interface';
export enum addressType {
    'state' = 'State',
    'city' = 'City',
    'area' = 'Area',
}

export interface IAddress {
    addressType: addressType;
    parent: string;
    name: string;
}

export interface IRAddress extends CommonApiResponse {
    payload: IAddress[];
}
