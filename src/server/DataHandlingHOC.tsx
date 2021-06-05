import React, { Component } from 'react';
import { View } from 'react-native';

export class DataHandling<Props, State> extends Component<Props, State> {
    handleError = (error) => {
        function isNetworkError(err) {
            return err.isAxiosError && !err.response;
        }

        let message = '';
        if (isNetworkError(error)) {
            message = 'Network Error';
            return { isNetworkError: true, message, status: 0 };
        } else {
            const data = error.response.data;

            message = data.message;
            return { isNetworkError: false, message, status: 0 };
        }
    };

    fetchData = async (handler: Function, data: Object, successCallback = () => {}, errorCallback = () => {}) => {
        try {
            const response = await handler(data);
            if (response.status == 1) {
                successCallback();
                return { ...response, success: true };
            }
        } catch (error) {
            errorCallback();
            return this.handleError(error);
        }
    };
}
