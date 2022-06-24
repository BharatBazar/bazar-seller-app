import { FontFamily, fs20 } from '@app/common';
import { getWP } from '@app/common/dimension';
import { BC, BW, ML, PV, W } from '@app/common/styles';
import { MLA, MRA, PHA, PTA, PVA } from '@app/common/stylesheet';
import CarouselWithNumberIndicator from '@app/screens/components/carousel/CarouselWithNumberIndicator';
import GeneralText from '@app/screens/components/text/GeneralText';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import * as React from 'react';
import { View, FlatList } from 'react-native';
import SellingItem from './SellingItem';

interface ItemsYouSellProps {
    items: IProductCatalogue[];
    heading?: string;
}

const ItemsYouSell: React.FunctionComponent<ItemsYouSellProps> = ({ items, heading }) => {
    return (
        <View style={[PHA()]}>
            <CarouselWithNumberIndicator
                wrapperContainerStyle={[PVA()]}
                itemWidth={getWP(5)}
                items={items}
                renderItem={(item) => (
                    <SellingItem item={item} containerStyle={[W(getWP(4)), PHA(getWP(0.5)), MRA(getWP(0.5))]} />
                )}
            />
        </View>
    );
};

export default ItemsYouSell;
