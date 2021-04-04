import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import AuthNavigation from '../screens/auth/navigator';
import Verification from '../screens/auth/Verification';
import OpenDukan from '../screens/auth/OpenDukan';
import Home from '../screens/app/Home';
const Stack = createStackNavigator();

class AppNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={NavigationKey.WELCOME}>
                    <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name={NavigationKey.AUTHNAVIGATOR} component={AuthNavigation} />
                    <Stack.Screen name={NavigationKey.VERIFICATION} component={Verification} />
                    <Stack.Screen name={NavigationKey.OPENDUKAN} component={OpenDukan} />
                    <Stack.Screen name={NavigationKey.HOME} component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
