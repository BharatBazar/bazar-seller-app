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
import { getShopCatalgoue, updateShop } from '@app/server/apis/shop/shop.api';
import { IRGetShopCatalogue, IRShopUpdate, updateShopData } from '@app/server/apis/shop/shop.interface';
import { Storage, StorageItemKeys } from '@app/storage';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { showMessage } from 'react-native-flash-message';
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

        setParentCatalogue(category);
        setSelectedCategory(
            typeof currentCatelogueIndex != 'number' || currentCatelogueIndex + 1 > subCategory.length
                ? []
                : [...subCategory[currentCatelogueIndex]],
        );
        setSubCategory([...subCategory]);
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

    //While updating full subCategory and subCategory1 is going
    //So we have to carefully update index
    const updateCatalogueDetails = async (data: updateShopData) => {
        setLoader(true);
        const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

        const response: IRShopUpdate = await updateShop({
            ...data,
            _id: ownerDetails.shop,
        });

        if (response.status == 1) {
            setLoader(false);
        } else {
            setLoader(false);
            setError(response.message);
        }
    };

    const deleteCatalogue = async (index: number, id: string) => {
        if (subCategory.length >= currentCatelogueIndex + 1) {
            if (subCategory[currentCatelogueIndex].length >= index + 1) {
                subCategory[currentCatelogueIndex].splice(index, 1);

                let b = [];

                if (
                    subCategory1.length >= currentCatelogueIndex + 1 &&
                    subCategory1[currentCatelogueIndex].length >= index + 1
                ) {
                    subCategory1[currentCatelogueIndex].splice(index, 1);
                }

                await updateCatalogueDetails({ subCategory: subCategory, subCategory1: subCategory1 });
                setSelectedCategory([...selectedCategory.filter((_id) => _id != id)]);
                setSubCategory(subCategory);
                setSubCategory1(subCategory1);
            }
        }
    };

    React.useEffect(() => {
        getCatalogueDetails(currentCatelogueIndex);
    }, [currentCatelogueIndex]);

    console.log(parentCatalogue);

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
                                        } else {
                                            var a = [...subCategory];

                                            if (a.length < currentCatelogueIndex + 1) {
                                                a.push([item._id]);
                                            } else {
                                                a[currentCatelogueIndex].push(item._id);
                                            }
                                            updateCatalogueDetails({ subCategory: a });
                                        }
                                    } else {
                                        deleteCatalogue(index, item._id);
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
                {currentCatelogueIndex > 0 ? (
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
                ) : (
                    <View />
                )}
                <RightComponentButtonWithLeftText
                    buttonText="Continue"
                    onPress={() => {
                        if (selectedCategory.length == 0) {
                            showMessage({ message: 'Please select atleast one category', type: 'danger' });
                        } else setCurrentCatalogueIndex((index) => index + 1);
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
                    getCatalogueDetails(currentCatelogueIndex);
                    // setCurrentCatalogueIndex((index) => index + 1);
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
