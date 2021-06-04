import React, { Component } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FontFamily, fs10, fs13 } from '../../common';
import { getHP } from '../../common/dimension';
import { AIC, JCC } from '../../common/styles';
import WrappedRoundButton from './WrappedRoundButton';

interface Props {
    containerStyle?: StyleProp<any>;
    errorText?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    eyeButton?: any;
    icon?: any;

    textInputStyle?: StyleProp<any>;
    placeholderTextColor?: string;
    errorContainer?: StyleProp<any>;
    secureTextEntry?: boolean;
    autoFocus?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    children?: any;
    rightIcon?: string;
    onPressRightIcon?: Function;
    rest?: any;
    eyeButtonHeight?: number;
    paddingLeft?: number;
    multiline?: boolean;
}

interface State {
    secureTextEntry: boolean | undefined;
}

export default class WrappedTextInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            secureTextEntry: false,
        };
    }

    componentDidMount() {
        const { eyeButton } = this.props;
        this.setState({ secureTextEntry: eyeButton });
    }

    render() {
        const {
            errorText,
            value,
            eyeButton,
            containerStyle,
            placeholder,
            textInputStyle,
            placeholderTextColor,
            errorContainer,
            eyeButtonHeight,
            multiline,
            paddingLeft,
            onChangeText,
            autoCapitalize,
        } = this.props;
        const { secureTextEntry } = this.state;
        return (
            <View>
                <View style={[styles.mainContainer, containerStyle]}>
                    <TextInput
                        value={value}
                        autoCapitalize={autoCapitalize || 'none'}
                        onChangeText={onChangeText}
                        multiline={multiline || false}
                        autoCorrect={false}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor || '#1A202C4D'}
                        style={[styles.textInput, textInputStyle, { paddingLeft: paddingLeft || 0 }]}
                        secureTextEntry={secureTextEntry || false}
                    />
                    {eyeButton ? (
                        <WrappedRoundButton
                            onPress={() => {
                                this.setState((prevState) => ({
                                    secureTextEntry: !prevState.secureTextEntry,
                                }));
                            }}
                            containerStyle={[AIC(), JCC()]}
                            height={containerStyle.height}
                        >
                            <Icon
                                name={secureTextEntry ? 'eye-off' : 'eye'}
                                style={styles.eye}
                                size={getHP(0.2)}
                                color={'#1A202C4D'}
                            />
                        </WrappedRoundButton>
                    ) : (
                        <View />
                    )}
                </View>
                {errorText ? (
                    <View style={[styles.errorContainer, errorContainer, { paddingLeft: paddingLeft || 0 }]}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                ) : (
                    <View />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {},

    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        flex: 9,
        color: '#1A202C',
        fontSize: fs13,
        fontFamily: FontFamily.RobotoRegular,
        padding: 0,
        height: '100%',
        width: '100%',
    },
    errorContainer: {
        //paddingLeft: 20,
    },
    errorText: {
        fontSize: fs10,
        color: '#ee7955',
        fontStyle: 'normal',
    },
    eye: {
        height: getHP(0.2),
        width: getHP(0.2),
        alignSelf: 'center',
    },
});
