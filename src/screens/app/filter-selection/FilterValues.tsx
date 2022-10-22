import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { AIC, BGCOLOR, FLEX, JCC, WP } from '@app/common/styles';
import { MHA, MTA, PHA } from '@app/common/stylesheet';
import GeneralSearch from '@app/screens/components/search/Search';
import { FilterInterface, FilterValueInterface, IFilter } from '@app/server/apis/product/product.interface';
import FilterValue from './FilterValue';
import WrappedText from '@app/screens/component/WrappedText';

interface FilterValuesProps {
    filter: FilterInterface;
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
    const [searchString, setSearchString] = React.useState('');
    const prevSearchVal = React.useRef('');
    const [result, setResult] = React.useState<FilterValueInterface[]>([]);

    React.useEffect(() => {
        if (prevSearchVal.current.length > searchString.length) {
            if (searchString.length == 0) {
                setResult([]);
            } else setResult([...filter.values.filter((item) => item.name.includes(searchString))]);
        } else if (prevSearchVal.current.length < searchString.length) {
            if (result.length > 0) {
                setResult((prevRes) => prevRes.filter((item) => item.name.includes(searchString)));
            } else {
                setResult([...filter.values.filter((item) => item.name.includes(searchString))]);
            }
        }
        prevSearchVal.current = searchString;
    }, [searchString]);

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
                    searchText={searchString}
                    setSearchString={setSearchString}
                />
            )}
            <ScrollView style={{ maxHeight: 500 }} contentContainerStyle={[]}>
                {searchString.length > 0 ? (
                    result.length > 0 ? (
                        result.map((item, index) => (
                            <View style={[PHA()]}>
                                <FilterValue
                                    item={item}
                                    selected={selectedValues.includes(item._id)}
                                    onPress={() => {
                                        setSelectedValues(item._id);
                                    }}
                                />
                            </View>
                        ))
                    ) : (
                        <WrappedText containerStyle={[FLEX(1), AIC(), JCC(), MTA(50)]} text={'No Result Found'} />
                    )
                ) : (
                    filter.values.map((item, index) => (
                        <View style={[PHA()]}>
                            <FilterValue
                                item={item}
                                selected={selectedValues.includes(item._id)}
                                onPress={() => {
                                    setSelectedValues(item._id);
                                }}
                            />
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default FilterValues;
