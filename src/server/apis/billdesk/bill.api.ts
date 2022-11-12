import { CommonApiResponse } from './../common.interface';
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { IBill } from './bill.interface';

export function createBill(data: Partial<IBill>): Promise<CommonApiResponse> {
    console.log('GPP', data);
    return axios.post('/bill/create', data);
}

export function showBill(shopId: string): Promise<CommonApiResponse> {
    return axios.get(`bill/show/${shopId}`);
}

export function updateBill(shopId: any, data: any): Promise<CommonApiResponse> {
    console.log('DATAs', data);
    return axios.patch(`bill/update/${shopId}`, data);
}

export function checkBillProductExistOrNot(data: any): Promise<CommonApiResponse> {
    console.log('DATAs2', data);
    return axios.post(`bill/fetch/`, data);
}
