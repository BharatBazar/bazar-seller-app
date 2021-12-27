import { BC, BGCOLOR, BR, BW, FDR, JCC, MH, ML, MR, MV, PH, PV } from '@app/common/styles';
import * as React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FontFamily, fs14 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { mainColor } from '@app/common/color';

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
}) => {
    return (
        <Ripple
            onPress={() => {
                if (onPress) {
                    onPress();
                }
            }}
            rippleContainerBorderRadius={300}
            style={[
                BW(borderWidth),
                BC(borderColor),
                BGCOLOR(backgroundColor || mainColor),
                {
                    paddingVertical: 12,
                    borderRadius: borderRadius || 6,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                },
                PH(0.4),
                !rightComponent ? { alignItems: 'center', justifyContent: 'center' } : {},
                FDR(),
                { overflow: 'hidden' },
                containerStyle,
            ]}
        >
            <WrappedText
                text={buttonText}
                textColor={buttonTextColor || '#FFFFFF'}
                fontSize={fs14}
                fontFamily={FontFamily.Medium}
                containerStyle={{ marginTop: 0 }}
            />
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
