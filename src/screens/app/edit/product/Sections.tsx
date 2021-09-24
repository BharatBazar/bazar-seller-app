import * as React from 'react';
import { View } from 'react-native';
import NewProduct from './NewProduct';
import ShowPrice from '../component/ShowPrice';
import Title from './Title';
import Description from './Description';
import Colors from './Colors';
import { IProduct, IProductColor, productStatus } from '../../../../server/apis/product/product.interface';
import { ErrorState, IFilter, IPostDataToServer } from './component/generalConfig';
import Filter from './Filter';
import ProductSettings from './Settings';

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
    filter: IFilter[];
    distribution: IFilter[];
    checkAllError: ErrorState;
    setCheckAllError: (a: ErrorState) => void;
}

interface AllError {
    description: ErrorState;
    colors: ErrorState;
    filters: ErrorState;
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
    filter,
    distribution,
}) => {
    //Here for every error 3 state arr possible 0 meanse neutral, 1 means start checking, 2 means passed, 3 means failed
    const [error, setError] = React.useState<AllError>({
        description: 0,
        colors: 0,
        filters: 0,
    });
    const incomplete = productDetails.status == productStatus.NOTCOMPLETED;
    const setAllError = (value: number) => {
        setError({
            description: incomplete ? ErrorState.PASSED : value,
            colors: value,
            filters: incomplete ? ErrorState.PASSED : value,
        });
    };

    const setParticularError = (key: keyof AllError, value: number) => {
        let allError: AllError = { ...error };
        allError[key] = value;
        setError(allError);
    };

    React.useEffect(() => {
        if (checkAllError == ErrorState.STARTCHECKING) {
            setAllError(ErrorState.STARTCHECKING);
        }
    }, [checkAllError]);

    React.useEffect(() => {
        if (Object.values(error).every((item) => item == 2)) {
            //All checks passed
            setAllError(0);
            setCheckAllError(2);
        } else if (Object.values(error).every((item) => item == 3 || item == 2)) {
            //Not All check passed
            setAllError(0);
            setCheckAllError(3);
        }
    }, [error]);

    return (
        <View>
            {!incomplete && (
                <>
                    <Description
                        description={productDetails['description'] || ''}
                        update={productDetails['productDescription'] ? true : false}
                        postDataToServer={postDataToServer}
                        errorValue={error['description']}
                        setError={(value: number) => {
                            setTimeout(() => {
                                setParticularError('description', value);
                            }, 10);
                        }}
                    />
                    {/* <ShowPrice showPrice={productDetails['showPrice'] || false} />
                    <NewProduct /> */}
                    <ProductSettings
                        data={{
                            showPrice: productDetails.showPrice,
                            returnAllowed: productDetails.returnAllowed,
                            new: productDetails.new,
                            newDeadline: productDetails.newDeadline,
                        }}
                    />
                </>
            )}
            <Filter
                filters={filter}
                errorValue={error['filters']}
                setError={(value: number) => {
                    // setTimeout(() => {
                    setParticularError('filters', value);
                    //}, 10);
                }}
                postDataToServer={postDataToServer}
                productDetails={productDetails}
                productId={productId}
            />
            {distribution.length == 0 ? (
                <View />
            ) : distribution[0].filterLevel != 1 ? (
                <View />
            ) : (
                <Colors
                    errorValue={error['colors']}
                    setError={(value: number) => {
                        setTimeout(() => {
                            setParticularError('colors', value);
                        }, 20);
                    }}
                    shopId={productDetails['shopId'] as string}
                    distribution={distribution}
                    setProductId={setProductId}
                    update={update}
                    postDataToServer={postDataToServer}
                    productId={productId}
                    productColors={productDetails['colors'] as IProductColor[]}
                    productTypeDetails={productTypeDetails}
                    //sending product status

                    status={productDetails.status}
                />
            )}
        </View>
    );
};

export default Sections;
