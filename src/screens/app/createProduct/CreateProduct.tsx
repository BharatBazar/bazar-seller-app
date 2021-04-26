import React from 'react';
import { useState } from 'react';
import { View, ScrollView, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import { NavigationProps } from '../../../common';
import StatusBar from '../../component/StatusBar';
import Header from './component/Header';
import ProductCommonDetails from './product';
import { createProduct, generalProductSchema, updateProduct } from './product/component/generalConfig';
import { AIC, FLEX, JCC } from '../../../common/styles';
import { IProduct, IRProduct, productStatus } from '../../../server/apis/product/product.interface';
import SimpleToast from 'react-native-simple-toast';
import { APIgetProduct } from '../../../server/apis/product/produt.api';
import { mainColor } from '../../../common/color';

export interface CreateProductProps extends NavigationProps {
    route: {
        params: {
            update: boolean;
            _id?: string;
        };
    };
}

const CreateProduct: React.FC<CreateProductProps> = ({
    navigation,
    route: {
        params: { update, _id },
    },
}) => {
    const [productId, setProductId] = useState<string | undefined>(_id);
    const [productDetails, setProductDetails] = useState<IProduct>(generalProductSchema);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        const response: IRProduct = await APIgetProduct({ _id: productId });

        setLoading(false);
        if (response.status == 1) {
            console.log(response);
            setProductDetails(response.payload);
        }
    };

    React.useEffect(() => {
        if (update) {
            fetchProduct();
        } else {
            createProductInServer({});
        }
    }, []);

    const createProductInServer = async (data: Partial<IProduct>) => {
        const product = {
            ...data,
            productCategory: 'Footwear',
            productSubCategory1: 'Mens',
            productSubCategory2: 'Sports Shoes',
        };
        const response: IRProduct = await createProduct(product);
        console.log(response);
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
                    setProductDetails(response.payload);
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
            console.log(error.message);
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
            <Header headerTitle={'Create Product'} onPressBack={navigation.goBack} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {!loading && (
                    <ProductCommonDetails
                        productDetails={productDetails}
                        update={update}
                        postDataToServer={postProductDataToServer}
                        setProductId={setProductId}
                        productId={productId}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default CreateProduct;
