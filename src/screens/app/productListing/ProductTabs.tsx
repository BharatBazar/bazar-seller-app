import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { NavigationProps } from '../../../common';
import { colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { productStatus } from '../../../server/apis/product/product.interface';
import WrappedText from '../../component/WrappedText';
import ProductList from './ProductList';

const FirstRoute = () => <View style={{ flex: 1 }} />;

const SecondRoute = () => <View style={{ flex: 1 }} />;

interface ProductTabProps extends NavigationProps {
    shopId: string;
    category: string;
    subCategory: string;
    subCategory1: string;
}

const ProductTab: React.FC<ProductTabProps> = ({ navigation, shopId, category, subCategory1, subCategory }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'Waiting for approval' },
        { key: 'third', title: 'Pending' },
        { key: '4', title: 'Just Created' },
        { key: '5', title: 'Not completed' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: FirstRoute,
        4: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.READYTOROLLOUT}
            />
        ),
        5: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.NOTCOMPLETED}
            />
        ),
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{
                        height: 0,
                        width: 150,
                        borderBottomColor: mainColor,
                        backgroundColor: 'transparent',
                        borderBottomWidth: 3,
                        borderLeftWidth: 4,
                        borderRightWidth: 4,
                        borderRightColor: 'transparent',
                        borderLeftColor: 'transparent',
                    }}
                    renderLabel={({ route }) => {
                        return <WrappedText text={route.title} textColor={mainColor} />;
                    }}
                    // renderIndicator={({ getTabWidth, position }) => (
                    //     <View
                    //         style={{
                    //             height: 0,
                    //             width: 100,
                    //             borderBottomColor: mainColor,
                    //             backgroundColor: 'transparent',
                    //             borderBottomWidth: 3,
                    //             borderLeftWidth: 4,
                    //             borderRightWidth: 4,
                    //             borderRightColor: 'transparent',
                    //             borderLeftColor: 'transparent',
                    //         }}
                    //     />
                    // )}
                    //indicatorStyle={{}}
                    // renderTabBarItem={({ route }) => (
                    //     <View style={{ height: getHP(0.5) }}>
                    //         <WrappedText text={route.title} />
                    //     </View>
                    // )}
                    tabStyle={{ width: 150, height: getHP(0.7) }}
                    style={{ backgroundColor: colorCode.WHITE }}
                    labelStyle={{ color: mainColor }}
                    activeColor={mainColor}
                    inactiveColor={mainColor}
                    scrollEnabled={true}
                    contentContainerStyle={{ borderBottomWidth: 0.5, borderColor: colorCode.BLACKLOW(20) }}
                />
            )}
        />
    );
};

export default ProductTab;
