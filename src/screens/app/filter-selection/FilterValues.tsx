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
    removeSelectedValues: Function;
    index: number;

}

const FilterValues: React.FunctionComponent<FilterValuesProps> = ({
    filter,
    selectedValues,
    setSelectedValues,
    setSelectedValuesFalse,
    removeSelectedValues,
    index,
}) => {

    const [searchText, setSearchText] = React.useState('')
    const [searchFilter, setSearchFilter] = React.useState([])
    const [TotalSearch, setTotalSearch] = React.useState([])
    const [changeSelect, setChangeSelect] = React.useState(false)


    
    React.useEffect(() => {
        const values:any = filter.values.filter(e=>(e.name.toLowerCase() || e.name.split(" ").toLowerCase()).includes(searchText.toLowerCase()))
        const yu:any = values.filter(e=>(e.name.toLowerCase() || e.name.split(" ").toLowerCase()).includes(searchText.toLowerCase()))
        setSearchFilter(yu)            
    }, [searchText])

    
    const setDefaultSelectAllFalse = (item:any)=>{
        console.log("ITEMs",item._id,selectedValues);
        setSelectedValues(item._id)
       filter.defaultSelectAll = false
    //   if(  selectedValues.includes(item._id)){
    //         (filter.defaultSelectAll === false)
    //   }
     
    }


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
                    setSearchText={setSearchText}
                    searchText={searchText}
                />
            )}
            <ScrollView style={{ maxHeight: 500 }} contentContainerStyle={[]}>
                <View style={[PHA()]}>

                    {/* {filter.values.map((item, index) => ( */}
                    {searchFilter.map((item, index) => (
                       <>
 
                       <FilterValue
                       
                            item={item}
                            // selected={selectedValues.includes(item._id)}
                            // selected={filter.defaultSelectAll === true && !selectedValues.includes(item._id)?true: selectedValues.includes(item._id) }
                            // selected={selectedValues.includes(item._id)?true:filter.defaultSelectAll === true && !selectedValues.includes(item._id)?true:false }
                            // onPress={() => {
                            //     !selectedValues.includes(item._id) && filter.defaultSelectAll === true?(setDefaultSelectAllFalse(item)):(setSelectedValues(item._id))
                            // }}
                            selected={filter.defaultSelectAll === true ? setDefaultSelectAllFalse(item) :selectedValues.includes(item._id)}
                             onPress={() => {
                                setSelectedValues(item._id);
                                // filter.defaultSelectAll = false
                            }}
                        />

                       </>
                    ))}
                </View>
            </ScrollView>

        </View>
    );
};

export default FilterValues;
