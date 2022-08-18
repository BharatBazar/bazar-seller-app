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

    const onContinue = () => {
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
        } else {
            ToastHOC.errorAlert('Please select atleast one value');
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
