import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationProps } from '../../../common';
import StatusBar from '../../component/StatusBar';
import Header from './component/Header';
import ProductDetails from './product-color/ProductDetails';
import ProductCommonDetails from './product';
import { generalSpacing } from './product/component/styles';

export interface CreateProductProps extends NavigationProps {}

const CreateProduct: React.FC<CreateProductProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <Header headerTitle={'Create Product'} onPressBack={navigation.goBack} />
            <ScrollView style={{}}>
                <ProductCommonDetails />
            </ScrollView>
        </View>
    );
};

export default CreateProduct;
