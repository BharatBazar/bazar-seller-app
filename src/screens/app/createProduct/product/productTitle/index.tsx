import * as React from 'react';
import { View } from 'react-native';
import ProductTextInput from '../component/ProductTextInput';
import ProductDetailsHeading from '../component/ProductDetailsHeading';
import ShadowWrapperHOC from '../../../../hoc/ShadowWrapperHOC';
import { marTop, padHor } from '../component/generalConfig';
import ProductContainer from '../component/productContainerHOC';
import ProductButton from '../component/ProductButton';

export interface ProductTitleProps {
    title?: string;
    subTitle?: string;
    update: boolean;
}

const ProductTitle: React.SFC<ProductTitleProps> = ({ title, subTitle, update }) => {
    const [productTitle, setProductTitle] = React.useState(title || '');
    const [productSubTitle, setProductSubTitle] = React.useState(subTitle || '');

    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Product Heading Details'}
                subHeading={
                    "Product heading details are important it show's the initial product description and attract's grahak to your shop."
                }
            />
            <View style={[marTop]}>
                <ProductTextInput placeholder={'Product Title'} value={productTitle} onChangeText={setProductTitle} />
                <ProductTextInput
                    placeholder={'Product Subtitle'}
                    value={productSubTitle}
                    onChangeText={setProductSubTitle}
                />
            </View>
            <ProductButton buttonText={'Save'} onPress={() => {}} />
        </ProductContainer>
    );
};

export default ProductTitle;
