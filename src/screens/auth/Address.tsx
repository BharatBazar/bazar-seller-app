import * as React from 'react';
import { View, TextInput } from 'react-native';
import { fs13 } from '../../common';
import { black50, disabledColor } from '../../common/color';
import { buttonContainerStyle, textInputContainerStyle, componentProps } from '../../common/containerStyles';
import { getHP } from '../../common/dimension';

import { AIC, BGCOLOR, FDR, FLEX, JCC, ML, MT, PH, PV } from '../../common/styles';
import TextButton from '../component/TextButton';
import WrappedDropDown from '../component/WrappedDropDown';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';

export interface AddressProps {}

const Address: React.SFC<AddressProps> = () => {
    const [pinCode, setPinCode] = React.useState<string>('');
    const [area, setArea] = React.useState('');
    const [localAddress, setLocalAddress] = React.useState('');

    return (
        <View style={[FLEX(1), PH(0.4), PV(0.2)]}>
            <ShadowWrapperHOC>
                <HeaderText
                    step={'Step 4'}
                    heading={'Provide your dukan address'}
                    subHeading={
                        'Provide address where your dukan is located in the market so that customer can reach your shop.'
                    }
                />
                <View style={[MT(0.2)]} />
                <TextInput
                    keyboardType={'number-pad'}
                    placeholder={'Pincode'}
                    value={pinCode}
                    style={[textInputContainerStyle, { fontSize: fs13, color: black50 }, PH(0.1)]}
                />
                <View style={[FDR(), MT(0.1)]}>
                    <TextInput
                        keyboardType={'number-pad'}
                        placeholder={'State'}
                        editable={false}
                        style={[
                            textInputContainerStyle,
                            BGCOLOR(disabledColor),
                            FLEX(1),
                            { fontSize: fs13, color: black50 },
                            PH(0.1),
                        ]}
                    />
                    <TextInput
                        keyboardType={'number-pad'}
                        placeholder={'City'}
                        editable={false}
                        style={[
                            textInputContainerStyle,
                            BGCOLOR(disabledColor),
                            ,
                            FLEX(1),
                            ML(0.1),
                            { fontSize: fs13, color: black50 },
                            PH(0.1),
                        ]}
                    />
                </View>
                <View style={[MT(0.2)]} />
                <WrappedDropDown
                    data={[]}
                    arrowColor={black50}
                    header={'Select Area'}
                    callBack={() => {}}
                    zIndex={5000}
                    zIndexInverse={1000}
                    selectValue={area}
                    setValue={() => {}}
                    placeholder={'Area'}
                />
                <TextInput
                    keyboardType={'number-pad'}
                    placeholder={'Local Address in your words so that any one can reach your dukan'}
                    multiline={true}
                    value={localAddress}
                    style={[
                        textInputContainerStyle,
                        {
                            fontSize: fs13,
                            color: black50,
                            height: getHP(1),
                            textAlignVertical: 'top',
                        },

                        PH(0.15),
                        PV(0.1),
                        MT(0.2),
                        AIC('flex-start'),
                        JCC('flex-start'),
                    ]}
                />
                <TextButton
                    text={'Submit address details'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={[buttonContainerStyle, MT(0.4)]}
                    onPress={() => {
                        //validateFields();
                    }}
                    //isLoading={setPasswordButton == 2 ? true : false}
                    //disabled={setPasswordButton == 2}
                />
            </ShadowWrapperHOC>
        </View>
    );
};

export default Address;
