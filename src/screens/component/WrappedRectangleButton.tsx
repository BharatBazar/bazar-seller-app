import * as React from 'react';
import { Component } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';

export interface WrappedRectangleButtonProps {
    containerStyle: ViewStyle[] | ViewStyle;
    children: React.ReactChild;
}

const WrappedRectangleButton: React.SFC<WrappedRectangleButtonProps> = ({ containerStyle, children }) => {
    return (
        <Ripple android_ripple={{ color: '#00000033', radius: 200 }} onPress={() => {}} style={containerStyle}>
            {children && children}
        </Ripple>
    );
};

export default WrappedRectangleButton;
