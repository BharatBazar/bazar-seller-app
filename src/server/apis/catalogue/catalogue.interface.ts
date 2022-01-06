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
    categoryType: categoryType;
    subCategoryExist: boolean;
    parent: string;
    active: boolean;
    child: IProductCatalogue[];
    _id: string;
}

export interface IRGetProductCatalogue extends CommonApiResponse {
    payload: [IProductCatalogue];
}
