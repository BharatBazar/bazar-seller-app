import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar, Route } from 'react-native-tab-view';
import { FontFamily, fs10, fs12, NavigationProps } from '../../../common';
import { colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { productStatus } from '../../../server/apis/product/product.interface';
import WrappedText from '../../component/WrappedText';
import ProductList from './List';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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
}

const ProductTab: React.FC<ProductTabProps> = ({
    navigation,
    shopId,
    category,
    subCategory1,
    subCategory,
    initialIndex,
}) => {
    const layout = useWindowDimensions();
    console.log(productStatus, initialIndex);
    const [index, setIndex] = React.useState(initialIndex);
    const [routes, serRoutes] = React.useState<Route[]>([
        { key: '0', title: 'Live' },
        { key: '1', title: 'Waiting for approval' },
        { key: '2', title: 'Rejected' },
        { key: '3', title: 'Local inventory' },
        { key: '4', title: 'Not completed' },
        { key: '5', title: 'Out of stock' },
    ]);

    const basicProps = {
        navigation: navigation,
        shopId: shopId,
        category: category,
        subCategory: subCategory,
        subCategory1: subCategory1,
    };

    const renderScene = SceneMap({
        0: () => <ProductList key={0} {...basicProps} status={productStatus.LIVE} />,
        1: () => <ProductList key={1} {...basicProps} status={productStatus.WAITINGFORAPPROVAL} />,
        2: () => <ProductList key={2} {...basicProps} status={productStatus.REJECTED} />,
        3: () => <ProductList key={3} {...basicProps} status={productStatus.INVENTORY} />,
        4: () => <ProductList key={4} {...basicProps} status={productStatus.NOTCOMPLETED} />,
        5: () => <ProductList key={5} {...basicProps} status={productStatus.OUTOFSTOCK} />,
    });

    React.useEffect(() => {
        // setTimeout(() => {
        //     setIndex(5);
        // }, 2000);
    }, []);

    return (
        <Tab.Navigator
            style={{ backgroundColor: '#FFFFFF' }}
            lazy={true}
            tabBarOptions={{
                scrollEnabled: true,
                tabStyle: { width: 120 },
                labelStyle: { fontSize: fs10, fontFamily: FontFamily.RobotoMedium },
                indicatorStyle: { backgroundColor: mainColor },
                //labelStyle: { color: mainColor },
                activeTintColor: mainColor,

                allowFontScaling: false,
            }}
            swipeEnabled={false}
            initialRouteName={'Rejected'}
        >
            <Tab.Screen
                name="Live"
                options={{ tabBarLabel: 'Live', title: 'Live' }}
                children={() => <ProductList key={0} {...basicProps} status={productStatus.LIVE} />}
            />
            <Tab.Screen
                name="Waiting For Approval"
                children={() => <ProductList key={1} {...basicProps} status={productStatus.WAITINGFORAPPROVAL} />}
            />
            <Tab.Screen
                name={'Rejected'}
                children={() => <ProductList key={2} {...basicProps} status={productStatus.REJECTED} />}
            />
            <Tab.Screen
                name={'Inventory'}
                children={() => <ProductList key={3} {...basicProps} status={productStatus.INVENTORY} />}
            />
        </Tab.Navigator>
    );

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
