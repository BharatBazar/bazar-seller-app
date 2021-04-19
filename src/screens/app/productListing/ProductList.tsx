import React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Touchable, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProps } from '../../../common';
import { NavigationKey } from '../../../labels';
import { IProduct, IProducts, productStatus } from '../../../server/apis/product/product.interface';
import { APIgetAllProduct } from '../../../server/apis/product/produt.api';
import WrappedText from '../../component/WrappedText';

export interface ProductListProps extends NavigationProps {}

const ProductList: React.SFC<ProductListProps> = ({ navigation }) => {
    const [loading, setLoader] = useState(false);
    const [product, setProduct] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
        try {
            setLoader(true);
            const response: IProducts = await APIgetAllProduct({
                query: {
                    productCategory: 'Footwear',
                    productSubCategory1: 'Mens',
                    productSubCategory2: 'Sports Shoes',
                    productStatus: productStatus.NOTCOMPLETED,
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

    return (
        <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator />}
            {product.map((item) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(NavigationKey.CREATEPRODUCT, { update: true, _id: item._id });
                    }}
                >
                    <WrappedText text={item._id} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ProductList;
