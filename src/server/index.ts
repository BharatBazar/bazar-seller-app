import axios from 'axios';
import { Platform } from 'react-native';
import { Storage, StorageItemKeys } from '../storage';

export const apiEndPoint = Platform.OS == 'ios' ? 'http://localhost:2112' : 'http://10.0.2.2:2112';

const handleError = (error: { isAxiosError: any; response: { data: any } }) => {
    let message = '';

    const { data } = error.response;
    message = data.message;

    return Promise.reject({ message });
};

function isNetworkError(err: { isAxiosError: any; response: { data: any } }) {
    return !!err.isAxiosError && !err.response;
}

export function initializeAxios() {
    axios.defaults.baseURL = apiEndPoint;

    if (axios.interceptors.response.handlers.length == 0) {
        axios.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                if (isNetworkError(error)) {
                    const message = 'Network Error';
                    return Promise.reject({ message });
                } else {
                    return handleError(error);
                }
            },
        );
    }
}

async function initializeAxiosUserToken() {
    const token = await Storage.getItem(StorageItemKeys.Token);
    axios.defaults.headers.common['Streak-Auth-Token'] = token;
}
