import React from 'react';
import { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationProps } from '../../../common';
import StatusBar from '../../component/StatusBar';
import Header from './component/Header';
import ProductDetails from './product-color/ProductDetails';
import ProductCommonDetails from './product';
import { generalProductSchema, generalSpacing } from './product/component/generalConfig';
import { AIC, FLEX, JCC } from '../../../common/styles';
import { Product } from '../../../server/apis/product/product.interface';

export interface CreateProductProps extends NavigationProps {
    route: {
        params: {
            update?: boolean;
            _id?: string;
        };
    };
}

const CreateProduct: React.FC<CreateProductProps> = ({
    navigation,
    route: {
        params: { update },
    },
}) => {
    const [productDetails, setProductDetails] = useState<Product>(generalProductSchema);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        if (update) {
            //Make api call
        } else {
            setLoading(false);
        }
    }, []);

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
            <ScrollView style={{}}>
                <ProductCommonDetails productDetails={productDetails} update={update} />
            </ScrollView>
        </View>
    );
};

export default CreateProduct;
