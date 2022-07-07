import { getWP } from '@app/common/dimension';

import Border from '@app/screens/components/border/Border';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import FilterValues from './FilterValues';
import { fs12, fs16 } from '@app/common';
import { disabledColor, mainColor, subHeadingColor } from '@app/common/color';
import { AIC, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '@app/common/styles';
import { MTA, PHA, PTA } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';

import GeneralText from '@app/screens/components/text/GeneralText';
import { removeElementFromArray } from '@app/utilities/array';
import ProgressBar from '@app/screens/components/progressbar/ProgressBar';

const FilterStackNavigator = createNativeStackNavigator();

interface FilterNavigatorProps {
    goBack: Function;
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

const FilterNavigator: React.FunctionComponent<FilterNavigatorProps> = ({ goBack }) => {
    const listRef = React.useRef(null);

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedValues, setSelectedValues] = React.useState({});

    // const onChange = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    //     const active = Math.ceil(nativeEvent.contentOffset.x / getWP(10));

    //     if (active !== currentIndex) setCurrentIndex(active);
    // };

    console.log('current INdex', currentIndex);
    const list = React.useMemo(
        () => (
            <FlatList
                scrollEnabled={false}
                ref={listRef}
                horizontal={true}
                data={filtersEx}
                showsHorizontalScrollIndicator={false}
                //  onScroll={onChange}
                pagingEnabled
                keyExtractor={(item, index) => item._id.toString()}
                // snapToInterval={getWP(10)}
                renderItem={({ item, index }) => (
                    <FilterValues
                        filter={item}
                        selectedValues={selectedValues[item.key] || []}
                        setSelectedValues={(indexOfValue: number) =>
                            setSelectedValues((selectedValues) => {
                                let values = selectedValues[item.key] || [];
                                if (values.includes(indexOfValue)) {
                                    removeElementFromArray(values, indexOfValue);
                                } else {
                                    values.push(indexOfValue);
                                }

                                selectedValues[item.key] = values;
                                return { ...selectedValues };
                            })
                        }
                        index={currentIndex}
                    />
                )}
            />
        ),
        [selectedValues, setSelectedValues],
    );
    return (
        <View style={[FLEX(1)]}>
            <ProgressBar totalStep={filtersEx.length} height={10} step={currentIndex + 1} totalWidth={getWP(10)} />

            <View style={[FDR(), JCC('space-between'), PHA(), PTA()]}>
                <ButtonMaterialIcons
                    disabled={currentIndex == 0}
                    onPress={() => {
                        if (currentIndex != 0) {
                            listRef.current.scrollToOffset({
                                animated: true,
                                offset: (currentIndex - 1) * getWP(10),
                            });
                            setCurrentIndex(currentIndex - 1);
                        } else {
                            goBack();
                        }
                    }}
                    containerStyle={[
                        BGCOLOR(currentIndex == 0 ? disabledColor : '#FFFFFF'),
                        provideShadow(currentIndex == 0 ? 0 : 2),
                    ]}
                    iconName={currentIndex == 0 ? 'close' : 'chevron-left'}
                />
                <View>
                    <GeneralText
                        containerStyle={[, AIC(), JCC()]}
                        fontFamily={'Medium'}
                        fontSize={fs16}
                        textColor={mainColor}
                        text={filtersEx[currentIndex].name}
                    />

                    <GeneralText
                        containerStyle={[AIC(), JCC(), MTA(2)]}
                        fontFamily={'Medium'}
                        fontSize={fs12}
                        text={filtersEx[currentIndex].description}
                    />
                </View>
                <ButtonMaterialIcons
                    iconName="chevron-right"
                    containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(2)]}
                    onPress={() => {
                        if (currentIndex != filtersEx.length - 1) {
                            listRef.current.scrollToOffset({
                                animated: true,
                                offset: (currentIndex + 1) * getWP(10),
                            });

                            setCurrentIndex(currentIndex + 1);
                        }
                    }}
                />
            </View>
            <Border />

            {list}
        </View>
    );
};

export default FilterNavigator;
