import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { AIC, PH, PV, FDR, MT, FLEX, ML, BGCOLOR, provideShadow } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle, absoluteBottomWrapper } from '../../common/containerStyles';
import WrappedText from '../component/WrappedText';
import { CreateDukanText, ErrorText } from '../../common/customScreenText';
import { fs13, fs28, NavigationProps } from '../../common';
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
import { Storage, StorageItemKeys } from '../../storage';
import StatusBar from '../component/StatusBar';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';

export interface ForgetPasswordProps extends NavigationProps {}

export interface ForgetPasswordProps {}

export interface ForgetPasswordState {
    otpSent: boolean;
    signInButtonState: number;
    otpButtonState: number;
    formState: formState;
    error: formError;
    timer: number;
}

type formState = {
    phoneNumber: string;
    otp: string;
};

type formError = {
    phoneNumber?: string;
    generalError?: string;
    serverError?: string;

    otpError?: string;
};

class ForgetPassword extends React.Component<ForgetPasswordProps, ForgetPasswordState> {
    private timer: NodeJS.Timeout;

    constructor(props: ForgetPasswordProps) {
        super(props);

        this.state = {
            otpSent: false,
            signInButtonState: 0,
            otpButtonState: 1,
            formState: { phoneNumber: '', otp: '' },
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

    async sendOtp() {
        try {
            this.setState({ otpButtonState: 2 });
            // const response: IRCheckPhoneNumber = await triggerOtp({
            //     phoneNumber: this.state.formState.phoneNumber,
            // });
            // if (response.status == 1) {
            //     this.setState({ otpSent: true, otpButtonState: 1, timer: 10 });
            //     this.setTimer();
            //     this.setField('otp', response.payload);
            // }
        } catch (error) {
            this.setState({ otpSent: false, timer: -1, otpButtonState: -1, error: { serverError: error.message } });
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
                textColor: '#FFFFFF',
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
            formState: { phoneNumber, otp },
            error,
            timer,
        } = this.state;

        return (
            <View style={[{ flex: 1 }, PH(0.5), PV(0.3), BGCOLOR('#FFFFFF')]}>
                <StatusBar />
                <WrappedFeatherIcon
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                    iconName={'arrow-left'}
                    containerHeight={getHP(0.5)}
                    containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                />
                <WrappedText
                    text={'Reset Password'}
                    fontSize={fs28}
                    textColor={'#000'}
                    textStyle={[provideShadow(5), MT(0.2)]}
                />
                <WrappedText
                    text={'Provide your registered mobile number.'}
                    fontSize={fs13}
                    textColor={colorCode.BLACKLOW(40)}
                    textStyle={{ marginLeft: getWP(0.05), marginTop: getHP(0.05) }}
                />
                {this.returnErrorText('serverError')}
                <View style={{ marginTop: getHP(0.2) }}>
                    <View style={[FDR(), AIC()]}>
                        <View style={{ flex: 1 }}>
                            <WrappedTextInput
                                placeholder={'provide your mobile number'}
                                value={phoneNumber}
                                editable={!otpSent}
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
                                <WrappedText text={CreateDukanText.otpMessage} fontSize={10} textColor={messageColor} />
                            )}

                            <TextButton
                                text={CreateDukanText.SignIn}
                                textProps={componentProps.buttonTextProps}
                                containerStyle={buttonContainerStyle}
                                onPress={() => {}}
                                isLoading={signInButtonState == 2 ? true : false}
                                disabled={signInButtonState == 2}
                            />
                        </>
                    )}
                </View>
            </View>
        );
    }
}

export default ForgetPassword;
