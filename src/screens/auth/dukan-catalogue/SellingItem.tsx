import { fs10, fs14 } from '@app/common';
import { black100, black40, borderColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, BGCOLOR, provideShadow } from '@app/common/styles';
import { GENERAL_PADDING, MBA, MTA, PBA, PVA } from '@app/common/stylesheet';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import GeneralText from '@app/screens/components/text/GeneralText';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { productData } from '../ProductDetails';

interface SellingItemProps {
    item: productData;
    containerStyle: ViewStyle | ViewStyle[];
}

const SellingItem: React.FunctionComponent<SellingItemProps> = ({ item, containerStyle }) => {
    return (
        <View
            style={[
                AIC(),
                PVA(),
                MBA(),
                MTA(GENERAL_PADDING * 0.7),
                provideShadow(2),
                BGCOLOR('#FFF'),
                { borderRightWidth: 0.8, borderColor: borderColor },
                containerStyle,
            ]}
        >
            <FastImageWrapper
                source={{ uri: item.image }}
                imageStyle={{
                    height: getHP(0.5),
                    width: getHP(0.5),
                }}
                resizeMode={'cover'}
            />
            <View style={[MTA(), AIC()]}>
                <GeneralText
                    text={item.name}
                    textColor={black100}
                    fontSize={fs14}
                    fontFamily={'Medium'}
                    textAlign="center"
                />
                <GeneralText
                    text={item.description}
                    textColor={black40}
                    fontSize={fs10}
                    textStyle={{ marginTop: getHP(0.05) }}
                    textAlign="center"
                />
            </View>
        </View>
    );
};

export default SellingItem;
