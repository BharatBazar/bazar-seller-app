import { BC, BGCOLOR, BR, BW, colorTransparency, FDR, JCC, MH, ML, MR, MV, PH, PV } from '@app/common/styles';
import * as React from 'react';
import { View, StyleSheet, Image, ViewStyle, Platform, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FontFamily, fs14 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { mainColor } from '@app/common/color';
import { PHA, PVA } from '@app/common/stylesheet';

interface RightComponentButtonWithLeftTextProps {
    borderColor?: string;
    backgroundColor?: string;
    containerStyle?: ViewStyle | ViewStyle[];
    onPress: Function;
    buttonText: string;
    rightComponent?: Function;
    buttonTextColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    marginTop?: number;
    marginLeft?: number;
    fontSize?: number;
    disabled?: boolean;
}

const RightComponentButtonWithLeftText: React.FunctionComponent<RightComponentButtonWithLeftTextProps> = ({
    backgroundColor,
    borderColor,
    buttonText,
    buttonTextColor,
    children,
    containerStyle,
    rightComponent,
    onPress,
    borderRadius,
    borderWidth,
    marginTop,
    marginLeft,
    disabled,
    fontSize,
}) => {
    const buttonColor = backgroundColor || mainColor;
    return (
        <Ripple
            onPress={() => {
                if (onPress && !disabled) {
                    onPress();
                }
            }}
            rippleContainerBorderRadius={10}
            style={[
                BW(borderWidth),
                BC(borderColor),
                BGCOLOR(buttonColor),
                {
                    borderRadius: borderRadius || 6,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                },
                PVA(),
                PHA(),
                !rightComponent ? { alignItems: 'center', justifyContent: 'center' } : {},
                FDR(),
                { overflow: 'hidden' },
                containerStyle,
                { opacity: disabled ? 0.4 : 1 },
            ]}
        >
            <Text
                style={{
                    padding: 0,
                    includeFontPadding: false,
                    color: buttonTextColor || '#FFFFFF',
                    fontSize: fontSize || fs14,
                    fontFamily: FontFamily.Medium,
                }}
            >
                {buttonText}
            </Text>
            {rightComponent && rightComponent()}
        </Ripple>
    );
};

export default React.memo(
    RightComponentButtonWithLeftText,
    (prevProps: RightComponentButtonWithLeftTextProps, nextProps: RightComponentButtonWithLeftTextProps) => {
        return prevProps.onPress == nextProps.onPress && prevProps.buttonText == nextProps.buttonText;
    },
);
