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
import {
    categoryType,
    IRGetProductCatalogue,
    IProductCatalogue,
} from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';
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
import { fs12, fs18, fs20, NavigationProps } from '../../common';
import ProductButton from '../app/edit/product/component/ProductButton';
import { padHor, padVer } from '../app/edit/product/component/generalConfig';
import { NavigationKey } from '../../labels';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../storage';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';
import CatalogueCardVertical from './component/CatalogueCardVertical';
import Border from '../components/border/Border';
import CataloguePopup from './dukan-catalogue/CataloguePopup';
import Catalogue from './dukan-catalogue/CatalogueSelect';

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

export interface productData extends IProductCatalogue, selected {}

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
    const [showCataloguePopup, setShowCataloguePopup] = React.useState(false);

    const [selectedCategory, setSelectedCategory] = React.useState<[string[]]>([[]]);
    const [selectedSubCategory, setSelectedSubCategory] = React.useState<[string[][]]>([[]]);
    const [selectedCatalogueAddress, setSelectedCatalogueAddress] = React.useState<string>('');

    const submitDetails = async (data: updateShopData) => {
        const response: IRShopUpdate = await updateShop({
            ...data,
            _id: ownerDetails.shop,
        });
        if (response.status == 1) {
            await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, true);
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
        console.log(response.payload.category);
        if (response.status == 1) {
            setShop(response.payload);
            const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
                active: true,
                parent: { $in: response.payload.category.map((item) => item._id) },
                categoryType: categoryType.SubCategory,
            });
            console.log('response', response1.payload);
            let data: [productData[]] = [];
            response.payload.category.forEach((item, index) => {
                let data1: productData[] = response1.payload
                    .filter((subCateogry) => subCateogry.parent._id == item._id)
                    .map((item) => {
                        return { ...item, selected: false };
                    });
                data.push(data1);
                console.log(data, data1);
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

    const [index3, index4] = selectedCatalogueAddress.split('-');
    return <Catalogue />;
    // return (
    //     <ScrollView
    //         style={[{ flex: 1, paddingTop: STATUS_BAR_HEIGHT }, BGCOLOR(colorCode.WHITE)]}
    //         contentContainerStyle={{ paddingBottom: '2%' }}
    //     >
    //         <View style={[padHor]}>
    //             <HeaderText
    //                 step={undefined}
    //                 heading={'What you sell'}
    //                 subHeading={'Select what you sell under each category you selected'}
    //             />
    //             {error.length > 0 && <ServerErrorText errorText={error} />}
    //         </View>
    //         <View style={[padHor]}>
    //             <ProductButton
    //                 buttonText={'Save all'}
    //                 onPress={() => {
    //                     extractSelectedDataAndSubmitIt();
    //                 }}
    //             />
    //         </View>
    //         {shop['category'] &&
    //             shop.category.map((item, index1) => {
    //                 return (
    //                     <View style={[MT(0.1), padVer, BGCOLOR(colorCode.WHITELOW(10))]} key={item._id}>
    //                         <Border />
    //                         <View style={[FDR(), AIC(), padHor, { marginTop: 20 }]}>
    //                             <View
    //                                 style={[
    //                                     HP(0.2),
    //                                     W(getHP(0.2)),
    //                                     BR(1),
    //                                     {},
    //                                     BGCOLOR(colorCode.CHAKRALOW(10)),
    //                                     borderinsideeffect(1.5, colorCode.CHAKRALOW(30)),
    //                                 ]}
    //                             />
    //                             <WrappedText
    //                                 text={
    //                                     item.subCategoryExist
    //                                         ? 'Choose item you sell under ' + item.name + ' category.'
    //                                         : 'Choose product category you sell under ' + item.name + ''
    //                                 }
    //                                 textColor={colorCode.CHAKRALOW(90)}
    //                                 fontSize={fs18}
    //                                 containerStyle={[ML(0.2)]}
    //                             />
    //                         </View>
    //                         <ScrollView horizontal={true} style={{ paddingVertical: '2%', marginTop: 10 }}>
    //                             {item &&
    //                                 item.map((item1: productData, index: number) => {
    //                                     const selected = selectedCategory[index1].includes(item1._id);
    //                                     return (
    //                                         <CatalogueCardVertical
    //                                             containerStyle={{ width: getWP(3), ...AIC(), ...JCC(), ...MH(0.2) }}
    //                                             item={item1}
    //                                             selected={selected}
    //                                             onPressCategory={() => {
    //                                                 if (!selected) {
    //                                                     let selectedCate = [...selectedCategory];
    //                                                     selectedCate[index1].push(item1._id);
    //                                                     setSelectedCategory([...selectedCate]);
    //                                                     if (item1.subCategoryExist) {
    //                                                         setSelectedCatalogueAddress(`${index1}-${index}`);
    //                                                     }
    //                                                 }
    //                                                 // const prodcutCategory = [...category];
    //                                                 // const currentSelected = prodcutCategory[index1][index].selected;
    //                                                 // if (!currentSelected) {
    //                                                 //     setShowCataloguePopup(true);
    //                                                 // }
    //                                                 //prodcutCategory[index1][index].selected = !currentSelected;

    //                                                 //prodcutCategory[index1].sort((item) => !item.selected);

    //                                                 // setCategory(prodcutCategory);
    //                                                 // if (item.subCategoryExist) {
    //                                                 //     if (!currentSelected) {
    //                                                 //         updateSubCategory([], item._id);
    //                                                 //     } else {
    //                                                 //         deleteSubCategory(item._id);
    //                                                 //     }
    //                                                 // }
    //                                             }}
    //                                         />
    //                                     );
    //                                 })}
    //                         </ScrollView>
    //                         {/* <FlatList
    //                             data={category[index1]}
    //                             //horizontal={true}
    //                             style={{ marginTop: getHP(0.2) }}
    //                             contentContainerStyle={[PV(0.2), PH(0.2)]}
    //                             //columnWrapperStyle={{ justifyContent: 'space-evenly' }}
    //                             keyExtractor={(item) => item._id}
    //                             renderItem={({ item, index }: { item: productData; index: number }) => {
    //                                 return (
    //                                     <CatalogueCardVertical
    //                                         containerStyle={{ width: getWP(3), ...AIC(), ...JCC(), ...MH(0.2) }}
    //                                         item={item}
    //                                         onPressCategory={() => {
    //                                             const prodcutCategory = [...category];
    //                                             const currentSelected = prodcutCategory[index1][index].selected;
    //                                             prodcutCategory[index1][index].selected = !currentSelected;

    //                                             //prodcutCategory[index1].sort((item) => !item.selected);

    //                                             setCategory(prodcutCategory);
    //                                             if (item.subCategoryExist) {
    //                                                 if (!currentSelected) {
    //                                                     updateSubCategory([], item._id);
    //                                                 } else {
    //                                                     deleteSubCategory(item._id);
    //                                                 }
    //                                             }
    //                                         }}
    //                                     />
    //                                 );
    //                             }}
    //                         /> */}
    //                         {item.subCategoryExist &&
    //                             category[index1] &&
    //                             category[index1]
    //                                 .filter((item) => item.selected)
    //                                 .map((newSubCategory, index) => {
    //                                     return (
    //                                         <View key={item._id + index.toString()} style={[ML(0.2), MT(0.2)]}>
    //                                             <View style={[FDR(), AIC(), padHor]}>
    //                                                 <View
    //                                                     style={[
    //                                                         HP(0.15),
    //                                                         W(getHP(0.15)),
    //                                                         BR(1),
    //                                                         BGCOLOR(colorCode.CHAKRALOW(30)),
    //                                                         borderinsideeffect(1, colorCode.CHAKRALOW(30)),
    //                                                     ]}
    //                                                 />

    //                                                 <WrappedText
    //                                                     text={
    //                                                         'Choose product category you sell under ' +
    //                                                         newSubCategory.name +
    //                                                         ' ' +
    //                                                         item.name
    //                                                     }
    //                                                     fontSize={fs12}
    //                                                     textColor={colorCode.CHAKRALOW(90)}
    //                                                     containerStyle={[ML(0.1)]}
    //                                                 />
    //                                             </View>
    //                                             <LoadProductDetails
    //                                                 query={{ parent: newSubCategory._id, active: true }}
    //                                                 data={subCategory[newSubCategory._id]}
    //                                                 setData={(data: productData[]) => {
    //                                                     updateSubCategory(data, newSubCategory._id);
    //                                                 }}
    //                                             />
    //                                         </View>
    //                                     );
    //                                 })}
    //                     </View>
    //                 );
    //             })}
    //         <CataloguePopup
    //             title={''}
    //             isVisible={selectedCatalogueAddress.length > 0}
    //             setPopup={() => {
    //                 setSelectedCatalogueAddress('');
    //             }}
    //         />
    //     </ScrollView>
    // );
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
