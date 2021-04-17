import { getHP } from './../../../../../common/dimension';
import { PH, PV, BR } from './../../../../../common/styles';
import { StyleSheet } from 'react-native';

export const shadowWrapperStyle = [PH(0.1), PV(0.1)];

export const generalSpacing = getHP(0.2);

export const padHor = { paddingHorizontal: generalSpacing };
export const padVer = { paddingVertical: generalSpacing };
export const marTop = { marginTop: generalSpacing };
export const marHor = { marginHorizontal: generalSpacing };
export const borRad = BR(0.02);
export const border = {
    borderColor: '#C8C7CC',
    borderWidth: 0.5,
};
