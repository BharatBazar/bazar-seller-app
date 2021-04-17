import * as React from 'react';
import { View } from 'react-native';
import { fs12, fs13 } from '../../../../../common';
import WrappedText from '../../../../component/WrappedText';
import WrappedTextInput from '../../../../component/WrappedTextInput';
import { BC, BR, BW, HP, MT, AIC, FS, BGCOLOR } from '../../../../../common/styles';
import { borderColor } from '../../../../../common/color';
import { getHP } from '../../../../../common/dimension';
import { border, borRad } from './styles';

export interface ProductTitleProps {
    placeholder: string;
    value: string;
    onChangeText: (a: string) => void;
}

const ProductTextInput: React.FC<ProductTitleProps> = ({ placeholder, value, onChangeText }) => {
    return (
        <WrappedTextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            containerStyle={[border, MT(0.15), HP(0.4), borRad, AIC('flex-start'), { paddingLeft: getHP(0.1) }]}
            textInputStyle={[FS(fs12), HP(0.4)]}
        />
    );
};

export default ProductTextInput;
