import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import WrappedSize from './component/WrappedSize';
import WrappedCheckBox from '../../../../../component/WrappedCheckBox';
import WrappedText from '../../../../../component/WrappedText';
import { AIC, BGCOLOR, commonStyles, FDR, HP, JCC, MH, MT, MV, W } from '../../../../../../common/styles';
import { getHP } from '../../../../../../common/dimension';
import WrappedFeatherIcon from '../../../../../component/WrappedFeatherIcon';
import { fs13, fs20, fs40 } from '../../../../../../common';
import { colorCode } from '../../../../../../common/color';
import ProductPrice from './component/ProductPriceQuantity';
import TableHeader from './component/TableHeader';
import ProductContainer from '../../component/productContainerHOC';
import PhotoUplaod from './component/PhotoUpload';
import { IProductColor, IProductSize, IRProductColor } from '../../../../../../server/apis/product/product.interface';
import {
    createProductColor,
    generalProductColorSchema,
    generalProductSizeSchema,
    updateProductColor,
} from '../../component/generalConfig';
import { Icolor } from '..';

export interface ProductDetailsProps {
    productColor: IProductColor;
    color: Icolor;
    productColorId: string;
    onDelete: Function;
    index: number;
    productId?: string;
    setProductId: (productId: string) => void;
    update?: boolean;
    size: string[];
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

const ProductDetails: React.SFC<ProductDetailsProps> = ({
    index,
    onDelete,
    productId,
    color,
    productColorId,
    update,
    setProductId,
    productColor,
    size,
}) => {
    const [selectedSize, setSelectedSize] = useState<IProductSize[]>(productColor.productSize);
    const [photo, productPhoto] = useState<[string] | []>(productColor.productPhotos);
    const [colorId, setcolorId] = useState<string>(productColorId);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {}, []);

    const postProductColorDataToServer = async (
        data: IProductColor,
        successCallBack: Function,
        errroCallBack: Function,
    ) => {
        try {
            if (colorId) {
                //Call update product function
                const productColor = {
                    ...data,
                    _id: colorId,
                };
                const response: IRProductColor = await updateProductColor(productColor);
                if (response.status == 1) {
                    successCallBack();
                    setProduct(response.payload);
                } else {
                    errroCallBack(response.message);
                }
            } else {
                //Call create product function with some data
                const color = {
                    ...data,
                };
                if (productId) {
                    color['parentId'] = productId;
                }
                const response: IRProductColor = await createProductColor(color);

                if (response.status == 1) {
                    successCallBack();
                    if (!productId) {
                        setProductId(response.payload.parentId);
                    }
                    setcolorId(response.payload._id);
                    setProduct(response.payload);
                } else {
                    errroCallBack(response.message);
                }
            }
        } catch (error) {
            errroCallBack(error.message);
            console.log(error.message);
        }
    };

    const selectSize = (size: string) => {
        let selectedSizes = [...selectedSize];
        selectedSizes.push({ ...generalProductSizeSchema, productSize: size });
        setSelectedSize(selectedSize);
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
                    {size.map((size: string, index: number) => (
                        <WrappedSize
                            size={size}
                            selected={selectedSize.findIndex((item) => item.productSize == size) > -1}
                            onPress={() => {
                                selectSize(size);
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

                {selectedSize.length != 0 && (
                    <>
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
                        <TableHeader headerTitle={headerTitle} flex={columnFlex} />

                        {selectedSize.map((size: IProductSize, index: number) => (
                            <View key={color.colorCode + index}>
                                <ProductPrice productSize={size} flex={columnFlex} onDelete={() => deleteSize(index)} />
                            </View>
                        ))}
                    </>
                )}
            </View>
        </ProductContainer>
    );
};

export default ProductDetails;
