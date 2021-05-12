import axios from 'axios';

export const apiEndPoint = 'http://10.0.2.2:2112';

export async function setUpAxios() {
    axios.defaults.baseURL = apiEndPoint;
    // axios.interceptors.request.use((request) => {
    //     console.log('Starting Request', JSON.stringify(request.url, null, 2));
    //     return request;
    // });

    // const token = await Storage.getItem(StorageItemKeys.Token);
    // axios.defaults.headers.common['Streak-Auth-Token'] = token;
}

export const handleError = (error: any) => {
    function isNetworkError(err: any) {
        return err.isAxiosError && !err.response;
    }

    let message = '';
    if (isNetworkError(error)) {
        message = 'Network Error';
        return { success: false, isNetworkError: true, message };
    } else {
        const data = error.response.data;
        console.log('error', data);
        message = data.message;
        return { success: false, isNetworkError: false, message };
    }
};

export const commonApiHandler = async (options: any) => {
    try {
        console.log(options);
        const result = await axios(options);
        const { data } = result;
        if (!data.error) {
            return { success: true, data: data };
        }
    } catch (error) {
        return handleError(error);
    }
};
