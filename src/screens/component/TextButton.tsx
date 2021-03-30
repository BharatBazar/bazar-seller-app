import * as React from 'react';
import { Component } from 'react';
import { ViewStyle } from 'react-native';
import WrappedRectangleButton from './WrappedRectangleButton';
import WrappedText from './WrappedText';

export interface TextButtonProps {
    onPress: Function;
    text: string;
    containerStyle: ViewStyle | ViewStyle[];
    textProps?: any;
}

const TextButton: React.FC<TextButtonProps> = ({ onPress, text, containerStyle, textProps }) => {
    return (
        <WrappedRectangleButton
            containerStyle={containerStyle}
            onPress={() => {
                onPress();
            }}
        >
            <WrappedText text={text} {...textProps} />
        </WrappedRectangleButton>
    );
};

export default TextButton;
