import { FlatList, Keyboard, StyleSheet, ToastAndroid, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { AIC, BGCOLOR, FDR, FLEX } from '@app/common/styles';
import { colorCode, mainColor } from '@app/common/color';
import { GENERAL_PADDING, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { FontFamily, fs18 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { Storage, StorageItemKeys } from '@app/storage';
import { showBill, updateBill } from '@app/server/apis/billdesk/bill.api';
import UpdateBottomSheet from './UpdateBottomSheet';
import Loader from '@app/screens/component/Loader';
import ShowBillsRender from './ProductRenders/ShowBillsRender';

const ShowBills: React.FC = ({ navigation }: any) => {
    const [bill, setBill] = React.useState([]);
    const [billId, setBillId] = React.useState<string>('');
    const [itemId, setItemId] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<number>(1);
    const [price, setPrice] = React.useState<number>(1);
    const [loading, setLoading] = useState(false);

    const refRBSheet: any = useRef();

    const getBills = async () => {
        setLoading(true);
        try {
            const userDetail = await Storage.getItem(StorageItemKeys.userDetail);
            console.log('Shop ids', userDetail);
            const billResponse: any = await showBill(userDetail.shop || userDetail.shop._id);
            console.log('bill response', billResponse);
            if (billResponse.status == 1) {
                setLoading(false);
                setBill(billResponse.payload);
            } else {
                setLoading(false);
                console.log('Bill not fetched');
            }
        } catch (error: any) {
            setLoading(false);
            ToastAndroid.show(error.message, 200);
            console.log('ERRROR_OCCURED', error.message);
        }
    };

    const updateBills = async () => {
        try {
            setLoading(true);
            const update = await updateBill(billId, { price, quantity, itemId });
            if (update.status === 1) {
                getBills();
                Keyboard.dismiss();
            }
        } catch (error: any) {
            setLoading(false);
            console.log('ERROR', error.message);
        }
    };

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
        setQuantity(0);
        setPrice(0);
        refRBSheet.current.open();
        setBillId(billId);
        setItemId(productId.productSize._id);
    };

    return (
        <View style={[FLEX(1), BGCOLOR('#ffffff')]}>
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
            {loading === true ? (
                <Loader />
            ) : (
                <>
                    <FlatList
                        data={bill}
                        renderItem={({ item }) => <ShowBillsRender item={item} openUpdateSheet={openUpdateSheet} />}
                        keyExtractor={(bill: any) => bill._id}
                    />
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

const styles = StyleSheet.create({});
