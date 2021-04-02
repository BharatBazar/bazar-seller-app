import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import AuthNavigation from '../screens/auth/navigator';

const Stack = createStackNavigator();

class AppNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name={NavigationKey.AUTHNAVIGATOR} component={AuthNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
