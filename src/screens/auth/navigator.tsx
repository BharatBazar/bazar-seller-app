import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './DukanDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './add-dukan-member/AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { Easing, KeyboardAvoidingView, StatusBar, View } from 'react-native';
import { FontFamily, fs12, fs14, NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { AIC, BGCOLOR, BR, FLEX, H, JCC, provideShadow, PV, WP } from '../../common/styles';
import { Right } from '../../navigation/NavigationEffect';
import Address from './Address';
import HeaderBar from './component/HeaderBar';
import EditDukanMember from './add-dukan-member/EditDukanMember';
import { borderColor, colorCode, mainColor } from '@app/common/color';
import WrappedText from '../component/WrappedText';
import Animated from 'react-native-reanimated';
import { getWP } from '@app/common/dimension';
import { MTA, PHA, PTA, PVA } from '@app/common/stylesheet';

const Stack = createNativeStackNavigator();

interface Props extends NavigationProps {
    route: {
        params: {
            ownerDetails?: IshopMember;
            screen?: string;
            update?: boolean;
        };
    };
}

const TotalProgressBarWidth = getWP(7);
const TotalStep = 5;
const ProgressPerStep = TotalProgressBarWidth / TotalStep;
const AuthNavigation = (props: Props) => {
    const [showBackButton, setShowBackButton] = React.useState(false);
    const [step, setStep] = React.useState(0);
    const progressBarWidth = new Animated.Value(0);

    let params = {};

    if (props.route.params) {
        var { ownerDetails, screen, update } = props.route.params;
        params = props.route.params;
    } else {
        var ownerDetails = undefined;
        var screen = undefined;
        var update = undefined;
    }
    let initialParams = ownerDetails || update ? { ownerDetails, ...params } : {};

    React.useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        return () => {};
    }, []);

    React.useEffect(() => {
        Animated.timing(progressBarWidth, {
            toValue: step == 0 ? 0 : ProgressPerStep * step,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }, [step]);
    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            {!update && (
                <HeaderBar
                    statusBarColor={'#ffffff'}
                    headerBackgroundColor={'#ffffff'}
                    containerStyle={[provideShadow(2)]}
                    goBack={() => props.navigation.goBack()}
                    showBackButton={showBackButton}
                />
            )}

            <Stack.Navigator
                screenListeners={(a) => {
                    let currentScreenName = a.route.name;
                    if (currentScreenName == NavigationKey.CREATEDUKAN) {
                        setShowBackButton(true);
                        setStep(0);
                    } else if (currentScreenName == NavigationKey.SETPASSWORD) {
                        setStep(1);
                    } else if (currentScreenName == NavigationKey.SHOPDETAILS) {
                        setStep(2);
                    } else if (currentScreenName == NavigationKey.ADDRESS) {
                        setStep(3);
                    } else if (currentScreenName == NavigationKey.ADDDUKANMEMBERS) {
                        setStep(4);
                    } else if (!showBackButton) {
                        setShowBackButton(false);
                    }
                }}
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}
                initialRouteName={screen || NavigationKey.CREATEDUKAN}
            >
                <Stack.Screen
                    name={NavigationKey.CREATEDUKAN}
                    initialParams={initialParams}
                    component={CreateDukan}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />

                <Stack.Screen
                    name={NavigationKey.SETPASSWORD}
                    component={SetPassword}
                    initialParams={initialParams}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.SHOPDETAILS}
                    component={ShopDetails}
                    initialParams={initialParams}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.ADDRESS}
                    component={Address}
                    initialParams={initialParams}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.ADDDUKANMEMBERS}
                    component={AddDukanMembers}
                    initialParams={initialParams}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.EDITDUKANMEMBER}
                    component={EditDukanMember}
                    initialParams={initialParams}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
            </Stack.Navigator>
            {!update && (
                <KeyboardAvoidingView
                    style={[
                        //BGCOLOR('red'),
                        PVA(),
                        // WP(10),
                        AIC(),
                        JCC(),

                        // MT(0.1),
                        { borderTopWidth: 1, borderColor: borderColor },
                    ]}
                >
                    <WrappedText
                        text={
                            step == 0
                                ? 'Hurray! You have initiated first\nstep towards your growth'
                                : step == 4
                                ? 'Hurray! You are just one step away from completing account creation'
                                : `You are just ${TotalStep - step} steps away from creating your dukan`
                        }
                        fontFamily={FontFamily.Medium}
                        textAlign={'center'}
                        containerStyle={[PHA()]}
                        fontSize={fs12}
                        textColor={colorCode.SAFFRON}
                    />

                    <View
                        style={[
                            { width: TotalProgressBarWidth },
                            H(18),
                            { borderRadius: 100 },
                            MTA(10),
                            BGCOLOR(colorCode.BLACKLOW(10)),
                        ]}
                    >
                        <View
                            style={[
                                { width: ProgressPerStep * (step + 1), position: 'absolute' },
                                H(18),
                                BR(2),
                                BGCOLOR(colorCode.CHAKRALOW(10)),
                            ]}
                        />
                        <Animated.View
                            style={[
                                { width: progressBarWidth, position: 'absolute' },
                                H(18),
                                BR(2),
                                BGCOLOR(mainColor),
                            ]}
                        />
                        <View style={[{ width: TotalProgressBarWidth }, H(15), { borderRadius: 100 }]}>
                            <WrappedText
                                text={'0'}
                                textColor={'#fff'}
                                fontFamily={FontFamily.Bold}
                                containerStyle={{ position: 'absolute', left: 4, alignSelf: 'center' }}
                            />

                            <WrappedText
                                text={1}
                                textColor={'#fff'}
                                fontFamily={FontFamily.Bold}
                                containerStyle={{ position: 'absolute', left: ProgressPerStep * 1 - 10 }}
                            />

                            <WrappedText
                                text={2}
                                textColor={'#fff'}
                                fontFamily={FontFamily.Bold}
                                containerStyle={{ position: 'absolute', left: ProgressPerStep * 2 - 10 }}
                            />
                            <WrappedText
                                text={3}
                                textColor={'#fff'}
                                fontFamily={FontFamily.Bold}
                                containerStyle={{ position: 'absolute', left: ProgressPerStep * 3 - 10 }}
                            />
                            <WrappedText
                                text={4}
                                textColor={'#fff'}
                                fontFamily={FontFamily.Bold}
                                containerStyle={{ position: 'absolute', left: ProgressPerStep * 4 - 10 }}
                            />
                            <WrappedText
                                text={5}
                                textColor={'#fff'}
                                fontFamily={FontFamily.Bold}
                                containerStyle={{ position: 'absolute', left: ProgressPerStep * 5 - 10 }}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            )}
            {/* <Loader /> */}
        </View>
    );
};

export default AuthNavigation;
