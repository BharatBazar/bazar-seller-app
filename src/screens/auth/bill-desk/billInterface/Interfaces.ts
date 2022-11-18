import { NavigationProps } from '@app/common';

export interface IBottomSheet {
    item: string[];
    modalHeight: Number | number;
    openContinueModal: string;
    showEnter: Boolean;
    setShowEnter: (value: boolean) => void;
    setItem: (value: []) => string[];
    id: number | string | undefined;
    route: any;
    refRBSheet: any;
    setId: (value: any) => any;
    setOpenContinueModal: (value: string) => void;
    changeQuantity: Function;
    allProducts: any;
    everyItem: any[];
    total: number;
    removeItem: Function;
    loading: boolean;
    setEveryItem: (value: any) => string[];
    price: number;
    quantity: number;
    navigation: NavigationProps;
    preEditItem: any[];
    errorText: string
    setErrorText: (value: any) => any
    setAllProducts:(value:any)=>any
    setQuantity:(value:any)=>any
    setPrice:(value:any)=>any
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
    changeQuantity: Function;
    add: Function;
    errorText: string,
    setErrorText: (value: any) => any
    setAllProducts:(value:any)=>any
    setQuantity:(value:any)=>any
    everyItem:string[]
    setEveryItem: (value: any) => any;
    setPrice: (value: any) => any;
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
