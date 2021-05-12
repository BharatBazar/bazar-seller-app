import * as React from 'react';
import { Component } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { colorCode } from '../../common/color';
import { getWP } from '../../common/dimension';
import { absoluteBottomWrapper, ML, MR } from '../../common/styles';
import WrappedRectangleButton from './WrappedRectangleButton';
import WrappedText from './WrappedText';

export interface TextButtonProps {
    onPress: Function;
    text: string;
    containerStyle: ViewStyle | ViewStyle[];
    textProps?: any;
    isLoading?: boolean;
    disabled?: boolean;
    fade?: boolean;
    loaderColor?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
    onPress,
    text,
    containerStyle,
    textProps,
    isLoading,
    loaderColor,
    disabled,
    fade,
}) => {
    return (
        <WrappedRectangleButton
            containerStyle={[
                {
                    flexDirection: 'row',
                    backgroundColor: disabled ? colorCode.CHAKRALOW(50) : colorCode.CHAKRALOW(70),
                },
                containerStyle,
            ]}
            onPress={() => {
                if (disabled) {
                } else onPress();
            }}
        >
            {isLoading && (
                <>
                    <ActivityIndicator size={'small'} color={loaderColor || '#ffffff'} style={[MR(0.2)]} />
                    <View style={[absoluteBottomWrapper, { backgroundColor: '#FFFFFF66', top: 0 }]} />
                </>
            )}
            <WrappedText text={text} {...textProps} />
        </WrappedRectangleButton>
    );
};

export default TextButton;
