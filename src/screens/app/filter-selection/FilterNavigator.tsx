import { FDR, FLEX, JCC } from '@app/common/styles';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { IFilter } from '@app/server/apis/product/product.interface';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import FilterValues from './FilterValues';

const FilterStackNavigator = createNativeStackNavigator();

interface FilterNavigatorProps {
    filters: IFilter[];
    currentIndex: number;
    setCurrentIndex: Function;
}

let navref = createNavigationContainerRef();

const FilterNavigator: React.FunctionComponent<FilterNavigatorProps> = ({ filters, currentIndex, setCurrentIndex }) => {
    let prevIndex = React.useRef(currentIndex).current;
    React.useEffect(() => {
        console.log(navref, navref.isReady());
        if (currentIndex > prevIndex) navref.navigate('FilterScreen', { filter: filters[currentIndex] });
        else if (currentIndex < prevIndex) navref.navigate('FilterScreen', { filter: filters[currentIndex] });

        prevIndex = currentIndex;
    }, [currentIndex]);
    return (
        <View style={[FLEX(1)]}>
            <View style={[FDR(), JCC('space-between')]}>
                {currentIndex > 0 && (
                    <ButtonMaterialIcons
                        onPress={() => {
                            setCurrentIndex(currentIndex - 1);
                        }}
                        iconName="chevron-left"
                    />
                )}
                {currentIndex != filters.length - 1 && (
                    <ButtonMaterialIcons
                        iconName="chevron-right"
                        onPress={() => {
                            setCurrentIndex(currentIndex + 1);
                        }}
                    />
                )}
            </View>
            <NavigationContainer independent ref={navref}>
                <FilterStackNavigator.Navigator screenOptions={{ headerShown: false }}>
                    <FilterStackNavigator.Screen
                        name={'FilterScreen'}
                        component={FilterValues}
                        options={{ animation: 'slide_from_right' }}
                        initialParams={{ filter: filters[currentIndex] }}
                    />
                </FilterStackNavigator.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default FilterNavigator;
