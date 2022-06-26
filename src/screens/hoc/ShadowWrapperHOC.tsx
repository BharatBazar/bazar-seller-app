import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, BR, PV, PH, provideShadow, MV, PA, DSP } from '../../common/styles';

export interface ScreenHOCProps {
    children: React.ReactNode;
    containerStyle?: ViewStyle | ViewStyle[];
}

const ShadowWrapperHOC: React.FC<ScreenHOCProps> = ({ children, containerStyle }) => {
    return <View style={[BGCOLOR(colorCode.WHITE), BR(0.15), PA(DSP), containerStyle]}>{children && children}</View>;
};

export default ShadowWrapperHOC;
