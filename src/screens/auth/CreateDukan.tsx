import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { BGCOLOR, BR, colorTransparency, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedText from '../component/WrappedText';
import { CreateDukanText } from '../../common/customScreenText';
import { fs12, fs13, fs15, fs21, fs28, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import HeaderBar from '../component/HeaderBar';
import { createShopMember, triggerOtp } from '../../server/apis/shopMember/shopMember.api';
import { IRCheckPhoneNumber, IRCreateShopMember } from '../../server/apis/shopMember/shopMember.interface';
import { setUpAxios } from '../../server';
import { DataHandling } from '../../server/DataHandlingHOC';
import ServerErrorText from './component/errorText';
import { emailValidation, mobileValidation } from '../../common';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';

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

class CreateDukan extends DataHandling<CreateDukanProps, CreateDukanState> {
    private timer: NodeJS.Timeout;

    constructor(props: CreateDukanProps) {
        super(props);

        this.state = {
            otpSent: false,
            signInButtonState: 1,
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
        const response: IRCreateShopMember = await this.fetchData(createShopMember, {
            ...this.state.formState,
            role: 'owner',
        });
        if (response.status == 1) {
            this.setState({ signInButtonState: 0 });
            this.props.navigation.navigate(NavigationKey.SHOPDETAILS);
        } else {
            this.setState({ error: { ...this.state.error, serverError: response.message }, signInButtonState: 0 });
        }
    };

    validateFields = () => {
        const { formState } = this.state;
        const { phoneNumber, otp, email, name } = formState;
        let error: formError = {};
        if (otp.length < 6) {
            error['otpError'] = 'Please enter correct OTP.';
        }
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = 'Please enter correct mobile number';
        }
        if (!emailValidation.test(email)) {
            error['emailError'] = 'Please enter correct email';
        }
        if (name.length < 3) {
            error['nameError'] = 'Please enter correct name';
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
        const response: IRCheckPhoneNumber = await this.fetchData(triggerOtp, {
            phoneNumber: this.state.formState.phoneNumber,
        });
        console.log(response);
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

    async componentDidMount() {
        await setUpAxios();
        this.props.navigation.navigate(NavigationKey.OPENDUKAN, {
            phoneNumber: '9893137876',
        });
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
            this.setState({ error: { ...this.state.error, phoneNumber: 'Please enter correct mobile number.' } });
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
                containerStyle: { ...commonStyles.textInputContainerStyle, marginTop: getHP(0.2) },
                textInputStyle: { fontSize: fs13, color: '#000000' },
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
                        <WrappedText text={'Step 1'} fontSize={fs28} textColor={colorCode.SAFFRON} />
                        <WrappedText
                            text={'Provide shop owner details'}
                            fontSize={fs21}
                            textColor={'#000'}
                            textStyle={{ marginTop: getHP(0.1) }}
                        />
                        <WrappedText
                            text={CreateDukanText.MESSAGE}
                            fontSize={fs12}
                            textColor={colorCode.BLACKLOW(50)}
                            textStyle={{ marginTop: getHP(0.1) }}
                        />
                        {this.returnErrorText('serverError')}
                        <View style={{ marginTop: getHP(0.2) }}>
                            <View style={[commonStyles.fdr, commonStyles.aic]}>
                                <View style={{ flex: 1 }}>
                                    <WrappedTextInput
                                        placeholder={'Owner mobile number'}
                                        value={phoneNumber}
                                        onChangeText={(phoneNumber) => this.setField('phoneNumber', phoneNumber)}
                                        {...componentProps.textInputProps}
                                        errorText={error['phoneNumber']}
                                    />
                                </View>
                            </View>

                            <TextButton
                                text={otpSent ? 'Resend OTP' + (timer > 0 ? 'in ' + timer + 's' : '') : 'Send OTP'}
                                textProps={componentProps.buttonTextProps}
                                containerStyle={[
                                    commonStyles.buttonContainerStyle,
                                    { alignSelf: 'flex-end', paddingHorizontal: '2%', marginTop: getHP(0.1) },
                                ]}
                                onPress={() => {
                                    this.checkPhoneNumber(this.state.formState.phoneNumber);
                                }}
                                isLoading={otpButtonState == 2 ? true : false}
                                disabled={otpButtonState == 2 || timer > 0 || otp.length == 6}
                            />

                            {otpSent && (
                                <>
                                    <WrappedTextInput
                                        placeholder={'Verification Code'}
                                        value={otp}
                                        {...componentProps.textInputProps}
                                        onChangeText={(otp) => this.setField('otp', otp)}
                                        errorText={error['otpError']}
                                    />
                                    {otpSent && (
                                        <WrappedText
                                            text={
                                                'We have sent an One Time Password(OTP) in a SMS to provided mobile number.'
                                            }
                                            fontSize={10}
                                            textColor={messageColor}
                                        />
                                    )}

                                    <WrappedTextInput
                                        value={name}
                                        placeholder={'Owner name'}
                                        onChangeText={(name) => this.setField('name', name)}
                                        errorText={error['nameError']}
                                        {...componentProps.textInputProps}
                                    />
                                    <WrappedText
                                        text={
                                            'Owner name is an important field it will appear on your public facing digital dukan.'
                                        }
                                        fontSize={10}
                                        textColor={messageColor}
                                    />
                                    <WrappedTextInput
                                        placeholder={'Owner email or other active email'}
                                        value={email}
                                        onChangeText={(email) => this.setField('email', email)}
                                        errorText={error['emailError']}
                                        {...componentProps.textInputProps}
                                    />
                                    <WrappedText
                                        text={
                                            'If you have problem maintaining an email then you can provide email of anyother member from your family like you son, daughter etc who can inform you about important update.'
                                        }
                                        fontSize={10}
                                        textColor={messageColor}
                                    />
                                    <TextButton
                                        text={'Sign-In'}
                                        textProps={componentProps.buttonTextProps}
                                        containerStyle={commonStyles.buttonContainerStyle}
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
        ...commonStyles.absoluteBottomWrapper,
        bottom: '5%',
    },
});
