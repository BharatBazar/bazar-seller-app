import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './productNew/NewProduct';
import ShowPrice from '../component/ShowPrice';
import ProductTitle from './productTitle';
import ProductDescription from './productDescription/index';
import ProductColor from './productColor';
import { IProduct, Product } from '../../../../server/apis/product/product.interface';
import { IPostDataToServer } from './component/generalConfig';

export interface ProductCommonDetailsProps {
    productDetails: Product;
    update: boolean;
    postDataToServer: IPostDataToServer;
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
                postDataToServer={postDataToServer}
            />

            <ShowPrice showPrice={productDetails['showPrice']} />
            <NewProduct />
            <ProductColor />
        </View>
    );
};

export default ProductCommonDetails;
