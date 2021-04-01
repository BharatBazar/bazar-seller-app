import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { BGCOLOR, BR, colorTransparency, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { CreateDukanText } from '../../common/customScreenText';
import { fs12, fs15, fs21, fs24, fs28 } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import HeaderBar from '../component/HeaderBar';

export interface CreateDukanProps {}

type formState = {
    phoneNumber: string;
};

type formError = {
    phoneNumber?: string;
    generalError?: string;
    serverError?: string;
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
            otpSent: true,
            signInButtonState: 1,
            otpButtonState: 1,
            formState: { phoneNumber: '' },
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
    componentDidUpdate() {
        if (this.state.timer == 0) {
            this.clearTimeOut();
            this.setState({ otpButtonState: 0, timer: -1 });
        }
    }
    checkPhoneNumber = (phoneNumber: string) => {
        const regex = /^[5-9]{1}[0-9]{9}$/;
        if (regex.test(phoneNumber)) {
            this.setState((prevState) => {
                delete prevState.error['phoneNumber'];
                return prevState;
            });
            this.triggerOtp();
        } else {
            this.setState({ error: { ...this.state.error, phoneNumber: 'Please enter correct mobile number.' } });
        }
    };

    triggerOtp = () => {
        this.setState({ otpButtonState: 2 });
        setTimeout(() => {
            this.setState({ otpSent: true, otpButtonState: 1, timer: 10 });
            this.setTimer();
        }, 500);
    };

    componentWillUnmount() {
        this.clearTimeOut();
    }

    render() {
        const componentProps = {
            buttonTextProps: {
                textColor: colorCode.WHITE,
            },
            textInputProps: {
                containerStyle: { ...commonStyles.textInputContainerStyle, marginTop: getHP(0.2) },
                textInputStyle: { fontSize: fs15, color: '#000000' },
                paddingLeft: getWP(0.2),
            },
        };

        const {
            otpSent,
            signInButtonState,
            otpButtonState,
            formState: { phoneNumber },
            error,
            timer,
        } = this.state;

        return (
            <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
                {/* <View style={[{ height: getHP(0.5), width: '100%', backgroundColor: colorCode.WHITE }]}>
                        <View style={[commonStyles.fdr, commonStyles.aic]}>
                            <WrappedText text={'Create Your Dukan'} fontSize={fs28} />
                        </View>
                    </View> */}
                <HeaderBar statusBarColor={'#ffffff'} headerBackgroundColor={'#ffffff'} />
                <View style={[{ flex: 1 }, PH(0.3), PV(0.3)]}>
                    <View style={[commonStyles.shadow, BGCOLOR(colorCode.WHITE), BR(0.2), PH(0.5), PV(0.3)]}>
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
                            textColor={'#000000' + colorTransparency[50]}
                            textStyle={{ marginTop: getHP(0.1) }}
                        />
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
                                disabled={otpButtonState == 2 || timer > 0}
                            />

                            {otpSent && (
                                <>
                                    <WrappedTextInput
                                        placeholder={'Verification Code'}
                                        value={''}
                                        {...componentProps.textInputProps}
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
                                        value={''}
                                        placeholder={'Owner name'}
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
                                        value={''}
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
                                            this.props.navigation.navigate(NavigationKey.SHOPDETAILS);
                                        }}
                                        isLoading={signInButtonState == 2 ? true : false}
                                        disabled={signInButtonState == 2}
                                    />
                                </>
                            )}
                        </View>
                    </View>
                </View>
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
