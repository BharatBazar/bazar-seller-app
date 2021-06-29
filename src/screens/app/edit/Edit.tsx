import React from 'react';
import { useState } from 'react';
import { View, ScrollView, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import { NavigationProps } from '../../../common';
import StatusBar from '../../component/StatusBar';
import Header from './component/Header';
import Sections from './product/Sections';
import {
    border,
    createProduct,
    deleteProductFromServer,
    generalProductSchema,
    padHor,
    updateProduct,
} from './product/component/generalConfig';
import { AIC, FDR, FLEX, JCC, PH, PR, PV, WP } from '../../../common/styles';
import { IProduct, IRProduct } from '../../../server/apis/product/product.interface';
import SimpleToast from 'react-native-simple-toast';
import { APIgetProduct } from '../../../server/apis/product/product.api';
import { colorCode, mainColor } from '../../../common/color';
import WrappedText from '../../component/WrappedText';
import TextButton from '../../component/TextButton';
import { ToastHOC } from '../../hoc/ToastHOC';

export interface CreateProductProps extends NavigationProps {
    route: {
        params: {
            update: boolean;
            _id?: string;
            shopId: string;
            category: string;
            subCategory: string;
            subCategory1: string;
        };
    };
}

const CreateProduct: React.FC<CreateProductProps> = ({
    navigation,
    route: {
        params: { update, _id, shopId, category, subCategory, subCategory1 },
    },
}) => {
    const [productId, setProductId] = useState<string | undefined>(_id);
    const [productDetails, setProductDetails] = useState<IProduct>(generalProductSchema);
    const [loading, setLoading] = useState(true);
    //Here for every error 3 state arr possible 0 meanse neutral, 1 means start checking, 2 means passed, 3 means failed
    const [checkAllError, setCheckAllError] = useState<number>(0);

    const fetchProduct = async () => {
        const response: IRProduct = await APIgetProduct({ _id: productId, shopId: shopId });

        setLoading(false);
        if (response.status == 1) {
            setProductDetails(response.payload);
        }
    };

    const deleteProduct = async () => {
        Alert.alert('Warning', 'Do you really want to delete this product it will delete all progress?', [
            {
                text: 'Yes',
                onPress: async () => {
                    if (productId) {
                        const response: IRProduct = await deleteProductFromServer({ _id: productId });
                        if (response.status == 1) {
                            navigation.goBack();
                        }
                    } else {
                        navigation.goBack();
                    }
                },
            },
            {
                text: 'No',
            },
        ]);
    };

    React.useEffect(() => {
        if (update) {
            fetchProduct();
        } else {
            createProductInServer({});
        }
    }, []);

    React.useEffect(() => {
        if (checkAllError == 2) {
            ToastHOC.successAlert("All check's passed");
            setCheckAllError(0);
        } else if (checkAllError == 3) {
            ToastHOC.errorAlert("Please clear all error's");
            setCheckAllError(0);
        }
    }, [checkAllError]);

    const createProductInServer = async (data: Partial<IProduct>) => {
        const product = {
            ...data,
            productCategory: category,
            productSubCategory1: subCategory,
            productSubCategory2: subCategory1,
            shopId: shopId,
        };
        const response: IRProduct = await createProduct(product);

        setLoading(false);
        if (response.status == 1) {
            setProductId(response.payload._id);
            setProductDetails({ ...response.payload, ...productDetails });
        } else {
        }
    };

    const postProductDataToServer = async (data: IProduct, successCallBack: Function, errroCallBack: Function) => {
        try {
            if (productId) {
                //Call update product function
                const product = {
                    ...data,
                    _id: productId,
                };
                const response: IRProduct = await updateProduct(product);
                if (response.status == 1) {
                    successCallBack();
                    //setProductDetails(response.payload);
                    SimpleToast.show('Saved', SimpleToast.SHORT);
                } else {
                    errroCallBack(response.message);
                }
            } else {
                //Call create product function with some data
                createProduct(data);
            }
        } catch (error) {
            errroCallBack(error.message);
        }
    };

    if (loading) {
        return (
            <View style={[FLEX(1), JCC(), AIC()]}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar statusBarColor={mainColor} />
            <Header
                headerTitle={update ? 'Update Product' : 'Create Product'}
                onPressBack={navigation.goBack}
                onPressCorrect={() => {}}
                onPressDelete={() => {
                    deleteProduct();
                }}
            />
            <View style={[border, FDR(), padHor, PR(0.1), PV(0.1)]}>
                <WrappedText
                    text={'This product is under ' + category + ' ' + subCategory + ' ' + subCategory1 + ' category.'}
                    containerStyle={[FLEX(1)]}
                    textColor={colorCode.BLACKLOW(40)}
                />
                <TextButton
                    text={'Mark as complete'}
                    onPress={() => {
                        setCheckAllError(1);
                    }}
                    textProps={{ textColor: colorCode.WHITE }}
                    containerStyle={[AIC(), PH(0.5), WP(4)]}
                />
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {!loading && (
                    <Sections
                        filter={[
                            {
                                name: 'Category',
                                value: ['28', '30'],
                                filterType: 'DropDown',
                                unit: 'cm',
                                description: 'Select size in the filter',
                            },
                            {
                                name: 'Pattern',
                                value: ['28', '30'],
                                filterType: 'DropDown',
                                unit: 'cm',
                                description: 'Select size in the filter',
                            },
                        ]}
                        distribution={[
                            {
                                name: 'Size',
                                value: ['28', '30'],
                                filterType: 'DropDown',
                                unit: 'cm',
                                description: 'Select size in the filter',
                            },
                            {
                                name: 'Colors',
                                value: ['28', '30'],
                                filterType: 'DropDown',
                                unit: 'cm',
                                description: 'Select size in the filter',
                            },
                        ]}
                        checkAllError={checkAllError}
                        setCheckAllError={setCheckAllError}
                        productDetails={productDetails}
                        update={update}
                        postDataToServer={postProductDataToServer}
                        setProductId={setProductId}
                        productId={productId}
                        productTypeDetails={{ category, subCategory, subCategory1 }}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default CreateProduct;
