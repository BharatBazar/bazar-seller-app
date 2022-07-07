import { getWP } from '@app/common/dimension';

import Border from '@app/screens/components/border/Border';
import { IFilter } from '@app/server/apis/product/product.interface';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Animated, FlatList, ScrollView, View } from 'react-native';
import FilterValue from './FilterValue';
import FilterValues from './FilterValues';
import { fs12, fs13, fs16, NavigationProps } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '@app/common/styles';
import { GENERAL_PADDING, MTA, PHA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import GeneralButtonWithNormalBg from '@app/screens/components/button/ButtonWithBgAndRightIconOrComponent';

import GeneralText from '@app/screens/components/text/GeneralText';

const FilterStackNavigator = createNativeStackNavigator();

interface FilterNavigatorProps {
    filter: IFilter;
    currentIndex: number;
    selectedValues: string[];
    setSelectedValue: Function;
}

let navref = createNavigationContainerRef();
const filtersEx = [
    {
        _id: 1,
        name: 'Size',
        description: 'This filter contain size related details',
        value: [
            {
                _id: '610cdb761ef524d134701e03',
                active: true,
                name: '28',
                description: 'cm',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'size',
                parent: {
                    $oid: '60d83d423e80c9369689e1e2',
                },
                createdAt: {
                    $date: '2021-08-06T06:49:26.456Z',
                },
                updatedAt: {
                    $date: '2021-08-07T07:00:14.180Z',
                },
                __v: 0,
            },
            {
                _id: '610cdb851ef524d134701e04',
                active: true,
                name: '29',
                description: 'cm',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'size',
                parent: {
                    $oid: '60d83d423e80c9369689e1e2',
                },
                createdAt: {
                    $date: '2021-08-06T06:49:41.225Z',
                },
                updatedAt: {
                    $date: '2021-08-07T06:58:32.147Z',
                },
                __v: 0,
            },
            {
                _id: '610cdb8d1ef524d134701e05',
                active: true,
                name: '30',
                description: 'cm',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'size',
                parent: {
                    $oid: '60d83d423e80c9369689e1e2',
                },
                createdAt: {
                    $date: '2021-08-06T06:49:49.970Z',
                },
                updatedAt: {
                    $date: '2021-08-07T07:00:29.654Z',
                },
                __v: 0,
            },
            {
                _id: '610cdb991ef524d134701e06',
                active: true,
                name: '32',
                description: 'cm',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'size',
                parent: {
                    $oid: '60d83d423e80c9369689e1e2',
                },
                createdAt: {
                    $date: '2021-08-06T06:50:01.653Z',
                },
                updatedAt: {
                    $date: '2021-08-07T07:03:59.498Z',
                },
                __v: 0,
            },
            {
                _id: '610cdba41ef524d134701e07',
                active: true,
                name: '31',
                description: 'cm',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'size',
                parent: {
                    $oid: '60d83d423e80c9369689e1e2',
                },
                createdAt: {
                    $date: '2021-08-06T06:50:12.864Z',
                },
                updatedAt: {
                    $date: '2021-08-07T07:01:36.590Z',
                },
                __v: 0,
            },
        ],
        unit: 'cm',
        selectAll: true,
        key: 'size',

        type: 'multiselect',
    },
    {
        _id: 2,
        name: 'Brands',
        description: 'This filter contain size related details',
        value: [
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Puma',
                description: 'Puma is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Nike',
                description: 'Nike is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Adidas',
                description: 'Adidas is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
        ],
        type: 'SearchDropDown',
        showSearch: true,
        key: 'brands',
    },
    {
        _id: 3,
        name: 'Categories',
        description: 'This filter contain size related details',
        value: [
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Puma',
                description: 'Puma is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Nike',
                description: 'Nike is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Adidas',
                description: 'Adidas is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
        ],
        type: 'Multiselectdropdown',
        selectAll: true,
        key: 'categories',
    },
    {
        _id: 4,
        name: 'Colors',
        description: 'This filter contain size related details',
        value: [
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Puma',
                description: 'Puma is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Nike',
                description: 'Nike is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: true,
                name: 'Adidas',
                description: 'Adidas is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
        ],
        type: 'Multiselecttags',
        selectAll: true,
        key: 'colors',
    },
];

const FilterNavigator: React.FunctionComponent<FilterNavigatorProps> = () => {
    const listRef = React.useRef(null);

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedValues, setSelectedValues] = React.useState({});

    const onChange = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const active = Math.ceil(nativeEvent.contentOffset.x / getWP(10));

        if (active !== currentIndex) setCurrentIndex(active);
    };

    console.log('current INdex', currentIndex);

    return (
        <View style={[FLEX(1)]}>
            <View style={[FDR(), JCC('space-between'), PHA()]}>
                <ButtonMaterialIcons
                    onPress={() => {
                        if (currentIndex != 0) {
                            listRef.current.scrollToOffset({
                                animated: true,
                                offset: (currentIndex - 1) * getWP(10),
                            });

                            // setCurrentIndex(currentIndex - 1);
                        } else {
                            //  navigation.goBack();
                        }
                    }}
                    containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(2)]}
                    iconName={currentIndex == 0 ? 'close' : 'chevron-left'}
                />
                <View>
                    <GeneralText
                        containerStyle={[, AIC(), JCC()]}
                        fontFamily={'Medium'}
                        fontSize={fs16}
                        textColor={mainColor}
                        text={'Mens_catalogue'}
                    />

                    <GeneralText
                        containerStyle={[AIC(), JCC(), MTA(2)]}
                        fontFamily={'Medium'}
                        fontSize={fs12}
                        text={'Select filter value for each filter.'}
                    />
                </View>
                <ButtonMaterialIcons
                    iconName="chevron-right"
                    containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(2)]}
                    onPress={() => {
                        listRef.current.scrollToOffset({
                            animated: true,
                            offset: (currentIndex + 1) * getWP(10),
                        });
                        // setCurrentIndex(currentIndex + 1);
                    }}
                />
            </View>
            <Border />
            <FlatList
                ref={listRef}
                horizontal={true}
                data={filtersEx}
                showsHorizontalScrollIndicator={false}
                onScroll={onChange}
                pagingEnabled
                // snapToInterval={getWP(10)}
                renderItem={({ item }) => (
                    <FilterValues
                        filter={item}
                        selectedValues={[]}
                        setSelectedValues={setSelectedValues}
                        index={currentIndex}
                    />
                )}
            />

            {/* <NavigationContainer independent ref={navref}>
                <FilterStackNavigator.Navigator screenOptions={{ headerShown: false }}>
                    <FilterStackNavigator.Screen
                        name={'FilterScreen'}
                        component={FilterValues}
                        options={{
                            animation: currentIndex >= prevIndex.current ? 'slide_from_right' : 'slide_from_left',
                        }}
                        initialParams={{
                            filter: filter,
                            selectedValues: selectedValues,
                            setSelectedValues: setSelectedValue,
                            index: currentIndex,
                        }}
                    />
                </FilterStackNavigator.Navigator>
            </NavigationContainer> */}
        </View>
    );
};

export default FilterNavigator;
