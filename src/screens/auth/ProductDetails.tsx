import * as React from 'react';
import { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BGCOLOR, BR, commonStyles, componentProps, MH, MT, PH, PV } from '../../common/styles';
import { IRGetProductCatalogue, product } from '../../server/apis/productCatalogue/productCatalogue.interface';
import { DataHandling } from '../../server/DataHandlingHOC';
import { getProductCatalogueAPI } from '../../server/apis/productCatalogue/productCatalogue.api';
import { setUpAxios } from '../../server';
import HeaderText from './component/HeaderText';
import { getHP, getWP } from '../../common/dimension';
import { FlatList } from 'react-native-gesture-handler';
import TextButton from '../component/TextButton';
import { IRGetShop, IRShopUpdate, Shop, updateShopData } from '../../server/apis/shop/shop.interface';
import { getShop, updateShop } from '../../server/apis/shop/shop.api';
import ProductCategory from './component/DukanProductCategory';
import ServerErrorText from './component/errorText';
import WrappedText from '../component/WrappedText';
import { colorCode } from '../../common/color';
import LoadProductDetails from './component/LoadProductDetails';

export interface ProductDetail {}

const dataHandling = new DataHandling('');

interface selected {
    selected: boolean;
}

export interface productData extends product, selected {}

const ProductDetails: React.SFC<ProductDetail> = () => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');
    const [shop, setShop] = React.useState<Partial<Shop>>({});
    const [categoryScreen, setCategoryScreen] = React.useState<Boolean>(true);
    const [category, setCategory] = React.useState<[productData[]]>([[]]);
    const [subCategory, setSubCategory] = React.useState<{ [key: string]: productData[] }>({});

    const submitDetails = async (data: updateShopData) => {
        const response: IRShopUpdate = await dataHandling.fetchData(updateShop, {
            ...data,
            _id: '60694f8582ea63ad28a2ec1f',
        });
        if (response.status == 1) {
            setCategoryScreen(false);
        } else {
            setError(response.message);
        }
    };

    React.useEffect(() => {
        getShopDetails();
    }, [categoryScreen]);

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

    const getShopDetails = async () => {
        let response: IRGetShop = await dataHandling.fetchData(getShop, {
            _id: '60694f8582ea63ad28a2ec1f',
        });
        if (response.status == 1) {
            setShop(response.payload);
            const response1: IRGetProductCatalogue = await dataHandling.fetchData(getProductCatalogueAPI, {
                subCategoryRef: { $in: response.payload.category.map((item) => item._id) },
            });

            let data: [productData[]] = [];
            response.payload.category.forEach((item, index) => {
                let data1: productData[] = response1.payload
                    .filter((subCateogry) => subCateogry.subCategoryRef == item._id)
                    .map((item) => {
                        return { ...item, selected: false };
                    });
                data.push(data1);
                if (index == response.payload.category.length - 1) {
                    setCategory(data);
                }
            });
        } else {
            setError(response.message);
        }
    };

    useEffect(() => {
        setUpAxios();

        fetchProductDetails({ categoryType: 'Category' });
        getShopDetails();
        return () => {};
    }, []);

    const updateSubCategory = (data: productData[], id: string) => {
        const newCategory = { ...subCategory };
        newCategory[id] = data;
        setSubCategory(newCategory);
    };
    const deleteSubCategory = (id: string) => {
        const newCategory = { ...subCategory };

        delete newCategory[id];

        setSubCategory(newCategory);
    };

    const submitSubCategoryDetails = async () => {
        const category1: [[string]] = category
            .filter((item: productData[]) => item.some((item) => item.selected))
            .map((item) => item.filter((item) => item.selected).map((item) => item._id));

        console.log(category1);
        let category2: [[string]] = [];
        category1.forEach((item, index1) => {
            item.forEach((item, index2) => {
                category2.push(subCategory[item].filter((item) => item.selected).map((item) => item._id));
                if (index2 == item.length - 1 && index1 == category1.length - 1) {
                    submitDetails({ subCategory: category1, subCategory1: category2 });
                }
            });
        });
    };

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

            {!categoryScreen ? (
                shop['category'] &&
                shop.category.map((item, index1) => {
                    return (
                        <View style={[MT(0.3)]} key={item._id}>
                            <WrappedText
                                text={
                                    item.subCategoryExist
                                        ? 'Sell ' + item.name + ' for'
                                        : 'Choose product you sell under ' + item.name
                                }
                            />
                            <FlatList
                                data={category[index1]}
                                horizontal={true}
                                style={{ width: getWP(10), marginTop: getHP(0.2), width: '100%' }}
                                contentContainerStyle={{ marginVertical: getHP(0.2) }}
                                //columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }: { item: productData; index: number }) => {
                                    return (
                                        <ProductCategory
                                            containerStyle={{ width: getWP(3), ...commonStyles.alcjcc, ...MH(0.2) }}
                                            item={item}
                                            onPressCategory={() => {
                                                const prodcutCategory = [...category];
                                                const currentSelected = prodcutCategory[index1][index].selected;
                                                prodcutCategory[index1][index].selected = !currentSelected;

                                                //prodcutCategory[index1].sort((item) => !item.selected);

                                                setCategory(prodcutCategory);
                                                if (item.subCategoryExist) {
                                                    if (!currentSelected) {
                                                        updateSubCategory([], item._id);
                                                    } else {
                                                        deleteSubCategory(item._id);
                                                    }
                                                }
                                            }}
                                        />
                                    );
                                }}
                            />
                            {item.subCategoryExist &&
                                category[index1] &&
                                category[index1]
                                    .filter((item) => item.selected)
                                    .map((newSubCategory, index) => {
                                        return (
                                            <View key={item._id + index.toString()}>
                                                <WrappedText
                                                    text={
                                                        'Choose product you sell under ' +
                                                        newSubCategory.name +
                                                        ' ' +
                                                        item.name
                                                    }
                                                />
                                                <LoadProductDetails
                                                    query={{ subCategoryRef: newSubCategory._id }}
                                                    data={subCategory[newSubCategory._id]}
                                                    setData={(data: productData[]) => {
                                                        updateSubCategory(data, newSubCategory._id);
                                                    }}
                                                />
                                            </View>
                                        );
                                    })}
                        </View>
                    );
                })
            ) : (
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
                                    // prodcutCategory.sort((item) => !item.selected);
                                    setData(prodcutCategory);
                                }}
                            />
                        );
                    }}
                />
            )}
            <TextButton
                text={'Submit'}
                textProps={componentProps.buttonTextProps}
                containerStyle={{ ...commonStyles.buttonContainerStyle, marginTop: getHP(0.2) }}
                onPress={() => {
                    if (categoryScreen) {
                        const selectedCategory: { categoryType: string } = data
                            .filter((item) => item.selected)
                            .map((item) => item._id);
                        if (selectedCategory.length == 0) {
                            setError('Please select atleast one category');
                        } else submitDetails(selectedCategory);
                    } else {
                        submitSubCategoryDetails();
                    }
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
