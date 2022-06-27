import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AIC, BGCOLOR, BR, DSP, JCC, MT, PH } from '../../common/styles';
import { IProductCatalogue, IRGetProductCatalogue } from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';

import {
    IRGetShopCatalogue,
    IRShopUpdate,
    IRUpdateShopCatalogue,
    updateShopData,
} from '../../server/apis/shop/shop.interface';
import { getShopCatalgoue, updateShop, updateShopCatalogue } from '../../server/apis/shop/shop.api';

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
import { IdefaultAlertState } from '@app/hooks/useAlert';
import { AlertContext } from '@app/../App';
import { showMessage } from 'react-native-flash-message';

import { NavigationKey } from '@app/labels';
import { GENERAL_PADDING, MTA, PHA, PTA, PVA } from '@app/common/stylesheet';

import ItemsYouSell from './dukan-catalogue/ItemsYouSell';
import { ToastHOC } from '../hoc/ToastHOC';
import { removeElementFromArray } from '@app/utilities/array';

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
    const [selectedCategory, setSelectedCategory] = React.useState<string[][]>([]);
    const [sellingItem, setSellingItem] = React.useState<IProductCatalogue[]>([]);
    //Selected current catalogue by a shop

    const [subCategory, setSubCategory] = React.useState<string[][]>([]);
    const [subCategory1, setSubCategory1] = React.useState<string[][][]>([]);

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
    const updateCatalogueDetails = async (data: string[], reload?: boolean) => {
        try {
            // console.log(data, 'Data');
            if (data) {
                setLoader(true);
                const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);
                let datasend = { sellingItems: data, _id: ownerDetails.shop };

                const response: IRUpdateShopCatalogue = await updateShopCatalogue(datasend);
                console.log('respinse update', response);
                if (response.status == 1) {
                    setLoader(false);
                    // setSelectedCategory([
                    //     ...response.payload.selectedCategory,
                    //     response.payload.sellingItems.map((item) => item._id),
                    // ]);
                    // setSellingItem(response.payload.sellingItems);
                    if (reload) {
                        fetchProductDetails({ parent: { $exists: false }, active: true });
                    }
                } else {
                    setLoader(false);
                    setError(response.message);
                }
            } else {
                setLoader(false);
                ToastHOC.errorAlert('Please provide data');
            }
        } catch (error) {
            setLoader(false);
            ToastHOC.errorAlert(error.message);
        }
    };

    const fetchProductDetails = async (data: Partial<IProductCatalogue>) => {
        try {
            setLoader(true);
            const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

            //getting all the current selected catalogue of an shop with the parent catalogue or top
            //category populated
            const response1: IRGetShopCatalogue = await getShopCatalgoue({
                _id: ownerDetails.shop,
            });

            setSelectedCategory([
                ...response1.payload.selectedCategory,
                response1.payload.sellingItems.map((item) => item._id),
            ]);
            //console.log('respionse1', response1.payload.selectedCategory);
            setSellingItem(response1.payload.sellingItems);

            const response: IRGetProductCatalogue = await getProductCatalogueAPI(data);

            setLoader(false);

            setData([...response.payload]);
        } catch (error) {}
    };

    useEffect(() => {
        //   updateCatalogueDetails({ category: [], subCategory: [], subCategory1: [] });
        fetchProductDetails({ parent: { $exists: false }, active: true });
        //getShopDetails();
        StatusBar.setBarStyle('light-content');

        return () => {};
    }, []);

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
                <ItemsYouSell
                    items={sellingItem}
                    onPressDelete={(id: String) => {
                        let data = [...sellingItem];
                        let indx = data.findIndex((item) => item._id == id);
                        indx > -1 && data.splice(indx, 1);
                        // data = [...data, newpath[newpath.length - 1]];

                        setSellingItem(data);
                        updateCatalogueDetails(
                            data.map((item) => item._id),
                            true,
                        );
                    }}
                />

                <View style={[PHA(), MTA()]}>
                    <WrappedText text={'Select item you sell'} fontSize={fs16} fontFamily={FontFamily.Medium} />
                    <WrappedText
                        text={
                            'Select category in which you sell your dukan product in the market.'
                            //    For example if you sell anything that is used by mens select men as category. same for women if you sell anything that does not comes under any men or women category select other. If you sell multiple items in different category select more then one. '
                        }
                        textColor={subHeadingColor}
                    />

                    {data.map((item, index) => {
                        const isSelected =
                            selectedCategory && selectedCategory.length > 0
                                ? selectedCategory[0].includes(item._id)
                                : false;
                        const indx = isSelected ? selectedCategory[0].findIndex((id) => id == item._id) : -1;

                        return (
                            <CatalogueItem
                                selectedTree={selectedCategory}
                                index={index}
                                key={item._id + index.toString()}
                                item={item}
                                selected={isSelected}
                                containerStyle={styles.productCategory}
                                onPressDelete={(path: IProductCatalogue[]) => {
                                    let newpath = [item, ...path];

                                    console.log('before', selectedCategory);
                                    setSelectedCategory((selectedCat) => {
                                        newpath.map((item, index) => {
                                            if (selectedCat.length < index + 1) {
                                            } else if (selectedCat[index].includes(item._id)) {
                                                removeElementFromArray(selectedCat[index], item._id);
                                            }
                                        });

                                        //  console.log(selectedCat);

                                        return [...selectedCat];
                                    });

                                    let data = [...sellingItem];
                                    let indx = data.findIndex((item) => item._id == newpath[newpath.length - 1]._id);
                                    indx > -1 && data.splice(indx, 1);
                                    // data = [...data, newpath[newpath.length - 1]];

                                    setSellingItem(data);
                                    updateCatalogueDetails(data.map((item) => item._id));
                                }}
                                onPressCategory={(path: IProductCatalogue[]) => {
                                    let newpath = [item, ...path];

                                    console.log('before', selectedCategory);
                                    setSelectedCategory((selectedCat) => {
                                        newpath.map((item, index) => {
                                            if (selectedCat.length < index + 1) selectedCat.push([item._id]);
                                            else selectedCat[index].push(item._id);
                                        });

                                        //  console.log(selectedCat);

                                        return [...selectedCat];
                                    });

                                    let data = [...sellingItem];

                                    data = [...data, newpath[newpath.length - 1]];

                                    setSellingItem(data);
                                    updateCatalogueDetails(data.map((item) => item._id));
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
