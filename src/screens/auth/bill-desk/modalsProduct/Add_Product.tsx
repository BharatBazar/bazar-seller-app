import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AIC, AS, BGCOLOR, BR, BW, FC, FDR, FLEX, FS, H, HP, JCC, MT, P, PH, PL, PR, W } from '@app/common/styles';
import { FontFamily, fs12 } from '@app/common';
import { mainColor } from '@app/common/color';
import WrappedTextInput from '@app/screens/component/WrappedTextInput';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import { getHP } from '@app/common/dimension';
import Loader from '@app/screens/component/Loader';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import { IAdd_Product } from '../billInterface/Interfaces';
import GeneralText from '@app/screens/components/text/GeneralText';

const Add_Product: React.FC<IAdd_Product> = ({
    refRBSheet,
    setItem,
    setId,
    setShowEnter,
    id,
    showEnter,
    loading,
    item,
    findProduct,
    allProducts,
    quantity,
    price,
    changeQuantity,
    add,
    changeSellingPrice,
}) => {


    const [quan, setQuan] = React.useState<String>('1')
    const multiply: string = "×"


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

                    <WrappedTextInput
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
                        keyboardType="numeric"
                        onChangeText={(id) => {
                            setId(id);
                            setShowEnter(true), setItem([]);
                        }}
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
                                        <Text style={[{ fontFamily: FontFamily.Regular }, FS(14)]}>
                                            {allProducts.productId.parentId.name} × {quantity < 1 ? 1 : quantity}
                                        </Text>


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

                                <GeneralText text={"₹" + price * quantity} fontFamily="Black" fontSize={15} textColor='#252525' textStyle={[AS("center"), PR(0.2)]} />

                            </View>
                        </View>

                        <View style={[FDR(), JCC('space-between'), MT(0.2)]}>
                            <View>

                                <GeneralText text='Quantity' fontFamily='Bold' textColor='#252525' fontSize={17} />

                                <GeneralText text={allProducts.quantity === 0 ? "Out of stock" : `Quantity available ${allProducts.quantity}`} textStyle={[AS('center'), FC(allProducts.quantity === 0 ? 'red' : 'green'), FS(14)]} />


                            </View>
                            <TextInput
                                value={allProducts.quantity === 0 ? '0' : quan}
                                textAlign="center"
                                onChangeText={(e) => changeQuantity(e, setQuan)}
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
                            <GeneralText text='Selling Price' textStyle={[{ fontFamily: FontFamily.Bold }, AS('center'), FC('#252525'), FS(17)]} />


                            <TextInput
                                textAlign="center"
                                onChangeText={(e) => changeSellingPrice(e)}
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
    },
});
