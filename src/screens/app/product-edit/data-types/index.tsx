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
    mrp: string;
    quantity: string;
    sp: string;
    parentId: string; //will refer to corresponding color
    itemId: string; // simple id generated for product identification by user
    idStatus: idCreationStatus;
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

export const ProductIdContext = React.createContext({ productId: undefined, setProductId: (id: string) => {} });
