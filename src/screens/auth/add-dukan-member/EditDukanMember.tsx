import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, fs20, fs24, mobileValidation, NavigationProps } from '../../../common';
import { black20, black40, borderColor, colorCode, mainColor, messageColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { AIC, BC, BGCOLOR, BW, DSP, FDR, FLEX, ML, MT, PA, provideShadow } from '../../../common/styles';
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

interface EditDukanMemberProps extends NavigationProps {
    selectedItem: member;
    route: {
        params: {
            role: 'Co-owner' | 'Worker';

            message?: string;
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
    firstNameError?: string;
    lastNameError?: string;

    otpError?: string;
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
        params: {
            role,

            message,
        },
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
    //const timerInterval: = null;

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
        if (otp.length < 6) {
            error['otpError'] = ErrorText.otpError;
        }
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = ErrorText.phoneNumberError;
        }

        if (firstName.length < 3) {
            error['firstNameError'] = ErrorText.firstNameError;
        }
        if (lastName.length < 3) {
            error['lastNameError'] = ErrorText.lastNameError;
        }

        if (Object.keys(error).length == 0) {
            setError(error);
            // this.submitDetails();
        } else {
            setError(error);
            //  this.setState({ error: error });
        }
    };

    const sendOtp = async () => {
        // try {
        //     this.setState({ otpButtonState: 2 });
        //     const response: IRCheckPhoneNumber = await triggerOtp({
        //         phoneNumber: this.state.formState.phoneNumber,
        //     });
        //     if (response.status == 1) {
        //         this.setState({ otpSent: true, otpButtonState: 1, timer: 10 });
        //         this.setTimer();
        //         this.setField('otp', response.payload);
        //     }
        // } catch (error) {
        //     this.setState({ otpSent: false, timer: -1, otpButtonState: -1, error: { serverError: error.message } });
        // }
    };

    const returnErrorText = (field: keyof formError) => {
        return field in error ? <ServerErrorText errorText={error[field]} /> : <View />;
    };

    const setField = (key: keyof member, value: string) => {
        setMember((member) => {
            member[key] = value;
            return member;
        });
    };

    const { phoneNumber, otp, firstName, lastName } = member;
    return (
        <ScrollView style={[BGCOLOR('#FFFFFF'), FLEX(1), PA(DSP)]}>
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
                            onChangeText={(phoneNumber) => setField('phoneNumber', phoneNumber)}
                            {...componentProps.textInputProps}
                            errorText={error['phoneNumber']}
                        />
                    </View>
                </View>

                <TextButton
                    text={
                        otpSent
                            ? CreateDukanText.resendOTp + (timer > 0 ? 'in ' + timer + 's' : '')
                            : CreateDukanText.sendOtp
                    }
                    textProps={componentProps.buttonTextProps}
                    containerStyle={[
                        buttonContainerStyle,
                        { alignSelf: 'flex-end', paddingHorizontal: '2%', marginTop: getHP(0.1) },
                    ]}
                    onPress={() => {
                        //  this.checkPhoneNumber(this.state.formState.phoneNumber);
                    }}
                    isLoading={otpButtonState == 2 ? true : false}
                    disabled={otpButtonState == 2 || timer > 0}
                />

                {otpSent && (
                    <>
                        <WrappedTextInput
                            placeholder={CreateDukanText.verificationOtp}
                            value={otp}
                            {...componentProps.textInputProps}
                            onChangeText={(otp) => setField('otp', otp)}
                            errorText={error['otpError']}
                        />
                        {otpSent && (
                            <WrappedText text={CreateDukanText.otpMessage} fontSize={10} textColor={messageColor} />
                        )}

                        <View style={[FDR()]}>
                            <View style={[FLEX(1)]}>
                                <WrappedTextInput
                                    value={firstName}
                                    placeholder={role + ' first name'}
                                    onChangeText={(firstName) => setField('firstName', firstName)}
                                    errorText={error['firstNameError']}
                                    {...componentProps.textInputProps}
                                />
                            </View>
                            <View style={[FLEX(1), ML(0.1)]}>
                                <WrappedTextInput
                                    value={lastName}
                                    placeholder={role + ' last name'}
                                    onChangeText={(lastName) => setField('lastName', lastName)}
                                    errorText={error['lastNameError']}
                                    {...componentProps.textInputProps}
                                />
                            </View>
                        </View>
                        <WrappedText text={CreateDukanText.ownerNameMessage} fontSize={10} textColor={messageColor} />

                        <WrappedText text={CreateDukanText.ownerEmailMessage} fontSize={10} textColor={messageColor} />
                        <TextButton
                            text={CreateDukanText.SignIn}
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
    // return (
    //     <View style={[{ paddingTop: DSP * 1.5 }, { paddingHorizontal: DSP }, BGCOLOR('#FFFFFF'), FLEX(1)]}>
    //         <View style={[FDR(), AIC('flex-start')]}>
    //             <WrappedFeatherIcon
    //                 iconName="chevron-left"
    //                 onPress={() => {
    //                     navigation.goBack();
    //                 }}
    //                 containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), { paddingTop: 2 }]}
    //             />
    //         </View>
    //         <View style={{ marginTop: 20 }}>
    //             <WrappedText text={'Add ' + role} fontSize={fs20} />
    //             <WrappedText text={message || ''} containerStyle={[MT(0.05)]} textColor={messageColor} />
    //         </View>
    //         <View style={[{ marginTop: DSP }]}>
    //             {/* {selectedItem.error && selectedItem.error['error'] && (
    //                 <ServerErrorText errorText={selectedItem.error['error']} marginTop={0} />
    //             )} */}
    //             <View style={[FDR()]}>
    //                 <View style={[FLEX(1)]}>
    //                     <WrappedTextInput
    //                         value={member.firstName}
    //                         placeholder={role + ' first name'}
    //                         {...componentProps.textInputProps}
    //                         onChangeText={(text) => {
    //                             setField(text, 'firstName');
    //                         }}
    //                         errorText={member.firstName}
    //                     />
    //                 </View>
    //                 <View style={[FLEX(1), ML(0.1)]}>
    //                     <WrappedTextInput
    //                         value={member.lastName}
    //                         placeholder={role + ' last name'}
    //                         {...componentProps.textInputProps}
    //                         onChangeText={(text) => {
    //                             setField(text, 'lastName');
    //                         }}
    //                         errorText={member.lastName}
    //                     />
    //                 </View>
    //             </View>
    //             <View style={[{ marginTop: DSP * 0.4 }]} />
    //             <WrappedTextInput
    //                 placeholder={role + ' mobile number'}
    //                 value={member.phoneNumber}
    //                 onChangeText={(text) => {
    //                     setField(text, 'phoneNumber');
    //                 }}
    //                 errorText={member.phoneNumber}
    //                 {...componentProps.textInputProps}
    //             />
    //             <RightComponentButtonWithLeftText
    //                 buttonText="Send otp"
    //                 {...commonButtonProps}
    //                 onPress={() => {}}
    //                 marginTop={DSP * 1.5}
    //                 borderWidth={0}
    //             />
    //             {/* <View style={[BW(1), BC(borderColor)]}>
    //                 <WrappedText text="We have sent an otp to your dukan member number.please enter that otp to add these person as dukan member" />
    //                 <OTPTextView
    //                     // ref={'pin'}
    //                     inputCount={4}
    //                     show={true}
    //                     containerStyle={{
    //                         alignSelf: 'center',
    //                     }}
    //                     tintColor={'#500061'}
    //                     autofillFromClipboard={true}
    //                     keyboardType={'phone-pad'}
    //                     textInputStyle={[
    //                         //styles.otpTextInput,
    //                         {
    //                             height: getHP(0.7),
    //                             width: getHP(0.7),
    //                             padding: 0,
    //                             fontSize: fs24,
    //                         },
    //                     ]}
    //                     handleTextChange={(otp: string) => {
    //                         // this.setState({ otp });
    //                     }}
    //                 />
    //             </View> */}
    //         </View>
    //     </View>
    // );
};

export default EditDukanMember;
