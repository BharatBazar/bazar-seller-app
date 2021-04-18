import * as React from 'react';
import { View } from 'react-native';
import ProductTextInput from '../component/ProductTextInput';
import ProductDetailsHeading from '../component/ProductDetailsHeading';

import ProductContainer from '../component/productContainerHOC';
import ProductButton from '../component/ProductButton';
import { marTop } from '../component/generalConfig';

export interface ProductTitleProps {}

const ProductDescription: React.SFC<ProductTitleProps> = () => {
    const [productDescription, setProductDescription] = React.useState('');

    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Provide description'}
                subHeading={
                    "Product description tell's grahak about the product. You can provide text as well as audio describing about product."
                }
            />
            <View style={[marTop]}>
                <ProductTextInput
                    placeholder={'Product Description'}
                    value={productDescription}
                    onChangeText={setProductDescription}
                />

                <ProductButton buttonText={'Save'} onPress={() => {}} />
            </View>
        </ProductContainer>
    );
};

export default ProductDescription;
