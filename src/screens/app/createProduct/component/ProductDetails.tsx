import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ShadowWrapperHOC from '../../../hoc/ShadowWrapperHOC';
import { Icolor, Isize } from '../CreateProduct';
import WrappedSize from '../component/WrappedSize';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import { HeaderType1 } from '../../component';
import WrappedText from '../../../component/WrappedText';
import Color from './Color';
import { AIC, BGCOLOR, commonStyles, componentProps, FDR, MH, MT, MV, PH, PV } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs12, fs13, fs16, fs19, fs28 } from '../../../../common';
import { colorCode, mainColor } from '../../../../common/color';
import ProductPrice from './ProductPriceQuantity';
import TableHeader from './TableHeader';

export interface ProductDetailsProps {
    color: Icolor;
    size: Isize[];
    index: number;
}

const Heading = (headingText: string, color: string) => {
    return (
        <View style={[FDR(), AIC(), MT(0.2)]}>
            <View style={[BGCOLOR(color), { height: getHP(0.1), width: getHP(0.1) }]} />
            <WrappedText
                text={headingText}
                fontSize={fs13}
                containerStyle={[MV(0.1), MH(0.1)]}
                textColor={colorCode.BLACKLOW(50)}
            />
        </View>
    );
};

export interface headerTitleI {
    title: string;
}

const headerTitle: headerTitleI[] = [
    {
        title: 'Size',
    },
    {
        title: 'Quantity',
    },
    {
        title: 'MRP',
    },
    {
        title: 'SP',
    },
];

const columnFlex = [2, 4, 2, 2];

const ProductDetails: React.SFC<ProductDetailsProps> = ({ color, size, index }) => {
    const [product, setProduct] = useState({ color, size });

    const selectSize = (index: number) => {
        let updatedSize = [...product.size];
        let selected = updatedSize[index].selected;
        updatedSize[index].selected = !selected;
        setProduct({ ...product, size: updatedSize });
    };

    const setColor = (index) => {};

    const generateSize = () => {};

    return (
        <ShadowWrapperHOC containerStyle={[MV(0.2)]}>
            <View>
                <Color item={color} onPress={() => {}} colorStyle={{}} />

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
                        <WrappedSize
                            size={size}
                            onPress={() => {
                                selectSize(index);
                            }}
                        />
                    ))}
                </View>
                {Heading(
                    'Provide quantity, MRP(Maximum Retail Price), SP(Selling Price) for each size.',
                    color.colorCode,
                )}
                {<TableHeader headerTitle={headerTitle} flex={columnFlex} />}
                {size
                    .filter((size) => size.selected)
                    .map((size) => (
                        <View>
                            <ProductPrice size={size.value} flex={columnFlex} />
                        </View>
                    ))}
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
