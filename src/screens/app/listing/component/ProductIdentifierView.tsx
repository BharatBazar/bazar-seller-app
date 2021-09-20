import * as React from 'react';
import { View, Pressable, Text, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { fs12, fs16 } from '../../../../common';
import { borderProductColor, colorCode } from '../../../../common/color';
import { getHP, getWP } from '../../../../common/dimension';
import {
    AIC,
    BC,
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
import { border } from '../../edit/product/component/generalConfig';
export interface ProductIdentifierViewProps {
    product: IProduct;
    onPress: Function;
}

const ProductIdentifierView: React.SFC<ProductIdentifierViewProps> = ({
    product: { _id, title, subTitle, ...rest },
    onPress,
}) => {
    return (
        <Ripple
            style={[AIC(), BGCOLOR('#FFFFFF'), WP(4), HP(3), PV(0.1)]}
            onPress={() => {
                onPress();
            }}
        >
            <View style={[FLEX(0.7)]}>
                <FastImageWrapper
                    source={{
                        uri:
                            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                    }}
                    resizeMode={'cover'}
                    imageStyle={[{ height: '100%', width: getWP(4), borderRadius: getHP(0.1) }]}
                />
            </View>

            <View style={[FDR(), FLEX(0.3), JCC('center'), AIC('center')]}>
                {rest.colors.map((color) => {
                    return (
                        <View
                            style={[HP(0.2), W(getHP(0.2)), BR(0.1), BGCOLOR(color.color.description), MR(0.1), border]}
                        />
                    );
                })}
                {rest.colors.length == 0 && <WrappedText text={'No color added'} textColor={'#646464'} />}
            </View>
        </Ripple>
    );
};

export default ProductIdentifierView;
