import React, { Component } from 'react';
import { View } from 'react-native';

export class DataHandling extends Component {
    state = {
        isLoading: false,
    };

    setLoader = (isLoading: boolean) => {
        this.setState({ isLoading });
    };

    fetchData = async () => {
        try {
            const response = await apiHandler(routeName, data);
            if (response.success) {
                return response;
            } else {
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.log(error);
        }
    };

    returnLoader = () => {
        return this.state.isLoading ? <View /> : <View />;
    };
}
