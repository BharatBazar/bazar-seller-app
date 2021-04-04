import axios from 'axios';
import { makeRequest } from '../common.interface';
import {
    apiEndPointShopMember,
    IRCreateShopMember,
    ICreateShopMember,
    IRCheckPhoneNumber,
    IRSetPassword,
    IRShopMemberDelete,
    IRShopMemberLogin,
} from './shopMember.interface';

export function createShopMember(data: ICreateShopMember): Promise<IRCreateShopMember> {
    const options = {
        ...apiEndPointShopMember.CreateShopMember,
        data,
    };
    return makeRequest(options);
}

export function triggerOtp(data: { phoneNumber: string }): Promise<IRCheckPhoneNumber> {
    const options = {
        ...apiEndPointShopMember.CheckPhoneNumber,
        data,
    };
    return makeRequest(options);
}

export function setPassword(data: { phoneNumber: string; password: string }): Promise<IRSetPassword> {
    const options = {
        ...apiEndPointShopMember.ShopMemberCreatePassword,
        data,
    };

    return makeRequest(options);
}

export function shopMemberLogin(data: { phoneNumber: string; password: string }): Promise<IRShopMemberLogin> {
    const options = {
        ...apiEndPointShopMember.ShopMemberLogin,
        data,
    };
    return makeRequest(options);
}

export function deleteShopMember(data: { _id: string }): Promise<IRShopMemberDelete> {
    const options = {
        ...apiEndPointShopMember.ShopMemberDelete,
        data,
    };
    return makeRequest(options);
}
//createShopMember({ phoneNumber: '9893137876', email: 'bothra.rajat08@gmail.com',name:"Rajat",role:'worker' });
