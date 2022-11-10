import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { AIC, AS, BR, BW, FDR, FLEX, FS, H, JCC, MT, PH, PV, W } from '@app/common/styles';
import { FontFamily } from '@app/common';
import { IUpdateBill } from './billInterface/Interfaces';

const UpdateBottomSheet: React.FC<IUpdateBill> = ({
    refRBSheet,
    setQuantity,
    setPrice,
    updateBills,
    price,
    quantity,
}) => {
    return (
        <View style={{ flex: 1 }}>
            <RBSheet
                ref={refRBSheet}
                height={500}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                }}
            >
                <View style={[PH(), FLEX(1)]}>
                    <View style={AS('center')}>
                        <Text>Update Item</Text>
                    </View>
                    <View style={[FDR(), JCC('space-between'), AIC(), PV(0.2)]}>
                        <Text>Quantity</Text>
                        <TextInput
                            onChangeText={(e) => setQuantity(e)}
                            keyboardType="number-pad"
                            style={[BW(1), H(36), BR(), W(50), AS('center'), FS(16), { fontFamily: FontFamily.Bold }]}
                        />
                    </View>
                    <View style={[AIC(), FDR(), JCC('space-between')]}>
                        <Text>Price Per Item</Text>
                        <TextInput
                            onChangeText={(e) => setPrice(e)}
                            keyboardType="number-pad"
                            style={[BW(1), H(36), BR(), W(50), AS('center'), FS(16), { fontFamily: FontFamily.Bold }]}
                        />
                    </View>
                </View>
                <View>
                    <RightComponentButtonWithLeftText
                        buttonText={'Update'}
                        containerStyle={[MT(0.1), { position: 'absolute', bottom: 0, width: '100%' }]}
                        onPress={() => {
                            updateBills();
                        }}
                        disabled={(price && quantity) <= 0 ? true : false}
                    />
                </View>
            </RBSheet>
        </View>
    );
};

export default UpdateBottomSheet;

const styles = StyleSheet.create({});
