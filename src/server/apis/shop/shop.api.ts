import { makeRequest } from '../common.interface';
import { IRShopUpdate, updateShopData, ShopApis } from './shop.interface';

export function updateShop(data: updateShopData): Promise<IRShopUpdate> {
    const options = {
        ...ShopApis.UpdateShop,
        data,
    };
    return makeRequest(options);
}
