import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AIC, BGCOLOR, BR, DSP, FLEX, JCC, M, MT, PA, PH } from '../../common/styles';
import { buttonContainerStyle, componentProps } from '../../common/containerStyles';
import {
    categoryType,
    IProductCatalogue,
    IRGetProductCatalogue,
    product,
} from '../../server/apis/catalogue/catalogue.interface';
import { getProductCatalogueAPI } from '../../server/apis/catalogue/catalogue.api';
import HeaderText from './component/HeaderText';
import { getHP } from '../../common/dimension';
import { FlatList } from 'react-native-gesture-handler';
import TextButton from '../component/TextButton';
import { IRShopUpdate, updateShopData } from '../../server/apis/shop/shop.interface';
import { updateShop } from '../../server/apis/shop/shop.api';
import ProductCategory from './component/DukanProductCategory';
import ServerErrorText from './component/errorText';
import { black10, colorCode, subHeadingColor } from '../../common/color';
import { FontFamily, fs16, fs18, fs20, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../storage';
import { generalContainerStyle } from '../components/styles/common';
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

export interface productData extends product, selected {}

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
            <View style={{ paddingHorizontal: '5%', paddingVertical: '4%' }}>
                <WrappedText
                    text={'which category does your dukan exist?'}
                    fontSize={fs18}
                    textAlign="center"
                    fontFamily={FontFamily.Medium}
                />
                <WrappedText
                    text={
                        'Select category under which you sell for example if your sell items for men select men or your sell any electronic items select Electronics category. If you deal in multiple category select them all'
                    }
                    textAlign="center"
                    containerStyle={[MT(0.1)]}
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
        marginTop: 10,
        paddingHorizontal: '5%',
    },
});

export default ProductDetails;
