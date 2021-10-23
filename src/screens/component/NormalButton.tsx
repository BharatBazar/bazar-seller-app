import { FontFamily } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, BR, JCC } from '@app/common/styles';
import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';
import WrappedText from './WrappedText';

interface NormalButtonProps {
    buttonText: string;
    onPress: Function;
    containerStyle?: ViewStyle | ViewStyle[];
    backgroundColor?: string;
    fontSize?: number;
    textStyle?: TextStyle;
    textColor?: string;
    marginTop?: number;
    height?: number;
}

const NormalButton: React.FunctionComponent<NormalButtonProps> = ({
    buttonText,
    onPress,
    containerStyle,
    backgroundColor,
    fontSize,
    textStyle,
    textColor,
    marginTop,
    height,
}) => {
    return (
        <Ripple
            onPress={() => {
                onPress();
            }}
            style={[
                { height: height || 40, backgroundColor: backgroundColor || mainColor, marginTop },
                AIC(),
                JCC(),
                BR(0.05),

                containerStyle,
            ]}
        >
            <WrappedText
                text={buttonText}
                fontFamily={FontFamily.RobotoMedium}
                fontSize={fontSize}
                textStyle={textStyle}
                textColor={textColor || '#FFFFFF'}
            />
        </Ripple>
    );
};

export default NormalButton;
