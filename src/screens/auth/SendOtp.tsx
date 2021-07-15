import * as React from 'react';
import { View } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { AIC, PH, PV, FDR, MT, FLEX, BGCOLOR, provideShadow } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle } from '../../common/containerStyles';
import WrappedText from '../component/WrappedText';
import { CreateDukanText, ErrorText } from '../../common/customScreenText';
import { fs13, fs28, NavigationProps } from '../../common';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import ServerErrorText from './component/errorText';
import { mobileValidation } from '../../common';
import StatusBar from '../component/StatusBar';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import { IRCheckPhoneNumber } from '../../server/apis/shopMember/shopMember.interface';
import { forgetPassword } from '../../server/apis/shopMember/shopMember.api';
import { NavigationKey } from '../../labels';

export interface SendOtpProps extends NavigationProps {}

export interface SendOtpProps {}

export interface SendOtpState {
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

class SendOtp extends React.Component<SendOtpProps, SendOtpState> {
    private timer: NodeJS.Timeout;

    constructor(props: SendOtpProps) {
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
            const response: IRCheckPhoneNumber = await forgetPassword({
                phoneNumber: this.state.formState.phoneNumber,
            });
            if (response.status == 1) {
                this.props.navigation.navigate(NavigationKey.VERIFYOTP, {
                    phoneNumber: this.state.formState.phoneNumber,
                    otp: response.payload,
                });
                this.setState({ otpButtonState: -1 });
            }
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
            <View style={[{ flex: 1 }, BGCOLOR('#FFFFFF')]}>
                <StatusBar />
                <View style={[FLEX(1), PH(0.5), PV(0.2)]}>
                    {/* <WrappedFeatherIcon
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        iconName={'arrow-left'}
                        containerHeight={getHP(0.5)}
                        containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                    /> */}
                    <WrappedText
                        text={'Reset Your Password'}
                        fontSize={fs28}
                        textColor={'#161616'}
                        textStyle={[provideShadow(5), MT(0.1)]}
                    />
                    <WrappedText
                        text={'Enter the email address associated with your Bharat Bazar seller account.'}
                        fontSize={fs13}
                        textColor={'#646464'}
                        textStyle={{ marginLeft: getWP(0.05), marginTop: getHP(0.05) }}
                    />
                    {this.returnErrorText('serverError')}
                    <View style={{ marginTop: getHP(0.2) }}>
                        <View style={[FDR(), AIC()]}>
                            <View style={{ flex: 1 }}>
                                <WrappedTextInput
                                    placeholder={'Your mobile phone number'}
                                    value={phoneNumber}
                                    editable={!otpSent}
                                    onChangeText={(phoneNumber) => this.setField('phoneNumber', phoneNumber)}
                                    {...componentProps.textInputProps}
                                    errorText={error['phoneNumber']}
                                />
                            </View>
                        </View>

                        <TextButton
                            text={'Next'}
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
            </View>
        );
    }
}

export default SendOtp;
