import { fs13 } from './index';
import { STATUS_BAR_HEIGHT } from './../screens/component/StatusBar';
import { colorCode } from './color';
import { getHP, getWP } from './dimension';
import { FlexAlignType, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

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

export const PT = (percentage?: number): ViewStyle => {
    return { paddingTop: getHP(percentage || 0.05) };
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

export const FLEX = (FLEX: number) => {
    return { flex: FLEX };
};

export const MT = (percentage: number): ViewStyle => {
    return { marginTop: getHP(percentage || 0.2) };
};

export const FDR = (value?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined): ViewStyle => {
    return { flexDirection: value || 'row' };
};

export const AIC = (value?: FlexAlignType): ViewStyle => {
    return { alignItems: value || 'center' };
};

export const JCC = (
    value?: 'center' | 'flex-start' | 'flex-end' | 'space-evenly' | 'space-between' | 'space-around' | undefined,
): ViewStyle => {
    return { justifyContent: value || 'center' };
};

export const WP = (widthPercentage: number): ViewStyle => {
    return { width: getWP(widthPercentage) };
};

export const W = (value: number): ViewStyle => {
    return { width: value };
};

export const HP = (heightPercentage: number): ViewStyle => {
    return { height: getHP(heightPercentage) };
};

export const H = (value: number): ViewStyle => {
    return { height: value };
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
        borderWidth: 0.18,
        width: '100%',
        borderRadius: getHP(0.03),
        borderColor: colorCode.BLACKLOW(30),
        flexDirection: 'row',
        marginTop: getHP(0.1),
        elevation: 2,
        shadowColor: colorCode.BLACKLOW(50),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        backgroundColor: colorCode.WHITE,
    },
    buttonContainerStyle: {
        ...PH(),
        ...PV(),

        ...BR(),

        marginTop: getHP(0.2),
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 2,
    },
    shadowLight: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    containerPadidng: {
        flex: 1,
        paddingTop: STATUS_BAR_HEIGHT,
    },
    borderStyle: {
        borderColor: colorCode.BLACKLOW(50),
        borderWidth: 1,
    },
});

export const componentProps = {
    buttonTextProps: {
        textColor: colorCode.WHITE,
    },
    textInputProps: {
        containerStyle: commonStyles.textInputContainerStyle,
        textInputStyle: { fontSize: fs13, color: '#000000' + colorTransparency[50] },
        paddingLeft: getWP(0.2),
    },
};
