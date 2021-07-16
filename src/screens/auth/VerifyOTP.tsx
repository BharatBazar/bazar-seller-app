import * as React from 'react';
import { View } from 'react-native';
import { AIC, PH, PV, FDR, MT, FLEX, BGCOLOR, provideShadow } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle } from '../../common/containerStyles';
import WrappedText from '../component/WrappedText';
import Loader from '../component/Loader';
import { CreateDukanText, ErrorText } from '../../common/customScreenText';
import { fs13, fs28, NavigationProps } from '../../common';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import ServerErrorText from './component/errorText';
import { mobileValidation } from '../../common';
import StatusBar from '../component/StatusBar';
import { IRCheckPhoneNumber } from '../../server/apis/shopMember/shopMember.interface';
import { forgetPassword } from '../../server/apis/shopMember/shopMember.api';
import { NavigationKey } from '../../labels';
import { ToastHOC } from '../hoc/ToastHOC';

export interface VerifyOTPProps extends NavigationProps {
    route: {
        params: {
            phoneNumber: string;
            otp: string;
        };
    };
}

export interface VerifyOTPProps {}

export interface VerifyOTPState {
    otpSent: boolean;
    signInButtonState: number;
    otpButtonState: number;
    formState: formState;
    error: formError;
    timer: number;
    loader: boolean;
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

class VerifyOTP extends React.Component<VerifyOTPProps, VerifyOTPState> {
    private timer: NodeJS.Timeout;

    constructor(props: VerifyOTPProps) {
        super(props);

        this.state = {
            otpSent: false,
            signInButtonState: 0,
            otpButtonState: 1,
            formState: { phoneNumber: this.props.route.params.phoneNumber, otp: this.props.route.params.otp },
            error: {},
            timer: -1,
            loader: false,
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

    componentDidUpdate() {
        if (this.state.timer == 0) {
            this.clearTimeOut();
            this.setState({ otpButtonState: 0, timer: -1 });
        }
    }

    async sendOtp() {
        try {
            this.setState({ otpButtonState: 2 });
            const response: IRCheckPhoneNumber = await forgetPassword({
                phoneNumber: this.state.formState.phoneNumber,
            });
            if (response.status == 1) {
                this.setField('otp', response.payload);
                this.setState({ otpButtonState: -1, timer: 10 });
                this.setTimer();
            }
        } catch (error) {
            this.setState({ otpSent: false, timer: -1, otpButtonState: -1, error: { serverError: error.message } });
        }
    }
    async verifyOtp() {
        try {
            const response: IRCheckPhoneNumber = await forgetPassword({
                phoneNumber: this.state.formState.phoneNumber,
                verify: true,
                otp: this.state.formState.otp,
            });

            if (response.status == 1) {
                this.setState({
                    otpSent: false,
                    timer: -1,
                    otpButtonState: -1,
                });
                this.props.navigation.replace(NavigationKey.RESETPASSWORD, {
                    phoneNumber: this.state.formState.phoneNumber,
                });
            }
        } catch (error) {
            this.setState({
                otpSent: false,
                timer: -1,
                otpButtonState: -1,
                error: { serverError: error.message },
            });
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

    componentDidMount() {
        this.setState({ otpSent: true, timer: 10 });
        this.setTimer();
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
                        text={'Verify Identity'}
                        fontSize={fs28}
                        textColor={'#161616'}
                        textStyle={[provideShadow(5), MT(0.1)]}
                    />
                    <WrappedText
                        text={
                            'For securing your account we need to verify your identity. Enter the OTP (one time password) sent to your mobile phone number (+91 ' +
                            this.props.route.params.phoneNumber +
                            ').'
                        }
                        fontSize={fs13}
                        textColor={'#646464'}
                        textStyle={{ marginLeft: getWP(0.05), marginTop: getHP(0.05) }}
                    />
                    {this.returnErrorText('serverError')}
                    <View style={{ marginTop: getHP(0.2) }}>
                        <View style={[FDR(), AIC()]}>
                            <View style={{ flex: 1 }}>
                                <WrappedTextInput
                                    placeholder={'Enter OTP'}
                                    value={otp}
                                    //editable={!otpSent}
                                    onChangeText={(otp) => this.setField('otp', otp)}
                                    {...componentProps.textInputProps}
                                    errorText={error['otp']}
                                />
                            </View>
                        </View>

                        <TextButton
                            text={
                                otpSent ? CreateDukanText.resendOTp + (timer > 0 ? ' in ' + timer + 's' : '') : 'Next'
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

                        <TextButton
                            text={'Continue'}
                            textProps={componentProps.buttonTextProps}
                            containerStyle={buttonContainerStyle}
                            onPress={() => {
                                if (otp.length != 6) {
                                    ToastHOC.errorAlert('Please provide valid otp');
                                } else {
                                    this.verifyOtp();
                                }
                            }}
                            isLoading={signInButtonState == 2 ? true : false}
                            disabled={signInButtonState == 2}
                        />
                    </View>
                </View>
                {this.state.loader && <Loader />}
            </View>
        );
    }
}

export default VerifyOTP;
