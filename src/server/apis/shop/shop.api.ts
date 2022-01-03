import { apiEndPoint } from './../../index';
import axios from 'axios';

import { IRShopUpdate, updateShopData, Shop, IRShopVerification, IRProductId, IRGetShop } from './shop.interface';

export async function updateShop(data: Partial<updateShopData>): Promise<IRShopUpdate> {
    return axios.patch('/shop/update', data);
}

export async function getShop(data: { _id: string }): Promise<IRGetShop> {
    return axios.post('/shop/get', data);
}
export async function deleteShop(data: { _id: string }): Promise<Shop> {
    return axios.delete('/shop/delete?_id=' + data._id);
}

export async function getShopVerificationDetails(data: { _id: string }): Promise<IRShopVerification> {
    return axios.post('/shop/verificationDetails', data);
}

export async function generateProductId(data: { shopId: string }): Promise<IRProductId> {
    console.log(data);
    return fetch(apiEndPoint + '/productId/generate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((r) => r.json())
        .then((r) => {
            return r;
        })
        .catch((e) => {
            return e;
        });
}
