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
    APIdeleteProduct,
    APIDeleteProductColor,
    APIDeleteProductSize,
    APIupdateProduct,
    APIUpdateProductColor,
    APIUpdateProductSize,
} from '../../../../../server/apis/product/produt.api';

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

export const generalProductSchema: IProduct = {
    productCategory: '',
    productSubCategory1: '',
    productSubCategory2: '',
    productTitle: '',
    productSubtitle: '',
    productColor: [],
    showPrice: false, //Whether dukandar wants to show price to customer or not
    productStatus: productStatus.NOTCOMPLETED,
    productRating: undefined,
    productNew: false, // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    productNewDeadline: undefined,
    productDescription: '', // Will be a audio as audio is better to understand in common language
    productDiscount: undefined, // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    productDiscountDeadline: undefined,
};

export const generalProductColorSchema: IProductColor = {
    productPhotos: [],
    productSize: [],
    productIncludedColor: [],
    productColorName: '',
    productColorCode: '',
    parentId: '',
    _id: '',
};

export const generalProductSizeSchema: IProductSize = {
    productMrp: '',
    productSize: '',
    productQuantity: 1,
    productSp: '',
    parentId: '',
    _id: '',
};

export async function createProduct(data: IProduct) {
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

export type IPostDataToServer = (a: IProduct, b: () => void, c: (error: string) => void) => void;
