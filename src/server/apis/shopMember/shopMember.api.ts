import axios from 'axios';
import {
    IRCreateShopMember,
    ICreateShopMember,
    IRCheckPhoneNumber,
    IRSetPassword,
    IRShopMemberDelete,
    IRShopMemberLogin,
} from './shopMember.interface';

export async function createShopMember(data: Partial<ICreateShopMember>): Promise<IRCreateShopMember> {
    return axios.post('/shopMember/create', data);
}

export async function triggerOtp(data: { phoneNumber: string }): Promise<IRCheckPhoneNumber> {
    return axios.post('/shopMember/checkPhoneNumber', data);
}

export async function setPassword(data: { phoneNumber: string; password: string }): Promise<IRSetPassword> {
    return axios.post('/shopMember/createPassword', data);
}

export async function shopMemberLogin(data: { phoneNumber: string; password: string }): Promise<IRShopMemberLogin> {
    return axios.post('/shopMember/login', data);
}

export async function deleteShopMember(data: { _id: string }): Promise<IRShopMemberDelete> {
    return axios.delete('/shopMember/delete', data);
}
//createShopMember({ phoneNumber: '9893137876', email: 'bothra.rajat08@gmail.com',name:"Rajat",role:'worker' });
