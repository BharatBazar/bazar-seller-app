import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Keyboard, } from 'react-native';
import React, { useRef, useState } from 'react';
import { AIC, AS, BC, BGCOLOR, BR, BW, FC, FDR, FLEX, FS, H, JCC, ML, MT, P, PH, PL, PR, PT, PV, W } from '@app/common/styles';
import { GENERAL_PADDING, MLA, PA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { colorCode, mainColor } from '@app/common/color';
import WrappedText from '@app/screens/component/WrappedText';
import { FontFamily, fs18 } from '@app/common';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { Image } from 'react-native';
import { products } from './products';
import BottomSheet from './BottomSheet';
import { Storage, StorageItemKeys } from '@app/storage';
import { APIGetItemSize } from '@app/server/apis/product/product.api';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';


var totalItem: [] = []

const CreateBill: React.FC = ({ navigation, route }: any) => {
    const [modalHeight, setModalHeight] = React.useState(500)
    const [color, setColor] = React.useState("#ffffff")
    const [id, setId] = React.useState<Number>()
    const [item, setItem]: any = React.useState([])
    const [showEnter, setShowEnter] = React.useState<Boolean>(true)
    const [openContinueModal, setOpenContinueModal] = React.useState<String>('')
    const [editItem, setEditItem] = useState<{}>()
    const [allProducts, setAllProducts]: any = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [everyItem, setEveryItem]: any = React.useState([])
    const [quantity, setQuantity] = React.useState(1)
    const [price, setPrice] = React.useState(0)

    const refRBSheet: any = useRef()


    const removeItem = (id: any) => {
        const j = everyItem.filter((e: any) => {
            return e._id !== id
        })
        setEveryItem(j)
    }



    var total = 0;

    everyItem.forEach((i: any) => {
        total += i.price * i.quantity
    })





    const findProduct = async (id: number) => {
        setLoading(true)
        const shopId = await Storage.getItem(StorageItemKeys.userDetail);
        const itemResponse: any = await APIGetItemSize({ shopId: shopId.shop, itemId: id })
        const product = itemResponse.payload[0]
        if (itemResponse.status === 1) {

            setModalHeight(600)
            setLoading(false)
            setAllProducts(product)
            setItem([product])
            setShowEnter(false)
        }
        else {
            setLoading(false)
            ToastHOC.errorAlert("Item not found", "", "top")
        }
    }

    const Add = (item: any) => {
        item['price'] = price

        if (allProducts._id === item._id) {
            const updateQuantity = allProducts.quantity = quantity
            console.log(updateQuantity);
            setQuantity(1)
            setPrice(0)
            setItem([allProducts])
        }
        else {
            console.log("error occured");
        }
        const check = everyItem.filter((e: any) => e._id === item._id)
        if (check.length === 1) {
            ToastHOC.errorAlert("Item already in list", '', "top")
            Keyboard.dismiss()
        }
        else {
            setEveryItem(everyItem.concat(item))
            setItem([])
            refRBSheet.current.close()
        }

    }


    const ChangeQuantity = (quantity: number) => {
        if (quantity > allProducts.quantity) {
            Alert.alert("you cannot add item")
        } else {
            setQuantity(quantity)
        }
    }

    const ChangeSellingPrice = (price: number) => {
        setPrice(price)
    }

    const renderData = ({ item }: any) => {
        return (
            <>
                <View style={styles.card}>
                    <View style={[FDR(), JCC('space-between')]}>
                        <View style={[PA(5), PH(), FDR()]}>
                            <Image style={{width:80,height:80,borderRadius:10}} source={{ uri: item.productId.parentId.image }} />
                            <View style={[AS(), PL(.2), FDR('column'), JCC('space-between')]}>
                                <Text style={[FS(16), FC("#252525"), { fontFamily: FontFamily.Black, }]}>{item.productId.parentId.name}</Text>
                                <Text style={[FS(14), { fontFamily: FontFamily.Regular }]}>{item.productName}</Text>
                                <Text style={[MT(.1), FS(12), FC("red"), BW(1), PH(), PV(), BR(10), BC("red")]}>₹ {item.quantity * item.price}</Text>
                            </View>


                        </View>

                        <View style={[AS(), W(25), H(25), BR(25), BGCOLOR(item.productId.colors[0].color.description ? item.productId.colors[0].color.description : "black")]} />

                        <View style={[AS(), FDR()]}>
                            <Text style={[P(), FS(17), AS("center"), FC("#252525"), { fontFamily: FontFamily.Black }]}>{item.quantity} pcs.</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeItem(item._id)} style={[PR(.2), MT(.2)]}>
                            <CrossIcon name='cross' color={"#252525"} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }


    return (
        <View style={[FLEX(1), BGCOLOR("#f9f6ee")]}>
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
                    containerStyle={[ML(.2)]}
                    fontFamily={FontFamily.Medium}
                />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Add Product'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        setOpenContinueModal("ADD_PRODUCT")
                        refRBSheet.current.open()
                        setModalHeight(500)
                    }}
                />
            </View>

            <View style={[FLEX(.8), PH(.5)]}>

                {everyItem.length > 0 ? (<>
                    <FlatList
                        data={everyItem}
                        renderItem={renderData}
                        showsVerticalScrollIndicator={false}
                    />
                </>) : (null)}

            </View>
            <View style={[PH(), PT()]}>
                {everyItem.length > 0 ? (
                    <>
                        <View style={[FDR(), JCC("space-between")]}>
                            <Text style={[{ fontFamily: FontFamily.Black }, FC("#252525"), FS(16)]}>Total Price</Text>
                            <Text style={[{ fontFamily: FontFamily.Black }, FC("#252525"), FS(16)]}>$ {total}</Text>
                        </View>
                    </>
                ) : (null)}

                <View style={{ paddingTop: 20 }}>
                    <RightComponentButtonWithLeftText
                        buttonText={'Continue'}
                        containerStyle={[MT(0.1), { borderRadius: 30, width: "70%", alignSelf: "center" }]}
                        onPress={() => {
                            setOpenContinueModal("CONTINUE")
                            refRBSheet.current.open()
                            setModalHeight(500)
                        }}
                        disabled={everyItem.length > 0 ? false : true}
                    />
                </View>
            </View>

            <BottomSheet 
                navigation={navigation}
                quantity={quantity}
                price={price}
                ChangeSellingPrice={ChangeSellingPrice}
                setEveryItem={setEveryItem}
                total={total}
                loading={loading}
                removeItem={removeItem}
                everyItem={everyItem}
                editItem={editItem}
                ChangeQuantity={ChangeQuantity}
                Add={Add}
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
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    circle: {
        alignSelf: "center",
        borderRadius: 30,
        padding: 1,
        backgroundColor: mainColor

    }
});
