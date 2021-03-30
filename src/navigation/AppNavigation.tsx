import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import CreateDukan from '../screens/auth/CreateDukan';
import ShopDetails from '../screens/auth/ShopDetails';
import OpenDukan from '../screens/auth/OpenDukan';
import AddDukanMembers from '../screens/auth/AddDukanMembers';

const Stack = createStackNavigator();

class AppNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} />
                    <Stack.Screen name={NavigationKey.CREATEDUKAN} component={CreateDukan} />
                    <Stack.Screen name={NavigationKey.SHOPDETAILS} component={ShopDetails} />
                    <Stack.Screen name={NavigationKey.OPENDUKAN} component={OpenDukan} />
                    <Stack.Screen name={NavigationKey.ADDDUKANMEMBERS} component={AddDukanMembers} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
