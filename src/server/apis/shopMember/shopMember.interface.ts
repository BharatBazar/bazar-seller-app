import { Shop } from './../shop/shop.interface';
import { Ipermission } from './../permissions/permission.interface';
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
    firstName: string;
    lastName: string;
    //photo: [{_id:ObjectId}];
    permissions: string;
    phoneNumber: string;
    shop: string;
    role: string;
    _id: string;
    password: string;
    isTerminated: boolean;
    isDeleted: boolean;
    shopMemberOnBoardingDone: boolean;
    email?: string;
}

export interface IshopMemberPopulated {
    firstName: string;
    lastName: string;
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

export interface IRForgetPassword extends CommonApiResponse {
    payload: string;
}
export interface IRShopMemberLogin extends CommonApiResponse {
    payload: {
        data: IshopMemberPopulated;
        notShopNameAvailable?: boolean;
        notMemberDetails?: boolean;
        notShopVerification?: boolean;
        notPasswordAvailable?: boolean;
        notAddressAvailable?: boolean;
        notCategory?: boolean;
        notSubCategory?: boolean;
    };
}

export type ICreateShopMember =
    | {
          phoneNumber: string;
          email: string;
          firstName: string;
          lastName: string;
          role: 'Owner';
          otp: string;
      }
    | {
          phoneNumber: string;
          firstName: string;
          lastName: string;
          role: 'Worker' | 'Co-owner';
          email?: string;
          shop: string;
      };

export enum shopMemberRole {
    'Owner' = 'Owner',
    'coOwner' = 'Co-owner',
    'worker' = 'Worker',
}
