import { addressType } from './address.interface';
import Axios from 'axios';

export async function createAddress(data) {
    return Axios.post('/address/create', data);
}

export async function checkPincode(pincode: string) {
    return Axios.post('/address/checkPincode', { name: pincode });
}

export async function deleteAddress(data) {
    return Axios.delete('/address/delete', data);
}

export async function updateAddress(data) {
    return Axios.post('/address/update', data);
}

export async function getAddress(data: { addressType: addressType; parent?: string }) {
    return Axios.post('/address/getAll', data);
}
