import axios from 'axios';

import { IRShopUpdate, updateShopData, Shop, IRShopVerification } from './shop.interface';

export async function updateShop(data: Partial<updateShopData>): Promise<IRShopUpdate> {
    return axios.patch('/shop/update', data);
}

export async function getShop(data: { _id: string }): Promise<Shop> {
    return axios.post('/shop/get', data);
}
export async function deleteShop(data: { _id: string }): Promise<Shop> {
    return axios.delete('/shop/delete?_id=' + data._id);
}

export async function getShopVerificationDetails(data: { _id: string }): Promise<IRShopVerification> {
    return axios.post('/shop/verificationDetails', data);
}
