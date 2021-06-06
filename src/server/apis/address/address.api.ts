import { addressType, ICheckPincode } from './address.interface';
import Axios from 'axios';
import { CommonApiResponse } from '../common.interface';

export async function checkPincode(pincode: string): Promise<ICheckPincode> {
    return Axios.post('/address/checkPincode', { name: pincode });
}

export async function getAddress(data: { addressType: addressType; parent?: string }): Promise<CommonApiResponse> {
    return Axios.post('/address/getAll', data);
}
