import { createStackNavigator } from '@react-navigation/stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './DukanDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { View } from 'react-native';
import HeaderBar from '../component/HeaderBar';
import { NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import ProductDetails from './ProductDetails';
import ProductSubCategory from './ProductSubCategory';
import { BGCOLOR, FLEX, provideShadow } from '../../common/styles';
import { Right } from '../../navigation/NavigationEffect';
import StatusBar from '../component/StatusBar';
import Address from './Address';

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
                {/* <HeaderBar
                    statusBarColor={'#ffffff'}
                    headerBackgroundColor={'#ffffff'}
                    containerStyle={[provideShadow(2)]}
                /> */}

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
            </View>
        );
    }
}

export default AuthNavigation;
