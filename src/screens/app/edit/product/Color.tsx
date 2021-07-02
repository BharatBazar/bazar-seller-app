import React, { useState } from 'react';
import { View, ScrollView, Alert, AlertButton } from 'react-native';
import WrappedSize from './component/component/WrappedSize';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import WrappedText from '../../../component/WrappedText';
import { AIC, BGCOLOR, FDR, FLEX, HP, JCC, MH, ML, MT, MV, W, provideShadow } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs10, fs13, fs20, fs40 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import Size from './Size';
import TableHeader from './component/component/TableHeader';
import ProductContainer from './component/productContainerHOC';
import PhotoUpload from './component/component/PhotoUpload';
import {
    IClassifier,
    IColorApp,
    IProductColor,
    IProductSize,
    IRProductColor,
    ISizeApp,
} from '../../../../server/apis/product/product.interface';
import {
    createProductColor,
    deleteProductColor,
    generalProductSizeSchema,
    IPostDataToServer,
    updateProductColor,
} from './component/generalConfig';
import { ToastHOC } from '../../../hoc/ToastHOC';
import { possibleValue } from './Colors';

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
    productColor: IColorApp;
    color: IColorApp;
    productColorId: string;
    onDelete: Function;
    index: number;
    productId?: string;
    setProductId: (productId: string) => void;
    update?: boolean;
    size: IClassifier[];
    postDataToServer: IPostDataToServer;
    productTypeDetails: {
        category: string;
        subCategory1: string;
        subCategory: string;
    };
    defaultSize: IProductSize[];
    setDeafultSize?: (size: Partial<IProductSize>) => void;
    errorValue: number;
    setError: (value: number) => void;
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

