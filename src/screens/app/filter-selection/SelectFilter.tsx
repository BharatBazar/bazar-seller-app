import { BGCOLOR, FLEX } from '@app/common/styles';
import { PHA, PTA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import * as React from 'react';
import { View } from 'react-native';

interface SelectFilterProps {
    route: {
        params: {
            item: IProductCatalogue;
        };
    };
}

const SelectFilter: React.FunctionComponent<SelectFilterProps> = ({
    route: {
        params: { item },
    },
}) => {
    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            <HeaderWithBackButtonTitleAndrightButton
                containerStyle={[PTA(STATUS_BAR_HEIGHT), PHA()]}
                title={'Select filter in ' + item.name + ' category'}
                onPressBack={() => {}}
            />
            <View style={[FLEX(1)]}>
                <HeaderWithTitleAndSubHeading heading={item.name} subHeading={'Select filter values'} />
            </View>
        </View>
    );
};

export default SelectFilter;
