import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, fs24, mobileValidation } from '../../../common';
import { black20, black40, borderColor, colorCode, mainColor, messageColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { BC, BGCOLOR, BW, DSP, FDR, FLEX, ML, PA } from '../../../common/styles';
import { textInputContainerStyle } from '../../../common/containerStyles';
import WrappedTextInput from '../../component/WrappedTextInput';
import { border } from '../../app/edit/product/component/generalConfig';
import ModalWithHeader from '@app/screens/components/popup/ModalWithHeader';
import { getDefaultMember, member } from './AddDukanMembers';
import Ripple from 'react-native-material-ripple';
import WrappedText from '../../component/WrappedText';
import OTPTextView from '@app/screens/components/input/OTPTextInput';

interface MemberDetailsPopupProps {
    selectedItem: member;

    role: 'Co-owner' | 'Worker';
    isVisible: boolean;
    setPopup: Function;
    message?: string;
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

const MemberDetailsPopup: React.FunctionComponent<MemberDetailsPopupProps> = ({
    selectedItem,

    role,
    isVisible,
    setPopup,
    message,
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
        <ModalWithHeader
            isVisible={isVisible}
            setPopup={() => {
                setPopup(false);
            }}
            contentContainerStyle={[
                { width: '100%' },
                border,
                BGCOLOR(colorCode.WHITE),
                { borderRadius: getWP(0.2) },
                PA(DSP),
            ]}
            heading={'Add ' + role}
            subHeading={message}
        >
            <View style={[{ paddingVertical: DSP * 0.8 }]}>
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
                <View style={[{ marginTop: DSP * 0.2 }]} />
                <WrappedTextInput
                    placeholder={role + ' mobile number'}
                    value={member.phoneNumber}
                    onChangeText={(text) => {
                        setField(text, 'phoneNumber');
                    }}
                    errorText={member.phoneNumber}
                    {...componentProps.textInputProps}
                />
                <View style={[BW(1), BC(borderColor)]}>
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
                </View>
            </View>
        </ModalWithHeader>
    );
};

export default MemberDetailsPopup;
