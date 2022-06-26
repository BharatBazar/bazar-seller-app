import React, { Component } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { mainColor } from '../../common/color';
import { fs12, fs16 } from '../../common';
import WrappedText from './WrappedText';
import { AIC, FDR } from '@app/common/styles';

export interface WrappedCheckBoxProps {
    value: boolean;
    placeholder?: string;
    setValue: (value: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
}

export interface WrappedCheckBoxState {}

const WrappedCheckBox = (props: WrappedCheckBoxProps) => {
    const { value, placeholder, setValue, containerStyle } = props;
    console.log(props);
    return (
        <View style={[FDR(), AIC(), containerStyle]}>
            <CheckBox
                value={value}
                onValueChange={setValue}
                boxType={'square'}
                tintColors={{ true: mainColor }}
                onCheckColor={mainColor}
                onTintColor={mainColor}
                style={{ height: fs16 }}
            />
            {placeholder != undefined && (
                <WrappedText textStyle={styles.placeholderStyle} containerStyle={{ flex: 1 }} text={placeholder} />
            )}
        </View>
    );
};

export default WrappedCheckBox;

const styles = StyleSheet.create({
    placeholderStyle: {
        color: '#00000080',
        fontSize: fs12,
        lineHeight: 20,
        fontWeight: '600',
    },
});
