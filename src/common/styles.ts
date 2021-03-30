import { colorCode } from './color';
import { getHP, getWP } from './dimension';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const colorTransparency = {
    10: '1A',
    20: '33',
    30: '4D',
    40: '66',
    50: '80',
    60: '99',
    70: 'B3',
    80: 'CC',
    90: 'E6',
    100: 'FF',
};

export const PH = (percentage?: number): ViewStyle => {
    return { paddingHorizontal: getWP(percentage || 0.5) };
};

export const PV = (percentage?: number): ViewStyle => {
    return { paddingVertical: getHP(percentage || 0.05) };
};
export const MH = (percentage?: number): ViewStyle => {
    return { marginHorizontal: getWP(percentage || 0.5) };
};
export const MV = (percentage?: number): ViewStyle => {
    return { marginVertical: getHP(percentage || 0.05) };
};

export const BR = (percentage?: number): ViewStyle => {
    return { borderRadius: getHP(percentage || 0.05) };
};

export const BGCOLOR = (color?: string): ViewStyle => {
    return { backgroundColor: color || '#ffffff' };
};

export const commonStyles = StyleSheet.create({
    cntr: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    alcjcc: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#000000' + colorTransparency[10],
    },
    aic: {
        alignItems: 'center',
    },
    jcc: {
        justifyContent: 'center',
    },
    fdr: {
        flexDirection: 'row',
    },
    spbtw: {
        justifyContent: 'space-between',
    },
    mv: {
        marginVertical: getHP(0.3),
    },
    paddH5: {
        paddingHorizontal: getHP(0.05),
    },
    paddV5: {
        paddingVertical: getHP(0.05),
    },
    margH5: {},
    absoluteBottomWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    textInputContainerStyle: {
        height: getHP(0.4),
        borderWidth: 0.2,
        width: '100%',
        borderRadius: getHP(0.03),
        //borderColor: colorCode.SAFFRON,
        flexDirection: 'row',
        marginTop: getHP(0.1),
    },
    buttonContainerStyle: {
        ...PH(),
        ...PV(),
        ...MH(),
        ...BR(),
        ...MV(),
        marginTop: getHP(0.2),
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
});
