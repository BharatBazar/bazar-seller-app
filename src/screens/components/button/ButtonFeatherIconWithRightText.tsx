import { FontFamily, fs10, fs12, fs14, fs16, fs20 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, FDR, JCC } from '@app/common/styles';
import WrappedRoundButton from '@app/screens/component/WrappedRoundButton';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/Feather';

export interface ButtonFeatherIconRightTextProps {
    onPress: Function;
    iconName: string;
    iconSize?: number;
    containerHeight?: number;
    iconColor?: string;
    containerStyle?: ViewStyle | ViewStyle[];
    buttonText: string;
    textStyle?: TextStyle;
    buttonTextColor?: string;
    fontSize?: number;
}

const ButtonFeatherIconRightText: React.FC<ButtonFeatherIconRightTextProps> = ({
    onPress,
    containerStyle,
    iconColor,
    iconName,
    iconSize,
    containerHeight,
    buttonText,
    textStyle,
    buttonTextColor,
    fontSize,
}) => {
    return (
        <Ripple
            style={[containerStyle, AIC(), FDR(), JCC()]}
            onPress={() => {
                onPress();
            }}
        >
            <Icon name={iconName} color={iconColor || mainColor} size={iconSize || fs16} />
            <WrappedText
                text={buttonText}
                textColor={buttonTextColor || '#FFFFFF'}
                fontSize={fontSize || fs10}
                fontFamily={FontFamily.Medium}
                containerStyle={{ marginTop: 0 }}
                textStyle={textStyle}
            />
        </Ripple>
    );
};

export default ButtonFeatherIconRightText;
