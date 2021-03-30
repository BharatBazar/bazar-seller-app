import * as React from 'react';
import { Component } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';

export interface WrappedRectangleButtonProps {
    containerStyle: ViewStyle[] | ViewStyle;
    children: React.ReactChild;
    onPress: Function;
}

const WrappedRectangleButton: React.SFC<WrappedRectangleButtonProps> = ({ containerStyle, children, onPress }) => {
    return (
        <Ripple
            android_ripple={{ color: '#00000033', radius: 200 }}
            onPress={() => {
                console.log('Fixes');
                onPress();
            }}
            style={containerStyle}
        >
            {children && children}
        </Ripple>
    );
};

export default WrappedRectangleButton;
