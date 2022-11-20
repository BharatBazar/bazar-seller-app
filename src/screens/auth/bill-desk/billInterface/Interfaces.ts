import { NavigationProps } from '@app/common';

export interface IBottomSheet {
    setEveryItem: (value: any) => string[];
    setOpenContinueModal: (value: string) => void;
    setAllProducts: (value: any) => any;
    modalHeight: Number | number;
    openContinueModal: string;
    route: any;
    refRBSheet: Function | any;
    allProducts: any;
    everyItem: any[];
    total: number;
    navigation: NavigationProps;
    preEditItem: any[];
}

export interface IUpdateBill {
    setQuantity: (value: any) => number | any;
    setPrice: (value: any) => number | any;
    refRBSheet: Function | any;
    updateBills: Function;
    price: number;
    quantity: number;
}

export interface IProductId {
    parentId: {
        image: string;
        name: string;
        type: string;
    };
    colors: any;
    sellerIdentificationPhoto: string;
}
export interface IItem {
    productId: IProductId;
    productName: string;
    quantity: number;
    price: number;
    _id: string;
    createdAt: string;
    products: string[];
    itemId: string;
}

export interface IBillProductRendering {
    setOpenContinueModal: (value: any) => void;
    setEveryItem: (value: any) => void;
    setModalHeight: (value: any) => void;
    setPreEditItem: (value: any) => void;
    item: IItem;
    refRBSheet: Function | any;
    everyItem: string[];
}

export interface IAdd_Product {
    setAllProducts: (value: any) => any;
    setEveryItem: (value: any) => any;
    refRBSheet: any;
    allProducts: IItem;
    everyItem: string[];
}

export interface IContinueModal {
    setEveryItem: (value: any) => {};
    refRBSheet: any;
    everyItem: any[];
    total: number;
    navigation: NavigationProps;
}

export interface IReviewProduct {
    item: IItem;
    removeItem: Function;
}

export interface IShowBillsRender {
    item: IItem;
    openUpdateSheet: Function;
}

export interface IPreEdit {
    setEveryItem: (value: any) => void;
    everyItem: any[];
    preEditItem: any;
    refRBSheet: any;
}
