import * as React from 'react';
import { View } from 'react-native';
import { fs10, fs11, fs13, fs28, mobileValidation, NavigationProps, passwordValidation } from '../../common';
import { colorCode, mainColor } from '../../common/color';
import { GlobalText } from '../../common/customScreenText';
import { getHP, getWP } from '../../common/dimension';
import {
    BGCOLOR,
    buttonContainerStyle,
    FDR,
    MT,
    PH,
    provideShadow,
    PV,
    textInputContainerStyle,
} from '../../common/styles';
import { NavigationKey } from '../../labels';
import { shopMemberLogin } from '../../server/apis/shopMember/shopMember.api';
import { IRShopMemberLogin, IshopMemberPopulated } from '../../server/apis/shopMember/shopMember.interface';
import { DataHandling } from '../../server/DataHandlingHOC';
import LineHeading from '../component/LineHeading';
import TextButton from '../component/TextButton';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import WrappedText from '../component/WrappedText';
import WrappedTextInput from '../component/WrappedTextInput';
import ScreenHOC from '../hoc/ScreenHOC';
import ServerErrorText from './component/errorText';

export interface OpenDukanProps extends NavigationProps {}

const componentProps = {
    buttonTextProps: {
        textColor: colorCode.WHITE,
    },
    textInputProps: {
        containerStyle: textInputContainerStyle,
        textInputStyle: { fontSize: fs13, color: colorCode.BLACKLOW(50) },
        paddingLeft: getWP(0.2),
    },
};

const dataHandling = new DataHandling('');

interface Error {
    password?: string;
    phoneNumber?: string;
    error?: string;
}

interface FormData {
    password: string;
    phoneNumber: string;
}

const OpenDukan: React.SFC<OpenDukanProps> = ({ navigation }) => {
    const [formData, setFormData] = React.useState<FormData>({ password: '', phoneNumber: '' });
    const [error, setError] = React.useState<Error>({});

    const setField = (data: Partial<FormData>) => {
        setFormData({ ...formData, ...data });
    };

    const navigateTo = (screen: string, params: IshopMemberPopulated) => {
        navigation.replace(NavigationKey.AUTHNAVIGATOR, {
            ownerDetails: { ...params, shop: params.shop._id },
            screen: screen,
        });
    };

    const resetTo = (screen: string) => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: screen,
                },
            ],
        });
    };

    const submitDetails = async () => {
        const response: IRShopMemberLogin = await dataHandling.fetchData(shopMemberLogin, formData);
        console.log(response);
        if (response.status == 1) {
            const state = response.payload;
            if (state.passwordAvailable) {
                navigateTo(NavigationKey.SETPASSWORD, state.data);
            } else if (state.shopNameAvailable) {
                navigateTo(NavigationKey.SHOPDETAILS, state.data);
            } else if (state.memberDetails) {
                navigateTo(NavigationKey.ADDDUKANMEMBERS, state.data);
            } else if (state.shopVerification) {
                resetTo(NavigationKey.VERIFICATION);
            } else {
                resetTo(NavigationKey.HOME);
            }
        } else {
            setError({ error: response.message });
        }
    };

    const validateField = () => {
        let error: Error = {};

        if (!mobileValidation.test(formData.phoneNumber)) {
            error['phoneNumber'] = 'Please enter correct mobile number';
        }
        if (!passwordValidation.every((item) => item.regex.test(formData.password))) {
            error['password'] = 'Password is not correct please check.';
        }
        if (Object.keys(error).length == 0) {
            setError({});
            submitDetails();
        } else {
            setError(error);
        }
    };

    const privacyText = { fontSize: fs11, textColor: colorCode.BLACKLOW(40) };
    return (
        <ScreenHOC translucent={false} barStyle={'dark-content'}>
            <View style={[PV(0.2), PH(0.5), BGCOLOR(colorCode.WHITE)]}>
                <WrappedFeatherIcon
                    onPress={() => {
                        navigation.goBack();
                    }}
                    iconName={'arrow-left'}
                    containerHeight={getHP(0.5)}
                    containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                />
                <WrappedText
                    text={'Open your dukan'}
                    fontSize={fs28}
                    textColor={'#000'}
                    textStyle={[provideShadow(5), MT(0.2)]}
                />
                <WrappedText
                    text={'Requires an active seller account'}
                    fontSize={fs13}
                    textColor={colorCode.BLACKLOW(40)}
                    textStyle={{ marginLeft: getWP(0.05), marginTop: getHP(0.1) }}
                />
                {error['error'] && <ServerErrorText errorText={error['error']} />}
                {/* <ShadowWrapperHOC containerStyle={{ marginTop: getHP(0.3) }}> */}
                <WrappedText
                    text={'Forgot password?'}
                    fontSize={fs13}
                    textColor={colorCode.SAFFRONLOW(90)}
                    containerStyle={{ alignSelf: 'flex-end', ...MT(0.5) }}
                />
                <View style={{ marginTop: getHP(0.05) }}>
                    <WrappedTextInput
                        placeholder={'Mobile number'}
                        value={formData.phoneNumber}
                        onChangeText={(phoneNumber) => setField({ phoneNumber })}
                        {...componentProps.textInputProps}
                        errorText={error['phoneNumber']}
                    />
                    <WrappedTextInput
                        placeholder={'Password'}
                        value={formData.password}
                        eyeButton={true}
                        onChangeText={(password) => setField({ password })}
                        {...componentProps.textInputProps}
                        errorText={error['password']}
                    />
                    <TextButton
                        text={'Sign In'}
                        textProps={componentProps.buttonTextProps}
                        containerStyle={{ ...buttonContainerStyle, marginTop: getHP(0.4) }}
                        onPress={() => {
                            validateField();
                        }}
                    />
                    <View style={[MT(0.1)]}>
                        <View style={[FDR()]}>
                            <WrappedText text={'By signing in you agree to Bharat Bazar'} {...privacyText} />
                            <WrappedText text={" Condition's of use."} {...privacyText} textColor={mainColor} />
                        </View>
                        <View style={[FDR()]}>
                            <WrappedText text={'Please also read our '} {...privacyText} />
                            <WrappedText text={'Privacy Policy.'} {...privacyText} textColor={mainColor} />
                        </View>
                    </View>
                    <LineHeading text={'New to ' + GlobalText.companyName + ' ?'} />

                    <TextButton
                        text={'Register'}
                        textProps={{ textColor: mainColor, textStyle: [provideShadow(2)] }}
                        containerStyle={{
                            ...buttonContainerStyle,
                            marginTop: getHP(0.1),
                            backgroundColor: colorCode.CHAKRALOW(20),
                        }}
                        onPress={() => {
                            navigation.replace(NavigationKey.AUTHNAVIGATOR);
                            //validateFields();
                        }}
                    />
                    <WrappedText
                        text={"Register yourself among other dukandar's and be part of nation's and your growth"}
                        fontSize={fs10}
                        textColor={mainColor}
                        textStyle={[MT(0.1)]}
                        fontWeight={'200'}
                    />
                </View>
            </View>
        </ScreenHOC>
    );
};

export default OpenDukan;
