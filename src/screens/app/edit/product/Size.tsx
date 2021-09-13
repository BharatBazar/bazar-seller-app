import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { getHP } from '../../../../common/dimension';
import {
    AIC,
    ML,
    FDR,
    FLEX,
    JCC,
    MV,
    PH,
    PV,
    MH,
    MT,
    BW,
    BGCOLOR,
    provideShadow,
    BBW,
    BC,
} from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import WrappedTextInput from '../../../component/WrappedTextInput';
import Icon from 'react-native-vector-icons/Feather';
import CounterComponent from './component/component/Counter';
import { FontFamily, fs10, fs12, fs14, fs15 } from '../../../../common';
import { borderColor, colorCode, errorColor, mainColor } from '../../../../common/color';
import TextButton from '../../../component/TextButton';
import { IProductSize, IRProductSize, ISizeApp } from '../../../../server/apis/product/product.interface';
import { createProductSize, updateProductSize, deleteProductSize } from './component/generalConfig';
import { generateProductId } from '@app/server/apis/shop/shop.api';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import ProductIdPopup from './component/ProductIdPopup';
import { provideAlert } from '@app/common/helper';

export interface ProductPriceProps {
    flex: number[];
    productSize: ISizeApp;
    onDelete: Function;
    setParentId: Function;
    parentId: string;
    postDataToServer: Function;
    setDefaultSize?: (size: Partial<ISizeApp>) => void;
    setNew: Function;
    neww: boolean;
    errorValue: number;
    setError: (value: number) => void;
    shopId: string;
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
    shopId,
}) => {
    const [quantity, setQuantity] = React.useState<number>(productSize.quantity || 1);
    const [mrp, setMrp] = React.useState<string>(productSize.mrp);
    const [sp, setSp] = React.useState<string>(productSize.sp);
    const [sizeId, setSizeId] = React.useState<string>(productSize._id);
    const [id, setId] = React.useState<undefined | string>(undefined);
    const [showIdPopup, setShowIdPopup] = React.useState<boolean>(false);
    const [lastState, setLastState] = React.useState<{ lastQuantity: number; lastMrp: string; lastSp: string }>({
        lastQuantity: productSize.quantity,
        lastMrp: mrp,
        lastSp: sp,
    });
    const [error, setErrors] = React.useState('');

    const checkError = (byPass?: boolean) => {
        if (sp.length == 0 || mrp.length == 0) {
            setErrors('Please provide mrp (maximum retail price) and sp (selling price).');
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

    const postProductSizeDataToServer = async (id?: string) => {
        let data: Partial<IProductSize> = { quantity: quantity, sp: sp, mrp: mrp, size: productSize.sizeId };
        const isError = checkError(true);

        if (!isError) {
            try {
                if (sizeId.length == 0) {
                    const response: IRProductSize = await createProductSize({
                        ...data,
                        itemId: id,
                        parentId,
                    });
                    if (response.status == 1) {
                        ToastHOC.successAlert('Item size created!');
                        if (neww) {
                            setNew(false);
                        }
                        setLastState({ lastSp: sp, lastMrp: mrp, lastQuantity: quantity });
                        if (setDefaultSize) {
                            setDefaultSize({ ...productSize, sp, mrp, quantity });
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
                        ToastHOC.successAlert('Item size updated!');
                        setLastState({ lastSp: sp, lastMrp: mrp, lastQuantity: quantity });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const generateId = async () => {
        try {
            const id = await generateProductId({ shopId: shopId });
            console.log(id);
            if (id && id.status == 1) {
                setId(id.payload);
                setShowIdPopup(true);
            } else {
                throw new Error(id.message);
            }
        } catch (error) {
            console.log(error);
            ToastHOC.errorAlert(error.message, 'Error in generating product id');
        }
    };

    const deleteProductSizeFromServer = async () => {
        provideAlert({
            heading: 'Warning',
            subHeading: 'Do you want to delete this size?',
            buttonText1: 'Yes',
            onPressFirstButton: async () => {
                if (sizeId.length > 0) {
                    const response: IRProductSize = await deleteProductSize({ _id: sizeId, parentId: parentId });
                    if (response.status == 1) {
                        onDelete();
                    }
                } else {
                    onDelete();
                }
            },
            buttonText2: 'No',
        });
    };

    const { lastMrp, lastQuantity, lastSp } = lastState;

    return (
        <View style={[{ borderBottomWidth: 1 }, BC(borderColor), PV(0.2)]}>
            {productSize.itemId || id ? (
                <View style={[AIC('flex-start'), JCC(), MT(0.1)]}>
                    <WrappedText
                        text={'Unique Id - ' + (productSize.itemId || id)}
                        containerStyle={[
                            PV(0.05),
                            PH(0.4),
                            provideShadow(),
                            BGCOLOR('#FFFFFF'),
                            { marginBottom: getHP(0.2) },
                        ]}
                        fontFamily={FontFamily.RobotBold}
                        fontWeight={'600'}
                        textColor={'#161616'}
                        fontSize={fs12}
                    />
                </View>
            ) : (
                <View />
            )}

            <View style={[FDR(), MV(0.05)]}>
                <View style={[FLEX(flex[0]), JCC(), AIC()]}>
                    <Icon
                        name={'minus-circle'}
                        color={colorCode.RED}
                        size={fs15}
                        onPress={() => deleteProductSizeFromServer()}
                    />
                </View>
                <WrappedText text={productSize.name} containerStyle={[FLEX(flex[1]), AIC(), JCC()]} />
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
                    textColor={errorColor}
                    fontSize={fs10}
                    containerStyle={[FLEX(1), MH(0.4), MV(0.05)]}
                />
            )}
            {(lastSp != sp || lastMrp != mrp || lastQuantity != quantity || sizeId.length == 0) && (
                <View style={[FDR(), JCC('flex-end'), MV(0.1)]}>
                    <TextButton
                        text={sizeId.length == 0 ? 'Create' : 'Save'}
                        onPress={() => {
                            if (checkError(true)) {
                            } else {
                                if (sizeId.length == 0) {
                                    if (!id) {
                                        generateId();
                                    } else {
                                        setShowIdPopup(true);
                                    }
                                } else postProductSizeDataToServer();
                            }
                        }}
                        textProps={{ textColor: colorCode.WHITE, fontSize: fs12 }}
                        containerStyle={[PH(0.4), PV(0.03)]}
                    />
                </View>
            )}
            <ProductIdPopup
                isVisible={showIdPopup}
                setPopup={setShowIdPopup}
                rightButtonText={'Create product'}
                onPressRightButton={(id) => {
                    postProductSizeDataToServer(id);
                    setShowIdPopup(false);
                }}
                generatedId={id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {},
});

export default ProductPrice;
