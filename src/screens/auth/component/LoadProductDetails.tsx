import * as React from 'react';
import { Component } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { colorCode } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { commonStyles, MH } from '../../../common/styles';
import { getProductCatalogueAPI } from '../../../server/apis/productCatalogue/productCatalogue.api';
import { IRGetProductCatalogue, product } from '../../../server/apis/productCatalogue/productCatalogue.interface';
import { DataHandling } from '../../../server/DataHandlingHOC';
import { productData } from '../ProductDetails';
import ProductCategory from './DukanProductCategory';
import ServerErrorText from './errorText';

export interface LoadProductDetailsProps {
    query: Object;
}

const dataHandling = new DataHandling('');

const LoadProductDetails: React.FC<LoadProductDetailsProps> = ({ query }) => {
    const [loader, setLoader] = React.useState<Boolean>(false);
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');

    const addFilter = (data: Partial<productData>[]): productData[] => {
        const a = data.map((item) => {
            item.selected = false;
            return item;
        });
        return a;
    };
    const fetchProductDetails = async (data: any) => {
        setLoader(true);
        const response: IRGetProductCatalogue = await dataHandling.fetchData(getProductCatalogueAPI, data);
        console.log(response);
        if (response.status == 1) {
            setLoader(false);
            if (response.payload.length == 0) {
                setError('Opps!! No product available.');
            }
            setData(addFilter(response.payload));
        } else {
            setLoader(false);
            setError(response.message);
        }
    };

    React.useEffect(() => {
        fetchProductDetails(query);
        return () => {};
    }, []);

    if (loader) {
        return <ActivityIndicator size={'small'} color={colorCode.CHAKRALOW(70)} />;
    }
    return (
        <View>
            {error.length > 0 && <ServerErrorText errorText={error} />}

            <FlatList
                data={data}
                horizontal={true}
                style={{ marginTop: getHP(0.2), width: '100%' }}
                contentContainerStyle={{ marginVertical: getHP(0.2) }}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }: { item: productData; index: number }) => {
                    return (
                        <ProductCategory
                            containerStyle={{ width: getWP(3), ...commonStyles.alcjcc, ...MH(0.2) }}
                            item={item}
                            onPressCategory={() => {
                                const prodcutCategory = [...data];
                                prodcutCategory[index].selected = !prodcutCategory[index].selected;
                                //prodcutCategory[index1].sort((item) => !item.selected);

                                setData(prodcutCategory);
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};

export default LoadProductDetails;
