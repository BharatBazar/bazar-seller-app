import { Shop } from './../shop/shop.interface';
import { Ipermission } from './../permissions/permission.interface';
import { Method } from 'axios';
import { CommonApiResponse, IapiEndPOint } from './../common.interface';

export const apiEndPointShopMember: IapiEndPOint = {
    CreateShopMember: { url: '/shopMember/create', method: 'post' },
    CheckPhoneNumber: { url: '/shopMember/checkPhoneNumber', method: 'post' },
    ShopMemberLogin: {
        url: '/shopMember/login',
        method: 'post',
    },
    ShopMemberCreatePassword: {
        url: '/shopMember/createPassword',
        method: 'post',
    },
    ShopMemberDelete: {
        url: '/shopmember/delete',
        method: 'delete',
    },
};

export interface IshopMember {
    name: string;
    //photo: [{_id:ObjectId}];
    permissions: string;
    phoneNumber: string;
    shop: string;
    role: string;
    _id: string;
    password: string;
    isTerminated: boolean;
    isDeleted: boolean;
}

export interface IshopMemberPopulated {
    name: string;
    //photo: [{_id:ObjectId}];
    permissions: Ipermission;
    phoneNumber: string;
    shop: Shop;
    role: string;
    _id: string;
    password: string;
    isTerminated: boolean;
    isDeleted: boolean;
}
export interface IRCreateShopMember extends CommonApiResponse {
    payload: IshopMember;
}

export interface IRCheckPhoneNumber extends CommonApiResponse {
    payload: string;
}

export interface IRSetPassword extends CommonApiResponse {
    payload: string;
}

export interface IRShopMemberDelete extends CommonApiResponse {
    payload: string;
}

export interface IRShopMemberLogin extends CommonApiResponse {
    payload: {
        data: IshopMemberPopulated;
        shopNameAvailable?: boolean;
        memberDetails?: boolean;
        shopVerification?: boolean;
        passwordAvailable?: boolean;
    };
}

export type ICreateShopMember =
    | {
          phoneNumber: string;
          email: string;
          name: string;
          role: 'owner';
          otp: string;
      }
    | {
          phoneNumber: string;
          name: string;
          role: 'worker' | 'Co-owner';
          email?: string;
          shop: string;
      };

export enum shopMemberRole {
    'Owner' = 'owner',
    'coOwner' = 'Co-owner',
    'worker' = 'worker',
}
