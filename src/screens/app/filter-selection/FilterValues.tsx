import { BGCOLOR, FLEX } from '@app/common/styles';
import { MHA, MTA, PHA, PVA } from '@app/common/stylesheet';
import WrappedText from '@app/screens/component/WrappedText';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import GeneralSearch from '@app/screens/components/search/Search';
import { IFilter } from '@app/server/apis/product/product.interface';
import { removeElementFromArray } from '@app/utilities/array';
import * as React from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import FilterValue from './FilterValue';

interface FilterValuesProps {
    route: { params: { filter: IFilter; selectedValues: string[]; setSelectedValues: Function } };
}

const FilterValues: React.FunctionComponent<FilterValuesProps> = ({
    route: {
        params: { filter, selectedValues, setSelectedValues: Function },
    },
}) => {
    const [selectedValue, setSelectedValue] = React.useState(selectedValues || []);
    return (
        <View style={[FLEX(1), BGCOLOR('#FFF'), PVA()]}>
            <HeaderWithTitleAndSubHeading
                heading={filter.name}
                subHeading={filter.description}
                headerContainerStyle={[PHA()]}
                borderNeeded={false}
            />

            <ScrollView style={{ maxHeight: 200 }} stickyHeaderIndices={[0]} contentContainerStyle={[]}>
                {filter.showSearch && (
                    <GeneralSearch containerStyle={[MHA(), MTA()]} placeholder={'Search ' + filter.name} />
                )}
                <View style={[PHA(5)]}>
                    {filter.value.map((item) => (
                        <FilterValue
                            item={item}
                            selected={selectedValue && selectedValue.includes(item._id)}
                            onPress={() => {
                                setSelectedValue((values) => {
                                    if (values.includes(item._id)) {
                                        removeElementFromArray(values, item._id);
                                    } else {
                                        values.push(item._id);
                                    }
                                    return [...values];
                                });
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterValues;
