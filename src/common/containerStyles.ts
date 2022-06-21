import { fs13 } from './index';
import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { colorCode, black20, black50, errorColor } from './color';
import { getHP, getWP } from './dimension';
import { PH, PV, BR, colorTransparency } from './styles';

export const shadowWrapperStyle = [PH(0.1), PV(0.1)];

export const generalSpacing = getHP(0.3);

export const textInputContainerStyle: StyleProp<TextStyle> = {
    height: getHP(0.55),
    borderWidth: 1,
    borderRadius: getHP(0.05),
    borderColor: '#8a8a8a33',
    padding: 0,
    flexDirection: 'row',
    marginTop: getHP(0.1),
    backgroundColor: colorCode.WHITE,
    color: '#000',
};

export const buttonContainerStyle: ViewStyle = {
    // ...PH(0.1),
    // ...PV(0.1),

    ...BR(),
    height: getHP(0.55),
    marginTop: getHP(0.2),
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colorCode.CHAKRALOW(70),
};

export const absoluteBottomWrapper: ViewStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
};
export const componentProps = {
    buttonTextProps: {
        textColor: colorCode.WHITE,
    },
    textInputProps: {
        containerStyle: textInputContainerStyle,
        textInputStyle: { fontSize: fs13, color: black50 },
        paddingLeft: getWP(0.2),
    },
};

export const AlertBox = (color?: string): ViewStyle => {
    return {
        borderWidth: 1,
        borderColor: errorColor || color,
        backgroundColor: (errorColor || color) + colorTransparency[10],
        borderRadius: 5,
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        marginTop: getHP(0.1),
    };
};
