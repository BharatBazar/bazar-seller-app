import React from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleProp, StyleSheet, TextProps, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { getHP } from '../../common/dimension';
import WrappedText from './WrappedText';

export interface WrappedRoundButtonProps {
    buttonSource?: ImageSourcePropType;
    onPress: () => void;
    height?: number;
    style?: StyleProp<any>;
    isLoading?: boolean;
    containerStyle?: StyleProp<any>;
    text?: string;
    textStyle?: StyleProp<any>;
    children?: any;
}

export interface WrappedRoundButtonState {}

class WrappedRoundButton extends React.Component<WrappedRoundButtonProps, WrappedRoundButtonState> {
    render() {
        const {
            buttonSource,
            onPress,
            height,
            style,
            isLoading,
            containerStyle,
            text,
            textStyle,
            children,
        } = this.props;
        return (
            <Ripple
                style={[
                    styles.container,
                    {
                        height: height || getHP(0.5),
                        width: height || getHP(0.5),
                        borderRadius: (height && height / 2) || getHP(8),
                    },
                    containerStyle,
                ]}
                rippleCentered={true}
                onPress={() => onPress()}
                rippleContainerBorderRadius={(height && height / 2) || 25}
            >
                {children && children}
            </Ripple>
        );
    }
}

export default WrappedRoundButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        height: 20,
        width: 20,
        borderRadius: 10,
        resizeMode: 'contain',
    },
});
