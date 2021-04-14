import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShadowWrapperHOC from '../../../hoc/ShadowWrapperHOC';
import { Icolor, Isize } from '../CreateProduct';
import WrappedSize from '../component/WrappedSize';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import { HeaderType1 } from '../../component';
import WrappedText from '../../../component/WrappedText';
import Color from './Color';
import { BGCOLOR, commonStyles, componentProps, MH, MT, MV, PH, PV } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs13, fs19, fs28 } from '../../../../common';
import { colorCode, mainColor } from '../../../../common/color';

export interface ProductDetailsProps {
    color: Icolor;
    size: Isize[];
    index: number;
}

const Heading = (headingText: string, color: string) => {
    return (
        <View style={[commonStyles.fdr, commonStyles.aic]}>
            <View style={[BGCOLOR(color), { height: getHP(0.1), width: getHP(0.1) }]} />
            <WrappedText
                text={headingText}
                fontSize={fs19}
                containerStyle={[MV(0.1), MH(0.1)]}
                textColor={colorCode.BLACKLOW(50)}
            />
        </View>
    );
};

const ProductDetails: React.SFC<ProductDetailsProps> = ({ color, size, index }) => {
    const [product, setProduct] = useState({ color, size });
    return (
        <ShadowWrapperHOC containerStyle={[MV(0.2)]}>
            <View>
                <Color item={color} onPress={() => {}} />

                <View>
                    {Heading('Upload product image', color.colorCode)}
                    <View style={[styles.photoContainer, MT(0.1)]}>
                        <WrappedFeatherIcon
                            iconName={'camera'}
                            iconSize={fs28}
                            iconColor={mainColor}
                            onPress={() => {}}
                        />
                        <WrappedText
                            text={'Add Photos'}
                            textColor={'#707070'}
                            textStyle={{
                                color: '#707070',
                                fontSize: fs13,
                            }}
                        />
                    </View>
                </View>
                {Heading('Provide size for product', color.colorCode)}
                <View style={[commonStyles.fdr, MV(0.1)]}>
                    {size.map((size, index) => (
                        <WrappedSize size={size} onPress={() => {}} />
                    ))}
                </View>
                {index == 0 && (
                    <WrappedCheckBox
                        placeholder={'Auto fill for other color and update manually.'}
                        value={true}
                        setValue={() => {}}
                    />
                )}
            </View>
        </ShadowWrapperHOC>
    );
};
const styles = StyleSheet.create({
    photoContainer: {
        // height: getWP(2.4),
        // width: getWP(2.4),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: getHP(0.1),
        borderStyle: 'dashed',
        alignSelf: 'flex-start',
        borderWidth: 2,
        paddingHorizontal: '2%',
        paddingVertical: '4%',
        backgroundColor: null,
    },
    colorStyle: {
        height: getHP(0.2),
        width: getHP(0.2),
    },
});
export default ProductDetails;
