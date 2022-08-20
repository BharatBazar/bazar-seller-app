import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
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
    // selectAll:boolean;
}

const FilterValues: React.FunctionComponent<FilterValuesProps> = ({
    filter,
    selectedValues,
    setSelectedValues,
    // selectAll,
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
                       <>
           
                  {filter.defaultSelectAll === true ?(
                       <FilterValue
                            item={item}  //selected should be true until or unless vo kisi pr press na kre
                            selected={true}  // it is important to change this code for default select all
                          
                            onPress={() => {
                                // setSelectedValues(item._id);
                                filter.defaultSelectAll = false
                                setSelectedValues(item._id);
                            }}
                        />
                  ):(
                       <FilterValue
                            item={item}  //selected should be true until or unless vo kisi pr press na kre
                            selected={selectedValues.includes(item._id)}  

                            onPress={() => {
                                // setSelectedValues(item._id);
                                setSelectedValues(item._id);
                            }}
                        />
                  )}
                       
                       </>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterValues;
