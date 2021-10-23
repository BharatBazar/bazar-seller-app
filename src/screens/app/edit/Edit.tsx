import React from 'react';
import { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { fs16, NavigationProps } from '../../../common';
import StatusBar from '../../component/StatusBar';
import Header from './component/Header';
import Sections from './product/Sections';
import {
    border,
    createProduct,
    deleteProductFromServer,
    generalProductSchema,
    marHor,
    marTop,
    padHor,
    updateProduct,
} from './product/component/generalConfig';
import { AIC, BR, BW, FDR, FLEX, JCC, PH, PR, PV, WP } from '../../../common/styles';
import { IFilter, IProduct, IRProduct, productStatus } from '../../../server/apis/product/product.interface';
import SimpleToast from 'react-native-simple-toast';
import { APIgetProduct } from '../../../server/apis/product/product.api';
import { colorCode, errorColor, mainColor } from '../../../common/color';
import WrappedText from '../../component/WrappedText';
import TextButton from '../../component/TextButton';
import { ToastHOC } from '../../hoc/ToastHOC';
import Loader from '../../component/Loader';
import { IRGetFilterWithValue } from '../../../server/apis/filter/filter.interface';
import { getFilterWithValue } from '../../../server/apis/filter/filter.api';
import { returnEmptyStringOrValue } from '../../../common/helper';
import HowToImprove from './component/HowToImprove';
import ImproveList from './component/ImproveList';

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
    const [generalLoader, setGeneralLoader] = useState(false);
    //Here for every error 3 state are possible
    //0 means neutral,
    //1 means start checking,
    //2 means passed,
    //3 means failed
    const [checkAllError, setCheckAllError] = useState<number>(0);
    const [filter, setFilter] = useState<IFilter[]>([]);
    const [distribution, setDistribution] = useState<IFilter[]>([]);

    const loadFilter = async () => {
        setLoading(true);
        try {
            const response: IRGetFilterWithValue = await getFilterWithValue({ active: true });

            setLoading(false);
            if (response.status == 1) {
                setFilter(response.payload.filter);
                setDistribution(response.payload.distribution);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const fetchProduct = async () => {
        try {
            const response: IRProduct = await APIgetProduct({ _id: productId, shopId: shopId });

            if (response.status == 1) {
                console.log('response set ', response.payload);
                setProductDetails(response.payload);
                setLoading(false);
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message, 'Error loading product details');
            setLoading(false);
        }
    };

    const deleteProduct = async () => {
        Alert.alert('Warning', 'Do you really want to delete this product it will delete all progress?', [
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        if (productId) {
                            setGeneralLoader(true);
                            const response: IRProduct = await deleteProductFromServer({ _id: productId });
                            setGeneralLoader(false);
                            if (response.status == 1) {
                                navigation.goBack();
                            }
                        } else {
                            navigation.goBack();
                        }
                    } catch (error) {
                        setGeneralLoader(false);
                        ToastHOC.errorAlert(error.message, 'Problem deleting product');
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
        loadFilter();
        return () => {};
    }, []);

    React.useEffect(() => {
        if (checkAllError == 2) {
            ToastHOC.successAlert("All check's passed");
            postProductDataToServer(
                {
                    status:
                        productDetails.status == productStatus.NOTCOMPLETED
                            ? productStatus.INVENTORY
                            : productStatus.WAITINGFORAPPROVAL,
                    _id: productDetails._id,
                },
                () => {
                    setProductDetails({
                        ...productDetails,
                        status:
                            productDetails.status == productStatus.NOTCOMPLETED
                                ? productStatus.INVENTORY
                                : productStatus.WAITINGFORAPPROVAL,
                    });
                    //navigation.goBack();
                },
            );
            setCheckAllError(0);
            setGeneralLoader(false);
        } else if (checkAllError == 3) {
            ToastHOC.errorAlert("Please clear all error's");
            setCheckAllError(0);
            setGeneralLoader(false);
        }
    }, [checkAllError]);

    const createProductInServer = async (data: Partial<IProduct>) => {
        const product: Partial<IProduct> = {
            ...data,

            shopId: shopId,
        };
        const response: IRProduct = await createProduct(product);

        if (response.status == 1) {
            setProductId(response.payload._id);
            setProductDetails({ ...response.payload, ...productDetails });
            setLoading(false);
        } else {
        }
    };

    const postProductDataToServer = async (data: IProduct, successCallBack?: Function, errroCallBack?: Function) => {
        try {
            if (productId) {
                //Call update product function
                const product = {
                    ...data,
                    _id: productId,
                };
                setGeneralLoader(true);
                const response: IRProduct = await updateProduct(product);

                if (response.status == 1) {
                    successCallBack && successCallBack();
                    //setProductDetails(response.payload);
                    SimpleToast.show('Saved', SimpleToast.SHORT);
                    setGeneralLoader(false);
                } else {
                    errroCallBack && errroCallBack(response.message);
                    setGeneralLoader(false);
                }
            } else {
                //Call create product function with some data
                createProduct(data);
                setGeneralLoader(false);
            }
        } catch (error) {
            errroCallBack && errroCallBack(error.message);
            setGeneralLoader(false);
        }
    };

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
            {loading ? (
                <Loader />
            ) : (
                <>
                    <View style={[border, FDR(), padHor, PR(0.1), PV(0.1)]}>
                        <WrappedText
                            text={`This product is under ${returnEmptyStringOrValue(
                                category,
                            )} ${returnEmptyStringOrValue(subCategory)} ${returnEmptyStringOrValue(
                                subCategory1,
                            )} category.`}
                            containerStyle={[FLEX(1)]}
                            textColor={'#646464'}
                        />
                        {/* <TextButton
                            text={
                                productDetails.status == productStatus.NOTCOMPLETED
                                    ? 'Add to inventory'
                                    : productDetails.status == productStatus.INVENTORY
                                    ? 'Send for approval'
                                    : productDetails.status == productStatus.REJECTED
                                    ? 'Send for approval again'
                                    : 'Waiting for approval'
                            }
                            onPress={() => {
                                setGeneralLoader(true);
                                setCheckAllError(1);
                            }}
                            textProps={{ textColor: colorCode.WHITE }}
                            containerStyle={[AIC(), PH(0.5), BR(0.05)]}
                        /> */}
                        <ImproveList
                            notes={productDetails.note}
                            status={productDetails.status}
                            onPress={() => {
                                setGeneralLoader(true);
                                setCheckAllError(1);
                            }}
                        />
                    </View>
                    {productDetails.status == productStatus.REJECTED && <HowToImprove note={productDetails.note} />}

                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {!loading && (
                            <Sections
                                filter={filter}
                                distribution={distribution}
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
                </>
            )}
            {generalLoader && <Loader />}
        </View>
    );
};

export default CreateProduct;
