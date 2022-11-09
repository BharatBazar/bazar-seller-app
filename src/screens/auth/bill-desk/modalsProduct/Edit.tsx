import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily, fs12 } from '@app/common'
import { AIC, AS, FS, HP, MT } from '@app/common/styles'
import WrappedTextInput from '@app/screens/component/WrappedTextInput'
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig'
import { getHP } from '@app/common/dimension'
import { IEdit } from '../billInterface/Interfaces'

const Edit:React.FC<IEdit> = ({ChangeQuantity}) => {
  return (
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
  )
}

export default Edit

const styles = StyleSheet.create({
    
})