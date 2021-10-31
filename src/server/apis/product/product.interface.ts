import { CommonApiResponse } from '../common.interface';

export enum productStatus {
    NOTCOMPLETED = 0,
    INVENTORY = 1,
    REJECTED = 2,
    OUTOFSTOCK = 3,
    WAITINGFORAPPROVAL = 4,
    LIVE = 5,
}

export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url
    type: classifierTypes; // It will refer to the type to which the filter belongs
    multiple: boolean; // Multiple values can selected or not
    distributionLevel: number; // 0 means filter only and 1 means It is top level distribution like color 2 means inside distibution that is size or etc.
    values: IClassifier[];
}

export enum classifierTypes {
    SIZE = 'size',
    COLOR = 'color',
    BRAND = 'brand',
    PATTERN = 'pattern',
    FIT = 'fit',
}
export interface IClassifier {
    _id: string;
    name: string; // Name should be any thing like value for example for size name will be 28, for color name will be red etc..
    description: string; // Description should be meta data or for example for color colorCode will be description, for size unit like cm or inch will be description
    image: string; // Can be provided for pattern or brand etc..
    type: classifierTypes; //type is the classifier to which the document belongs
}

export interface IProduct {
    //Also i need to think about how i will be dealing with language preferences how can i use multiple language.
    _id: string;
    shopId: string;

    //Above field will have predifined information about the size, unit etc.
    title: string;
    subTitle: string;
    colors: [IProductColor] | [string] | [];
    showPrice: boolean; //Whether dukandar wants to show price to customer or not
    returnAllowed: boolean;
    status: productStatus;
    rating: number;
    new: boolean; // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    newDeadline: string;
    description: string; // Will be a audio as audio is better to understand in common language
    discount: [number]; // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    discountDeadline: [Date];
    brand: string | IClassifier;
    fit: string | IClassifier;
    pattern: [string] | [IClassifier];
    note: string;
    descriptionCustomer: string;
    alreadyRejected: boolean;
}

export interface IProductColor {
    _id: string;
    parentId: string; // will refer to main table
    color: IClassifier | string; // will refer to color table
    sizes: [IProductSize]; // will refer to jeans size table
    photos: [string];
    includedColor: [IClassifier];
}

export interface IColorApp {
    _id: string;
    colorId: string; // id of the color classifier
    name: string;
    new: boolean;
    description: string;
    sizes: [IProductSize];
    photos: [string];
    includedColor: [IClassifier];
}

export interface IProductSize {
    _id: string;
    size: IClassifier | string; //Will refer to size table
    mrp: string;
    quantity: number;
    sp: string;
    parentId: string;
    itemId: string;
}

export interface ISizeApp {
    _id: string;
    sizeId: string; // id of the size clssifier
    name: string;
    description: string;
    mrp: string;
    quantity: number;
    sp: string;
    parentId: string;
    itemId: string;
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

export interface IProductStatus {
    count: number;
    name: string;
    _id: number;
    description: string;
}

export interface IRProductStatus extends CommonApiResponse {
    payload: IProductStatus;
}
