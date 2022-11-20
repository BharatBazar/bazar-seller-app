import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AS, BC, BGCOLOR, BR, BW, FC, FDR, FS, H, JCC, MT, P, PH, PL, PR, PV, W } from '@app/common/styles';
import { FF, PA } from '@app/common/stylesheet';
import { FontFamily } from '@app/common';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import { IBillProductRendering } from '../billInterface/Interfaces';
import { mainColor } from '@app/common/color';
import GeneralText from '@app/screens/components/text/GeneralText';

const ProductRender: React.FC<IBillProductRendering> = ({
    item,
    setOpenContinueModal,
    refRBSheet,
    setModalHeight,
    setPreEditItem,
    setEveryItem,
    everyItem
}) => {

    const removeItem: Function = (id: any) => {
        const removeItem = everyItem.filter((e: any) => {
            return e._id !== id;
        });
        setEveryItem(removeItem);
        if (everyItem.length === 1) {
            refRBSheet.current.close();
        }
    };


    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setOpenContinueModal('PRE-EDIT');
                    setModalHeight(500);
                    refRBSheet.current.open();
                    setPreEditItem(item);
                }}
                style={styles.card}
            >
                <View style={[FDR(), JCC('space-between')]}>
                    <View style={[PA(10), PH(), FDR()]}>
                        <Image
                            style={{ width: 60, height: 60, borderRadius: 10 }}
                            source={{ uri: item.productId.sellerIdentificationPhoto }}
                        />

                        <View style={[PL(0.3)]}>
                            <GeneralText
                                text={item.productId.parentId.name}
                                textStyle={[FS(16), FC('#252525'), { fontFamily: FontFamily.Black }]}
                            />
                            <GeneralText
                                text={item.productId.parentId.type}
                                textStyle={[FS(14), MT(.05), { fontFamily: FontFamily.Regular }]}
                            />
                            <GeneralText
                                text={'Item id ' + item.itemId}
                                textStyle={[FS(12), MT(.1), { fontFamily: FontFamily.Regular }]}
                            />


                        </View>

                    </View>


                    <View style={[FDR("column")]}>
                        <GeneralText
                            text={'₹' + item.quantity * item.price + '.00'}
                            textStyle={[FS(16), FC('#252525'), { fontFamily: FontFamily.Black }, MT(.14)]}
                        />
                        <GeneralText
                            text={item.quantity + ' pcs.'}
                            textStyle={[FS(14), MT(.05), { fontFamily: FontFamily.Regular }]}
                        />
                        <View
                            style={[
                                W(15),
                                H(15),
                                BR(7.5),
                                MT(.05),
                                BGCOLOR(
                                    item.productId.colors[0].color.description
                                        ? item.productId.colors[0].color.description
                                        : 'black',
                                ),
                            ]}
                        />
                    </View>


                    <TouchableOpacity onPress={() => removeItem(item._id)} style={[PR(0.2), MT(.1)]}>
                        <CrossIcon name="cancel" color={mainColor} size={24} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default ProductRender;

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        marginTop: '2%'
    },
});
