import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './NewProduct';
import ShowPrice from '../component/ShowPrice';
import ProductTitle from './Title';
import ProductDescription from './Descrption';
import ProductColor from './Colors';
import { IProduct } from '../../../../server/apis/product/product.interface';
import { IPostDataToServer } from './component/generalConfig';

export interface ProductCommonDetailsProps {
    productDetails: IProduct;
    update: boolean;
    postDataToServer: IPostDataToServer;
    setProductId: (productId: string) => void;
    productId?: string;
    productTypeDetails: {
        category: string;
        subCategory1: string;
        subCategory: string;
    };
}

const ProductCommonDetails: React.FC<ProductCommonDetailsProps> = ({
    productDetails,
    update,
    postDataToServer,
    setProductId,
    productId,
    productTypeDetails,
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
                productTypeDetails={productTypeDetails}
            />
        </View>
    );
};

export default ProductCommonDetails;
