import * as React from 'react';
import { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
    AIC,
    BGCOLOR,
    borderinsideeffect,
    BR,
    FDR,
    HP,
    JCC,
    MH,
    ML,
    MT,
    PH,
    provideShadow,
    PV,
    W,
} from '../../common/styles';
import { IRGetProductCatalogue, product } from '../../server/apis/productCatalogue/productCatalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/productCatalogue/productCatalogue.api';
import HeaderText from './component/HeaderText';
import { getHP, getWP } from '../../common/dimension';
import { FlatList } from 'react-native-gesture-handler';
import { IRGetShop, IRShopUpdate, Shop, updateShopData } from '../../server/apis/shop/shop.interface';
import { getShop, updateShop } from '../../server/apis/shop/shop.api';
import ProductCategory from './component/DukanProductCategory';
import ServerErrorText from './component/errorText';
import WrappedText from '../component/WrappedText';
import { colorCode } from '../../common/color';
import LoadProductDetails from './component/LoadProductDetails';
import { fs12, fs20, NavigationProps } from '../../common';
import ProductButton from '../app/edit/product/component/ProductButton';
import { padHor, padVer } from '../app/edit/product/component/generalConfig';
import { NavigationKey } from '../../labels';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../storage';

export interface ProductSubCategory extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

interface selected {
    selected: boolean;
}

export interface productData extends product, selected {}

const ProductSubCategory: React.SFC<ProductSubCategory> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');
    const [shop, setShop] = React.useState<Partial<Shop>>({});
    const [category, setCategory] = React.useState<[productData[]]>([[]]);
    const [subCategory, setSubCategory] = React.useState<{ [key: string]: productData[] }>({});

    const submitDetails = async (data: updateShopData) => {
        const response: IRShopUpdate = await updateShop({
            ...data,
            _id: ownerDetails.shop,
        });
        if (response.status == 1) {
            await Storage.setItem(StorageItemKeys.isSignupCompleted, true);
            await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.PRODUCTSUBCATEGORY);
            navigation.replace(NavigationKey.BHARATBAZARHOME);
        } else {
            setError(response.message);
        }
    };

    const fetchProductDetails = async (data: Object) => {
        const response: IRGetProductCatalogue = await getProductCatalogueAPI(data);
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
        let response: IRGetShop = await getShop({
            _id: ownerDetails.shop,
        });
        if (response.status == 1) {
            setShop(response.payload);
            const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
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

    const extractSelectedDataAndSubmitIt: Function = () => {
        const subC = category.map((item) => {
            return item
                .filter((sub) => sub.selected)
                .map((subc) => {
                    return subc._id;
                });
        });

        const subC1 = subC.map((item) =>
            item.map((id) => {
                if (subCategory[id] && subCategory[id].length > 0) {
                    return subCategory[id].filter((subc1) => subc1.selected).map((subc1) => subc1._id);
                } else {
                    return [];
                }
            }),
        );
        submitDetails({ subCategory: subC, subCategory1: subC1 });
    };

    useEffect(() => {
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
        <ScrollView style={[{ flex: 1 }, BGCOLOR(colorCode.WHITE)]} contentContainerStyle={{ paddingBottom: '2%' }}>
            <View style={[padHor]}>
                <HeaderText
                    step={'Step 5'}
                    heading={'Aap kya bechte hai detail mai batae'}
                    subHeading={'Select what services you provide by your dukan by clicking on the category'}
                />
                {error.length > 0 && <ServerErrorText errorText={error} />}
            </View>
            <View style={[padHor]}>
                <ProductButton
                    buttonText={'Save all'}
                    onPress={() => {
                        extractSelectedDataAndSubmitIt();
                    }}
                />
            </View>
            {shop['category'] &&
                shop.category.map((item, index1) => {
                    return (
                        <View
                            style={[MT(0.3), padVer, BGCOLOR(colorCode.WHITELOW(10)), provideShadow(2)]}
                            key={item._id}
                        >
                            <View style={[FDR(), AIC(), padHor]}>
                                <View
                                    style={[
                                        HP(0.2),
                                        W(getHP(0.2)),
                                        BR(1),
                                        {},
                                        BGCOLOR(colorCode.CHAKRALOW(10)),
                                        borderinsideeffect(1.5, colorCode.CHAKRALOW(30)),
                                    ]}
                                />
                                <WrappedText
                                    text={
                                        item.subCategoryExist
                                            ? 'Sell ' + item.name + ' for '
                                            : 'Choose product category you sell under ' + item.name + ''
                                    }
                                    textColor={colorCode.CHAKRALOW(90)}
                                    fontSize={fs20}
                                    containerStyle={[ML(0.2)]}
                                />
                            </View>

                            <FlatList
                                data={category[index1]}
                                horizontal={true}
                                style={{ width: getWP(10), marginTop: getHP(0.2) }}
                                contentContainerStyle={[PV(0.2), PH(0.2)]}
                                //columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }: { item: productData; index: number }) => {
                                    return (
                                        <ProductCategory
                                            containerStyle={{ width: getWP(3), ...AIC(), ...JCC(), ...MH(0.2) }}
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
                                            <View key={item._id + index.toString()} style={[ML(0.2), MT(0.2)]}>
                                                <View style={[FDR(), AIC(), padHor]}>
                                                    <View
                                                        style={[
                                                            HP(0.15),
                                                            W(getHP(0.15)),
                                                            BR(1),
                                                            BGCOLOR(colorCode.CHAKRALOW(30)),
                                                            borderinsideeffect(1, colorCode.CHAKRALOW(30)),
                                                        ]}
                                                    />

                                                    <WrappedText
                                                        text={
                                                            'Choose product category you sell under ' +
                                                            newSubCategory.name +
                                                            ' ' +
                                                            item.name
                                                        }
                                                        fontSize={fs12}
                                                        textColor={colorCode.CHAKRALOW(90)}
                                                        containerStyle={[ML(0.1)]}
                                                    />
                                                </View>
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
                })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    productCategory: {
        ...BR(0.05),
        ...AIC(),
        ...JCC(),

        backgroundColor: colorCode.WHITE,
        borderColor: colorCode.GREENLOW(50),
        flex: 1,
        paddingVertical: '2%',
        marginHorizontal: '5%',
        marginVertical: '3%',
    },
});

export default ProductSubCategory;
