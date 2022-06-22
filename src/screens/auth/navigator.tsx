import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './DukanDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './add-dukan-member/AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { BGCOLOR, FLEX, provideShadow } from '../../common/styles';
import Address from './Address';
import HeaderBar from './component/HeaderBar';
import EditDukanMember from './add-dukan-member/EditDukanMember';

import SignupProgressBar from './component/ProgressBar';

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

const AuthNavigation = (props: Props) => {
    const [showBackButton, setShowBackButton] = React.useState(false);
    const [step, setStep] = React.useState(0);

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

    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            {!update && (
                <HeaderBar
                    statusBarColor={'#ffffff'}
                    headerBackgroundColor={'#ffffff'}
                    containerStyle={[provideShadow(2)]}
                    goBack={() => {
                        props.navigation.replace(NavigationKey.WELCOME);
                    }}
                    showBackButton={showBackButton}
                    step={step}
                />
            )}

            <Stack.Navigator
                screenListeners={(a) => {
                    let currentScreenName = a.route.name;
                    console.log('currentSc', currentScreenName);
                    if (currentScreenName == NavigationKey.CREATEDUKAN) {
                        setShowBackButton(true);
                        setStep(0);
                    } else if (currentScreenName == NavigationKey.SETPASSWORD) {
                        setShowBackButton(false);
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
            {/* {!update && <SignupProgressBar step={step} />} */}
            {/* <Loader /> */}
        </View>
    );
};

export default AuthNavigation;
