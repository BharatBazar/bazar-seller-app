import React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { sub } from 'react-native-reanimated';
import { NavigationProps } from '../../../common';
import { NavigationKey } from '../../../labels';
import { IProduct, IProducts, productStatus } from '../../../server/apis/product/product.interface';
import { APIgetAllProduct } from '../../../server/apis/product/product.api';
import ProductIdentifierView from './component/ProductIdentifierView';
import { AIC, BGCOLOR, colorTransparency, FLEX, JCC, M, PH } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import { FlatList } from 'react-native-gesture-handler';
import Loader from '@app/screens/component/Loader';

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
        console.log('fetching propductes =>', status);
        try {
            setLoader(true);
            const response: IProducts = await APIgetAllProduct({
                query: {
                    status: status,
                    shopId: shopId,
                },
            });

            if (response.status == 1) {
                //    console.log(response.payload.payload);
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
            {loading ? (
                <Loader />
            ) : product.length > 0 ? (
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
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: '2%' }}
                />
            ) : (
                <WrappedText
                    text={'No product available'}
                    textColor={'#000000' + colorTransparency[40]}
                    containerStyle={[FLEX(1), AIC(), JCC()]}
                />
            )}
        </View>
    );
};

export default ProductList;
