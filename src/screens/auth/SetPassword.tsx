import * as React from 'react';
import { View } from 'react-native';
import { fs12, fs13, NavigationProps, passwordValidation } from '../../common';
import { colorCode, messageColor } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { FLEX, PV, PH, MT, FDR } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle } from '../../common/containerStyles';
import TextButton from '../component/TextButton';
import WrappedTextInput from '../component/WrappedTextInput';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';
import FeatherIcon from 'react-native-vector-icons/Feather';
import WrappedText from '../component/WrappedText';
import { Storage, StorageItemKeys } from '../../storage';

import { IRSetPassword, IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import API from '../../server/apis';
import { NavigationKey } from '../../labels';
import ServerErrorText from './component/errorText';

export interface OpenDukanProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

type form = {
    password: string;
    confirmPassword: string;
};

type error = {
    password?: string;
    confirmPassword?: string;
    serverError?: string;
};

const SetPassword: React.FC<OpenDukanProps> = ({
    route: {
        params: { ownerDetails },
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
        const response: IRSetPassword = await API.setPassword({
            phoneNumber: ownerDetails.phoneNumber,
            password: formData.password,
        });
        setSetPasswordButton(0);
        if (response.status == 1) {
            await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.SHOPDETAILS);
            navigation.replace(NavigationKey.SHOPDETAILS, { ownerDetails: ownerDetails });
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
        <View style={[FLEX(1), PH(0.4), PV(0.2)]}>
            <ShadowWrapperHOC>
                <>
                    <HeaderText
                        step={'Step 2'}
                        heading={'Protect your account with password'}
                        subHeading={"Setting password helps to protect your account from attacker's."}
                    />

                    {error['serverError'] && <ServerErrorText errorText={error['serverError']} />}
                    <View style={{ marginTop: getHP(0.2) }}>
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
                                    <View style={[FDR(), MT(0.05)]} key={index}>
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
                </>
            </ShadowWrapperHOC>
        </View>
    );
};

export default SetPassword;
