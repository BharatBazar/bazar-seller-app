import { fs16, fs20, NavigationProps } from '@app/common';
import { black100, mainColor } from '@app/common/color';
import { DSP, PH } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import StatusBar, { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import ButtonAddWithTitleAndSubTitle from '@app/screens/components/button/ButtonAddWithTitleAndSubTitle';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import { getFilterWithValue } from '@app/server/apis/filter/filter.api';
import { IRGetFilterWithValue } from '@app/server/apis/filter/filter.interface';
import { APIgetProduct } from '@app/server/apis/product/product.api';
import { IFilter, IProduct, IRProduct } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { createProduct } from '../edit/product/component/generalConfig';
import ChooseProductColors from './color/ChooseProductColors';
import EditSelectedColor from './color/EditSelectedColor';
import { choosenColor, ProductIdContext } from './data-types';

interface EditProductProps extends NavigationProps {
    update?: boolean;
    route: {
        params: {
            update: boolean;
            _id?: string;
            shopId: string;
            category: string;
            subCategory: string;
            subCategory1: string;
            changeTab: Function;
        };
    };
}

const EditProduct: React.FunctionComponent<EditProductProps> = ({
    navigation,
    route: {
        params: { update, _id, shopId, category, subCategory, subCategory1, changeTab },
    },
}) => {
    const [loader, setLoader] = React.useState<boolean>(false);

    const [filter, setFilter] = React.useState<IFilter[]>([]);
    const [distribution, setDistribution] = React.useState<IFilter[]>([]);
    const [choosenColor, setChoosenColor] = React.useState<choosenColor[]>([]);
    const [openChooseColor, setOpenChooseColor] = React.useState(false);
    const [productId, setProductId] = React.useState('');

    const createProductInServer = async (data: Partial<IProduct>) => {
        try {
            setLoader(true);
            const product: Partial<IProduct> = {
                ...data,

                shopId: shopId,
            };
            const response: IRProduct = await createProduct(data);
            setLoader(false);
            if (response.status == 1) {
                setProductId(response.payload._id);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
        }
    };

    const fetchProduct = async () => {
        try {
            setLoader(true);
            const response: IRProduct = await APIgetProduct({ _id: _id, shopId: shopId });
            console.log('response =>', response);
            if (response.status == 1) {
                console.log('response set ', response.payload);
                setProductId(response.payload._id);
                setChoosenColor(response.payload.colors);
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const loadFilter = async () => {
        setLoader(true);
        try {
            const response: IRGetFilterWithValue = await getFilterWithValue({ active: true });

            setLoader(false);
            if (response.status == 1) {
                setFilter(response.payload.filter);
                setDistribution(response.payload.distribution);
            }
        } catch (error) {
            setLoader(false);
        }
    };

    React.useEffect(() => {
        console.log(update, _id, shopId);
        if (update) {
            fetchProduct();
        }
        loadFilter();
    }, []);

    return (
        <ProductIdContext.Provider value={{ productId: productId, setProductId: setProductId }}>
            <View style={styles.container}>
                <StatusBar statusBarColor={mainColor} />
                <HeaderWithBackButtonTitleAndrightButton
                    rightComponent={() => (
                        <WrappedFeatherIcon
                            iconName="trash-2"
                            iconColor="#FFF"
                            containerHeight={30}
                            onPress={() => {}}
                        />
                    )}
                    containerStyle={[{ padding: DSP }]}
                    title={update ? 'Update Product' : 'Create Product'}
                />
                <ScrollView contentContainerStyle={[PH(0.5)]}>
                    {distribution.length > 0 && distribution[0].filterLevel == 1 && (
                        <ButtonAddWithTitleAndSubTitle
                            title={distribution[0].name}
                            subTitle={distribution[0].description}
                            onPressPlus={() => {
                                setOpenChooseColor(true);
                            }}
                        />
                    )}
                    <Border />
                    <WrappedText
                        text="Selected color variant of product"
                        textColor={black100}
                        containerStyle={{ marginTop: DSP * 0.5 }}
                        fontSize={fs16}
                    />
                    {choosenColor.map((item: choosenColor, index: number) => (
                        <EditSelectedColor item={item} key={index} sizes={distribution[1].values} />
                    ))}
                    <Border />
                </ScrollView>

                <ChooseProductColors
                    isVisible={openChooseColor}
                    setPopup={() => {
                        setOpenChooseColor(false);
                    }}
                    addColorsToChoosenArray={(color: choosenColor) => {
                        const data = [...choosenColor, color];
                        setChoosenColor(data);
                    }}
                    removeColorFromArray={(index: number) => {
                        const data = [...choosenColor];
                        data.splice(index, 1);
                        setChoosenColor(data);
                    }}
                    chosenColor={choosenColor}
                    colors={distribution.length > 0 ? distribution[0].values : []}
                />
                {loader && <Loader />}
            </View>
        </ProductIdContext.Provider>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#FFFFFF',
    },
});
