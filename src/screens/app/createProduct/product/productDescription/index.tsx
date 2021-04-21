import * as React from 'react';
import { View } from 'react-native';
import ProductTextInput from '../component/ProductTextInput';
import ProductDetailsHeading from '../component/ProductDetailsHeading';

import ProductContainer from '../component/productContainerHOC';
import ProductButton from '../component/ProductButton';
import { IPostDataToServer, marTop } from '../component/generalConfig';

export interface ProductTitleProps {
    description: string;
    update: boolean;
    postDataToServer: IPostDataToServer;
}

const ProductDescription: React.SFC<ProductTitleProps> = ({ description, update, postDataToServer }) => {
    const [productDescription, setProductDescription] = React.useState(description);
    const [loading, setLoader] = React.useState(false);
    const [error, setError] = React.useState('');

    const submitData = () => {
        setLoader(true);
        postDataToServer(
            { productDescription },
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
                heading={'Provide description'}
                subHeading={
                    "Product description tell's grahak about the product. You can provide text as well as audio describing about product."
                }
                error={error}
            />
            <View style={[marTop]}>
                <ProductTextInput
                    placeholder={'Product Description'}
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline={true}
                    height={1}
                />

                <ProductButton
                    buttonText={update ? 'Update' : 'Save'}
                    onPress={() => {
                        submitData();
                    }}
                />
            </View>
        </ProductContainer>
    );
};

export default ProductDescription;
