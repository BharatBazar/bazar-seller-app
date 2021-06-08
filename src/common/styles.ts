import { colorCode } from './color';
import { getHP, getWP } from './dimension';
import { FlexAlignType, TextStyle, ViewStyle, Platform } from 'react-native';

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

export const P = (percentage?: number): ViewStyle => {
    return { padding: getHP(percentage || 0.05) };
};

export const M = (percentage?: number): ViewStyle => {
    return { margin: getHP(percentage || 0.05) };
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

export const BW = (value: number): ViewStyle => {
    return { borderWidth: value };
};
export const BSW = (value: number): ViewStyle => {
    return { borderRightWidth: value, borderLeftWidth: value };
};
export const BBW = (value: number): ViewStyle => {
    return { borderWidth: value };
};
export const BTW = (value: number): ViewStyle => {
    return { borderBottomWidth: value };
};
export const BC = (color: string): ViewStyle => {
    return { borderColor: color };
};

export const FC = (color: string): TextStyle => {
    return { color };
};

export const FS = (fontSize: number): TextStyle => {
    return { fontSize };
};

export const ML = (percentage: number): ViewStyle => {
    return { marginLeft: getWP(percentage || 0.2) };
};
export const MR = (percentage: number): ViewStyle => {
    return { marginRight: getWP(percentage || 0.2) };
};

export const PL = (percentage: number): ViewStyle => {
    return { paddingLeft: getWP(percentage || 0.2) };
};

export const PR = (percentage: number): ViewStyle => {
    return { paddingRight: getWP(percentage || 0.2) };
};

export const provideShadowAndroid = (elevation?: number): ViewStyle => {
    return { elevation: elevation || 1 };
};

export const BBR = (value: number): ViewStyle => {
    return { borderBottomRightRadius: value, borderBottomLeftRadius: value };
};

export const BTR = (value: number): ViewStyle => {
    return { borderTopRightRadius: value, borderTopLeftRadius: value };
};
export const provideShadowIos = (
    shadowColor?: string,
    shadowOffSet?: {
        width: number;
        height: number;
    },
    shadowOpacity?: number,
    shadowRadius?: number,
): ViewStyle => {
    return {
        shadowColor: shadowColor || 'black',
        shadowOffset: shadowOffSet || { width: 0, height: 0 },
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius,
    };
};

export const borderinsideeffect = (borderWidth = 2, borderColor = colorCode.BLACKLOW(40)): ViewStyle => {
    return {
        borderTopWidth: borderWidth,
        borderRightWidth: borderWidth / 2,
        borderLeftWidth: borderWidth / 2,
        borderColor: borderColor,
    };
};

export const provideShadow = (height = 1, width = 0, shadowRadius = 2, shadowOpacity = 0.2, shadowColor = '#000000') =>
    Platform.OS == 'android'
        ? { elevation: 2 }
        : {
              shadowColor,
              shadowOffset: { width: width, height: height },
              shadowOpacity,
              shadowRadius,
          };
