import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AS, BC, BGCOLOR, BR, BW, FC, FDR, FS, H, JCC, MT, P, PH, PL, PR, PV, W } from '@app/common/styles'
import { PA } from '@app/common/stylesheet'
import { FontFamily } from '@app/common'
import CrossIcon from 'react-native-vector-icons/Entypo';
import { IBillProductRendering } from '../billInterface/Interfaces'



const ProductRender :React.FC<IBillProductRendering> = ({item,removeItem}) => {
  return (
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
  )
}

export default ProductRender

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
})