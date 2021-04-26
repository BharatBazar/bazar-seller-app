import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './productNew/NewProduct';
import ShowPrice from '../component/ShowPrice';
import ProductTitle from './productTitle';
import ProductDescription from './productDescription/index';
import ProductColor from './productColor';
import { IProduct } from '../../../../server/apis/product/product.interface';
import { IPostDataToServer } from './component/generalConfig';

export interface ProductCommonDetailsProps {
    productDetails: IProduct;
    update: boolean;
    postDataToServer: IPostDataToServer;
    setProductId: (productId: string) => void;
    productId: string;
}

const ProductCommonDetails: React.FC<ProductCommonDetailsProps> = ({
    productDetails,
    update,
    postDataToServer,
    setProductId,
    productId,
}) => {
    return (
        <View>
            <ProductTitle
                title={productDetails['productTitle']}
                subTitle={productDetails['productSubtitle']}
                update={update}
                postDataToServer={postDataToServer}
            />

            <ProductDescription
                description={productDetails['productDescription'] || ''}
                update={productDetails['productDescription'] ? true : false}
                postDataToServer={postDataToServer}
            />

            <ShowPrice showPrice={productDetails['showPrice'] || false} />
            <NewProduct />
            <ProductColor
                setProductId={setProductId}
                update={update}
                postDataToServer={postDataToServer}
                productId={productId}
                productColors={productDetails.productColor}
            />
        </View>
    );
};

export default ProductCommonDetails;
