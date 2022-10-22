import { CommonApiResponse } from './../common.interface';
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { IFilter, IRGetFilter, IRGetFilterWithValue } from './filter.interface';

export function createFilter(data: Partial<IFilter>): Promise<CommonApiResponse> {
    return axios.post('/filter/create', data);
}

export function updateFilter(data: Partial<IFilter>): Promise<CommonApiResponse> {
    return axios.patch('/filter/update', data);
}

export function activateFilter(data: Partial<IFilter>): Promise<CommonApiResponse> {
    return axios.patch('/filter/activate', data);
}

export function getFilter(data: Partial<IFilter>): Promise<IRGetFilter> {
    return axios.post('/filter/getAll', data);
}

export function getFilterWithValue(data: { shopId: string; parentId: string }): Promise<IRGetFilterWithValue> {
    return axios.post('/filter/getValueForAshop', data);
}

export function getClassifier(): Promise<{ payload: string[] }> {
    return axios.get('/filter/classifier');
}

export function deleteFilter(data: Partial<IFilter>): Promise<CommonApiResponse> {
    return axios.delete(`/filter/delete?_id=${data._id}`);
}

export function updateSelectedFilterValues(
    data: { _id: string } & { [key: string]: string },
): Promise<CommonApiResponse> {
    return axios.patch('/shop/saveFilterValues', data);
}
