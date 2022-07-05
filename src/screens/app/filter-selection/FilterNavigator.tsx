import { fs12, fs16 } from '@app/common';
import { getWP } from '@app/common/dimension';
import { AIC, FDR, FLEX, JCC } from '@app/common/styles';
import { GENERAL_PADDING, PHA } from '@app/common/stylesheet';
import Border from '@app/screens/components/border/Border';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import ProgressBar from '@app/screens/components/progressbar/ProgressBar';
import GeneralText from '@app/screens/components/text/GeneralText';
import { IFilter } from '@app/server/apis/product/product.interface';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import FilterValues from './FilterValues';

const FilterStackNavigator = createNativeStackNavigator();

interface FilterNavigatorProps {
    filter: IFilter;
    currentIndex: number;
    selectedValues: string[];
    setSelectedValue: Function;
}

let navref = createNavigationContainerRef();

const FilterNavigator: React.FunctionComponent<FilterNavigatorProps> = ({
    filter,
    currentIndex,
    selectedValues,
    setSelectedValue,
}) => {
    const prevIndex = React.useRef(currentIndex);
    React.useEffect(() => {
        if (currentIndex > prevIndex.current) navref.navigate('FilterScreen', { filter: filter });
        else if (currentIndex < prevIndex.current) navref.navigate('FilterScreen', { filter: filter });

        prevIndex.current = currentIndex;
    }, [currentIndex]);

    return (
        <View style={[FLEX(1)]}>
            <Border />
            <NavigationContainer independent ref={navref}>
                <FilterStackNavigator.Navigator screenOptions={{ headerShown: false }}>
                    <FilterStackNavigator.Screen
                        name={'FilterScreen'}
                        component={FilterValues}
                        options={{ animation: 'slide_from_right' }}
                        initialParams={{
                            filter: filter,
                            selectedValues: selectedValues,
                            setSelectedValue: setSelectedValue,
                        }}
                    />
                </FilterStackNavigator.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default FilterNavigator;
