import { makeRequest } from '../common.interface';
import { IRShopUpdate, updateShopData, ShopApis, Shop } from './shop.interface';

export function updateShop(data: updateShopData): Promise<IRShopUpdate> {
    const options = {
        ...ShopApis.UpdateShop,
        data,
    };
    return makeRequest(options);
}

export function getShop(data: { _id: string }): Promise<Shop> {
    const options = {
        ...ShopApis.GetShop,
        data,
    };
    return makeRequest(options);
}
