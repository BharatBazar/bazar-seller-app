import { CommonApiResponse } from './../common.interface';
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { IBill } from './bill.interface';

export function createBill(data: Partial<IBill>): Promise<CommonApiResponse> {
    console.log('GPP', data);
    return axios.post('/bill/create', data);
}

export function showBill(shopId: any): Promise<CommonApiResponse> {
    return axios.get(`bill/show/${shopId._id}`);
}
