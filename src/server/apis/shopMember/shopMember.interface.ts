import { Method } from 'axios';
import { CommonApiResponse, IapiEndPOint } from './../common.interface';

export const apiEndPointShopMember: IapiEndPOint = {
    CreateShopMember: { url: '/shopMember/create', method: 'post' },
    CheckPhoneNumber: { url: '/shopMember/checkPhoneNumber', method: 'post' },
    ShopMemberLogin: {
        url: '/shopMember/login',
        method: 'get',
    },
    ShopMemberCreatePassword: {
        url: '/shopMember/createPassword',
        method: 'post',
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
export interface IRCreateShopMember extends CommonApiResponse {
    payload: IshopMember;
}

export interface IRCheckPhoneNumber extends CommonApiResponse {
    payload: string;
}

export interface IRSetPassword extends CommonApiResponse {
    payload: string;
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
          email: string;
          name: string;
          role: 'worker' | 'Co-owner';
          shop: string;
      };

export enum shopMemberRole {
    'Owner' = 'owner',
    'coOwner' = 'Co-owner',
    'worker' = 'worker',
}
