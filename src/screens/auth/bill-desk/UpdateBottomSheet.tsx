import { StyleSheet, Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { AIC, AS, FLEX, FS, HP, JCC, MT, PH, PV } from '@app/common/styles';
import { fs12 } from '@app/common';
import { IUpdateBill } from './billInterface/Interfaces';
import WrappedTextInput from '@app/screens/component/WrappedTextInput';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import { getHP } from '@app/common/dimension';

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
                    <View style={[JCC('space-between'), PV(0.2)]}>
                        <Text>Quantity</Text>

                        <WrappedTextInput
                            onChangeText={(e) => setQuantity(e)}
                            placeholder="Eg 12"
                            containerStyle={[
                                border,
                                MT(0.15),
                                HP(0.5),
                                borRad,
                                AIC('flex-start'),
                                { paddingLeft: getHP(0.1) },
                            ]}
                            textInputStyle={[FS(fs12), HP(0.4)]}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View style={[JCC('space-between')]}>
                        <Text>Price Per Item</Text>

                        <WrappedTextInput
                            onChangeText={(e) => setPrice(e)}
                            placeholder="Eg 500"
                            containerStyle={[
                                border,
                                MT(0.15),
                                HP(0.5),
                                borRad,
                                AIC('flex-start'),
                                { paddingLeft: getHP(0.1) },
                            ]}
                            textInputStyle={[FS(fs12), HP(0.4)]}
                            keyboardType="number-pad"
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
