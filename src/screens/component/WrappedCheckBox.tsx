import React, { Component } from 'react';
import { StyleSheet, View, Text, ViewStyle, StyleProp } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { mainColor } from '../../common/color';
import { getHP } from '../../common/dimension';
import { fs12, fs13, fs16 } from '../../common';

export interface WrappedCheckBoxProps {
    value: boolean;
    placeholder?: string;
    setValue: (value: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
}

export interface WrappedCheckBoxState {}

class WrappedCheckBox extends React.Component<WrappedCheckBoxProps, WrappedCheckBoxState> {
    render() {
        const { value, placeholder, setValue, containerStyle } = this.props;
        return (
            <View style={[{ flexDirection: 'row', alignItems: 'center' }, containerStyle]}>
                <CheckBox
                    value={value}
                    onValueChange={setValue}
                    boxType={'square'}
                    tintColors={{ true: mainColor }}
                    onCheckColor={mainColor}
                    onTintColor={mainColor}
                    style={{ height: fs16 }}
                />
                {placeholder && <Text style={styles.placeholderStyle}>{placeholder}</Text>}
            </View>
        );
    }
}

export default WrappedCheckBox;

const styles = StyleSheet.create({
    placeholderStyle: {
        color: '#00000080',
        fontSize: fs12,
        lineHeight: 20,
        fontWeight: '600',
    },
});
