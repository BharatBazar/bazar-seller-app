import { FontFamily, fs10, fs12, fs15, fs20, fs9 } from '@app/common';
import { colorCode, errorColor, mainColor } from '@app/common/color';
import { AIC, AS, BGCOLOR, BR, BW, FDR, HP, JCC, ML, MT, MV, P, PH, provideShadow, PV } from '@app/common/styles';
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
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { MBA, MTA } from '@app/common/stylesheet';

interface SizeProps {
    size: choosenSize;
    setSize?: (a: Partial<choosenSize>) => void;
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
    }, [quantity]);

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

            {itemId.length != 0 && (
                <WrappedText
                    text={'Unique Id - ' + itemId}
                    containerStyle={[
                        PH(0.4),
                        PV(0.1),
                        BGCOLOR(itemId.length == 0 ? colorCode.SAFFRONLOW(20) : colorCode.CHAKRALOW(20)),
                        BR(0.05),
                        MBA(),
                        AS('flex-start'),
                        { opacity: 0.5 },
                    ]}
                    fontFamily={FontFamily.Bold}
                    fontWeight={'600'}
                    textColor={itemId.length == 0 ? colorCode.SAFFRONLOW(100) : colorCode.CHAKRALOW(100)}
                    fontSize={fs10}
                />
            )}

            <View style={[FDR(), AIC(), JCC('space-between')]}>
                <View style={[FDR(), AIC()]}>
                    <WrappedFeatherIcon
                        iconName={'delete'}
                        onPress={() => {
                            removeSize();
                        }}
                        iconColor={mainColor}
                        containerStyle={[provideShadow(), BGCOLOR('#FFFFFF'), { marginRight: 1, marginLeft: 10 }]}
                    />
                    <WrappedText
                        text={name}
                        textColor={mainColor}
                        fontFamily={FontFamily.Bold}
                        containerStyle={[ML(0.2), AIC(), JCC(), BR(2), { height: 30, width: 30 }]}
                    />
                </View>
                <CounterComponent
                    counter={quantity}
                    setCounter={(counter: number) => {
                        setSize({ quantity: counter });
                    }}
                />

                <View style={[FDR(), JCC('flex-end'), AIC()]}>
                    <TextRippleButton
                        buttonText={itemId.length == 0 ? 'Create' : ' Save '}
                        onPress={async () => {
                            if (itemId.length != 0 && previousValue.current?.quantity == quantity) {
                            } else {
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
                            }
                        }}
                        buttonTextColor={'#fff'}
                        fontSize={fs12}
                        containerStyle={[
                            PH(0.4),
                            PV(0.03),
                            {
                                backgroundColor:
                                    itemId.length != 0 && previousValue.current?.quantity == quantity
                                        ? colorCode.CHAKRALOW(50)
                                        : colorCode.CHAKRALOW(70),
                            },
                            BR(0.05),
                            ML(0.1),
                        ]}
                    />
                </View>
            </View>

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
