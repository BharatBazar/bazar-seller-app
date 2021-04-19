import * as React from 'react';
import { View } from 'react-native';
import ProductTextInput from '../component/ProductTextInput';
import ProductDetailsHeading from '../component/ProductDetailsHeading';
import { marTop } from '../component/generalConfig';
import ProductContainer from '../component/productContainerHOC';
import ProductButton from '../component/ProductButton';
import { IProduct } from '../../../../../server/apis/product/product.interface';

export interface ProductTitleProps {
    title?: string;
    subTitle?: string;
    update: boolean;
    postDataToServer: (a: IProduct, b: () => void, c: (error: string) => void) => void;
}

const ProductTitle: React.SFC<ProductTitleProps> = ({ title, subTitle, update, postDataToServer }) => {
    const [productTitle, setProductTitle] = React.useState(title || '');
    const [productSubTitle, setProductSubTitle] = React.useState(subTitle || '');
    const [loading, setLoader] = React.useState(false);
    const [error, setError] = React.useState('');

    const submitData = () => {
        setLoader(true);
        postDataToServer(
            { productTitle, productSubtitle: productSubTitle },
            () => {
                setLoader(false);
            },
            (error) => {
                setLoader(false);
                setError(error);
            },
        );
    };

    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Product Heading Details'}
                subHeading={
                    "Product heading details are important it show's the initial product description and attract's grahak to your shop."
                }
                error={error}
            />

            <View style={[marTop]}>
                <ProductTextInput placeholder={'Product Title'} value={productTitle} onChangeText={setProductTitle} />
                <ProductTextInput
                    placeholder={'Product Subtitle'}
                    value={productSubTitle}
                    onChangeText={setProductSubTitle}
                />
            </View>
            <ProductButton
                buttonText={update ? 'Update' : 'Save'}
                onPress={() => {
                    submitData();
                }}
                isLoading={loading}
                disabled={loading}
            />
        </ProductContainer>
    );
};

export default ProductTitle;
