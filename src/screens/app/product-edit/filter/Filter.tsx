import * as React from 'react';
import { View } from 'react-native';
import { BC, BGCOLOR, BR, BW, DSP, JCC, MT, MV, provideShadow, PV } from '../../../../common/styles';

import { getHP } from '../../../../common/dimension';
import {
    FilterInterface,
    FilterValueInterface,
    IClassifier,
    IFilter,
    IProduct,
} from '@app/server/apis/product/product.interface';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import SingleFilter from './SingleFilter';
import { border, IPostDataToServer } from '../../edit/product/component/generalConfig';

interface FilterProps {
    filters: FilterInterface[];
    filterValues: { [key: string]: FilterValueInterface[] };
    setFilterValues: (key: string, value: FilterValueInterface[]) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilterValues, filterValues }) => {
    //console.log('filter', filters);
    return (
        <View style={[{ marginTop: DSP }, provideShadow(2), BR(0.1), BGCOLOR('#FFF'), { padding: DSP }]}>
            <HeaderWithTitleAndSubHeading heading="Select Filter" subHeading="Select the value for you filter" />
            {filters.map((item, index) => (
                <SingleFilter
                    filter={item}
                    index={index}
                    setFilterValues={setFilterValues}
                    filterValues={filterValues[item.key]}
                />
            ))}
        </View>
    );
};

export default Filter;
