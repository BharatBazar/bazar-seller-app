import { apiEndPoint } from './../../index';
import axios from 'axios';

import { IRShopUpdate, updateShopData, Shop, IRShopVerification, IRProductId } from './shop.interface';

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

export async function generateProductId(data: { shopId: string }): Promise<IRProductId> {
    return fetch(apiEndPoint + '/productId/generate', {
        method: 'post',
        body: JSON.stringify(data),
    })
        .then((r) => r.json())
        .then((r) => {
            console.log(r);
            return Promise.resolve(r.data);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}
