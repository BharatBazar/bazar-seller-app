import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { BGCOLOR, BR, commonStyles, componentProps, MH, MT, PH, PV } from '../../common/styles';
import { IRGetProductCatalogue, product } from '../../server/apis/productCatalogue/productCatalogue.interface';
import { DataHandling } from '../../server/DataHandlingHOC';
import { getProductCatalogueAPI } from '../../server/apis/productCatalogue/productCatalogue.api';
import { setUpAxios } from '../../server';
import HeaderText from './component/HeaderText';
import { getHP } from '../../common/dimension';
import { FlatList } from 'react-native-gesture-handler';
import TextButton from '../component/TextButton';
import { IRShopUpdate, updateShopData } from '../../server/apis/shop/shop.interface';
import { updateShop } from '../../server/apis/shop/shop.api';
import ProductCategory from './component/DukanProductCategory';
import ServerErrorText from './component/errorText';
import { colorCode } from '../../common/color';
import { NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';

export interface ProductDetail extends NavigationProps {}

const dataHandling = new DataHandling('');

interface selected {
    selected: boolean;
}

export interface productData extends product, selected {}

const ProductDetails: React.SFC<ProductDetail> = ({ navigation }) => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');

    const submitDetails = async (data: updateShopData) => {
        console.log(data);
        const response: IRShopUpdate = await dataHandling.fetchData(updateShop, {
            ...data,
            _id: '60694f8582ea63ad28a2ec1f',
        });
        if (response.status == 1) {
            navigation.navigate(NavigationKey.PRODUCTSUBCATEGORY);
        } else {
            setError(response.message);
        }
    };

    const fetchProductDetails = async (data: Object) => {
        const response: IRGetProductCatalogue = await dataHandling.fetchData(getProductCatalogueAPI, data);
        if (response.status == 1) {
            const data: productData[] = response.payload.map((item) => {
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
        //getShopDetails();
        return () => {};
    }, []);

    return (
        <ScrollView
            style={[{ flex: 1 }, PH(0.6), BGCOLOR(colorCode.WHITE)]}
            contentContainerStyle={{ paddingBottom: '2%' }}
        >
            <HeaderText
                step={'Step 5'}
                heading={'What you sell'}
                subHeading={'Select what services you provide by your dukan by clicking on the category'}
            />
            {error.length > 0 && <ServerErrorText errorText={error} />}

            <FlatList
                data={data}
                numColumns={2}
                style={{ height: getHP(6), marginTop: getHP(0.2) }}
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }: { item: productData; index: number }) => {
                    return (
                        <ProductCategory
                            item={item}
                            containerStyle={styles.productCategory}
                            onPressCategory={() => {
                                const prodcutCategory = [...data];
                                prodcutCategory[index].selected = !prodcutCategory[index].selected;

                                setData(prodcutCategory);
                            }}
                        />
                    );
                }}
            />

            <TextButton
                text={'Submit'}
                textProps={componentProps.buttonTextProps}
                containerStyle={{ ...commonStyles.buttonContainerStyle, marginTop: getHP(0.2) }}
                onPress={() => {
                    const selectedCategory: [string] = data.filter((item) => item.selected).map((item) => item._id);
                    if (selectedCategory.length == 0) {
                        setError('Please select atleast one category');
                    } else submitDetails({ category: selectedCategory });
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    productCategory: {
        ...BR(0.05),
        ...commonStyles.alcjcc,

        backgroundColor: colorCode.WHITE,
        borderColor: colorCode.GREENLOW(50),
        flex: 1,
        paddingVertical: '2%',
        marginHorizontal: '5%',
        marginVertical: '3%',
    },
});

export default ProductDetails;
