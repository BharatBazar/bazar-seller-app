import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { getHP } from '../../common/dimension';

function WrappedText(props: {
    heading?: any;
    fontFamily?: string;
    headingText?: any;
    textStyle?: any;
    fontSize?: number;
    opacity?: any;
    textColor?: string;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
    icon?: any;
    iconBefore?: any;
    text: string;
    iconStyle?: any;
    containerStyle?: any;
}) {
    const {
        headingText,
        fontFamily,
        fontSize,
        fontWeight,

        textColor,
        text,

        containerStyle,

        textStyle,
    } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <Text
                style={[
                    {
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        fontWeight: fontWeight || 'normal',
                        color: textColor || '#000000',
                        flexWrap: 'wrap-reverse',
                    },
                    textStyle,
                ]}
            >
                {text || headingText}
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
