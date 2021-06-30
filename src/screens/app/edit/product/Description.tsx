import * as React from 'react';
import { View } from 'react-native';
import ProductTextInput from './component/ProductTextInput';
import ProductDetailsHeading from './component/ProductDetailsHeading';

import ProductContainer from './component/productContainerHOC';
import ProductButton from './component/ProductButton';
import { IPostDataToServer, marTop } from './component/generalConfig';

export interface DescriptionProps {
    description: string;
    update?: boolean;
    postDataToServer: IPostDataToServer;
    errorValue: number;
    setError: (value: number) => void;
}

interface Error {
    description?: string;
    generalError?: string;
}

const ProductDescription: React.SFC<DescriptionProps> = ({
    description,
    update,
    postDataToServer,
    errorValue,
    setError,
}) => {
    const [productDescription, setProductDescription] = React.useState(description);
    const [lastDes, setLastDes] = React.useState<string>(description);
    const [loading, setLoader] = React.useState(false);
    const [error, setErrors] = React.useState<Partial<Error>>({});

    React.useEffect(() => {
        setProductDescription(description);
        setLastDes(description);
    }, [description]);

    React.useEffect(() => {
        if (errorValue == 1) {
            const isError = checkError();

            if (isError) {
                setError(3);
            } else {
                setError(2);
            }
        }
    }, [errorValue]);

    const submitData = () => {
        setLoader(true);
        setErrors({});
        postDataToServer(
            { description: productDescription },
            () => {
                setLastDes(productDescription);
                setLoader(false);
            },
            (error) => {
                setLoader(false);
                setErrors({ generalError: error });
            },
        );
    };

    const checkError = () => {
        let error: Error = {};

        if (productDescription.length == 0) {
            error['description'] = 'Please provide description';
        }
        if (lastDes != productDescription) {
            error['generalError'] = 'Please save description';
        }

        if (Object.keys(error).length == 0) {
            setErrors({});
            return false;
        } else {
            setErrors(error);
            return true;
        }
    };

    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Provide description'}
                subHeading={
                    "Product description tell's grahak about the product. You can provide text as well as audio describing about product."
                }
                error={error['generalError']}
            />
            <View style={[marTop]}>
                <ProductTextInput
                    placeholder={'Product Description'}
                    value={productDescription}
                    onChangeText={setProductDescription}
                    multiline={true}
                    height={1}
                    error={error['description']}
                />

                {lastDes !== productDescription && (
                    <ProductButton
                        buttonText={update ? 'Update' : 'Save'}
                        onPress={() => {
                            submitData();
                        }}
                    />
                )}
            </View>
        </ProductContainer>
    );
};

export default ProductDescription;
