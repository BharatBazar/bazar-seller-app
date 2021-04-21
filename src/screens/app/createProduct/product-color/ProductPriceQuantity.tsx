import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP, getWP } from '../../../../common/dimension';
import { AIC, ML, FDR, FLEX, JCC, MV, PH, PV } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import WrappedTextInput from '../../../component/WrappedTextInput';
import Icon from 'react-native-vector-icons/Feather';
import CounterComponent from './Counter';
import { fs12, fs15, fs20, fs29 } from '../../../../common';
import { colorCode, mainColor } from '../../../../common/color';
import ProductButton from '../product/component/ProductButton';
import TextButton from '../../../component/TextButton';

export interface ProductPriceProps {
    size: number;
    flex: number[];
}

const ProductPrice: React.FC<ProductPriceProps> = ({ size, flex }) => {
    return (
        <View>
            <View style={[FDR(), MV(0.05)]}>
                <WrappedText text={size.toString()} containerStyle={[FLEX(flex[0]), AIC(), JCC()]} />
                <CounterComponent counter={1} containerStyle={[FLEX(flex[1]), JCC(), AIC()]} />
                <View style={[FLEX(flex[2]), JCC()]}>
                    <WrappedTextInput
                        containerStyle={{ height: getHP(0.35), borderWidth: 0.5, width: '100%' }}
                        textInputStyle={{ fontSize: fs15, textAlign: 'center' }}
                        multiline={true}
                    />
                </View>
                <View style={[FLEX(flex[3]), JCC(), ML(0.2)]}>
                    <WrappedTextInput containerStyle={{ height: getHP(0.35), borderWidth: 0.5, width: '100%' }} />
                </View>
            </View>
            <View style={[FDR(), JCC('flex-end'), MV(0.1)]}>
                <TextButton
                    text={'Save'}
                    textProps={{ textColor: colorCode.WHITE, fontSize: fs12 }}
                    containerStyle={[PH(0.4), PV(0.03)]}
                />
                <TextButton
                    text={'Delete'}
                    textProps={{ textColor: colorCode.WHITE, fontSize: fs12 }}
                    containerStyle={[PH(0.4), PV(0.03), ML(0.2)]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {},
});

export default ProductPrice;
