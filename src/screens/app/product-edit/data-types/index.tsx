import { IFilter } from '@app/server/apis/product/product.interface';
import React from 'react';

export enum idCreationStatus {
    'NotCreated' = 0,
    'CreatedNotProvided' = 1,
    'CreatedAndProvided' = 2,
}

export interface choosenSize {
    _id: string;
    size: IFilter; //Will refer to size table
    // mrp: string; // Optional
    quantity: number;
    //sp: string; //Optional
    parentId: string; //will refer to corresponding color
    itemId: string; // simple id generated for product identification by user
    //idStatus: idCreationStatus; //
    shopId: string;
}

export interface choosenColor {
    _id: string;
    //color is in form of iFilter but it is used to detect whether a color is selected or
    //not in color array so basically its id will be compared
    color: IFilter;
    colors: IFilter[];
    photos: string[];
    parentId: string;
    sizes: choosenSize[];
    identificationPhoto: string;
}

export const provideDefaultColorState = (_id: string, color: IFilter, parentId: string): choosenColor => {
    return {
        color,
        sizes: [],
        photos: [],
        identificationPhoto: '',
        colors: [],
        _id,
        parentId: parentId,
    };
};

export const provideDefaultSizeState = (size: IFilter, parentId: string, shopId: string): choosenSize => {
    return {
        size: size,
        _id: '',
        quantity: 1,
        parentId: parentId,
        itemId: '',
        shopId: shopId,
    };
};

export const ProductIdContext = React.createContext({ productId: undefined, setProductId: (id: string) => {} });
