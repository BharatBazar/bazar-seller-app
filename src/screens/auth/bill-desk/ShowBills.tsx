import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AIC, BC, BGCOLOR, BW, FDR } from '@app/common/styles';
import { borderColor, colorCode, mainColor } from '@app/common/color';
import { GENERAL_PADDING, MHA, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { FontFamily, fs18 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { Storage, StorageItemKeys } from '@app/storage';
import { showBill } from '@app/server/apis/billdesk/bill.api';

const ShowBills = ({navigation}) => {

     const [bill, setBill] = useState([])

     const getBills = async()=>{
       try {
         const shopId = await  Storage.getItem(StorageItemKeys.userDetail);
         const billResponse:any = await showBill(shopId.shop)
         console.log("RESPONSe",billResponse.payload[0].products);
         if(billResponse.status === 1){
           setBill(billResponse.payload[0].products)
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

    const renderData = ({item})=>{
      console.log("ITEMss",item.productId.parentId.name);
      return <View style={[styles.card,{paddingHorizontal:20,paddingVertical:5,marginTop:"3%"}]} >
                 <View style={{height:40,justifyContent:"space-between",flexDirection:"row"}}>
                   <Text style={{fontFamily:FontFamily.Helvatica}}>Created on <Text style={{fontFamily:FontFamily.Black}}>{item.createdAt}</Text></Text>
                  <Text style={{fontFamily:FontFamily.Helvatica,fontSize:16}}>{item.name}</Text>
                </View> 
                 {/* <View style={[BW(0.5), BC(borderColor), MHA()]} /> */}
                 {/* <Text>{item.products}</Text> */}
                {/* <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:5,marginTop:"3%"}}>
                  <Image style={{width:50,height:50,borderRadius:5}} source={{uri:item.products.productId.parentId.image}}/>
                  <Text style={{alignSelf:"center"}}>{item.products[0].productId.parentId.name} × {item.products.quantity} pcs.</Text>
                  <View style={{width:24,height:24,alignSelf:"center",borderRadius:12.5,backgroundColor:item.products.productId.colors[0].color.description}}></View>
                </View> */}
                </View>
    }

  return (
    <View>
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