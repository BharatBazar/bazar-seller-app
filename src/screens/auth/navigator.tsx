import { createStackNavigator } from '@react-navigation/stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './ShopDetails';
import SetPassword from './SetPassword';
import AddDukanMembers from './AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { View } from 'react-native';
import HeaderBar from '../component/HeaderBar';
import { NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import ProductDetails from './ProductDetails';

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
        if (this.props.route.params) {
            console.log(this.props.route.params);
            var { ownerDetails, screen } = this.props.route.params;
        } else {
            var ownerDetails = undefined;
            var screen = undefined;
        }
        return (
            <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <HeaderBar statusBarColor={'#ffffff'} headerBackgroundColor={'#ffffff'} />

                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={screen || NavigationKey.CREATEDUKAN}
                >
                    <Stack.Screen name={NavigationKey.CREATEDUKAN} component={CreateDukan} />
                    <Stack.Screen
                        name={NavigationKey.SHOPDETAILS}
                        component={ShopDetails}
                        initialParams={(ownerDetails && { ownerDetails }) || {}}
                    />
                    <Stack.Screen
                        name={NavigationKey.SETPASSWORD}
                        component={SetPassword}
                        initialParams={(ownerDetails && { ownerDetails }) || {}}
                    />
                    <Stack.Screen
                        name={NavigationKey.ADDDUKANMEMBERS}
                        component={AddDukanMembers}
                        initialParams={(ownerDetails && { ownerDetails }) || {}}
                    />
                    <Stack.Screen
                        name={NavigationKey.PRODUCTDETAILS}
                        component={ProductDetails}
                        initialParams={(ownerDetails && { ownerDetails }) || {}}
                    />
                </Stack.Navigator>
            </View>
        );
    }
}

export default AuthNavigation;
