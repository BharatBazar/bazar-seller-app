import { mainColor } from '@app/common/color';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colorTransparency } from '../../common/styles';
//import {Bars} from "react-native-loader";

interface LoaderProps {
    backgroundColor?: string;
    containerStyle?: ViewStyle | ViewStyle[];
}

export default class Loader extends React.Component<LoaderProps, {}> {
    render() {
        const containerStyle = this.props.containerStyle;

        return (
            <View
                style={[
                    {
                        zIndex: 999,
                        elevation: 1000,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: this.props.backgroundColor || '#FFFFFF' + colorTransparency[50],
                    },
                    containerStyle,
                ]}
            >
                <ActivityIndicator color={mainColor} />
            </View>
        );
    }
}
