import { FilterInterface } from './../product/product.interface';
import { CommonApiResponse } from '../common.interface';
import { classifierTypes } from '../product/product.interface';
export interface IFilter {
    name: string; //Filter name Like waist size
    description: string; // Filter details descipbing about filter
    image: string; // Image url
    type: filterValuesTypes; // It will refer to the type to which the filter belongs
    multiple: boolean; // Multiple values can be selected or not
    //filterLevel: number; // 0 means filter only and 1 means It is top level distribution like color 2 means inside distibution that is size or etc.
    active: boolean; // It is used to active a filter and show it publically so that filter can through a verifying flow and all good then they are release to public

    /*
    filterActivatedCount: This is added to solve problem of incrementing totalFilterAdded count by 1
    it should only happen when filter is activated for the first time
    */
    filterActivatedCount: number;
    mandatory: boolean;
    customerHeading: string;
    customerDescription: string;
    customerImage: string;
    defaultSelectAll: boolean;
    parent: ObjectId;
    showSearch: boolean;
    key: string;
    filterLevel: number;
}

export interface IRGetFilter extends CommonApiResponse {
    payload: IFilter[];
}

export interface IRGetFilterWithValue extends CommonApiResponse {
    payload: {
        filter: FilterInterface[];
        distribution: FilterInterface[];
    };
}
