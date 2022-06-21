import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './DukanDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './add-dukan-member/AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { View } from 'react-native';
import { NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { BGCOLOR, FLEX, provideShadow } from '../../common/styles';
import { Right } from '../../navigation/NavigationEffect';
import Address from './Address';
import HeaderBar from '../component/HeaderBar';
import EditDukanMember from './add-dukan-member/EditDukanMember';

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
                    if (a.route.name == NavigationKey.CREATEDUKAN) {
                        setShowBackButton(true);
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
            {/* {!update && (
                    <KeyboardAvoidingView
                        style={[
                            //BGCOLOR('red'),
                            PV(0.2),
                            WP(10),
                            AIC(),
                            JCC(),

                            // MT(0.1),
                            { borderTopWidth: 1, borderColor: borderColor },
                        ]}
                    >
                        <WrappedText text="Step 1 of 5 completed" containerStyle={{ marginBottom: 5 }} />
                        <View style={[WP(5), H(10), BR(2), BGCOLOR(colorCode.SAFFRON)]} />
                    </KeyboardAvoidingView>
                )} */}
            {/* <Loader /> */}
        </View>
    );
};

export default AuthNavigation;
