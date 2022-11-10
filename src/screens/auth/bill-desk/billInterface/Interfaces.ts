import { NavigationProps } from '@app/common';

export interface IBottomSheet {
    Add: Function;
    item: string[];
    modalHeight: Number | number;
    openContinueModal: string;
    showEnter: Boolean;
    setShowEnter: (value: boolean) => void;
    setItem: (value: []) => string[];
    findProduct: Function;
    id: number | string | undefined;
    route: any;
    refRBSheet: any;
    setId: (value: any) => any;
    setOpenContinueModal: (value: string) => void;
    ChangeQuantity: Function;
    allProducts: any;
    everyItem: any[];
    total: number;
    removeItem: Function;
    loading: boolean;
    setEveryItem: (value: any) => string[];
    ChangeSellingPrice: Function;
    price: number;
    quantity: number;
    navigation: NavigationProps;
}

export interface IUpdateBill {
    refRBSheet: Function | any;
    setQuantity: (value: any) => number | any;
    setPrice: (value: any) => number | any;
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
    item: IItem;
    removeItem: Function;
}

export interface IAdd_Product {
    refRBSheet: any;
    setItem: (value: any) => {};
    setId: (value: any) => number;
    setShowEnter: (value: boolean) => void;
    id: number | string | undefined;
    showEnter: Boolean;
    loading: boolean;
    item: string[];
    findProduct: Function;
    allProducts: IItem;
    quantity: number;
    price: number;
    ChangeQuantity: Function;
    Add: Function;
    ChangeSellingPrice: Function;
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
    ChangeQuantity: Function;
}

export interface IReviewProduct {
    item: IItem;
    removeItem: Function;
}

export interface IShowBillsRender {
    item: IItem;
    openUpdateSheet: Function;
}
