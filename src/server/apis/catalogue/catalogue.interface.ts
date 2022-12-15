import { CommonApiResponse, IapiEndPOint } from '../common.interface';

export enum categoryType {
    Category = 'Category',
    SubCategory = 'SubCategory',
    SubCategory1 = 'SubCategory1',
}

export interface IProductCatalogue {
    name: string;
    description: string;
    image: string;

    customer_name: string;
    customer_description: string;
    customer_image: string;
    subCategoryExist: boolean;
    parent: string | IProductCatalogue;
    active: boolean;
    child: string[] | IProductCatalogue[];
    path: string[] | IProductCatalogue[];
    totalFilterAdded: number;

    _id: string;
}

export interface IRGetProductCatalogue extends CommonApiResponse {
    payload: [IProductCatalogue];
}
