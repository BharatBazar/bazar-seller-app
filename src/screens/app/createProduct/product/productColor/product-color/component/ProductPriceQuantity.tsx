import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP, getWP } from '../../../../../../../common/dimension';
import { AIC, ML, FDR, FLEX, JCC, MV, PH, PV } from '../../../../../../../common/styles';
import WrappedText from '../../../../../../component/WrappedText';
import WrappedTextInput from '../../../../../../component/WrappedTextInput';
import Icon from 'react-native-vector-icons/Feather';
import CounterComponent from './Counter';
import { fs12, fs15, fs20, fs29 } from '../../../../../../../common';
import { colorCode, mainColor } from '../../../../../../../common/color';
import ProductButton from '../../../component/ProductButton';
import TextButton from '../../../../../../component/TextButton';
import { IProductSize, IRProductSize } from '../../../../../../../server/apis/product/product.interface';
import { createProductSize, updateProductSize } from '../../../component/generalConfig';

export interface ProductPriceProps {
    flex: number[];
    productSize: IProductSize;
    onDelete: Function;
    setParentId: Function;
    parentId: string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
    flex,
    productSize: { productSize, productMrp, productQuantity, productSp, _id },
    onDelete,
    setParentId,
    parentId,
}) => {
    const [quantity, setQuantity] = React.useState<number>(productQuantity || 1);
    const [mrp, setMrp] = React.useState<string>(productMrp);
    const [sp, setSp] = React.useState<string>(productSp);

    let sizeId = _id;

    const postDataToServer = async () => {
        let data = { productQuantity: quantity, productSp: sp, productMrp: mrp };
        try {
            if (sizeId.length == 0) {
                const response: IRProductSize = await createProductSize({
                    ...data,
                    parentId: parentId || undefined,
                });
                if (response.status == 1) {
                    if (!parentId) {
                        setParentId(response.payload.parentId);
                    } else {
                        sizeId = response.payload._id;
                    }
                }
            } else {
                const response = await updateProductSize({ ...data, _id: sizeId });
                if (response.status == 1) {
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <View style={[FDR(), MV(0.05)]}>
                <View style={[FLEX(flex[0]), JCC(), AIC()]}>
                    <Icon name={'minus-circle'} color={colorCode.RED} size={fs15} onPress={() => onDelete()} />
                </View>
                <WrappedText text={productSize.toString()} containerStyle={[FLEX(flex[1]), AIC(), JCC()]} />
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
                        onPress={() => {
                            postDataToServer();
                        }}
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
