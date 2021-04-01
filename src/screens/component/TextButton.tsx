import * as React from 'react';
import { Component } from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { colorCode } from '../../common/color';
import { getWP } from '../../common/dimension';
import WrappedRectangleButton from './WrappedRectangleButton';
import WrappedText from './WrappedText';

export interface TextButtonProps {
    onPress: Function;
    text: string;
    containerStyle: ViewStyle | ViewStyle[];
    textProps?: any;
    isLoading?: boolean;
    disabled?: boolean;
}

const TextButton: React.FC<TextButtonProps> = ({ onPress, text, containerStyle, textProps, isLoading, disabled }) => {
    return (
        <WrappedRectangleButton
            containerStyle={[
                containerStyle,
                { flexDirection: 'row', backgroundColor: disabled ? colorCode.CHAKRALOW(50) : colorCode.CHAKRALOW(70) },
            ]}
            onPress={() => {
                if (disabled) {
                } else onPress();
            }}
        >
            <WrappedText text={text} {...textProps} />
            {isLoading && <ActivityIndicator size={'small'} style={{ marginLeft: getWP(0.3) }} />}
        </WrappedRectangleButton>
    );
};

export default TextButton;
