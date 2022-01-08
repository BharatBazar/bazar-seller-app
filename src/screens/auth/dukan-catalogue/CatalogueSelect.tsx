import { fs14 } from '@app/common';
import { subHeadingColor } from '@app/common/color';
import { BGCOLOR, BTR, DSP, FDR, FLEX, JCC, ML, MT, PA, provideShadow } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { FlashErrorMessageType } from '@app/screens/components/datatype/flastErrorMessage';
import { generalContainerStyle } from '@app/screens/components/styles/common';
import ModalHOC from '@app/screens/hoc/ModalHOC';
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

interface CatalogueProps {
    isVisible: boolean;
    setPopup: Function;
    parentCatalogue: IProductCatalogue;
    subCategory1: string[][];
    subCategory: string[];
    successCallback: Function;
}

const Catalogue: React.FunctionComponent<CatalogueProps> = ({
    isVisible,
    setPopup,
    parentCatalogue,
    subCategory,
    subCategory1,
    successCallback,
}) => {
    // All the parent catalogue or subcategory like mens, women etc
    // const [parentCatalogue, setParentCatalogue] = React.useState<IProductCatalogue[]>([]);

    //loader function
    const [loader, setLoader] = React.useState(false);

    //all the selected catelgory in this particular catalogue
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [error, setError] = React.useState('');

    //It is basically all the child for the current selected or top category item
    const [currentItem, setCurrentItem] = React.useState<IProductCatalogue[]>([]);

    //Current selected item from the child category
    const [currentSelectedIndex, setCurrentSelectedIndex] = React.useState(0);
    const [currentCatalogueIndex, setCurrentCatalogueIndex] = React.useState(0);

    const modalRef = React.useRef<null | FlashErrorMessageType>(null);

    const sortFunction = (a: IProductCatalogue, b: IProductCatalogue, selectedCategory: string[]) => {
        const indexOfA = selectedCategory.findIndex((item) => item == a._id);
        const indexOfB = selectedCategory.findIndex((item) => item == b._id);
        console.log(indexOfA, indexOfB, selectedCategory);
        if (indexOfA == -1 && indexOfB == -1) {
            return 0;
        } else if (indexOfA > -1 && indexOfB > -1) {
            if (indexOfA < indexOfB) {
                return -1;
            } else if (indexOfA == indexOfB) {
                return 0;
            } else {
                return 1;
            }
        } else if (indexOfA > -1 && indexOfB == -1) {
            return -1;
        } else if (indexOfB > -1 && indexOfA == -1) {
            return 1;
        }
    };

    const getCatalogueDetails = async () => {
        setLoader(true);

        setSelectedCategory(subCategory ? subCategory : []);
        const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
            active: true,
            parent: parentCatalogue._id,
            categoryType: categoryType.SubCategory,
        });
        console.log(response1.payload);
        if (response1.status == 1) {
            response1.payload.sort((a, b) => sortFunction(a, b, subCategory ? subCategory : []));
            setCurrentItem(response1.payload);
            setLoader(false);
        } else {
            setError(response1.message);
            setLoader(false);
        }
    };

    const provideChildren = (currentSelectedIndex: number, items: IProductCatalogue[]) => {
        return subCategory1 ? items.filter((item) => subCategory1[currentSelectedIndex].includes(item._id)) : [];
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
        setSelectedCategory([...selectedCategory.filter((_id) => _id != id)]);
    };

    React.useEffect(() => {
        if (isVisible) getCatalogueDetails();
    }, [isVisible]);

    console.log('sub Categpory 1 =>', subCategory1);

    const currentCatalogue: IProductCatalogue | { name: string; image: '' } = parentCatalogue
        ? parentCatalogue
        : { name: '', image: '' };
    return (
        <ModalHOC
            refer={(ref) => (modalRef.current = ref)}
            isVisible={isVisible}
            setPopup={() => {
                successCallback(false);
            }}
            showErrorMessage={error}
        >
            <View style={[BGCOLOR('#FFFFFF'), PA(DSP), BTR(20), { overflow: 'hidden' }]}>
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
                                text={
                                    'Select item you sell under ' +
                                    currentCatalogue.name +
                                    ' cateogry by clicking on it'
                                }
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
                            let indx = selectedCategory.findIndex((id) => id == item._id);
                            indx = indx == -1 ? selectedCategory.length : indx;
                            console.log('isSelected', isSelected);
                            return (
                                <CatalogueItem
                                    item={item}
                                    onPressCategory={() => {
                                        if (!isSelected) {
                                            if (item.subCategoryExist) {
                                                setCurrentSelectedIndex(index);
                                                setCurrentSelectedIndex(indx + 1);
                                            } else {
                                                setSelectedCategory((sC) => {
                                                    sC.push(item._id);

                                                    return [...sC];
                                                });
                                            }
                                        } else {
                                            deleteCatalogue(indx, item._id);
                                        }
                                    }}
                                    onPressEdit={
                                        item.subCategoryExist
                                            ? () => {
                                                  setCurrentSelectedIndex(index);
                                                  setCurrentSelectedIndex(indx + 1);
                                              }
                                            : undefined
                                    }
                                    selected={isSelected}
                                    children={
                                        isSelected && item.subCategoryExist ? provideChildren(indx, item.child) : []
                                    }
                                />
                            );
                        })}
                    </View>
                </ScrollView>
                <Border />
                <View style={[FDR(), JCC('space-between')]}>
                    {/* {currentCatelogueIndex > 0 ? (
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
                    )} */}
                    <RightComponentButtonWithLeftText
                        buttonText="Continue"
                        onPress={() => {
                            if (selectedCategory.length == 0) {
                                showMessage({ message: 'Please select atleast one category', type: 'danger' });
                            } else {
                                successCallback(true, selectedCategory, subCategory1);
                            }
                        }}
                        containerStyle={[MT(0.2)]}
                        // rightComponent={() => (
                        //     <WrappedFeatherIcon onPress={() => {}} iconName="chevron-right" iconSize={20} />
                        // )}
                    />
                </View>
                <CataloguePopup
                    parentCatalogue={currentItem[currentCatalogueIndex]}
                    isVisible={currentSelectedIndex > 0 ? true : false}
                    setPopup={() => {
                        setCurrentSelectedIndex(0);
                    }}
                    alreadySelectedCategory={
                        subCategory1 && subCategory1.length >= currentSelectedIndex
                            ? subCategory1[currentSelectedIndex - 1]
                            : []
                    }
                    successCallback={(selected: boolean, selectedSubCategory: string[]) => {
                        if (selected) {
                            subCategory1[currentSelectedIndex - 1] = selectedSubCategory;
                            const currentSelectedItem = selectedCategory.find(
                                (item) => item == currentItem[currentCatalogueIndex]._id,
                            );
                            console.log('current sele', currentSelectedItem);
                            if (!currentSelectedItem) {
                                setSelectedCategory((selectedCategory) => {
                                    selectedCategory.push(currentItem[currentCatalogueIndex]._id);
                                    return selectedCategory;
                                });
                                setCurrentSelectedIndex(0);
                            } else {
                                //setSelectedCategory((selectedCategory) => selectedCategory);
                                setCurrentSelectedIndex(0);
                            }
                        } else {
                            setCurrentSelectedIndex(0);
                        }
                    }}
                />
                {loader && <Loader />}
            </View>
        </ModalHOC>
    );
};

export default Catalogue;
