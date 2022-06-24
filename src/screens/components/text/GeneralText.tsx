import { FontFamily, font_family_type } from '@app/common';
import { GENERAL_HEIGHT } from '@app/common/stylesheet';
import React from 'react';
import { Image, Text, View, StyleSheet, TextStyle } from 'react-native';

function GeneralText(props: {
    heading?: any;
    fontFamily?: font_family_type;
    headingText?: any;
    textStyle?: TextStyle | TextStyle[];
    fontSize?: number;
    opacity?: any;
    textColor?: string;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
    textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
    iconAfter?: any;
    iconAfterStyle?: any;
    iconBefore?: any;
    text?: string;
    iconBeforeStyle?: any;
    lineHeight?: number;
    containerStyle?: any;
    numberOfLines?: number;
}) {
    const {
        headingText,
        fontFamily,
        fontSize,
        fontWeight,

        textColor,
        text,

        containerStyle,
        iconBefore,
        textStyle,
        lineHeight,
        numberOfLines,
        iconAfter,
        iconAfterStyle,
        iconBeforeStyle,
        textAlign,
    } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            {iconBefore ? (
                <View style={{ justifyContent: 'center' }}>
                    <Image source={iconBefore} style={[styles.icons, iconBeforeStyle]} />
                </View>
            ) : (
                <View />
            )}

            <Text
                //adjustsFontSizeToFit
                numberOfLines={numberOfLines}
                style={[
                    {
                        fontFamily: fontFamily ? FontFamily[fontFamily] : FontFamily['Regular'],
                        fontSize: fontSize,
                        fontWeight: fontWeight || '600',
                        color: textColor || '#000000',
                        flexWrap: 'wrap',
                        lineHeight: lineHeight,

                        includeFontPadding: false,
                        textAlign: textAlign,
                    },
                    textStyle,
                ]}
            >
                {text || headingText}
            </Text>
            {iconAfter ? (
                <View
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Image source={iconAfter} style={[styles.icons, iconAfterStyle]} resizeMode={'contain'} />
                </View>
            ) : (
                <View />
            )}
        </View>
    );
}

export default GeneralText;

const styles = StyleSheet.create({
    icons: {
        height: GENERAL_HEIGHT * 0.3,
        width: GENERAL_HEIGHT * 0.3,
        resizeMode: 'contain',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
