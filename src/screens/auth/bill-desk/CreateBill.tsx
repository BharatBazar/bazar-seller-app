import { StyleSheet, View, FlatList, Alert, Keyboard, ToastAndroid } from 'react-native';
import React, { useRef } from 'react';
import { AIC, BGCOLOR, FC, FDR, FLEX, FS, JCC, ML, MT, PH, PR, PT } from '@app/common/styles';
import { GENERAL_PADDING, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { colorCode, mainColor } from '@app/common/color';
import WrappedText from '@app/screens/component/WrappedText';
import { FontFamily, fs18 } from '@app/common';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import BottomSheet from './BottomSheet';
import { Storage, StorageItemKeys } from '@app/storage';
import { APIGetItemSize } from '@app/server/apis/product/product.api';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import ProductRender from './ProductRenders/ProductsRender';
import { checkBillProductExistOrNot } from '@app/server/apis/billdesk/bill.api';
import GeneralText from '@app/screens/components/text/GeneralText';
import CoreConfig from '@app/screens/hoc/CoreConfig';

const CreateBill: React.FC = ({ navigation, route }: any) => {
    const [modalHeight, setModalHeight] = React.useState<number>(500);
    const [id, setId] = React.useState<number>();
    const [item, setItem]: any = React.useState<[]>([]);
    const [showEnter, setShowEnter] = React.useState<boolean>(true);
    const [openContinueModal, setOpenContinueModal] = React.useState<string>('');
    const [allProducts, setAllProducts]: any = React.useState<[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [everyItem, setEveryItem]: any = React.useState<[]>([]);
    const [quantity, setQuantity] = React.useState<number>(1);
    const [price, setPrice] = React.useState<number>(0);
    const [preEditItem, setPreEditItem] = React.useState<[]>([]);
    const [errorText, setErrorText] = React.useState<string>('');

    const refRBSheet: any = useRef();

    var total = 0;

    everyItem.forEach((i: any) => {
        total += i.price * i.quantity;
    });

    const removeItem = (id: any) => {
        const removeItem = everyItem.filter((e: any) => {
            return e._id !== id;
        });
        setEveryItem(removeItem);
        if (everyItem.length === 1) {
            refRBSheet.current.close();
        }
    };

    const findProduct = async (id: number) => {
        try {
            setLoading(true);
            const shopId = await CoreConfig.getShopId();
            const itemResponse: any = await APIGetItemSize({ shopId: shopId, itemId: id });
            console.log('RESPPO', itemResponse);
            const product = itemResponse.payload[0];
            if (itemResponse.status == 1) {
                setModalHeight(600);
                setLoading(false);
                setAllProducts(product);
                setItem([product]);
                setShowEnter(false);
                Keyboard.dismiss();
            } else {
                setLoading(false);
                Keyboard.dismiss();
                setErrorText('Item not found');
            }
        } catch (error: any) {
            setLoading(false);
            Keyboard.dismiss();
            setErrorText(error.message);
        }
    };

    const add = async (item: any) => {
        try {
            const shopId = await CoreConfig.getShopId();
            const checkItemExist: any = await checkBillProductExistOrNot({ shopId: shopId, productId: item._id });
            console.log('Checking...', checkItemExist);
            if (checkItemExist.payload === true) {
                ToastHOC.errorAlert('Item already exist in the bill');
            } else {
                item['price'] = price;
                item['fixedQuantity'] = item.quantity;

                if (allProducts._id === item._id) {
                    const updateQuantity = (allProducts.quantity = quantity);
                    setQuantity(1);
                    setPrice(0);
                    setItem([allProducts]);
                    Keyboard.dismiss();
                } else {
                    console.log('error occured');
                    Keyboard.dismiss();
                }
                const check = everyItem.filter((e: any) => e._id === item._id);
                if (check.length === 1) {
                    ToastHOC.errorAlert('Item already in list', '', 'top');
                    Keyboard.dismiss();
                } else {
                    setEveryItem(everyItem.concat(item));
                    setItem([]);
                    refRBSheet.current.close();
                }
            }
        } catch (error: any) {
            Keyboard.dismiss();
            ToastAndroid.show(error.message, 404);
        }
    };

    const changeQuantity = (quantity: number, setQuan: any) => {
        if (quantity > allProducts.quantity) {
            setQuan(' ');
            Alert.alert('you cannot add item');
        } else {
            setQuan(quantity);
            setQuantity(quantity);
        }
    };

    const changeSellingPrice = (price: number) => {
        setPrice(price);
    };

    return (
        <View style={[FLEX(1), BGCOLOR('#ffffff')]}>
            <View style={[BGCOLOR(mainColor), PVA(), AIC(), PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING), FDR('row')]}>
                {
                    <ButtonMaterialIcons
                        onPress={() => {
                            navigation.goBack();
                        }}
                        iconName={'arrow-back'}
                        containerStyle={[MLA()]}
                        iconColor={colorCode.WHITE}
                    />
                }
                <WrappedText
                    text={'Create Bill'}
                    fontSize={fs18}
                    textColor={'#ffffff'}
                    textAlign="center"
                    containerStyle={[ML(0.2)]}
                    fontFamily={FontFamily.Medium}
                />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Add Product'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        setOpenContinueModal('ADD_PRODUCT');
                        refRBSheet.current.open();
                        setModalHeight(500);
                        setErrorText('');
                    }}
                />
            </View>

            <View style={[FLEX(0.8), PH(0.5)]}>
                {everyItem.length > 0 ? (
                    <>
                        <FlatList
                            data={everyItem}
                            renderItem={({ item }) => (
                                <ProductRender
                                    setOpenContinueModal={setOpenContinueModal}
                                    item={item}
                                    removeItem={removeItem}
                                    refRBSheet={refRBSheet}
                                    setModalHeight={setModalHeight}
                                    setEveryItem={setEveryItem}
                                    setPreEditItem={setPreEditItem}
                                    setErrorText={setErrorText}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={[FDR(), JCC('space-between')]}>
                            <GeneralText
                                text="Total Price"
                                textStyle={[{ fontFamily: FontFamily.Black }, FC('#252525'), FS(16)]}
                            />
                            <GeneralText
                                text={'₹' + total}
                                textStyle={[{ fontFamily: FontFamily.Black }, FC('#252525'), FS(16)]}
                            />
                        </View>
                    </>
                ) : null}
            </View>
            <View style={[PH(), PT()]}>
                <View style={{ paddingTop: 20 }}>
                    <RightComponentButtonWithLeftText
                        buttonText={'Continue'}
                        containerStyle={[MT(0.1), { borderRadius: 30, width: '70%', alignSelf: 'center' }]}
                        onPress={() => {
                            setOpenContinueModal('CONTINUE');
                            refRBSheet.current.open();
                            setModalHeight(600);
                        }}
                        disabled={everyItem.length > 0 ? false : true}
                    />
                </View>
            </View>

            <BottomSheet
                navigation={navigation}
                quantity={quantity}
                price={price}
                changeSellingPrice={changeSellingPrice}
                setEveryItem={setEveryItem}
                total={total}
                loading={loading}
                removeItem={removeItem}
                everyItem={everyItem}
                changeQuantity={changeQuantity}
                add={add}
                allProducts={allProducts}
                item={item}
                modalHeight={modalHeight}
                openContinueModal={openContinueModal}
                showEnter={showEnter}
                setShowEnter={setShowEnter}
                setId={setId}
                setItem={setItem}
                findProduct={findProduct}
                id={id}
                route={route}
                refRBSheet={refRBSheet}
                setOpenContinueModal={setOpenContinueModal}
                preEditItem={preEditItem}
                errorText={errorText}
                setErrorText={setErrorText}
            />
        </View>
    );
};

export default CreateBill;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    circle: {
        alignSelf: 'center',
        borderRadius: 30,
        padding: 1,
        backgroundColor: mainColor,
    },
});
