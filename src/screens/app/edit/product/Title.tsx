import * as React from 'react';
import { View } from 'react-native';
import ProductTextInput from './component/ProductTextInput';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import { marTop } from './component/generalConfig';
import ProductContainer from './component/productContainerHOC';
import ProductButton from './component/ProductButton';
import { IProduct } from '../../../../server/apis/product/product.interface';

export interface ProductTitleProps {
    title: string;
    subTitle: string;

    update: boolean;
    postDataToServer: (a: IProduct, b: () => void, c: (error: string) => void) => void;
}

const ProductTitle: React.SFC<ProductTitleProps> = ({ title, subTitle, update, postDataToServer }) => {
    const [productTitle, setProductTitle] = React.useState(title || '');
    const [productSubTitle, setProductSubTitle] = React.useState(subTitle || '');
    const [lastSubmittedState, setLastSubmittedState] = React.useState<{ lastTitle: string; lastSubtitle: string }>({
        lastSubtitle: title,
        lastTitle: subTitle,
    });
    const [loading, setLoader] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        setProductTitle(title);
        setProductSubTitle(subTitle);
        setLastSubmittedState({ lastSubtitle: subTitle, lastTitle: title });
    }, [title, subTitle]);

    const submitData = () => {
        setLoader(true);
        postDataToServer(
            { productTitle, productSubtitle: productSubTitle },
            () => {
                setLoader(false);
                setLastSubmittedState({ lastTitle: productTitle, lastSubtitle: productSubTitle });
            },
            (error) => {
                setLoader(false);
                setError(error);
            },
        );
    };

    const { lastTitle, lastSubtitle } = lastSubmittedState;

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
                    multiline={true}
                    height={0.7}
                    onChangeText={setProductSubTitle}
                />
            </View>
            {(lastTitle !== productTitle || lastSubtitle !== productSubTitle) && (
                <ProductButton
                    buttonText={'Save'}
                    onPress={() => {
                        submitData();
                    }}
                    isLoading={loading}
                    disabled={loading}
                />
            )}
        </ProductContainer>
    );
};

export default ProductTitle;
