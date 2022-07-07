import { BGCOLOR, FLEX, WP } from '@app/common/styles';
import { MHA, MTA, PHA, PVA } from '@app/common/stylesheet';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import GeneralSearch from '@app/screens/components/search/Search';
import { IFilter } from '@app/server/apis/product/product.interface';
import { removeElementFromArray } from '@app/utilities/array';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import FilterValue from './FilterValue';

interface FilterValuesProps {
    filter: IFilter;
    selectedValues: string[];
    setSelectedValues: Function;
    index: number;
}

const FilterValues: React.FunctionComponent<FilterValuesProps> = ({
    filter,
    selectedValues,
    setSelectedValues,
    index,
}) => {
    return (
        <View style={[FLEX(1), BGCOLOR('#FFF'), WP(10)]}>
            {/* <HeaderWithTitleAndSubHeading
                heading={filter.name}
                subHeading={filter.description}
                headerContainerStyle={[PHA()]}
                borderNeeded={false}
            /> */}
            {filter.showSearch && (
                <GeneralSearch
                    containerStyle={[MHA(), MTA(), BGCOLOR('#FFFFFF')]}
                    placeholder={'Search ' + filter.name}
                />
            )}
            <ScrollView style={{ maxHeight: 500 }} contentContainerStyle={[]}>
                <View style={[PHA()]}>
                    {filter.value.map((item, index) => (
                        <FilterValue
                            item={item}
                            selected={selectedValues.includes(index)}
                            onPress={() => {
                                setSelectedValues(index);
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterValues;
