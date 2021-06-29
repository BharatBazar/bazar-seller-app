import React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import { sub } from 'react-native-reanimated';
import { NavigationProps } from '../../../common';
import { NavigationKey } from '../../../labels';
import { IProduct, IProducts, productStatus } from '../../../server/apis/product/product.interface';
import { APIgetAllProduct } from '../../../server/apis/product/product.api';
import ProductIdentifierView from './component/ProductIdentifierView';

export interface ProductListProps extends NavigationProps {
    shopId: string;
    category: string;
    subCategory: string;
    subCategory1: string;
    productStatus: productStatus;
}

const ProductList: React.SFC<ProductListProps> = ({
    shopId,
    navigation,
    category,
    subCategory,
    subCategory1,
    productStatus,
}) => {
    const [loading, setLoader] = useState(false);
    const [product, setProduct] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
        try {
            setLoader(true);
            const response: IProducts = await APIgetAllProduct({
                query: {
                    productCategory: category,
                    productSubCategory1: subCategory,
                    productSubCategory2: subCategory1,
                    productStatus: productStatus,
                    shopId: shopId,
                },
            });
            if (response.status == 1) {
                setProduct(response.payload.payload);
                setLoader(false);
            } else {
                Alert.alert(response.message);
                setLoader(false);
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(category, subCategory, subCategory1);
    return (
        <ScrollView style={{ flex: 1 }}>
            {loading && <ActivityIndicator />}
            {product.map((item) => (
                <ProductIdentifierView
                    product={item}
                    onPress={() => {
                        navigation.navigate(NavigationKey.CREATEPRODUCT, {
                            update: true,
                            _id: item._id,
                            category: category,
                            subCategory: subCategory,
                            subCategory1: subCategory1,
                        });
                    }}
                />
            ))}
        </ScrollView>
    );
};

export default ProductList;
