import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AIC, BR, DSP, JCC, MT } from '../../common/styles';
import {
    categoryType,
    IProductCatalogue,
    IRGetProductCatalogue,
} from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';

import { IRShopUpdate, updateShopData } from '../../server/apis/shop/shop.interface';
import { updateShop } from '../../server/apis/shop/shop.api';
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

export interface ProductDetail extends NavigationProps {
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

const ProductDetails: React.SFC<ProductDetail> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [data, setData] = React.useState<productData[]>([]);
    const [error, setError] = React.useState<string>('');

    const submitDetails = async (data: updateShopData) => {
        const response: IRShopUpdate = await updateShop({
            ...data,
            _id: ownerDetails.shop,
        });
        if (response.status == 1) {
            navigation.navigate(NavigationKey.PRODUCTSUBCATEGORY, { ownerDetails: ownerDetails });
        } else {
            setError(response.message);
        }
    };

    const fetchProductDetails = async (data: Partial<IProductCatalogue>) => {
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

    useEffect(() => {
        fetchProductDetails({ categoryType: categoryType.Category, active: true });
        //getShopDetails();

        return () => {};
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: STATUS_BAR_HEIGHT }}>
            <View style={[MT(0.1)]} />
            <View style={{ paddingHorizontal: '5%', paddingVertical: '2%' }}>
                <WrappedText
                    text={'which category does your dukan exist?'}
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

            <ScrollView style={{}}>
                {data.map((item, index) => (
                    <ProductCategory
                        item={item}
                        containerStyle={styles.productCategory}
                        onPressCategory={() => {
                            const prodcutCategory = [...data];
                            prodcutCategory[index].selected = !prodcutCategory[index].selected;

                            setData(prodcutCategory);
                        }}
                    />
                ))}
            </ScrollView>
            <Border />
            <RightComponentButtonWithLeftText
                buttonText={'Submit'}
                onPress={() => {
                    const selectedCategory: [string] = data.filter((item) => item.selected).map((item) => item._id);
                    if (selectedCategory.length == 0) {
                        ToastHOC.errorAlert('Please select atleast one category');
                    } else submitDetails({ category: selectedCategory });
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
