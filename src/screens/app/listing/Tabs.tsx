import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { NavigationProps } from '../../../common';
import { colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { productStatus } from '../../../server/apis/product/product.interface';
import WrappedText from '../../component/WrappedText';
import ProductList from './List';

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

    const [index, setIndex] = React.useState(4);
    const [routes, serRoutes] = React.useState([
        { key: productStatus.LIVE, title: 'Live' },
        { key: productStatus.WAITINGFORAPPROVAL, title: 'Waiting for approval' },
        { key: productStatus.REJECTED, title: 'Rejected' },
        { key: productStatus.INVENTORY, title: 'Local inventory' },
        { key: productStatus.NOTCOMPLETED, title: 'Not completed' },
        { key: productStatus.OUTOFSTOCK, title: 'Out of stock' },
    ]);

    const renderScene = SceneMap({
        0: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.LIVE}
            />
        ),
        1: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.WAITINGFORAPPROVAL}
            />
        ),
        2: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.REJECTED}
            />
        ),
        3: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.INVENTORY}
            />
        ),
        4: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.NOTCOMPLETED}
            />
        ),
        5: () => (
            <ProductList
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
                productStatus={productStatus.OUTOFSTOCK}
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
