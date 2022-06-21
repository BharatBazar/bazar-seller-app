import { ViewStyle, TextStyle } from 'react-native';
import { FontFamily } from '.';
import { getHP } from './dimension';

export const GENERAL_PADDING = 15;
export const GENERAL_HEIGHT = getHP(0.8);
export const GENERAL_BORDER_RADIUS = 15;

export const PHA = (value?: number | string): ViewStyle => {
    return { paddingHorizontal: value || GENERAL_PADDING };
};

export const PA = (value?: number | string): ViewStyle => {
    return { padding: value || GENERAL_PADDING };
};

export const PBA = (value?: number | string): ViewStyle => {
    return { paddingBottom: value || GENERAL_PADDING };
};

export const PVA = (value?: number | string): ViewStyle => {
    return { paddingVertical: value || GENERAL_PADDING };
};

export const PTA = (value?: number): ViewStyle => {
    return { paddingTop: value || GENERAL_PADDING };
};

export const BTRA = (value?: number): ViewStyle => {
    return {
        borderTopRightRadius: value || GENERAL_BORDER_RADIUS,
        borderTopLeftRadius: value || GENERAL_BORDER_RADIUS,
    };
};

export const MHA = (value?: number | string): ViewStyle => {
    return { marginHorizontal: value || GENERAL_PADDING };
};
export const MVA = (value?: number | string): ViewStyle => {
    return { marginVertical: value || GENERAL_PADDING };
};

export const MTA = (value?: number | string): ViewStyle => {
    return { marginTop: value || GENERAL_PADDING };
};
export const MBA = (value?: number | string): ViewStyle => {
    return { marginBottom: value || GENERAL_PADDING };
};

export const MLA = (value?: number | string): ViewStyle => {
    return { marginLeft: value || GENERAL_PADDING };
};

export const MRA = (value?: number | string): ViewStyle => {
    return { marginRight: value || GENERAL_PADDING };
};
export const PLA = (value?: number | string): ViewStyle => {
    return { paddingLeft: value || GENERAL_PADDING };
};

export const PRA = (value?: number | string): ViewStyle => {
    return { paddingRight: value || GENERAL_PADDING };
};

export const BRA = (value?: number): ViewStyle => {
    return { borderRadius: value || GENERAL_PADDING };
};

export const HA = (value?: number): ViewStyle => {
    return { height: value || GENERAL_HEIGHT };
};

export const WA = (value?: number): ViewStyle => {
    return { width: value || '100%' };
};

export const TA = (value?: 'auto' | 'left' | 'right' | 'center' | 'justify'): TextStyle => {
    return { textAlign: value || 'left' };
};

export const POS = (
    pos: 'absolute' | 'relative',
    left = undefined,
    right = undefined,
    top = undefined,
    bottom = undefined,
): ViewStyle => {
    return { position: pos || 'absolute', left, top, right, bottom };
};

export type font_family_type = 'Regular' | 'Thin' | 'Light' | 'Medium' | 'Black' | 'Bold';

export const FF = (fontFamily: font_family_type): TextStyle => {
    return { fontFamily: FontFamily[fontFamily] };
};
