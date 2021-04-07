import * as React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { commonStyles, componentProps, PH, PV } from '../../common/styles';
import { IRGetProductCatalogue, product } from '../../server/apis/productCatalogue/productCatalogue.interface';
import { DataHandling } from '../../server/DataHandlingHOC';
import { getProductCatalogueAPI } from '../../server/apis/productCatalogue/productCatalogue.api';
import { setUpAxios } from '../../server';
import HeaderText from './component/HeaderText';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import { getHP } from '../../common/dimension';
import { FlatList } from 'react-native-gesture-handler';
import TextButton from '../component/TextButton';
import { updateShopData } from '../../server/apis/shop/shop.interface';
import { updateShop } from '../../server/apis/shop/shop.api';
import ProductCategory from './component/DukanProductCategory';
import ServerErrorText from './component/errorText';

export interface ProductDetail {}

const dataHandling = new DataHandling('');

interface selected {
    selected: boolean;
}

export interface productData extends product, selected {}

const ProductDetails: React.SFC<ProductDetail> = () => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');
    const submitDetails = async (data: updateShopData) => {
        const response = await dataHandling.fetchData(updateShop, { category: data, _id: '60694f8582ea63ad28a2ec1f' });
        console.log(response);
        if (response.status == 1) {
            console.log(response);
        } else {
        }
    };

    const fetchProductDetails = async (data: { categoryType: String }) => {
        const response: IRGetProductCatalogue = await dataHandling.fetchData(getProductCatalogueAPI, {
            ...data,
        });
        console.log(response);
        if (response.status == 1) {
            const data: productData = response.payload.map((item) => {
                return { ...item, selected: false };
            });
            setData(data);
        } else {
            setError(response.message);
        }
    };

    useEffect(() => {
        setUpAxios();

        fetchProductDetails({ categoryType: 'Category' });
        return () => {};
    }, []);

    return (
        <View style={[{ flex: 1 }, PH(0.3), PV(0.4)]}>
            <ShadowWrapperHOC containerStyle={{ height: getHP(8) }}>
                <>
                    <HeaderText
                        step={'Step 3'}
                        heading={'Product category'}
                        subHeading={'Select what services you provide by your dukan by clicking on the category'}
                    />
                    {error.length > 0 && <ServerErrorText errorText={error} />}

                    <FlatList
                        data={data}
                        numColumns={2}
                        style={{ height: getHP(2), marginTop: getHP(0.2) }}
                        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item, index }: { item: productData; index: number }) => {
                            return (
                                <ProductCategory
                                    item={item}
                                    onPressCategory={() => {
                                        const prodcutCategory = [...data];
                                        prodcutCategory[index].selected = !prodcutCategory[index].selected;
                                        prodcutCategory.sort((item) => !item.selected);
                                        setData(prodcutCategory);
                                    }}
                                />
                            );
                        }}
                    />
                    <TextButton
                        text={'Submit'}
                        textProps={componentProps.buttonTextProps}
                        containerStyle={{ ...commonStyles.buttonContainerStyle, marginTop: getHP(0.4) }}
                        onPress={() => {
                            const selectedCategory: { categoryType: string } = data
                                .filter((item) => item.selected)
                                .map((item) => item._id);
                            if (selectedCategory.length == 0) {
                                setError('Please select atleast one category');
                            } else submitDetails(selectedCategory);
                        }}
                    />
                </>
            </ShadowWrapperHOC>
        </View>
    );
};

export default ProductDetails;
