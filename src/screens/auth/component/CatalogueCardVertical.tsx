import * as React from 'react';
import { black100, black60, colorCode, mainColor } from '../../../common/color';
import { AIC, BGCOLOR, FDR, FLEX, JCC, PH, provideShadow, PV } from '../../../common/styles';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { productData } from '../ProductCategory';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { FontFamily, fs10, fs12, fs13, fs14, fs16, fs9 } from '../../../common';
import Ripple from 'react-native-material-ripple';

export interface CatalogueCardVerticalProps {
    item: productData;
    containerStyle: ViewStyle | ViewStyle[];
    onPressCategory: () => void;
    selected: boolean;
}

const CatalogueCardVertical: React.SFC<CatalogueCardVerticalProps> = ({
    item,
    onPressCategory,
    containerStyle,
    selected,
}) => {
    return (
        <Ripple
            style={[
                BGCOLOR('#FFFFFF'),
                provideShadow(),
                //item.selected ? { ...provideShadow() } : {},
                { borderRadius: getWP(0.1), padding: 10, width: 150, marginLeft: 20 },
            ]}
            onPress={onPressCategory}
        >
            <View style={[AIC()]}>
                <FastImageWrapper
                    source={{ uri: item.image }}
                    imageStyle={{
                        height: getHP(0.4),
                        width: getHP(0.4),
                    }}
                    resizeMode={'cover'}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <WrappedText
                    text={item.name}
                    textColor={!selected ? black60 : black100}
                    fontSize={fs14}
                    containerStyle={{ marginLeft: 10 }}
                    fontFamily={FontFamily.Medium}
                    textAlign="center"
                />
                <WrappedText
                    text={item.description}
                    textColor={colorCode.BLACKLOW(40)}
                    fontSize={fs10}
                    textStyle={{ marginTop: getHP(0.05) }}
                    textAlign="center"
                />
            </View>
            <Icon
                name={selected ? 'check' : 'circle'}
                style={{ marginLeft: 10, position: 'absolute', top: 10, right: 10 }}
                size={18}
                color={!selected ? black60 : black100}
            />
        </Ripple>
    );
};

export default CatalogueCardVertical;
