import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, } from 'react-native';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { AIC, BGCOLOR, FDR, ML, MT } from '@app/common/styles';
import { GENERAL_PADDING, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { colorCode, mainColor } from '@app/common/color';
import WrappedText from '@app/screens/component/WrappedText';
import { FontFamily, fs18 } from '@app/common';
import RBSheet from 'react-native-raw-bottom-sheet';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { products } from './products';
import BottomSheet from './BottomSheet';
import { Storage, StorageItemKeys } from '@app/storage';
import { APIGetItemSize } from '@app/server/apis/product/product.api';

var totalItem: [] = []

const CreateBill: React.FC = ({ navigation, route }) => {
    const [modalHeight, setModalHeight] = React.useState(500)
    const [color, setColor] = React.useState("#ffffff")
    const [id, setId] = React.useState<Number>()
    const [item, setItem] = useState([])
    const [showEnter, setShowEnter] = useState<Boolean>(true)
    const [openContinueModal, setOpenContinueModal] = useState<String>()
    const [editItem, setEditItem] = useState<{}>()
    const [allProducts, setAllProducts] = useState([])
    const [k, setK] = useState([])

    const refRBSheet = useRef()


    const removeItem = (id:any)=>{
        const j = k.filter((e)=>{
            return e.kkd !== id
        })
        setK(j)
    }



var total = 0;

k.forEach(i=>{
    total +=i.price*i.quantity
})





    const findProduct =async (id: number) => {
        // const product = products.filter(e => e.kkd === Number(id))
        const shopId = await  Storage.getItem(StorageItemKeys.userDetail);
        const itemResponse = await  APIGetItemSize({shopId:shopId.shop,itemId:id})
        const product = itemResponse.payload.productId.colors
        console.log("RESPOnse",product);
        if(itemResponse.status === 1){
            setModalHeight(600)
        setAllProducts(product)
        setItem([product])
        setShowEnter(false)
        }
        else{
            console.log("Product not found");
        }
    }

    const Add = (item: any) => {
        setK([...k,item])
        setItem([])
        refRBSheet.current.close()
    }

   
    


    const ChangeQuantity = (quantity: number, item: {}) => {
        const product = products.find(e => e.kkd === Number(item.kkd)).quantity = quantity
        const fProduct = products.find(e => e.kkd === Number(item.kkd))
        setItem([fProduct])


    }

    const IncreaseQuantity=(item:{})=>{
        const u = k.find(e=>e.kkd === Number(item.kkd)).quantity++
        
       setK([...k])
     
    }
    const DecreaseQuantity=(item:{})=>{
        const u = k.find(e=>e.kkd === Number(item.kkd)).quantity--
        
       setK([...k])
     
    }
    
// useEffect(() => {
//  console.log("USER_DETAIL", Storage.getItem(StorageItemKeys.userDetail));
// }, [])

    

    const renderData = ({ item }) => {
        console.log("ITEMS",item);
        return (
            <>
                {/* <TouchableOpacity onPress={() => editProductModal(item)} style={styles.card}> */}
                <View style={styles.card}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ padding: 5, paddingHorizontal: 10, flexDirection: "row" }}>
                            <Image style={{ width: 80, height: 80, borderRadius: 10 }} source={{ uri: item.img }} />
                            <View style={{ alignSelf: "center", paddingLeft: 10, flexDirection: "column", justifyContent: "space-between" }}>
                                <Text style={{ fontFamily: FontFamily.Black, color: "#252525", fontSize: 16 }}>{item.name}</Text>
                                <Text style={{ fontFamily: FontFamily.Regular, fontSize: 14 }}>{item.productName}</Text>
                                <Text style={{ marginTop: 2, fontFamily: FontFamily.Black, fontSize: 12, color: "red", borderWidth: 1, paddingHorizontal: 13, paddingVertical: 2, borderRadius: 10, borderColor: "red" }}>$ {item.quantity * item.price}</Text>
                            </View>


                        </View>
                        {/* <View style={{ alignSelf: "center", width: 25, height: 25, borderRadius: 12.5, backgroundColor: "red" }}>

                        </View> */}
                        <View style={{ alignSelf: "center", flexDirection: "row" }}>
                            <Entypo onPress={()=>DecreaseQuantity(item)} size={24} color={"#ffffff"} style={styles.circle} name='minus' />
                            <Text style={{ padding: 5, fontSize: 17, alignSelf: "center", fontFamily: FontFamily.Black, color: "#252525" }}>{item.quantity}</Text>
                            <Entypo onPress={()=>IncreaseQuantity(item)} size={24} color={"#ffffff"} style={styles.circle} name='plus' />

                          </View>
                        <TouchableOpacity onPress={()=>removeItem(item.kkd)} style={{ paddingRight: 10, marginTop: 5 }}>
                            <CrossIcon name='cross' color={"#252525"} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#f9f6ee" }}>
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
                    containerStyle={{ marginLeft: 20 }}
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

            <View style={{ paddingHorizontal: 20, flex: .8 }}>

                {k.length > 0 ? (<>
                    <FlatList
                        data={k}
                        renderItem={renderData}
                        showsVerticalScrollIndicator={false}
                    />
                </>) : (null)}

                <View style={{ width: "100%", }}>

               

            </View>
          
            </View>
              <View style={{paddingHorizontal:20,paddingTop:30}}>
                {k.length>0?(
                    <>
                      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                      <Text style={{fontFamily:FontFamily.Black,color:"#252525",fontSize:16}}>Total Price</Text>
                      <Text style={{fontFamily:FontFamily.Black,color:"#252525",fontSize:16}}>$ {total}</Text>
                  </View>
                    </>
                ):(null)}
                 
               <View style={{paddingTop:20}}>
                    <RightComponentButtonWithLeftText
                    buttonText={'Continue'}
                    containerStyle={[MT(0.1),{borderRadius:30,width:"70%",alignSelf:"center"}]}
                    onPress={() => {
                        setOpenContinueModal("CONTINUE")
                        refRBSheet.current.open()
                        setModalHeight(500)
                    }}
                    disabled={k.length > 0 ?false:true}
                />
               </View>
                </View>

            <BottomSheet navigation={navigation} total={total} removeItem={removeItem} k={k} editItem={editItem} ChangeQuantity={ChangeQuantity} Add={Add} allProducts={allProducts} item={item} modalHeight={modalHeight} setColor={setColor} openContinueModal={openContinueModal} totalItem={totalItem} showEnter={showEnter} setShowEnter={setShowEnter} setId={setId} setItem={setItem} findProduct={findProduct} id={id} route={route} refRBSheet={refRBSheet} setOpenContinueModal={setOpenContinueModal} products={products} />
        </View>
    );
};

export default CreateBill;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // justifyContent: 'center',
        // backgroundColor: 'grey',
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
