import * as React from 'react';
<<<<<<< HEAD
import { ScrollView, Text, View } from 'react-native';
import { BGCOLOR, FLEX, WP } from '@app/common/styles';
=======
import { ScrollView, View } from 'react-native';
import { AIC, BGCOLOR, FLEX, JCC, WP } from '@app/common/styles';
>>>>>>> 0f59a69e5f1efa98d9e9e446b5c9233880276706
import { MHA, MTA, PHA } from '@app/common/stylesheet';
import GeneralSearch from '@app/screens/components/search/Search';
import { FilterInterface, FilterValueInterface, IFilter } from '@app/server/apis/product/product.interface';
import FilterValue from './FilterValue';
import WrappedText from '@app/screens/component/WrappedText';

interface FilterValuesProps {
    filter: FilterInterface;
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
<<<<<<< HEAD

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

=======
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
>>>>>>> 0f59a69e5f1efa98d9e9e446b5c9233880276706

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 0f59a69e5f1efa98d9e9e446b5c9233880276706
            </ScrollView>

        </View>
    );
};

export default FilterValues;
