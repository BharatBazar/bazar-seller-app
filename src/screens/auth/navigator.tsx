import { createStackNavigator } from '@react-navigation/stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './DukanDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './add-dukan-member/AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import ProductDetails from './ProductDetails';
import ProductSubCategory from './ProductSubCategory';
import { AIC, BGCOLOR, BR, BTW, FDR, FLEX, H, HP, JCC, MT, provideShadow, PV, WP } from '../../common/styles';
import { Bottom, Right } from '../../navigation/NavigationEffect';
import Address from './Address';
import HeaderBar from '../component/HeaderBar';
import { borderColor, colorCode } from '@app/common/color';
import WrappedText from '../component/WrappedText';
import EditDukanMember from './add-dukan-member/EditDukanMember';
import Loader from '../component/Loader';

const Stack = createStackNavigator();

interface Props extends NavigationProps {
    route: {
        params: {
            ownerDetails?: IshopMember;
            screen?: string;
            update?: boolean;
        };
    };
}
class AuthNavigation extends React.Component<Props, {}> {
    render() {
        let params = {};
        console.log('App parameter', this.props.route.params);
        if (this.props.route.params) {
            console.log(this.props.route.params);
            var { ownerDetails, screen, update } = this.props.route.params;
            params = this.props.route.params;
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
                    />
                )}

                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={screen || NavigationKey.CREATEDUKAN}
                >
                    <Stack.Screen
                        name={NavigationKey.CREATEDUKAN}
                        initialParams={initialParams}
                        component={CreateDukan}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />

                    <Stack.Screen
                        name={NavigationKey.SETPASSWORD}
                        component={SetPassword}
                        initialParams={initialParams}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.SHOPDETAILS}
                        component={ShopDetails}
                        initialParams={initialParams}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.ADDRESS}
                        component={Address}
                        initialParams={initialParams}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.ADDDUKANMEMBERS}
                        component={AddDukanMembers}
                        initialParams={initialParams}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.EDITDUKANMEMBER}
                        component={EditDukanMember}
                        initialParams={initialParams}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                </Stack.Navigator>
                {!update && (
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
                )}
                {/* <Loader /> */}
            </View>
        );
    }
}

export default AuthNavigation;
