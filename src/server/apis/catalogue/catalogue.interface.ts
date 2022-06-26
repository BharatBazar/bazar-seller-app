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
    parent: IProductCatalogue;
    active: boolean;
    child: IProductCatalogue[];
    path: IProductCatalogue[];

    _id: string;
}

export interface IRGetProductCatalogue extends CommonApiResponse {
    payload: [IProductCatalogue];
}
