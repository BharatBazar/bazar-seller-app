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
    text?: string;
    iconStyle?: any;
    containerStyle?: any;
}) {
    const {
        headingText,
        fontFamily,
        fontSize,
        fontWeight,
        icon,
        textColor,
        text,
        iconStyle,
        containerStyle,
        iconBefore,
        textStyle,
    } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            {iconBefore ? (
                <View style={{ justifyContent: 'center' }}>
                    <Image source={iconBefore} style={[styles.icons, iconStyle]} />
                </View>
            ) : (
                <View />
            )}
            <Text
                style={[
                    {
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        fontWeight: fontWeight || '600',
                        color: textColor || '#000000',
                    },
                    textStyle,
                ]}
            >
                {text || headingText}
            </Text>
            {icon ? (
                <View style={{ justifyContent: 'center' }}>
                    <Image source={icon} style={[styles.icons, iconStyle]} />
                </View>
            ) : (
                <View />
            )}
        </View>
    );
}

export default WrappedText;

const styles = StyleSheet.create({
    icons: {
        height: getHP(0.15),
        width: getHP(0.15),
        resizeMode: 'contain',
        marginLeft: 5,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
