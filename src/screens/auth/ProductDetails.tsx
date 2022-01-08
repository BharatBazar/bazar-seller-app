import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AIC, BR, DSP, JCC, MT, PH } from '../../common/styles';
import {
    categoryType,
    IProductCatalogue,
    IRGetProductCatalogue,
} from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';

import { IRGetShopCatalogue, IRShopUpdate, updateShopData } from '../../server/apis/shop/shop.interface';
import { getShopCatalgoue, updateShop } from '../../server/apis/shop/shop.api';
import ProductCategory from './component/DukanProductCategory';
import { colorCode, subHeadingColor } from '../../common/color';
import { FontFamily, fs20, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';

import WrappedText from '../component/WrappedText';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import Border from '../components/border/Border';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';
import { ToastHOC } from '../hoc/ToastHOC';
import { Storage, StorageItemKeys } from '@app/storage';
import Loader from '../component/Loader';
import CatalogueItem from './dukan-catalogue/CatalogueItem';
import { defaultAlertState, IdefaultAlertState } from '@app/hooks/useAlert';
import { AlertContext } from '@app/../App';
import { showMessage } from 'react-native-flash-message';
import Catalogue from './dukan-catalogue/CatalogueSelect';

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
            category: selectedCategory,
            subCategory1,
            subCategory,
            _id: ownerDetails.shop,
        });
        setLoader(false);
        if (response.status == 1) {
            navigation.navigate(NavigationKey.PRODUCTSUBCATEGORY, { ownerDetails: ownerDetails });
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
        console.log('First time');
        fetchProductDetails({ categoryType: categoryType.Category, active: true });
        //getShopDetails();

        return () => {};
    }, []);

    console.log(subCategory, subCategory1, selectedCategory);

    const onePressDelete = (index: number, id: string) => {
        setAlertState(defaultAlertState);
        const indexInSelectedArray = selectedCategory.findIndex((_id) => id == _id);
        console.log(indexInSelectedArray, selectedCategory, subCategory, subCategory1);
        if (subCategory.length >= indexInSelectedArray + 1) {
            setSubCategory((subCategory) => [...subCategory.filter((item, indx) => indexInSelectedArray != indx)]);
        }
        if (subCategory1.length >= indexInSelectedArray + 1) {
            setSubCategory1((subCategory1) => [...subCategory1.filter((item, indx) => indexInSelectedArray != indx)]);
        }
        setSelectedCategory((selectedCategory) => [...selectedCategory.filter((_id) => _id != id)]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: STATUS_BAR_HEIGHT }}>
            <View style={[MT(0.1)]} />
            <View style={{ paddingHorizontal: '5%', paddingVertical: '2%' }}>
                <WrappedText
                    text={'In which category does your dukan exist?'}
                    fontSize={fs20}
                    textAlign="center"
                    fontFamily={FontFamily.Medium}
                />
                <WrappedText
                    text={
                        'select category in which you sell your dukan product in the market. For example if you sell anything that is used by mens select men as category. same for women if you sell anything that does not comes under any men or women category select other. If you sell multiple items in different category select more then one. '
                    }
                    textAlign="center"
                    containerStyle={[MT(0.15)]}
                    textColor={subHeadingColor}
                />
            </View>

            <Border />

            <ScrollView style={{}} contentContainerStyle={[PH(0.4)]}>
                {data.map((item, index) => {
                    const isSelected = selectedCategory.includes(item._id);

                    return (
                        <CatalogueItem
                            item={item}
                            selected={isSelected}
                            containerStyle={styles.productCategory}
                            onPressEdit={() => {}}
                            onPressCategory={() => {
                                if (!isSelected) {
                                    if (item.subCategoryExist) {
                                        setCurrentSelectedIndex(index + 1);
                                    } else {
                                        var a = [...subCategory];

                                        if (a.length < index + 1) {
                                            a.push([item._id]);
                                        } else {
                                            a[index].push(item._id);
                                        }
                                        updateCatalogueDetails({ category: a });
                                    }
                                } else {
                                    if (subCategory.length >= index + 1 && subCategory[index].length > 0) {
                                        setAlertState({
                                            isVisible: true,
                                            heading: 'Remove ' + item.name + ' catalogue',
                                            subHeading:
                                                'Are you sure you want to remove ' +
                                                item.name +
                                                ' catalogue' +
                                                ' from your shop it will delete all your saved data under this catalogue?',
                                            onPressRightButton: () => {
                                                onePressDelete(index, item._id);
                                            },
                                        });
                                    } else {
                                        onePressDelete(index, item._id);
                                    }
                                }
                            }}
                        />
                    );
                })}
            </ScrollView>
            <Border />
            <RightComponentButtonWithLeftText
                buttonText={'Submit'}
                onPress={() => {
                    if (selectedCategory.length == 0) {
                        showMessage({ message: 'Please select atleast one catagory', type: 'danger' });
                    } else submitDetails({ category: selectedCategory });
                }}
                containerStyle={{ margin: DSP }}
            />
            <Catalogue
                isVisible={currentSelectedIndex > 0 ? true : false}
                setPopup={() => {
                    setCurrentSelectedIndex(0);
                }}
                subCategory={subCategory.length >= currentSelectedIndex ? subCategory[currentSelectedIndex - 1] : []}
                subCategory1={
                    subCategory1.length >= currentSelectedIndex ? subCategory1[currentSelectedIndex - 1] : [[]]
                }
                parentCatalogue={data[currentSelectedIndex - 1]}
                successCallback={() => {
                    //getCatalogueDetails(currentCatelogueIndex);
                    // setCurrentCatalogueIndex((index) => index + 1);
                }}
                failureCallback={() => {
                    setSelectedCategory([
                        ...selectedCategory.filter((item) => item != data[currentSelectedIndex - 1]._id),
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
