import * as React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { AIC, JCC, MH, ML, WP } from '../../../common/styles';
import { getProductCatalogueAPI } from '../../../server/apis/catalogue/catalogue.api';
import { IRGetProductCatalogue, product } from '../../../server/apis/catalogue/catalogue.interface';
import { productData } from '../ProductCategory';
import CatalogueCardVertical from './CatalogueCardVertical';
import ProductCategory from './DukanProductCategory';
import ServerErrorText from './errorText';

export interface LoadProductDetailsProps {
    query: Object;
    data: productData[];
    setData: Function;
}

const LoadProductDetails: React.FC<LoadProductDetailsProps> = ({ query, data, setData }) => {
    const [loader, setLoader] = React.useState<Boolean>(false);

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
        const response: IRGetProductCatalogue = await getProductCatalogueAPI(data);

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
            <View style={[ML(0.7)]}>{error.length > 0 && <ServerErrorText errorText={error} />}</View>
            <FlatList
                data={data}
                horizontal={true}
                style={{ marginTop: getHP(0.2), width: '100%' }}
                contentContainerStyle={{ marginVertical: getHP(0.2) }}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }: { item: productData; index: number }) => {
                    return (
                        <CatalogueCardVertical
                            containerStyle={[WP(3), MH(0.2), AIC(), JCC()]}
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
