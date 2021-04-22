import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Icolor, Isize } from '../CreateProduct';
import WrappedSize from './component/WrappedSize';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import WrappedText from '../../../component/WrappedText';
import { AIC, BGCOLOR, commonStyles, FDR, HP, JCC, MH, MT, MV, W } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs13, fs20, fs40 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import ProductPrice from './component/ProductPriceQuantity';
import TableHeader from './component/TableHeader';
import ProductContainer from '../product/component/productContainerHOC';
import PhotoUplaod from './component/PhotoUpload';

export interface ProductDetailsProps {
    color: Icolor;
    size: Isize;
    onDelete: Function;
    index: number;
}

export const Heading = (headingText: string, color: string) => {
    return (
        <View style={[FDR(), AIC(), MT(0.2)]}>
            <View style={[BGCOLOR(color), HP(0.1), W(getHP(0.1))]} />
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
        title: 'Delete',
    },
    {
        title: 'Size',
    },
    {
        title: 'Quantity',
    },
    {
        title: 'MRP in (Rs)',
    },
    {
        title: 'SP in (Rs)',
    },
];

const columnFlex = [1.5, 1.5, 3, 2.5, 2.5];

const ProductDetails: React.SFC<ProductDetailsProps> = ({ color, size, index, onDelete }) => {
    const [product, setProduct] = useState({ color, size });
    const [selectedSize, setSelectedSize] = useState<Isize>([]);

    const selectSize = (index: number) => {
        let selectedSizes = [...selectedSize];
        selectedSizes.push(product.size[index]);
        setSelectedSize(selectedSizes);
    };

    const deleteSize = (index: number) => {
        let selectedSizes = [...selectedSize];
        selectedSizes.splice(index, 1);
        setSelectedSize(selectedSizes);
    };

    return (
        <ProductContainer>
            <View>
                <View style={[FDR(), JCC('space-between')]}>
                    <WrappedText text={'Provide details for '} />
                    <WrappedFeatherIcon
                        iconSize={fs20}
                        iconName={'x'}
                        containerHeight={fs40}
                        onPress={() => {
                            onDelete();
                        }}
                        containerStyle={[commonStyles.shadowLight, BGCOLOR(colorCode.WHITE)]}
                    />
                </View>
                <View style={[FDR(), AIC()]}>
                    <View
                        style={[
                            { height: getHP(0.4), width: getHP(0.4), alignSelf: 'center' },
                            BGCOLOR(color.colorCode),
                        ]}
                    />
                    <WrappedText
                        text={'   ' + color.name.toUpperCase() + ' COLOR' + ' Shoes'}
                        //textColor={color.colorCode}
                        fontSize={fs20}
                    />
                </View>
                {Heading('Upload product image', color.colorCode)}
                <PhotoUplaod />
                {Heading('Provide size for product', color.colorCode)}
                <ScrollView horizontal={true} contentContainerStyle={[MV(0.2)]}>
                    {size.map((size: number, index: number) => (
                        <WrappedSize
                            size={size}
                            selected={selectedSize.indexOf(size) > -1}
                            onPress={() => {
                                selectSize(index);
                            }}
                        />
                    ))}
                </ScrollView>
                {index == 0 && (
                    <WrappedCheckBox
                        placeholder={'Auto fill for other color and update manually.'}
                        value={true}
                        setValue={() => {}}
                    />
                )}
                {Heading(
                    'Provide quantity, MRP(Maximum Retail Price), SP(Selling Price) for each size.',
                    color.colorCode,
                )}
                {index == 0 && (
                    <WrappedCheckBox
                        placeholder={'Auto fill MRP, SP for each size and update manually.'}
                        value={true}
                        setValue={() => {}}
                    />
                )}
                {<TableHeader headerTitle={headerTitle} flex={columnFlex} />}
                {selectedSize.map((size: number, index: number) => (
                    <View key={color + index}>
                        <ProductPrice size={size} flex={columnFlex} onDelete={() => deleteSize(index)} />
                    </View>
                ))}
            </View>
        </ProductContainer>
    );
};

export default ProductDetails;
