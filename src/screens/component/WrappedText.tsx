import React from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { FontFamily, fs11, fs12, fs16 } from '../../common';
import { getHP } from '../../common/dimension';

function WrappedText(props: {
    fontFamily?: string;

    textStyle?: any;
    fontSize?: number;

    textColor?: string;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;

    text: string;

    ellipsizeMode?: 'tail' | 'head' | 'middle' | 'clip' | undefined;
    numberOfLines?: number;
    containerStyle?: any;
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
    } = props;

    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            <Text
                style={[
                    {
                        fontFamily: fontFamily || FontFamily.RobotoRegular,
                        fontSize: fontSize || fs11,

                        fontWeight: fontWeight || 'normal',
                        color: textColor || '#000000',
                        flexWrap: 'wrap',
                        flexShrink: 1,
                    },
                    textStyle,
                ]}
                ellipsizeMode={ellipsizeMode || 'tail'}
                numberOfLines={numberOfLines || undefined}
            >
                {text}
            </Text>
        </SafeAreaView>
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
