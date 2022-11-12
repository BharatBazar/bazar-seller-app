import { FontFamily, fs11, fs13 } from '@app/common';
import { errorColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import React, { Component } from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import GeneralText from '../text/GeneralText';

interface Props {
    containerStyle?: StyleProp<any>;
    errorText?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;

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

    paddingLeft?: number;
    multiline?: boolean;
    keyBoard?: string | any;
    textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom';
    maxLength?: any;
    title?: string;
}

interface State {
    secureTextEntry: boolean | undefined;
}

export default class GeneralTextInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        const {
            errorText,
            value,

            containerStyle,
            placeholder,
            textInputStyle,
            placeholderTextColor,
            errorContainer,

            multiline,
            editable,
            paddingLeft,
            textAlignVertical,
            onChangeText,
            autoCapitalize,
            keyBoard,
            maxLength,
            title,
        } = this.props;
        console.log('rendering', placeholder);
        const { secureTextEntry } = this.state;
        return (
            <View>
                {title != undefined && (
                    <GeneralText text={title} fontFamily={'Medium'} textStyle={{ marginTop: 10, marginBottom: 10 }} />
                )}
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
                        maxLength={maxLength}
                        keyboardType={keyBoard}
                    />
                </View>
                {errorText ? (
                    <GeneralText
                        text={errorText}
                        containerStyle={[styles.errorContainer, errorContainer, { paddingLeft: 1 || 0, marginTop: 0 }]}
                        textStyle={styles.errorText}
                    />
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
        fontFamily: FontFamily.Light,
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
        fontStyle: 'norma',
        fontFamily: FontFamily.Regular,
        marginTop: 3,
    },
    eye: {
        height: getHP(0.2),
        width: getHP(0.2),
        alignSelf: 'center',
    },
});
