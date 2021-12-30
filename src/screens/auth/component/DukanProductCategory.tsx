import * as React from 'react';
import { black100, black60, colorCode, mainColor } from '../../../common/color';
import { AIC, FDR, PH, provideShadow, PV } from '../../../common/styles';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { productData } from '../ProductCategory';
import Icon from 'react-native-vector-icons/Feather';
import { View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { FontFamily, fs10, fs12, fs13, fs14, fs16, fs9 } from '../../../common';

export interface ProductCategoryProps {
    item: productData;
    containerStyle: ViewStyle | ViewStyle[];
    onPressCategory: () => void;
}

const ProductCategory: React.SFC<ProductCategoryProps> = ({ item, onPressCategory, containerStyle }) => {
    return (
        <WrappedRectangleButton
            containerStyle={[
                containerStyle,
                FDR(),
                { flex: 1 },
                // item.selected ? { ...provideShadow() } : {},
                { borderRadius: getWP(0.1), backgroundColor: colorCode.WHITE },
            ]}
            onPress={onPressCategory}
        >
            <FastImageWrapper
                source={{ uri: item.image }}
                imageStyle={{
                    height: getHP(0.6),
                    width: getHP(0.6),
                }}
                resizeMode={'cover'}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <WrappedText
                    text={item.name}
                    textColor={!item.selected ? black60 : black100}
                    fontSize={fs13}
                    fontFamily={FontFamily.Medium}
                />
                <WrappedText
                    text={item.description}
                    textColor={colorCode.BLACKLOW(40)}
                    fontSize={fs9}
                    textStyle={{ marginTop: getHP(0.05) }}
                />
            </View>

            <Icon name={item.selected ? 'check' : 'circle'} style={{ marginLeft: 20 }} size={15} color={mainColor} />
        </WrappedRectangleButton>
    );
};

export default ProductCategory;
