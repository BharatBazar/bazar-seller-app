import { addressType } from './address.interface';
import Axios from 'axios';

export async function createAddress(data) {
    return Axios.post('/address/create', data).then((r) => r.data);
}

export async function deleteAddress(data) {
    return Axios.delete('/address/delete', data).then((r) => r.data);
}

export async function updateAddress(data) {
    return Axios.post('/address/update', data).then((r) => r.data);
}

export async function getAddress(data: { addressType: addressType; parent?: string }) {
    return Axios.post('/address/getAll', data).then((r) => r.data);
}
