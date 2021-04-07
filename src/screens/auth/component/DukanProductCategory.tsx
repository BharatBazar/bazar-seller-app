import * as React from 'react';
import { colorCode } from '../../../common/color';
import { BR, commonStyles, PH, PV } from '../../../common/styles';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { productData } from '../ProductDetails';
import Icon from 'react-native-vector-icons/Feather';
import { StyleProp, View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { fs10, fs11 } from '../../../common';

export interface ProductCategoryProps {
    item: productData;
    containerStyle: ViewStyle;
    onPressCategory: () => void;
}

const ProductCategory: React.SFC<ProductCategoryProps> = ({ item, onPressCategory, containerStyle }) => {
    return (
        <WrappedRectangleButton
            containerStyle={[
                containerStyle,
                item.selected ? { ...commonStyles.shadow, borderWidth: 0.5 } : {},
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
                />
                <View style={[PV(0.1), PH(0.1), commonStyles.aic]}>
                    <WrappedText
                        text={item.name}
                        textColor={item.selected ? colorCode.GREENLOW(50) : colorCode.CHAKRALOW(70)}
                        fontSize={fs11}
                        textStyle={{ textAlign: 'center' }}
                    />
                    <WrappedText
                        text={item.description}
                        textColor={colorCode.BLACKLOW(40)}
                        fontSize={fs10}
                        textStyle={{ textAlign: 'center', marginTop: getHP(0.05) }}
                    />
                </View>
            </>
        </WrappedRectangleButton>
    );
};

export default ProductCategory;
