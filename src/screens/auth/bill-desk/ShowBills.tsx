import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { AIC, BC, BGCOLOR, BW, FDR } from '@app/common/styles';
import { borderColor, colorCode, mainColor } from '@app/common/color';
import { GENERAL_PADDING, MHA, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { FontFamily, fs18 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { Storage, StorageItemKeys } from '@app/storage';
import { showBill } from '@app/server/apis/billdesk/bill.api';
import moment from 'moment';
import Edit from 'react-native-vector-icons/Feather'
import UpdateBottomSheet from './UpdateBottomSheet';

const ShowBills = ({navigation}) => {

     const [bill, setBill] = React.useState([])
     const [opensheet, setOpensheet] = React.useState(false)
     const [billId, setBillId] = React.useState('')
     const [itemId, setItemId] = React.useState('')
     const [quantity, setQuantity] = useState(1)
     const [price, setPrice] = useState(1)

     const refRBSheet = useRef()

     const getBills = async()=>{
       try {
          //  console.log("SS",await Storage.getItem(StorageItemKeys.userDetail));
         const shopId = await  Storage.getItem(StorageItemKeys.userDetail);
       
         const billResponse:any = await showBill(shopId.shop)
         console.log("RESPONSe",billResponse.payload);
         if(billResponse.status === 1){
           setBill(billResponse.payload)
         }
         else{
           console.log("Bill not fetched");
         }
         
       } catch (error) {
         console.log("ERRROR_OCCURED",error.message)
       }
     }

     React.useEffect(() => {
        navigation.addListener('focus', () => {
            getBills()
        });

        return () => {
            navigation.removeListener('focus', () => {
               getBills()
            });
        };
    }, []);
    

    const openUpdateSheet = (billId,productId)=>{
        refRBSheet.current.open();
        console.log("ITT",billId,productId.productSize._id);
        setBillId(billId)
        setItemId(productId.productSize._id)
    }

    const renderData = ({item})=>{
      console.log("ITE",item);
      // const arrayItem = item.products
      // console.log("LLL",arrayItem.length);
      // return item.map((e)=>{
        return <View  style={[styles.card,{paddingHorizontal:20,paddingVertical:5,marginTop:"3%"}]} >
                 <View style={{height:40,justifyContent:"space-between",flexDirection:"row"}}>
                   <Text style={{fontFamily:FontFamily.Helvatica}}>Created on <Text style={{fontFamily:FontFamily.Black}}>{moment(item.createdAt).format("DD-MM-YY")}</Text></Text>
                  {/* <Text style={{fontFamily:FontFamily.Helvatica,fontSize:16}}>{e.productSize.productId.parentId.name}</Text> */}
                </View> 
                 <View style={[BW(0.5), BC(borderColor), MHA()]} />
                 {/* <Text>{item.products}</Text> */}
              {item.products.map((e)=>{
                return   <View key={e._id} style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:5,marginTop:"3%"}}>
                  <Image style={{width:50,height:50,borderRadius:5}} source={{uri:e.productSize.productId.parentId.image}}/>
                  <Text style={{alignSelf:"center"}}>{e.productSize.productId.parentId.name} × {e.quantity} pcs.</Text>
                  <View style={{width:24,height:24,alignSelf:"center",borderRadius:12.5,backgroundColor:e.productSize.productId.colors[0].color.description}}></View>
                  <Text style={{alignSelf:"center"}}>₹ {e.price}</Text>
                 <TouchableOpacity onPress={()=>openUpdateSheet(item._id,e)} style={{alignSelf:"center"}}>
                    <Edit name="edit"  color="#252525" size={18}/>
                 </TouchableOpacity>
                </View>
              })}
                </View>
        // return console.log("P");;

      // })

 
    }

  return (
    <View style={{flex:.7}}>
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
                    text={'Your Bills'}
                    fontSize={fs18}
                    textColor={'#ffffff'}
                    textAlign="center"
                    containerStyle={{ marginLeft: 20 }}
                    fontFamily={FontFamily.Medium}
                />
            </View>
                <FlatList
                data={bill}
                renderItem={renderData}
                keyExtractor={bill=>bill._id}
                />
<UpdateBottomSheet price={price} quantity={quantity} billId={billId} itemId={itemId} setQuantity={setQuantity} setPrice={setPrice} refRBSheet={refRBSheet}/>
                
    </View>
    
  )
}

export default ShowBills

const styles = StyleSheet.create({
    card: {
        elevation: 1,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
  
    },
})