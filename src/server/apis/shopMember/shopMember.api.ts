import axios from 'axios';
import { makeRequest } from '../common.interface';
import {
    apiEndPointShopMember,
    IRCreateShopMember,
    ICreateShopMember,
    IRCheckPhoneNumber,
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

//createShopMember({ phoneNumber: '9893137876', email: 'bothra.rajat08@gmail.com',name:"Rajat",role:'worker' });
