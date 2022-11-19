import { FontFamily, fs12 } from '@app/common';
import { AIC, AS, FC, FS, HP, JCC, MT } from '@app/common/styles';
import { border, borRad } from '@app/screens/app/product-edit/component/generalConfig';
import { getHP } from '@app/common/dimension';
import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { IPreEdit } from '../billInterface/Interfaces';
import GeneralText from '@app/screens/components/text/GeneralText';
import GeneralTextInput from '@app/screens/components/input/GeneralTextInput';

const PreEdit: React.FC<IPreEdit> = ({ setEveryItem, everyItem, preEditItem, refRBSheet }) => {
    const [errorText1, setErrorText1] = React.useState<string>('');
    const [errorText2, setErrorText2] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<number>(1)
    const [price, setPrice] = React.useState<string | number>('10')

    const changeQuantity = (e: string | number | any) => {
        setQuantity(e)
    };

    const changeSellingPrice = (e: string) => {
        setPrice(e)
    };

    var regExp = /[a-zA-Z]/;
    const updateItem: Function = () => {
        // if (regExp.test(quantity)) {
        //     console.log("TEST!", regExp.test(quantity) && regExp.test(price))
        // } else {
        //     console.log("Test2", regExp.test(quantity) && regExp.test(price));
        // }
        if (quantity < 1 || quantity > preEditItem.fixedQuantity) {
            setErrorText1('This much quantity is not available');
        } else {
            everyItem.find((e) => e._id === preEditItem._id).quantity = quantity;
            setEveryItem([...everyItem]);
            setErrorText1('');
        }


        if (price < 10) {
            setErrorText2('Please enter amount of atleast 10 rupees');
        } else {
            everyItem.find((e) => e._id === preEditItem._id).price = price;
            setEveryItem([...everyItem]);
            setErrorText2('');
        }
    }



    return (
        <>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <GeneralText
                    text="Edit Product"
                    textStyle={[{ fontFamily: FontFamily.Helvatica }, AS('center'), FS(16)]}
                />
                <View>
                    <View style={[MT(0.2), JCC('space-between')]}>
                        <GeneralText
                            text="Quantity"
                            textStyle={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(17)]}
                        />

                        <GeneralText
                            text={`quantity available ${preEditItem.fixedQuantity.toString()}`}
                            textStyle={[{ fontFamily: FontFamily.Regular }, FC('green'), FS(12)]}
                        />

                        <GeneralTextInput
                            onChangeText={(e) => changeQuantity(e)}
                            placeholder={preEditItem.quantity.toString()}
                            containerStyle={[
                                border,
                                MT(0.15),
                                HP(0.5),
                                borRad,
                                AIC('flex-start'),
                                { paddingLeft: getHP(0.1) },
                            ]}
                            textInputStyle={[FS(fs12), HP(0.4)]}
                            keyboardType="numeric"
                            errorText={errorText1}
                        />
                    </View>

                    <View style={[MT(0.2), JCC('space-between')]}>
                        <GeneralText
                            text="Selling Price"
                            textStyle={[{ fontFamily: FontFamily.Regular }, FC('#252525'), FS(17)]}
                        />

                        <GeneralTextInput
                            onChangeText={(e) => changeSellingPrice(e)}
                            placeholder={preEditItem.price.toString()}
                            containerStyle={[
                                border,
                                MT(0.15),
                                HP(0.5),
                                borRad,
                                AIC('flex-start'),
                                { paddingLeft: getHP(0.1) },
                            ]}
                            textInputStyle={[FS(fs12), HP(0.4)]}
                            keyboardType="numeric"
                            maxLength={8}
                            errorText={errorText2}

                        />
                    </View>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center' }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Done'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        updateItem()
                        // refRBSheet.current.close();
                    }}
                />
            </View>
        </>
    );
};

export default PreEdit;

const styles = StyleSheet.create({});
