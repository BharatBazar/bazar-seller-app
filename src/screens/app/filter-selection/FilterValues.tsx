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
    const [selectedValue, setSelectedValue] = React.useState(selectedValues || []);

    const componentUnmountTrigger = React.useCallback(() => {
        console.log('unmount', filter.name, selectedValue, setSelectedValues);
        setSelectedValues(selectedValue, index);
    }, [selectedValue]);
    React.useEffect(() => {
        return componentUnmountTrigger;
    }, []);

    console.log(selectedValue);
    return (
        <View style={[FLEX(1), BGCOLOR('#FFF'), PVA(), WP(10)]}>
            <HeaderWithTitleAndSubHeading
                heading={filter.name}
                subHeading={filter.description}
                headerContainerStyle={[PHA()]}
                borderNeeded={false}
            />

            <ScrollView
                pagingEnabled
                snapToStart
                style={{ maxHeight: 500 }}
                stickyHeaderIndices={[0]}
                contentContainerStyle={[]}
            >
                {filter.showSearch && (
                    <GeneralSearch
                        containerStyle={[MHA(), MTA(), BGCOLOR('#FFFFFF')]}
                        placeholder={'Search ' + filter.name}
                    />
                )}
                <View style={[PHA(), MTA()]}>
                    {filter.value.map((item, index) => (
                        <FilterValue
                            item={item}
                            selected={selectedValue.includes(index)}
                            onPress={() => {
                                setSelectedValue((values) => {
                                    if (values.includes(index)) {
                                        removeElementFromArray(values, index);
                                    } else {
                                        values.push(index);
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
