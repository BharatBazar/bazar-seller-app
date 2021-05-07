import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import AuthNavigation from '../screens/auth/navigator';
import Verification from '../screens/auth/Verification';
import OpenDukan from '../screens/auth/OpenDukan';
import Home from '../screens/app/home/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import Icon from 'react-native-vector-icons/Feather';
import { colorCode, mainColor } from '../common/color';
import ProdcutSearch from '../screens/app/search/Search';
import Product from '../screens/app/listing/Main';
import CreateProduct from '../screens/app/edit/Edit';
import { View } from 'react-native';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { Easing } from 'react-native-reanimated';
import { NavigationProps } from '../common';
import { setUpAxios } from '../server';
import ProductCategory from '../screens/app/home/ProductCategory';
import { provideShadow } from '../common/styles';
import Toast from 'react-native-toast-message';

const config: TransitionSpec = {
    animation: 'timing',
    config: {
        duration: 150,
        easing: Easing.linear,
    },
};
class AppNavigation extends React.Component {
    constructor(props) {
        super(props);
        setUpAxios();
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        transitionSpec: {
                            open: config,
                            close: config,
                        },
                    }}
                    initialRouteName={NavigationKey.BHARATBAZARHOME}
                >
                    <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name={NavigationKey.AUTHNAVIGATOR} component={AuthNavigation} />
                    <Stack.Screen name={NavigationKey.VERIFICATION} component={Verification} />
                    <Stack.Screen name={NavigationKey.OPENDUKAN} component={OpenDukan} />
                    <Stack.Screen name={NavigationKey.BHARATBAZARHOME} component={BharatBazarHome} />
                    <Stack.Screen name={NavigationKey.PRODUCTSEARCH} component={ProdcutSearch} />
                    <Stack.Screen name={NavigationKey.PRODUCT} component={Product} />
                    <Stack.Screen name={NavigationKey.CREATEPRODUCT} component={CreateProduct} />
                    <Stack.Screen name={NavigationKey.PRODUCTCATEGORY} component={ProductCategory} />
                </Stack.Navigator>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </NavigationContainer>
        );
    }
}

interface BharatBazarHomeProps extends NavigationProps {}

class BharatBazarHome extends React.Component<BharatBazarHomeProps, {}> {
    render() {
        return (
            <Drawer.Navigator
                drawerContent={() => {
                    <View />;
                }}
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        paddingHorizontal: '5%',
                        backgroundColor: colorCode.CHAKRALOW(70),
                        ...provideShadow(2),
                    },
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
