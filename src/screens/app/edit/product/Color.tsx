import React, { useState } from 'react';
import { View, ScrollView, Alert, AlertButton } from 'react-native';
import WrappedSize from './component/component/WrappedSize';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import WrappedText from '../../../component/WrappedText';
import { AIC, BGCOLOR, commonStyles, FDR, FLEX, HP, JCC, MH, ML, MT, MV, W } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs13, fs20, fs40 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import Size from './component/component/Size';
import TableHeader from './component/component/TableHeader';
import ProductContainer from './component/productContainerHOC';
import PhotoUplaod from './component/component/PhotoUpload';
import { IProductColor, IProductSize, IRProductColor } from '../../../../server/apis/product/product.interface';
import {
    createProductColor,
    deleteProductColor,
    generalProductSizeSchema,
    IPostDataToServer,
    updateProductColor,
} from './component/generalConfig';
import { Icolor } from './Colors';
import Loader from '../../../component/Loader';
import { ToastHOC } from '../../../hoc/ToastHOC';

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

export interface ProductDetailsProps {
    productColor: IProductColor;
    color: { name: string; colorCode: string };
    productColorId: string;
    onDelete: Function;
    index: number;
    productId?: string;
    setProductId: (productId: string) => void;
    update?: boolean;
    size: string[];
    postDataToServer: IPostDataToServer;
    productTypeDetails: {
        category: string;
        subCategory1: string;
        subCategory: string;
    };
    defaultSize: IProductSize[];
    setDeafultSize?: (size: Partial<IProductSize>) => void;
}
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

