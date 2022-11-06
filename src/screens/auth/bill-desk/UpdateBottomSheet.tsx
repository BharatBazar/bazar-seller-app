import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react'
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { AIC, AS, BR, BW, FDR, FLEX, FS, H, JCC, MT, PH, PV, W } from '@app/common/styles';
import { FontFamily } from '@app/common';
import { updateBill } from '@app/server/apis/billdesk/bill.api';

interface UpdateBill {
    refRBSheet:Function|any,
    setQuantity:(value:any)=>Number|String,
    setPrice:(value:any)=>Number|String,
    billId:String,
    itemId:String,
    quantity:Number
}

const UpdateBottomSheet:React.FC<UpdateBill> = ({
  refRBSheet,
  setQuantity,
  setPrice,
  billId,
  itemId,
  quantity
}) => {

  const updateBills = async () => {
    try {
      const prices = 90
      const update:{} = await updateBill(billId, { prices, quantity, itemId })
      console.log("UPDATE_RESPONSE", update);
    } catch (error: any) {
      console.log("ERROR", error.message);
    }
  }


  return (

    <View style={{ flex: 1 }}>
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
        <View style={[PH(), FLEX(1)]}>
          <View style={AS("center")}>
            <Text>Update Item</Text>
          </View>
          <View style={[FDR(), JCC("space-between"), AIC(), PV(.2)]}>
            <Text>Quantity</Text>
            <TextInput onChangeText={(e) => setQuantity(e)} keyboardType="number-pad" style={[BW(1), H(36), BR(), W(50), AS("center"), FS(16), { fontFamily: FontFamily.Bold }]} />

          </View>
          <View style={[AIC(), FDR(), JCC("space-between")]}>
            <Text>Price Per Item</Text>
            <TextInput onChange={(e) => setPrice(e)} keyboardType="number-pad" style={[BW(1), H(36), BR(), W(50), AS("center"), FS(16), { fontFamily: FontFamily.Bold }]} />

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