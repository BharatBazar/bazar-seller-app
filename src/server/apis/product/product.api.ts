import {
    IProductColor,
    IProduct,
    IProducts,
    IProductSize,
    IRProductColor,
    IRProductSize,
    IRProduct,
    IRProductStatus,
} from './product.interface';
import axios from 'axios';
import { choosenSize } from '@app/screens/app/product-edit/data-types';

//Product apis

export async function APIcreateProduct(data: IProduct): Promise<IRProduct> {
    return axios.post('/product/create', data);
}

export async function APIupdateProduct(data: IProduct): Promise<IRProduct> {
    return axios.patch('/product/update', data);
}

export async function APIdeleteProduct(data: { _id: string }): Promise<IRProduct> {
    return axios.delete('/product/delete?' + '_id=' + data._id);
}

export async function APIgetProduct(data: Partial<IProduct>): Promise<IRProduct> {
    return axios.post('/product/get', data);
}

export async function APIgetAllProduct(data: { query: Partial<IProduct> }): Promise<IProducts> {
    return axios.post('/product/getAll', data);
}

//Product color api

export async function APICreateProductColor(data: IProductColor): Promise<IRProductColor> {
    return axios.post('/product/color/create', data);
}

export async function APIDeleteProductColor(data: { _id: string; parentId?: string }): Promise<IRProductColor> {
    return axios.delete(
        '/product/color/delete?' + '_id=' + data._id + (data.parentId ? '&parentId=' + data.parentId : ''),
    );
}

export async function APIUpdateProductColor(data: IProductColor): Promise<IRProductColor> {
    return axios.patch('/product/color/update', data);
}

//Product size api

export async function APICreateProductSize(data: Partial<choosenSize>): Promise<IRProductSize> {
    return axios.post('/product/size/create', data);
}

export async function APIDeleteProductSize(data: { _id: string; parentId?: string }): Promise<IRProductSize> {
    return axios.delete(
        '/product/size/delete?' + '_id=' + data._id + (data.parentId ? '&parentId=' + data.parentId : ''),
    );
}

export async function APIUpdateProductSize(data: IProductSize): Promise<IRProductSize> {
    return axios.patch('/product/size/update', data);
}

export async function APIDeleteFilter(data: { _id: string; filter: {}; multiple: boolean }): Promise<IRProductSize> {
    return axios.patch('/product/delete/filter', data);
}

export async function APIProductStatus(data: { shopId: string }): Promise<IRProductStatus> {
    return axios.post('/product/status', data);
}
