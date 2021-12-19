import { createStackNavigator } from '@react-navigation/stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './DukanDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { View } from 'react-native';
import { NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import ProductDetails from './ProductDetails';
import ProductSubCategory from './ProductSubCategory';
import { AIC, BGCOLOR, BR, BTW, FDR, FLEX, H, HP, JCC, MT, provideShadow, PV, WP } from '../../common/styles';
import { Right } from '../../navigation/NavigationEffect';
import Address from './Address';
import HeaderBar from '../component/HeaderBar';
import { borderColor, colorCode } from '@app/common/color';
import WrappedText from '../component/WrappedText';

const Stack = createStackNavigator();

interface Props extends NavigationProps {
    route: {
        params: {
            ownerDetails?: IshopMember;
            screen?: string;
        };
    };
}
class AuthNavigation extends React.Component<Props, {}> {
    render() {
        let params = {};

        if (this.props.route.params) {
            console.log(this.props.route.params);
            var { ownerDetails, screen } = this.props.route.params;
            params = this.props.route.params;
        } else {
            var ownerDetails = undefined;
            var screen = undefined;
        }

        return (
            <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
                <HeaderBar
                    statusBarColor={'#ffffff'}
                    headerBackgroundColor={'#ffffff'}
                    containerStyle={[provideShadow(2)]}
                />

                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={screen || NavigationKey.CREATEDUKAN}
                >
                    <Stack.Screen
                        name={NavigationKey.CREATEDUKAN}
                        component={CreateDukan}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />

                    <Stack.Screen
                        name={NavigationKey.SETPASSWORD}
                        component={SetPassword}
                        initialParams={(ownerDetails && { ownerDetails, ...params }) || {}}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.SHOPDETAILS}
                        component={ShopDetails}
                        initialParams={(ownerDetails && { ownerDetails, ...params }) || {}}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.ADDRESS}
                        component={Address}
                        initialParams={(ownerDetails && { ownerDetails, ...params }) || {}}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.ADDDUKANMEMBERS}
                        component={AddDukanMembers}
                        initialParams={(ownerDetails && { ownerDetails, ...params }) || {}}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.PRODUCTDETAILS}
                        component={ProductDetails}
                        initialParams={(ownerDetails && { ownerDetails, ...params }) || {}}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationKey.PRODUCTSUBCATEGORY}
                        component={ProductSubCategory}
                        initialParams={(ownerDetails && { ownerDetails, ...params }) || {}}
                        options={{
                            cardStyleInterpolator: Right,
                        }}
                    />
                </Stack.Navigator>
                <View
                    style={[
                        BGCOLOR('#FFFFFF'),
                        PV(0.2),
                        WP(10),
                        AIC(),
                        JCC(),

                        MT(0.1),
                        { borderTopWidth: 1, borderColor: borderColor },
                    ]}
                >
                    <WrappedText text="Step 1 of 5 completed" containerStyle={{ marginBottom: 5 }} />
                    <View style={[WP(5), H(10), BR(2), BGCOLOR(colorCode.SAFFRON)]} />
                </View>
            </View>
        );
    }
}

export default AuthNavigation;
