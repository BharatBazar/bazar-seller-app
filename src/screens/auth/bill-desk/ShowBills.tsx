import { FlatList, Keyboard, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { AIC, AS, BGCOLOR, FDR, FLEX, FS, JCC } from '@app/common/styles';
import { colorCode, mainColor } from '@app/common/color';
import { FF, GENERAL_PADDING, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { FontFamily, fs18 } from '@app/common';
import WrappedText from '@app/screens/component/WrappedText';
import { Storage, StorageItemKeys } from '@app/storage';
import { showBill, updateBill } from '@app/server/apis/billdesk/bill.api';
import UpdateBottomSheet from './UpdateBottomSheet';
import Loader from '@app/screens/component/Loader';
import ShowBillsRender from './ProductRenders/ShowBillsRender';
import GeneralText from '@app/screens/components/text/GeneralText';
import CoreConfig from '@app/screens/hoc/CoreConfig';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';

const ShowBills: React.FC = ({ navigation }: any) => {
    const [bill, setBill] = React.useState([]);
    const [billId, setBillId] = React.useState<string>('');
    const [itemId, setItemId] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<number>(1);
    const [price, setPrice] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(false);

    const refRBSheet: any = useRef();
    const noItemText: string = 'No bills created !';

    const getBills = async () => {
        setLoading(true);
        try {
            const shopId = await CoreConfig.getShopId();

            const billResponse: any = await showBill(shopId);
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
            ToastHOC.errorAlert(error.message);
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
                    {bill.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <GeneralText text={noItemText} textStyle={[FF('Regular'), FS(18)]} />
                        </View>
                    ) : (
                        <>
                            <FlatList
                                data={bill}
                                renderItem={({ item }) => (
                                    <ShowBillsRender item={item} openUpdateSheet={openUpdateSheet} />
                                )}
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
                </>
            )}
        </View>
    );
};

export default ShowBills;

const styles = StyleSheet.create({});
