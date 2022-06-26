import { fs10, fs14 } from '@app/common';
import { black100, black40, borderColor, mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, BGCOLOR, provideShadow } from '@app/common/styles';
import { GENERAL_PADDING, MBA, MTA, PBA, PVA } from '@app/common/stylesheet';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import GeneralText from '@app/screens/components/text/GeneralText';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { productData } from '../ProductDetails';

interface SellingItemProps {
    item: IProductCatalogue;
    containerStyle: ViewStyle | ViewStyle[];
}

const SellingItem: React.FunctionComponent<SellingItemProps> = ({ item, containerStyle }) => {
    return (
        <View
            style={[
                PVA(),
                MBA(),
                MTA(GENERAL_PADDING),
                provideShadow(2),
                BGCOLOR('#FFF'),
                { borderRightWidth: 0.8, borderColor: borderColor },
                containerStyle,
            ]}
        >
            <GeneralText text={'Under'} fontSize={fs10} fontFamily={'Medium'} textColor={mainColor} />
            <GeneralText
                text={item.path.reduce((a, b) => a + (a.length > 0 ? ' --> ' : '') + b.name, '')}
                fontSize={fs10}
                textAlign="center"
                fontFamily={'Medium'}
                textColor={mainColor}
            />

            <FastImageWrapper
                source={{ uri: item.image }}
                imageStyle={{
                    height: getHP(0.5),
                    width: getHP(0.5),
                    marginTop: GENERAL_PADDING,
                    alignSelf: 'center',
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
