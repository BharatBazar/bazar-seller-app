import * as React from 'react';
import { View } from 'react-native';
import { NavigationProps } from '@app/common';
import { AIC, BGCOLOR, FDR, FLEX, provideShadow } from '@app/common/styles';
import { GENERAL_PADDING, MHA, PHA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';

import FilterNavigator from './FilterNavigator';

const filtersEx = [
    {
        _id: 1,
        name: 'Size',
        description: 'This filter contain size related details',
        value: [
            {
                _id: '610cdb761ef524d134701e03',
                active: false,
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
                active: false,
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
                active: false,
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
                active: false,
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
                active: false,
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
        defaultSelectAll: true,
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

                active: false,
                name: 'Puma',
                description: 'Puma is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
                name: 'Nike',
                description: 'Nike is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
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

                active: false,
                name: 'Puma',
                description: 'Puma is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
                name: 'Nike',
                description: 'Nike is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
                name: 'Adidas',
                description: 'Adidas is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
        ],
        type: 'Multiselectdropdown',
        defaultSelectAll: true,
        key: 'categories',
    },
    {
        _id: 4,
        name: 'Colors',
        description: 'This filter contain size related details',
        value: [
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
                name: 'Puma',
                description: 'Puma is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
                name: 'Nike',
                description: 'Nike is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
            {
                _id: '610cdbfd1ef524d134701e08',

                active: false,
                name: 'Adidas',
                description: 'Adidas is a well renowned brand. It is established in 2004.',
                image: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/shoes/June/eoss/MEN/coops/liberty._SS400_QL85_.jpg',
                type: 'brand',
            },
        ],
        type: 'Multiselecttags',
        defaultSelectAll: true,
        key: 'colors',
    },
];
interface SelectFilterProps extends NavigationProps {}

const SelectFilter: React.FunctionComponent<SelectFilterProps> = ({
    navigation,
    route: {
        params: { item, shopId },
    },
}) => {
    console.log('item', item);
    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            <View
                style={[
                    FDR(),
                    AIC(),
                    BGCOLOR('#FFF'),
                    provideShadow(10),
                    PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING),
                    PVA(),
                    PHA(),
                ]}
            >
                <ButtonMaterialIcons
                    onPress={() => {
                        navigation.goBack();
                    }}
                    containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(2)]}
                    iconName={'chevron-left'}
                />
                <HeaderWithTitleAndSubHeading
                    heading={item.type}
                    subHeading={'select filter values for each filter'}
                    borderNeeded={false}
                    headerContainerStyle={[MHA()]}
                />
            </View>
            <FilterNavigator
                item={item}
                goBack={() => {
                    navigation.goBack();
                }}
                navigation={navigation}
                shopId={shopId}
            />
            {/* </View> */}
        </View>
    );
};

export default SelectFilter;
