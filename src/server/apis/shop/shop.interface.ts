import { product } from '../catalogue/catalogue.interface';
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

    category: product[];
    subCategory: product[][];
    subCategory1: product[][][];
    shopMemberOnBoardingDone: boolean;
}
export interface IRGetShop extends CommonApiResponse {
    payload: Shop;
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
    category: string[];
    subCategory: string[][];
    subCategory1: string[][][];

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

export interface IRShopUpdate extends CommonApiResponse {
    payload: Shop;
}

export interface IRShopVerification extends CommonApiResponse {
    payload: { isVerified: boolean; shopVerificationStatus: verificationStatus; remarks: string };
}

export interface IRProductId extends CommonApiResponse {
    payload: number;
}
