import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import CreateDukan from '../screens/auth/CreateDukan';

const Stack = createStackNavigator();

class AppNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} />
                    <Stack.Screen name={NavigationKey.CREATEDUKAN} component={CreateDukan} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigation;
