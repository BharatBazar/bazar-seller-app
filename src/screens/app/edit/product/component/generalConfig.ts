import { ISizeApp } from './../../../../../server/apis/product/product.interface';
import {
    IProduct,
    productStatus,
    IProductColor,
    IProductSize,
    IRProductSize,
    IRProductColor,
} from '../../../../../server/apis/product/product.interface';
import {
    APIcreateProduct,
    APICreateProductColor,
    APICreateProductSize,
    APIDeleteFilter,
    APIdeleteProduct,
    APIDeleteProductColor,
    APIDeleteProductSize,
    APIupdateProduct,
    APIUpdateProductColor,
    APIUpdateProductSize,
} from '../../../../../server/apis/product/product.api';
import { getHP } from '../../../../../common/dimension';
import { PH, PV, BR } from '../../../../../common/styles';
export const shadowWrapperStyle = [PH(0.1), PV(0.1)];
export const generalSpacing = getHP(0.2);
export const padHor = { paddingHorizontal: generalSpacing };
export const padVer = { paddingVertical: generalSpacing };
export const marTop = { marginTop: generalSpacing };
export const marHor = { marginHorizontal: generalSpacing };
export const borRad = BR(0.02);
export const border = {
    borderColor: '#C8C7CC',
    borderWidth: 0.5,
};

export const generalProductSchema: Partial<IProduct> = {
    productCategory: '',
    productSubCategory1: '',
    SubCategory2: '',
    title: '',
    subTitle: '',
    colors: [],
    showPrice: false, //Whether dukandar wants to show price to customer or not
    productStatus: productStatus.NOTCOMPLETED,
    rating: undefined,
    new: false, // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    newDeadline: undefined,
    description: '', // Will be a audio as audio is better to understand in common language
    discount: undefined, // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    iscountDeadline: undefined,
};

export const generalProductColorSchema: IProductColor = {
    photos: [],
    sizes: [],
    includedColors: [],
    name: '',
    description: '',
    parentId: '',
    _id: '',
};

export const generalProductSizeSchema: ISizeApp = {
    name: '',
    description: '',
    mrp: '',

    quantity: 1,
    sp: '',
    parentId: '',
    _id: '',
};

export enum filterType {
    DropDown = 'DropDown',
    Tags = 'Tags',
    CheckBox = 'CheckBox',
}

export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url
    type: classifierTypes; // It will refer to the type to which the filter belongs
    multiple: boolean; // Multiple values can selected or not
    filterLevel: number; // 0 means filter only and 1 means It is top level distribution like color 2 means inside distibution that is size or etc.
    values: IClassifier[];
    active: boolean;
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
export async function createProduct(data: Partial<IProduct>) {
    return await APIcreateProduct(data);
}

export async function createProductColor(data: Partial<IProductColor>) {
    return await APICreateProductColor(data);
}

export async function createProductSize(data: Partial<IProductSize>) {
    return await APICreateProductSize(data);
}

export async function updateProduct(data: Partial<IProduct>) {
    return await APIupdateProduct(data);
}
export async function updateProductColor(data: Partial<IProductColor>) {
    return await APIUpdateProductColor(data);
}
export async function updateProductSize(data: Partial<IProductSize>) {
    return await APIUpdateProductSize(data);
}

export async function deleteProductColor(data: { _id: string; parentId: string }): Promise<IRProductColor> {
    return await APIDeleteProductColor(data);
}

export async function deleteProductSize(data: { _id: string; parentId: string }): Promise<IRProductSize> {
    return await APIDeleteProductSize(data);
}

export async function deleteProductFromServer(data: { _id: string }) {
    return await APIdeleteProduct(data);
}

export async function deleteJeansFilter(data: IProduct) {
    return await APIDeleteFilter(data);
}

export type IPostDataToServer = (a: Partial<IProduct>, b: () => void, c: (error: string) => void) => void;
