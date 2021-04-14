import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colorCode, mainColor } from '../../common/color';
import { getHP } from '../../common/dimension';
import WrappedText from '../component/WrappedText';

const FirstRoute = () => <View style={{ flex: 1 }} />;

const SecondRoute = () => <View style={{ flex: 1 }} />;

export default function ProductTab() {
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
        4: FirstRoute,
        5: SecondRoute,
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
}
