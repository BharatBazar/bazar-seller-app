import * as React from 'react';
import { View, Pressable, Text, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { fs12, fs16 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import { getHP, getWP } from '../../../../common/dimension';
import {
    AIC,
    BGCOLOR,
    BR,
    colorTransparency,
    FDR,
    FLEX,
    H,
    HP,
    JCC,
    ML,
    MR,
    MT,
    MV,
    PH,
    PV,
    W,
    WP,
} from '../../../../common/styles';
import { IProduct } from '../../../../server/apis/product/product.interface';
import { FastImageWrapper } from '../../../component/FastImage';
import WrappedText from '../../../component/WrappedText';
import { border } from '../../createProduct/product/component/generalConfig';
export interface ProductIdentifierViewProps {
    product: IProduct;
    onPress: Function;
}

const ProductIdentifierView: React.SFC<ProductIdentifierViewProps> = ({
    product: { _id, productColor, productTitle, productSubtitle },
    onPress,
}) => {
    return (
        <Ripple
            style={[border, FDR(), WP(10), AIC(), MT(0.1), HP(2)]}
            onPress={() => {
                onPress();
            }}
        >
            <View style={[FDR(), FLEX(1)]}>
                <View style={[FLEX(2), JCC()]}>
                    <FastImageWrapper
                        source={{
                            uri:
                                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                        }}
                        resizeMode={'cover'}
                        imageStyle={{ height: getHP(1.5), width: '95%', alignSelf: 'center' }}
                    />
                </View>
                <View style={[FLEX(4), PH(0.5)]}>
                    <View style={[FLEX(1)]}>
                        <WrappedText
                            text={
                                productTitle.length == 0 ? 'Product title will come here' : productTitle?.toUpperCase()
                            }
                            fontSize={fs16}
                            textColor={productTitle?.length == 0 ? '#000000' + colorTransparency[60] : '#000000'}
                        />
                    </View>
                    <View style={[FLEX(2)]}>
                        <WrappedText
                            text={productSubtitle?.length == 0 ? 'Product subtitle will come here' : productSubtitle}
                            textColor={colorCode.BLACKLOW(productSubtitle?.length == 0 ? 40 : 70)}
                            fontSize={fs12}
                            ellipsizeMode={'middle'}
                        />
                    </View>
                    <View style={[FDR(), FLEX(1), AIC()]}>
                        <View style={[HP(0.2), W(getHP(0.2)), BR(1), BGCOLOR('#cdeaff'), MR(0.1), border]} />
                        <View style={[HP(0.2), W(getHP(0.2)), BR(1), BGCOLOR('#ddddaa'), MR(0.1), border]} />
                        <View style={[HP(0.2), W(getHP(0.2)), BR(1), BGCOLOR('#eeeeaa'), MR(0.1), border]} />
                    </View>
                </View>
            </View>
        </Ripple>
    );
};

export default ProductIdentifierView;
