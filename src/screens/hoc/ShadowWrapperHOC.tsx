import * as React from 'react';
import { View } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, commonStyles, BR, PV, PH } from '../../common/styles';

export interface ScreenHOCProps {
    children: React.ReactChild;
}

const ShadowWrapperHOC: React.FC<ScreenHOCProps> = ({ children }) => {
    return (
        <View style={[commonStyles.shadow, BGCOLOR(colorCode.WHITE), BR(0.2), PH(0.5), PV(0.3)]}>
            {children && children}
        </View>
    );
};

export default ShadowWrapperHOC;
