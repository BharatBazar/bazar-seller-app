import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import AuthNavigation from '../screens/auth/navigator';
import Verification from '../screens/auth/Verification';
import OpenDukan from '../screens/auth/OpenDukan';
import Home from '../screens/app/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import Icon from 'react-native-vector-icons/Feather';
import { colorCode } from '../common/color';
import ProdcutSearch from '../screens/app/ProductSearch';
class AppNavigation extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName={NavigationKey.BHARATBAZARHOME}
                >
                    <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name={NavigationKey.AUTHNAVIGATOR} component={AuthNavigation} />
                    <Stack.Screen name={NavigationKey.VERIFICATION} component={Verification} />
                    <Stack.Screen name={NavigationKey.OPENDUKAN} component={OpenDukan} />
                    <Stack.Screen name={NavigationKey.BHARATBAZARHOME} component={BharatBazarHome} />
                    <Stack.Screen name={NavigationKey.PRODUCTSEARCH} component={ProdcutSearch} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

class BharatBazarHome extends React.Component {
    render() {
        return (
            <Drawer.Navigator
                drawerContent={() => {}}
                screenOptions={{
                    headerShown: true,
                    headerStyle: { paddingHorizontal: '5%', backgroundColor: colorCode.CHAKRALOW(70) },
                    headerLeft: () => (
                        <Icon
                            name={'align-justify'}
                            size={20}
                            color={colorCode.WHITE}
                            onPress={() => {
                                this.props.navigation.dispatch(DrawerActions.openDrawer());
                            }}
                        />
                    ),
                    headerRight: () => (
                        <Icon
                            name={'search'}
                            size={20}
                            color={colorCode.WHITE}
                            onPress={() => this.props.navigation.navigate(NavigationKey.PRODUCTSEARCH)}
                        />
                    ),
                    title: 'Bharat Bazar',
                    headerTitleStyle: { color: colorCode.WHITE },
                }}
            >
                <Drawer.Screen name={NavigationKey.HOME} component={Home} />
            </Drawer.Navigator>
        );
    }
}

export default AppNavigation;
