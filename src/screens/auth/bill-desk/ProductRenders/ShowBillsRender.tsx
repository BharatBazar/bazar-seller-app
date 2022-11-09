import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AS, BC, BGCOLOR, BR, BW, FDR, H, JCC, MT, PH, PV, W } from '@app/common/styles';
import { FontFamily } from '@app/common';
import moment from 'moment';
import { borderColor } from '@app/common/color';
import { MHA } from '@app/common/stylesheet';
import Edit from 'react-native-vector-icons/Feather';
import { IShowBillsRender } from '../billInterface/Interfaces';



const ShowBillsRender:React.FC<IShowBillsRender> = ({item,openUpdateSheet}) => {
  return (
    <View style={[styles.card, PH(), PV(), MT(0.2)]}>
                <View style={[H(40), JCC('space-between'), FDR()]}>
                    <Text style={{ fontFamily: FontFamily.Helvatica }}>
                        Created on{' '}
                        <Text style={{ fontFamily: FontFamily.Black }}>
                            {moment(item.createdAt).format('DD-MM-YY')}
                        </Text>
                    </Text>
                </View>
                <View style={[BW(0.5), BC(borderColor), MHA()]} />
                {item.products.map((e: any) => {
                    return (
                        <View key={e._id} style={[FDR(), JCC('space-between'), PH(0.2), MT(0.2)]}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 5 }}
                                source={{ uri: e.productSize.productId.parentId.image }}
                            />
                            <Text style={[AS('center')]}>
                                {e.productSize.productId.parentId.name} × {e.quantity} pcs.
                            </Text>
                            <View
                                style={[
                                    W(24),
                                    H(24),
                                    AS('center'),
                                    BR(12.5),
                                    BGCOLOR(e.productSize.productId.colors[0].color.description),
                                ]}
                            ></View>
                            <Text style={[AS('center')]}>₹ {e.price}</Text>
                            <TouchableOpacity onPress={() => openUpdateSheet(item._id, e)} style={[AS('center')]}>
                                <Edit name="edit" color="#252525" size={18} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
  )
}

export default ShowBillsRender

const styles = StyleSheet.create({
        card: {
        elevation: 1,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
})