import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { colorCode } from '../../../../../common/color';
import { BGCOLOR } from '../../../../../common/styles';
import { padHor, padVer, marTop, borRad, border, marHor } from './styles';

export interface ProductContainerProps {
    children: React.ReactNode;
}

const ProductContainer: React.SFC<ProductContainerProps> = ({ children }) => {
    return (
        <View style={[border, padHor, padVer, marTop, borRad, marHor, BGCOLOR(colorCode.WHITE)]}>
            {children && children}
        </View>
    );
};

export default ProductContainer;
