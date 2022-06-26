import Loader from '@app/screens/component/Loader';
import * as React from 'react';
import { View } from 'react-native';
import { colorCode } from '../../../../../common/color';
import { BGCOLOR, colorTransparency } from '../../../../../common/styles';
import { padHor, padVer, marTop, borRad, border, marHor } from './generalConfig';

export interface ProductContainerProps {
    children: React.ReactNode;
    loader?: boolean;
}

const ProductContainer: React.SFC<ProductContainerProps> = ({ children, loader }) => {
    return (
        <View style={[border, padHor, padVer, marTop, borRad, marHor, BGCOLOR(colorCode.WHITE)]}>
            {children && children}
            {loader && <Loader backgroundColor={'#FFFFFF' + colorTransparency[50]} />}
        </View>
    );
};

export default ProductContainer;