interface Error {
    generalError?: string;
}

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
    errorValue,
    setError,
}) => {
    const getProductSize = () => {
        let data: { [key: string]: ISizeApp } = {};
        productColor.sizes.forEach((size) => {
            data[size.size._id] = { ...size, name: size.size.name, description: size.size.description };
        });
        return data;
    };

    const [sizes, setSizes] = useState<IClassifier[]>(size); //All available size
    const [selectedSize, setSelectedSize] = useState<{ [key: string]: ISizeApp }>(getProductSize()); //Selected size

    const [colorId, setcolorId] = useState<string>(productColorId);
    const [autoFillDefaultSize, setAutoFillDefaultSize] = useState(false);
    const [neww, setProductNew] = useState(false);
    const [error, setErrors] = useState<Error>({});
    const [childError, setChildError] = React.useState<possibleValue[]>([]);

    React.useEffect(() => {
        // const error = productColor.productSize.map((item) => 0);
        // setChildError(error);
        // return () => {};
    }, []);

    // Error related function //

    const checkError = () => {
        let error: Error = {};
        if (selectedSize.length == 0) {
            error['generalError'] = 'Please add atleast one size.';
        }

        setErrors(error);
        if (Object.keys(error).length == 0) {
            return false;
        } else {
            return true;
        }
    };

    function pushErrorKey() {
        let error = [...childError];
        error.push(0);
        setChildError(error);
    }

    function removeErrorKey(index: number) {
        let error = [...childError];
        error.splice(index, 1);
        setChildError(error);
    }

    function changeErrorValueAtIndex(index: number, value: possibleValue) {
        let error = [...childError];
        error[index] = value;
        setChildError(error);
    }

    function setAllErrorToParticularValue(value: possibleValue) {
        var error = [...childError];
        childError.splice(0);
        error = error.map((item) => value);
        setChildError(error);
    }

    React.useEffect(() => {
        if (errorValue == 1) {
            console.log('check error called in color');
            const isError = checkError();
            if (isError) {
                setError(3);
            } else {
                setAllErrorToParticularValue(1);
            }
        }
    }, [errorValue]);

    React.useEffect(() => {
        if (errorValue == 1 && childError.length > 0) {
            if (childError.every((item) => item == 2)) {
                //All checks passed
                console.log('All checks passed!');
                setAllErrorToParticularValue(0);
                setError(2);
            } else if (childError.every((item) => item == 3 || item == 2)) {
                //Not All check passed
                console.log(childError, 'Not all checks passed!');
                setAllErrorToParticularValue(0);
                setError(3);
            }
        }
    }, [childError]);

    React.useEffect(() => {
        if (errorValue == 1) {
            if (index % 2 == 0) {
                setError(3);
            } else {
                setError(2);
            }
        }
    }, [errorValue]);

    // Close //

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
                { color: productColor._id },
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
            { colors: data },
            () => {
                setcolorId(parentId);
            },
            (error) => {
                Alert.alert(error);
            },
        );
    };

    const selectSize = (size: IClassifier) => {
        let selectedSizes: { [key: string]: ISizeApp } = { ...selectedSize };
        selectedSizes[size._id] = { ...generalProductSizeSchema, name: size.name, description: size.description };
        //selectedSizes = selectedSizes.sort((a, b) => (+a.name < +b.name ? 1 : 0));
        pushErrorKey();
        setSelectedSize(selectedSizes);
    };

    const deleteSize = (data: ISizeApp) => {
        let selectedSizes = { ...selectedSize };
        delete selectedSizes[data._id];
        removeErrorKey(index);
        setSelectedSize(selectedSizes);
    };

    //Default size is to set size for all the other colors it will be always equal to size at index 0
    const setDefaultSize = () => {
        //selectedSize.slice(0);
        let selectedSizes = [...defaultSize];

        let newSize = selectedSizes.map((size) => {
            return { ...size, parentId: '', _id: '' };
        });

        setSelectedSize(newSize);
    };

    //If size at color index 0 changes chage size
    const addSizeInDefaultSize = (size: IProductSize) => {
        const Size = [...defaultSize];
        Size.push(size);
        setDeafultSize(Size);
    };

    const sizeProps = index == 0 ? { setDefaultSize: addSizeInDefaultSize } : {};
    console.log('generalError', error);
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
                        containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                    />
                </View>
                <View style={[FDR(), AIC(), FLEX(1)]}>
                    <View
                        style={[
                            { height: getHP(0.4), width: getHP(0.4), alignSelf: 'center' },
                            BGCOLOR(color.description),
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
                {Heading('Upload product image', color.description)}
                <PhotoUpload />
                {Heading('Provide size for product', color.description)}
                {error['generalError'] ? (
                    <WrappedText text={error['generalError']} fontSize={fs10} textColor={colorCode.RED} />
                ) : (
                    <View />
                )}
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
                    {sizes.map((size: IClassifier, index: number) => (
                        <WrappedSize
                            key={size.name}
                            size={size.name}
                            selected={selectedSize[size._id] ? true : false}
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

                {Object.values(selectedSize).length != 0 && (
                    <>
                        {Heading(
                            'Provide quantity, MRP(Maximum Retail Price), SP(Selling Price) for each size.',
                            color.description,
                        )}
                        {index == 0 && (
                            <WrappedCheckBox
                                placeholder={'Auto fill MRP, SP for each size and update manually.'}
                                value={true}
                                setValue={() => {}}
                            />
                        )}
                        <TableHeader headerTitle={headerTitle} flex={columnFlex} />

                        {Object.values(selectedSize).map((size: ISizeApp, sizeIndex: number) => (
                            <View key={size.name + colorId}>
                                <Size
                                    {...sizeProps}
                                    productSize={size}
                                    parentId={colorId}
                                    postDataToServer={postProductColorDataToServer}
                                    flex={columnFlex}
                                    onDelete={() => deleteSize(size)}
                                    setParentId={setParentId}
                                    neww={neww}
                                    setNew={setProductNew}
                                    errorValue={childError[index]}
                                    setError={(value: possibleValue) => {
                                        setTimeout(() => {
                                            changeErrorValueAtIndex(index, value);
                                        }, 10 + index * 10);
                                    }}
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
