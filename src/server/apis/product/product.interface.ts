import { IProductColor } from './product.interface';
import { CommonApiResponse } from '../common.interface';

export enum productStatus {
    NOTCOMPLETED = 'Incomplete',
    READYTOROLLOUT = 'Rollout',
    OUTOFSTOCK = 'Out of stock',
    WAITINGFORAPPROVAL = 'Waiting for approval',
    LIVE = 'Live',
}

export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url
    type: classifierTypes; // It will refer to the type to which the filter belongs
    multiple: boolean; // Multiple values can selected or not
    distributionLevel: number; // 0 means filter only and 1 means It is top level distribution like color 2 means inside distibution that is size or etc.
}

export enum classifierTypes {
    SIZE = 'Size',
    COLOR = 'Color',
    BRAND = 'Brand',
    PATTERN = 'Pattern',
    FIT = 'Fit',
}
export interface IClassfier {
    name: string; // Name should be any thing like value for example for size name will be 28, for color name will be red etc..
    description: string; // Description should be meta data or for example for color colorCode will be description, for size unit like cm or inch will be description
    image: string; // Can be provided for pattern or brand etc..
    type: classifierTypes; //type is the classifier to which the document belongs
}

export interface IProduct {
    //Also i need to think about how i will be dealing with language preferences how can i use multiple language.
    _id?: string;
    shopId: string;

    //Above field will have predifined information about the size, unit etc.
    title?: string;
    subTitle?: string;
    colors: [Partial<IProductColor>] | [];
    showPrice?: boolean; //Whether dukandar wants to show price to customer or not
    productStatus?: productStatus;
    rating?: number;
    new?: boolean; // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    newDeadline?: Date;
    description?: string; // Will be a audio as audio is better to understand in common language
    discount?: [number]; // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    discountDeadline?: [Date];
    brand: string | IFilter;
    fit: string | IFilter;
    pattern?: [string] | [IFilter];
}

export interface IProductColor {
    _id: string;
    parentId: string; // will refer to main table
    color: string | IFilter; // will refer to color table
    sizes: [string]; // will refer to jeans size table
    photos: [string];
    includedColor: [string] | [IFilter];
}

export interface IProductSize {
    _id: string;
    size: string | IFilter; //Will refer to size table
    mrp: string;
    quantity: string;
    sp: string;
    parentId: string;
}

export interface IRProduct extends CommonApiResponse {
    payload: IProduct;
}

export interface IProducts extends CommonApiResponse {
    payload: {
        payload: IProduct[];
        lastTime: string;
        searchCount: number;
    };
}

export interface IRProductColor extends CommonApiResponse {
    payload: IProductColor;
}
export interface IRProductSize extends CommonApiResponse {
    payload: IProductSize;
}
