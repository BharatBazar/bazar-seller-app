import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './NewProduct';
import ShowPrice from '../component/ShowPrice';
import Title from './Title';
import Description from './Description';
import Colors from './Colors';
import { IProduct } from '../../../../server/apis/product/product.interface';
import { IPostDataToServer } from './component/generalConfig';

export interface SectionsProps {
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
    checkAllError: number;
    setCheckAllError: (a: number) => void;
}

interface AllError {
    title: number;
    description: number;
    colors: number;
}

const Sections: React.FC<SectionsProps> = ({
    productDetails,
    update,
    postDataToServer,
    setProductId,
    productId,
    productTypeDetails,
    checkAllError,
    setCheckAllError,
}) => {
    //Here for every error 3 state arr possible 0 meanse neutral, 1 means start checking, 2 means passed, 3 means failed
    const [error, setError] = React.useState<AllError>({ title: 0, description: 0, colors: 0 });

    const setAllError = (value: number) => {
        setError({ title: value, description: value, colors: value });
    };

    const setParticularError = (key: keyof AllError, value: number) => {
        let allError: AllError = { ...error };
        allError[key] = value;
        console.log('key:', allError, value, new Date().getTime());
        setError(allError);
    };

    React.useEffect(() => {
        if (checkAllError == 1) {
            setAllError(1);
        }
    }, [checkAllError]);

    React.useEffect(() => {
        console.log('error value changed:', error);
        if (Object.values(error).every((item) => item == 2)) {
            //All checks passed
            console.log('all 2', error);
            setAllError(0);
            setCheckAllError(2);
        } else if (Object.values(error).every((item) => item == 3 || item == 2)) {
            //Not All check passed
            console.log('all 2 or 3', error);
            setAllError(0);
            setCheckAllError(3);
        }
    }, [error]);

    React.useEffect(() => {
        console.log('New beginings');
    }, []);

    return (
        <View>
            <Title
                title={productDetails['productTitle']}
                subTitle={productDetails['productSubtitle']}
                update={update}
                errorValue={error['title']}
                setError={(value: number) => {
                    console.log('SEt particular error title', value);
                    setParticularError('title', value);
                }}
                postDataToServer={postDataToServer}
            />

            <Description
                description={productDetails['productDescription'] || ''}
                update={productDetails['productDescription'] ? true : false}
                postDataToServer={postDataToServer}
                errorValue={error['description']}
                setError={(value: number) => {
                    setTimeout(() => {
                        setParticularError('description', value);
                    }, 10);
                }}
            />

            <ShowPrice showPrice={productDetails['showPrice'] || false} />
            <NewProduct />
            <Colors
                errorValue={error['colors']}
                setError={(value: number) => {
                    setTimeout(() => {
                        setParticularError('colors', value);
                    }, 20);
                }}
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

export default Sections;
