import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'; 
import React, { useEffect} from 'react'
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CrossIcon from 'react-native-vector-icons/Entypo';
import { FontFamily, fs12, NavigationProps } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, AS, BGCOLOR, BR, BW, FC, FDR, FLEX, FS, H, HP, JCC, MT, P, PH, PL, PR, W } from '@app/common/styles';
import WrappedTextInput from '@app/screens/component/WrappedTextInput';
import { getHP } from '@app/common/dimension';
import { createBill } from '@app/server/apis/billdesk/bill.api';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import Loader from '@app/screens/component/Loader';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { Storage, StorageItemKeys } from '@app/storage';

interface BottomSheet{
    Add:Function,
    item:String[],
    modalHeight:number,
    openContinueModal:String,
    showEnter:Boolean,
    setShowEnter:(value:boolean)=>boolean,
    setItem:(value:[])=>string[],
    findProduct:Function,
    id:Number,
    route:any,
    refRBSheet:any,
    setId:(value:string)=>Number,
    setOpenContinueModal:(value:string)=>string,
    ChangeQuantity:Function,
    allProducts:any,
    everyItem:any[],
    total:number,
    removeItem:Function,
    loading:Boolean,
    setEveryItem:(value:any)=>string[],
    ChangeSellingPrice:Function,
    price:Number,
    quantity:Number,
    navigation:NavigationProps


}

const BottomSheet:React.FC<BottomSheet> = ({
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

      useEffect(() => {
        if (route.params.openModal === true) {
            setOpenContinueModal("ADD_PRODUCT")
            refRBSheet.current.open();
        }
    }, []);

    const renderReview = ({ item }:any) => {
        return (
            <>
                <View style={[styles.card]}>
                    <View style={[FDR(),JCC("space-between")]}>
                        <View style={[P(),PH(),FDR()]}>
                            <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={{ uri: item.productId.parentId.image }} />
                        </View>
                        <View style={[AS("center")]}>
                            <Text style={{ fontFamily: FontFamily.Helvatica }}>{item.quantity} × {item.productId.parentId.name}</Text>
                        </View>
                        <View style={[AS("center"),W(25),H(25),BR(12.5),BGCOLOR(item.productId.colors[0].color.description ?  item.productId.colors[0].color.description : "black" )]}/>
                        <View style={[AS("center")]}>
                            <Text style={[FC("#252525"),{ fontFamily: FontFamily.Bold}]}>₹ {item.quantity * item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>removeItem(item._id)} style={[AS(),PR(.2)]}>
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
        } catch (error:any) {
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
                        backgroundColor: "#fff"
                    }
                }}
            >
                {openContinueModal === "CONTINUE" ? (
                    <>
                        <View style={[PH(),FLEX(.8)]}>
                            <View style={[AS("center")]}>
                                <Text style={[FS(16),{  fontFamily: FontFamily.Regular }]}>Review Items</Text>
                            </View>
                            <FlatList
                                data={everyItem}
                                renderItem={renderReview}
                                keyExtractor={item => item._id}
                            />

                        </View>
                        <View style={[PH(),MT(.2)]}>
                            <View style={[FDR(),JCC("space-between")]}>
                      <Text style={[{fontFamily:FontFamily.Black,color:"#252525"},FS(16)]}>Total Price</Text>
                      <Text style={[{fontFamily:FontFamily.Black,color:"#252525"},FS(16)]}>$ {total} </Text>
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
                        <View style={[PH(),FLEX(1)]}>
                            <View style={[FDR(),JCC("space-between")]}>
                                <Text
                                    style={[{
                                        fontFamily: FontFamily.Helvatica,
                                    },FS(16),AS("center")]}
                                >
                                    Add Product
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    refRBSheet.current.close()
                                    setItem([])
                                }} style={[BR(15),BGCOLOR(mainColor)]}>
                                    <CrossIcon name="cross" color={"#ffffff"} size={24} style={{ alignSelf: "center" }} />
                                </TouchableOpacity>
                            </View>

                            <View style={[MT(.2)]}>
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
                                {id && showEnter !== false ? (
                                    <>
                                        <TouchableOpacity onPress={() => findProduct(id)} style={[MT(.2),P(),W(70),BR(),BGCOLOR(mainColor)]}>
                                            <Text style={[{ fontFamily: FontFamily.Bold, color: "#ffffff", alignSelf: "center" },FC("#ffffff"),AS("center")]}>Enter</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (null)}
                            </View>
                            {
                                loading === true?(<Loader/>):(
                                    item.length === 1 && id ? (
                                    <>
                                        <View style={styles.card}>
                                            <View style={[FDR(),JCC("space-between")]}>
                                                <View style={[P(),PH(.3),FDR()]}>
                                                    <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={{ uri: allProducts.productId.parentId.image }} />
                                                    <View style={[AS("center"),JCC("space-between"),FDR("column"),PL(.2)]}>
                                                        <Text style={[{ fontFamily: FontFamily.Regular },FS(14)]}>{allProducts.productId.parentId.name} × {quantity < 1 ? 1 : quantity }</Text>
                                                    </View>


                                                </View>
                                                <View style={[AS("center"),W(25),H(25),BR(12.5),BGCOLOR(allProducts.productId.colors[0].color.description ? allProducts.productId.colors[0].color.description : "black")]}>

                                                </View>
                                                <View style={[AS("center"),FDR()]}>
                                                </View>
                                                <Text style={[FS(15),FC("#252525"),AS("center"),PR(.2),{ fontFamily: FontFamily.Black}]}>₹ {Number(price) * Number(quantity)}</Text>


                                            </View>
                                        </View>

                                        <View style={[FDR(),JCC("space-between"),MT(.2)]}>
                                        <View >
                                                <Text style={[{ fontFamily: FontFamily.Bold},FC("#252525"),FS(17)]}>Quantity</Text>
                                                <Text style={[AS("center"),FC("green"),FS(14)]}>Quantity available {allProducts.quantity}</Text>

                                        </View>
                                                <TextInput onChangeText={(e) => ChangeQuantity(e, allProducts)} keyboardType="number-pad" style={[BW(1),H(36),BR(),W(40),AS("center"),FS(16),{fontFamily:FontFamily.Bold}]} />
                                        </View>
                                        
                                        <View style={[FDR(),MT(.2),JCC("space-between")]}>
                                            <Text style={[{ fontFamily: FontFamily.Bold },AS("center"),FC("#252525"),FS(17)]}>Selling Price</Text>
                                            <TextInput onChangeText={(e) => ChangeSellingPrice(e)} keyboardType="numeric" style={[BW(1),H(36),BR(),W(40),AS("center"),FS(16),{fontFamily: FontFamily.Bold, }]} />
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
                            <Text style={[{ fontFamily: FontFamily.Helvatica},AS("center"),FS(16)]}>Edit Product</Text>
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
                                    onChangeText={(e) => ChangeQuantity(e)}
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