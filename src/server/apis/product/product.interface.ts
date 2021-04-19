import { CommonApiResponse } from '../common.interface';

export enum productStatus {
    NOTCOMPLETED = 'Incomplete',
    READYTOROLLOUT = 'Rollout',
    OUTOFSTOCK = 'Out of stock',
    WAITINGFORAPPROVAL = 'Waiting for approval',
    LIVE = 'Live',
}

export interface Product {
    //Also i need to think about how i will be dealing with language preferences how can i use multiple language.
    _id: string;
    productCategory: string;
    productSubCategory1: string;
    productSubCategory2: string | undefined;
    //Above field will have predifined information about the size, unit etc.
    productTitle: string;
    productSubtitle: string;
    productColor: [string];
    showPrice: boolean; //Whether dukandar wants to show price to customer or not
    productStatus: productStatus;
    productRating?: number;
    productNew: boolean; // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    productNewDeadline?: Date;
    productDescription: string; // Will be a audio as audio is better to understand in common language
    productDiscount?: [number]; // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    productDiscountDeadline?: [Date];
}

export interface IRProduct {
    //Also i need to think about how i will be dealing with language preferences how can i use multiple language.

    productCategory?: string;
    productSubCategory1?: string;
    productSubCategory2?: string;
    //Above field will have predifined information about the size, unit etc.
    productTitle?: string;
    productSubtitle?: string;
    productColor?: [string];
    showPrice?: boolean; //Whether dukandar wants to show price to customer or not
    productStatus?: productStatus;
    productRating?: number;
    productNew?: boolean; // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    productNewDeadline?: Date;
    productDescription?: string; // Will be a audio as audio is better to understand in common language
    productDiscount?: [number]; // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    productDiscountDeadline?: [Date];
}

export interface IProductColor {
    productParent: string;
    productColor: string;
    productIncludedColor: [string];
    productPhotos: [string];
}

export interface IProductSize {
    productMrp: string;
    productSp: string;
    productQuantity: string;
    productSize: string;
    productParent: string;
}

export interface IRProducts extends CommonApiResponse {
    payload: IRProduct[];
}

export interface IProductColorModel extends Document {}
