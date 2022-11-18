import { NavigationProps } from '@app/common';

export interface IBottomSheet {
    setEveryItem: (value: any) => string[];
    setOpenContinueModal: (value: string) => void;
    setErrorText: (value: any) => any
    setAllProducts:(value:any)=>any
    setQuantity:(value:any)=>any
    setPrice:(value:any)=>any
    modalHeight: Number | number;
    openContinueModal: string;
    route: any;
    refRBSheet: Function|any;
    changeQuantity: Function;
    allProducts: any;
    everyItem: any[];
    total: number;
    removeItem: Function;
    price: number;
    quantity: number;
    navigation: NavigationProps;
    preEditItem: any[];
    errorText: string
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
}

export interface IBillProductRendering {
    setOpenContinueModal: (value: any) => void;
    setEveryItem: (value: any) => void;
    setModalHeight: (value: any) => void;
    setPreEditItem: (value: any) => void;
    setErrorText: (value: any) => any
    item: IItem;
    removeItem: Function;
    refRBSheet: Function | any;
}

export interface IAdd_Product {
    setErrorText: (value: any) => any
    setAllProducts:(value:any)=>any
    setQuantity:(value:any)=>any
    setEveryItem: (value: any) => any;
    setPrice: (value: any) => any;
    refRBSheet: any;
    allProducts: IItem;
    quantity: number;
    price: number;
    changeQuantity: Function;
    errorText: string,
    everyItem:string[]
}

export interface IContinueModal {
    setEveryItem: (value: any) => {};
    refRBSheet: any;
    everyItem: any[];
    total: number;
    navigation: NavigationProps;
    removeItem: Function;
}

export interface IEdit {
    changeQuantity: Function;
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
