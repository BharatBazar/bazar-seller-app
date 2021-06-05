import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { AIC, PH, PV, FDR, MT } from '../../common/styles';

import { textInputContainerStyle, buttonContainerStyle, absoluteBottomWrapper } from '../../common/containerStyles';
import WrappedText from '../component/WrappedText';
import { CreateDukanText, ErrorText } from '../../common/customScreenText';
import { fs13, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import { createShopMember, triggerOtp } from '../../server/apis/shopMember/shopMember.api';
import { IRCheckPhoneNumber, IRCreateShopMember } from '../../server/apis/shopMember/shopMember.interface';

import ServerErrorText from './component/errorText';
import { emailValidation, mobileValidation } from '../../common';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';

export interface CreateDukanProps extends NavigationProps {}

type formState = {
    phoneNumber: string;
    otp: string;
    name: string;
    email: string;
};

type formError = {
    phoneNumber?: string;
    generalError?: string;
    serverError?: string;
    nameError?: string;
    emailError?: string;
    otpError?: string;
};
export interface CreateDukanState {
    otpSent: boolean;
    signInButtonState: number;
    otpButtonState: number;
    formState: formState;
    error: formError;
    timer: number;
}

class CreateDukan extends React.Component<CreateDukanProps, CreateDukanState> {
    private timer: NodeJS.Timeout;

    constructor(props: CreateDukanProps) {
        super(props);

        this.state = {
            otpSent: false,
            signInButtonState: 0,
            otpButtonState: 1,
            formState: { phoneNumber: '', otp: '', name: '', email: '' },
            error: {},
            timer: -1,
        };
    }

    setField = (field: keyof formState, value: string) => {
        this.setState((prevState) => {
            prevState.formState[field] = value;
            return prevState;
        });
    };

    setTimer = () => {
        this.timer = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 });
        }, 1000);
    };

    clearTimeOut = () => {
        clearInterval(this.timer);
    };

    submitDetails = async () => {
        this.setState({ signInButtonState: 2 });
        const response: IRCreateShopMember = await createShopMember({
            ...this.state.formState,
            role: 'owner',
        });
        if (response.status == 1) {
            this.setState({ signInButtonState: 0 });
            this.props.navigation.navigate(NavigationKey.SETPASSWORD, { ownerDetails: response.payload });
        } else {
            this.setState({ error: { ...this.state.error, serverError: response.message }, signInButtonState: 0 });
        }
    };

    validateFields = () => {
        const { formState } = this.state;
        const { phoneNumber, otp, email, name } = formState;
        let error: formError = {};
        if (otp.length < 6) {
            error['otpError'] = ErrorText.otpError;
        }
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = ErrorText.phoneNumberError;
        }
        if (!emailValidation.test(email)) {
            error['emailError'] = ErrorText.emailError;
        }
        if (name.length < 3) {
            error['nameError'] = ErrorText.nameError;
        }

        if (Object.keys(error).length == 0) {
            this.setState({ error: error });
            this.submitDetails();
        } else {
            this.setState({ error: error });
        }
    };

    async sendOtp() {
        this.setState({ otpButtonState: 2 });
        const response: IRCheckPhoneNumber = await triggerOtp({
            phoneNumber: this.state.formState.phoneNumber,
        });

        if (response.status == 1) {
            this.setState({ otpSent: true, otpButtonState: 1, timer: 10 });
            this.setTimer();
            this.setField('otp', response.payload);
        } else {
            this.setState({
                otpSent: false,
                timer: -1,
                otpButtonState: -1,
                error: { ...this.state.error, serverError: response.message },
            });
        }
    }

    componentDidUpdate() {
        if (this.state.timer == 0) {
            this.clearTimeOut();
            this.setState({ otpButtonState: 0, timer: -1 });
        }
    }
    checkPhoneNumber = (phoneNumber: string) => {
        if (mobileValidation.test(phoneNumber)) {
            this.setState((prevState) => {
                delete prevState.error['phoneNumber'];
                return prevState;
            });
            this.setField('otp', '');
            this.sendOtp();
        } else {
            this.setState({ error: { ...this.state.error, phoneNumber: ErrorText.phoneNumberError } });
        }
    };

    componentWillUnmount() {
        this.clearTimeOut();
    }

    returnErrorText = (field: keyof formError) => {
        const { error } = this.state;
        return field in error ? <ServerErrorText errorText={error[field]} /> : <View />;
    };

    render() {
        const componentProps = {
            buttonTextProps: {
                textColor: colorCode.WHITE,
            },
            textInputProps: {
                containerStyle: [textInputContainerStyle, MT(0.2)],
                textInputStyle: { fontSize: fs13, color: '#00000099' },
                paddingLeft: getWP(0.2),
            },
        };

        const {
            otpSent,
            signInButtonState,
            otpButtonState,
            formState: { phoneNumber, otp, name, email },
            error,
            timer,
        } = this.state;

        return (
            <View style={[{ flex: 1 }, PH(0.3), PV(0.3)]}>
                <ShadowWrapperHOC>
                    <>
                        <HeaderText
                            step={'Step 1'}
                            heading={CreateDukanText.HEADING}
                            subHeading={CreateDukanText.MESSAGE}
                        />
                        {this.returnErrorText('serverError')}
                        <View style={{ marginTop: getHP(0.2) }}>
                            <View style={[FDR(), AIC()]}>
                                <View style={{ flex: 1 }}>
                                    <WrappedTextInput
                                        placeholder={CreateDukanText.ownerMobileNumber}
                                        value={phoneNumber}
                                        onChangeText={(phoneNumber) => this.setField('phoneNumber', phoneNumber)}
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
                                    this.checkPhoneNumber(this.state.formState.phoneNumber);
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
                                        onChangeText={(otp) => this.setField('otp', otp)}
                                        errorText={error['otpError']}
                                    />
                                    {otpSent && (
                                        <WrappedText
                                            text={CreateDukanText.otpMessage}
                                            fontSize={10}
                                            textColor={messageColor}
                                        />
                                    )}

                                    <WrappedTextInput
                                        value={name}
                                        placeholder={CreateDukanText.ownerName}
                                        onChangeText={(name) => this.setField('name', name)}
                                        errorText={error['nameError']}
                                        {...componentProps.textInputProps}
                                    />
                                    <WrappedText
                                        text={CreateDukanText.ownerNameMessage}
                                        fontSize={10}
                                        textColor={messageColor}
                                    />
                                    <WrappedTextInput
                                        placeholder={CreateDukanText.ownerEmail}
                                        value={email}
                                        onChangeText={(email) => this.setField('email', email)}
                                        errorText={error['emailError']}
                                        {...componentProps.textInputProps}
                                    />
                                    <WrappedText
                                        text={CreateDukanText.ownerEmailMessage}
                                        fontSize={10}
                                        textColor={messageColor}
                                    />
                                    <TextButton
                                        text={CreateDukanText.SignIn}
                                        textProps={componentProps.buttonTextProps}
                                        containerStyle={buttonContainerStyle}
                                        onPress={() => {
                                            this.validateFields();
                                        }}
                                        isLoading={signInButtonState == 2 ? true : false}
                                        disabled={signInButtonState == 2}
                                    />
                                </>
                            )}
                        </View>
                    </>
                </ShadowWrapperHOC>
            </View>
        );
    }
}

export default CreateDukan;

const styles = StyleSheet.create({
    buttonsWrapper: {
        ...absoluteBottomWrapper,
        bottom: '5%',
    },
});
