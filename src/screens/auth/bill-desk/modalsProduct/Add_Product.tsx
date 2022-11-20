import {
    Alert,
    Image,
    Keyboard,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { AIC, AS, BGCOLOR, BR, BW, FC, FDR, FLEX, FS, H, HP, JCC, MT, P, PH, PL, PR, W } from '@app/common/styles';
import { FontFamily, fs12 } from '@app/common';
import { mainColor } from '@app/common/color';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import { getHP } from '@app/common/dimension';
import Loader from '@app/screens/component/Loader';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import { IAdd_Product } from '../billInterface/Interfaces';
import GeneralText from '@app/screens/components/text/GeneralText';
import GeneralTextInput from '@app/screens/components/input/GeneralTextInput';
import { Storage, StorageItemKeys } from '@app/storage';
import { APIGetItemSize } from '@app/server/apis/product/product.api';
import { checkBillProductExistOrNot } from '@app/server/apis/billdesk/bill.api';

const Add_Product: React.FC<IAdd_Product> = ({ refRBSheet, allProducts, everyItem, setAllProducts, setEveryItem }) => {
    const [quan, setQuan] = React.useState<String>('1');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showEnter, setShowEnter] = React.useState<boolean>(false);
    const [item, setItem]: any = React.useState<[]>([]);
    const [id, setId] = React.useState<number | string>();
    const [errorText, setErrorText] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<number>(1);
    const [price, setPrice] = React.useState<number>(0);

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

    const findProduct: Function = async (id: number | string) => {
        try {
            setLoading(true);
            const shopId = await Storage.getItem(StorageItemKeys.userDetail);
            const itemResponse: any = await APIGetItemSize({ shopId: shopId.shop, itemId: id });
            console.log('RESPPO', itemResponse);
            const product = itemResponse.payload[0];
            const checkItemExist: any = await checkBillProductExistOrNot({
                shopId: shopId.shop,
                productId: product._id,
            });
            console.log('Checking...', checkItemExist);
            if (checkItemExist.payload === true) {
                setLoading(false);
                ToastAndroid.show('Item already listed in bill', 404);
            } else {
                if (itemResponse.status == 1) {
                    // setModalHeight(600);
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
            }
        } catch (error: any) {
            setLoading(false);
            Keyboard.dismiss();
            setErrorText(error.message);
        }
    };

    const add = async (item: any) => {
        try {
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
                ToastAndroid.show('Item already in list', 405);
                Keyboard.dismiss();
            } else {
                setEveryItem(everyItem.concat(item));
                setItem([]);
                refRBSheet.current.close();
            }
        } catch (error: any) {
            Keyboard.dismiss();
            ToastAndroid.show(error.message, 404);
        }
    };

    React.useEffect(() => {
        setTimeout(() => {
            setErrorText('');
        }, 5000);
    }, [errorText]);

    return (
        <>
            <View style={[PH(), FLEX(1)]}>
                <View style={[FDR(), JCC('space-between')]}>
                    <GeneralText fontFamily={'Helvatica'} fontSize={16} textAlign="center" text="Add Product" />
                    <TouchableOpacity
                        onPress={() => {
                            refRBSheet.current.close();
                            setItem([]);
                        }}
                        style={[BR(15), BGCOLOR(mainColor)]}
                    >
                        <CrossIcon name="cancel" color={'#ffffff'} size={24} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                </View>

                <View style={[MT(0.2)]}>
                    <GeneralText fontFamily={'Regular'} text="Enter Item Id" />

                    <GeneralTextInput
                        placeholder="Id"
                        containerStyle={[
                            border,
                            MT(0.15),
                            HP(0.5),
                            borRad,
                            AIC('flex-start'),
                            { paddingLeft: getHP(0.1) },
                        ]}
                        textInputStyle={[FS(fs12), HP(0.4)]}
                        onChangeText={(id) => {
                            setId(id);
                            setShowEnter(true), setItem([]);
                            setErrorText('');
                        }}
                        keyboardType='numeric'
                        errorText={errorText}
                    />
                    {id && showEnter !== false ? (
                        <>
                            <TouchableOpacity
                                onPress={() => findProduct(id)}
                                style={[MT(0.2), P(), H(35), JCC('center'), AIC('center'), BR(), BGCOLOR(mainColor)]}
                            >
                                <GeneralText
                                    fontFamily={'Bold'}
                                    textColor={'#ffffff'}
                                    textStyle={AS('center')}
                                    text="Enter"
                                />
                            </TouchableOpacity>
                        </>
                    ) : null}
                </View>
                {loading === true ? (
                    <Loader />
                ) : item.length === 1 && id ? (
                    <>
                        <View style={styles.card}>
                            <View style={[FDR(), JCC('space-between')]}>
                                <View style={[P(), PH(0.3), FDR()]}>
                                    <Image
                                        style={{ width: 80, height: 80, borderRadius: 10 }}
                                        source={{ uri: allProducts.productId.sellerIdentificationPhoto }}
                                    />
                                    <View style={[AS('center'), JCC('space-between'), FDR('column'), PL(0.2)]}>
                                        <GeneralText
                                            text={`${allProducts.productId.parentId.name} × ${quantity < 1 ? 1 : quantity
                                                } `}
                                            textStyle={[{ fontFamily: FontFamily.Medium }, FS(14)]}
                                        />
                                        <GeneralText
                                            text={allProducts.productId.parentId.type}
                                            textStyle={[{ fontFamily: FontFamily.Regular }, FS(14)]}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={[
                                        AS('center'),
                                        W(25),
                                        H(25),
                                        BR(12.5),
                                        BGCOLOR(
                                            allProducts.productId.colors[0].color.description
                                                ? allProducts.productId.colors[0].color.description
                                                : 'black',
                                        ),
                                    ]}
                                ></View>
                                <View style={[AS('center'), FDR()]}></View>

                                <GeneralText
                                    text={'₹' + price * quantity}
                                    fontFamily="Black"
                                    fontSize={15}
                                    textColor="#252525"
                                    textStyle={[AS('center'), PR(0.2)]}
                                />
                            </View>
                        </View>

                        <View style={[FDR(), JCC('space-between'), MT(0.2)]}>
                            <View>
                                <GeneralText text="Quantity" fontFamily="Bold" textColor="#252525" fontSize={17} />

                                <GeneralText
                                    text={
                                        allProducts.quantity === 0
                                            ? 'Out of stock'
                                            : `Quantity available ${allProducts.quantity}`
                                    }
                                    textStyle={[AS('center'), FC(allProducts.quantity === 0 ? 'red' : 'green'), FS(14)]}
                                />
                            </View>
                            <TextInput
                                value={allProducts.quantity === 0 ? '0' : quan}
                                textAlign="center"
                                onChangeText={(e: any) => changeQuantity(Number(e), setQuan)}
                                keyboardType="number-pad"
                                style={[
                                    BW(1),
                                    H(36),
                                    BR(),

                                    AS('center'),
                                    FS(16),
                                    { fontFamily: FontFamily.Bold, padding: 0, paddingHorizontal: 2, minWidth: 40 },
                                ]}
                            />
                        </View>

                        <View style={[FDR(), MT(0.2), JCC('space-between')]}>
                            <GeneralText
                                text="Selling Price"
                                textStyle={[{ fontFamily: FontFamily.Bold }, AS('center'), FC('#252525'), FS(17)]}
                            />

                            <TextInput
                                textAlign="center"
                                onChangeText={(e: any) => changeSellingPrice(e)}
                                keyboardType="numeric"
                                style={[
                                    BW(1),
                                    H(36),
                                    BR(),

                                    AS('center'),
                                    FS(16),
                                    { fontFamily: FontFamily.Bold, padding: 0, paddingHorizontal: 2, minWidth: 40 },
                                ]}
                            />
                        </View>
                    </>
                ) : null}
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Add'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        add(allProducts);
                    }}
                    disabled={allProducts._id !== (undefined || null) && price > 0 && quantity > 0 ? false : true}
                />
            </View>
        </>
    );
};

export default Add_Product;

const styles = StyleSheet.create({
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
        marginTop: '5%',
    },
});
