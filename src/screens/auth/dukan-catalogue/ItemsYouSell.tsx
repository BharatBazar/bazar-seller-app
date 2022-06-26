import { getWP } from '@app/common/dimension';
import { BC, BGCOLOR, W } from '@app/common/styles';
import { BRA, MLA, MRA, PHA, PTA, PVA } from '@app/common/stylesheet';
import CarouselWithNumberIndicator from '@app/screens/components/carousel/CarouselWithNumberIndicator';

import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import * as React from 'react';
import { View } from 'react-native';
import SellingItem from './SellingItem';

interface ItemsYouSellProps {
    items: IProductCatalogue[];
    heading?: string;
}

const ItemsYouSell: React.FunctionComponent<ItemsYouSellProps> = ({ items, heading }) => {
    return (
        <View style={[PHA()]}>
            <CarouselWithNumberIndicator
                wrapperContainerStyle={[PVA(), BGCOLOR('')]}
                itemWidth={getWP(5)}
                items={items}
                renderItem={(item) => (
                    <SellingItem
                        item={item}
                        containerStyle={[W(getWP(4.4)), PHA(getWP(0.3)), MLA(getWP(0.1)), MRA(getWP(0.2)), BRA()]}
                    />
                )}
            />
        </View>
    );
};

export default ItemsYouSell;
