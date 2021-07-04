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
import Loader from '../../component/Loader';

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
    const [productDetails, setProductDetails] = useState<Partial<IProduct>>(generalProductSchema);
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
        const product: Partial<IProduct> = {
            ...data,

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
                                _id: '60d850d81758203b086a7eec',
                                name: 'Jeans Popuplar Brand in bazar',
                                description: 'Company which created this beautiful jeans.',
                                type: 'brand',
                                distributionLevel: 0,
                                createdAt: '2021-06-27T10:20:08.703Z',
                                updatedAt: '2021-06-29T16:37:54.446Z',
                                __v: 0,
                                multiple: false,
                                values: [
                                    {
                                        _id: '60d8503b1758203b086a7ee7',
                                        name: 'Adidas',
                                        description: 'Quite popular brand.',
                                        type: 'brand',
                                        createdAt: '2021-06-27T10:17:31.842Z',
                                        updatedAt: '2021-06-27T10:17:31.842Z',
                                        __v: 0,
                                    },
                                    {
                                        _id: '60d850421758203b086a7ee8',
                                        name: 'Nike',
                                        description: 'Quite popular brand.',
                                        type: 'brand',
                                        createdAt: '2021-06-27T10:17:38.110Z',
                                        updatedAt: '2021-06-27T10:17:38.110Z',
                                        __v: 0,
                                    },
                                ],
                            },
                            {
                                _id: '60d851191758203b086a7eed',
                                name: 'Jeans Fiting',
                                description: 'How jeans fit like its if too close then it is skinny.',
                                type: 'fit',
                                distributionLevel: 0,
                                createdAt: '2021-06-27T10:21:13.463Z',
                                updatedAt: '2021-06-29T16:38:10.331Z',
                                __v: 0,
                                multiple: false,
                                values: [
                                    {
                                        _id: '60d850591758203b086a7ee9',
                                        name: 'Regular',
                                        description: 'Regular fit.',
                                        type: 'fit',
                                        createdAt: '2021-06-27T10:18:01.921Z',
                                        updatedAt: '2021-06-27T10:18:01.921Z',
                                        __v: 0,
                                    },
                                    {
                                        _id: '60d850701758203b086a7eea',
                                        name: 'Slim',
                                        description: 'Slim fit.',
                                        type: 'fit',
                                        createdAt: '2021-06-27T10:18:24.348Z',
                                        updatedAt: '2021-06-27T10:18:24.348Z',
                                        __v: 0,
                                    },
                                ],
                            },
                            {
                                _id: '60db4d262d3ca5144d57ac96',
                                multiple: true,
                                name: 'Jeans Patterns',
                                description: 'Different pattern for jeans.',
                                type: 'pattern',
                                distributionLevel: 0,
                                createdAt: '2021-06-29T16:41:10.868Z',
                                updatedAt: '2021-06-29T16:41:10.868Z',
                                __v: 0,
                                values: [
                                    {
                                        _id: '60d84ff11758203b086a7ee5',
                                        name: 'Damaged',
                                        description: 'Jeans which are torn or look kike torn belong ot this pattern.',
                                        type: 'pattern',
                                        createdAt: '2021-06-27T10:16:17.730Z',
                                        updatedAt: '2021-06-27T10:16:17.730Z',
                                        __v: 0,
                                    },
                                    {
                                        _id: '60d8501a1758203b086a7ee6',
                                        name: 'Lassan',
                                        description: 'Jeans which are torn or look kike torn belong ot this pattern.',
                                        type: 'pattern',
                                        createdAt: '2021-06-27T10:16:58.586Z',
                                        updatedAt: '2021-06-27T10:16:58.586Z',
                                        __v: 0,
                                    },
                                ],
                            },
                        ]}
                        distribution={[
                            {
                                _id: '60d850921758203b086a7eeb',
                                name: 'Jeans Color shade',
                                description: 'Main color in jeans.',
                                type: 'color',
                                distributionLevel: 1,
                                createdAt: '2021-06-27T10:18:58.074Z',
                                updatedAt: '2021-06-29T16:38:25.447Z',
                                __v: 0,
                                multiple: true,
                                values: [
                                    {
                                        _id: '60d84fac1758203b086a7ee3',
                                        name: 'Black',
                                        description: '#000000',
                                        type: 'color',
                                        createdAt: '2021-06-27T10:15:08.673Z',
                                        updatedAt: '2021-06-27T10:15:08.673Z',
                                        __v: 0,
                                    },
                                    {
                                        _id: '60d84fbd1758203b086a7ee4',
                                        name: 'Purple',
                                        description: '#500061',
                                        type: 'color',
                                        createdAt: '2021-06-27T10:15:25.410Z',
                                        updatedAt: '2021-06-27T10:15:25.410Z',
                                        __v: 0,
                                    },
                                ],
                            },
                            {
                                _id: '60d83d423e80c9369689e1e2',
                                name: 'Waist Size',
                                description: 'Main size in jeans is waist size.',
                                type: 'Size',
                                distributionLevel: 2,
                                createdAt: '2021-06-27T08:56:34.400Z',
                                updatedAt: '2021-06-29T16:38:41.683Z',
                                __v: 0,
                                multiple: true,
                                values: [
                                    {
                                        _id: '60d84f851758203b086a7ee0',
                                        name: '28',
                                        description: 'cm',
                                        type: 'Size',
                                        createdAt: '2021-06-27T10:14:29.569Z',
                                        updatedAt: '2021-06-27T10:14:29.569Z',
                                        __v: 0,
                                    },
                                    {
                                        _id: '60d84f921758203b086a7ee1',
                                        name: '29',
                                        description: 'cm',
                                        type: 'Size',
                                        createdAt: '2021-06-27T10:14:42.536Z',
                                        updatedAt: '2021-06-27T10:14:42.536Z',
                                        __v: 0,
                                    },
                                    {
                                        _id: '60d84f971758203b086a7ee2',
                                        name: '30',
                                        description: 'cm',
                                        type: 'Size',
                                        createdAt: '2021-06-27T10:14:47.022Z',
                                        updatedAt: '2021-06-27T10:14:47.022Z',
                                        __v: 0,
                                    },
                                ],
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
            {/* <Loader /> */}
        </View>
    );
};

export default CreateProduct;
