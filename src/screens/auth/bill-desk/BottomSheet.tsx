import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect, useRef, useState } from 'react'
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CrossIcon from 'react-native-vector-icons/Entypo';
import { FontFamily, fs12 } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, FS, HP, MT } from '@app/common/styles';
import WrappedTextInput from '@app/screens/component/WrappedTextInput';
import Entypo from 'react-native-vector-icons/Entypo'
import { getHP } from '@app/common/dimension';
import { createBill } from '@app/server/apis/billdesk/bill.api';
import { NavigationKey } from '@app/labels';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import Loader from '@app/screens/component/Loader';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { Storage, StorageItemKeys } from '@app/storage';

const BottomSheet = ({
    Add,
    item,
    modalHeight,
    openContinueModal,
    showEnter,
    setShowEnter,
    setItem,
    findProduct,
    id,
    route,
    refRBSheet,
    setId,
    setOpenContinueModal,
    ChangeQuantity,
    editItem,
    allProducts,
    everyItem,
    total,
    removeItem,
    loading,
    setEveryItem,
    ChangeSellingPrice,
    price,
    quantity,
    navigation

}) => {
    // const refRBSheet = useRef();

      useEffect(() => {
        if (route.params.openModal === true) {
            setOpenContinueModal("ADD_PRODUCT")
            refRBSheet.current.open();
        }
    }, []);

    const renderReview = ({ item }) => {
        console.log("LENG",item.productId.colors[0].color.description);
        // console.log("RENDER",item);
        return (
            <>
                <View style={[styles.card]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ padding: 5, paddingHorizontal: 10, flexDirection: "row" }}>
                            <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={{ uri: item.productId.parentId.image }} />
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontFamily: FontFamily.Helvatica }}>{item.quantity} × {item.productId.parentId.name}</Text>
                        </View>
                        <View style={{ alignSelf: "center", width: 25, height: 25, borderRadius: 12.5, backgroundColor:  item.productId.colors[0].color.description ?  item.productId.colors[0].color.description : "black" }}>

                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontFamily: FontFamily.Bold, color: "#252525" }}>₹ {item.quantity * item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>removeItem(item._id)} style={{ alignSelf: "center", paddingRight: 10 }}>
                            <DeleteIcon name='delete' size={22} color={"#252525"} />
                        </TouchableOpacity>

                    </View>
                </View>
            </>
        )
    }

    const AddProduct=async(item:any)=>{
        try {

            const id = everyItem.map((e:any)=>e)
            const shopId = await  Storage.getItem(StorageItemKeys.userDetail);
            const bill = await createBill({
                name:"Babu rao",
                totalPrice:total,
                products:id.map((e:any)=>{

                    return {"quantity":e.quantity,
                    "price":e.price*e.quantity,
                    "productSize":e._id}
                }),
                shopId:shopId.shop
            })
            if(bill.status === 1){
                ToastHOC.infoAlert("Product has been saved","Information","top")
                setEveryItem([])
                refRBSheet.current.close()
                navigation.goBack()
                
            }
        } catch (error) {
            console.log("ERROR",error.message);
        }
    }


    return (
        <View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={modalHeight}
                animationType={"slide"}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        // backgroundColor: "#f9f6ee"
                        backgroundColor: "#fff"
                    }
                }}
            >
                {openContinueModal === "CONTINUE" ? (
                    <>
                        <View style={{ paddingHorizontal: 20,flex:.8 }}>
                            <View style={{ alignSelf: "center" }}>
                                <Text style={{ fontSize: 16, fontFamily: FontFamily.Regular }}>Review Items</Text>
                            </View>
                            <FlatList
                                data={everyItem}
                                renderItem={renderReview}
                                keyExtractor={item => item._id}
                            />

                        </View>
                        <View style={{paddingHorizontal:20,marginTop:20}}>
                            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                      <Text style={{fontFamily:FontFamily.Black,color:"#252525",fontSize:16}}>Total Price</Text>
                      <Text style={{fontFamily:FontFamily.Black,color:"#252525",fontSize:16}}>$ {total} </Text>
                  </View>
                        </View>
                        
                        <RightComponentButtonWithLeftText
                            buttonText={'Confirm'}
                            containerStyle={[MT(0.1), { position: "absolute", bottom: 0, width: "100%" }]}
                            onPress={() => {
                                AddProduct(everyItem)
                            }}
                            disabled={everyItem.length > 0 ? (false) : (true)}
                        />
                    </>
                ) : openContinueModal === "ADD_PRODUCT" ? (
                    <>
                        <View style={{ paddingHorizontal: 20, flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text
                                    style={{
                                        fontFamily: FontFamily.Helvatica,
                                        fontSize: 16,
                                        alignSelf: 'center',
                                    }}
                                >
                                    Add Product
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    refRBSheet.current.close()
                                    setItem([])
                                }} style={{ borderRadius: 15, backgroundColor: mainColor }}>
                                    <CrossIcon name="cross" color={"#ffffff"} size={24} style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily: FontFamily.Regular }}>Enter Item Id</Text>

                                <WrappedTextInput
                                    placeholder='Id'
                                    containerStyle={[
                                        border,
                                        MT(0.15),
                                        HP(.5),
                                        borRad,
                                        AIC('flex-start'),
                                        { paddingLeft: getHP(0.1) },

                                    ]}
                                    textInputStyle={[FS(fs12), HP(0.4)]}
                                    keyboardType="numeric"
                                    onChangeText={(id) => {
                                        setId(id)
                                        setShowEnter(true), setItem([])
                                    }}

                                />
                                {/* <TextInput  keyboardType="number-pad" onChangeText={(id)=>{setId(id)
                       setShowEnter(true), setItem([]) }} style={{ borderWidth: 1, borderColor: mainColor, height: 35,fontFamily:FontFamily.Regular, marginTop: 5, borderRadius: 5 }} /> */}
                                {id && showEnter !== false ? (
                                    <>
                                        <TouchableOpacity onPress={() => findProduct(id)} style={{ marginTop: 15, padding: 3, width: 70, borderRadius: 5, backgroundColor: mainColor }}>
                                            <Text style={{ fontFamily: FontFamily.Bold, color: "#ffffff", alignSelf: "center" }}>Enter</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (null)}
                            </View>
                            {
                                loading === true?(<Loader/>):(
                                    item.length === 1 && id ? (
                                    <>
                                        <View style={styles.card}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <View style={{ padding: 5, paddingHorizontal: 10, flexDirection: "row" }}>
                                                    <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={{ uri: allProducts.productId.parentId.image }} />
                                                    <View style={{ alignSelf: "center", paddingLeft: 10, flexDirection: "column", justifyContent: "space-between" }}>
                                                        {/* <Text style={{ fontFamily: FontFamily.Black, color: "#252525", fontSize: 16 }}>{allProducts[0].color.name}</Text> */}
                                                        <Text style={{ fontFamily: FontFamily.Regular, fontSize: 14 }}>{allProducts.productId.parentId.name} × {quantity < 1 ? 1 : quantity }</Text>
                                                        {/* <Text style={{ fontFamily: FontFamily.Regular, fontSize: 14 }}>{allProducts.productId.parentId.name}</Text> */}
                                                    </View>


                                                </View>
                                                <View style={{ alignSelf: "center", width: 25, height: 25, borderRadius: 12.5, backgroundColor: allProducts.productId.colors[0].color.description ? allProducts.productId.colors[0].color.description : "black" }}>

                                                </View>
                                                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                                                    {/* <Text style={{ padding: 5, fontSize: 17, alignSelf: "center", fontFamily: FontFamily.Black, color: "#252525" }}>{allProducts[0].sizes[0].quantity}</Text> */}
                                                </View>
                                                <Text style={{ fontFamily: FontFamily.Black, fontSize: 15, color: "#252525", alignSelf: "center", paddingRight: 5 }}>₹ {price * quantity}</Text>


                                            </View>
                                        </View>

                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                        <View >
                                                <Text style={{ fontFamily: FontFamily.Bold, color: "#252525", fontSize: 17}}>Quantity</Text>
                                                <Text style={{alignSelf:"center",color:"green",fontSize:14}}>Quantity available {allProducts.quantity}</Text>

                                        </View>
                                                <TextInput onChangeText={(e) => ChangeQuantity(e, allProducts)} keyboardType="number-pad" style={{ borderWidth: 1, height: 36, borderRadius: 5, width: 40, alignSelf: "center", fontSize: 16, fontFamily: FontFamily.Bold, }} />
                                        </View>
                                        
                                        <View style={{ flexDirection: "row", marginTop: 25, justifyContent: "space-between" }}>
                                            <Text style={{ fontFamily: FontFamily.Bold, fontSize: 17, color: "#252525", alignSelf: "center", }}>Selling Price</Text>
                                            <TextInput onChangeText={(e) => ChangeSellingPrice(e)} keyboardType="numeric" style={{ borderWidth: 1, height: 36, borderRadius: 5, width: 40, alignSelf: "center", fontSize: 16, fontFamily: FontFamily.Bold, }} />
                                        </View>
                                    </>
                                ) : (null)
                                )
                            }


                        </View>
                        <View style={{ position: "absolute", bottom: 0, width: "100%", alignSelf: "center" }}>
                            <RightComponentButtonWithLeftText
                                buttonText={'Add'}
                                containerStyle={[MT(0.1)]}
                                onPress={() => {
                                    Add(allProducts)
                                }}
                                disabled={allProducts._id !== (undefined || null ) && (price > 0 ) && (quantity >0) ? (false) : (true)}
                            />

                        </View>
                    </>
                ) : openContinueModal === "EDIT" ? (
                    <>
                        <View style={{ paddingHorizontal: 20, flex: 1 }}>
                            <Text style={{ fontFamily: FontFamily.Helvatica, alignSelf: "center", fontSize: 16 }}>Edit Product</Text>

                            <View>
                                {/* <Text style={{ fontFamily: FontFamily.Regular, fontSize: 15 }}>Item Id {editItem.kkd}</Text> */}
                            </View>

                            <View>
                                <WrappedTextInput

                                    placeholder='Quantity'
                                    containerStyle={[
                                        border,
                                        MT(0.15),
                                        HP(.5),
                                        borRad,
                                        AIC('flex-start'),
                                        { paddingLeft: getHP(0.1) },

                                    ]}
                                    textInputStyle={[FS(fs12), HP(0.4)]}
                                    keyboardType="number-pad"
                                    onChangeText={(e) => ChangeQuantity(e, editItem)}
                                />
                                <WrappedTextInput
                                    placeholder='Price'
                                    containerStyle={[
                                        border,
                                        MT(0.15),
                                        HP(.5),
                                        borRad,
                                        AIC('flex-start'),
                                        { paddingLeft: getHP(0.1) },

                                    ]}
                                    textInputStyle={[FS(fs12), HP(0.4)]}
                                    keyboardType="number-pad"
                                />
                            </View>

                        </View>
                        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                            {/* <RightComponentButtonWithLeftText
                                buttonText={'Edit Product'}
                                containerStyle={[MT(0.1)]}
                                onPress={() => {
                                    Edit(editItem)
                                }}
                                disabled={item.length > 0 ? (false) : (true)}
                            /> */}
                        </View>
                    </>
                ) : (null)}



            </RBSheet>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
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
})