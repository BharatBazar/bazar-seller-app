import { product } from './../productCatalogue/productCatalogue.interface';
import { commonApiHandler } from './../../index';
import { CommonApiResponse, IapiEndPOint } from './../common.interface';
import { IshopMember } from '../shopMember/shopMember.interface';

export const ShopApis: IapiEndPOint = {
    UpdateShop: {
        url: '/shop/update',
        method: 'patch',
    },
    GetShop: {
        url: '/shop/get',
        method: 'post',
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
    category: [product];
    subCategory: [[product]];
    subCategory1: [[product]];
}

export interface IRGetShop extends CommonApiResponse {
    payload: Shop;
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
