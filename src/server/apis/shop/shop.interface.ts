import { CommonApiResponse, IapiEndPOint } from './../common.interface';
import { IshopMember } from '../shopMember/shopMember.interface';
import { IRGetProductCatalogue } from '../productCatalogue/productCatalogue.interface';

export const ShopApis: IapiEndPOint = {
    UpdateShop: {
        url: '/shop/update',
        method: 'patch',
    },
};

export interface Shop {
    _id: string;
    shopName: string;
    addressOfShop: string;
    // shopImage: [{_id:ObjectId }];
    // ownerImage: [{_id:ObjectId }];
    // whatYouSell: string[];
    owner: IshopMember;
    coOwner: IshopMember[];
    worker: IshopMember[];
    isVerified: boolean;
    isTerminated: boolean;
    category: [IRGetProductCatalogue];
    subCategory: [[IRGetProductCatalogue]];
    subCategory2: [[IRGetProductCatalogue]];
}

export interface updateShopData {
    _id: string;
    shopName?: string;
    addressOfShop?: string;
    membersDetailSkipped?: boolean;
    isTerminated?: boolean;
    category: [string];
    subCategory: [[string]];
    subCategory1: [[string]];
}

export interface IRShopUpdate extends CommonApiResponse {
    payload: Shop;
}
