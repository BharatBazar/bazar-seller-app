import React from 'react';
import { Easing, Image, Text, TouchableOpacity, View } from 'react-native';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import Splash from '../screens/startup/SplashScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { NavigationKey } from '../labels';
import { colorCode } from '../common/color';
import { FontFamily, NavigationProps } from '../common';
import { provideShadow } from '../common/styles';
import { SideMenu } from '../screens/app/drawer/SideMenu';
import { STATUS_BAR_HEIGHT } from '../screens/component/StatusBar';
import { getHP } from '../common/dimension';
import { MLA, MRA } from '@app/common/stylesheet';
import SelectFilter from '@app/screens/app/filter-selection/SelectFilter';
import Welcome from '../screens/auth/Welcome';
import AuthNavigation from '../screens/auth/navigator';
import Verification from '../screens/auth/Verification';
import OpenDukan from '../screens/auth/OpenDukan';
import Home from '../screens/app/dashboard/Home';
import ForgetPassword from '../screens/auth/SendOtp';
import VerifyOTP from '../screens/auth/VerifyOTP';
import ResetPassword from '../screens/auth/ResetPassword';
import ProductDetails from '@app/screens/auth/ProductDetails';
import ProductSubCategory from '@app/screens/auth/ProductSubCategory';
import ProvideSize from '@app/screens/app/product-edit/size/ProvideSize';
import ProductCategory from '../screens/app/dashboard/ProductCategory';
import ProdcutSearch from '../screens/app/search/Search';
import Product from '../screens/app/listing/Main';
import CreateProduct from '../screens/app/product-edit/index';
import CloseIcon from 'react-native-vector-icons/AntDesign'
import CreateBill from '@app/screens/auth/bill-desk/CreateBill';
import ShowBills from '@app/screens/auth/bill-desk/ShowBills';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const config: TransitionSpec = {
    animation: 'timing',
    config: {
        duration: 150,
        easing: Easing.linear,
    },
};

const toastConfig = {

    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontFamily: FontFamily.Helvatica,
            }}
            text2Style={{
                fontSize: 13,
                fontFamily: FontFamily.Helvatica,
            }}
            renderTrailingIcon={() => <TouchableOpacity style={{ alignSelf: "center", paddingRight: 10 }} onPress={() => Toast.hide()}>{<CloseIcon name='close' size={22} color="#222222" />}</TouchableOpacity>}
        />
    ),

    error: (props: any) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 15,
                fontFamily: FontFamily.Helvatica,
            }}
            text2Style={{
                fontSize: 13,
                fontFamily: FontFamily.Helvatica,
            }}
            renderTrailingIcon={() => <TouchableOpacity style={{ alignSelf: "center", paddingRight: 10 }} onPress={() => Toast.hide()}>{<CloseIcon name='close' size={22} color="#222222" />}</TouchableOpacity>}

        />
    ),

    info: (props: any) => (
        <InfoToast
            {...props}
            text1Style={{
                fontSize: 15,
                fontFamily: FontFamily.Helvatica,
            }}
            text2Style={{
                fontSize: 13,
                fontFamily: FontFamily.Helvatica,
            }}
            renderTrailingIcon={() => <TouchableOpacity style={{ alignSelf: "center", paddingRight: 10 }} onPress={() => Toast.hide()}>{<CloseIcon name='close' size={22} color="#222222" />}</TouchableOpacity>}

        />
    ),
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
                <Stack.Screen
                    name={NavigationKey.SPLASH}
                    component={Splash}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.SELECTFILTER}
                    component={SelectFilter}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.WELCOME}
                    component={Welcome}
                    options={{
                        animation: 'slide_from_left',
                    }}
                />
                <Stack.Screen
                    name={NavigationKey.AUTHNAVIGATOR}
                    component={AuthNavigation}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
                <Stack.Screen name={NavigationKey.VERIFICATION} component={Verification} />
                <Stack.Screen
                    name={NavigationKey.OPENDUKAN}
                    component={OpenDukan}
                    options={{
                        animation: 'fade',
                    }}
                />
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
                <Stack.Screen name={NavigationKey.CREATEBILL} component={CreateBill} options={{
                    animation: "slide_from_right"
                }} />
                <Stack.Screen name={NavigationKey.SHOWBILLS} component={ShowBills} options={{
                    animation: "slide_from_right"
                }} />
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
            <Toast config={toastConfig} />
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
