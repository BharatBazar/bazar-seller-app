import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { AIC, AS, BGCOLOR, BR, FDR, FLEX, FS, HP, JCC, MT, PH, PV } from '@app/common/styles';
import { fs12 } from '@app/common';
import { IUpdateBill } from './billInterface/Interfaces';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import { getHP } from '@app/common/dimension';
import GeneralText from '@app/screens/components/text/GeneralText';
import GeneralTextInput from '@app/screens/components/input/GeneralTextInput';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import { mainColor } from '@app/common/color';

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
                    <View style={[FDR(), JCC('space-between')]}>
                        <GeneralText fontFamily={'Helvatica'} fontSize={16} textAlign="center" text="Update Product" />
                        <TouchableOpacity
                            onPress={() => {
                                refRBSheet.current.close();
                            }}
                            style={[BR(15), BGCOLOR(mainColor)]}
                        >
                            <CrossIcon name="cancel" color={'#ffffff'} size={24} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={[JCC('space-between'), PV(0.2)]}>
                        <GeneralText text="Quantity" />

                        <GeneralTextInput
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
                        <GeneralText text="Price per item" />

                        <GeneralTextInput
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
                        disabled={(price || quantity) <= 0 ? true : false}
                    />
                </View>
            </RBSheet>
        </View>
    );
};

export default UpdateBottomSheet;

const styles = StyleSheet.create({});
