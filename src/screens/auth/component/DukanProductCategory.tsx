import * as React from 'react';
import { colorCode } from '../../../common/color';
import { AIC, PH, provideShadow, PV } from '../../../common/styles';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { productData } from '../ProductCategory';
import Icon from 'react-native-vector-icons/Feather';
import { View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { fs10, fs9 } from '../../../common';

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
                item.selected ? { ...provideShadow(), borderWidth: 0.5 } : {},
                { borderColor: colorCode.GREENLOW(60), borderRadius: getWP(0.1), backgroundColor: colorCode.WHITE },
            ]}
            onPress={onPressCategory}
        >
            <>
                {item.selected ? (
                    <Icon
                        name={'check-circle'}
                        color={colorCode.GREEN}
                        style={{ position: 'absolute', top: '4%', right: '4%', zIndex: 100 }}
                    />
                ) : (
                    <View style={{ height: getHP(0.1) }} />
                )}
                <FastImageWrapper
                    source={{ uri: item.image }}
                    imageStyle={{
                        height: getHP(0.6),
                        width: getHP(0.6),
                    }}
                    resizeMode={'cover'}
                />
                <View style={[PV(0.1), PH(0.1), AIC()]}>
                    <WrappedText
                        text={item.name}
                        textColor={item.selected ? colorCode.GREENLOW(50) : colorCode.CHAKRALOW(70)}
                        fontSize={fs10}
                        textStyle={{ textAlign: 'center' }}
                    />
                    <WrappedText
                        text={item.description}
                        textColor={colorCode.BLACKLOW(40)}
                        fontSize={fs9}
                        textStyle={{ textAlign: 'center', marginTop: getHP(0.05) }}
                    />
                </View>
            </>
        </WrappedRectangleButton>
    );
};

export default ProductCategory;
