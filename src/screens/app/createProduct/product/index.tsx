import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './productNew/NewProduct';
import ShowPrice from '../component/ShowPrice';
import ProductTitle from './productTitle';
import ProductDescription from './productDescription/index';
import ProductColor from './productColor';

export interface ProductCommonDetailsProps {}

const ProductCommonDetails: React.FC<ProductCommonDetailsProps> = () => {
    const [showProductPrice, setShowProductPrice] = React.useState<boolean>(false);
    return (
        <View>
            <ProductTitle />

            <ProductDescription />

            <ShowPrice />
            <NewProduct />
            <ProductColor />
        </View>
    );
};

export default ProductCommonDetails;
