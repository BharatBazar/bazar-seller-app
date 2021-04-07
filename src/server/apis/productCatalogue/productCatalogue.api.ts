import { IapiEndPOint } from './../common.interface';
import { makeRequest } from '../common.interface';
import { IRGetProductCatalogue, categoryType } from './productCatalogue.interface';

const apiEndPointProductCatalogue: IapiEndPOint = {
    getProductCatalogue: {
        url: '/productCatalogue/getProducts',
        method: 'post',
    },
};

export async function getProductCatalogueAPI(data: { categoryType: categoryType }): Promise<IRGetProductCatalogue> {
    const options = {
        ...apiEndPointProductCatalogue.getProductCatalogue,
        data,
    };

    return makeRequest(options);
}
