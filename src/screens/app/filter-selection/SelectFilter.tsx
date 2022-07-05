import { fs12, fs13, fs16, NavigationProps } from '@app/common';
import { mainColor } from '@app/common/color';
import { getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '@app/common/styles';
import { GENERAL_PADDING, MTA, PHA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import GeneralButtonWithNormalBg from '@app/screens/components/button/ButtonWithBgAndRightIconOrComponent';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import ProgressBar from '@app/screens/components/progressbar/ProgressBar';
import GeneralText from '@app/screens/components/text/GeneralText';
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
        value: ['green', 'red', 'blue'],
        type: 'Multiselecttags',
    },
    {},
];
interface SelectFilterProps extends NavigationProps {}

const SelectFilter: React.FunctionComponent<SelectFilterProps> = ({
    navigation,
    route: {
        params: { item },
    },
}) => {
    const [filters, setfilters] = React.useState<IFilter[]>(filtersEx);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF'), PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING)]}>
            <View style={[FDR(), JCC('space-between'), PHA()]}>
                <ButtonMaterialIcons
                    onPress={() => {
                        if (currentIndex != 0) {
                            setCurrentIndex(currentIndex - 1);
                        } else {
                            navigation.goBack();
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
                        text={item.type}
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
                        setCurrentIndex(currentIndex + 1);
                    }}
                />
            </View>

            <FilterNavigator setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} filters={filters} />
            {/* </View> */}
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
