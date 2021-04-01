import axios, { AxiosRequestConfig } from 'axios';
import { apiEndPointShopMember, IRCreateShopMember, shopMemberRole } from './shopMember.interface';

export type ICreateShopMember =
    | {
          phoneNumber: string;
          email: string;
          name: string;
          role: 'owner';
      }
    | {
          phoneNumber: string;
          email: string;
          name: string;
          role: 'worker' | 'Co-owner';
          shop: string;
      };

export function createShopMember(data: ICreateShopMember): Promise<IRCreateShopMember> {
    const options = {
        ...apiEndPointShopMember.CreateShopMember,
        data,
    };
    return axios(options).then((response) => response.data);
}

createShopMember({ phoneNumber: '9893137876', email: 'bothra.rajat08@gmail.com' });
