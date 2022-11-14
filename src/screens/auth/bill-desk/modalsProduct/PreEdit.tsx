import WrappedTextInput from '@app/screens/component/WrappedTextInput';
import { FontFamily, fs12 } from '@app/common';
import { AIC, AS, FC, FS, HP, JCC, MT } from '@app/common/styles';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import { getHP } from '@app/common/dimension';
import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { IPreEdit } from '../billInterface/Interfaces';
import GeneralText from '@app/screens/components/text/GeneralText';

const PreEdit: React.FC<IPreEdit> = ({ setEveryItem, everyItem, preEditItem, refRBSheet }) => {
    const changeQuantity = (e: string | number) => {
        if (e < 1 || e > preEditItem.fixedQuantity) {
            Alert.alert('Invalid quantity', 'Please enter correct quantity');
        } else {
            everyItem.find((e) => e._id === preEditItem._id).quantity = e;
            setEveryItem([...everyItem]);
        }
    };

    const changeSellingPrice = (e: string | number) => {
        if (e < 1) {
            Alert.alert('Invalid ammount', 'Please enter correct amount');
        } else {
            everyItem.find((e) => e._id === preEditItem._id).price = e;
            setEveryItem([...everyItem]);
        }
    };

    const quantity = preEditItem

    return (
        <>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <GeneralText text="Edit Product" textStyle={[{ fontFamily: FontFamily.Helvatica }, AS("center"), FS(16)]} />
                <View>
                    <View style={[MT(0.2), JCC('space-between')]}>
                        <GeneralText text="Qantity" textStyle={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(17)]} />
                        <GeneralText text={preEditItem.fixedQuantity + ` quantity available`} textStyle={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(13), FC('green')]} />


                        <WrappedTextInput
                            onChangeText={(e) => changeQuantity(e)}
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

                    <View style={[MT(0.2), JCC('space-between')]}>
                        <GeneralText text="Selling Price" textStyle={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(17)]} />
                        <GeneralText text={"₹ " + preEditItem.price + `change price`} textStyle={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(13), FC('green')]} />


                        <WrappedTextInput
                            onChangeText={(e) => changeSellingPrice(e)}
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
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Done'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        refRBSheet.current.close();
                    }}
                />
            </View>
        </>
    );
};

export default PreEdit;

const styles = StyleSheet.create({});
