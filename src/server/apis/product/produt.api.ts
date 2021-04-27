import { IapiEndPOint } from './../common.interface';
import { makeRequest } from '../common.interface';
import {
    IProductColor,
    IProduct,
    IProducts,
    IProductSize,
    IRProductColor,
    IRProductSize,
    IRProduct,
} from './product.interface';
import axios from 'axios';

const apiEndPointProduct: IapiEndPOint = {
    createProduct: {
        url: '/product/create',
        method: 'post',
    },
    updateProduct: {
        url: '/product/update',
        method: 'patch',
    },
    getProduct: {
        url: '/product/get',
        method: 'post',
    },
    getProducts: {
        url: '/product/getAllProduct',
        method: 'post',
    },
    deleteProduct: {
        url: '/product/delete',
        method: 'delete',
    },
};

//Product apis

export async function APIcreateProduct(data: IProduct): Promise<IRProduct> {
    const options = {
        ...apiEndPointProduct.createProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIupdateProduct(data: IProduct): Promise<IRProduct> {
    const options = {
        ...apiEndPointProduct.updateProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIdeleteProduct(data: { _id: string }): Promise<IRProduct> {
    return makeRequest({ url: '/product/delete', method: 'delete', data });
}

export async function APIgetProduct(data: IProduct): Promise<IProduct> {
    const options = {
        ...apiEndPointProduct.getProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIgetAllProduct(data: { query: IProduct }): Promise<IProducts> {
    const options = {
        ...apiEndPointProduct.getProducts,
        data,
    };

    return makeRequest(options);
}

//Product color api

export async function APICreateProductColor(data: IProductColor): Promise<IRProductColor> {
    return axios.post('/productColor/create', data).then((r) => r.data);
}

export async function APIDeleteProductColor(data: { _id: string; parentId?: string }): Promise<IRProductColor> {
    return axios
        .delete('/productColor/delete?' + '_id=' + data._id + (data.parentId ? '&parentId=' + data.parentId : ''))
        .then((r) => r.data);
}

export async function APIUpdateProductColor(data: IProductColor): Promise<IRProductColor> {
    return axios.patch('/productColor/update', data).then((r) => r.data);
}

//Product size api

export async function APICreateProductSize(data: IProductSize): Promise<IRProductSize> {
    return axios.post('/productSize/create', data).then((r) => r.data);
}

export async function APIDeleteProductSize(data: { _id: string; parentId?: string }): Promise<IRProductSize> {
    return axios
        .delete('/productSize/delete?' + '_id=' + data._id + (data.parentId ? '&parentId=' + data.parentId : ''))
        .then((r) => r.data);
}

export async function APIUpdateProductSize(data: IProductSize): Promise<IRProductSize> {
    return axios.patch('/productSize/update', data).then((r) => r.data);
}
