import * as React from 'react';
import { View } from 'react-native';
import { fs10, fs11, fs13, fs28, mobileValidation, NavigationProps, passwordValidation } from '../../common';
import { black40, colorCode, mainColor } from '../../common/color';
import { textInputContainerStyle } from '../../common/containerStyles';
import { GlobalText } from '../../common/customScreenText';
import { getHP, getWP } from '../../common/dimension';
import { BGCOLOR, FDR, FLEX, MT, PH, provideShadow, PV } from '../../common/styles';
import { NavigationKey } from '../../labels';
import { shopMemberLogin } from '../../server/apis/shopMember/shopMember.api';
import { IRShopMemberLogin, IshopMemberPopulated } from '../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../storage';
import LineHeading from '../component/LineHeading';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';
import TextButton from '../component/TextButton';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import WrappedText from '../component/WrappedText';
import WrappedTextInput from '../component/WrappedTextInput';
import ServerErrorText from './component/errorText';
import Loader from '../component/Loader';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../components/button';
import TextRippleButton from '../components/button/TextRippleB';
import { ToastHOC } from '../hoc/ToastHOC';
import { PHA, PTA, PVA } from '@app/common/stylesheet';
import ButtonMaterialIcons from '../components/button/ButtonMaterialIcons';

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
    const [loader, setLoader] = React.useState(false);

    const setField = (data: Partial<FormData>) => {
        setFormData({ ...formData, ...data });
    };

    const navigateTo = (screen: string, params: IshopMemberPopulated) => {
        if (params.shop) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: NavigationKey.AUTHNAVIGATOR,
                        params: {
                            ownerDetails: { ...params, shop: params.shop._id },
                            screen: screen,
                        },
                    },
                ],
            });
        } else {
            ToastHOC.errorAlert('Shop does not exist for your phone number please contact our support');
        }
    };

    const resetTo = (screen: string, params: IshopMemberPopulated) => {
        if (params.shop) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: screen,
                        params: {
                            ownerDetails: { ...params, shop: params.shop._id },
                            screen: screen,
                        },
                    },
                ],
            });
        } else {
            ToastHOC.errorAlert('Shop does not exist for your phone number please contact our support');
        }
    };

    const submitDetails = async () => {
        try {
            setLoader(true);
            const response: IRShopMemberLogin = await shopMemberLogin(formData);

            console.log('Response', response);
            if (response.status == 1) {
                const currentAccountState = response.payload;
                await Storage.setItem(StorageItemKeys.Token, 'token exist');
                await Storage.setItem(StorageItemKeys.userDetail, currentAccountState.data);
                let screen = '';
                if (currentAccountState.notPasswordAvailable) {
                    screen = NavigationKey.SETPASSWORD;
                } else if (currentAccountState.notShopNameAvailable) {
                    screen = NavigationKey.SHOPDETAILS;
                } else if (currentAccountState.notAddressAvailable) {
                    screen = NavigationKey.ADDRESS;
                } else if (currentAccountState.notMemberDetails) {
                    screen = NavigationKey.ADDDUKANMEMBERS;
                } else if (currentAccountState.notShopVerification) {
                    screen = NavigationKey.VERIFICATION;
                } else if (currentAccountState.notCategory) {
                    screen = NavigationKey.PRODUCTDETAILS;
                } else {
                    await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, true);
                    screen = NavigationKey.BHARATBAZARHOME;
                }

                console.log(screen, 'screen');
                if (
                    screen == NavigationKey.VERIFICATION ||
                    screen == NavigationKey.BHARATBAZARHOME ||
                    screen == NavigationKey.PRODUCTDETAILS
                ) {
                    await Storage.setItem(StorageItemKeys.currentScreen, screen);
                    resetTo(screen, currentAccountState.data);
                } else {
                    await Storage.setItem(StorageItemKeys.currentScreen, screen);
                    navigateTo(screen, currentAccountState.data);
                }
                setLoader(false);
            } else {
                setLoader(false);
                setError({ error: response.message });
            }
        } catch (error) {
            setLoader(false);
            setError({ error: error.message });
        }
    };

    const validateField = () => {
        let error: Error = {};
        if (!mobileValidation.test(formData.phoneNumber)) {
            error['phoneNumber'] = 'Please enter correct mobile number';
        }
        if (!passwordValidation.every((item) => item.regex.test(formData.password))) {
            error['password'] = 'Please enter correct password.';
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
        <View style={[FLEX(1), BGCOLOR('#FFFFFF'), PTA(STATUS_BAR_HEIGHT)]}>
            <View style={[PVA(), PHA(), BGCOLOR(colorCode.WHITE)]}>
                <ButtonMaterialIcons
                    onPress={() => {
                        navigation.goBack();
                    }}
                    iconName={'arrow-back'}
                    iconColor={mainColor}
                    containerHeight={getHP(0.5)}
                    containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                />
                <WrappedText
                    text={'Open your dukan'}
                    fontSize={fs28}
                    textColor={mainColor}
                    textStyle={[provideShadow(5), MT(0.2)]}
                />
                <WrappedText
                    text={'Requires an active dukandar account'}
                    fontSize={fs13}
                    textColor={black40}
                    textStyle={{ marginLeft: getWP(0.05), marginTop: getHP(0.05) }}
                />
                {error['error'] && <ServerErrorText errorText={error['error']} />}
                {/* <ShadowWrapperHOC containerStyle={{ marginTop: getHP(0.3) }}> */}
                <TextButton
                    text={'Reset password?'}
                    onPress={() => {
                        navigation.replace(NavigationKey.FORGETPASSWORD);
                    }}
                    textProps={{ textColor: colorCode.SAFFRON }}
                    containerStyle={{ alignSelf: 'flex-end', ...MT(0.5), backgroundColor: '#00000000' }}
                />
                <View style={{ marginTop: getHP(0.05) }}>
                    <WrappedTextInput
                        placeholder={'Mobile number'}
                        value={formData.phoneNumber}
                        onChangeText={(phoneNumber) => setField({ phoneNumber })}
                        {...componentProps.textInputProps}
                        errorText={error['phoneNumber']}
                    />
                    <View style={[MT(0.1)]} />

                    <WrappedTextInput
                        placeholder={'Password'}
                        value={formData.password}
                        eyeButton={true}
                        onChangeText={(password) => setField({ password })}
                        {...componentProps.textInputProps}
                        errorText={error['password']}
                    />

                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            validateField();
                        }}
                        buttonText={'Open your dukan'}
                        {...commonButtonProps}
                        borderWidth={0}
                        marginTop={getHP(0.2)}
                    />

                    <View style={[MT(0.1)]}>
                        <View style={[]}>
                            <WrappedText
                                text={'By clicking on open your dukan you agree to Bharat Bazar'}
                                {...privacyText}
                            />

                            <TextRippleButton
                                onPress={() => {}}
                                containerStyle={[{ alignSelf: 'flex-start' }]}
                                buttonText={"Condition's of use."}
                                {...privacyText}
                                rippleColor={'#0000001A'}
                                buttonTextColor={mainColor}
                            />
                        </View>
                        <View style={[FDR()]}>
                            <WrappedText text={'Please also read our '} {...privacyText} />
                            <WrappedText text={'Privacy Policy.'} {...privacyText} textColor={mainColor} />
                        </View>
                    </View>
                    <LineHeading text={'New to ' + GlobalText.companyName + ' ?'} />

                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            navigation.replace(NavigationKey.AUTHNAVIGATOR);
                            //validateFields();
                        }}
                        buttonText={'Register your dukan'}
                        {...commonButtonProps}
                        borderWidth={0}
                        // backgroundColor={mainColor + colorTransparency[20]}
                        marginTop={5}
                    />
                    <WrappedText
                        text={"Register yourself among other dukandar's and be part of nation's and your growth"}
                        fontSize={fs10}
                        textColor={mainColor}
                        textStyle={[MT(0.1)]}
                        fontWeight={'300'}
                    />
                </View>
            </View>
            {loader && <Loader />}
        </View>
    );
};

export default OpenDukan;
