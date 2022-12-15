import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { AIC, BGCOLOR, BR, DSP, FDR, JCC, MT, PH } from '../../common/styles';
import { IProductCatalogue, IRGetProductCatalogue } from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';

import { IRGetShopCatalogue, IRUpdateShopCatalogue } from '../../server/apis/shop/shop.interface';
import { getShopCatalgoue, updateShop, updateShopCatalogue } from '../../server/apis/shop/shop.api';

import { colorCode, mainColor, subHeadingColor } from '../../common/color';
import { FontFamily, fs16, fs18, fs20, NavigationProps } from '../../common';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';

import WrappedText from '../component/WrappedText';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import Border from '../components/border/Border';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';

import { Storage, StorageItemKeys } from '@app/storage';

import CatalogueItem from './dukan-catalogue/CatalogueItem';

import { NavigationKey } from '@app/labels';
import { GENERAL_PADDING, MLA, MTA, PHA, PTA, PVA } from '@app/common/stylesheet';

import ItemsYouSell from './dukan-catalogue/ItemsYouSell';
import { ToastHOC } from '../hoc/ToastHOC';
import { removeElementFromArray } from '@app/utilities/array';
import { LoaderContext } from '@app/../App';
import ButtonMaterialIcons from '../components/button/ButtonMaterialIcons';
import CoreConfig from '../hoc/CoreConfig';

export interface ProductDetail extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
            update?: boolean;
        };
    };
}

interface selected {}

export interface productData extends IProductCatalogue, selected {}

const ProductDetails: React.FC<ProductDetail> = ({ navigation, route: { params } }) => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');
    const [selectedCategory, setSelectedCategory] = React.useState<string[][]>([]);
    const [sellingItem, setSellingItem] = React.useState<IProductCatalogue[]>([]);

    const setLoaderCallBack = React.useContext(LoaderContext);
    let { update } = React.useMemo(() => {
        if (params) {
            return { ...params };
        }
    }, [params]);

    //While updating full subCategory and subCategory1 is going
    //So we have to carefully update index
    const updateCatalogueDetails = async (
        data: string[],
        reload?: boolean,
        successCallBack?: Function,
        triggerThisCallbackEveryTime?: Function,
    ) => {
        console.log('Update ====>>>', triggerThisCallbackEveryTime);
        try {
            if (data) {
                setLoaderCallBack(true);
                const shopId = await CoreConfig.getShopId();
                let datasend = { sellingItems: data, _id: shopId };

                const response: IRUpdateShopCatalogue = await updateShopCatalogue(datasend);
                console.log('respinse update', response);
                if (response.status == 1) {
                    successCallBack && successCallBack();
                    if (reload) {
                        fetchProductDetails({ parent: { $exists: false }, active: false });
                    } else {
                        setLoaderCallBack(false);
                    }
                } else {
                    setLoaderCallBack(false);
                    setError(response.message);
                }
                triggerThisCallbackEveryTime && triggerThisCallbackEveryTime();
            } else {
                setLoaderCallBack(false);
                ToastHOC.errorAlert('Please provide data');
                triggerThisCallbackEveryTime && triggerThisCallbackEveryTime();
            }
        } catch (error) {
            setLoaderCallBack(false);
            ToastHOC.errorAlert(error.message);
            triggerThisCallbackEveryTime && triggerThisCallbackEveryTime();
        }
    };

    const fetchProductDetails = async (data: Partial<IProductCatalogue>) => {
        try {
            console.log('DATA', data);
            setLoaderCallBack(true);
            const shopId = await CoreConfig.getShopId();
            // console.log("OWNER_DETAILS",ownerDetails.shop);
            //getting all the current selected catalogue of an shop with the parent catalogue or top
            //category populated
            const response1: IRGetShopCatalogue = await getShopCatalgoue({
                _id: shopId,
            });
            console.log('RESPONSE_1', response1);

            setSelectedCategory([
                ...response1.payload.selectedCategory,
                response1.payload.sellingItems.map((item) => item._id),
            ]);
            //console.log('respionse1', response1.payload.selectedCategory);
            setSellingItem(response1.payload.sellingItems);

            const response: IRGetProductCatalogue = await getProductCatalogueAPI(data);
            setLoaderCallBack(false);

            setData([...response.payload]);
        } catch (error) {}
    };

    useEffect(() => {
        fetchProductDetails({ parent: { $exists: false }, active: true });

        StatusBar.setBarStyle('light-content');

        return () => {};
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FDFDFF' }}>
            <View
                style={[
                    BGCOLOR(mainColor),
                    PVA(),
                    AIC(),
                    PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING),

                    FDR(update ? 'row' : 'row'),
                ]}
            >
                {update ? (
                    <ButtonMaterialIcons
                        onPress={() => {
                            navigation.goBack();
                        }}
                        iconName={'arrow-back'}
                        containerStyle={[MLA()]}
                        iconColor={colorCode.WHITE}
                    />
                ) : (
                    <ButtonMaterialIcons
                        onPress={() => {
                            ToastHOC.infoAlert('Close the app you cant go back');
                        }}
                        iconName={'close'}
                        containerStyle={[MLA()]}
                        iconColor={colorCode.WHITE}
                    />
                )}
                <WrappedText
                    text={update ? 'Update Select Category' : 'Select Category'}
                    fontSize={fs18}
                    textColor={'#ffffff'}
                    textAlign="center"
                    containerStyle={{ marginLeft: update ? 20 : 20 }}
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

                        return (
                            <CatalogueItem
                                selectedTree={selectedCategory}
                                index={index}
                                key={item._id + index.toString()}
                                item={item}
                                selected={isSelected}
                                containerStyle={styles.productCategory}
                                onPressDelete={(path: IProductCatalogue[], callBack: Function) => {
                                    let newpath = [item, ...path];

                                    let data = [...sellingItem];
                                    let indx = data.findIndex((item) => item._id == newpath[newpath.length - 1]._id);
                                    indx > -1 && data.splice(indx, 1);
                                    // data = [...data, newpath[newpath.length - 1]];

                                    updateCatalogueDetails(
                                        data.map((item) => item._id),
                                        false,
                                        () => {
                                            setSellingItem(data);
                                            setSelectedCategory((selectedCat) => {
                                                newpath.map((item, index) => {
                                                    if (selectedCat.length < index + 1) {
                                                    } else if (selectedCat[index].includes(item._id)) {
                                                        removeElementFromArray(selectedCat[index], item._id);
                                                    }
                                                });
                                                return [...selectedCat];
                                            });
                                        },

                                        callBack,
                                    );
                                }}
                                onPressCategory={(path: IProductCatalogue[], callBack: Function) => {
                                    let newpath = [item, ...path];

                                    let data = [...sellingItem];

                                    data = [...data, newpath[newpath.length - 1]];

                                    updateCatalogueDetails(
                                        data.map((item) => item._id),
                                        false,
                                        () => {
                                            setSelectedCategory((selectedCat) => {
                                                newpath.map((item, index) => {
                                                    if (selectedCat.length < index + 1) selectedCat.push([item._id]);
                                                    else selectedCat[index].push(item._id);
                                                });

                                                //  console.log(selectedCat);

                                                return [...selectedCat];
                                            });
                                            setSellingItem(data);
                                        },
                                        callBack,
                                    );
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
                    if (data.length != 0) {
                        await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, true);
                        await Storage.setItem(StorageItemKeys.currentScreen, false);
                        navigation.replace(NavigationKey.BHARATBAZARHOME);
                    } else {
                        ToastHOC.errorAlert('Please select at least one item!');
                    }
                }}
                containerStyle={{ margin: DSP }}
            />
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
