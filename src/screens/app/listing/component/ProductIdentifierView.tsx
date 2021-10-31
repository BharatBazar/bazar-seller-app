import { AlertBox } from '@app/common/containerStyles';
import * as React from 'react';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { fs10, fs16, fs9 } from '../../../../common';
import { borderColor, errorColor, subHeadingColor } from '../../../../common/color';
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
    MH,
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
                WP(4.7),
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
                    resizeMode={'cover'}
                    imageStyle={[
                        {
                            width: getWP(4),
                            height: getHP(1.5),
                            borderRadius: getHP(0.1),
                            resizeMode: 'cover',
                            borderWidth: 1.5,
                            borderColor: '#000000' + colorTransparency[30],
                        },
                    ]}
                />
            </View>

            <View style={[FDR(), JCC('center'), AIC('center'), MT(0.1)]}>
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
                <View style={[AlertBox(), { width: '90%' }, MV(0.1), MH(0.1)]}>
                    <WrappedText text={'Rejection Note'} fontSize={fs16} textAlign={'center'} textColor={errorColor} />
                    <WrappedText
                        text={rest?.note[0] ? rest?.note[0] : 'No rejection note'}
                        textColor={subHeadingColor}
                        fontSize={fs9}
                        textAlign={'center'}
                        numberOfLines={2}
                        containerStyle={[MT(0.05)]}
                    />
                </View>
            ) : (
                title.length > 0 && (
                    <WrappedText
                        text={title}
                        numberOfLines={1}
                        containerStyle={[MT(0.1)]}
                        textStyle={[{ textAlign: 'center' }]}
                        textColor={'#1f1f1f'}
                    />
                )
            )}

            {/* <WrappedText
                text={subTitle}
                numberOfLines={2}
                textStyle={[MT(0.1), { textAlign: 'center' }]}
                textColor={'#646464'}
            /> */}
        </Ripple>
    );
};

export default ProductIdentifierView;
