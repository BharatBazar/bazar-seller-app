import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, fs20, fs24, mobileValidation, NavigationProps } from '../../../common';
import { black20, black40, borderColor, colorCode, mainColor, messageColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { AIC, BC, BGCOLOR, BW, DSP, FDR, FLEX, ML, MT, PA, provideShadow } from '../../../common/styles';
import { textInputContainerStyle } from '../../../common/containerStyles';
import WrappedTextInput from '../../component/WrappedTextInput';
import { border } from '../../app/edit/product/component/generalConfig';
import ModalWithHeader from '@app/screens/components/popup/ModalWithHeader';
import { getDefaultMember, member } from './AddDukanMembers';
import Ripple from 'react-native-material-ripple';
import WrappedText from '../../component/WrappedText';
import OTPTextView from '@app/screens/components/input/OTPTextInput';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { NavigationProp } from '@react-navigation/native';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '@app/screens/components/button';

interface EditDukanMemberProps extends NavigationProps {
    selectedItem: member;
    route: {
        params: {
            role: 'Co-owner' | 'Worker';

            message?: string;
        };
    };
}

interface error {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    error?: string;
}

const componentProps = {
    buttonTextProps: {
        textColor: colorCode.WHITE,
        textStyle: { fontSize: fs12 },
    },
    textInputProps: {
        containerStyle: [textInputContainerStyle],
        textInputStyle: { fontSize: fs13 },
        paddingLeft: getWP(0.2),
    },
};

const EditDukanMember: React.FunctionComponent<EditDukanMemberProps> = ({
    selectedItem,
    route: {
        params: {
            role,

            message,
        },
    },

    navigation,
}) => {
    const [member, setMember] = React.useState<member>(getDefaultMember('Co-owner'));

    function validateField() {
        const { phoneNumber, firstName, lastName } = member;
        let error: error = {};
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = 'Please enter correct ' + role + ' mobile number';
        }
        if (firstName.length < 3) {
            error['firstName'] = 'Please enter correct ' + role + ' first name.';
        }
        if (lastName.length < 3) {
            error['lastName'] = 'Please enter correct ' + role + ' last name.';
        }
        if (Object.keys(error).length == 0) {
            // setField({}, 'error');
            //submitDetails(index, role);
        } else {
            //  setField(error, 'error');
        }
    }

    const setField = (value: string, key: keyof member) => {
        setMember((member) => {
            member[key] = value;
            return member;
        });
    };

    return (
        <View style={[{ paddingTop: DSP * 1.5 }, { paddingHorizontal: DSP }, BGCOLOR('#FFFFFF'), FLEX(1)]}>
            <View style={[FDR(), AIC('flex-start')]}>
                <WrappedFeatherIcon
                    iconName="chevron-left"
                    onPress={() => {
                        navigation.goBack();
                    }}
                    containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), { paddingTop: 2 }]}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <WrappedText text={'Add ' + role} fontSize={fs20} />
                <WrappedText text={message || ''} containerStyle={[MT(0.05)]} textColor={messageColor} />
            </View>
            <View style={[{ marginTop: DSP }]}>
                {/* {selectedItem.error && selectedItem.error['error'] && (
                    <ServerErrorText errorText={selectedItem.error['error']} marginTop={0} />
                )} */}
                <View style={[FDR()]}>
                    <View style={[FLEX(1)]}>
                        <WrappedTextInput
                            value={member.firstName}
                            placeholder={role + ' first name'}
                            {...componentProps.textInputProps}
                            onChangeText={(text) => {
                                setField(text, 'firstName');
                            }}
                            errorText={member.firstName}
                        />
                    </View>
                    <View style={[FLEX(1), ML(0.1)]}>
                        <WrappedTextInput
                            value={member.lastName}
                            placeholder={role + ' last name'}
                            {...componentProps.textInputProps}
                            onChangeText={(text) => {
                                setField(text, 'lastName');
                            }}
                            errorText={member.lastName}
                        />
                    </View>
                </View>
                <View style={[{ marginTop: DSP * 0.4 }]} />
                <WrappedTextInput
                    placeholder={role + ' mobile number'}
                    value={member.phoneNumber}
                    onChangeText={(text) => {
                        setField(text, 'phoneNumber');
                    }}
                    errorText={member.phoneNumber}
                    {...componentProps.textInputProps}
                />
                <RightComponentButtonWithLeftText
                    buttonText="Send otp"
                    {...commonButtonProps}
                    onPress={() => {}}
                    marginTop={DSP * 1.5}
                    borderWidth={0}
                />
                {/* <View style={[BW(1), BC(borderColor)]}>
                    <WrappedText text="We have sent an otp to your dukan member number.please enter that otp to add these person as dukan member" />
                    <OTPTextView
                        // ref={'pin'}
                        inputCount={4}
                        show={true}
                        containerStyle={{
                            alignSelf: 'center',
                        }}
                        tintColor={'#500061'}
                        autofillFromClipboard={true}
                        keyboardType={'phone-pad'}
                        textInputStyle={[
                            //styles.otpTextInput,
                            {
                                height: getHP(0.7),
                                width: getHP(0.7),
                                padding: 0,
                                fontSize: fs24,
                            },
                        ]}
                        handleTextChange={(otp: string) => {
                            // this.setState({ otp });
                        }}
                    />
                </View> */}
            </View>
        </View>
    );
};

export default EditDukanMember;
