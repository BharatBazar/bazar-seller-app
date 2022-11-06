import { FlatList, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { AIC, AS, BC, BGCOLOR, BR, BW, FDR, FLEX, H, JCC, MT, PH, PV, W } from '@app/common/styles';
import { borderColor, colorCode, mainColor } from '@app/common/color';
import { GENERAL_PADDING, MHA, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { FontFamily, fs18 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { Storage, StorageItemKeys } from '@app/storage';
import { showBill, updateBill } from '@app/server/apis/billdesk/bill.api';
import moment from 'moment';
import Edit from 'react-native-vector-icons/Feather';
import UpdateBottomSheet from './UpdateBottomSheet';
import Loader from '@app/screens/component/Loader';

const ShowBills = ({ navigation }: any) => {
    const [bill, setBill] = React.useState([]);
    const [billId, setBillId] = React.useState<String>('');
    const [itemId, setItemId] = React.useState<String>('');
    const [quantity, setQuantity] = React.useState<Number>(1);
    const [price, setPrice] = React.useState<Number>(1);
    const [loading, setLoading] = useState(false)

    const refRBSheet: any = useRef();

    const getBills = async () => {
        console.log("checking2...");
        setLoading(true)
        try {
            const shopId = await Storage.getItem(StorageItemKeys.userDetail);

            const billResponse: any = await showBill(shopId.shop);
            if (billResponse.status === 1) {
                setLoading(false)
                setBill(billResponse.payload);
            } else {
                setLoading(false)
                console.log('Bill not fetched');
            }
        } catch (error: any) {
            setLoading(false)
            console.log('ERRROR_OCCURED', error.message);
        }
    };

     const updateBills = async () => {
    try {
      setLoading(true)
      const update = await updateBill(billId, { price, quantity, itemId })
      if(update.status === 1){
          getBills()
          Keyboard.dismiss()
      }
    } catch (error: any) {
        setLoading(false)
      console.log("ERROR", error.message);
    }
  }


    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getBills();
        });

        return () => {
            navigation.removeListener('focus', () => {
                getBills();
            });
        };
    }, [updateBills]);

    const openUpdateSheet = (billId: string, productId: string | any) => {
        setQuantity(0)
        setPrice(0)
        refRBSheet.current.open();
        setBillId(billId);
        setItemId(productId.productSize._id);
    };

    const renderData = ({ item }: any) => {
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
        );
    };

    return (
        <View style={[FLEX(1)]}>
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
           {loading === true ?(
               <Loader/>
           ):(
               <>
              
            <FlatList data={bill} renderItem={renderData} keyExtractor={(bill: any) => bill._id} />
            <UpdateBottomSheet
                setQuantity={setQuantity}
                setPrice={setPrice}
                quantity={quantity}
                price={price}
                refRBSheet={refRBSheet}
                updateBills={updateBills}
            />
               </>
           )}
        </View>
    );
};

export default ShowBills;

const styles = StyleSheet.create({
    card: {
        elevation: 1,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});
