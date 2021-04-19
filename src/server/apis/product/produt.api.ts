import { IapiEndPOint } from './../common.interface';
import { makeRequest } from '../common.interface';
import { IProductColor, IRProduct, IRProducts, Product } from './product.interface';

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
        url: '/product/getAll',
        method: 'post',
    },
};

export async function APIcreateProduct(data: Product): Promise<IRProduct> {
    const options = {
        ...apiEndPointProduct.createProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIupdateProduct(data: IRProduct): Promise<IRProduct> {
    const options = {
        ...apiEndPointProduct.updateProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIcreateProductColor(data: Product): Promise<IRProduct> {
    const options = {
        ...apiEndPointProduct.createProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIgetProduct(data: Product): Promise<IRProduct> {
    const options = {
        ...apiEndPointProduct.getProduct,
        data,
    };

    return makeRequest(options);
}

export async function APIgetAllProduct(data: { query: Product }): Promise<IRProducts> {
    const options = {
        ...apiEndPointProduct.getProducts,
        data,
    };

    return makeRequest(options);
}
