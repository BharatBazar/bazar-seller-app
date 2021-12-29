import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, fs20, fs24, mobileValidation, NavigationProps } from '../../../common';
import { black20, black40, borderColor, colorCode, mainColor, messageColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { AIC, BC, BGCOLOR, BW, DSP, FDR, FLEX, ML, MT, P, PA, provideShadow } from '../../../common/styles';
import { buttonContainerStyle, textInputContainerStyle } from '../../../common/containerStyles';
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
import { ScrollView } from 'react-native-gesture-handler';
import { CreateDukanText, ErrorText } from '@app/common/customScreenText';
import TextButton from '@app/screens/component/TextButton';
import ServerErrorText from '../component/errorText';
import {
    IRCheckPhoneNumber,
    IRCreateShopMember,
    IshopMember,
    shopMemberRole,
} from '@app/server/apis/shopMember/shopMember.interface';
import { addShopMember, updateShopMember, verifyShopMember } from '@app/server/apis/shopMember/shopMember.api';
import { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';

interface EditDukanMemberProps extends NavigationProps {
    selectedItem: member;
    route: {
        params: {
            role: shopMemberRole;

            message?: string;
            addMember: Function;
            shop?: string;
            updateCallBack: Function;
            openUpdateFlow?: boolean;
            shopMember: member;
            update?: boolean;
        };
    };
}

type formState = {
    phoneNumber: string;
    otp: string;
    firstName: string;
    lastName: string;
};

type formError = {
    phoneNumber?: string;
    generalError?: string;
    serverError?: string;
    firstName?: string;
    lastName?: string;

    otp?: string;
};

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
        params: { role, addMember, shop, message, shopMember, openUpdateFlow, paddingTop },
    },

    navigation,
}) => {
    //const [member, setMember] = React.useState<formState>(getDefaultMember('Co-owner'));
    const [otpSent, setOtpSent] = React.useState<boolean>(false);
    const [otpButtonState, setOtpButtonState] = React.useState(0);
    const [signInButtonState, setSignInButtonState] = React.useState(0);
    const [member, setMember] = React.useState<formState>({ firstName: '', lastName: '', otp: '', phoneNumber: '' });
    const [error, setError] = React.useState<formError>({});
    const timerInterval = React.useRef<null | NodeJS.Timeout>(null);
    const [timer, setTimer] = React.useState(-1);
    const [update, setUpdate] = React.useState(false);
    //const timerInterval: = null;

    React.useEffect(() => {
        if (openUpdateFlow) {
            setUpdate(true);
            setMember({
                firstName: shopMember.firstName,
                lastName: shopMember.lastName,
                phoneNumber: shopMember.phoneNumber,
                otp: '',
            });
        }
    }, []);
    React.useEffect(() => {
        if (timer < 1) {
            clearTimeOut();
        }
    }, [timer]);
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

    const setTimerInterval = () => {
        timerInterval.current = setInterval(() => {
            setTimer((timer) => timer - 1);
        }, 1000);
    };

    const clearTimeOut = () => {
        if (timerInterval.current) clearInterval(timerInterval.current);
    };

    const validateFields = () => {
        const { phoneNumber, otp, firstName, lastName } = member;
        let error: formError = {};
        if (otpSent && otp.length < 6) {
            error['otp'] = ErrorText.otpError;
        }
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = ErrorText.phoneNumberError;
        }

        if (firstName.length < 3) {
            error['firstName'] = ErrorText.firstNameError;
        }
        if (lastName.length < 3) {
            error['lastName'] = ErrorText.lastNameError;
        }

        console.log(error, member);

        if (Object.keys(error).length == 0) {
            setError(error);
            submitDetails();
        } else {
            setError(error);
        }
    };

    const submitDetails = async () => {
        setSignInButtonState(1);
        try {
            const data = {
                ...member,
                role: role,
                shop: shop,
            };
            const response: IRCreateShopMember = update
                ? await updateShopMember({ ...data, _id: shopMember._id })
                : await addShopMember(data);

            if (response.status == 1) {
                setSignInButtonState(0);
                console.log(addMember, data);
                addMember(update ? { ...data, _id: shopMember._id } : { ...data, _id: response.payload._id });
                navigation.goBack();
            } else {
                setSignInButtonState(0);
                setError({ ...error, serverError: response.message });
            }
        } catch (errorg) {
            setSignInButtonState(0);
            setError((error) => {
                return { ...error, serverError: errorg.message };
            });
        }
    };

    const returnErrorText = (field: keyof formError) => {
        return field in error ? <ServerErrorText errorText={error[field]} /> : <View />;
    };

    const setField = (key: keyof member, value: string) => {
        setMember((member) => {
            member[key] = value;
            return { ...member };
        });
    };

    const sendOtp = async () => {
        try {
            setOtpButtonState(2);
            const response: IRCheckPhoneNumber = await verifyShopMember({
                phoneNumber: member.phoneNumber,
            });
            if (response.status == 1) {
                setOtpSent(true);
                setOtpButtonState(1);
                setTimer(10);
                // this.setState({ otpSent: true, otpButtonState: 1, timer: 10 });
                setTimerInterval();
                //console.log(response.payload);
                setError({});
                setField('otp', response.payload);
            }
        } catch (error) {
            setOtpSent(false);
            setOtpButtonState(-1);
            setTimer(-1);
            setError({ serverError: error.message });
        }
    };

    const { phoneNumber, otp, firstName, lastName } = member;
    const checkPhoneNumber = () => {
        console.log(member);
        if (mobileValidation.test(member.phoneNumber)) {
            setError((error) => {
                delete error['phoneNumber'];
                return { ...error };
            });
            setField('otp', '');
            sendOtp();
        } else {
            setError({ ...error, serverError: ErrorText.phoneNumberError });
            // this.setState({ error: { ...this.state.error, phoneNumber: ErrorText.phoneNumberError } });
        }
    };

    return (
        <ScrollView
            style={[BGCOLOR('#FFFFFF'), FLEX(1), PA(DSP), paddingTop ? { paddingTop: STATUS_BAR_HEIGHT + DSP } : {}]}
        >
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
            {returnErrorText('serverError')}
            <View style={{}}>
                <View style={[FDR(), AIC()]}>
                    <View style={{ flex: 1 }}>
                        <WrappedTextInput
                            placeholder={role + ' mobile number'}
                            value={phoneNumber}
                            onChangeText={(phoneNumber) => {
                                setField('phoneNumber', phoneNumber);
                                if (update && phoneNumber == shopMember.phoneNumber) {
                                    setOtpSent(false);
                                }
                            }}
                            {...componentProps.textInputProps}
                            errorText={error['phoneNumber']}
                        />
                    </View>
                </View>
                {((update && phoneNumber != shopMember.phoneNumber) || !update) && (
                    <TextButton
                        text={
                            otpSent
                                ? CreateDukanText.resendOTp + (timer > 0 ? ' in ' + timer + 's' : '')
                                : CreateDukanText.sendOtp
                        }
                        textProps={componentProps.buttonTextProps}
                        containerStyle={[
                            buttonContainerStyle,
                            { alignSelf: 'flex-end', paddingHorizontal: '2%', marginTop: getHP(0.1) },
                        ]}
                        onPress={() => {
                            checkPhoneNumber();
                        }}
                        isLoading={otpButtonState == 2 ? true : false}
                        disabled={otpButtonState == 2 || timer > 0}
                    />
                )}

                {otpSent && (
                    <>
                        <WrappedTextInput
                            placeholder={'Verification code'}
                            value={otp}
                            onChangeText={(otp) => setField('otp', otp)}
                            {...componentProps.textInputProps}
                            errorText={error['otp']}
                        />
                        {otpSent && (
                            <WrappedText text={CreateDukanText.otpMessage} fontSize={10} textColor={messageColor} />
                        )}
                    </>
                )}

                {((!update && otpSent) ||
                    (update && phoneNumber != shopMember.phoneNumber && otpSent) ||
                    (update && phoneNumber == shopMember.phoneNumber)) && (
                    <>
                        <View style={[FDR()]}>
                            <View style={[FLEX(1)]}>
                                <WrappedTextInput
                                    value={firstName}
                                    placeholder={role + ' first name'}
                                    onChangeText={(firstName) => setField('firstName', firstName)}
                                    errorText={error['firstName']}
                                    {...componentProps.textInputProps}
                                />
                            </View>
                            <View style={[FLEX(1), ML(0.1)]}>
                                <WrappedTextInput
                                    value={lastName}
                                    placeholder={role + ' last name'}
                                    onChangeText={(lastName) => setField('lastName', lastName)}
                                    errorText={error['lastName']}
                                    {...componentProps.textInputProps}
                                />
                            </View>
                        </View>
                        {role == shopMemberRole.coOwner && (
                            <WrappedText
                                text={'Co-owner name is important as it will shop on your customer dukan face'}
                                fontSize={10}
                                textColor={messageColor}
                            />
                        )}

                        <TextButton
                            text={update ? 'Update details' : CreateDukanText.SignIn}
                            textProps={componentProps.buttonTextProps}
                            containerStyle={buttonContainerStyle}
                            onPress={() => {
                                validateFields();
                            }}
                            isLoading={signInButtonState == 2 ? true : false}
                            disabled={signInButtonState == 2}
                        />
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default EditDukanMember;
