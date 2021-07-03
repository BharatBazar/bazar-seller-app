import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP } from '../../../../common/dimension';
import { AIC, ML, FDR, FLEX, JCC, MV, PH, PV, MH } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import WrappedTextInput from '../../../component/WrappedTextInput';
import Icon from 'react-native-vector-icons/Feather';
import CounterComponent from './component/component/Counter';
import { fs10, fs12, fs15, fs9 } from '../../../../common';
import { colorCode, productColor } from '../../../../common/color';
import TextButton from '../../../component/TextButton';
import { IProductSize, IRProductSize, ISizeApp } from '../../../../server/apis/product/product.interface';
import { createProductSize, updateProductSize, deleteProductSize } from './component/generalConfig';
import { Isize } from './Colors';

export interface ProductPriceProps {
    flex: number[];
    productSize: ISizeApp;
    onDelete: Function;
    setParentId: Function;
    parentId: string;
    postDataToServer: Function;
    setDefaultSize?: (size: IProductSize) => void;
    setNew: Function;
    neww: boolean;
    errorValue: number;
    setError: (value: number) => void;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
    flex,
    productSize,
    onDelete,
    setParentId,
    parentId,
    neww,
    setNew,

    postDataToServer,
    errorValue,
    setError,
    setDefaultSize,
}) => {
    const [quantity, setQuantity] = React.useState<number>(productSize.quantity || 1);
    const [mrp, setMrp] = React.useState<string>(productSize.mrp);
    const [sp, setSp] = React.useState<string>(productSp);
    const [sizeId, setSizeId] = React.useState<string>(_id);
    const [lastState, setLastState] = React.useState<{ lastQuantity: number; lastMrp: string; lastSp: string }>({
        lastQuantity: productQuantity,
        lastMrp: mrp,
        lastSp: sp,
    });
    const [error, setErrors] = React.useState('');

    const checkError = (byPass?: boolean) => {
        if (sp.length == 0 || mrp.length == 0) {
            setErrors('For creating size for product your need to provide mrp and sp.');
            return true;
        } else if (!byPass && sizeId.length == 0) {
            setErrors('Please save size or delete it.');
            return true;
        } else {
            setErrors('');
            return false;
        }
    };

    React.useEffect(() => {
        if (errorValue == 1) {
            const isError = checkError();
            if (isError) {
                setError(3);
            } else {
                setError(2);
            }
        }
    }, [errorValue]);

    const postProductSizeDataToServer = async (size: ISizeApp) => {
        let data:IProductSize = { quantity: quantity, sp: sp, mrp: mrp, size:size._id};
        const isError = checkError(true);

        if (!isError) {
            try {
                if (sizeId.length == 0) {
                    const response: IRProductSize = await createProductSize({
                        ...data,
                        parentId,
                    });
                    if (response.status == 1) {
                        if (neww) {
                            setNew(false);
                        }
                        setLastState({ lastSp: sp, lastMrp: mrp, lastQuantity: quantity });
                        if (setDefaultSize) {
                            setDefaultSize({ _id:, productMrp: mrp, productSp: sp, productQuantity: quantity });
                        }
                        if (parentId.length == 0) {
                            setParentId(response.payload.parentId);
                        } else {
                            setSizeId(response.payload._id);
                        }
                    }
                } else {
                    const response = await updateProductSize({ ...data, _id: sizeId });
                    if (response.status == 1) {
                        setLastState({ lastSp: sp, lastMrp: mrp, lastQuantity: quantity });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteProductSizeFromServer = async () => {
        if (sizeId.length > 0) {
            const response: IRProductSize = await deleteProductSize({ _id: sizeId, parentId: parentId });
            if (response.status == 1) {
                onDelete();
            }
        } else {
            onDelete();
        }
    };

    const { lastMrp, lastQuantity, lastSp } = lastState;

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
            {error.length > 0 && (
                <WrappedText
                    text={error}
                    textColor={colorCode.RED}
                    fontSize={fs10}
                    containerStyle={[FLEX(1), MH(0.4), MV(0.05)]}
                />
            )}
            {(lastSp != sp || lastMrp != mrp || lastQuantity != quantity || sizeId.length == 0) && (
                <View style={[FDR(), JCC('flex-end'), MV(0.1)]}>
                    <TextButton
                        text={sizeId.length == 0 ? 'Create' : 'Save'}
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
