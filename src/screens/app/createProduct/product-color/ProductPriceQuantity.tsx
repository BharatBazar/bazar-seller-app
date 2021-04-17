import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP } from '../../../../common/dimension';
import { AIC, commonStyles, FDR, FLEX, JCC, MV } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import WrappedTextInput from '../../../component/WrappedTextInput';
import { Isize } from '../CreateProduct';
import CounterComponent from './Counter';

export interface ProductPriceProps {
    size: number;
    flex: number[];
}

const ProductPrice: React.FC<ProductPriceProps> = ({ size, flex }) => {
    return (
        <View style={[FDR(), MV(0.05)]}>
            <WrappedText text={size.toString()} containerStyle={[FLEX(flex[0]), AIC(), JCC()]} />
            <CounterComponent counter={1} containerStyle={[FLEX(flex[1]), JCC(), AIC()]} />
            <View style={[FLEX(flex[2]), JCC()]}>
                <WrappedTextInput containerStyle={{ height: getHP(0.4), borderWidth: 1, width: '80%' }} />
            </View>
            <View style={[FLEX(flex[3]), JCC()]}>
                <WrappedTextInput containerStyle={{ height: getHP(0.4), borderWidth: 1, width: '80%' }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {},
});

export default ProductPrice;
