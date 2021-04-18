import { Product, productStatus } from './../../../../../server/apis/product/product.interface';
import { getHP } from '../../../../../common/dimension';
import { PH, PV, BR } from '../../../../../common/styles';
import { StyleSheet } from 'react-native';

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

export const generalProductSchema: Product = {
    productCategory: '',
    productSubCategory1: '',
    productSubCategory2: '',
    productTitle: '',
    productSubtitle: '',
    productColor: [''],
    showPrice: false, //Whether dukandar wants to show price to customer or not
    productStatus: productStatus.CREATED,
    productRating: undefined,
    productNew: false, // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    productNewDeadline: undefined,
    productDescription: '', // Will be a audio as audio is better to understand in common language
    productDiscount: undefined, // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    productDiscountDeadline: undefined,
};
