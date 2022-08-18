import * as React from 'react';
import { FontFamily, fs10, NavigationProps } from '../../../common';
import { mainColor } from '../../../common/color';
import { IProductStatus } from '../../../server/apis/product/product.interface';
import ProductList from './List';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Loader from '@app/screens/component/Loader';
import { Shop } from '@app/server/apis/shop/shop.interface';

const Tab = createMaterialTopTabNavigator();

interface ProductTabProps extends NavigationProps {
    shopId: string;

    initialIndex: number;
    tabs: IProductStatus[];
    parentId: string;
}

const ProductTab: React.FC<ProductTabProps> = ({
    navigation,
    shopId,

    initialIndex,
    tabs,
    parentId,
}) => {
    const basicProps = {
        navigation: navigation,
        shopId: shopId,
        parentId: parentId,
    };

    React.useEffect(() => {}, []);

    if (tabs.length > 0) {
        return (
            <Tab.Navigator
                style={{ backgroundColor: '#FFFFFF' }}
                lazy={true}
                tabBarOptions={{
                    scrollEnabled: true,

                    labelStyle: { fontSize: fs10, fontFamily: FontFamily.Medium },
                    indicatorStyle: { backgroundColor: mainColor },

                    activeTintColor: mainColor,

                    allowFontScaling: false,
                }}
                swipeEnabled={false}
                initialRouteName={'Not Completed'}
            >
                {tabs.map((item) => (
                    <Tab.Screen
                        name={item.name.split(' (')[0]}
                        options={{ tabBarLabel: item.name, title: item.name }}
                        children={(props) => (
                            <ProductList
                                key={item._id}
                                {...basicProps}
                                {...props}
                                status={item._id}
                                isInitialRoute={item.name.split(' (')[0] == 'Not Completed'}
                            />
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
