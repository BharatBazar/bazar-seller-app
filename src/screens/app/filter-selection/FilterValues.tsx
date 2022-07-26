import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { BGCOLOR, FLEX, WP } from '@app/common/styles';
import { MHA, MTA, PHA } from '@app/common/stylesheet';
import GeneralSearch from '@app/screens/components/search/Search';
import { IFilter } from '@app/server/apis/product/product.interface';
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
                    {filter.values.map((item, index) => (
                        <FilterValue
                            item={item}
                            selected={selectedValues.includes(item._id)}
                            onPress={() => {
                                setSelectedValues(item._id);
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterValues;
