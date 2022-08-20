import { getWP } from '@app/common/dimension';

import Border from '@app/screens/components/border/Border';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import FilterValues from './FilterValues';
import { fs16 } from '@app/common';
import { disabledColor, mainColor } from '@app/common/color';
import { AIC, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '@app/common/styles';
import { PHA, PTA, PVA } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';

import GeneralText from '@app/screens/components/text/GeneralText';
import { removeElementFromArray } from '@app/utilities/array';
import ProgressBar from '@app/screens/components/progressbar/ProgressBar';
import { updateSelectedFilterValues } from '@app/server/apis/filter/filter.api';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import GeneralButtonWithNormalBg from '@app/screens/components/button/ButtonWithBgAndRightIconOrComponent';
import Loader from '@app/screens/component/Loader';
import { getFilterAndValuesAndSelectedFilterValuesByShop, IRFilterValues } from '@app/server/apis/shop/shop.api';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import { NavigationKey } from '@app/labels';

const FilterStackNavigator = createNativeStackNavigator();

interface FilterNavigatorProps {
    goBack: Function;
    item: IProductCatalogue;
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

const FilterNavigator: React.FunctionComponent<FilterNavigatorProps> = ({ goBack, item, navigation, shopId }) => {
    const listRef = React.useRef<FlatList>(null);

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selectedValues, setSelectedValues] = React.useState({});

    const [filters, setFilters] = React.useState([]);

    const [loader, setLoader] = React.useState(false);
    const saveSelectedFilterValues = async (callback?: Function) => {
        setLoader(true);

        try {
            const response = await updateSelectedFilterValues({
                _id: shopId,
                ...selectedValues,
                parent: item._id,
            });
            setLoader(false);
            if (currentIndex + 1 == filters.length) {
                navigation.replace(NavigationKey.PRODUCT, { item: item, shopId: shopId });
            }
            if (callback) {
                callback();
            }
            ToastHOC.successAlert(response.message);
        } catch (error) {
            console.log('error', error);
            setLoader(false);
            ToastHOC.errorAlert(error.message);
        }
    };

    const getFilterWithValuesAndSelectedValue = async (callback?: Function) => {
        setLoader(true);

        try {
            const response: IRFilterValues = await getFilterAndValuesAndSelectedFilterValuesByShop({
                _id: shopId,
                catalogueId: item._id,
            });
            // console.log("GET_ALL_FILTERS_WITH_POWER",response.payload.allFilters.map((e)=>{
            //     console.log("==>",e._id);
            // }));
            console.log("GET_ALL_FILTERS_WITH_POWER",response.payload.allFilters.map((e)=>{
                console.log("==>",e.defaultSelectAll);
            }));
            console.log('response', response.payload.currentIndex, response.payload.selectedValues);
            setFilters(response.payload.allFilters);
            setSelectedValues(response.payload.selectedValues);
            setCurrentIndex(response.payload.currentIndex);
            console.log(response.payload.currentIndex);
            listRef?.current?.scrollToOffset({
                animated: true,
                offset: response.payload.currentIndex * getWP(10),
            });
            ToastHOC.successAlert(response.message);
            setLoader(false);
        } catch (error) {
            console.log('error', error);
            setLoader(false);
            ToastHOC.errorAlert(error.message);
        }
    };

    React.useEffect(() => {
        getFilterWithValuesAndSelectedValue();
    }, []);

    console.log(currentIndex, selectedValues);
    const list = React.useMemo(
        () => (
            <FlatList
                scrollEnabled={false}
                ref={listRef}
                horizontal={true}
                data={filters}
                showsHorizontalScrollIndicator={false}
                //  onScroll={onChange}
                pagingEnabled
                keyExtractor={(item, index) => item._id.toString()}
                // snapToInterval={getWP(10)}
                renderItem={({ item, index }) => (
                    
                    <>
                    <FilterValues
                        filter={item}
                        // selectAll = {item.defaultSelectAll}
                        // selectedValues={selectedValues[item.key] || []}
                        selectedValues={selectedValues[item.key] || []}
                        setSelectedValues={(indexOfValue: number) =>  // jo screen par render ho rha hai vo saari ids idhar aa jaee
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

                        removeSelectedValues={(indexOfValue: number,filter:any) =>  // jo screen par render ho rha hai vo saari ids idhar aa jaee
                            setSelectedValues((selectedValues) => {
                                const notShowFilter = filter.values.filter(e=>e._id !== indexOfValue);
                                const showfilter = notShowFilter.map(e=>{
                                    return e._id
                                })
                                console.log("SHOW_FILTER",showfilter);
                                let values = selectedValues[item.key] || [];
                                if (values.includes(indexOfValue)) {
                                    removeElementFromArray(values, indexOfValue);
                                } else {
                                    values.push(showfilter);
                                }

                                selectedValues[item.key] = values[0];
                                return { ...selectedValues };
                            })
                        }
                       
                        index={currentIndex}
                    /></>
                )}
            />
        ),
        [selectedValues, setSelectedValues],
    );

    const onContinue = () => {
        const setValues:any = filters[currentIndex].values.map((e)=>{
            return e._id
        });
        if (selectedValues[filters[currentIndex].key]) {
            saveSelectedFilterValues(() => {
                if (currentIndex != filters.length - 1) {
                    listRef?.current?.scrollToOffset({
                        animated: true,
                        offset: (currentIndex + 1) * getWP(10),
                    });
                    setCurrentIndex(currentIndex + 1);
                }
            });
        } else if(filters[currentIndex].key) {
             selectedValues[filters[currentIndex].key] = setValues;
             saveSelectedFilterValues(() => {
                if (currentIndex != filters.length - 1) {
                    listRef?.current?.scrollToOffset({
                        animated: true,
                        offset: (currentIndex + 1) * getWP(10),
                    });
                    setCurrentIndex(currentIndex + 1);
                }
            });
           
        }else{
             ToastHOC.errorAlert('Please select atleast odne value');
        }
    };
    return (
        <View style={[FLEX(1)]}>
            {filters.length > 0 && (
                <ProgressBar totalStep={filters.length} height={10} step={currentIndex} totalWidth={getWP(10)} />
            )}

            <View style={[FDR(), JCC('space-between'), PHA(), PTA()]}>
                <ButtonMaterialIcons
                    disabled={currentIndex == 0}
                    onPress={() => {
                        if (currentIndex != 0) {
                            listRef?.current?.scrollToOffset({
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
                <View style={[FLEX(1), AIC(), JCC()]}>
                    <GeneralText
                        containerStyle={[, AIC(), JCC()]}
                        fontFamily={'Medium'}
                        fontSize={fs16}
                        textColor={mainColor}
                        text={filters.length > 0 ? filters[currentIndex]?.name || '' : ''}
                    />
                </View>
                <ButtonMaterialIcons
                    iconName="chevron-right"
                    containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(2)]}
                    onPress={() => {
                        onContinue();
                    }}
                />
            </View>
            <Border />

            {list}
            <GeneralButtonWithNormalBg
                backgroundColor={mainColor}
                buttonText={'Continue'}
                onPress={() => {
                    onContinue();
                }}
                containerStyle={[PVA()]}
            />
            {loader && <Loader />}
        </View>
    );
};

export default FilterNavigator;
