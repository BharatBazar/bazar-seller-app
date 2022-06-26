import { FontFamily, fs12 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';

interface TextRippleButtonProps {
    containerStyle?: ViewStyle | ViewStyle[];
    onPress: Function;
    buttonText: string;
    fontSize: number;
    textStyle?: TextStyle;
    rippleColor?: string;
    buttonTextColor?: string;
}

const TextRippleButton: React.FunctionComponent<TextRippleButtonProps> = ({
    buttonText,
    onPress,
    buttonTextColor,
    containerStyle,
    fontSize,
    textStyle,
    rippleColor,
}) => {
    return (
        <Ripple
            rippleColor={rippleColor}
            onPress={() => {
                if (onPress) {
                    onPress();
                }
            }}
            style={containerStyle}
        >
            <WrappedText
                text={buttonText}
                textColor={buttonTextColor}
                fontSize={fontSize}
                fontFamily={FontFamily.Medium}
                containerStyle={{ marginTop: 0 }}
                textStyle={textStyle}
            />
        </Ripple>
    );
};

export default TextRippleButton;
