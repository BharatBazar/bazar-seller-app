import { StyleSheet, Text, View, FlatList, Alert, Keyboard } from 'react-native';
import React, { useEffect, useRef } from 'react';
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
    const [preEditItem, setPreEditItem] = React.useState<[]>([])

    

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
    };

    const findProduct = async (id: number) => {
        try {
            setLoading(true);
            const shopId = await Storage.getItem(StorageItemKeys.userDetail);
            const itemResponse: any = await APIGetItemSize({ shopId: shopId.shop, itemId: id });
            console.log('RESPPO', itemResponse);
            const product = itemResponse.payload[0];
            if (itemResponse.status == 1) {
                setModalHeight(600);
                setLoading(false);
                setAllProducts(product);
                setItem([product]);
                setShowEnter(false);
                Keyboard.dismiss()
            } else {
                setLoading(false);
                Keyboard.dismiss()
                ToastHOC.errorAlert('Item not found', '', 'top');
            }
        } catch (error:any) {
            setLoading(false);
            Keyboard.dismiss()
            ToastHOC.errorAlert('Not found', error.message,"top");
        }
    };

    const add = (item: any) => {
     try {
           item['price'] = price;

        if (allProducts._id === item._id) {
            const updateQuantity = (allProducts.quantity = quantity);
            console.log(updateQuantity);
            setQuantity(1);
            setPrice(0);
            setItem([allProducts]);
            Keyboard.dismiss()
        } else {
            console.log('error occured');
            Keyboard.dismiss()
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
     } catch (error) {
         Keyboard.dismiss()
         ToastHOC.errorAlert('Item not added', 'Not added',"top");
     }
    };

    const changeQuantity = (quantity: number) => {
        if (quantity > allProducts.quantity) {
            Alert.alert('you cannot add item');
        } else {
            setQuantity(quantity);
        }
    };

    const changeSellingPrice = (price: number) => {
        setPrice(price);
    };


    return (
        <View style={[FLEX(1), BGCOLOR('#f9f6ee')]}>
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
                    }}
                />
            </View>

            <View style={[FLEX(0.8), PH(0.5)]}>
                {everyItem.length > 0 ? (
                    <>
                        <FlatList
                            data={everyItem}
                            renderItem={({ item }) => 
                            <ProductRender 
                            setOpenContinueModal={setOpenContinueModal} 
                            item={item} 
                            removeItem={removeItem} 
                            refRBSheet={refRBSheet}
                            setModalHeight={setModalHeight}
                            setEveryItem={setEveryItem}
                            setPreEditItem={setPreEditItem}
                            />
                        }
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={[FDR(), JCC('space-between')]}>
                            <Text style={[{ fontFamily: FontFamily.Black }, FC('#252525'), FS(16)]}>Total Price</Text>
                            <Text style={[{ fontFamily: FontFamily.Black }, FC('#252525'), FS(16)]}>$ {total}</Text>
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
                            setModalHeight(500);
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
