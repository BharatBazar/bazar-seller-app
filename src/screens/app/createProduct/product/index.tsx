import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './productNew/NewProduct';
import ShowPrice from '../component/ShowPrice';
import ProductTitle from './productTitle';
import ProductDescription from './productDescription/index';
import ProductColor from './productColor';
import { IRProduct, Product } from '../../../../server/apis/product/product.interface';

export interface ProductCommonDetailsProps {
    productDetails: Product;
    update: boolean;
    postDataToServer: (a: IRProduct, b: () => void, c: (error: string) => void) => void;
}

const ProductCommonDetails: React.FC<ProductCommonDetailsProps> = ({ productDetails, update, postDataToServer }) => {
    return (
        <View>
            <ProductTitle
                title={productDetails['productTitle']}
                subTitle={productDetails['productSubtitle']}
                update={update}
                postDataToServer={postDataToServer}
            />

            <ProductDescription
                description={productDetails['productDescription']}
                update={productDetails['productDescription'] ? true : false}
            />

            <ShowPrice showPrice={productDetails['showPrice']} />
            <NewProduct />
            <ProductColor />
        </View>
    );
};

export default ProductCommonDetails;
