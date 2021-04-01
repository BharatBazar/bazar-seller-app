import { Method } from 'axios';
import { CommonApiResponse, IapiEndPOint } from './../common.interface';

export const apiEndPointShopMember: IapiEndPOint = {
    CreateShopMember: { url: '/shopMember/create', method: 'post' },

    CheckPhoneNumber: {
        url: '/shopMember/checkPhoneNumber',
        method: 'get',
    },
    ShopMemberLogin: {
        url: '/shopMember/login',
        method: 'get',
    },
    ShopMemberCreatePassword: {
        url: '/shopMember/createPassword',
        method: 'post',
    },
};
export interface ICreateShopMember extends CommonApiResponse {
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

export enum shopMemberRole {
    'Owner' = 'owner',
    'coOwner' = 'Co-owner',
    'worker' = 'worker',
}
