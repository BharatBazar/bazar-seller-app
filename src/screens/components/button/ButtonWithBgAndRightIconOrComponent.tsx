import { FontFamily, fs18 } from '@app/common';
import { AIC, JCC } from '@app/common/styles';
import { GENERAL_BORDER_RADIUS, GENERAL_HEIGHT, HA, WA } from '@app/common/stylesheet';
import React from 'react';
import { Image, StyleProp, StyleSheet, TextStyle, ViewStyle, TouchableOpacity } from 'react-native';
import GeneralText from '../text/GeneralText';

interface Props {
    backgroundColor?: string;
    buttonText?: string;

    opacity?: number;
    textColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    elevation?: number;
    icon?: any;
    onPress: () => void | undefined;

    iconStyle?: StyleProp<any>;
    children?: any;
    rightIcon?: any;
    rightIconStyle?: StyleProp<any>;
    onPressRightIcon?: Function;
    leftToTextComponent?: Function;
    rightToTextComponent?: Function;
}

function GeneralButtonWithNormalBg({
    children,
    containerStyle,
    textColor,
    textStyle,
    backgroundColor,
    buttonText,
    onPress,
    rightIcon,
    rightIconStyle,
    onPressRightIcon,
    leftToTextComponent,
    rightToTextComponent,
}: Props) {
    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={[
                AIC(),
                JCC(),
                { overflow: 'hidden', zIndex: -1 },

                { backgroundColor: backgroundColor || null },
                containerStyle,
                // styles.buttona
            ]}
        >
            {leftToTextComponent && leftToTextComponent()}

            <GeneralText
                text={buttonText}
                fontFamily={'Medium'}
                fontSize={fs18}
                textStyle={textStyle}
                //lineHeight={21}
                textColor={textColor || '#FFFFFF'}
            />
            {rightToTextComponent && rightToTextComponent()}
            {rightIcon && (
                <TouchableOpacity
                    style={{ zIndex: 1000 }}
                    onPress={() => {
                        onPressRightIcon && onPressRightIcon();
                    }}
                >
                    <Image
                        source={rightIcon}
                        style={[
                            { resizeMode: 'contain' },
                            HA(GENERAL_HEIGHT * 0.3),
                            WA(GENERAL_HEIGHT * 0.3),
                            rightIconStyle,
                        ]}
                    />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {},
    buttonFiller: {
        flex: 1,
    },
    button: {
        height: GENERAL_HEIGHT * 0.9,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GENERAL_BORDER_RADIUS,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    rect: {
        height: GENERAL_HEIGHT * 0.9,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(222,122,217,1)',
        overflow: 'hidden',
    },
    rect_imageStyle: {
        height: 58,
    },
    loremIpsum: {
        fontFamily: FontFamily.Medium,
        color: 'rgba(255,255,255,1)',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default GeneralButtonWithNormalBg;
