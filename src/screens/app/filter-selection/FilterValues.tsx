import { FLEX } from '@app/common/styles';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import { IFilter } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';

interface FilterValuesProps {
    route: { params: { filter: IFilter } };
}

const FilterValues: React.FunctionComponent<FilterValuesProps> = ({
    route: {
        params: { filter },
    },
}) => {
    return (
        <View style={[FLEX(1)]}>
            <HeaderWithTitleAndSubHeading heading={filter.name} subHeading={filter.description} />
        </View>
    );
};

export default FilterValues;
