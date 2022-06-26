import * as React from 'react';
import { View } from 'react-native';
import { colorCode, messageColor } from '../../common/color';
import { AIC, PH, PV, FDR, MT, FLEX, BGCOLOR, provideShadow } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle } from '../../common/containerStyles';
import WrappedText from '../component/WrappedText';
import { CreateDukanText, ErrorText } from '../../common/customScreenText';
import { fs12, fs13, fs28, NavigationProps, passwordValidation } from '../../common';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import ServerErrorText from './component/errorText';
import { mobileValidation } from '../../common';
import StatusBar from '../component/StatusBar';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import { IRCheckPhoneNumber } from '../../server/apis/shopMember/shopMember.interface';
import { forgetPassword, updatePassword } from '../../server/apis/shopMember/shopMember.api';
import { NavigationKey } from '../../labels';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CommonApiResponse } from '../../server/apis/common.interface';
import { Storage } from '../../storage';

type form = {
    password: string;
    confirmPassword: string;
};

type error = {
    password?: string;
    confirmPassword?: string;
    serverError?: string;
};

interface ResetPasswordProps extends NavigationProps {
    route: {
        params: {
            phoneNumber: string;
        };
    };
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
    route: {
        params: { phoneNumber },
    },
    navigation,
}) => {
    const [error, setError] = React.useState<error>({});
    const [formData, setFormData] = React.useState<form>({ password: '', confirmPassword: '' });
    const [password, SetPasswordValidation] = React.useState([...passwordValidation]);
    const [setPasswordButton, setSetPasswordButton] = React.useState(0);
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
            fontSize: fs13,
        },
        textInputProps: {
            containerStyle: textInputContainerStyle,
            textInputStyle: { fontSize: fs13 },
            paddingLeft: getWP(0.2),
        },
    };

    const setPassword = async () => {
        setSetPasswordButton(2);
        const response: CommonApiResponse = await updatePassword({
            phoneNumber: phoneNumber,
            password: formData.password,
        });
        setSetPasswordButton(0);
        if (response.status == 1) {
            navigation.reset({
                index: 0,

                routes: [
                    {
                        name: NavigationKey.WELCOME,
                    },
                ],
            });
        } else {
            setError({ serverError: response.message });
        }
    };

    React.useEffect(() => {
        //navigation.navigate(NavigationKey.SHOPDETAILS);
        return () => {};
    }, []);
    const setField = (field: keyof form, value: string) => {
        const data = { ...formData };
        data[field] = value;
        if (field == 'password') {
            const passwordValidate = [...password];
            passwordValidate.forEach((item) => {
                if (item.regex?.test(value)) {
                    item.matched = true;
                } else {
                    item.matched = false;
                }
            });
            SetPasswordValidation(passwordValidate);
        }
        setFormData(data);
    };

    const validateFields = () => {
        const error: error = {};
        if (!password.every((item) => item.matched)) {
            error['password'] = 'Password does not match all condition please check.';
        }

        if (formData.password !== formData.confirmPassword) {
            error['confirmPassword'] = 'Password is not same';
        }

        if (Object.keys(error).length == 0) {
            setError({});
            setPassword();
        } else {
            setError(error);
        }
    };
    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            <StatusBar />
            <View style={[FLEX(1), PH(0.5)]}>
                <WrappedText
                    text={'Set New Password'}
                    fontSize={fs28}
                    textColor={'#161616'}
                    textStyle={[provideShadow(5), MT(0.1)]}
                />
                <WrappedText
                    text={'This password will be asked whenever you sign in.'}
                    fontSize={fs13}
                    textColor={'#646464'}
                    textStyle={{ marginLeft: getWP(0.05), marginTop: getHP(0.05) }}
                />
                <View style={[MT(0.5)]} />
                <WrappedTextInput
                    placeholder={'Set Password'}
                    value={formData.password}
                    eyeButton={true}
                    onChangeText={(password) => setField('password', password)}
                    {...componentProps.textInputProps}
                    errorText={error['password']}
                />
                <View style={{ marginTop: getHP(0.1) }}>
                    {password.map((item, index) => {
                        return (
                            <View style={[FDR(), MT(0.05), AIC()]} key={index}>
                                <FeatherIcon
                                    name={item.matched ? 'check-circle' : 'x-circle'}
                                    color={item.matched ? colorCode.GREEN : messageColor}
                                />
                                <WrappedText
                                    text={item.error}
                                    fontSize={fs12}
                                    textStyle={{ marginLeft: getWP(0.2) }}
                                    textColor={item.matched ? colorCode.GREEN : messageColor}
                                />
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginTop: getHP(0.1) }}>
                    <WrappedTextInput
                        placeholder={'Confirm Password'}
                        value={formData.confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => setField('confirmPassword', confirmPassword)}
                        {...componentProps.textInputProps}
                        errorText={error['confirmPassword']}
                    />
                </View>
                <TextButton
                    text={'SET PASSWORD'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={[buttonContainerStyle, MT(0.4)]}
                    onPress={() => {
                        validateFields();
                    }}
                    isLoading={setPasswordButton == 2 ? true : false}
                    disabled={setPasswordButton == 2}
                />
            </View>
        </View>
    );
};

export default ResetPassword;
