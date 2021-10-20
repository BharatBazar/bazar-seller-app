import * as React from 'react';
import { View, Pressable, Text, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { fs10, fs12, fs16, fs18, fs20 } from '../../../../common';
import {
    borderColor,
    borderProductColor,
    colorCode,
    errorColor,
    mainColor,
    subHeadingColor,
} from '../../../../common/color';
import { getHP, getWP } from '../../../../common/dimension';
import {
    AIC,
    BC,
    BGCOLOR,
    BR,
    BW,
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
import { IProduct, productStatus } from '../../../../server/apis/product/product.interface';
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
            style={[
                AIC(),
                BGCOLOR('#FFFFFF'),
                WP(4),
                PV(0.1),
                BW(1),
                BC(borderColor),
                { borderRadius: 5, marginTop: getHP(0.1) },
            ]}
            onPress={() => {
                onPress();
            }}
        >
            <View style={[]}>
                <FastImageWrapper
                    source={{
                        uri:
                            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                    }}
                    resizeMode={'contain'}
                    imageStyle={[
                        { width: getWP(4), height: getHP(1.5), borderRadius: getHP(0.1), resizeMode: 'contain' },
                    ]}
                />
            </View>

            <View style={[FDR(), JCC('center'), AIC('center')]}>
                {rest.colors.map((color) => {
                    return (
                        <View
                            style={[HP(0.2), W(getHP(0.2)), BR(0.1), BGCOLOR(color.color.description), MR(0.1), border]}
                        />
                    );
                })}
                {rest.colors.length == 0 && <WrappedText text={'No color added'} textColor={'#646464'} />}
            </View>
            {rest.status == productStatus.REJECTED ? (
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: errorColor,
                        backgroundColor: errorColor + colorTransparency[10],
                        borderRadius: 5,
                        paddingHorizontal: '3%',
                        paddingVertical: '3%',
                        marginTop: getHP(0.1),
                    }}
                >
                    <WrappedText text={'Rejection Note'} fontSize={fs16} textAlign={'center'} textColor={errorColor} />
                    <WrappedText
                        text={rest?.note}
                        textColor={subHeadingColor}
                        fontSize={fs10}
                        textAlign={'center'}
                        numberOfLines={2}
                        containerStyle={[MT(0.05)]}
                    />
                </View>
            ) : (
                <View />
            )}
        </Ripple>
    );
};

export default ProductIdentifierView;
