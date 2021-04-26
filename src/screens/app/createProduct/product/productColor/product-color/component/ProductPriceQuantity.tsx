import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP } from '../../../../../../../common/dimension';
import { AIC, ML, FDR, FLEX, JCC, MV, PH, PV } from '../../../../../../../common/styles';
import WrappedText from '../../../../../../component/WrappedText';
import WrappedTextInput from '../../../../../../component/WrappedTextInput';
import Icon from 'react-native-vector-icons/Feather';
import CounterComponent from './Counter';
import { fs12, fs15 } from '../../../../../../../common';
import { colorCode } from '../../../../../../../common/color';
import TextButton from '../../../../../../component/TextButton';
import { IProductSize, IRProductSize } from '../../../../../../../server/apis/product/product.interface';
import { createProductSize, updateProductSize, deleteProductSize } from '../../../component/generalConfig';

export interface ProductPriceProps {
    flex: number[];
    productSize: IProductSize;
    onDelete: Function;
    setParentId: Function;
    parentId: string;
    postDataToServer: Function;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
    flex,
    productSize: { productSize, productMrp, productQuantity, productSp, _id },
    onDelete,
    setParentId,
    parentId,
    postDataToServer,
}) => {
    const [quantity, setQuantity] = React.useState<number>(productQuantity || 1);
    const [mrp, setMrp] = React.useState<string>(productMrp);
    const [sp, setSp] = React.useState<string>(productSp);
    const [sizeId, setSizeId] = React.useState<string>(_id);
    console.log(productSize, productSp, productMrp, productQuantity);
    const postProductSizeDataToServer = async () => {
        let data = { productQuantity: quantity, productSp: sp, productMrp: mrp, productSize: productSize };
        try {
            if (sizeId.length == 0) {
                const response: IRProductSize = await createProductSize({
                    ...data,
                    parentId,
                });
                if (response.status == 1) {
                    if (parentId.length == 0) {
                        setParentId(response.payload.parentId);
                    } else {
                        setSizeId(response.payload._id);
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

    const deleteProductSizeFromServer = async () => {
        console.log(sizeId);
        if (sizeId.length > 0) {
            const response: IRProductSize = await deleteProductSize({ _id: sizeId, parentId: parentId });
            if (response.status == 1) {
                onDelete();
            }
        } else {
            onDelete();
        }
    };

    return (
        <View>
            <View style={[FDR(), MV(0.05)]}>
                <View style={[FLEX(flex[0]), JCC(), AIC()]}>
                    <Icon
                        name={'minus-circle'}
                        color={colorCode.RED}
                        size={fs15}
                        onPress={() => deleteProductSizeFromServer()}
                    />
                </View>
                <WrappedText text={productSize} containerStyle={[FLEX(flex[1]), AIC(), JCC()]} />
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
                            postProductSizeDataToServer();
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
