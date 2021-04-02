import { createStackNavigator } from '@react-navigation/stack';
import CreateDukan from './CreateDukan';
import ShopDetails from './ShopDetails';
import OpenDukan from './SetPassword';
import AddDukanMembers from './AddDukanMembers';
import { NavigationKey } from '../../labels';
import React from 'react';
import { View } from 'react-native';
import HeaderBar from '../component/HeaderBar';

const Stack = createStackNavigator();

class AuthNavigation extends React.Component {
    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <HeaderBar statusBarColor={'#ffffff'} headerBackgroundColor={'#ffffff'} />

                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={NavigationKey.CREATEDUKAN}>
                    <Stack.Screen name={NavigationKey.CREATEDUKAN} component={CreateDukan} />
                    <Stack.Screen name={NavigationKey.SHOPDETAILS} component={ShopDetails} />
                    <Stack.Screen name={NavigationKey.OPENDUKAN} component={OpenDukan} />
                    <Stack.Screen name={NavigationKey.ADDDUKANMEMBERS} component={AddDukanMembers} />
                </Stack.Navigator>
            </View>
        );
    }
}

export default AuthNavigation;
