import { fs22 } from '@app/common';
import { subHeadingColor } from '@app/common/color';
import { AIC, MT } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { generalContainerStyle } from '@app/screens/components/styles/common';
import { getProductCatalogueAPI } from '@app/server/apis/catalogue/catalogue.api';
import { categoryType, IProductCatalogue, IRGetProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import { getShop, getShopCatalgoue, updateShop } from '@app/server/apis/shop/shop.api';
import { IRGetShop, IRShopUpdate, updateShopData } from '@app/server/apis/shop/shop.interface';
import { Storage, StorageItemKeys } from '@app/storage';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import CatalogueItem from './CatalogueItem';
import CataloguePopup from './CataloguePopup';

interface CatalogueProps {}

const Catalogue: React.FunctionComponent<CatalogueProps> = () => {
    //index is basically multiple parents are selected so for which parent currently we are
    //selecting child
    const [currentCatelogueIndex, setCurrentCatalogueIndex] = React.useState<number>(0);
    // All the parent catalogue or subcategory like mens, women etc
    const [parentCatalogue, setParentCatalogue] = React.useState<IProductCatalogue[]>([]);
    const [loader, setLoader] = React.useState(false);

    //all the selected catelgory
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [error, setError] = React.useState('');

    //It is basically all the child for the current item
    const [currentItem, setCurrentItem] = React.useState<IProductCatalogue[]>([]);
    const [currentSelectedIndex, setCurrentSelectedIndex] = React.useState(0);

    const [subCategory, setSubCategory] = React.useState<IProductCatalogue[][]>([]);
    const [subCategory1, setSubCategory1] = React.useState<IProductCatalogue[][][]>([]);

    const getCatalogueDetails = async (currentCatelogueIndex: number) => {
        setLoader(true);
        const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);
        const response: IRGetShop = await getShopCatalgoue({
            _id: ownerDetails.shop,
        });

        const { subCategory, subCategory1, category } = response.payload;
        // console.log('subCategory =>', subCategory);
        setParentCatalogue(category);
        setSelectedCategory(subCategory.length == 0 ? [] : subCategory[currentCatelogueIndex]);
        setSubCategory(subCategory);
        setSubCategory1(subCategory1);
        setLoader(false);
        if (response.status == 1) {
            const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
                active: true,
                parent: category[currentCatelogueIndex],
                categoryType: categoryType.SubCategory,
            });

            setCurrentItem(response1.payload);
        } else {
            setError(response.message);
        }
    };

    React.useEffect(() => {
        getCatalogueDetails(currentCatelogueIndex);
    }, []);

    return (
        <View style={[generalContainerStyle()]}>
            <View style={[AIC()]}>
                <WrappedText text="What you sell under Mens category ?" fontSize={fs22} textAlign="center" />
                <WrappedText
                    text="Select item you sell under mens cateogry by clicking on it"
                    textColor={subHeadingColor}
                />
            </View>
            <Border />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[]}>
                    {currentItem.map((item, index) => {
                        const isSelected = selectedCategory.includes(item._id);

                        return (
                            <CatalogueItem
                                item={item}
                                onPressCategory={() => {
                                    if (!isSelected) {
                                        selectedCategory.push(item._id);
                                        setSelectedCategory([...selectedCategory]);
                                        if (item.subCategoryExist) {
                                            setCurrentSelectedIndex(index + 1);
                                        }
                                    } else {
                                        setSelectedCategory([...selectedCategory.filter((id) => id != item._id)]);
                                    }
                                }}
                                //selectedItems={subCategory1[currentCatelogueIndex][index]}
                                selected={isSelected}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            <Border />
            <RightComponentButtonWithLeftText buttonText="Continue" onPress={() => {}} containerStyle={[MT(0.1)]} />
            <CataloguePopup
                subCategory={subCategory}
                subCategory1={subCategory1}
                parentCatalogue={currentItem[currentSelectedIndex - 1]}
                isVisible={currentSelectedIndex > 0 ? true : false}
                setPopup={() => {
                    setCurrentSelectedIndex(0);
                }}
                currentCatalogueIndex={currentSelectedIndex}
                currentSelectedIndex={currentCatelogueIndex}
                successCallback={getCatalogueDetails}
            />
            {loader && <Loader />}
        </View>
    );
};

export default Catalogue;
