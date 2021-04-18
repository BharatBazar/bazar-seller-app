import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './productNew/NewProduct';
import ShowPrice from '../component/ShowPrice';
import ProductTitle from './productTitle';
import ProductDescription from './productDescription/index';
import ProductColor from './productColor';
import { Product } from '../../../../server/apis/product/product.interface';

export interface ProductCommonDetailsProps {
    productDetails: Product;
    update: boolean;
}

const ProductCommonDetails: React.FC<ProductCommonDetailsProps> = ({ productDetails }) => {
    return (
        <View>
            <ProductTitle
                title={productDetails.productTitle}
                subTitle={productDetails.productSubtitle}
                update={update}
            />

            <ProductDescription />

            <ShowPrice />
            <NewProduct />
            <ProductColor />
        </View>
    );
};

export default ProductCommonDetails;
