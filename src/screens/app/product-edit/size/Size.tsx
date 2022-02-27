import { FontFamily, fs10, fs12, fs15, fs20, fs9 } from '@app/common';
import { colorCode, errorColor, mainColor } from '@app/common/color';
import { AIC, BGCOLOR, BR, BW, FDR, HP, JCC, ML, MT, MV, P, PH, provideShadow, PV } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import TextRippleButton from '@app/screens/components/button/TextRippleB';
import * as React from 'react';
import { View } from 'react-native';
import CounterComponent from '../../edit/product/component/component/Counter';
import { choosenSize } from '../data-types';
import Icon from 'react-native-vector-icons/Feather';
import { border, createProductSize } from '../../edit/product/component/generalConfig';
import Border from '@app/screens/components/border/Border';
import { getHP } from '@app/common/dimension';
import ProductIdPopup from './ProductIdPopup';
import { showMessage } from 'react-native-flash-message';
import { generateProductId } from '@app/server/apis/shop/shop.api';
import { LoaderContext } from '@app/../App';

interface SizeProps {
    size: choosenSize;
    setSize: (a: Partial<choosenSize>) => void;
    removeSize: Function;
    createSize?: Function;
    updateSize: Function;
    shopId?: string;
    setLoader: Function;
}

const Size: React.FunctionComponent<SizeProps> = ({
    size: {
        quantity,
        itemId,
        size: { name, description, _id },
    },
    shopId,
    setSize,
    createSize,
    removeSize,
    updateSize,
    setLoader,
}) => {
    const [showIdPopup, setShowIdPopup] = React.useState<boolean>(false);
    const [productUniqueId, setProductuniqueId] = React.useState('');

    const generateId = async () => {
        try {
            setLoader(true);
            const id: { payload: string; status: number; message: string } = await generateProductId({
                shopId: shopId,
            });
            setLoader(false);
            if (id && id.status == 1) {
                setProductuniqueId(id.payload);
                setShowIdPopup(true);
            } else {
                throw new Error(id.message);
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
            showMessage({ type: 'danger', message: error.message });
            // .errorAlert(error.message, 'Error in generating product id');
        }
    };

    const previousValue = React.useRef<null | Partial<choosenSize>>(null);

    React.useEffect(() => {
        previousValue.current = { quantity, itemId };
        return () => {};
    }, []);

    React.useEffect(() => {
        if (itemId.length > 0 && previousValue.current.length == 0) {
            previousValue.current = { quantity, itemId };
        }
    }, [itemId]);

    return (
        <View style={[BR(0.05), JCC(), PV(0.1)]}>
            {/* {itemId.length != 0 ? (
                <View style={[AIC('flex-start'), JCC(), MT(0.1), { marginBottom: getHP(0.2) }]}>
                  
                </View>
            ) : (
                <View />
            )} */}

            <View style={[FDR(), AIC(), JCC('space-between')]}>
                <View style={[FDR(), AIC()]}>
                    <WrappedText
                        text={itemId.length == 0 ? 'Yet to create' : 'Unique Id - ' + itemId}
                        containerStyle={[
                            PH(0.4),
                            PV(0.1),
                            BGCOLOR(itemId.length == 0 ? colorCode.SAFFRONLOW(20) : colorCode.CHAKRALOW(20)),
                            BR(0.05),
                            { opacity: 0.5 },
                        ]}
                        fontFamily={FontFamily.Bold}
                        fontWeight={'600'}
                        textColor={itemId.length == 0 ? colorCode.SAFFRONLOW(100) : colorCode.CHAKRALOW(100)}
                        fontSize={fs10}
                    />

                    <WrappedText
                        text={name}
                        textColor={'#fff'}
                        containerStyle={[ML(0.2), BGCOLOR(mainColor), AIC(), JCC(), BR(2), { height: 30, width: 30 }]}
                    />
                </View>
                <CounterComponent
                    counter={quantity}
                    setCounter={(counter: number) => {
                        setSize({ quantity: counter });
                    }}
                />

                <View style={[FDR(), JCC('flex-end')]}>
                    {itemId.length !== 0 && previousValue.current?.quantity === quantity && (
                        <TextRippleButton
                            buttonText={'Delete'}
                            onPress={() => {
                                removeSize();
                            }}
                            buttonTextColor={colorCode.CHAKRALOW(100)}
                            fontSize={fs12}
                            containerStyle={[
                                PH(0.4),
                                PV(0.03),
                                BGCOLOR(colorCode.CHAKRALOW(20)),
                                BR(0.05),
                                { opacity: 0.5 },
                            ]}
                        />
                    )}
                    {(previousValue.current?.quantity !== quantity || itemId.length == 0) && (
                        <TextRippleButton
                            buttonText={itemId.length == 0 ? 'Create' : ' Save '}
                            onPress={async () => {
                                if (itemId.length == 0) {
                                    if (productUniqueId.length > 0) {
                                        setShowIdPopup(true);
                                    } else generateId();
                                } else {
                                    const a = await updateSize();
                                    console.log('a =>', a);
                                    if (a) {
                                        previousValue.current = { quantity, itemId };
                                        setProductuniqueId('');
                                    }
                                }
                            }}
                            buttonTextColor={'#fff'}
                            fontSize={fs12}
                            containerStyle={[PH(0.4), PV(0.03), BGCOLOR(mainColor), BR(0.05), ML(0.1)]}
                        />
                    )}
                </View>
            </View>
            <Border borderStyle={{ borderTopWidth: 1 }} />
            <ProductIdPopup
                isVisible={showIdPopup}
                setPopup={setShowIdPopup}
                rightButtonText={'Create product'}
                onPressRightButton={(id) => {
                    createSize({ itemId: id, quantity: quantity, size: _id });
                    setShowIdPopup(false);
                }}
                generatedId={productUniqueId}
            />
        </View>
    );
};

export default Size;
