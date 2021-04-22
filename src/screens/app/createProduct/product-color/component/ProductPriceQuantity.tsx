import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP, getWP } from '../../../../../common/dimension';
import { AIC, ML, FDR, FLEX, JCC, MV, PH, PV } from '../../../../../common/styles';
import WrappedText from '../../../../component/WrappedText';
import WrappedTextInput from '../../../../component/WrappedTextInput';
import Icon from 'react-native-vector-icons/Feather';
import CounterComponent from './Counter';
import { fs12, fs15, fs20, fs29 } from '../../../../../common';
import { colorCode, mainColor } from '../../../../../common/color';
import ProductButton from '../../product/component/ProductButton';
import TextButton from '../../../../component/TextButton';

export interface ProductPriceProps {
    size: number;
    flex: number[];
    productMrp: string;
    productSp: string;
    productQuantity: number;
    onDelete: Function;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
    size,
    flex,
    productMrp,
    productSp,
    productQuantity,
    onDelete,
}) => {
    const [quantity, setQuantity] = React.useState<number>(productQuantity || 1);
    const [mrp, setMrp] = React.useState<string>(productMrp);
    const [sp, setSp] = React.useState<string>(productSp);

    return (
        <View>
            <View style={[FDR(), MV(0.05)]}>
                <View style={[FLEX(flex[0]), JCC(), AIC()]}>
                    <Icon name={'minus-circle'} color={colorCode.RED} size={fs15} onPress={() => onDelete()} />
                </View>
                <WrappedText text={size.toString()} containerStyle={[FLEX(flex[1]), AIC(), JCC()]} />
                <CounterComponent
                    counter={quantity}
                    setCounter={setQuantity}
                    containerStyle={[FLEX(flex[2]), JCC(), AIC()]}
                />
                <View style={[FLEX(flex[3]), JCC()]}>
                    <WrappedTextInput
                        value={mrp}
                        onChangeText={(value) => setMrp(value)}
                        containerStyle={{ height: getHP(0.35), borderWidth: 0.5, width: '100%' }}
                        textInputStyle={{ fontSize: fs15, textAlign: 'center' }}
                        multiline={true}
                    />
                </View>
                <View style={[FLEX(flex[4]), JCC(), ML(0.2)]}>
                    <WrappedTextInput
                        value={sp}
                        onChangeText={(sp) => setSp(sp)}
                        containerStyle={{ height: getHP(0.35), borderWidth: 0.5, width: '100%' }}
                        textInputStyle={{ fontSize: fs15, textAlign: 'center' }}
                    />
                </View>
            </View>

            {(productSp != sp || productMrp != mrp || productQuantity != quantity) && (
                <View style={[FDR(), JCC('flex-end'), MV(0.1)]}>
                    <TextButton
                        text={'Save'}
                        onPress={() => {}}
                        textProps={{ textColor: colorCode.WHITE, fontSize: fs12 }}
                        containerStyle={[PH(0.4), PV(0.03)]}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {},
});

export default ProductPrice;
