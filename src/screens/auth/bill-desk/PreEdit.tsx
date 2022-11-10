






import WrappedTextInput from '@app/screens/component/WrappedTextInput'
import { FontFamily, fs12 } from '@app/common'
import { AIC, AS, BR, BW, FC, FDR, FS, H, HP, JCC, MT, W } from '@app/common/styles'
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig'
import { getHP } from '@app/common/dimension'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'

interface IPreEdit{
    refRBSheet:any
}

const PreEdit:React.FC<IPreEdit> = ({refRBSheet}) => {
  return (
     <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <Text style={[{ fontFamily: FontFamily.Helvatica }, AS("center"), FS(16)]}>Edit Product</Text>
            <View>
                  <View style={[ MT(0.2), JCC('space-between')]}>
                            <Text style={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(17)]}>
                                Quantity
                            </Text>

                    <WrappedTextInput
                    // onChangeText={(e) => changeQuantity(e)}
                    placeholder="Eg 12"
                    containerStyle={[border, MT(0.15), HP(0.5), borRad, AIC('flex-start'), { paddingLeft: getHP(0.1) }]}
                    textInputStyle={[FS(fs12), HP(0.4)]}
                    keyboardType="number-pad"
                />

                </View>
               
                 <View style={[ MT(0.2), JCC('space-between')]}>
                            <Text style={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(17)]}>
                                Selling Price
                            </Text>

                    <WrappedTextInput
               //   onChangeText={(e) => changeSellingPrice(e)}
                    placeholder="Eg 500"
                    containerStyle={[border, MT(0.15), HP(0.5), borRad, AIC('flex-start'), { paddingLeft: getHP(0.1) }]}
                    textInputStyle={[FS(fs12), HP(0.4)]}
                    keyboardType="number-pad"
                />
                
                </View>


              
            </View>

        </View>
  )
}

export default PreEdit

const styles = StyleSheet.create({})