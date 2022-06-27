import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { NavigationKey } from '../labels';
import Welcome from '../screens/auth/Welcome';
import AuthNavigation from '../screens/auth/navigator';
import Verification from '../screens/auth/Verification';
import OpenDukan from '../screens/auth/OpenDukan';
import Home from '../screens/app/dashboard/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { colorCode } from '../common/color';
import ProdcutSearch from '../screens/app/search/Search';
import Product from '../screens/app/listing/Main';
import CreateProduct from '../screens/app/edit/Edit';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

import { NavigationProps } from '../common';
import ProductCategory from '../screens/app/dashboard/ProductCategory';
import { provideShadow } from '../common/styles';
import Toast from 'react-native-toast-message';
import { Fade, Right } from './NavigationEffect';
import Splash from '../screens/startup/SplashScreen';
import { SideMenu } from '../screens/app/drawer/SideMenu';
import { STATUS_BAR_HEIGHT } from '../screens/component/StatusBar';
import { getHP } from '../common/dimension';
import ForgetPassword from '../screens/auth/SendOtp';
import VerifyOTP from '../screens/auth/VerifyOTP';
import ResetPassword from '../screens/auth/ResetPassword';
import ProductDetails from '@app/screens/auth/ProductDetails';
import ProductSubCategory from '@app/screens/auth/ProductSubCategory';
import ProvideSize from '@app/screens/app/product-edit/size/ProvideSize';
import { Easing } from 'react-native';
import { GENERAL_PADDING, MLA, MRA } from '@app/common/stylesheet';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const config: TransitionSpec = {
    animation: 'timing',
    config: {
        duration: 150,
        easing: Easing.linear,
    },
};
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    // transitionSpec: {
                    //     open: config,
                    //     close: config,
                    // },
                }}
                initialRouteName={NavigationKey.SPLASH}
            >
                <Stack.Screen name={NavigationKey.SPLASH} component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name={NavigationKey.WELCOME} component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen
                    name={NavigationKey.AUTHNAVIGATOR}
                    component={AuthNavigation}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen name={NavigationKey.VERIFICATION} component={Verification} />
                <Stack.Screen name={NavigationKey.OPENDUKAN} component={OpenDukan} />
                <Stack.Screen name={NavigationKey.BHARATBAZARHOME} component={BharatBazarHome} />
                <Stack.Screen name={NavigationKey.PRODUCTSEARCH} component={ProdcutSearch} />
                <Stack.Screen name={NavigationKey.PRODUCT} component={Product} />
                <Stack.Screen name={NavigationKey.PRODUCTDETAILS} component={ProductDetails} />
                <Stack.Screen name={NavigationKey.PRODUCTSUBCATEGORY} component={ProductSubCategory} />
                <Stack.Screen name={NavigationKey.CREATEPRODUCT} component={CreateProduct} />
                <Stack.Screen name={NavigationKey.PRODUCTCATEGORY} component={ProductCategory} />
                <Stack.Screen name={NavigationKey.FORGETPASSWORD} component={ForgetPassword} />
                <Stack.Screen
                    name={NavigationKey.VERIFYOTP}
                    component={VerifyOTP}
                    options={{
                        animation: 'fade',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.RESETPASSWORD}
                    component={ResetPassword}
                    options={{
                        animation: 'fade',
                    }}
                />
                <Stack.Screen name={NavigationKey.EditProductSize} component={ProvideSize} />
                {/* <Stack.Screen name={NavigationKey.PRODUCTSTATUS} component={ProductTab} /> */}
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

const BharatBazarHome = (props: NavigationProps) => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <SideMenu {...props} />}
            screenOptions={{
                drawerStyle: {
                    width: '85%',
                    marginTop: STATUS_BAR_HEIGHT,
                    borderTopRightRadius: getHP(0.1),
                    borderBottomRightRadius: getHP(0.1),
                },
                headerShown: true,
                headerStyle: {
                    backgroundColor: colorCode.CHAKRALOW(70),
                    ...provideShadow(2),
                },
                headerLeftContainerStyle: { ...MLA() },
                headerRightContainerStyle: { ...MRA() },

                headerLeft: () => (
                    <MaterialIcon
                        name={'menu'}
                        size={25}
                        color={colorCode.WHITE}
                        onPress={() => {
                            props.navigation.dispatch(DrawerActions.openDrawer());
                        }}
                    />
                ),
                headerRight: () => (
                    <MaterialIcon
                        name={'search'}
                        size={25}
                        color={colorCode.WHITE}
                        onPress={() => props.navigation.navigate(NavigationKey.PRODUCTSEARCH)}
                    />
                ),
                title: 'Bharat Bazar',
                headerTitleStyle: { color: colorCode.WHITE },
            }}
        >
            <Drawer.Screen name={NavigationKey.HOME} component={Home} />
        </Drawer.Navigator>
    );
};

export default AppNavigation;
