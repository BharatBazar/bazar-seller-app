import axios from 'axios';
import { Platform } from 'react-native';
import { Storage, StorageItemKeys } from '../storage';

export const apiEndPoint = Platform.OS == 'ios' ? 'http://localhost:2112' : 'http://10.0.2.2:2112';

const handleError = (error: { isAxiosError: any; response: { data: any } }) => {
    function isNetworkError(err: { isAxiosError: any; response: { data: any } }) {
        return !!err.isAxiosError && !err.response;
    }

    let message = '';
    if (isNetworkError(error)) {
        message = 'Network Error';
    } else {
        const data = error.response.data;
        message = data.message;
    }
    return Promise.reject({ message });
};

export function initializeAxios() {
    axios.defaults.baseURL = apiEndPoint;

    axios.interceptors.response.use(
        (response) => {
            if (response.data) {
                return response.data;
            }
            return response;
        },
        function (error) {
            return handleError(error);
        },
    );
}

async function initializeAxiosUserToken() {
    const token = await Storage.getItem(StorageItemKeys.Token);
    axios.defaults.headers.common['Streak-Auth-Token'] = token;
}
