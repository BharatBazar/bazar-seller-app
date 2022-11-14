import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AS, BW, FDR, FLEX, FS, H, JCC, MT, PH, } from '@app/common/styles';
import { FontFamily } from '@app/common';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { Storage, StorageItemKeys } from '@app/storage';
import { createBill } from '@app/server/apis/billdesk/bill.api';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import ReviewProduct from '../ProductRenders/ReviewProduct';
import { IContinueModal } from '../billInterface/Interfaces';
import GeneralText from '@app/screens/components/text/GeneralText';



const Continue: React.FC<IContinueModal> = ({
    setEveryItem,
    refRBSheet,
    everyItem,
    total,
    navigation,
    removeItem }) => {




    const addProduct = async () => {
        try {

            const id = everyItem.map((e: any) => e)
            const shopId = await Storage.getItem(StorageItemKeys.userDetail);
            const bill = await createBill({
                name: "Babu rao",
                totalPrice: total,
                products: id.map((e: any) => {

                    return {
                        "quantity": e.quantity,
                        "price": e.price * e.quantity,
                        "productSize": e._id
                    }
                }),
                shopId: shopId.shop
            })
            if (bill.status === 1) {
                ToastHOC.infoAlert("Product has been saved", "Information", "top")
                setEveryItem([])
                refRBSheet.current.close()
                navigation.goBack()

            }
        } catch (error: any) {
            console.log("ERROR", error.message);
        }
    };



    return (
        <>
            <View style={[PH(), FLEX(.8)]}>
                <View style={[AS("center")]}>
                    <GeneralText text='Review Items' textStyle={[FS(16), { fontFamily: FontFamily.Regular }]} />
                </View>
                <View >
                    <ScrollView  >

                        {everyItem?.map((e) => {
                            return (<ReviewProduct item={e} removeItem={removeItem} />)
                        })}

                    </ScrollView>
                </View>

            </View>
            <View style={[PH(), MT(.2)]}>
                <View style={[FDR(), JCC("space-between")]}>
                    <GeneralText text='Total Price' textStyle={[{ fontFamily: FontFamily.Black, color: "#252525" }, FS(16)]} />
                    <GeneralText text={"₹" + total} textStyle={[{ fontFamily: FontFamily.Black, color: "#252525" }, FS(16)]} />
                </View>
            </View>

            <RightComponentButtonWithLeftText
                buttonText={'Confirm'}
                containerStyle={[MT(0.1), { position: "absolute", bottom: 0, width: "100%" }]}
                onPress={() => {
                    addProduct()
                }}
                disabled={everyItem.length > 0 ? (false) : (true)}
            />
        </>
    )
}

export default Continue;

const styles = StyleSheet.create({});
