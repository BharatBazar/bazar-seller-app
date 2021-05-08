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
    errorValue: number;
    setError: (value: number) => void;
    update: boolean;
    postDataToServer: (a: IProduct, b: () => void, c: (error: string) => void) => void;
}

interface Error {
    title: string;
    subTitle: string;
    generalError: string;
}

const ProductTitle: React.SFC<ProductTitleProps> = ({
    title,
    subTitle,
    update,
    postDataToServer,
    errorValue,
    setError,
}) => {
    const [productTitle, setProductTitle] = React.useState(title || '');
    const [productSubTitle, setProductSubTitle] = React.useState(subTitle || '');
    const [lastSubmittedState, setLastSubmittedState] = React.useState<{ lastTitle: string; lastSubtitle: string }>({
        lastSubtitle: title,
        lastTitle: subTitle,
    });
    const [loading, setLoader] = React.useState(false);
    const [error, setErrors] = React.useState<Partial<Error>>({});

    React.useEffect(() => {
        setProductTitle(title);
        setProductSubTitle(subTitle);
        setLastSubmittedState({ lastSubtitle: subTitle, lastTitle: title });
    }, [title, subTitle]);

    React.useEffect(() => {
        console.log('error value', errorValue);
        if (errorValue == 1) {
            //Run a error check
            console.log('Run an error check');
            const isError = checkError();
            if (isError) {
                setError(3);
            } else {
                setError(2);
            }
        }
    }, [errorValue]);

    const checkError = () => {
        let error: Partial<Error> = {};
        if (productTitle.length == 0) {
            error['title'] = 'Please provide title';
        }
        if (productSubTitle.length == 0) {
            error['subTitle'] = 'Please provide subTitle';
        }

        if (productTitle != lastSubmittedState.lastTitle || productSubTitle != lastSubmittedState.lastSubtitle) {
            error['generalError'] = 'Please save your progress.';
        }
        setErrors(error);
        if (Object.keys(error).length == 0) {
            return false;
        } else {
            return true;
        }
    };

    const submitData = () => {
        if (productSubTitle.length == 0 || productTitle.length == 0) {
            setErrors({ generalError: 'Please provide all the fields!!' });
        } else {
            setLoader(true);
            setErrors({});
            postDataToServer(
                { productTitle, productSubtitle: productSubTitle },
                () => {
                    setLoader(false);
                    setLastSubmittedState({ lastTitle: productTitle, lastSubtitle: productSubTitle });
                },
                (error) => {
                    setLoader(false);
                    setErrors({ generalError: error });
                },
            );
        }
    };

    const { lastTitle, lastSubtitle } = lastSubmittedState;

    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Product Heading Details'}
                subHeading={
                    "Product heading details are important it show's the initial product description and attract's grahak to your shop."
                }
                error={error['generalError'] || ''}
            />

            <View style={[marTop]}>
                <ProductTextInput
                    placeholder={'Product Title'}
                    value={productTitle}
                    onChangeText={setProductTitle}
                    error={error['title']}
                />
                <ProductTextInput
                    placeholder={'Product Subtitle'}
                    value={productSubTitle}
                    multiline={true}
                    height={0.7}
                    onChangeText={setProductSubTitle}
                    error={error['subTitle']}
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