const ProductDetails: React.FC<ProductDetailsProps> = ({
    index,
    onDelete,
    productId,
    color,
    productColorId,
    update,
    setProductId,
    productColor,
    postDataToServer,
    productTypeDetails: { category, subCategory1, subCategory },
    size,
    defaultSize,
    setDeafultSize,
}) => {
    const [selectedSize, setSelectedSize] = useState<Partial<IProductSize>[]>(productColor.productSize.sort());
    const [photo, productPhoto] = useState<[string] | []>(productColor.productPhotos);
    const [colorId, setcolorId] = useState<string>(productColorId);
    const [loading, setLoading] = useState(true);
    const [autoFillDefaultSize, setAutoFillDefaultSize] = useState(false);
    const [neww, setProductNew] = useState(false);

    React.useEffect(() => {}, [colorId]);

    const deleteColorFromServer = async () => {
        Alert.alert('Warning', 'Do you really want to delete color it will delete all your progress?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Yes',
                onPress: async () => {
                    if (colorId.length > 0 && productId) {
                        const response: IRProductColor = await deleteProductColor({
                            _id: colorId,
                            parentId: productId,
                        });
                        if (response.status == 1) {
                            onDelete();
                        } else {
                        }
                    } else {
                        onDelete();
                    }
                },
                style: 'default',
            },
        ]);
    };

    React.useEffect(() => {
        if (productColor.new) {
            postProductColorDataToServer(
                { productColorName: color.name, productColorCode: color.colorCode },
                () => {},
                () => {},
            );
            setProductNew(true);
        }
    }, []);

    const postProductColorDataToServer = async (
        data: Partial<IProductColor>,
        successCallBack: Function,
        errroCallBack: Function,
    ) => {
        try {
            if (colorId.length != 0) {
                //Call update product function
                const productColor = {
                    ...data,
                    _id: colorId,
                };
                const response: IRProductColor = await updateProductColor(productColor);
                if (response.status == 1) {
                    successCallBack();
                    // setProduct(response.payload);
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
                    if (!productId) {
                        setProductId(response.payload.parentId);
                    }
                    setcolorId(response.payload._id);
                    successCallBack();
                    // setProduct(response.payload);
                } else {
                    errroCallBack(response.message);
                }
            }
        } catch (error) {
            errroCallBack(error.message);
        }
    };

    const setParentId = (parentId: string) => {
        let data: string[] = [];
        data.push(parentId);
        postDataToServer(
            { productColor: data },
            () => {
                setcolorId(parentId);
            },
            (error) => {
                Alert.alert(error);
            },
        );
    };

    const selectSize = (size: string) => {
        let selectedSizes = [...selectedSize];
        selectedSizes.push({ ...generalProductSizeSchema, productSize: size });

        setSelectedSize(selectedSizes);
    };

    const deleteSize = (index: number) => {
        let selectedSizes = [...selectedSize];
        selectedSizes.splice(index, 1);
        setSelectedSize(selectedSizes);
    };

    const setDefaultSize = () => {
        //selectedSize.slice(0);
        let selectedSizes = [...defaultSize];

        let newSize = selectedSizes.map((size) => {
            return { ...size, parentId: '', _id: '' };
        });

        setSelectedSize(newSize);
    };

    const addSizeInDefaultSize = (size: Partial<IProductSize>) => {
        const Size = [...defaultSize];
        Size.push(size);
        setDeafultSize(Size);
    };

    const sizeProps = index == 0 ? { setDefaultSize: addSizeInDefaultSize } : {};

    return (
        <ProductContainer>
            <View style={[FLEX(1)]}>
                <View style={[FDR(), JCC('space-between')]}>
                    <WrappedText text={'Provide details for '} />
                    <WrappedFeatherIcon
                        iconSize={fs20}
                        iconName={update ? 'trash-2' : 'x'}
                        containerHeight={fs40}
                        onPress={() => {
                            deleteColorFromServer();
                        }}
                        containerStyle={[commonStyles.shadowLight, BGCOLOR(colorCode.WHITE)]}
                    />
                </View>
                <View style={[FDR(), AIC(), FLEX(1)]}>
                    <View
                        style={[
                            { height: getHP(0.4), width: getHP(0.4), alignSelf: 'center' },
                            BGCOLOR(color.colorCode),
                        ]}
                    />
                    <WrappedText
                        text={
                            color.name.toUpperCase() +
                            ' COLOR ' +
                            (subCategory1.length > 0 ? subCategory1 : subCategory.length > 0 ? subCategory : category)
                        }
                        containerStyle={[FLEX(1), ML(0.2)]}
                        //textColor={color.colorCode}
                        fontSize={fs20}
                    />
                </View>
                {Heading('Upload product image', color.colorCode)}
                <PhotoUplaod />
                {Heading('Provide size for product', color.colorCode)}
                {neww && index != 0 && (
                    <WrappedCheckBox
                        placeholder={'Auto fill size as first size added and update manually.'}
                        value={autoFillDefaultSize}
                        setValue={(value) => {
                            if (value) {
                                setDefaultSize();
                            } else {
                                ToastHOC.infoAlert(
                                    'If you select the option again then whole size data for this color will be replaced by the first color size data.',
                                );
                            }
                        }}
                    />
                )}
                <ScrollView horizontal={true} contentContainerStyle={[MV(0.2)]}>
                    {size.map((size: string, index: number) => (
                        <WrappedSize
                            key={size}
                            size={size}
                            selected={selectedSize.findIndex((item) => item.productSize == size) > -1}
                            onPress={() => {
                                selectSize(size);
                            }}
                        />
                    ))}
                </ScrollView>
                {/* {index == 0 && (
                    <WrappedCheckBox
                        placeholder={'Auto fill for other color and update manually.'}
                        value={true}
                        setValue={() => {}}
                    />
                )} */}

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

                        {selectedSize.map((size: IProductSize, sizeIndex: number) => (
                            <View key={size.productSize.toString() + colorId}>
                                <Size
                                    {...sizeProps}
                                    productSize={size}
                                    parentId={colorId}
                                    postDataToServer={postProductColorDataToServer}
                                    flex={columnFlex}
                                    onDelete={() => deleteSize(sizeIndex)}
                                    setParentId={setParentId}
                                    neww={neww}
                                    setNew={setProductNew}
                                />
                            </View>
                        ))}
                    </>
                )}
            </View>
        </ProductContainer>
    );
};

export default ProductDetails;
