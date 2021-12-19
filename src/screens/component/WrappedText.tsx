import React from 'react';
import { Image, Text, StyleSheet, View, TextStyle } from 'react-native';
import { FontFamily, fs11, fs12, fs16 } from '../../common';
import { getHP } from '../../common/dimension';

function WrappedText(props: {
    fontFamily?: string;

    textStyle?: TextStyle;
    fontSize?: number;

    textColor?: string;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;

    text: string;

    ellipsizeMode?: 'tail' | 'head' | 'middle' | 'clip' | undefined;
    numberOfLines?: number;
    containerStyle?: any;
    textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
}) {
    const {
        fontFamily,
        fontSize,
        fontWeight,

        textColor,
        text,

        containerStyle,
        ellipsizeMode,
        numberOfLines,
        textStyle,
        textAlign,
    } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <Text
                style={[
                    {
                        fontFamily: fontFamily || FontFamily.Regular,
                        fontSize: fontSize || fs11,

                        fontWeight: fontWeight || 'normal',
                        color: textColor || '#000000',
                        flexWrap: 'wrap',
                        textAlign: textAlign || 'auto',
                        flexShrink: 1,
                    },
                    textStyle,
                ]}
                ellipsizeMode={ellipsizeMode || 'tail'}
                numberOfLines={numberOfLines || undefined}
            >
                {text}
            </Text>
        </View>
    );
}

export default WrappedText;

const styles = StyleSheet.create({
    icons: {
        height: getHP(0.15),
        width: getHP(0.15),
        resizeMode: 'contain',
    },
    container: {
        justifyContent: 'center',
    },
});
