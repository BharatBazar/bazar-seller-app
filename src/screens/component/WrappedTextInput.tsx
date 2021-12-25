import React, { Component } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { FontFamily, fs10, fs11, fs13 } from '../../common';
import { colorCode, errorColor } from '../../common/color';
import { getHP } from '../../common/dimension';
import { AIC, JCC, MT } from '../../common/styles';
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
    editable?: boolean;
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
    textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom';
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

    shouldComponentUpdate(prevProps: Props) {
        if (this.props.value != prevProps.value || this.props.errorText != prevProps.errorText) {
            return true;
        }
        return false;
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
            editable,
            paddingLeft,
            textAlignVertical,
            onChangeText,
            autoCapitalize,
        } = this.props;
        console.log('rendering', placeholder);
        const { secureTextEntry } = this.state;
        return (
            <View>
                <View style={[styles.mainContainer, containerStyle]}>
                    <TextInput
                        editable={editable}
                        value={value}
                        autoCapitalize={autoCapitalize || 'none'}
                        onChangeText={onChangeText}
                        multiline={multiline || false}
                        autoCorrect={false}
                        placeholder={placeholder}
                        textAlignVertical={textAlignVertical}
                        placeholderTextColor={placeholderTextColor || '#8a8a8a'}
                        style={[
                            styles.textInput,
                            textInputStyle,
                            {
                                paddingLeft: paddingLeft || 0,
                                backgroundColor: editable == false ? '#64646433' : '#00000000',
                            },
                        ]}
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
                    <View style={[styles.errorContainer, errorContainer, { paddingLeft: 1 || 0, marginTop: 0 }]}>
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
        fontFamily: FontFamily.Regular,
        padding: 0,
        height: '100%',
        width: '100%',
    },
    errorContainer: {
        //paddingLeft: 20,
    },
    errorText: {
        fontSize: fs11,
        color: errorColor,
        fontStyle: 'normal',
        fontFamily: FontFamily.Regular,
        marginTop: 3,
    },
    eye: {
        height: getHP(0.2),
        width: getHP(0.2),
        alignSelf: 'center',
    },
});
