import axios from 'axios';

import { IRShopUpdate, updateShopData, Shop } from './shop.interface';

export async function updateShop(data: Partial<updateShopData>): Promise<IRShopUpdate> {
    return axios.patch('/shop/update', data);
}

export async function getShop(data: { _id: string }): Promise<Shop> {
    return axios.post('/shop/get', data);
}
