import { IProductCatalogue, product } from '../catalogue/catalogue.interface';
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
    membersDetailSkipped: boolean;
    isTerminated: boolean;

    shopDescription: string;

    shopImage: [string];
    ownerImage: [string];
    // whatYouSell: string[];
    owner: {};
    coOwner: {}[];
    worker: {}[];
    isVerified: boolean;
    state: string;
    city: string;
    area: string;
    pincode: string;
    localAddress: string;
    rating: Number;
    noOfRating: Number;

    category: product[];
    subCategory: product[][];
    subCategory1: product[][][];
    shopMemberOnBoardingDone: boolean;
}

export interface IShop {
    _id: string;
    shopName: string;
    addressOfShop: string;
    membersDetailSkipped: boolean;
    isTerminated: boolean;

    shopDescription: string;

    shopImage: [string];
    ownerImage: [string];
    // whatYouSell: string[];
    owner: {};
    coOwner: {}[];
    worker: {}[];
    isVerified: boolean;
    state: string;
    city: string;
    area: string;
    pincode: string;
    localAddress: string;
    rating: Number;
    noOfRating: Number;

    sellingItems: IProductCatalogue[];
    //Here key is parent id and value is total filter added up to now
    filterProvidedForSellingItems: { [key: string]: number };
    shopMemberOnBoardingDone: boolean;
}
export interface IRGetShop extends CommonApiResponse {
    payload: IShop;
}

export interface IRGetShopCatalogue extends CommonApiResponse {
    payload: {
        sellingItems: IProductCatalogue[];
        selectedCategory: string[][];
    };
}

export enum verificationStatus {
    registered = 'Registered',
    processing = 'Processing',
    rejected = 'Rejected',
    verified = 'Verified',
}

export interface updateShopData {
    _id: string;
    shopName: string;
    addressOfShop: string;
    membersDetailSkipped: boolean;
    isTerminated: boolean;
    sellingItems: string[];

    shopDescription: string;

    shopImage: [string];
    ownerImage: [string];
    // whatYouSell: string[];
    owner: {};
    coOwner: {}[];
    worker: {}[];
    isVerified: boolean;
    shopVerificationStatus: verificationStatus;
    remarks: string;
    state: string;
    city: string;
    area: string;
    pincode: string;
    localAddress: string;
    rating: number;
    noOfRating: number;
    shopMemberOnBoardingDone: boolean;
}

export interface IRUpdateShopCatalogue extends CommonApiResponse {
    payload: {
        sellingItems: IProductCatalogue[];
        selectedCategory: string[][];
    };
}
export interface IRShopUpdate extends CommonApiResponse {
    payload: Shop;
}

export interface IRShopVerification extends CommonApiResponse {
    payload: { isVerified: boolean; shopVerificationStatus: verificationStatus; remarks: string };
}

export interface IRProductId extends CommonApiResponse {
    payload: number;
}
