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
    const [productId, setProductId] = useState(_id);
    const [productDetails, setProductDetails] = useState<IProduct>(generalProductSchema);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        if (update) {
            //Make api call
            fetchProduct();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response: IRProduct = await APIgetProduct({
                _id: productId,
            });
            if (response.status == 1) {
                setProductDetails(response.payload);
                setLoading(false);
            } else {
                Alert.alert(response.message);
                setLoading(false);
            }
        } catch (error) {
            Alert.alert(error.message);
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
                const response = await updateProduct(product);
                if (response.status == 1) {
                    successCallBack();
                    SimpleToast.show('Saved', SimpleToast.SHORT);
                } else {
                    errroCallBack(response.message);
                }
            } else {
                //Call create product function with some data
                const product = {
                    productCategory: 'Footwear',
                    productSubCategory1: 'Mens',
                    productSubCategory2: 'Sports Shoes',
                    ...data,
                };
                const response = await createProduct(product);
                console.log(response);
                if (response.status == 1) {
                    successCallBack();

                    setProductId(response.payload._id);
                } else {
                    errroCallBack(response.message);
                }
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
            <StatusBar />
            <Header headerTitle={'Create Product'} onPressBack={navigation.goBack} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <ProductCommonDetails
                    productDetails={productDetails}
                    update={update}
                    postDataToServer={postProductDataToServer}
                />
            </ScrollView>
        </View>
    );
};

export default CreateProduct;
