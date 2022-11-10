import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AS, BGCOLOR, BR, FC, FDR, H, JCC, P, PH, PR, W } from '@app/common/styles'
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FontFamily } from '@app/common'
import { IReviewProduct } from '../billInterface/Interfaces'



const ReviewProduct: React.FC<IReviewProduct> = ({ item, removeItem }) => {
    return (
        <View style={[styles.card]}>
            <View style={[FDR(), JCC("space-between")]}>
                <View style={[P(), PH(), FDR()]}>
                    <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={{ uri: item.productId.parentId.image }} />
                </View>
                <View style={[AS("center")]}>
                    <Text style={{ fontFamily: FontFamily.Helvatica }}>{item.quantity} × {item.productId.parentId.name}</Text>
                </View>
                <View style={[AS("center"), W(25), H(25), BR(12.5), BGCOLOR(item.productId.colors[0].color.description ? item.productId.colors[0].color.description : "black")]} />
                <View style={[AS("center")]}>
                    <Text style={[FC("#252525"), { fontFamily: FontFamily.Bold }]}>₹ {item.quantity * item.price}</Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item._id)} style={[AS(), PR(.2)]}>
                    <DeleteIcon name='delete' size={22} color={"#252525"} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ReviewProduct

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