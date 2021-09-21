import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { fs12, fs13 } from '../../../../../common';
import WrappedText from '../../../../component/WrappedText';
import WrappedTextInput from '../../../../component/WrappedTextInput';
import { BC, BR, BW, HP, MT, AIC, FS, BGCOLOR, PT } from '../../../../../common/styles';
import { borderColor } from '../../../../../common/color';
import { getHP } from '../../../../../common/dimension';
import { border, borRad } from './generalConfig';

export interface ProductTitleProps {
    placeholder: string;
    value: string;
    onChangeText: (a: string) => void;
    height?: number;
    multiline?: boolean;
    error?: string;
    textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom';
    containerStyle?: ViewStyle | ViewStyle[];
}

const ProductTextInput: React.FC<ProductTitleProps> = ({
    placeholder,
    value,
    error,
    onChangeText,
    height,
    multiline,
    textAlignVertical,
    containerStyle,
}) => {
    return (
        <WrappedTextInput
            value={value}
            multiline={multiline}
            onChangeText={onChangeText}
            placeholder={placeholder}
            textAlignVertical={textAlignVertical}
            containerStyle={[
                border,

                MT(0.15),
                HP(height || 0.4),
                borRad,
                AIC('flex-start'),
                { paddingLeft: getHP(0.1) },
                containerStyle,
            ]}
            errorText={error}
            textInputStyle={[FS(fs12), HP(height || 0.4)]}
        />
    );
};

export default ProductTextInput;
