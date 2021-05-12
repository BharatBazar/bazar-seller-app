import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, commonStyles, BR, PV, PH, provideShadow } from '../../common/styles';

export interface ScreenHOCProps {
    children: React.ReactNode;
    containerStyle?: ViewStyle | ViewStyle[];
}

const ShadowWrapperHOC: React.FC<ScreenHOCProps> = ({ children, containerStyle }) => {
    return (
        <View style={[provideShadow(), BGCOLOR(colorCode.WHITE), BR(0.2), PH(0.5), PV(0.3), containerStyle]}>
            {children && children}
        </View>
    );
};

export default ShadowWrapperHOC;
