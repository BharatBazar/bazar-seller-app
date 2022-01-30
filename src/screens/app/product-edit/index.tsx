import { mainColor } from '@app/common/color';
import { DSP, PH } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import StatusBar, { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import ButtonAddWithTitleAndSubTitle from '@app/screens/components/button/ButtonAddWithTitleAndSubTitle';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import { getFilterWithValue } from '@app/server/apis/filter/filter.api';
import { IRGetFilterWithValue } from '@app/server/apis/filter/filter.interface';
import { IFilter, IProduct, IRProduct } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { createProduct } from '../edit/product/component/generalConfig';
import ChooseProductColors from './color/ChooseProductColors';
import { choosenColor, ProductIdContext } from './data-types';

interface EditProductProps {
    update?: boolean;
    route: {
        params: {
            shopId: string;
        };
    };
}

const EditProduct: React.FunctionComponent<EditProductProps> = ({
    update,
    // route: {
    //     params: { shopId },
    // },
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
