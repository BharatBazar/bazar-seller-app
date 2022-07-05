import { BGCOLOR, FLEX } from '@app/common/styles';
import { PHA, PVA } from '@app/common/stylesheet';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import { IFilter } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import FilterValue from './FilterValue';

interface FilterValuesProps {
    route: { params: { filter: IFilter } };
}

const FilterValues: React.FunctionComponent<FilterValuesProps> = ({
    route: {
        params: { filter },
    },
}) => {
    return (
        <View style={[FLEX(1), BGCOLOR('#FFF'), PVA(), PHA()]}>
            <HeaderWithTitleAndSubHeading heading={filter.name} subHeading={filter.description} />
            <ScrollView>
                {filter.value.map((item) => (
                    <FilterValue item={item} selected={false} />
                ))}
            </ScrollView>
        </View>
    );
};

export default FilterValues;
