import { mainColor } from '@app/common/color';
import { AIC, BGCOLOR, FLEX } from '@app/common/styles';
import { GENERAL_PADDING, PHA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import GeneralButtonWithNormalBg from '@app/screens/components/button/ButtonWithBgAndRightIconOrComponent';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import { IFilter } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';
import FilterNavigator from './FilterNavigator';

const filtersEx = [
    {
        name: 'Size',
        description: 'This filter contain size related details',
        value: ['28', '29', '30'],
        unit: 'cm',
        type: 'multiselect',
    },
    {
        name: 'Brands',
        description: 'This filter contain size related details',
        value: ['Adidas', 'Nike'],
        type: 'SearchDropDown',
    },
    {
        name: 'Categories',
        description: 'This filter contain size related details',
        value: ['Damaged', 'All'],
        type: 'Multiselectdropdown',
    },
    {
        name: 'Colors',
        description: 'This filter contain size related details',
        value: [
            { name: 'green', colorCode: '#234342' },
            { name: 'red', colorCode: 'something' },
        ],
        type: 'Multiselecttags',
    },
    {},
];
interface SelectFilterProps {
    route: {
        params: {
            item: IProductCatalogue;
        };
    };
}

const SelectFilter: React.FunctionComponent<SelectFilterProps> = ({
    route: {
        params: { item },
    },
}) => {
    const [filters, setfilters] = React.useState<IFilter[]>(filtersEx);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            <HeaderWithBackButtonTitleAndrightButton
                containerStyle={[PTA(STATUS_BAR_HEIGHT + 10), PHA()]}
                title={item.name + ' category'}
                onPressBack={() => {}}
            />
            <View style={[FLEX(1)]}>
                <FilterNavigator setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} filters={filters} />
            </View>
            <GeneralButtonWithNormalBg
                backgroundColor={mainColor}
                buttonText={'Continue'}
                onPress={() => {}}
                containerStyle={[PVA()]}
            />
        </View>
    );
};

export default SelectFilter;
