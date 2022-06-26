import { IapiEndPOint } from '../common.interface';
import { makeRequest } from '../common.interface';
import { IRGetProductCatalogue, categoryType, IProductCatalogue } from './catalogue.interface';
import axios from 'axios';

const apiEndPointProductCatalogue: IapiEndPOint = {
    getProductCatalogue: {
        url: '/catalogue/get',
        method: 'post',
    },
};

export async function getProductCatalogueAPI(data: Partial<IProductCatalogue>): Promise<IRGetProductCatalogue> {
    return axios.post('/catalogue/get', data);
}
