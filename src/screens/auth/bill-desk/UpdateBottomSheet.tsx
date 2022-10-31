import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react'
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { MT } from '@app/common/styles';
import { FontFamily } from '@app/common';
import { updateBill } from '@app/server/apis/billdesk/bill.api';

const UpdateBottomSheet = ({
 refRBSheet,
 setQuantity,
 setPrice,
 billId,
 itemId,
 price,
 quantity
}) => {

  const updateBills = async()=>{
    try {
      const prices = 90
      const update = await updateBill(billId,{prices,quantity,itemId})
      console.log("UPDATE_RESPONSE",update);
    } catch (error) {
      console.log("ERROR",error.message);
    }
  }


  return (
  
     <View style={{flex:1}}>
      <RBSheet
        ref={refRBSheet}
        height={500}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
         <View style={{paddingHorizontal:30,flex:1}}>
              <View style={{alignSelf:"center"}}>
              <Text>Update Item</Text>
          </View>
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingVertical:30}}>
        <Text>Quantity</Text>
 <TextInput onChangeText={(e)=>setQuantity(e)} keyboardType="number-pad" style={{ borderWidth: 1, height: 36, borderRadius: 5, width: 40, alignSelf: "center", fontSize: 16, fontFamily: FontFamily.Bold, }} />

    </View>
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <Text>Price Per Item</Text>
 <TextInput onChange={(e)=>setPrice(e)} keyboardType="number-pad" style={{ borderWidth: 1, height: 36, borderRadius: 5, width: 40, alignSelf: "center", fontSize: 16, fontFamily: FontFamily.Bold, }} />

    </View>
  
         </View>
         <View>
               <RightComponentButtonWithLeftText
                            buttonText={'Update'}
                            containerStyle={[MT(0.1), { position: "absolute", bottom: 0, width: "100%" }]}
                            onPress={() => {
                                updateBills()
                            }}
                            disabled={false}
                        />
         </View>
      </RBSheet>
    </View>

  )
}

export default UpdateBottomSheet

const styles = StyleSheet.create({})