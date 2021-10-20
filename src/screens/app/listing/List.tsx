import React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { sub } from 'react-native-reanimated';
import { NavigationProps } from '../../../common';
import { NavigationKey } from '../../../labels';
import { IProduct, IProducts, productStatus } from '../../../server/apis/product/product.interface';
import { APIgetAllProduct } from '../../../server/apis/product/product.api';
import ProductIdentifierView from './component/ProductIdentifierView';
import { AIC, BGCOLOR, FLEX, JCC, M, PH } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import { FlatList } from 'react-native-gesture-handler';

export interface ProductListProps extends NavigationProps {
    shopId: string;
    category: string;
    subCategory: string;
    subCategory1: string;
    status: productStatus;
}

const ProductList: React.SFC<ProductListProps> = ({
    shopId,
    navigation,
    category,
    subCategory,
    subCategory1,
    status,
}) => {
    const [loading, setLoader] = useState(false);
    const [product, setProduct] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
        try {
            setLoader(true);
            const response: IProducts = await APIgetAllProduct({
                query: {
                    status: status,
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

    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            <FlatList
                data={product}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                //horizontal={true}

                renderItem={({ item, index }) => {
                    return (
                        <ProductIdentifierView
                            key={index}
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
                    );
                }}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: '5%' }}
            />
        </View>
    );
};

export default ProductList;
