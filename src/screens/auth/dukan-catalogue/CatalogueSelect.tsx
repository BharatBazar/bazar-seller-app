import { fs14 } from '@app/common';
import { subHeadingColor } from '@app/common/color';
import { BGCOLOR, FDR, FLEX, JCC, ML, MT, provideShadow } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { generalContainerStyle } from '@app/screens/components/styles/common';
import { getProductCatalogueAPI } from '@app/server/apis/catalogue/catalogue.api';
import { categoryType, IProductCatalogue, IRGetProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import { getShopCatalgoue } from '@app/server/apis/shop/shop.api';
import { IRGetShopCatalogue } from '@app/server/apis/shop/shop.interface';
import { Storage, StorageItemKeys } from '@app/storage';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CatalogueItem from './CatalogueItem';
import CataloguePopup from './CataloguePopup';

interface CatalogueProps {}

const Catalogue: React.FunctionComponent<CatalogueProps> = () => {
    //index is basically multiple parents are selected so for which parent currently we are
    //selecting child
    const [currentCatelogueIndex, setCurrentCatalogueIndex] = React.useState<number>(0);

    // All the parent catalogue or subcategory like mens, women etc
    const [parentCatalogue, setParentCatalogue] = React.useState<IProductCatalogue[]>([]);

    //loader function
    const [loader, setLoader] = React.useState(false);

    //all the selected catelgory in this particular catalogue
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [error, setError] = React.useState('');

    //It is basically all the child for the current selected or top category item
    const [currentItem, setCurrentItem] = React.useState<IProductCatalogue[]>([]);

    //Current selected item from the child category
    const [currentSelectedIndex, setCurrentSelectedIndex] = React.useState(0);

    //Selected current catalogue by a shop
    const [subCategory, setSubCategory] = React.useState<string[][]>([]);
    const [subCategory1, setSubCategory1] = React.useState<string[][][]>([]);

    const getCatalogueDetails = async (currentCatelogueIndex: number) => {
        setLoader(true);
        const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

        //getting all the current selected catalogue of an shop with the parent catalogue or top
        //category populated
        const response: IRGetShopCatalogue = await getShopCatalgoue({
            _id: ownerDetails.shop,
        });

        const { subCategory, subCategory1, category } = response.payload;
        console.log(
            'catalogue =>',
            currentCatelogueIndex,
            subCategory,
            subCategory1,
            currentCatelogueIndex || subCategory.length == 0 || currentCatelogueIndex + 1 > subCategory.length
                ? []
                : subCategory[currentCatelogueIndex],
        );
        setParentCatalogue(category);
        setSelectedCategory(
            typeof currentCatelogueIndex != 'number' || currentCatelogueIndex + 1 > subCategory.length
                ? []
                : subCategory[currentCatelogueIndex],
        );
        setSubCategory(subCategory);
        setSubCategory1(subCategory1);

        if (response.status == 1) {
            const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
                active: true,
                parent: category[currentCatelogueIndex]._id,
                categoryType: categoryType.SubCategory,
            });

            setCurrentItem(response1.payload);
            setLoader(false);
        } else {
            setError(response.message);
            setLoader(false);
        }
    };

    const provideChildren = (currentSelectedIndex: number, items: IProductCatalogue[]) => {
        if (
            subCategory1 &&
            typeof currentCatelogueIndex == 'number' &&
            subCategory1.length >= currentCatelogueIndex + 1 &&
            subCategory1[currentCatelogueIndex].length >= currentSelectedIndex + 1
        ) {
            return items.filter((item) => subCategory1[currentCatelogueIndex][currentSelectedIndex].includes(item._id));
        }
    };
    React.useEffect(() => {
        getCatalogueDetails(currentCatelogueIndex);
    }, [currentCatelogueIndex]);

    const currentCatalogue: IProductCatalogue | {} =
        parentCatalogue.length > 0 ? parentCatalogue[currentCatelogueIndex] : {};
    return (
        <View style={[generalContainerStyle()]}>
            <View style={[]}>
                <View style={[FDR()]}>
                    <WrappedFeatherIcon
                        onPress={() => {}}
                        iconName="chevron-left"
                        containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(1)]}
                    />

                    {currentCatalogue && (
                        <FastImage
                            source={{ uri: currentCatalogue.image }}
                            style={{ height: 50, width: 50, marginLeft: 20 }}
                        />
                    )}
                    <View style={[ML(0.6), FLEX(1)]}>
                        <WrappedText
                            text={'What you sell under ' + currentCatalogue.name + ' category ?'}
                            fontSize={fs14}
                        />
                        <WrappedText
                            text={'Select item you sell under ' + currentCatalogue.name + ' cateogry by clicking on it'}
                            textColor={subHeadingColor}
                        />
                    </View>
                </View>
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
                                onPressEdit={() => {
                                    setCurrentSelectedIndex(index + 1);
                                }}
                                selected={isSelected}
                                children={provideChildren(index, item.child)}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            <Border />
            <View style={[FDR(), JCC('space-between')]}>
                <RightComponentButtonWithLeftText
                    buttonText="Prev"
                    onPress={() => {
                        setCurrentCatalogueIndex((index) => index - 1);
                    }}
                    containerStyle={[MT(0.2)]}
                    // rightComponent={() => (
                    //     <WrappedFeatherIcon onPress={() => {}} iconName="chevron-left" iconSize={20} />
                    // )}
                />
                <RightComponentButtonWithLeftText
                    buttonText="Continue"
                    onPress={() => {
                        setCurrentCatalogueIndex((index) => index + 1);
                    }}
                    containerStyle={[MT(0.2)]}
                    // rightComponent={() => (
                    //     <WrappedFeatherIcon onPress={() => {}} iconName="chevron-right" iconSize={20} />
                    // )}
                />
            </View>
            <CataloguePopup
                subCategory={subCategory}
                subCategory1={subCategory1}
                parentCatalogue={currentItem[currentSelectedIndex - 1]}
                isVisible={currentSelectedIndex > 0 ? true : false}
                setPopup={() => {
                    setCurrentSelectedIndex(0);
                }}
                currentSelectedIndex={currentSelectedIndex - 1}
                currentCatalogueIndex={currentCatelogueIndex}
                successCallback={() => {
                    setCurrentCatalogueIndex((index) => index + 1);
                }}
                failureCallback={() => {
                    setSelectedCategory([
                        ...selectedCategory.filter((item) => item != currentItem[currentSelectedIndex - 1]._id),
                    ]);
                }}
                childrenAvailable={
                    subCategory1 &&
                    typeof currentCatelogueIndex == 'number' &&
                    subCategory1.length >= currentCatelogueIndex + 1 &&
                    subCategory1[currentCatelogueIndex].length >= currentSelectedIndex
                }
            />
            {loader && <Loader />}
        </View>
    );
};

export default Catalogue;
