import React, { useState } from 'react';
import { View, ScrollView, Alert, AlertButton } from 'react-native';
import WrappedSize from './component/component/WrappedSize';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import WrappedText from '../../../component/WrappedText';
import { AIC, BGCOLOR, FDR, FLEX, HP, JCC, MH, ML, MT, MV, W, provideShadow } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs10, fs13, fs20, fs40 } from '../../../../common';
import { colorCode, errorColor } from '../../../../common/color';
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
    productStatus,
} from '../../../../server/apis/product/product.interface';
import {
    createProductColor,
    deleteProductColor,
    ErrorState,
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
    //Provides detail about the product color at particular index
    productColor: IColorApp & { size: IClassifier };

    shopId: string;
    color: IColorApp;

    // Color id is basically id of color in the backend collection
    productColorId: string;

    // on Delete function is to delete the color from upper component that is involved
    // in its existence
    onDelete: Function;
    // Index at which the color is in array
    index: number;

    // product id is main product id so that color cann be added to location
    productId?: string;

    // If new color created and the product is not created produt id need to be set
    setProductId: (productId: string) => void;

    // If product is created or not
    update?: boolean;
    // It provides detail about all the avaialable size
    size: IClassifier[];

    //posting data to main schema
    postDataToServer: IPostDataToServer;

    productTypeDetails: {
        category: string;
        subCategory1: string;
        subCategory: string;
    };

    //size details of first size component
    defaultSize: ISizeApp[];
    // To set default size
    setDeafultSize?: (size: ISizeApp[]) => void;

    errorValue: number;
    setError: (value: number) => void;

    status: productStatus;
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

const tableFlex = [1.3, 1, 2.5, 2.5, 2.5];
const columnFlex = [0.5, 1, 3, 2.7, 2.7];

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
    shopId,
    status,
}) => {
    const pushErrorKey = () => {
        let error = [...childError];
        error.push(0);
        childError.splice(0);
        setChildError(error);
    };

    //parse size array to object in order to satisfy fast access

    // so this is very important that _id that is key will be id of the classifier
    // while _id in object will be id of the color in color table or product color table..
    const getProductSize = () => {
        let data: { [key: string]: ISizeApp } = {};
        productColor.sizes.forEach((size, index) => {
            data[size.size._id] = {
                ...size,
                name: size.size.name,
                description: size.size.description,
                sizeId: size.size._id,
            };
        });
        return data;
    };

    React.useEffect(() => {
        let error = productColor.sizes.map((item) => ErrorState.NEUTRAL);
        setChildError(error);
        if (productColor.sizes.length > 0) {
            const size = productColor.sizes[0];
            setFirstSize({ mrp: size.mrp, sp: size.sp, quantity: size.quantity });
        }
    }, [productColor.sizes]);

    const [sizes, setSizes] = useState<IClassifier[]>(size); //All available size
    const [selectedSize, setSelectedSize] = useState<{ [key: string]: ISizeApp }>(getProductSize()); //Selected size

    const [colorId, setcolorId] = useState<string>(productColorId);
    const [autoFillDefaultSize, setAutoFillDefaultSize] = useState(false);
    const [neww, setProductNew] = useState(false);
    const [error, setErrors] = useState<Error>({});
    const [childError, setChildError] = React.useState<ErrorState[]>([]);
    const [photoError, setPhotoError] = React.useState<ErrorState>(ErrorState.NEUTRAL);
    const [firstSize, setFirstSize] = React.useState<Partial<ISizeApp>>({});

    // Error flow related function explained in file Colors.tsx. Same flow is used //

    //Error checking trigger
    React.useEffect(() => {
        if (errorValue == ErrorState.STARTCHECKING) {
            const isError = checkError();
            const photoError = setPhotoError(ErrorState.STARTCHECKING);

            if (isError) {
                setError(ErrorState.FAILED);
            } else {
                console.log('error');

                setAllErrorToParticularValue(ErrorState.STARTCHECKING);
            }
        }
    }, [errorValue]);

    const checkError = () => {
        let error: Error = {};
        if (Object.keys(selectedSize).length == 0) {
            error['generalError'] = 'Please add atleast one size.';
        }

        setErrors(error);
        if (Object.keys(error).length == 0) {
            return false;
        } else {
            return true;
        }
    };

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
        console.log('color error trigger', index, childError, errorValue, photoError);
        if (errorValue == 1 && childError.length == 0 && photoError > 1) {
            if (photoError == 2) {
                setPhotoError(ErrorState.NEUTRAL);
                setError(ErrorState.PASSED);
            } else {
                setPhotoError(ErrorState.NEUTRAL);
                setError(ErrorState.FAILED);
            }
        }
        if (errorValue == 1 && childError.length > 0) {
            if (childError.every((item) => item == ErrorState.PASSED) && photoError == ErrorState.PASSED) {
                //All checks passed
                setAllErrorToParticularValue(ErrorState.NEUTRAL);
                setPhotoError(ErrorState.NEUTRAL);
                setError(ErrorState.PASSED);

                //This condition that every element should be from either passed or failed is because
                //It confirms that all the error function are executed
                //and we can pass error state now to higher function
            } else if (
                childError.every((item) => item == ErrorState.FAILED || item == ErrorState.PASSED) &&
                (photoError == ErrorState.PASSED || photoError == ErrorState.FAILED)
            ) {
                //Not All check passed
                setAllErrorToParticularValue(ErrorState.NEUTRAL);
                setPhotoError(ErrorState.NEUTRAL);
                setError(ErrorState.FAILED);
            }
        }
    }, [childError, photoError]);

    // Close //

    // If user want to delete color directly from server
    const deleteColorFromServer = async () => {
        Alert.alert('Warning', 'Do you really want to delete color it will delete all your progress?', [
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
            { text: 'No' },
        ]);
    };

    // If product is new creates is document in the backend
    // and connecting things for query purpose
    React.useEffect(() => {
        if (productColor.new) {
            postProductColorDataToServer(
                { color: productColor.colorId },
                () => {},
                () => {},
            );
            setProductNew(true);
        }
    }, []);

    // For updating product color data like photos, sizes etc..
    const postProductColorDataToServer = async (
        data: Partial<IProductColor>,
        successCallBack: Function,
        errroCallBack: Function,
    ) => {
        try {
            // If color id is there means product can be directly updated
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

                //create product and provide parentId for relations and connectivity
                if (productId) {
                    color['parentId'] = productId;
                }

                const response: IRProductColor = await createProductColor(color);

                if (response.status == 1) {
                    // Setting product id for all other sizes and colors or data update
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

    // Doubt
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
        selectedSizes[size._id] = {
            ...generalProductSizeSchema,
            name: size.name,
            description: size.description,
            sizeId: size._id,
        };
        pushErrorKey();
        setSelectedSize(selectedSizes);
    };

    const deleteSize = (_id: string) => {
        let selectedSizes = { ...selectedSize };
        delete selectedSizes[_id];
        removeErrorKey(index);
        setSelectedSize(selectedSizes);
    };

    //Default size is to set size for all the other colors it will be always equal to size at index 0
    const setDefaultSize = () => {
        //selectedSize.slice(0);
        let selectedSizes = { ...selectedSize };
        let error: ErrorState[] = [];
        defaultSize.forEach((size, index) => {
            if (!selectedSizes[size.sizeId]) {
                error.push(ErrorState.NEUTRAL);
                selectedSizes[size.sizeId] = { ...size, _id: '' };
            }
            if (index == defaultSize.length - 1) {
                setChildError(error);
                setSelectedSize(selectedSizes);
            }
        });
    };

    //If size at color index 0 changes chage size
    const addSizeInDefaultSize = (size: ISizeApp) => {
        const Size = [...defaultSize];
        Size.push(size);
        if (setDeafultSize) {
            setDeafultSize(Size);
        }
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
                <PhotoUpload photoError={photoError} setPhotoError={setPhotoError} />
                {Heading('Provide size for product', color.description)}
                {error['generalError'] ? <WrappedText text={error['generalError']} textColor={errorColor} /> : <View />}
                {((neww && index != 0) || Object.values(selectedSize).length == 0) && (
                    <WrappedCheckBox
                        placeholder={
                            'On checking this box all the sizes of the first choosen color will be automatically filled.'
                        }
                        containerStyle={[MV(0.1)]}
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
                <ScrollView horizontal={true} contentContainerStyle={[MV(0.1)]}>
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

                        <TableHeader headerTitle={headerTitle} flex={tableFlex} />

                        {Object.values(selectedSize).map((size: ISizeApp, sizeIndex: number) => (
                            <View key={size.name + colorId}>
                                <Size
                                    {...sizeProps}
                                    index={sizeIndex}
                                    firstSize={firstSize}
                                    setFirstSize={sizeIndex == 0 ? setFirstSize : () => {}}
                                    productSize={size}
                                    parentId={colorId}
                                    postDataToServer={postProductColorDataToServer}
                                    flex={columnFlex}
                                    onDelete={() => deleteSize(size.sizeId)}
                                    setParentId={setParentId}
                                    neww={neww}
                                    shopId={shopId}
                                    setNew={setProductNew}
                                    errorValue={childError[sizeIndex]}
                                    setError={(value: possibleValue) => {
                                        console.log(sizeIndex, value, childError);
                                        setTimeout(() => {
                                            changeErrorValueAtIndex(sizeIndex, value);
                                        }, 5 + sizeIndex * 5);
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
