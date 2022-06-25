import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AIC, BGCOLOR, BR, DSP, JCC, MT, PH } from '../../common/styles';
import {
    categoryType,
    IProductCatalogue,
    IRGetProductCatalogue,
} from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';

import { IRGetShopCatalogue, IRShopUpdate, updateShopData } from '../../server/apis/shop/shop.interface';
import { getShopCatalgoue, updateShop } from '../../server/apis/shop/shop.api';

import { colorCode, mainColor, subHeadingColor } from '../../common/color';
import { FontFamily, fs16, fs20, NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';

import WrappedText from '../component/WrappedText';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import Border from '../components/border/Border';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';

import { Storage, StorageItemKeys } from '@app/storage';
import Loader from '../component/Loader';
import CatalogueItem from './dukan-catalogue/CatalogueItem';
import { defaultAlertState, IdefaultAlertState } from '@app/hooks/useAlert';
import { AlertContext } from '@app/../App';
import { showMessage } from 'react-native-flash-message';
import Catalogue from './dukan-catalogue/CatalogueSelect';
import { NavigationKey } from '@app/labels';
import { GENERAL_PADDING, MTA, PHA, PTA, PVA } from '@app/common/stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import { getId } from '@app/common/helper';
import CatalogueCardVertical from './component/CatalogueCardVertical';
import ItemsYouSell from './dukan-catalogue/ItemsYouSell';
import HeaderWithBackButtonTitleAndrightButton from '../components/header/HeaderWithBackButtonTitleAndrightButton';

export interface ProductDetail extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

interface selected {}

export interface productData extends IProductCatalogue, selected {}

const ProductDetails: React.SFC<ProductDetail> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');
    const [loader, setLoader] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    //Selected current catalogue by a shop

    const [subCategory, setSubCategory] = React.useState<string[][]>([]);
    const [subCategory1, setSubCategory1] = React.useState<string[][][]>([]);
    const [currentCatelogueIndex, setCurrentCatalogueIndex] = React.useState<number>(0);

    //Current selected item from the child category
    const [currentSelectedIndex, setCurrentSelectedIndex] = React.useState(0);

    const setAlertState: (data: IdefaultAlertState) => void = React.useContext(AlertContext);

    const submitDetails = async (data: updateShopData) => {
        setLoader(true);

        const response: IRShopUpdate = await updateShop({
            ...data,
            _id: ownerDetails.shop,
        });
        setLoader(false);
        if (response.status == 1) {
            showMessage({
                message: 'Dukan catalogue updated',
                type: 'success',
            });
            //  navigation.navigate(NavigationKey.PRODUCTSUBCATEGORY, { ownerDetails: ownerDetails });
        } else {
            setError(response.message);
        }
    };

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

    //While updating full subCategory and subCategory1 is going
    //So we have to carefully update index
    const updateCatalogueDetails = async (data?: updateShopData) => {
        setLoader(true);
        const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);
        let datasend = data
            ? { ...data, _id: ownerDetails.shop }
            : {
                  category: [...selectedCategory],
                  subCategory1: [...subCategory1],
                  subCategory: [...subCategory],
                  _id: ownerDetails.shop,
              };

        const response: IRShopUpdate = await updateShop(datasend);

        if (response.status == 1) {
            setLoader(false);
        } else {
            setLoader(false);
            setError(response.message);
        }
    };

    const fetchProductDetails = async (data: Partial<IProductCatalogue>) => {
        setLoader(true);
        const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

        //getting all the current selected catalogue of an shop with the parent catalogue or top
        //category populated
        const response1: IRGetShopCatalogue = await getShopCatalgoue({
            _id: ownerDetails.shop,
        });
        const { category, subCategory, subCategory1 } = response1.payload;
        setSelectedCategory([...category]);

        if (subCategory.length > 0) setSubCategory([...subCategory]);
        if (subCategory1.length > 0) setSubCategory1([...subCategory1]);

        const response: IRGetProductCatalogue = await getProductCatalogueAPI(data);
        if (response.status == 1) {
            response.payload.sort((a: IProductCatalogue, b: IProductCatalogue) => sortFunction(a, b, category));

            setData([...response.payload]);

            setLoader(false);
        } else {
            setError(response.message);
            setLoader(false);
        }
    };

    useEffect(() => {
        //   updateCatalogueDetails({ category: [], subCategory: [], subCategory1: [] });
        fetchProductDetails({ categoryType: categoryType.Category, active: true });
        //getShopDetails();
        StatusBar.setBarStyle('light-content');

        return () => {};
    }, []);

    const selectedCategoryLength = React.useRef<number>(0);
    React.useEffect(() => {
        if (selectedCategory.length > selectedCategoryLength.current) {
            selectedCategoryLength.current = selectedCategory.length;
        } else if (selectedCategory.length < selectedCategoryLength.current) {
            updateCatalogueDetails();
            selectedCategoryLength.current = selectedCategory.length;
        }
    }, [selectedCategory]);
    const onePressDelete = (id: string, subCategoryExist: boolean) => {
        setAlertState(defaultAlertState);
        const indexInSelectedArray = selectedCategory.findIndex((_id) => id == _id);
        if (subCategory.length >= indexInSelectedArray + 1) {
            setSubCategory((subCategory) => {
                let sc = subCategory.filter((item, indx) => indexInSelectedArray != indx);
                return [...sc];
            });
        }
        if (subCategoryExist && subCategory1.length >= indexInSelectedArray + 1) {
            setSubCategory1((subCategory1) => {
                let sc = subCategory1.filter((item, indx) => indexInSelectedArray != indx);

                return [...sc];
            });
        }
        setSelectedCategory((selectedCategory) => {
            let sc = selectedCategory.filter((_id) => _id != id);
            return [...sc];
        });
    };

    const provideChildren = (currentSelectedIndex: number, items: IProductCatalogue[]) => {
        return subCategory && subCategory.length >= currentSelectedIndex && subCategory[currentSelectedIndex]
            ? items.filter((item) => subCategory[currentSelectedIndex].includes(item._id))
            : [];
    };

    const [currentIndex, setCurrentIndex] = React.useState(1);

    const onChange = ({ nativeEvent }) => {
        const active = Math.floor(nativeEvent.contentOffset.x / 200) + 1;

        if (active !== currentIndex && active != 0) setCurrentIndex(active);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FDFDFF' }}>
            <View style={[BGCOLOR(mainColor), PVA(), AIC(), PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING)]}>
                <WrappedText
                    text={'Select Category'}
                    fontSize={fs20}
                    textColor={'#ffffff'}
                    textAlign="center"
                    fontFamily={FontFamily.Medium}
                />
            </View>
            <ScrollView style={{}}>
                <View style={[MT(0.1)]} />
                <ItemsYouSell items={data} />

                <Border marginTop={0} />

                <View style={[PHA(), MTA()]}>
                    <WrappedText text={'Select item you sell'} fontSize={fs16} fontFamily={FontFamily.Medium} />
                    <WrappedText
                        text={
                            'Select category in which you sell your dukan product in the market.'
                            //    For example if you sell anything that is used by mens select men as category. same for women if you sell anything that does not comes under any men or women category select other. If you sell multiple items in different category select more then one. '
                        }
                        textColor={subHeadingColor}
                    />
                    <View style={[MTA()]} />
                    {data.map((item, index) => {
                        const isSelected = selectedCategory.includes(item._id);
                        const indx = selectedCategory.findIndex((id) => id == item._id);
                        const currentIndex = indx == -1 ? selectedCategory.length : indx;
                        return (
                            <CatalogueItem
                                key={item._id + index.toString()}
                                item={item}
                                selected={isSelected}
                                containerStyle={styles.productCategory}
                                onPressEdit={() => {
                                    setCurrentCatalogueIndex(index);
                                    setCurrentSelectedIndex(currentIndex + 1);
                                }}
                                children={isSelected && item.subCategoryExist ? provideChildren(indx, item.child) : []}
                                onPressCategory={() => {
                                    if (!isSelected) {
                                        if (item.subCategoryExist) {
                                            setCurrentCatalogueIndex(index);
                                            setCurrentSelectedIndex(currentIndex + 1);
                                        } else {
                                        }
                                    } else {
                                        if (
                                            subCategory.length >= currentIndex + 1 &&
                                            subCategory[currentIndex].length > 0
                                        ) {
                                            setAlertState({
                                                isVisible: true,
                                                heading: 'Remove ' + item.name + ' catalogue',
                                                subHeading:
                                                    'Are you sure you want to remove ' +
                                                    item.name +
                                                    ' catalogue' +
                                                    ' from your shop it will delete all your saved data under this catalogue?',
                                                onPressRightButton: () => {
                                                    onePressDelete(item._id, item.subCategoryExist);
                                                },
                                            });
                                        } else {
                                            onePressDelete(item._id, item.subCategoryExist);
                                        }
                                    }
                                }}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            <Border />
            <RightComponentButtonWithLeftText
                buttonText={'Continue'}
                onPress={async () => {
                    await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, true);
                    await Storage.setItem(StorageItemKeys.currentScreen, false);
                    navigation.replace(NavigationKey.BHARATBAZARHOME);
                }}
                containerStyle={{ margin: DSP }}
            />
            <Catalogue
                isVisible={currentSelectedIndex > 0 ? true : false}
                setPopup={() => {
                    setCurrentSelectedIndex(0);
                }}
                subCategory={
                    subCategory.length >= currentSelectedIndex
                        ? subCategory[currentSelectedIndex - 1]
                            ? [...subCategory[currentSelectedIndex - 1]]
                            : []
                        : []
                }
                subCategory1={
                    subCategory1.length >= currentSelectedIndex
                        ? subCategory1[currentSelectedIndex - 1]
                            ? [...subCategory1[currentSelectedIndex - 1]]
                            : [[]]
                        : [[]]
                }
                parentCatalogue={data[currentCatelogueIndex]}
                successCallback={(selected: boolean, subCat: string[], subCate1: [string[]]) => {
                    if (selected) {
                        if (subCat)
                            setSubCategory((sc) => {
                                if (subCategory.length >= currentSelectedIndex)
                                    sc[currentSelectedIndex - 1] = subCat || [];
                                else {
                                    sc.push(subCat);
                                }

                                return [...sc];
                            });
                        if (subCate1)
                            setSubCategory1((sc1) => {
                                if (subCategory1.length >= currentSelectedIndex) {
                                    sc1[currentSelectedIndex - 1] = subCate1 || [[]];
                                } else {
                                    sc1.push(subCate1);
                                }
                                return [...sc1];
                            });

                        const currentSelectedItem = selectedCategory.find(
                            (item) => item == data[currentCatelogueIndex]._id,
                        );

                        if (currentSelectedItem) {
                            setCurrentSelectedIndex(0);
                            updateCatalogueDetails();
                        } else {
                            setSelectedCategory((c) => {
                                c.push(data[currentCatelogueIndex]._id);
                                return [...c];
                            });
                            setCurrentSelectedIndex(0);
                            updateCatalogueDetails();
                        }
                    } else {
                        setCurrentSelectedIndex(0);
                    }
                }}
            />
            {loader && <Loader />}
        </View>
    );
};

const styles = StyleSheet.create({
    productCategory: {
        ...BR(0.05),
        ...AIC(),
        ...JCC(),

        backgroundColor: colorCode.WHITE,

        flex: 1,
        paddingVertical: '2%',
        marginTop: 15,
        paddingHorizontal: '5%',
    },
});

export default ProductDetails;
