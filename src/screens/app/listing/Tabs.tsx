import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view';
import { FontFamily, fs10, fs12, NavigationProps } from '../../../common';
import { colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { IProductStatus, productStatus } from '../../../server/apis/product/product.interface';
import WrappedText from '../../component/WrappedText';
import ProductList from './List';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loader from '@app/screens/component/Loader';

const Tab = createMaterialTopTabNavigator();

const FirstRoute = () => <View style={{ flex: 1 }} />;

const SecondRoute = () => <View style={{ flex: 1 }} />;
function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

interface ProductTabProps extends NavigationProps {
    shopId: string;
    category: string;
    subCategory: string;
    subCategory1: string;
    initialIndex: number;
    tabs: IProductStatus[];
}

const ProductTab: React.FC<ProductTabProps> = ({
    navigation,
    shopId,
    category,
    subCategory1,
    subCategory,
    initialIndex,
    tabs,
}) => {
    const basicProps = {
        navigation: navigation,
        shopId: shopId,
        category: category,
        subCategory: subCategory,
        subCategory1: subCategory1,
    };

    React.useEffect(() => {}, []);

    if (tabs.length > 0) {
        return (
            <Tab.Navigator
                style={{ backgroundColor: '#FFFFFF' }}
                lazy={true}
                tabBarOptions={{
                    scrollEnabled: true,
                    tabStyle: { width: 140 },
                    labelStyle: { fontSize: fs10, fontFamily: FontFamily.RobotoMedium },
                    indicatorStyle: { backgroundColor: mainColor },
                    //labelStyle: { color: mainColor },
                    activeTintColor: mainColor,

                    allowFontScaling: false,
                }}
                swipeEnabled={false}
                initialRouteName={'Rejected'}
            >
                {tabs.map((item) => (
                    <Tab.Screen
                        name={item.name}
                        // options={{ tabBarLabel: 'Live', title: 'Live' }}
                        children={(props) => (
                            <ProductList key={item._id} {...basicProps} {...props} status={item._id} />
                        )}
                    />
                ))}
            </Tab.Navigator>
        );
    } else {
        return <Loader />;
    }

    // return (
    //     <TabView
    //         lazy
    //         navigationState={{ index, routes }}
    //         renderScene={renderScene}
    //         onIndexChange={setIndex}
    //         initialLayout={{ width: layout.width }}
    //         renderTabBar={(props) => (
    //             <TabBar
    //                 {...props}
    //                 // renderIndicator={({ getTabWidth, position }) => (
    //                 //     <View
    //                 //         style={{
    //                 //             height: 0,
    //                 //             width: 100,
    //                 //             borderBottomColor: mainColor,
    //                 //             backgroundColor: 'transparent',
    //                 //             borderBottomWidth: 3,
    //                 //             borderLeftWidth: 4,
    //                 //             borderRightWidth: 4,
    //                 //             borderRightColor: 'transparent',
    //                 //             borderLeftColor: 'transparent',
    //                 //         }}
    //                 //     />
    //                 // )}
    //                 //indicatorStyle={{}}
    //                 // renderTabBarItem={({ route }) => (
    //                 //     <View style={{ height: getHP(0.5) }}>
    //                 //         <WrappedText text={route.title} />
    //                 //     </View>
    //                 // )}
    //                 indicatorStyle={{
    //                     height: 0,
    //                     width: 150,
    //                     borderBottomColor: mainColor,
    //                     backgroundColor: 'transparent',
    //                     borderBottomWidth: 3,
    //                     borderLeftWidth: 4,
    //                     borderRightWidth: 4,
    //                     borderRightColor: 'transparent',
    //                     borderLeftColor: 'transparent',
    //                 }}
    //                 renderLabel={({ route }) => {
    //                     return <WrappedText text={route.title} textColor={mainColor} />;
    //                 }}
    //                 tabStyle={{ width: 150, height: getHP(0.7) }}
    //                 style={{ backgroundColor: colorCode.WHITE }}
    //                 labelStyle={{ color: mainColor }}
    //                 activeColor={mainColor}
    //                 inactiveColor={mainColor}
    //                 scrollEnabled={true}
    //                 contentContainerStyle={{ borderBottomWidth: 0.5, borderColor: colorCode.BLACKLOW(20) }}
    //             />
    //         )}
    //     />
    // );
};

export default ProductTab;
