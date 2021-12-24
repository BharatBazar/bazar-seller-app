import { BC, BGCOLOR, BR, BW, FDR, JCC, MH, ML, MR, MV, PH, PV } from '@app/common/styles';
import * as React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { FontFamily, fs14 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';

interface RightComponentButtonWithLeftTextProps {
    borderColor?: string;
    backgroundColor: string;
    containerStyle?: ViewStyle | ViewStyle[];
    onPress: Function;
    buttonText: string;
    rightComponent?: Function;
    buttonTextColor: string;
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
                BGCOLOR(backgroundColor),
                {
                    paddingVertical: 12,
                    borderRadius: borderRadius || 200,
                    marginTop: marginTop,
                    marginLeft: marginLeft,
                },
                PH(0.4),

                FDR(),
                { overflow: 'hidden' },
                containerStyle,
            ]}
        >
            <WrappedText
                text={buttonText}
                textColor={buttonTextColor}
                fontSize={fs14}
                fontFamily={FontFamily.Medium}
                containerStyle={{ marginTop: 0 }}
            />
            {rightComponent && rightComponent()}
        </Ripple>
    );
};

export default RightComponentButtonWithLeftText;
